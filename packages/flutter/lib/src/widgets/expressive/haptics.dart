import 'dart:async';

import 'package:flutter/services.dart';

/// The four kinds of haptic feedback the system uses.
enum LdsHapticKind {
  /// A tap that changed something: like on, confirm armed.
  light,

  /// A gesture that committed: a swipe delete, a long press menu.
  medium,

  /// Something finished: confirm done, upload complete, thinking done.
  success,

  /// Refused: a shake, a reverted like, a failed save.
  error,
}

/// Haptic feedback for the moments that already show a visible change.
///
/// Haptics are never the only signal. Fire one per event, at the same
/// moment as the visual change, and only in response to the person (never
/// from timers). Reduced motion does not turn haptics off; [enabled] does,
/// so offer it as a setting in the product.
///
/// ```dart
/// LdsHaptics.play(LdsHapticKind.success);
/// ```
abstract final class LdsHaptics {
  /// Whether haptics play. Set to false from a "Getar" setting in the app.
  static bool enabled = true;

  /// Plays [kind]. Does nothing when [enabled] is false or the device has no
  /// haptic engine.
  static Future<void> play(LdsHapticKind kind) async {
    if (!enabled) return;
    switch (kind) {
      case LdsHapticKind.light:
        await HapticFeedback.lightImpact();
      case LdsHapticKind.medium:
        await HapticFeedback.mediumImpact();
      case LdsHapticKind.success:
        // A short tap, then a firmer one: "done".
        await HapticFeedback.lightImpact();
        await Future<void>.delayed(const Duration(milliseconds: 50));
        await HapticFeedback.mediumImpact();
      case LdsHapticKind.error:
        // Three quick taps: "no".
        for (var i = 0; i < 3; i++) {
          if (i > 0) {
            await Future<void>.delayed(const Duration(milliseconds: 42));
          }
          await HapticFeedback.heavyImpact();
        }
    }
  }

  /// Plays [LdsHapticKind.light] without waiting for it.
  static void light() => unawaited(play(LdsHapticKind.light));

  /// Plays [LdsHapticKind.medium] without waiting for it.
  static void medium() => unawaited(play(LdsHapticKind.medium));

  /// Plays [LdsHapticKind.success] without waiting for it.
  static void success() => unawaited(play(LdsHapticKind.success));

  /// Plays [LdsHapticKind.error] without waiting for it.
  static void error() => unawaited(play(LdsHapticKind.error));
}
