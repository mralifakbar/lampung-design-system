import 'dart:ui';

import 'package:flutter_test/flutter_test.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

import 'helpers.dart';

void main() {
  for (final (mode, c) in [('light', LdsColors.light), ('dark', LdsColors.dark)]) {
    group('$mode contrast', () {
      void aa(String name, Color fg, Color bg, [double min = 4.5]) {
        final ratio = contrast(fg, bg, c.bgCanvas);
        expect(ratio, greaterThanOrEqualTo(min), reason: '$mode $name: ${ratio.toStringAsFixed(2)}:1');
      }

      test('accent text pairs hold AA', () {
        aa('accent-text on canvas', c.accentText, c.bgCanvas);
        aa('accent-text on fill', c.accentText, c.bgFill);
        aa('accent-text on accent-tint', c.accentText, c.accentTint);
        aa('text-on-accent on accent', c.textOnAccent, c.accent);
        aa('text-on-accent on accent-pressed', c.textOnAccent, c.accentPressed);
      });

      test('gold and status text hold AA on their tints', () {
        aa('gold-text on gold-tint', c.goldText, c.goldTint);
        aa('on-gold on gold', c.onGold, c.gold);
        aa('success-text on success-tint', c.successText, c.successTint);
        aa('warning-text on warning-tint', c.warningText, c.warningTint);
        aa('danger-text on danger-tint', c.dangerText, c.dangerTint);
        aa('neutral-text on neutral-tint', c.neutralText, c.neutralTint);
      });

      test('body text holds AA on canvas and fill', () {
        aa('text-strong on canvas', c.textStrong, c.bgCanvas);
        aa('text-default on fill', c.textDefault, c.bgFill);
        aa('text-subtle on fill', c.textSubtle, c.bgFill);
        aa('text-muted on fill', c.textMuted, c.bgFill);
        aa('text-inverse on inverse', c.textInverse, c.bgInverse);
      });

      test('control edges hold 3:1', () {
        aa('line-control on base', c.lineControl, c.bgBase, 3);
        aa('focus on canvas', c.focus, c.bgCanvas, 3);
      });
    });
  }
}
