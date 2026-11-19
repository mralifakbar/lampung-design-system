import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lampung_design_system/src/expressive.dart';
import 'package:lampung_design_system/src/theme.dart';
import 'package:material_ui/material_ui.dart';

import 'helpers.dart';

/// Pumps [build] in light and dark and checks nothing throws.
Future<void> renderBoth(
  WidgetTester tester,
  Widget Function() build, {
  bool settle = false,
  bool reset = true,
}) async {
  for (final dark in [false, true]) {
    await tester.pumpWidget(wrap(build(), dark: dark));
    if (settle) {
      await tester.pumpAndSettle();
    } else {
      await tester.pump(const Duration(milliseconds: 700));
    }
    expect(tester.takeException(), isNull);
  }
  // Start the next pump from a fresh tree.
  if (reset) await tester.pumpWidget(const SizedBox());
}

Widget scroll(Widget child) => SingleChildScrollView(child: child);

double opacityAbove(WidgetTester tester, Finder finder) => tester
    .widgetList<Opacity>(
      find.ancestor(of: finder, matching: find.byType(Opacity)),
    )
    .fold(1.0, (v, o) => v * o.opacity);

void main() {
  group('LdsEnterExit', () {
    testWidgets('enters, leaves faster and removes the child', (tester) async {
      Widget build(bool v, {bool reduce = false}) => wrap(
        LdsEnterExit(visible: v, child: const Text('Menu layanan')),
        reduceMotion: reduce,
      );
      await renderBoth(
        tester,
        () => const LdsEnterExit(
          visible: true,
          style: LdsEnterStyle.menu,
          child: Text('Menu'),
        ),
      );
      await tester.pumpWidget(build(false));
      expect(find.text('Menu layanan'), findsNothing);
      await tester.pumpWidget(build(true));
      await tester.pump(const Duration(milliseconds: 600));
      expect(opacityAbove(tester, find.text('Menu layanan')), 1);
      await tester.pumpWidget(build(false));
      await tester.pump(const Duration(milliseconds: 100));
      expect(find.text('Menu layanan'), findsOneWidget);
      await tester.pump(const Duration(milliseconds: 100));
      expect(find.text('Menu layanan'), findsNothing);
    });

    testWidgets('reduced motion only fades, no scale', (tester) async {
      await tester.pumpWidget(
        wrap(
          const LdsEnterExit(visible: false, child: Text('Dialog')),
          reduceMotion: true,
        ),
      );
      await tester.pumpWidget(
        wrap(
          const LdsEnterExit(visible: true, child: Text('Dialog')),
          reduceMotion: true,
        ),
      );
      await tester.pump(const Duration(milliseconds: 40));
      final scale = tester
          .widgetList<Transform>(
            find.ancestor(
              of: find.text('Dialog'),
              matching: find.byType(Transform),
            ),
          )
          .map((t) => t.transform.getMaxScaleOnAxis());
      expect(scale.every((s) => s == 1), isTrue);
      await tester.pump(const Duration(milliseconds: 100));
      expect(opacityAbove(tester, find.text('Dialog')), 1);
    });
  });

  group('LdsListStagger', () {
    testWidgets('items are in the tree at once and arrive by 400 ms', (
      tester,
    ) async {
      Widget list() => LdsListStagger(
        spacing: 8,
        children: [for (var i = 0; i < 6; i++) Text('Hasil $i')],
      );
      await renderBoth(tester, list);
      await tester.pumpWidget(wrap(list()));
      expect(find.text('Hasil 5'), findsOneWidget);
      expect(opacityAbove(tester, find.text('Hasil 5')), lessThan(1));
      await tester.pump(const Duration(milliseconds: 400));
      expect(opacityAbove(tester, find.text('Hasil 5')), 1);
      expect(LdsStaggerItem.delayFor(9), const Duration(milliseconds: 140));
    });

    testWidgets('reduced motion shows every item at once', (tester) async {
      await tester.pumpWidget(
        wrap(
          const LdsListStagger(children: [Text('A'), Text('B')]),
          reduceMotion: true,
        ),
      );
      await tester.pump();
      expect(opacityAbove(tester, find.text('B')), 1);
    });
  });

  group('LdsReveal', () {
    Widget page() => ListView(
      children: [
        const LdsReveal(child: Text('Di atas')),
        const SizedBox(height: 1200),
        const LdsReveal(child: Text('Angka kunci')),
        const SizedBox(height: 400),
      ],
    );

    testWidgets('first screen shows at once, the rest on scroll', (
      tester,
    ) async {
      await renderBoth(tester, page);
      await tester.pumpWidget(wrap(SizedBox(height: 500, child: page())));
      await tester.pump();
      expect(opacityAbove(tester, find.text('Di atas')), 1);
      await tester.drag(find.byType(ListView), const Offset(0, -1100));
      await tester.pump();
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 400));
      expect(opacityAbove(tester, find.text('Angka kunci')), 1);
    });

    testWidgets('reduced motion hides nothing', (tester) async {
      await tester.pumpWidget(
        wrap(SizedBox(height: 500, child: page()), reduceMotion: true),
      );
      await tester.pump();
      await tester.drag(find.byType(ListView), const Offset(0, -1100));
      await tester.pump();
      expect(opacityAbove(tester, find.text('Angka kunci')), 1);
    });
  });

  group('LdsHaptics', () {
    testWidgets('plays through the platform and can be turned off', (
      tester,
    ) async {
      final calls = <MethodCall>[];
      tester.binding.defaultBinaryMessenger.setMockMethodCallHandler(
        SystemChannels.platform,
        (call) async {
          calls.add(call);
          return null;
        },
      );
      addTearDown(
        () => tester.binding.defaultBinaryMessenger.setMockMethodCallHandler(
          SystemChannels.platform,
          null,
        ),
      );
      await LdsHaptics.play(LdsHapticKind.light);
      expect(calls.single.method, 'HapticFeedback.vibrate');
      expect(calls.single.arguments, 'HapticFeedbackType.lightImpact');
      calls.clear();
      LdsHaptics.enabled = false;
      addTearDown(() => LdsHaptics.enabled = true);
      await LdsHaptics.play(LdsHapticKind.medium);
      expect(calls, isEmpty);
    });
  });

  group('LdsTextMorph', () {
    testWidgets('morphs letters and reads the whole word', (tester) async {
      await renderBoth(tester, () => const LdsTextMorph('Simpan draf'));
      Widget build(String t, {bool reduce = false}) =>
          wrap(LdsTextMorph(t, liveRegion: true), reduceMotion: reduce);
      await tester.pumpWidget(build('Menyimpan'));
      await tester.pumpWidget(build('Tersimpan'));
      await tester.pump(const Duration(milliseconds: 100));
      expect(find.bySemanticsLabel('Tersimpan'), findsOneWidget);
      expect(find.text('Tersimpan'), findsNothing); // letters are moving
      await tester.pump(const Duration(milliseconds: 600));
      expect(find.text('Tersimpan'), findsOneWidget);
    });

    testWidgets('reduced motion replaces the word at once', (tester) async {
      await tester.pumpWidget(
        wrap(const LdsTextMorph('Diajukan'), reduceMotion: true),
      );
      await tester.pumpWidget(
        wrap(const LdsTextMorph('Disetujui'), reduceMotion: true),
      );
      await tester.pump();
      expect(find.text('Disetujui'), findsOneWidget);
    });
  });

  group('LdsIconSwap', () {
    testWidgets('swaps to the second glyph', (tester) async {
      Widget build(bool s) =>
          LdsIconSwap(icon: 'content_copy', swappedIcon: 'check', swapped: s);
      await renderBoth(tester, () => build(false));
      await tester.pumpWidget(wrap(build(false)));
      expect(opacityAbove(tester, find.text('check')), 0);
      await tester.pumpWidget(wrap(build(true)));
      await tester.pump(const Duration(milliseconds: 400));
      expect(opacityAbove(tester, find.text('check')), 1);
      expect(opacityAbove(tester, find.text('content_copy')), 0);
    });
  });

  group('LdsLike', () {
    testWidgets('fills optimistically and reverts with a shake', (
      tester,
    ) async {
      final like = LdsLikeController(count: 128);
      addTearDown(like.dispose);
      bool? changed;
      await renderBoth(tester, () => LdsLike(controller: LdsLikeController()));
      await tester.pumpWidget(
        wrap(LdsLike(controller: like, onChanged: (v) => changed = v)),
      );
      await tester.tap(find.byType(LdsLike));
      await tester.pump(const Duration(milliseconds: 100));
      expect(like.liked, isTrue);
      expect(like.count, 129);
      expect(changed, isTrue);
      expect(find.bySemanticsLabel('Suka, 129'), findsOneWidget);
      final danger = tester.element(find.byType(LdsLike)).lds.danger;
      final heart = tester.widget<Text>(find.text('favorite'));
      expect(heart.style?.color, danger);
      await tester.pump(const Duration(milliseconds: 700));
      like.revert();
      await tester.pump(const Duration(milliseconds: 100));
      expect(like.liked, isFalse);
      expect(like.count, 128);
      await tester.pump(const Duration(milliseconds: 700));
      expect(tester.takeException(), isNull);
    });

    testWidgets('keeps a 44 px hit area', (tester) async {
      final like = LdsLikeController();
      addTearDown(like.dispose);
      await tester.pumpWidget(wrap(LdsLike(controller: like)));
      expect(
        tester.getSize(find.byType(LdsLike)).height,
        greaterThanOrEqualTo(44),
      );
    });
  });

  group('LdsBell', () {
    double angle(WidgetTester tester) {
      final t = tester.widget<Transform>(
        find
            .ancestor(
              of: find.text('notifications'),
              matching: find.byType(Transform),
            )
            .first,
      );
      return t.transform.storage[1].abs();
    }

    testWidgets('rings once when asked', (tester) async {
      await renderBoth(tester, () => const LdsBell());
      await tester.pumpWidget(wrap(const LdsBell()));
      await tester.pumpWidget(wrap(const LdsBell(rings: 1)));
      await tester.pump(const Duration(milliseconds: 100));
      expect(angle(tester), greaterThan(0.01));
      await tester.pump(const Duration(milliseconds: 600));
      expect(angle(tester), closeTo(0, 0.001));
    });

    testWidgets('does not ring under reduced motion', (tester) async {
      await tester.pumpWidget(wrap(const LdsBell(), reduceMotion: true));
      await tester.pumpWidget(
        wrap(const LdsBell(rings: 1), reduceMotion: true),
      );
      await tester.pump(const Duration(milliseconds: 100));
      expect(angle(tester), closeTo(0, 0.001));
    });
  });

  group('LdsThinking', () {
    testWidgets('counts and settles into the result', (tester) async {
      await renderBoth(
        tester,
        () => const LdsThinking(label: 'Memeriksa jadwal'),
      );
      await tester.pumpWidget(
        wrap(const LdsThinking(label: 'Memeriksa jadwal Anda')),
      );
      await tester.pump(const Duration(milliseconds: 1250));
      expect(find.textContaining('dtk'), findsOneWidget);
      await tester.pumpWidget(
        wrap(const LdsThinking(label: 'Ditemukan 3 slot kosong', done: true)),
      );
      await tester.pump(const Duration(milliseconds: 800));
      expect(find.text('Ditemukan 3 slot kosong'), findsOneWidget);
    });

    testWidgets('reduced motion stops the dots at 60 %', (tester) async {
      await tester.pumpWidget(
        wrap(const LdsThinking(label: 'Memeriksa berkas'), reduceMotion: true),
      );
      await tester.pump(const Duration(milliseconds: 500));
      final dots = tester
          .widgetList<Opacity>(find.byType(Opacity))
          .where((o) => o.opacity == 0.6);
      expect(dots.length, 9);
    });
  });

  group('LdsStreamingText', () {
    testWidgets('words arrive, caret shows, read once at the end', (
      tester,
    ) async {
      await renderBoth(
        tester,
        () => const LdsStreamingText(text: 'Izin usaha', streaming: true),
      );
      Widget build(String t, bool s) =>
          wrap(LdsStreamingText(text: t, streaming: s));
      await tester.pumpWidget(build('Permohonan', true));
      await tester.pumpWidget(build('Permohonan Anda', true));
      await tester.pump(const Duration(milliseconds: 100));
      expect(find.byType(DecoratedBox), findsWidgets); // caret
      await tester.pumpWidget(
        build('Permohonan Anda sedang diperiksa.', false),
      );
      await tester.pump(const Duration(milliseconds: 400));
      expect(
        find.bySemanticsLabel('Permohonan Anda sedang diperiksa.'),
        findsOneWidget,
      );
    });

    test('wordStream grows word by word', () async {
      final parts = await LdsStreamingText.wordStream(
        'Satu dua tiga',
        wordDelay: Duration.zero,
      ).toList();
      expect(parts, ['Satu ', 'Satu dua ', 'Satu dua tiga']);
      expect(
        await LdsStreamingText.wordStream('Satu dua', instant: true).toList(),
        ['Satu dua'],
      );
    });
  });

  group('LdsToolCall', () {
    testWidgets('opens to its body and shows a spinner while running', (
      tester,
    ) async {
      await renderBoth(
        tester,
        () => const LdsToolCall(
          label: 'Mencari di catatan Anda',
          icon: 'search',
          body: Text('3 catatan ditemukan'),
        ),
      );
      await tester.pumpWidget(
        wrap(
          const LdsToolCall(
            label: 'Membaca Peraturan Daerah 3',
            icon: 'description',
            body: Text('Pasal 4 mengatur izin'),
          ),
        ),
      );
      expect(find.text('Pasal 4 mengatur izin'), findsNothing);
      await tester.tap(find.text('Membaca Peraturan Daerah 3'));
      await tester.pump(const Duration(milliseconds: 600));
      expect(find.text('Pasal 4 mengatur izin'), findsOneWidget);
      await tester.pumpWidget(
        wrap(
          const LdsToolCall(
            label: 'Memeriksa kalender',
            status: LdsToolCallStatus.running,
          ),
        ),
      );
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
    });
  });

  group('Chat', () {
    testWidgets('messages render in both modes', (tester) async {
      await renderBoth(
        tester,
        () => scroll(
          Column(
            children: [
              const LdsChatMessage.system('Hari ini'),
              const LdsChatMessage.me(text: 'Bagaimana cara mengurus KTP?'),
              const LdsChatMessage.assistant(
                text: 'Bawa kartu keluarga ke kantor kecamatan.',
                steps: [LdsToolCall(label: 'Mencari panduan', icon: 'search')],
                meta: '09.41',
                isNew: true,
              ),
              LdsChatMessage(
                role: LdsChatRole.me,
                text: 'Terima kasih',
                error: 'Belum terkirim. Anda sedang offline.',
                onRetry: () {},
              ),
            ],
          ),
        ),
        reset: false,
      );
      expect(find.text('Coba lagi'), findsOneWidget);
    });

    testWidgets('composer sends on Enter and on the button', (tester) async {
      final sent = <String>[];
      await renderBoth(tester, () => LdsComposer(onSend: (_) {}));
      await tester.pumpWidget(wrap(LdsComposer(onSend: sent.add)));
      // Empty: send is disabled.
      await tester.tap(find.bySemanticsLabel('Kirim'), warnIfMissed: false);
      expect(sent, isEmpty);
      await tester.enterText(find.byType(TextField), 'Jadwal posyandu?');
      await tester.pump();
      await tester.sendKeyEvent(LogicalKeyboardKey.enter);
      await tester.pump();
      expect(sent, ['Jadwal posyandu?']);
      expect(find.text('Jadwal posyandu?'), findsNothing);
      await tester.enterText(find.byType(TextField), 'Lokasinya?');
      await tester.pump();
      await tester.tap(find.bySemanticsLabel('Kirim'));
      await tester.pump(const Duration(milliseconds: 400));
      expect(sent.last, 'Lokasinya?');
    });

    testWidgets('layout shows Terbaru only when scrolled up', (tester) async {
      Widget build(int n) => wrap(
        SizedBox(
          height: 560,
          child: LdsChatLayout(
            messages: [
              for (var i = 0; i < n; i++)
                LdsChatMessage.me(text: 'Pesan nomor $i'),
            ],
            composer: LdsComposer(onSend: (_) {}),
            empty: const Text('Tanyakan layanan kota'),
          ),
        ),
      );
      await tester.pumpWidget(build(0));
      expect(find.text('Tanyakan layanan kota'), findsOneWidget);
      await tester.pumpWidget(build(30));
      await tester.pump(const Duration(milliseconds: 700));
      expect(tester.takeException(), isNull);
      expect(find.text('Pesan nomor 29'), findsOneWidget);
      await tester.drag(find.byType(ListView), const Offset(0, 600));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));
      expect(opacityAbove(tester, find.text('Terbaru')), 1);
      expect(find.text('Pesan nomor 29'), findsNothing);
      await tester.tap(find.text('Terbaru'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 800));
      expect(find.text('Pesan nomor 29'), findsOneWidget);
    });
  });

  group('LdsSharedElement', () {
    testWidgets('opens the large view and closes it', (tester) async {
      await tester.pumpWidget(
        wrap(
          Builder(
            builder: (context) => GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTap: () => LdsSharedElement.open(
                context,
                tag: 'foto',
                caption: 'Taman kota, sisi utara',
                child: const SizedBox(width: 200, height: 120),
              ),
              child: const LdsSharedElement(
                tag: 'foto',
                child: SizedBox(width: 80, height: 48),
              ),
            ),
          ),
        ),
      );
      await tester.tap(find.byType(LdsSharedElement));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 500));
      expect(find.text('Taman kota, sisi utara'), findsOneWidget);
      await tester.tap(find.bySemanticsLabel('Tutup').first);
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));
      expect(find.text('Taman kota, sisi utara'), findsNothing);
      expect(tester.takeException(), isNull);
    });
  });

  group('LdsMomentumDrag', () {
    test('formulas', () {
      expect(LdsMomentum.rubberBand(0, 52), 0);
      expect(LdsMomentum.rubberBand(1000, 52), lessThan(52 * 0.55 / 0.55));
      expect(LdsMomentum.rubberBand(-20, 40), lessThan(0));
      expect(LdsMomentum.project(100, 1000), closeTo(199, 0.01));
    });

    testWidgets('a flick snaps forward; arrow keys step', (tester) async {
      final snaps = <int>[];
      Widget build({bool reduce = false}) => wrap(
        SizedBox(
          width: 400,
          child: Align(
            alignment: Alignment.centerLeft,
            child: LdsMomentumDrag(
              semanticLabel: 'Geser untuk konfirmasi',
              snapPoints: const [0, 200],
              onSnap: snaps.add,
              child: Container(width: 52, height: 52, color: Colors.green),
            ),
          ),
        ),
        reduceMotion: reduce,
      );
      await tester.pumpWidget(build());
      await tester.fling(
        find.byType(Container).last,
        const Offset(60, 0),
        1500,
      );
      await tester.pumpAndSettle();
      expect(snaps.last, 1);
      await tester.sendKeyEvent(LogicalKeyboardKey.tab);
      await tester.pump();
      await tester.sendKeyEvent(LogicalKeyboardKey.arrowLeft);
      await tester.pumpAndSettle();
      expect(snaps.last, 0);
    });

    testWidgets('reduced motion settles in 120 ms', (tester) async {
      await tester.pumpWidget(
        wrap(
          Align(
            alignment: Alignment.centerLeft,
            child: LdsMomentumDrag(
              semanticLabel: 'Geser',
              snapPoints: const [0, 200],
              child: Container(width: 52, height: 52, color: Colors.green),
            ),
          ),
          reduceMotion: true,
        ),
      );
      await tester.drag(find.byType(Container).last, const Offset(150, 0));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 130));
      final dx =
          tester.getTopLeft(find.byType(Container).last).dx -
          tester.getTopLeft(find.byType(LdsMomentumDrag)).dx;
      expect(dx, closeTo(200, 0.5));
    });
  });

  group('Marketing', () {
    testWidgets('hero, section, feature, CTA, testimonial render', (
      tester,
    ) async {
      Widget page() => scroll(
        Column(
          children: [
            LdsHero(
              title: 'Urus izin usaha dari rumah.',
              quietTitle: 'Tanpa antre.',
              lede: 'Ajukan, pantau dan unduh izin dalam satu tempat.',
              actions: [
                FilledButton(
                  onPressed: () {},
                  child: const Text('Ajukan izin'),
                ),
              ],
              note: 'Contoh data, bukan layanan resmi.',
              media: const LdsFeatureStage(child: SizedBox(height: 120)),
            ),
            LdsMarketingSection(
              eyebrow: 'Layanan',
              eyebrowIcon: 'widgets',
              title: 'Semua layanan di satu tempat',
              lede: 'Pilih layanan, isi formulir, pantau statusnya.',
              aside: TextButton(
                onPressed: () {},
                child: const Text('Lihat semua'),
              ),
              rule: true,
              child: const LdsFeatureRow(
                eyebrow: 'Pelacakan',
                title: 'Pantau permohonan',
                body: 'Status berubah begitu petugas memeriksa berkas.',
                points: [
                  LdsFeaturePoint(
                    icon: 'check_circle',
                    text: 'Notifikasi tiap tahap',
                  ),
                ],
                stage: LdsFeatureStage(child: SizedBox(height: 80)),
                caption: 'Contoh data.',
                reverse: true,
              ),
            ),
            LdsCtaBand(
              title: 'Siap mengajukan izin?',
              body: 'Gratis untuk warga.',
              actions: [
                FilledButton(
                  onPressed: () {},
                  child: const Text('Ajukan izin'),
                ),
              ],
            ),
            const LdsTestimonial(
              quote: 'Izin warung saya selesai dalam tiga hari.',
              name: 'Siti Rahma',
              role: 'Pemilik warung (contoh)',
              large: true,
            ),
          ],
        ),
      );
      await renderBoth(tester, page, reset: false);
      expect(find.text('SR'), findsOneWidget);
      // Wide screens put the hero side by side.
      tester.view.physicalSize = const Size(1400, 1000);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.reset);
      await renderBoth(tester, page);
    });

    testWidgets('hero enter is skipped under reduced motion', (tester) async {
      await tester.pumpWidget(
        wrap(
          scroll(const LdsHero(title: 'Lapor jalan rusak')),
          reduceMotion: true,
        ),
      );
      await tester.pump();
      expect(opacityAbove(tester, find.text('Lapor jalan rusak')), 1);
    });

    testWidgets('plans switch period and roll the price', (tester) async {
      var period = LdsBillingPeriod.month;
      Widget build() => scroll(
        StatefulBuilder(
          builder: (context, setState) => LdsPlans(
            period: period,
            onPeriodChanged: (p) => setState(() => period = p),
            saveNote: 'Hemat 2 bulan dengan tagihan tahunan',
            plans: [
              LdsPlan(
                name: 'Dasar',
                description: 'Untuk satu kantor desa',
                monthlyPrice: 150000,
                yearlyPrice: 125000,
                yearlyNote: 'Rp 1.500.000 sekali setahun',
                monthlyNote: 'Ditagih tiap bulan',
                features: const ['5 petugas', 'Laporan bulanan'],
                actionLabel: 'Pilih Dasar',
                onSelect: () {},
              ),
              const LdsPlan(
                name: 'Kota',
                monthlyPrice: 900000,
                yearlyPrice: 750000,
                featured: true,
                features: ['Petugas tanpa batas'],
                actionLabel: 'Pilih Kota',
              ),
            ],
          ),
        ),
      );
      await renderBoth(tester, build);
      await tester.pumpWidget(wrap(build()));
      expect(find.text('150.000'), findsOneWidget);
      await tester.tap(find.text('Tahunan'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 700));
      expect(find.text('125.000'), findsOneWidget);
      expect(find.text('150.000'), findsNothing);
      expect(ldsFormatAmount(1500000), '1.500.000');
    });

    testWidgets('footer links are 44 px and tappable', (tester) async {
      var opened = '';
      await renderBoth(
        tester,
        () => scroll(
          LdsSiteFooter(
            name: 'Layanan Kota Contoh',
            about: 'Contoh situs, bukan layanan resmi.',
            groups: [
              LdsFooterGroup(
                title: 'Layanan',
                links: [
                  LdsFooterLink(
                    label: 'Izin usaha',
                    onTap: () => opened = 'izin',
                  ),
                ],
              ),
            ],
            smallPrint: '© 2026 Dinas Layanan Kota Contoh. Data contoh.',
          ),
        ),
        reset: false,
      );
      await tester.tap(find.text('Izin usaha'));
      expect(opened, 'izin');
      expect(
        tester
            .getSize(
              find
                  .ancestor(
                    of: find.text('Izin usaha'),
                    matching: find.byType(GestureDetector),
                  )
                  .first,
            )
            .height,
        greaterThanOrEqualTo(44),
      );
    });
  });

  group('Device', () {
    testWidgets('frame renders, pushes back and bleeds', (tester) async {
      Widget build(bool pushed, {bool bleed = false}) => SizedBox(
        width: 300,
        height: 560,
        child: LdsDeviceFrame(
          pushed: pushed,
          bleed: bleed,
          child: const Center(child: Text('Beranda')),
        ),
      );
      await renderBoth(tester, () => build(false));
      await renderBoth(tester, () => build(true));
      await renderBoth(tester, () => build(false, bleed: true), reset: false);
      expect(find.text('Beranda'), findsOneWidget);
      await renderBoth(tester, () => const LdsPhoneStatusBar(light: true));
    });

    testWidgets('phone screen collapses its title and switches tabs', (
      tester,
    ) async {
      var tab = 0;
      Widget build() => SizedBox(
        width: 390,
        height: 560,
        child: StatefulBuilder(
          builder: (context, setState) => LdsPhoneScreen(
            title: 'Hari ini',
            tabs: const [
              LdsPhoneTab(icon: 'home', label: 'Beranda'),
              LdsPhoneTab(icon: 'calendar_month', label: 'Jadwal'),
              LdsPhoneTab(icon: 'person', label: 'Profil'),
            ],
            currentTab: tab,
            onTabSelected: (i) => setState(() => tab = i),
            children: [
              for (var i = 0; i < 20; i++)
                SizedBox(height: 56, child: Text('Layanan $i')),
            ],
          ),
        ),
      );
      await renderBoth(tester, build);
      await tester.pumpWidget(wrap(build()));
      final small = find.byWidgetPredicate(
        (w) => w is Text && w.data == 'Hari ini' && w.style?.fontSize == 17,
      );
      double fade() => tester
          .widget<AnimatedOpacity>(
            find
                .ancestor(of: small, matching: find.byType(AnimatedOpacity))
                .first,
          )
          .opacity;
      expect(fade(), 0);
      await tester.drag(find.byType(ListView), const Offset(0, -200));
      await tester.pump(const Duration(milliseconds: 400));
      expect(fade(), 1);
      await tester.tap(find.text('Jadwal'));
      await tester.pump(const Duration(milliseconds: 400));
      expect(tab, 1);
    });
  });
}
