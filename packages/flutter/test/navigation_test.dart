import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lampung_design_system/src/navigation.dart';
import 'package:lampung_design_system/src/theme.dart';

import 'helpers.dart';

/// Example content used across the tests (fictional public service data).
const _tabs = [
  LdsTab(value: 'ringkasan', label: 'Ringkasan'),
  LdsTab(value: 'dokumen', label: 'Dokumen', count: 3),
  LdsTab(value: 'riwayat', label: 'Riwayat'),
];

const _sidebarItems = [
  LdsSidebarItem(value: 'beranda', label: 'Beranda', icon: 'home'),
  LdsSidebarItem(
      value: 'laporan',
      label: 'Laporan warga',
      icon: 'description',
      badge: '12'),
  LdsSidebarItem(
      value: 'pengaturan',
      label: 'Pengaturan',
      icon: 'settings',
      heading: 'Akun'),
];

final Map<String, Widget Function()> _gallery = {
  'LdsTabs': () =>
      LdsTabs<String>(tabs: _tabs, value: 'ringkasan', onChanged: (_) {}),
  'LdsTabs start': () => LdsTabs<String>(
      tabs: _tabs,
      value: 'dokumen',
      alignment: LdsTabsAlignment.start,
      onChanged: (_) {}),
  'LdsSlidingIndicator': () => const LdsSlidingIndicator(
      selectedIndex: 1, children: [Text('Satu'), Text('Dua')]),
  'LdsBreadcrumbs': () => LdsBreadcrumbs(items: [
        LdsBreadcrumb(label: 'Layanan', onPressed: () {}),
        const LdsBreadcrumb(label: 'Izin usaha'),
      ]),
  'LdsPagination': () =>
      LdsPagination(page: 5, pageCount: 12, onChanged: (_) {}),
  'LdsSteps': () => const LdsSteps(current: 1, steps: [
        LdsStep(label: 'Data diri'),
        LdsStep(label: 'Dokumen', subtitle: 'KTP dan KK'),
        LdsStep(label: 'Periksa'),
      ]),
  'LdsSteps vertical': () =>
      const LdsSteps(current: 2, direction: Axis.vertical, steps: [
        LdsStep(label: 'Data diri'),
        LdsStep(label: 'Dokumen'),
        LdsStep(label: 'Periksa'),
      ]),
  'LdsSidebar': () => LdsSidebar<String>(
      items: _sidebarItems, value: 'laporan', onChanged: (_) {}),
  'LdsTopNav': () => LdsTopNav<String>(
        brand: const Text('Layanan Kota Contoh'),
        links: const [
          LdsTopNavLink(value: 'beranda', label: 'Beranda'),
          LdsTopNavLink(value: 'layanan', label: 'Layanan'),
        ],
        value: 'beranda',
        onChanged: (_) {},
      ),
  'LdsAppShell': () => SizedBox(
        width: 1000,
        height: 500,
        child: LdsAppShell<String>(
          brand: const Text('Dinas Layanan Kota Contoh'),
          destinations: _sidebarItems,
          value: 'beranda',
          onChanged: (_) {},
          body: const Text('Isi halaman'),
        ),
      ),
  'LdsNavStack': () => SizedBox(
        width: 360,
        height: 400,
        child: LdsNavStack(
          rootTitle: 'Laporan',
          root: (_) => const Text('Daftar laporan'),
        ),
      ),
  'LdsNavProgress': () => const LdsNavProgress(running: true),
  'LdsPageHeader': () => LdsPageHeader(
        title: 'Izin usaha mikro',
        subtitle: 'Nomor PB-2024-0183',
        breadcrumbs: [
          LdsBreadcrumb(label: 'Perizinan', onPressed: () {}),
          const LdsBreadcrumb(label: 'Izin usaha mikro'),
        ],
        actions: const [Text('Aksi')],
      ),
  'LdsAccordion': () => const LdsAccordion(items: [
        LdsAccordionItem(
            title: 'Berapa lama izin diproses?',
            subtitle: 'Perizinan',
            initiallyOpen: true,
            child: Text('Paling lama lima hari kerja.')),
        LdsAccordionItem(
            title: 'Apakah ada biaya?', child: Text('Tidak ada biaya.')),
      ]),
  'LdsOutline': () => LdsOutline(
      entries: const ['Syarat', 'Biaya', 'Waktu'],
      current: 1,
      onSelected: (_) {}),
  'LdsTree': () => const LdsTree<String>(
        initiallyExpanded: {'arsip'},
        selected: 'ktp',
        nodes: [
          LdsTreeNode(
              value: 'arsip',
              label: 'Arsip',
              icon: 'folder',
              children: [
                LdsTreeNode(
                    value: 'ktp', label: 'KTP.pdf', icon: 'description'),
              ]),
        ],
      ),
  'LdsSeparator': () => const Column(children: [
        LdsSeparator(),
        LdsSeparator.label('atau'),
        LdsSeparator.label('Senin, 3 Juni',
            labelAlign: LdsSeparatorLabelAlign.start),
        SizedBox(height: 24, child: LdsSeparator.vertical()),
      ]),
  'LdsResizableSplit': () => const SizedBox(
        width: 600,
        height: 300,
        child: LdsResizableSplit(first: Text('Daftar'), second: Text('Detail')),
      ),
  'LdsCarousel': () => SizedBox(
        width: 600,
        child: LdsCarousel(height: 120, children: [
          for (var i = 0; i < 5; i++) Text('Kartu ${i + 1}'),
        ]),
      ),
  'LdsShowMore': () => const LdsShowMore(
      visible: [Text('Puskesmas A')], rest: [Text('Puskesmas B')]),
  'LdsHeightExpand': () =>
      const LdsHeightExpand(open: true, child: Text('Isi')),
  'LdsScrollFades': () => SizedBox(
        height: 200,
        child: LdsScrollFades(
          child: ListView(children: [
            for (var i = 0; i < 30; i++) Text('Baris $i'),
          ]),
        ),
      ),
  'LdsExpandingToolbar': () => LdsExpandingToolbar(tools: [
        LdsToolbarTool(icon: 'edit', label: 'Ubah', onPressed: () {}),
        LdsToolbarTool(icon: 'search', label: 'Cari', onPressed: () {}),
      ]),
  'LdsFloatingAction': () => LdsFloatingAction(
      icon: 'add', semanticLabel: 'Buat laporan', onPressed: () {}),
  'LdsButtonGroup': () => LdsButtonGroup(buttons: [
        LdsGroupButton(
            icon: 'undo', semanticLabel: 'Urungkan', onPressed: () {}),
        const LdsGroupButton(
            icon: 'redo', semanticLabel: 'Ulangi', onPressed: null),
        LdsGroupButton(label: 'Riwayat', onPressed: () {}),
      ]),
  'LdsSplitButton': () => LdsSplitButton(
        label: 'Terbitkan',
        onPressed: () {},
        items: [LdsSplitButtonItem(label: 'Jadwalkan', onPressed: () {})],
      ),
  'LdsMenuIcon': () => const LdsMenuIcon(open: true),
  'LdsMenuButton': () => LdsMenuButton(open: false, onPressed: () {}),
  'Layout primitives': () => const SizedBox(
        width: 700,
        child: LdsStack(children: [
          LdsCluster(children: [Text('A'), Text('B')]),
          LdsAutoGrid(children: [Text('1'), Text('2'), Text('3')]),
          LdsSplit2(side: Text('Samping'), main: Text('Utama')),
          LdsCenter(child: Text('Tengah')),
          LdsMeasure(child: Text('Teks panjang')),
          LdsVisuallyHidden('Judul tersembunyi'),
        ]),
      ),
  'LdsSections': () => const SingleChildScrollView(
        child: LdsSections(children: [
          LdsSection(title: 'Syarat', children: [Text('KTP')]),
          LdsSection(
              title: 'Biaya',
              subtitle: 'Tidak dipungut biaya.',
              children: [LdsSectionSubtitle('Rincian')]),
        ]),
      ),
  'LdsViewSwap': () =>
      const LdsViewSwap(child: Text('Panel', key: ValueKey(1))),
};

Future<void> _pumpBoth(WidgetTester tester, Widget Function() build) async {
  for (final dark in [false, true]) {
    await tester.pumpWidget(wrap(build(), dark: dark));
    await tester.pumpAndSettle();
    expect(tester.takeException(), isNull);
  }
}

void main() {
  group('renders light and dark', () {
    for (final entry in _gallery.entries) {
      testWidgets(entry.key, (tester) => _pumpBoth(tester, entry.value));
    }
  });

  testWidgets('LdsTabs: tap and arrow keys change the value', (tester) async {
    var value = 'ringkasan';
    await tester.pumpWidget(wrap(StatefulBuilder(
      builder: (context, setState) => LdsTabs<String>(
        tabs: _tabs,
        value: value,
        onChanged: (v) => setState(() => value = v),
      ),
    )));
    await tester.tap(find.text('Riwayat'));
    await tester.pumpAndSettle();
    expect(value, 'riwayat');
    await tester.sendKeyEvent(LogicalKeyboardKey.tab);
    await tester.pump();
    await tester.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await tester.pumpAndSettle();
    expect(value, 'ringkasan');
  });

  testWidgets('LdsSlidingIndicator moves the marker to the chosen child',
      (tester) async {
    Widget build(int i) => wrap(LdsSlidingIndicator(
          selectedIndex: i,
          children: const [
            SizedBox(height: 40, width: 100),
            SizedBox(height: 40, width: 100),
          ],
        ));
    await tester.pumpWidget(build(0));
    await tester.pumpAndSettle();
    final marker = find.byType(AnimatedPositioned);
    final top0 = tester.getTopLeft(marker).dy;
    await tester.pumpWidget(build(1));
    await tester.pumpAndSettle();
    expect(tester.getTopLeft(marker).dy - top0, closeTo(40, 0.5));
    final context = tester.element(marker);
    final box = tester.widget<DecoratedBox>(
        find.descendant(of: marker, matching: find.byType(DecoratedBox)));
    expect((box.decoration as BoxDecoration).color, context.lds.accentTint);
  });

  testWidgets('LdsBreadcrumbs: ancestors are pressable', (tester) async {
    var taps = 0;
    await tester.pumpWidget(wrap(LdsBreadcrumbs(items: [
      LdsBreadcrumb(label: 'Layanan', onPressed: () => taps++),
      const LdsBreadcrumb(label: 'Izin usaha'),
    ])));
    await tester.tap(find.text('Layanan'));
    expect(taps, 1);
  });

  test('LdsPagination.pageItems shows ends, neighbors and gaps', () {
    expect(LdsPagination.pageItems(5, 12), [1, null, 4, 5, 6, null, 12]);
    expect(LdsPagination.pageItems(1, 3), [1, 2, 3]);
    expect(LdsPagination.pageItems(3, 5), [1, 2, 3, 4, 5]);
  });

  testWidgets('LdsPagination: next goes forward, previous disabled on 1',
      (tester) async {
    int? got;
    await tester.pumpWidget(
        wrap(LdsPagination(page: 1, pageCount: 4, onChanged: (p) => got = p)));
    await tester.tap(find.bySemanticsLabel('Halaman sebelumnya'),
        warnIfMissed: false);
    expect(got, isNull);
    await tester.tap(find.bySemanticsLabel('Halaman berikutnya'));
    expect(got, 2);
  });

  testWidgets('LdsSteps announces each step state', (tester) async {
    await tester.pumpWidget(wrap(const LdsSteps(current: 1, steps: [
      LdsStep(label: 'Data diri'),
      LdsStep(label: 'Dokumen'),
    ])));
    expect(find.bySemanticsLabel('Langkah 1 dari 2, Data diri, selesai'),
        findsOneWidget);
    expect(find.bySemanticsLabel('Langkah 2 dari 2, Dokumen, langkah ini'),
        findsOneWidget);
  });

  testWidgets('LdsSidebar reports the chosen item', (tester) async {
    String? got;
    await tester.pumpWidget(wrap(LdsSidebar<String>(
        items: _sidebarItems, value: 'beranda', onChanged: (v) => got = v)));
    await tester.tap(find.text('Pengaturan'));
    expect(got, 'pengaturan');
  });

  testWidgets('LdsTopNav folds links into a panel on narrow screens',
      (tester) async {
    String? got;
    await tester.pumpWidget(wrap(SizedBox(
      width: 360,
      child: LdsTopNav<String>(
        brand: const Text('Kota Contoh'),
        links: const [
          LdsTopNavLink(value: 'beranda', label: 'Beranda'),
          LdsTopNavLink(value: 'layanan', label: 'Layanan'),
        ],
        value: 'beranda',
        onChanged: (v) => got = v,
      ),
    )));
    await tester.pumpAndSettle();
    expect(find.text('Layanan').hitTestable(), findsNothing);
    await tester.tap(find.bySemanticsLabel('Buka menu'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Layanan'));
    await tester.pumpAndSettle();
    expect(got, 'layanan');
    expect(find.text('Layanan').hitTestable(), findsNothing);
  });

  testWidgets('LdsAppShell opens the drawer on narrow screens', (tester) async {
    String? got;
    await tester.pumpWidget(wrap(SizedBox(
      width: 400,
      height: 600,
      child: LdsAppShell<String>(
        brand: const Text('Kota Contoh'),
        title: 'Beranda',
        destinations: _sidebarItems,
        value: 'beranda',
        onChanged: (v) => got = v,
        body: const Text('Isi halaman'),
      ),
    )));
    await tester.pumpAndSettle();
    expect(find.text('Pengaturan').hitTestable(), findsNothing);
    await tester.tap(find.bySemanticsLabel('Buka menu'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Pengaturan'));
    await tester.pumpAndSettle();
    expect(got, 'pengaturan');
    expect(find.text('Pengaturan').hitTestable(), findsNothing);
  });

  testWidgets('LdsNavStack pushes a screen and goes back', (tester) async {
    await tester.pumpWidget(wrap(SizedBox(
      width: 360,
      height: 500,
      child: LdsNavStack(
        rootTitle: 'Laporan',
        root: (context) => TextButton(
          onPressed: () => LdsNavStack.push<void>(
            context,
            (_) => const Column(children: [LdsBackButton(), Text('Detail')]),
            title: 'Detail',
          ),
          child: const Text('Buka detail'),
        ),
      ),
    )));
    await tester.tap(find.text('Buka detail'));
    await tester.pumpAndSettle();
    expect(find.text('Detail'), findsOneWidget);
    expect(find.text('Laporan'), findsOneWidget);
    await tester.tap(find.text('Laporan'));
    await tester.pumpAndSettle();
    expect(find.text('Detail'), findsNothing);
  });

  testWidgets('LdsNavProgress waits for the delay before showing',
      (tester) async {
    Widget build(bool running) =>
        wrap(SizedBox(width: 400, child: LdsNavProgress(running: running)));
    await tester.pumpWidget(build(true));
    await tester.pump(const Duration(milliseconds: 100));
    expect(tester.widget<Opacity>(find.byType(Opacity)).opacity, 0);
    await tester.pump(const Duration(milliseconds: 200));
    await tester.pump(const Duration(milliseconds: 200));
    expect(tester.widget<Opacity>(find.byType(Opacity)).opacity, 1);
    await tester.pumpWidget(build(false));
    await tester.pumpAndSettle();
    expect(tester.widget<Opacity>(find.byType(Opacity)).opacity, 0);
  });

  testWidgets('LdsPageHeader marks the title as a heading', (tester) async {
    final handle = tester.ensureSemantics();
    await tester.pumpWidget(wrap(const LdsPageHeader(title: 'Izin usaha')));
    expect(
      tester.getSemantics(find.text('Izin usaha')),
      matchesSemantics(label: 'Izin usaha', isHeader: true),
    );
    handle.dispose();
  });

  testWidgets('LdsAccordion single mode keeps one item open', (tester) async {
    await tester.pumpWidget(wrap(const LdsAccordion(single: true, items: [
      LdsAccordionItem(title: 'Satu', child: Text('Jawaban satu')),
      LdsAccordionItem(title: 'Dua', child: Text('Jawaban dua')),
    ])));
    expect(find.text('Jawaban satu').hitTestable(), findsNothing);
    await tester.tap(find.text('Satu'));
    await tester.pumpAndSettle();
    expect(find.text('Jawaban satu').hitTestable(), findsOneWidget);
    await tester.tap(find.text('Dua'));
    await tester.pumpAndSettle();
    expect(find.text('Jawaban dua').hitTestable(), findsOneWidget);
    expect(find.text('Jawaban satu').hitTestable(), findsNothing);
  });

  testWidgets('LdsOutline reports the chosen section', (tester) async {
    int? got;
    await tester.pumpWidget(wrap(LdsOutline(
        entries: const ['Syarat', 'Biaya'],
        current: 0,
        onSelected: (i) => got = i)));
    await tester.tap(find.text('Biaya'));
    expect(got, 1);
  });

  testWidgets('LdsTree opens a parent and selects a leaf', (tester) async {
    String? got;
    await tester.pumpWidget(wrap(LdsTree<String>(
      onSelected: (v) => got = v,
      nodes: const [
        LdsTreeNode(value: 'arsip', label: 'Arsip', children: [
          LdsTreeNode(value: 'ktp', label: 'KTP.pdf'),
        ]),
      ],
    )));
    expect(find.text('KTP.pdf').hitTestable(), findsNothing);
    await tester.tap(find.text('Arsip'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('KTP.pdf'));
    expect(got, 'ktp');
  });

  testWidgets('LdsSeparator label is announced as a heading when asked',
      (tester) async {
    final handle = tester.ensureSemantics();
    await tester.pumpWidget(
        wrap(const LdsSeparator.label('Senin, 3 Juni', header: true)));
    expect(tester.getSemantics(find.text('Senin, 3 Juni')),
        matchesSemantics(label: 'Senin, 3 Juni', isHeader: true));
    handle.dispose();
  });

  testWidgets('LdsResizableSplit moves with keys and clamps', (tester) async {
    double? got;
    await tester.pumpWidget(wrap(SizedBox(
      width: 612,
      height: 300,
      child: LdsResizableSplit(
        first: const Text('Daftar'),
        second: const Text('Detail'),
        onChanged: (v) => got = v,
      ),
    )));
    await tester.sendKeyEvent(LogicalKeyboardKey.tab);
    await tester.pump();
    await tester.sendKeyEvent(LogicalKeyboardKey.end);
    await tester.pump();
    expect(got, 0.8);
    await tester.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await tester.pump();
    expect(got, 0.8);
    await tester.sendKeyEvent(LogicalKeyboardKey.arrowLeft);
    await tester.pump();
    expect(got, closeTo(0.78, 1e-9));
  });

  testWidgets('LdsCarousel dot scrolls to its page', (tester) async {
    await tester.pumpWidget(wrap(SizedBox(
      width: 300,
      child: LdsCarousel(height: 100, itemsPerView: 1, children: [
        for (var i = 0; i < 3; i++) Text('Kartu ${i + 1}'),
      ]),
    )));
    expect(find.text('Kartu 3').hitTestable(), findsNothing);
    await tester.tap(find.bySemanticsLabel('Halaman 3 dari 3'));
    await tester.pumpAndSettle();
    expect(find.text('Kartu 3').hitTestable(), findsOneWidget);
  });

  testWidgets('LdsShowMore reveals and folds the rest', (tester) async {
    await tester.pumpWidget(wrap(const LdsShowMore(
        visible: [Text('Puskesmas A')], rest: [Text('Puskesmas B')])));
    expect(find.text('Puskesmas B').hitTestable(), findsNothing);
    await tester.tap(find.text('Tampilkan 1 lainnya'));
    await tester.pumpAndSettle();
    expect(find.text('Puskesmas B').hitTestable(), findsOneWidget);
    await tester.tap(find.text('Tampilkan lebih sedikit'));
    await tester.pumpAndSettle();
    expect(find.text('Puskesmas B').hitTestable(), findsNothing);
  });

  testWidgets('LdsHeightExpand reaches full height and collapses to zero',
      (tester) async {
    Widget build(bool open) =>
        wrap(Column(mainAxisSize: MainAxisSize.min, children: [
          LdsHeightExpand(
              open: open, child: const SizedBox(height: 80, width: 80)),
        ]));
    await tester.pumpWidget(build(false));
    expect(tester.getSize(find.byType(LdsHeightExpand)).height, 0);
    await tester.pumpWidget(build(true));
    await tester.pumpAndSettle();
    expect(tester.getSize(find.byType(LdsHeightExpand)).height, 80);
  });

  testWidgets('LdsHeightExpand is instant with reduced motion', (tester) async {
    Widget build(bool open) => wrap(
        Column(mainAxisSize: MainAxisSize.min, children: [
          LdsHeightExpand(
              open: open, child: const SizedBox(height: 80, width: 80)),
        ]),
        reduceMotion: true);
    await tester.pumpWidget(build(false));
    await tester.pumpWidget(build(true));
    await tester.pump();
    expect(tester.getSize(find.byType(LdsHeightExpand)).height, 80);
  });

  testWidgets('LdsScrollFades fades the top only after scrolling',
      (tester) async {
    final controller = ScrollController();
    addTearDown(controller.dispose);
    await tester.pumpWidget(wrap(SizedBox(
      height: 200,
      child: LdsScrollFades(
        child: ListView(controller: controller, children: [
          for (var i = 0; i < 40; i++)
            SizedBox(height: 30, child: Text('Baris $i')),
        ]),
      ),
    )));
    await tester.pumpAndSettle();
    controller.jumpTo(100);
    await tester.pumpAndSettle();
    expect(tester.takeException(), isNull);
    expect(find.byType(ShaderMask), findsOneWidget);
  });

  testWidgets('LdsExpandingToolbar calls the tool and shows its label',
      (tester) async {
    var taps = 0;
    await tester.pumpWidget(wrap(LdsExpandingToolbar(tools: [
      LdsToolbarTool(icon: 'edit', label: 'Ubah', onPressed: () {}),
      LdsToolbarTool(icon: 'search', label: 'Cari', onPressed: () => taps++),
    ])));
    await tester.pumpAndSettle();
    await tester.tap(find.bySemanticsLabel('Cari'));
    expect(taps, 1);
  });

  testWidgets('LdsFloatingAction is pressable and hides', (tester) async {
    var taps = 0;
    Widget build(bool visible) => wrap(LdsFloatingAction(
        icon: 'add',
        semanticLabel: 'Buat laporan',
        visible: visible,
        onPressed: () => taps++));
    await tester.pumpWidget(build(true));
    await tester.tap(find.bySemanticsLabel('Buat laporan'));
    expect(taps, 1);
    await tester.pumpWidget(build(false));
    await tester.pumpAndSettle();
    await tester.tap(find.byType(LdsFloatingAction), warnIfMissed: false);
    expect(taps, 1);
  });

  testWidgets('LdsButtonGroup: disabled button ignores taps', (tester) async {
    var undo = 0;
    const redo = 0;
    await tester.pumpWidget(wrap(LdsButtonGroup(buttons: [
      LdsGroupButton(label: 'Urungkan', onPressed: () => undo++),
      const LdsGroupButton(label: 'Ulangi', onPressed: null),
    ])));
    await tester.tap(find.text('Urungkan'));
    await tester.tap(find.text('Ulangi'), warnIfMissed: false);
    expect(undo, 1);
    expect(redo, 0);
  });

  testWidgets('LdsSplitButton runs the main action and opens the menu',
      (tester) async {
    var main = 0;
    var scheduled = 0;
    await tester.pumpWidget(wrap(LdsSplitButton(
      label: 'Terbitkan',
      onPressed: () => main++,
      items: [
        LdsSplitButtonItem(label: 'Jadwalkan', onPressed: () => scheduled++),
      ],
    )));
    await tester.tap(find.text('Terbitkan'));
    expect(main, 1);
    await tester.tap(find.bySemanticsLabel('Pilihan lain'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Jadwalkan'));
    await tester.pumpAndSettle();
    expect(scheduled, 1);
    expect(find.text('Jadwalkan'), findsNothing);
  });

  testWidgets('LdsMenuButton reports expanded and has a 44 px target',
      (tester) async {
    final handle = tester.ensureSemantics();
    await tester.pumpWidget(wrap(LdsMenuButton(open: true, onPressed: () {})));
    await tester.pumpAndSettle();
    expect(
      tester.getSemantics(find.byType(LdsMenuButton)),
      containsSemantics(
        label: 'Tutup menu',
        isButton: true,
        hasExpandedState: true,
        isExpanded: true,
      ),
    );
    expect(tester.getSize(find.byType(LdsMenuButton)).width,
        greaterThanOrEqualTo(44));
    handle.dispose();
  });

  testWidgets('LdsAutoGrid drops columns when narrow', (tester) async {
    await tester.pumpWidget(wrap(const SizedBox(
      width: 500,
      child: LdsAutoGrid(minItemWidth: 200, gap: 10, children: [
        Text('1'),
        Text('2'),
        Text('3'),
      ]),
    )));
    final a = tester.getTopLeft(find.text('1'));
    final b = tester.getTopLeft(find.text('2'));
    final c = tester.getTopLeft(find.text('3'));
    expect(a.dy, b.dy);
    expect(c.dy, greaterThan(a.dy));
  });

  testWidgets('LdsSection uses the larger heading inside LdsSections',
      (tester) async {
    await tester.pumpWidget(wrap(const Column(children: [
      LdsSections(children: [LdsSection(title: 'Di dalam', children: [])]),
      LdsSection(title: 'Mandiri', children: []),
    ])));
    final inside = tester.widget<Text>(find.text('Di dalam')).style!.fontSize;
    final alone = tester.widget<Text>(find.text('Mandiri')).style!.fontSize;
    expect(inside, greaterThan(alone!));
  });

  testWidgets('LdsViewSwap fades the new view in', (tester) async {
    Widget build(int k) =>
        wrap(LdsViewSwap(child: Text('Panel $k', key: ValueKey(k))));
    await tester.pumpWidget(build(1));
    expect(find.byType(Opacity), findsNothing);
    await tester.pumpWidget(build(2));
    await tester.pump(const Duration(milliseconds: 60));
    expect(find.text('Panel 1'), findsNothing);
    final o = tester.widget<Opacity>(find.byType(Opacity)).opacity;
    expect(o, inExclusiveRange(0, 1));
    await tester.pumpAndSettle();
    expect(find.byType(Opacity), findsNothing);
  });

  group('layout in a scrolling list', () {
    testWidgets('vertical LdsSteps with unfinished steps sizes to content',
        (tester) async {
      await tester.pumpWidget(wrapList(const [
        LdsSteps(current: 0, direction: Axis.vertical, steps: [
          LdsStep(label: 'Isi data usaha'),
          LdsStep(label: 'Unggah NIB'),
          LdsStep(label: 'Verifikasi'),
        ]),
      ]));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      final h = tester.getSize(find.byType(LdsSteps)).height;
      expect(h, greaterThan(28 * 3));
      expect(h, lessThan(400));
      // Each connector stays long enough to read as a line.
      final bars = find.descendant(
          of: find.byType(LdsSteps), matching: find.byType(CustomPaint));
      final heights = bars
          .evaluate()
          .map((e) => (e.renderObject! as RenderBox).size.height)
          .where((v) => v > 0 && v < 200)
          .toList();
      expect(heights.where((v) => v >= 16), hasLength(2));
    });

    testWidgets('LdsTabs sizes to the tab bar height without a parent height',
        (tester) async {
      const tabs = [
        LdsTab(value: 'a', label: 'Ringkasan'),
        LdsTab(value: 'b', label: 'Berkas', count: 3),
      ];
      await tester.pumpWidget(wrapList([
        LdsTabs<String>(tabs: tabs, value: 'a', onChanged: (_) {}),
        LdsTabs<String>(
            tabs: tabs,
            value: 'b',
            alignment: LdsTabsAlignment.start,
            onChanged: (_) {}),
      ]));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      for (final e in find.byType(LdsTabs<String>).evaluate()) {
        final h = (e.renderObject! as RenderBox).size.height;
        expect(h, inInclusiveRange(44, 48));
      }
    });

    testWidgets('horizontal LdsSlidingIndicator sizes to its children',
        (tester) async {
      await tester.pumpWidget(wrapList(const [
        LdsSlidingIndicator(
          direction: Axis.horizontal,
          selectedIndex: 0,
          children: [
            SizedBox(width: 60, height: 40),
            SizedBox(width: 60, height: 40),
          ],
        ),
      ]));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      expect(tester.getSize(find.byType(LdsSlidingIndicator)).height, 40);
    });

    testWidgets('LdsPagination buttons hug their content', (tester) async {
      await tester.pumpWidget(wrapList([
        LdsPagination(page: 1, pageCount: 3, onChanged: (_) {}),
      ]));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      final box = find.ancestor(
          of: find.text('2'), matching: find.byType(AnimatedContainer));
      expect(tester.getSize(box.first).width, lessThan(60));
      // The hit area keeps its 44 pt minimum.
      final hit = find.ancestor(
          of: find.text('2'), matching: find.byType(GestureDetector));
      expect(tester.getSize(hit.first).width, greaterThanOrEqualTo(44));
      expect(tester.getSize(hit.first).height, greaterThanOrEqualTo(44));
    });
  });
}
