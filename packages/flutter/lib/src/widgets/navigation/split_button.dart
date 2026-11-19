import 'package:material_ui/material_ui.dart';

import '../../motion.dart';
import '../../theme.dart';
import '../../tokens.g.dart';
import '../icon.dart';
import '../pressable.dart';

/// One menu entry of an [LdsSplitButton].
@immutable
class LdsSplitButtonItem {
  /// Creates a menu entry.
  const LdsSplitButtonItem({
    required this.label,
    required this.onPressed,
    this.icon,
  });

  /// Names the variant of the action: "Jadwalkan terbit".
  final String label;

  /// Called when chosen.
  final VoidCallback? onPressed;

  /// Optional leading icon (ligature name).
  final String? icon;
}

/// A primary button joined to a chevron that opens a menu of variants of
/// the same action (Terbitkan, or schedule it, or publish to members only).
/// The left part does the common thing in one press.
///
/// The menu handles arrow keys and Escape. The halves do not sink on press,
/// so the seam stays aligned.
class LdsSplitButton extends StatefulWidget {
  /// Creates a split button.
  const LdsSplitButton({
    super.key,
    required this.label,
    required this.onPressed,
    required this.items,
    this.menuLabel = 'Pilihan lain',
    this.icon,
  });

  /// The common action, labelled with its outcome.
  final String label;

  /// Called by the main part. Null disables both parts.
  final VoidCallback? onPressed;

  /// The menu entries.
  final List<LdsSplitButtonItem> items;

  /// Screen reader label of the chevron.
  final String menuLabel;

  /// Optional leading icon of the main part.
  final String? icon;

  @override
  State<LdsSplitButton> createState() => _LdsSplitButtonState();
}

class _LdsSplitButtonState extends State<LdsSplitButton> {
  final MenuController _menu = MenuController();
  bool _open = false;

  Color _bg(LdsColors c, LdsPressState s) => s.pressed
      ? c.accentPressed
      : s.hovered
      ? c.accentHover
      : c.accent;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final enabled = widget.onPressed != null;
    const r = Radius.circular(LdsRadius.md);
    final fg = c.textOnAccent;

    final main = LdsPressable(
      onPressed: widget.onPressed,
      pressedScale: 1,
      borderRadius: const BorderRadiusDirectional.horizontal(start: r)
          .resolve(Directionality.of(context)),
      semanticLabel: widget.label,
      excludeChildSemantics: true,
      builder: (context, state) => AnimatedContainer(
        duration: context.ldsDuration(LdsMotion.fast),
        height: LdsSize.control,
        padding: const EdgeInsets.symmetric(horizontal: 18),
        decoration: BoxDecoration(
          color: _bg(c, state),
          borderRadius: const BorderRadiusDirectional.horizontal(start: r),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (widget.icon != null) ...[
              LdsIcon(widget.icon!, size: 19, color: fg),
              const SizedBox(width: 8),
            ],
            Text(
              widget.label,
              style: LdsType.bodyStrong.copyWith(
                color: fg,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );

    final chevron = MenuAnchor(
      controller: _menu,
      alignmentOffset: const Offset(0, 6),
      onOpen: () => setState(() => _open = true),
      onClose: () => setState(() => _open = false),
      style: MenuStyle(
        backgroundColor: WidgetStatePropertyAll(c.bgElevated),
        surfaceTintColor: const WidgetStatePropertyAll(Colors.transparent),
        elevation: const WidgetStatePropertyAll(8),
        shadowColor: WidgetStatePropertyAll(
          context.ldsShadows.lg.isEmpty
              ? c.bgScrim
              : context.ldsShadows.lg.last.color,
        ),
        shape: const WidgetStatePropertyAll(
          RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(LdsRadius.md)),
          ),
        ),
        padding: const WidgetStatePropertyAll(EdgeInsets.all(6)),
      ),
      menuChildren: [
        for (final item in widget.items)
          MenuItemButton(
            onPressed: item.onPressed,
            leadingIcon: item.icon == null
                ? null
                : LdsIcon(item.icon!, size: 18, color: c.textSubtle),
            style: ButtonStyle(
              minimumSize: const WidgetStatePropertyAll(
                Size(180, LdsSize.touchMin),
              ),
              shape: const WidgetStatePropertyAll(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(LdsRadius.sm)),
                ),
              ),
              foregroundColor: WidgetStatePropertyAll(c.textStrong),
              textStyle: const WidgetStatePropertyAll(LdsType.subhead),
              overlayColor: WidgetStatePropertyAll(c.bgTint),
              backgroundColor: WidgetStateProperty.resolveWith(
                (s) =>
                    s.contains(WidgetState.focused) ||
                        s.contains(WidgetState.hovered)
                    ? c.bgTint
                    : Colors.transparent,
              ),
            ),
            child: Text(item.label),
          ),
      ],
      builder: (context, controller, _) => MergeSemantics(
        child: Semantics(
          expanded: _open,
          child: LdsPressable(
            onPressed: enabled
                ? () =>
                      controller.isOpen ? controller.close() : controller.open()
                : null,
            pressedScale: 1,
            borderRadius: const BorderRadiusDirectional.horizontal(end: r)
                .resolve(Directionality.of(context)),
            semanticLabel: widget.menuLabel,
            excludeChildSemantics: true,
            builder: (context, state) => AnimatedContainer(
              duration: context.ldsDuration(LdsMotion.fast),
              width: LdsSize.touchMin,
              height: LdsSize.control,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: _bg(c, state),
                borderRadius: const BorderRadiusDirectional.horizontal(end: r),
              ),
              child: AnimatedRotation(
                turns: _open ? 0.5 : 0,
                duration: context.ldsDuration(LdsMotion.smoothSpringDuration),
                curve: LdsSpringCurve.smooth,
                child: LdsIcon('expand_more', color: fg),
              ),
            ),
          ),
        ),
      ),
    );

    return AnimatedOpacity(
      opacity: enabled ? 1 : 0.38,
      duration: context.ldsDuration(LdsMotion.fast),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          main,
          Container(width: 1, height: LdsSize.control, color: c.accentPressed),
          chevron,
        ],
      ),
    );
  }
}
