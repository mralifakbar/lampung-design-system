import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import 'inverse_button.dart';

/// A short dark message at the bottom that confirms something that just
/// happened, then leaves by itself.
///
/// Show one with [LdsToast.show]. When the action can be reversed, the Undo
/// lives in the toast and a thin bar drains while it is still possible; the
/// clock pauses while the pointer or focus is on the toast. Up to three
/// show at once.
///
/// The widget itself is the visual, for custom hosts.
class LdsToast extends StatelessWidget {
  /// Creates a toast visual.
  const LdsToast({
    super.key,
    required this.title,
    this.body,
    this.icon,
    this.actionLabel,
    this.onAction,
    this.remaining,
  });

  /// What happened ("Laporan terkirim").
  final String title;

  /// Optional second line.
  final String? body;

  /// Optional filled icon (`check_circle`, `delete`).
  final String? icon;

  /// Label of the single action, usually Undo.
  final String? actionLabel;

  /// Called by the action.
  final VoidCallback? onAction;

  /// Share of time left, from 1 to 0, drawn as the timer bar. Null hides it.
  final double? remaining;

  /// Shows a toast over the nearest root [Overlay] and returns a handle to
  /// update or dismiss it.
  ///
  /// [duration] defaults to 4 s, or 6 s with an action. When the action
  /// runs and [actionResultTitle] is set, the title changes to it in place
  /// and the toast leaves 1.6 s later.
  static LdsToastHandle show(
    BuildContext context, {
    required String title,
    String? body,
    String? icon,
    String? actionLabel,
    VoidCallback? onAction,
    String? actionResultTitle,
    String? actionResultIcon,
    Duration? duration,
  }) {
    final overlay = Overlay.of(context, rootOverlay: true);
    final host = _hosts[overlay] ??= _ToastHost(overlay);
    final entry = _ToastData(
      title: title,
      body: body,
      icon: icon,
      actionLabel: actionLabel,
      onAction: onAction,
      actionResultTitle: actionResultTitle,
      actionResultIcon: actionResultIcon,
      duration:
          duration ?? Duration(milliseconds: actionLabel != null ? 6000 : 4000),
    );
    host.add(entry);
    return LdsToastHandle._(entry);
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Container(
      constraints: const BoxConstraints(minHeight: 56),
      padding: const EdgeInsetsDirectional.fromSTEB(14, 6, 6, 6),
      decoration: BoxDecoration(
        color: c.bgInverse,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
        boxShadow: context.ldsShadows.lg,
      ),
      child: Stack(
        children: [
          Row(
            children: [
              if (icon != null) ...[
                LdsIcon(icon!, fill: true, color: c.textInverse),
                const SizedBox(width: 10),
              ],
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 6),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      AnimatedSwitcher(
                        duration: context.ldsDuration(LdsMotion.standard),
                        layoutBuilder: (current, previous) => Stack(
                          alignment: AlignmentDirectional.centerStart,
                          children: [...previous, ?current],
                        ),
                        child: Text(
                          title,
                          key: ValueKey<String>(title),
                          style: LdsType.subhead.copyWith(
                            color: c.textInverse,
                            fontWeight: FontWeight.w500,
                            height: 19 / 14,
                          ),
                        ),
                      ),
                      if (body != null)
                        Text(
                          body!,
                          style: LdsType.footnote.copyWith(
                            color: c.textInverse.withValues(alpha: 0.72),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
              if (actionLabel != null) ...[
                const SizedBox(width: 6),
                LdsInverseButton(label: actionLabel!, onPressed: onAction),
              ] else
                const SizedBox(width: 8),
            ],
          ),
          if (remaining != null)
            PositionedDirectional(
              start: 0,
              end: 8,
              bottom: -1,
              child: ExcludeSemantics(
                child: Container(
                  height: 2,
                  decoration: BoxDecoration(
                    color: c.onInverseTint,
                    borderRadius: const BorderRadius.all(Radius.circular(1)),
                  ),
                  alignment: AlignmentDirectional.centerStart,
                  child: FractionallySizedBox(
                    widthFactor: remaining!.clamp(0.0, 1.0),
                    child: Container(
                      decoration: BoxDecoration(
                        color: c.textInverse.withValues(alpha: 0.6),
                        borderRadius: const BorderRadius.all(
                          Radius.circular(1),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

/// Changes or dismisses a toast shown with [LdsToast.show].
class LdsToastHandle {
  LdsToastHandle._(this._data);

  final _ToastData _data;

  /// Whether the toast is still on screen or leaving.
  bool get isShowing => !_data.gone;

  /// Starts the exit.
  void dismiss() => _data.leave();

  /// Changes the title and icon in place.
  void update({String? title, String? icon}) {
    if (title != null) _data.title = title;
    if (icon != null) _data.icon = icon;
    _data.changed();
  }
}

final Expando<_ToastHost> _hosts = Expando<_ToastHost>('lds toasts');

class _ToastHost extends ChangeNotifier {
  _ToastHost(this.overlay);

  final OverlayState overlay;
  final List<_ToastData> items = <_ToastData>[];
  OverlayEntry? _entry;

  static const int _max = 3;

  void add(_ToastData data) {
    items.add(data);
    final active = items.where((t) => !t.leaving).toList();
    for (var i = 0; i < active.length - _max; i++) {
      active[i].leave();
    }
    if (_entry == null) {
      _entry = OverlayEntry(builder: (_) => _Toaster(host: this));
      overlay.insert(_entry!);
    }
    notifyListeners();
  }

  void remove(_ToastData data) {
    data.gone = true;
    items.remove(data);
    if (items.isEmpty) {
      _entry?.remove();
      _entry?.dispose();
      _entry = null;
    } else {
      notifyListeners();
    }
  }
}

class _ToastData extends ChangeNotifier {
  _ToastData({
    required this.title,
    required this.body,
    required this.icon,
    required this.actionLabel,
    required this.onAction,
    required this.actionResultTitle,
    required this.actionResultIcon,
    required this.duration,
  });

  String title;
  final String? body;
  String? icon;
  String? actionLabel;
  final VoidCallback? onAction;
  final String? actionResultTitle;
  final String? actionResultIcon;
  Duration duration;
  bool leaving = false;
  bool gone = false;
  final Key key = UniqueKey();

  void leave() {
    if (leaving || gone) return;
    leaving = true;
    notifyListeners();
  }

  void changed() {
    if (!gone) notifyListeners();
  }
}

class _Toaster extends StatelessWidget {
  const _Toaster({required this.host});

  final _ToastHost host;

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: 0,
      right: 0,
      bottom: 0,
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 420),
              child: ListenableBuilder(
                listenable: host,
                builder: (context, _) => Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    for (final t in host.items)
                      _ToastItem(key: t.key, data: t, host: host),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _ToastItem extends StatefulWidget {
  const _ToastItem({super.key, required this.data, required this.host});

  final _ToastData data;
  final _ToastHost host;

  @override
  State<_ToastItem> createState() => _ToastItemState();
}

class _ToastItemState extends State<_ToastItem> with TickerProviderStateMixin {
  late final AnimationController _show = AnimationController(vsync: this);
  late final AnimationController _life = AnimationController(
    vsync: this,
    duration: widget.data.duration,
  );
  late final CurvedAnimation _rise = CurvedAnimation(
    parent: _show,
    curve: LdsSpringCurve.smooth,
    reverseCurve: LdsMotion.exitCurve.flipped,
  );
  bool _hovered = false;
  bool _focused = false;
  bool _morphed = false;
  bool _started = false;

  @override
  void initState() {
    super.initState();
    widget.data.addListener(_onData);
    _life.addStatusListener((s) {
      if (s == AnimationStatus.completed) widget.data.leave();
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_started) return;
    _started = true;
    _show.duration = context.ldsReduceMotion
        ? LdsMotion.instant
        : LdsMotion.smooth;
    _show.reverseDuration = context.ldsReduceMotion
        ? LdsMotion.instant
        : LdsMotion.exit;
    _show.forward();
    _life.forward();
  }

  @override
  void dispose() {
    widget.data.removeListener(_onData);
    _rise.dispose();
    _show.dispose();
    _life.dispose();
    super.dispose();
  }

  void _onData() {
    if (widget.data.leaving && _show.status != AnimationStatus.reverse) {
      _life.stop();
      _show.reverse().whenCompleteOrCancel(() {
        if (_show.isDismissed) widget.host.remove(widget.data);
      });
    }
    if (mounted) setState(() {});
  }

  void _setPaused() {
    if (widget.data.leaving) return;
    if (_hovered || _focused) {
      _life.stop();
    } else if (!_life.isCompleted) {
      _life.forward();
    }
  }

  void _runAction() {
    final d = widget.data;
    d.onAction?.call();
    if (d.actionResultTitle != null && !_morphed) {
      _morphed = true;
      d.title = d.actionResultTitle!;
      d.icon = d.actionResultIcon ?? d.icon;
      d.actionLabel = null;
      _life.duration = const Duration(milliseconds: 1600);
      _life.forward(from: 0);
      d.changed();
    } else {
      d.leave();
    }
  }

  @override
  Widget build(BuildContext context) {
    final d = widget.data;
    final reduce = context.ldsReduceMotion;
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: MouseRegion(
        onEnter: (_) {
          _hovered = true;
          _setPaused();
        },
        onExit: (_) {
          _hovered = false;
          _setPaused();
        },
        child: Focus(
          canRequestFocus: false,
          skipTraversal: true,
          onFocusChange: (f) {
            _focused = f;
            _setPaused();
          },
          child: AnimatedBuilder(
            animation: Listenable.merge([_show, _life]),
            builder: (context, _) {
              final v = _rise.value;
              return Opacity(
                opacity: _show.value.clamp(0.0, 1.0),
                child: Transform.translate(
                  offset: Offset(0, reduce ? 0 : 12 * (1 - v)),
                  child: Transform.scale(
                    scale: reduce ? 1 : 0.96 + 0.04 * v,
                    alignment: Alignment.bottomCenter,
                    child: Semantics(
                      container: true,
                      liveRegion: true,
                      child: LdsToast(
                        title: d.title,
                        body: d.body,
                        icon: d.icon,
                        actionLabel: d.actionLabel,
                        onAction: d.actionLabel == null ? null : _runAction,
                        remaining: d.actionLabel == null
                            ? null
                            : 1 - _life.value,
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
