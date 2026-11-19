import 'dart:async';
import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';

/// Drag a list down from the top: the content follows with resistance, a
/// spinner turns as it comes in, and past 56 px a release runs [onRefresh].
/// The spinner holds until the work is done, at least 700 ms so it never
/// flickers.
///
/// [child] is a vertical scrollable. It is given clamping, always
/// scrollable physics so the pull belongs to this widget; do not set other
/// physics on it.
class LdsPullToRefresh extends StatefulWidget {
  /// Creates a pull-to-refresh wrapper.
  const LdsPullToRefresh({
    super.key,
    required this.child,
    required this.onRefresh,
    this.semanticLabel = 'Refreshing',
  });

  /// The scrollable list.
  final Widget child;

  /// The work; the spinner holds until it completes.
  final Future<void> Function() onRefresh;

  /// Announced while refreshing.
  final String semanticLabel;

  @override
  State<LdsPullToRefresh> createState() => _LdsPullToRefreshState();
}

class _LdsPullToRefreshState extends State<LdsPullToRefresh>
    with SingleTickerProviderStateMixin {
  late final AnimationController _pull = AnimationController.unbounded(
    vsync: this,
  );
  double _raw = 0;
  bool _dragging = false;
  bool _refreshing = false;

  static const double _threshold = 56;
  static const double _max = 200;

  @override
  void dispose() {
    _pull.dispose();
    super.dispose();
  }

  double _resist(double raw) => raw * _max * 0.55 / (_max + 0.55 * raw);

  Duration _d(Duration d) => context.ldsReduceMotion ? LdsMotion.instant : d;

  bool _onScroll(ScrollNotification n) {
    if (n.depth != 0 || _refreshing) return false;
    if (n is ScrollStartNotification) {
      _dragging = n.dragDetails != null;
      _raw = 0;
    } else if (n is OverscrollNotification) {
      if (_dragging && n.overscroll < 0 && n.dragDetails != null) {
        _pull.stop();
        _raw += -n.overscroll;
        _pull.value = _resist(_raw);
      }
    } else if (n is ScrollUpdateNotification) {
      if (_raw > 0 && (n.scrollDelta ?? 0) > 0 && n.dragDetails != null) {
        _raw = math.max(0, _raw - n.scrollDelta!);
        _pull.value = _resist(_raw);
      }
    } else if (n is ScrollEndNotification) {
      _release();
    }
    return false;
  }

  void _release() {
    if (!_dragging) return;
    _dragging = false;
    _raw = 0;
    if (_pull.value >= _threshold) {
      unawaited(_refresh());
    } else {
      unawaited(
        _pull.animateTo(
          0,
          duration: _d(LdsMotion.smooth),
          curve: LdsSpringCurve.smooth,
        ),
      );
    }
  }

  Future<void> _refresh() async {
    setState(() => _refreshing = true);
    unawaited(
      _pull.animateTo(
        _threshold,
        duration: _d(LdsMotion.smooth),
        curve: LdsSpringCurve.smooth,
      ),
    );
    try {
      await Future.wait<void>([
        widget.onRefresh(),
        Future<void>.delayed(const Duration(milliseconds: 700)),
      ]);
    } finally {
      if (mounted) {
        setState(() => _refreshing = false);
        await _pull.animateTo(
          0,
          duration: _d(LdsMotion.smooth),
          curve: LdsSpringCurve.smooth,
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final scrollable = ScrollConfiguration(
      behavior: ScrollConfiguration.of(context).copyWith(
        overscroll: false,
        physics: const AlwaysScrollableScrollPhysics(
          parent: ClampingScrollPhysics(),
        ),
      ),
      child: NotificationListener<ScrollNotification>(
        onNotification: _onScroll,
        child: widget.child,
      ),
    );
    return Listener(
      onPointerUp: (_) => _release(),
      onPointerCancel: (_) => _release(),
      child: AnimatedBuilder(
        animation: _pull,
        builder: (context, child) {
          final pull = math.max(0.0, _pull.value);
          final p = (pull / _threshold).clamp(0.0, 1.0);
          return Stack(
            children: [
              Transform.translate(offset: Offset(0, pull), child: child),
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                height: math.max(pull, 0),
                child: IgnorePointer(
                  child: Center(
                    child: Semantics(
                      liveRegion: _refreshing,
                      label: _refreshing ? widget.semanticLabel : null,
                      child: Opacity(
                        opacity: _refreshing ? 1 : p,
                        child: Transform.rotate(
                          angle: _refreshing ? 0 : p * 1.5 * math.pi,
                          child: SizedBox.square(
                            dimension: 24,
                            child: CircularProgressIndicator(
                              strokeWidth: 2.4,
                              value: _refreshing ? null : p * 0.8,
                              color: c.textSubtle,
                              backgroundColor: Colors.transparent,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          );
        },
        child: scrollable,
      ),
    );
  }
}
