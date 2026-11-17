import 'package:flutter/material.dart';

import '../badge.dart';
import '../button.dart';
import 'dialog.dart';

/// A dialog that confirms a destructive or irreversible action.
///
/// The title names the object and the consequence ("Hapus laporan
/// #1024?"); the safe button gets focus; the destructive button is the only
/// place [LdsButtonVariant.danger] belongs. Show it with
/// [showLdsAlertDialog].
class LdsAlertDialog extends StatelessWidget {
  /// Creates an alert dialog panel.
  const LdsAlertDialog({
    super.key,
    required this.title,
    required this.confirmLabel,
    required this.onConfirm,
    required this.onCancel,
    this.body,
    this.cancelLabel = 'Cancel',
    this.destructive = true,
    this.icon,
  });

  /// Names the object and the consequence.
  final String title;

  /// What happens and whether it can be undone.
  final String? body;

  /// The outcome-named confirm button ("Hapus laporan").
  final String confirmLabel;

  /// The safe button.
  final String cancelLabel;

  /// Called by the confirm button.
  final VoidCallback onConfirm;

  /// Called by the safe button.
  final VoidCallback onCancel;

  /// Use the danger button and a danger icon.
  final bool destructive;

  /// Icon above the title. Defaults to `delete` when [destructive].
  final String? icon;

  @override
  Widget build(BuildContext context) {
    return LdsDialog(
      title: title,
      body: body,
      icon: icon ?? (destructive ? 'delete' : null),
      iconTone: destructive ? LdsTone.danger : LdsTone.accent,
      actions: [
        LdsButton(
          label: cancelLabel,
          variant: LdsButtonVariant.secondary,
          onPressed: onCancel,
          autofocus: true,
        ),
        LdsButton(
          label: confirmLabel,
          variant:
              destructive ? LdsButtonVariant.danger : LdsButtonVariant.primary,
          onPressed: onConfirm,
        ),
      ],
    );
  }
}

/// Asks to confirm a destructive action. Completes with true when confirmed
/// and false when cancelled, dismissed with Escape or by the scrim.
Future<bool> showLdsAlertDialog({
  required BuildContext context,
  required String title,
  required String confirmLabel,
  String? body,
  String cancelLabel = 'Cancel',
  bool destructive = true,
  String? icon,
}) async {
  final result = await showLdsDialog<bool>(
    context: context,
    dismissLabel: cancelLabel,
    builder: (context) => LdsAlertDialog(
      title: title,
      body: body,
      confirmLabel: confirmLabel,
      cancelLabel: cancelLabel,
      destructive: destructive,
      icon: icon,
      onConfirm: () => Navigator.of(context).pop(true),
      onCancel: () => Navigator.of(context).pop(false),
    ),
  );
  return result ?? false;
}
