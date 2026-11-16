import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

import 'helpers.dart';

void main() {
  group('LdsButton', () {
    testWidgets('renders every variant and size in both modes', (tester) async {
      for (final dark in [false, true]) {
        await tester.pumpWidget(wrap(
          SingleChildScrollView(
            child: Column(children: [
              for (final v in LdsButtonVariant.values)
                for (final s in LdsButtonSize.values)
                  LdsButton(label: '${v.name} ${s.name}', variant: v, size: s, icon: 'send', onPressed: () {}),
            ]),
          ),
          dark: dark,
        ));
        expect(tester.takeException(), isNull);
        expect(find.text('primary lg'), findsOneWidget);
      }
    });

    testWidgets('calls onPressed on tap and on Enter', (tester) async {
      var taps = 0;
      final focus = FocusNode();
      addTearDown(focus.dispose);
      await tester.pumpWidget(wrap(LdsButton(label: 'Kirim laporan', focusNode: focus, onPressed: () => taps++)));
      await tester.tap(find.text('Kirim laporan'));
      await tester.pumpAndSettle();
      expect(taps, 1);
      focus.requestFocus();
      await tester.pump();
      await tester.sendKeyEvent(LogicalKeyboardKey.enter);
      await tester.pumpAndSettle();
      expect(taps, 2);
    });

    testWidgets('keeps a 44 px hit area even when small', (tester) async {
      await tester.pumpWidget(wrap(LdsButton(label: 'Ubah', size: LdsButtonSize.sm, onPressed: () {})));
      final size = tester.getSize(find.byType(LdsPressable));
      expect(size.height, greaterThanOrEqualTo(44));
      expect(size.width, greaterThanOrEqualTo(44));
    });

    testWidgets('disabled ignores taps and reports disabled', (tester) async {
      final handle = tester.ensureSemantics();
      await tester.pumpWidget(wrap(const LdsButton(label: 'Simpan', onPressed: null)));
      await tester.tap(find.text('Simpan'), warnIfMissed: false);
      expect(
        tester.getSemantics(find.byType(LdsButton)),
        matchesSemantics(label: 'Simpan', isButton: true, hasEnabledState: true),
      );
      handle.dispose();
    });

    testWidgets('loading keeps the width, shows a spinner and ignores taps', (tester) async {
      var taps = 0;
      Widget build(bool loading) => wrap(LdsButton(label: 'Kirim laporan', loading: loading, onPressed: () => taps++));
      await tester.pumpWidget(build(false));
      final idle = tester.getSize(find.byType(LdsButton));
      await tester.pumpWidget(build(true));
      await tester.pump(const Duration(milliseconds: 300));
      expect(tester.getSize(find.byType(LdsButton)), idle);
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
      await tester.tap(find.byType(LdsButton), warnIfMissed: false);
      await tester.pump(const Duration(milliseconds: 300));
      expect(taps, 0);
      expect(find.bySemanticsLabel('Kirim laporan, Loading'), findsOneWidget);
    });

    testWidgets('shows a focus ring for keyboard focus', (tester) async {
      final focus = FocusNode();
      addTearDown(focus.dispose);
      await tester.pumpWidget(wrap(LdsButton(label: 'Masuk', focusNode: focus, onPressed: () {})));
      FocusManager.instance.highlightStrategy = FocusHighlightStrategy.alwaysTraditional;
      focus.requestFocus();
      await tester.pumpAndSettle();
      final paints = tester.widgetList<CustomPaint>(
          find.descendant(of: find.byType(LdsButton), matching: find.byType(CustomPaint)));
      expect(paints.any((p) => p.foregroundPainter != null), isTrue);
      FocusManager.instance.highlightStrategy = FocusHighlightStrategy.automatic;
    });
  });

  testWidgets('LdsIconButton has a label, tooltip and 44 px target', (tester) async {
    var taps = 0;
    await tester.pumpWidget(wrap(LdsIconButton(icon: 'share', semanticLabel: 'Bagikan', onPressed: () => taps++)));
    expect(find.bySemanticsLabel('Bagikan'), findsOneWidget);
    expect(find.byType(Tooltip), findsOneWidget);
    expect(tester.getSize(find.byType(LdsIconButton)).height, greaterThanOrEqualTo(44));
    await tester.tap(find.byType(LdsIconButton));
    await tester.pumpAndSettle();
    expect(taps, 1);
  });

  group('LdsTextField', () {
    testWidgets('shows label, help and accepts text', (tester) async {
      final controller = TextEditingController();
      addTearDown(controller.dispose);
      await tester.pumpWidget(wrap(LdsTextField(
        label: 'NIK',
        help: '16 digit sesuai KTP',
        prefixIcon: 'id_card',
        suffixText: 'digit',
        controller: controller,
      )));
      expect(find.text('NIK'), findsOneWidget);
      expect(find.text('16 digit sesuai KTP'), findsOneWidget);
      await tester.enterText(find.byType(TextField), '1871');
      expect(controller.text, '1871');
    });

    testWidgets('error replaces help', (tester) async {
      await tester.pumpWidget(wrap(const LdsTextField(label: 'Email', help: 'Untuk balasan', error: 'Format email belum benar')));
      expect(find.text('Format email belum benar'), findsOneWidget);
      expect(find.text('Untuk balasan'), findsNothing);
    });
  });

  testWidgets('LdsCard, LdsBadge, LdsAlert, LdsListRow render in both modes', (tester) async {
    for (final dark in [false, true]) {
      var tapped = false;
      await tester.pumpWidget(wrap(
        SingleChildScrollView(
          child: Column(children: [
            const LdsCard(child: Text('Kartu')),
            LdsCard(variant: LdsCardVariant.outline, onTap: () {}, child: const Text('Kartu garis')),
            Wrap(children: [for (final t in LdsTone.values) LdsBadge(t.name, tone: t, icon: 'check')]),
            for (final t in LdsAlertTone.values)
              LdsAlert(title: 'Judul ${t.name}', body: 'Isi', tone: t, onClose: () {}),
            LdsList(header: 'Layanan', footer: 'Data contoh', children: [
              LdsListRow(title: 'Lapor jalan rusak', subtitle: 'Dinas Layanan Kota Contoh', icon: 'traffic', onTap: () => tapped = true),
              const LdsListRow(title: 'Status', value: 'Aktif'),
              LdsListRow(title: 'Notifikasi', trailing: Switch(value: true, onChanged: (_) {})),
            ]),
          ]),
        ),
        dark: dark,
      ));
      expect(tester.takeException(), isNull);
      expect(find.text('gold'), findsOneWidget);
      await tester.tap(find.text('Lapor jalan rusak'));
      await tester.pumpAndSettle();
      expect(tapped, isTrue);
    }
  });

  testWidgets('LdsSegmented changes value and marks selection', (tester) async {
    var value = 'minggu';
    await tester.pumpWidget(wrap(StatefulBuilder(
      builder: (context, setState) => LdsSegmented<String>(
        semanticLabel: 'Rentang',
        value: value,
        onChanged: (v) => setState(() => value = v),
        segments: const [
          LdsSegment(value: 'hari', label: 'Hari'),
          LdsSegment(value: 'minggu', label: 'Minggu'),
          LdsSegment(value: 'bulan', label: 'Bulan'),
        ],
      ),
    )));
    await tester.tap(find.text('Bulan'));
    await tester.pumpAndSettle();
    expect(value, 'bulan');
    expect(tester.getSemantics(find.text('Bulan')), containsSemantics(isSelected: true, isButton: true));
    expect(tester.getSize(find.byType(LdsSegmented<String>)).height, greaterThanOrEqualTo(44));
  });

  testWidgets('LdsIcon is decorative unless labeled', (tester) async {
    await tester.pumpWidget(wrap(const Row(children: [
      LdsIcon('search'),
      LdsIcon('home', fill: true, semanticLabel: 'Beranda'),
    ])));
    expect(find.bySemanticsLabel('Beranda'), findsOneWidget);
    final text = tester.widget<Text>(find.text('home'));
    expect(text.style!.fontFamily, LdsType.iconsFill);
    expect(tester.widget<Text>(find.text('search')).style!.fontFamily, LdsType.icons);
  });

  testWidgets('LdsEmptyState shows its action', (tester) async {
    await tester.pumpWidget(wrap(LdsEmptyState(
      title: 'Belum ada laporan',
      body: 'Laporan yang Anda kirim muncul di sini.',
      action: LdsButton(label: 'Buat laporan', onPressed: () {}),
    )));
    expect(find.text('Belum ada laporan'), findsOneWidget);
    expect(find.text('Buat laporan'), findsOneWidget);
  });

  testWidgets('LdsSkeleton animates, and stays still with reduced motion', (tester) async {
    await tester.pumpWidget(wrap(const LdsSkeleton(width: 120, semanticLabel: 'Memuat')));
    await tester.pump(const Duration(milliseconds: 400));
    expect(find.descendant(of: find.byType(LdsSkeleton), matching: find.byType(FractionalTranslation)), findsOneWidget);
    expect(find.bySemanticsLabel('Memuat'), findsOneWidget);
    await tester.pumpWidget(wrap(const LdsSkeleton(width: 120), reduceMotion: true));
    await tester.pumpAndSettle();
    expect(find.descendant(of: find.byType(LdsSkeleton), matching: find.byType(FractionalTranslation)), findsNothing);
  });

  testWidgets('LdsMasthead text is configurable', (tester) async {
    await tester.pumpWidget(wrap(const LdsMasthead()));
    expect(find.text(LdsMasthead.defaultText), findsOneWidget);
    await tester.pumpWidget(wrap(const LdsMasthead(text: 'Aplikasi contoh, bukan layanan resmi.')));
    expect(find.text('Aplikasi contoh, bukan layanan resmi.'), findsOneWidget);
  });

  group('aksara', () {
    test("'Lampung' is la, ma+nengen, pa+ang+u", () {
      final cells = ldsToAksara('Lampung');
      expect(cells.length, 3);
      expect(cells[0].letter, 'la');
      expect(cells[0].above, isEmpty);
      expect(cells[1].letter, 'ma');
      expect(cells[1].after, ['nengen']);
      expect(cells[2].letter, 'pa');
      expect(cells[2].above, ['ang']);
      expect(cells[2].below, ['u']);
    });

    test('diphthongs, codas and spaces', () {
      expect(ldsToAksara('sai').single.after, ['ai']);
      expect(ldsToAksara('bumi').map((c) => c.toString()), ['ba+u', 'ma+i']);
      expect(ldsToAksara('ruwa jurai').where((c) => c.isSpace).length, 1);
      expect(ldsToAksara('rumah').last.after, ['ah']);
      expect(ldsToAksara('ban').single.above, ['an']);
    });

    testWidgets('LdsAksara is labeled, LdsAksaraBand is hidden', (tester) async {
      await tester.pumpWidget(wrap(const Column(children: [
        LdsAksara('Lampung'),
        LdsAksaraBand(),
      ])));
      expect(tester.takeException(), isNull);
      expect(find.bySemanticsLabel('Lampung'), findsOneWidget);
      expect(find.bySemanticsLabel(LdsAksaraBand.defaultText), findsNothing);
      expect(tester.getSize(find.byType(LdsAksara)).height, 32);
    });
  });

  testWidgets('press scale is skipped with reduced motion', (tester) async {
    await tester.pumpWidget(wrap(LdsButton(label: 'Kirim', onPressed: () {}), reduceMotion: true));
    final gesture = await tester.startGesture(tester.getCenter(find.text('Kirim')));
    await tester.pump(const Duration(milliseconds: 50));
    final scale = tester.widget<AnimatedScale>(find.descendant(of: find.byType(LdsPressable), matching: find.byType(AnimatedScale)).first);
    expect(scale.scale, 1);
    await gesture.up();
  });
}
