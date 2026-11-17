import 'package:flutter/material.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../button.dart';
import 'inverse_button.dart';

/// A bulk action in an [LdsSelectionBar].
@immutable
class LdsSelectionAction {
  /// Creates a bulk action.
  const LdsSelectionAction({
    required this.label,
    required this.icon,
    required this.onPressed,
    this.destructive = false,
  });

  /// What the action does ("Setujui").
  final String label;

  /// Icon, kept alone on narrow screens.
  final String icon;

  /// Runs the action on the selection.
  final VoidCallback? onPressed;

  /// Paint it in the danger color.
  final bool destructive;
}

/// A dark bar that floats up from the bottom while items in a list are
/// selected, holding the count and the actions for all of them. It leaves
/// when [count] drops to 0.
///
/// Place it at the bottom of a [Stack] over the list. Under 520 px wide the
/// actions keep only their icons.
class LdsSelectionBar extends StatefulWidget {
  /// Creates a selection bar.
  const LdsSelectionBar({
    super.key,
    required this.count,
    required this.actions,
    required this.onClear,
    this.countLabel,
    this.clearLabel = 'Clear selection',
    this.semanticLabel = 'Selection actions',
  });

  /// How many items are selected. 0 hides the bar.
  final int count;

  /// Bulk actions.
  final List<LdsSelectionAction> actions;

  /// Clears the selection.
  final VoidCallback onClear;

  /// Builds the count text. Defaults to "3 selected".
  final String Function(int count)? countLabel;

  /// Label of the clear button.
  final String clearLabel;

  /// Names the toolbar for screen readers.
  final String semanticLabel;

  @override
  State<LdsSelectionBar> createState() => _LdsSelectionBarState();
}

class _LdsSelectionBarState extends State<LdsSelectionBar>
    with SingleTickerProviderStateMixin {
  late final AnimationController _anim =
      AnimationController(vsync: this, value: widget.count > 0 ? 1 : 0);
  late final CurvedAnimation _rise = CurvedAnimation(
    parent: _anim,
    curve: LdsSpringCurve.smooth,
    reverseCurve: LdsMotion.exitCurve.flipped,
  );
  late int _shownCount = widget.count;

  @override
  void didUpdateWidget(LdsSelectionBar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.count > 0) _shownCount = widget.count;
    final open = widget.count > 0;
    if (open != (oldWidget.count > 0)) {
      final reduce = context.ldsReduceMotion;
      _anim.duration = reduce ? LdsMotion.instant : LdsMotion.smooth;
      _anim.reverseDuration = reduce ? LdsMotion.instant : LdsMotion.exit;
      open ? _anim.forward() : _anim.reverse();
    }
  }

  @override
  void dispose() {
    _rise.dispose();
    _anim.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reduce = context.ldsReduceMotion;
    final narrow = MediaQuery.sizeOf(context).width < 520;
    final label =
        widget.countLabel?.call(_shownCount) ?? '$_shownCount selected';
    final bar = Container(
      constraints: const BoxConstraints(minHeight: 52),
      padding: const EdgeInsetsDirectional.fromSTEB(16, 4, 4, 4),
      decoration: BoxDecoration(
        color: c.bgInverse,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
        boxShadow: context.ldsShadows.lg,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Semantics(
            liveRegion: true,
            child: Text(
              label,
              style: LdsType.subhead.copyWith(
                color: c.textInverse,
                fontWeight: FontWeight.w500,
                fontFeatures: const [FontFeature.tabularFigures()],
              ),
            ),
          ),
          const SizedBox(width: 8),
          for (final a in widget.actions) ...[
            const SizedBox(width: 6),
            LdsInverseButton(
              label: a.label,
              icon: a.icon,
              height: 38,
              showLabel: !narrow,
              variant: a.destructive
                  ? LdsInverseButtonVariant.danger
                  : LdsInverseButtonVariant.tint,
              onPressed: a.onPressed,
            ),
          ],
          const SizedBox(width: 2),
          LdsIconButton(
            icon: 'close',
            semanticLabel: widget.clearLabel,
            onPressed: widget.onClear,
            color: c.textInverse,
          ),
        ],
      ),
    );
    return AnimatedBuilder(
      animation: _anim,
      builder: (context, child) {
        if (_anim.isDismissed) return const SizedBox.shrink();
        final v = _rise.value;
        return Opacity(
          opacity: _anim.value.clamp(0.0, 1.0),
          child: Transform.translate(
            offset: Offset(0, reduce ? 0 : 16 * (1 - v)),
            child: Transform.scale(
              scale: reduce ? 1 : 0.98 + 0.02 * v,
              child: child,
            ),
          ),
        );
      },
      child: Semantics(
        container: true,
        explicitChildNodes: true,
        label: widget.semanticLabel,
        child: FittedBox(fit: BoxFit.scaleDown, child: bar),
      ),
    );
  }
}
