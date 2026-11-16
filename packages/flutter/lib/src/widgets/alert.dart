import 'package:flutter/material.dart';

import '../theme.dart';
import '../tokens.g.dart';
import 'badge.dart';
import 'button.dart';
import 'icon.dart';

/// Meaning of an [LdsAlert].
enum LdsAlertTone {
  /// Something useful to know.
  info,

  /// Something went right.
  success,

  /// Act soon.
  warning,

  /// Something failed or blocks the next step.
  danger,
}

/// Something on this page needs attention before the person acts.
///
/// Says what happened and what to do, with an optional action. Danger and
/// warning alerts are announced when they appear.
class LdsAlert extends StatelessWidget {
  /// Creates an alert.
  const LdsAlert({
    super.key,
    required this.title,
    this.body,
    this.tone = LdsAlertTone.info,
    this.icon,
    this.actions = const <Widget>[],
    this.onClose,
    this.closeLabel = 'Close',
  });

  /// Short summary.
  final String title;

  /// What to do next.
  final String? body;

  /// Meaning.
  final LdsAlertTone tone;

  /// Overrides the default icon for [tone].
  final String? icon;

  /// Buttons under the text, usually one [LdsButton] of size md.
  final List<Widget> actions;

  /// Shows a close button.
  final VoidCallback? onClose;

  /// Label of the close button.
  final String closeLabel;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final t = LdsToneColors.of(c, switch (tone) {
      LdsAlertTone.info => LdsTone.accent,
      LdsAlertTone.success => LdsTone.success,
      LdsAlertTone.warning => LdsTone.warning,
      LdsAlertTone.danger => LdsTone.danger,
    });
    final glyph = icon ??
        switch (tone) {
          LdsAlertTone.info => 'info',
          LdsAlertTone.success => 'check_circle',
          LdsAlertTone.warning => 'warning',
          LdsAlertTone.danger => 'error',
        };
    final urgent =
        tone == LdsAlertTone.danger || tone == LdsAlertTone.warning;
    return Semantics(
      container: true,
      liveRegion: urgent,
      child: Container(
        padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
        decoration: BoxDecoration(
          color: t.tint,
          borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            LdsIcon(glyph, size: 21, fill: true, color: t.text),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: LdsType.subhead.copyWith(
                      color: c.textStrong,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  if (body != null)
                    Text(
                      body!,
                      style: LdsType.subhead.copyWith(color: c.textDefault),
                    ),
                  if (actions.isNotEmpty) ...[
                    const SizedBox(height: 10),
                    Wrap(spacing: 8, runSpacing: 8, children: actions),
                  ],
                ],
              ),
            ),
            if (onClose != null)
              Transform.translate(
                offset: const Offset(10, -10),
                child: LdsIconButton(
                  icon: 'close',
                  semanticLabel: closeLabel,
                  onPressed: onClose,
                  color: c.textSubtle,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
