import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lampung_design_system/src/data.dart';
import 'package:lampung_design_system/src/theme.dart';
import 'package:lampung_design_system/src/tokens.g.dart';
import 'package:lampung_design_system/src/widgets/badge.dart';
import 'package:lampung_design_system/src/widgets/skeleton.dart';

import 'helpers.dart';

// A 1x1 transparent PNG.
final Uint8List _png = Uint8List.fromList(const [
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, //
  0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
  0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
  0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82,
]);

/// Pumps [child] in the light and the dark theme and checks nothing threw.
Future<void> bothModes(WidgetTester tester, Widget child,
    {bool settle = true}) async {
  for (final dark in [false, true]) {
    await tester.pumpWidget(wrap(
      SingleChildScrollView(child: SizedBox(width: 760, child: child)),
      dark: dark,
    ));
    if (settle) {
      await tester.pump(const Duration(seconds: 1));
    } else {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(tester.takeException(), isNull);
  }
}

Widget scroll(Widget child) =>
    SingleChildScrollView(child: SizedBox(width: 760, child: child));

final DateTime _today = DateTime(2026, 11, 17);

List<LdsDataRow> _citizens(int n) => [
      for (var i = 0; i < n; i++)
        LdsDataRow(
          id: 'w$i',
          cells: [
            'Warga ${String.fromCharCode(65 + i % 26)}${i ~/ 26}',
            i.isEven ? 'Way Halim' : 'Kedaton',
            '${i * 3}',
          ],
          sortValues: [null, null, i * 3],
          tags: {'kel': i.isEven ? 'Way Halim' : 'Kedaton'},
        ),
    ];

void main() {
  group('LdsAvatar', () {
    testWidgets('renders sizes, stack and presence in both modes',
        (tester) async {
      await bothModes(
        tester,
        const Wrap(children: [
          LdsAvatar('AR', size: 24),
          LdsAvatar('NS', gray: true, square: true, size: 56),
          LdsAvatar('DP', online: true, semanticLabel: 'Dimas Putra, daring'),
          LdsAvatarStack(
            semanticLabel: '5 petugas: Ayu, Nadia, Dimas dan 2 lainnya',
            avatars: [
              LdsAvatar('AR'),
              LdsAvatar('NS', gray: true),
              LdsAvatar('DP'),
              LdsAvatar('+2', gray: true),
            ],
          ),
        ]),
      );
    });

    testWidgets('is hidden without a label and named with one', (tester) async {
      await tester.pumpWidget(wrap(const Column(children: [
        LdsAvatar('AR'),
        LdsAvatar('DP', semanticLabel: 'Dimas Putra, daring'),
      ])));
      expect(find.bySemanticsLabel('Dimas Putra, daring'), findsOneWidget);
      expect(find.bySemanticsLabel('AR'), findsNothing);
    });
  });

  group('LdsChip', () {
    testWidgets('renders in both modes', (tester) async {
      await bothModes(
        tester,
        LdsChipRow(semanticLabel: 'Filter status laporan', children: [
          LdsChip(label: 'Semua', selected: true, onChanged: (_) {}),
          LdsChip(label: 'Diproses', selected: false, onChanged: (_) {}),
          const LdsChip(label: '09.00', selected: false, onChanged: null),
        ]),
      );
    });

    testWidgets('toggles through onChanged', (tester) async {
      var on = false;
      await tester.pumpWidget(wrap(StatefulBuilder(
        builder: (context, set) => LdsChip(
          label: 'Selesai',
          selected: on,
          onChanged: (v) => set(() => on = v),
        ),
      )));
      await tester.tap(find.text('Selesai'));
      await tester.pumpAndSettle();
      expect(on, isTrue);
      expect(tester.getSize(find.byType(LdsChip)).height,
          greaterThanOrEqualTo(44));
    });
  });

  group('LdsCount', () {
    testWidgets('renders in both modes', (tester) async {
      await bothModes(tester, const LdsCount(3, noun: 'laporan baru'));
    });

    testWidgets('hides zero, caps at 99+ and says what it counts',
        (tester) async {
      await tester.pumpWidget(wrap(const Column(children: [
        LdsCount(0, noun: 'laporan baru'),
        LdsCount(150, noun: 'pesan'),
      ])));
      expect(find.text('0'), findsNothing);
      expect(find.text('99+'), findsOneWidget);
      expect(find.bySemanticsLabel('150 pesan'), findsOneWidget);
    });
  });

  group('LdsStatusDot', () {
    testWidgets('renders every state in both modes', (tester) async {
      await bothModes(
        tester,
        Column(children: [
          for (final s in LdsStatus.values)
            LdsStatusDot('Layanan ${s.name}', status: s),
        ]),
      );
    });

    testWidgets('live pulses three times, then stays still', (tester) async {
      await tester.pumpWidget(
          wrap(const LdsStatusDot('Siaran langsung', status: LdsStatus.live)));
      await tester.pump(const Duration(milliseconds: 100));
      expect(tester.binding.hasScheduledFrame, isTrue);
      await tester.pumpAndSettle();
      expect(tester.binding.hasScheduledFrame, isFalse);
    });
  });

  group('LdsKbd', () {
    testWidgets('renders and reads a combination', (tester) async {
      await bothModes(tester, const LdsKbdRow(['Ctrl', 'K']));
      expect(find.bySemanticsLabel('Ctrl plus K'), findsOneWidget);
    });
  });

  group('LdsInlineCode', () {
    testWidgets('renders alone and inside rich text', (tester) async {
      await bothModes(
        tester,
        Column(children: [
          const LdsInlineCode('nik'),
          Text.rich(TextSpan(children: [
            const TextSpan(text: 'Isi kolom '),
            LdsInlineCode.span('kode_pos'),
          ])),
        ]),
      );
      expect(find.text('kode_pos'), findsOneWidget);
    });
  });

  group('LdsCopyButton and LdsCodeBlock', () {
    late List<String> copied;
    setUp(() {
      copied = <String>[];
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(SystemChannels.platform, (call) async {
        if (call.method == 'Clipboard.setData') {
          copied.add(
              (call.arguments as Map<Object?, Object?>)['text']! as String);
        }
        return null;
      });
    });
    tearDown(() {
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(SystemChannels.platform, null);
    });

    testWidgets('code block renders in both modes', (tester) async {
      await bothModes(
        tester,
        const Column(children: [
          LdsCodeBlock.segments([
            LdsCodeSegment('// Ambil laporan warga\n', LdsCodeKind.comment),
            LdsCodeSegment('const ', LdsCodeKind.keyword),
            LdsCodeSegment('kelurahan = '),
            LdsCodeSegment("'Way Halim'", LdsCodeKind.string),
          ], title: 'laporan.js'),
          LdsCodeBlock('npm install', copyable: false),
          LdsCopyButton(text: '1871012345670001', iconOnly: true),
        ]),
      );
    });

    testWidgets('copies, confirms for 1.6 s, then returns', (tester) async {
      await tester.pumpWidget(
          wrap(const LdsCodeBlock('npx lampung-ds init', title: 'Terminal')));
      await tester.tap(find.text('Salin'));
      await tester.pump();
      await tester.pump();
      expect(copied, ['npx lampung-ds init']);
      expect(find.text('Tersalin'), findsOneWidget);
      await tester.pump(const Duration(milliseconds: 1700));
      await tester.pumpAndSettle();
      expect(find.text('Salin'), findsOneWidget);
    });
  });

  group('LdsLink and LdsLinkCard', () {
    testWidgets('render in both modes', (tester) async {
      await bothModes(
        tester,
        Column(children: [
          LdsLink('Lihat syarat permohonan', onTap: () {}),
          LdsLink('Unduh formulir', external: true, onTap: () {}),
          LdsLinkCard(
            eyebrow: 'Layanan',
            eyebrowIcon: 'description',
            title: 'Surat keterangan domisili',
            body: 'Untuk warga yang pindah ke kelurahan baru.',
            foot: 'Rata-rata 3 hari kerja',
            onTap: () {},
          ),
        ]),
      );
    });

    testWidgets('call onTap and announce external links', (tester) async {
      var taps = 0;
      await tester.pumpWidget(wrap(Column(children: [
        LdsLink('Unduh formulir', external: true, onTap: () => taps++),
        LdsLinkCard(title: 'Cek status izin', onTap: () => taps++),
      ])));
      expect(find.bySemanticsLabel('Unduh formulir, membuka situs lain'),
          findsOneWidget);
      await tester.tap(find.text('Unduh formulir'));
      await tester.tap(find.text('Cek status izin'));
      await tester.pumpAndSettle();
      expect(taps, 2);
    });
  });

  group('LdsKeyValue', () {
    testWidgets('renders every variant in both modes', (tester) async {
      await bothModes(
        tester,
        const Column(children: [
          LdsKeyValueList(variant: LdsKeyValueVariant.bare, children: [
            LdsKeyValue('NIK', '1871 0123 4567 0001'),
            LdsKeyValue('Kelurahan', 'Way Halim Permai'),
          ]),
          LdsKeyValueList(children: [LdsKeyValue('Status', 'Diproses')]),
          LdsKeyValueList(
              variant: LdsKeyValueVariant.base,
              stacked: true,
              children: [
                LdsKeyValue('Alamat', 'Jl. Contoh No. 12, Bandar Lampung'),
              ]),
        ]),
      );
    });

    testWidgets('a missing value says so', (tester) async {
      await tester.pumpWidget(wrap(const LdsKeyValue('Nomor telepon', null)));
      expect(find.text('Belum diisi'), findsOneWidget);
    });
  });

  group('LdsTable', () {
    const columns = [
      LdsTableColumn('Pemohon', sortable: true),
      LdsTableColumn('Kelurahan'),
      LdsTableColumn('Hari', numeric: true, sortable: true),
    ];

    testWidgets('renders rows, loading and empty in both modes',
        (tester) async {
      await bothModes(
        tester,
        Column(children: [
          LdsTable(
              columns: columns,
              sortColumn: 0,
              onSort: (_) {},
              rows: const [
                LdsTableRow(['Ayu Rahma', 'Way Halim', '3'], selected: true),
                LdsTableRow(['Budi Santoso', 'Kedaton', '5']),
              ]),
          const LdsTable(columns: columns, rows: [], loading: true),
          const LdsTable(
              columns: columns,
              rows: [],
              empty: Text('Belum ada permohonan'),
              wrap: true),
        ]),
        settle: false,
      );
    });

    testWidgets('sorts through the header and taps rows', (tester) async {
      int? sorted;
      var opened = 0;
      await tester.pumpWidget(wrap(scroll(LdsTable(
        columns: columns,
        onSort: (i) => sorted = i,
        rows: [
          LdsTableRow(const ['Ayu Rahma', 'Way Halim', '3'],
              onTap: () => opened++)
        ],
      ))));
      await tester.tap(find.text('Hari'));
      await tester.tap(find.text('Ayu Rahma'));
      await tester.pumpAndSettle();
      expect(sorted, 2);
      expect(opened, 1);
    });
  });

  group('LdsDataTable', () {
    testWidgets('renders ready, loading and error in both modes',
        (tester) async {
      for (final s in LdsDataTableState.values) {
        await bothModes(
          tester,
          LdsDataTable(
            columns: const [
              LdsTableColumn('Nama', sortable: true),
              LdsTableColumn('Kelurahan'),
              LdsTableColumn('Laporan', numeric: true, sortable: true),
            ],
            rows: _citizens(12),
            noun: 'warga',
            selectable: true,
            state: s,
            onRetry: () {},
            filters: const [
              LdsDataFilter(
                  key: 'kel',
                  label: 'Filter kelurahan',
                  options: ['Way Halim', 'Kedaton'])
            ],
          ),
          settle: false,
        );
      }
    });

    testWidgets('searches, filters, pages and sorts', (tester) async {
      Set<String>? selection;
      await tester.pumpWidget(wrap(scroll(LdsDataTable(
        columns: const [
          LdsTableColumn('Nama', sortable: true),
          LdsTableColumn('Kelurahan'),
          LdsTableColumn('Laporan', numeric: true, sortable: true),
        ],
        rows: _citizens(23),
        noun: 'warga',
        selectable: true,
        onSelectionChanged: (s) => selection = s,
        filters: const [
          LdsDataFilter(
              key: 'kel',
              label: 'Filter kelurahan',
              options: ['Way Halim', 'Kedaton'])
        ],
      ))));
      expect(
          find.text('Menampilkan 1 sampai 10 dari 23 warga'), findsOneWidget);

      Future<void> tapShown(Finder f) async {
        await tester.ensureVisible(f);
        await tester.pumpAndSettle();
        await tester.tap(f);
        await tester.pumpAndSettle();
      }

      await tapShown(find.bySemanticsLabel('Halaman berikutnya').first);
      expect(
          find.text('Menampilkan 11 sampai 20 dari 23 warga'), findsOneWidget);

      await tapShown(find.widgetWithText(LdsChip, 'Kedaton'));
      expect(
          find.text('Menampilkan 1 sampai 10 dari 11 warga'), findsOneWidget);

      await tester.enterText(find.byType(TextField), 'zzz');
      await tester.pumpAndSettle();
      expect(find.text('Tidak ada warga yang cocok'), findsOneWidget);
      await tapShown(find.text('Hapus filter').last);
      expect(
          find.text('Menampilkan 1 sampai 10 dari 23 warga'), findsOneWidget);

      // Descending by reports puts the largest count first.
      await tapShown(find.text('Laporan'));
      await tapShown(find.text('Laporan'));
      expect(find.text('66'), findsOneWidget);

      await tapShown(find.bySemanticsLabel('Pilih semua di halaman ini').first);
      expect(selection, hasLength(10));
    });
  });

  group('LdsCompareTable', () {
    testWidgets('renders in both modes and labels icon cells', (tester) async {
      await bothModes(
        tester,
        const LdsCompareTable(
          caption: 'Bandingkan paket layanan',
          plans: [
            LdsComparePlan('Dasar', price: 'Gratis'),
            LdsComparePlan('Kelurahan', price: 'Rp0', featured: true),
            LdsComparePlan('Kota'),
          ],
          groups: [
            LdsCompareGroup('Laporan warga', [
              LdsCompareRow('Laporan per bulan', [
                LdsCompareValue.text('100'),
                LdsCompareValue.text('1.000'),
                LdsCompareValue.text('Tanpa batas'),
              ]),
              LdsCompareRow('Peta sebaran', [
                LdsCompareValue.no(),
                LdsCompareValue.yes(),
                LdsCompareValue.yes(),
              ]),
            ]),
          ],
        ),
      );
      expect(find.bySemanticsLabel('Peta sebaran, Dasar: Tidak termasuk'),
          findsOneWidget);
    });
  });

  group('LdsTimeline', () {
    testWidgets('renders every state in both modes', (tester) async {
      await bothModes(
        tester,
        const LdsTimeline(items: [
          LdsTimelineItem(
              title: 'Laporan diterima',
              meta: '12 Nov, Sistem',
              state: LdsTimelineState.done),
          LdsTimelineItem(
              title: 'Diverifikasi petugas',
              meta: 'Sedang berjalan',
              state: LdsTimelineState.current),
          LdsTimelineItem(
              title: 'Ditindaklanjuti', meta: 'Tanggal belum ditetapkan'),
        ]),
      );
      expect(find.text('Diverifikasi petugas'), findsOneWidget);
    });
  });

  group('LdsTimestamp', () {
    test('relative words', () {
      final now = DateTime(2026, 11, 17, 10);
      expect(
          LdsTimestamp.relative(now.subtract(const Duration(seconds: 10)), now),
          'baru saja');
      expect(
          LdsTimestamp.relative(now.subtract(const Duration(minutes: 5)), now),
          '5 menit lalu');
      expect(LdsTimestamp.relative(now.subtract(const Duration(hours: 3)), now),
          '3 jam lalu');
      expect(LdsTimestamp.relative(now.add(const Duration(days: 2)), now),
          'dalam 2 hari');
      expect(LdsTimestamp.full(DateTime(2026, 11, 16, 9, 30)),
          '16 November 2026, 09.30');
    });

    testWidgets('renders in both modes', (tester) async {
      await bothModes(
        tester,
        LdsTimestamp(DateTime(2026, 11, 17, 9, 30),
            now: DateTime(2026, 11, 17, 10)),
      );
      expect(find.text('30 menit lalu'), findsOneWidget);
    });
  });

  group('LdsDateTile', () {
    testWidgets('renders every state in both modes', (tester) async {
      await bothModes(
        tester,
        Row(children: [
          for (final s in LdsDateTileState.values)
            LdsDateTile(DateTime(2026, 11, 18), state: s),
        ]),
      );
      expect(find.bySemanticsLabel('18 November'), findsNWidgets(3));
    });
  });

  group('LdsFileTile', () {
    testWidgets('renders every type in both modes', (tester) async {
      await bothModes(
        tester,
        LdsFileGrid(children: [
          for (final t in LdsFileType.values)
            LdsFileTile(
              name: 'Berkas ${t.name}.pdf',
              type: t,
              meta: '2,4 MB · 12 Nov',
              selected: t == LdsFileType.doc,
              onSelectedChanged: (_) {},
              onMore: () {},
              onTap: () {},
            ),
          LdsFileTile(
              name: 'Foto lokasi.jpg',
              type: LdsFileType.image,
              image: MemoryImage(_png),
              compact: true),
        ]),
      );
    });

    testWidgets('opens and ticks', (tester) async {
      var opened = 0;
      bool? ticked;
      await tester.pumpWidget(wrap(SizedBox(
        width: 200,
        child: LdsFileTile(
          name: 'KTP pemohon.pdf',
          type: LdsFileType.doc,
          selecting: true,
          selected: false,
          onSelectedChanged: (v) => ticked = v,
          onTap: () => opened++,
        ),
      )));
      await tester.tap(find.text('KTP pemohon.pdf'));
      await tester.tap(find.byType(Checkbox));
      await tester.pumpAndSettle();
      expect(opened, 1);
      expect(ticked, isTrue);
    });
  });

  group('LdsThumbnail', () {
    testWidgets('renders in both modes', (tester) async {
      await bothModes(
        tester,
        SizedBox(
          width: 240,
          child: LdsThumbnail(
              image: MemoryImage(_png),
              semanticLabel: 'Jalan berlubang di Kedaton'),
        ),
      );
    });

    testWidgets('opens a lightbox and closes it', (tester) async {
      await tester.pumpWidget(wrap(SizedBox(
        width: 240,
        child: LdsThumbnail(
          image: MemoryImage(_png),
          semanticLabel: 'Jalan berlubang di Kedaton',
          caption: 'Foto dari pelapor, 12 November',
          lightbox: true,
        ),
      )));
      await tester.tap(find.byType(LdsThumbnail));
      await tester.pumpAndSettle();
      expect(find.text('Foto dari pelapor, 12 November'), findsOneWidget);
      await tester.tap(find.byTooltip('Tutup'));
      await tester.pumpAndSettle();
      expect(find.text('Foto dari pelapor, 12 November'), findsNothing);
    });
  });

  group('LdsProductTile', () {
    testWidgets('renders in both modes', (tester) async {
      await bothModes(
        tester,
        LdsProductGrid(children: [
          LdsProductTile(
              name: 'Kopi robusta Lampung 250 g',
              price: 'Rp45.000',
              meta: 'Sisa 3',
              lowStock: true,
              quantity: 2,
              onTap: () {}),
          LdsProductTile(
              name: 'Keripik pisang',
              price: 'Rp15.000',
              image: MemoryImage(_png),
              onTap: () {}),
          LdsProductTile(
              name: 'Tapis mini',
              price: 'Rp120.000',
              meta: 'Habis, tersedia lagi Senin',
              soldOut: true,
              onTap: () {}),
          LdsProductTile(
              name: 'Lada hitam',
              price: 'Rp30.000',
              compact: true,
              quantity: 1,
              onTap: () {}),
        ]),
      );
    });

    testWidgets('adds on tap and refuses when sold out', (tester) async {
      var added = 0;
      var refused = 0;
      await tester.pumpWidget(wrap(Column(children: [
        SizedBox(
            width: 180,
            child: LdsProductTile(
                name: 'Keripik pisang',
                price: 'Rp15.000',
                onTap: () => added++)),
        SizedBox(
          width: 180,
          child: LdsProductTile(
            name: 'Tapis mini',
            price: 'Rp120.000',
            soldOut: true,
            onTap: () => added++,
            onUnavailable: () => refused++,
          ),
        ),
      ])));
      await tester.tap(find.text('Keripik pisang'));
      await tester.tap(find.text('Tapis mini'));
      await tester.pumpAndSettle();
      expect(added, 1);
      expect(refused, 1);
    });
  });

  group('LdsInboxList', () {
    testWidgets('renders in both modes and opens a row', (tester) async {
      var opened = 0;
      final list = LdsInboxList(avatars: true, children: [
        LdsInboxRow(
          from: 'Ayu Rahma',
          time: '09.30',
          subject: 'Lampu jalan mati di Jl. Contoh',
          preview: 'Sudah tiga malam lampu di depan masjid tidak menyala.',
          avatar: const LdsAvatar('AR'),
          unread: true,
          flagged: true,
          onTap: () => opened++,
        ),
        LdsInboxRow(
            from: 'Budi Santoso',
            time: 'Kemarin',
            preview: 'Terima kasih',
            count: 3,
            current: true,
            avatar: const LdsAvatar('BS', gray: true),
            onTap: () {}),
      ]);
      await bothModes(tester, list);
      expect(find.bySemanticsLabel(RegExp('^Belum dibaca, Ayu Rahma')),
          findsOneWidget);
      await tester.tap(find.text('Ayu Rahma'));
      await tester.pumpAndSettle();
      expect(opened, 1);
    });
  });

  group('LdsKanban', () {
    List<LdsKanbanColumn> board() => const [
          LdsKanbanColumn(id: 'masuk', title: 'Masuk', limit: 1, cards: [
            LdsKanbanCard(
                id: 'a', title: 'Jalan berlubang', body: 'Jl. Contoh, Kedaton'),
            LdsKanbanCard(id: 'b', title: 'Sampah menumpuk'),
          ]),
          LdsKanbanColumn(id: 'proses', title: 'Diproses', cards: []),
        ];

    testWidgets('renders in both modes', (tester) async {
      await bothModes(tester,
          LdsKanban(columns: board(), onMove: (_, __, ___) {}, onAdd: (_) {}));
    });

    testWidgets('moves a card by keyboard', (tester) async {
      final moves = <String>[];
      await tester.pumpWidget(wrap(scroll(LdsKanban(
        columns: board(),
        onMove: (id, col, i) => moves.add('$id>$col@$i'),
      ))));
      final focus = Focus.of(tester.element(find.text('Jalan berlubang')));
      focus.requestFocus();
      await tester.pump();
      await tester.sendKeyEvent(LogicalKeyboardKey.space);
      await tester.sendKeyEvent(LogicalKeyboardKey.arrowRight);
      await tester.pump();
      expect(moves, ['a>proses@0']);
      await tester.sendKeyEvent(LogicalKeyboardKey.escape);
      await tester.pump();
      expect(moves.last, 'a>masuk@0');
    });
  });

  group('LdsLanes', () {
    testWidgets('renders in both modes and opens a block', (tester) async {
      var opened = 0;
      final lanes = LdsLanes(
        semanticLabel: 'Jadwal petugas, 17 sampai 21 November',
        corner: 'Petugas',
        now: 1.5,
        ticks: const [
          LdsLaneTick('Sen', sub: '17', today: true),
          LdsLaneTick('Sel', sub: '18'),
          LdsLaneTick('Rab', sub: '19'),
          LdsLaneTick('Kam', sub: '20'),
          LdsLaneTick('Sab', sub: '22', off: true),
        ],
        rows: [
          LdsLaneRow(
            name: 'Ayu Rahma',
            sub: 'Loket 1',
            avatar: const LdsAvatar('AR', size: 32),
            off: const [(4, 1)],
            items: [
              LdsLaneItem(
                  from: 0,
                  span: 2,
                  title: 'Pelayanan KTP',
                  onTap: () => opened++),
              const LdsLaneItem(
                  from: 2, span: 1, title: 'Cuti', kind: LdsLaneKind.muted),
              const LdsLaneItem(
                  from: 3,
                  span: 1,
                  title: 'Diajukan',
                  kind: LdsLaneKind.pending,
                  isNew: true),
            ],
          ),
          const LdsLaneRow(name: 'Budi Santoso', items: [
            LdsLaneItem(
                from: 1, span: 1.5, title: 'Kosong', kind: LdsLaneKind.free),
          ]),
        ],
      );
      await bothModes(tester, lanes);
      await tester.tap(find.text('Pelayanan KTP'));
      await tester.pumpAndSettle();
      expect(opened, 1);
    });
  });

  group('LdsEventCalendar', () {
    final events = [
      LdsCalendarEvent(
          id: '1',
          title: 'Posyandu Melati',
          start: DateTime(2026, 11, 17, 8),
          end: DateTime(2026, 11, 17, 11),
          where: 'Balai RW 03'),
      LdsCalendarEvent(
          id: '2',
          title: 'Musrenbang kelurahan',
          start: DateTime(2026, 11, 17, 9),
          end: DateTime(2026, 11, 17, 12),
          tone: 2),
      LdsCalendarEvent(
          id: '3',
          title: 'Libur kantor',
          start: DateTime(2026, 11, 20),
          end: DateTime(2026, 11, 21),
          allDay: true,
          tone: 3),
    ];

    testWidgets('renders every view in both modes', (tester) async {
      for (final v in LdsCalendarView.values) {
        await bothModes(
          tester,
          LdsEventCalendar(
              events: events,
              today: _today,
              now: const TimeOfDay(hour: 10, minute: 20),
              initialView: v),
        );
      }
    });

    testWidgets('moves months, switches view and opens events', (tester) async {
      LdsCalendarEvent? opened;
      await tester.pumpWidget(wrap(scroll(LdsEventCalendar(
        events: events,
        today: _today,
        onEventTap: (e) => opened = e,
      ))));
      expect(find.text('November 2026'), findsOneWidget);
      await tester.tap(find.bySemanticsLabel('Bulan berikutnya'));
      await tester.pumpAndSettle();
      expect(find.text('Desember 2026'), findsOneWidget);
      await tester.tap(find.text('Hari ini'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Agenda'));
      await tester.pumpAndSettle();
      expect(find.text('Balai RW 03'), findsOneWidget);
      await tester.tap(find.text('Posyandu Melati'));
      await tester.pumpAndSettle();
      expect(opened?.id, '1');
    });
  });

  group('LdsQuote and LdsCitation', () {
    testWidgets('render in both modes', (tester) async {
      await bothModes(
        tester,
        Column(children: [
          const LdsQuote('Pelayanan yang baik dimulai dari mendengar warga.',
              attribution: 'Petugas loket, Kedaton'),
          Text.rich(TextSpan(children: [
            const TextSpan(text: 'Waktu layanan rata-rata tiga hari'),
            LdsCitation.span(1, onTap: () {}),
          ])),
        ]),
      );
    });

    testWidgets('citation answers taps around its small pill', (tester) async {
      var taps = 0;
      await tester.pumpWidget(wrap(LdsCitation(2, onTap: () => taps++)));
      expect(find.bySemanticsLabel('Sumber 2'), findsOneWidget);
      final center = tester.getCenter(find.text('2'));
      await tester.tapAt(center + const Offset(0, 18));
      await tester.pumpAndSettle();
      expect(taps, 1);
    });
  });

  group('LdsProse and LdsPaper', () {
    testWidgets('render in both modes', (tester) async {
      await bothModes(
        tester,
        const Column(children: [
          LdsProse(children: [
            LdsProseHeading('Syarat permohonan'),
            Text('Siapkan dokumen berikut sebelum datang ke kantor kelurahan.'),
            LdsProseList(['Fotokopi KTP', 'Kartu keluarga'], ordered: true),
            LdsProseHeading('Catatan', level: 3),
            LdsProseList(['Data di halaman ini adalah contoh.']),
          ]),
          LdsPaper(
            title: 'Tagihan retribusi',
            semanticLabel: 'Tagihan retribusi nomor 2026/11/0042',
            brand: Text('Dinas Layanan Kota Contoh'),
            meta: [
              ('Nomor', '2026/11/0042'),
              ('Jatuh tempo', '30 November 2026')
            ],
            parties: [
              LdsPaperParty(
                  'Kepada', ['Ayu Rahma', 'Jl. Contoh No. 12', 'Kedaton']),
            ],
            lines: [
              LdsPaperLine('Retribusi sampah', '1', 'Rp25.000', 'Rp25.000')
            ],
            sums: [
              LdsPaperSum('Subtotal', 'Rp25.000'),
              LdsPaperSum('Jumlah dibayar', 'Rp25.000', total: true)
            ],
            foot: Text('Data di dokumen ini adalah contoh.'),
          ),
          LdsPaper(
            title: 'Struk',
            semanticLabel: 'Struk pembelian',
            receipt: true,
            lines: [LdsPaperLine('Kopi robusta', '2', 'Rp45.000', 'Rp90.000')],
            foot: Text('Terima kasih'),
          ),
        ]),
      );
      expect(find.text('Rp90.000'), findsOneWidget);
    });
  });

  group('LdsDataStates', () {
    testWidgets('renders each state in both modes', (tester) async {
      for (final s in LdsDataState.values) {
        await bothModes(
          tester,
          LdsDataStates(
              state: s, onRetry: () {}, child: const Text('Daftar laporan')),
          settle: false,
        );
      }
    });

    testWidgets('waits before the skeleton and retries on error',
        (tester) async {
      var retries = 0;
      Widget build(LdsDataState s) => wrap(LdsDataStates(
            state: s,
            onRetry: () => retries++,
            child: const Text('Daftar laporan'),
          ));
      await tester.pumpWidget(build(LdsDataState.loading));
      expect(find.byType(LdsSkeleton), findsNothing);
      await tester.pump(const Duration(milliseconds: 350));
      expect(find.byType(LdsSkeleton), findsWidgets);
      await tester.pumpWidget(build(LdsDataState.error));
      await tester.tap(find.text('Coba lagi'));
      await tester.pump();
      expect(retries, 1);
      await tester.pumpWidget(build(LdsDataState.loaded));
      await tester.pumpAndSettle();
      expect(find.text('Daftar laporan'), findsOneWidget);
    });
  });

  group('LdsUploadProgress', () {
    testWidgets('renders idle, uploading and complete in both modes',
        (tester) async {
      for (final p in [null, 0.42, 1.0]) {
        await bothModes(
          tester,
          LdsUploadProgress(
              progress: p,
              complete: p == 1.0,
              body: 'PDF atau JPG, maks. 5 MB'),
        );
      }
      expect(find.text('100%'), findsOneWidget);
    });

    testWidgets('reports the percent', (tester) async {
      await tester.pumpWidget(wrap(const LdsUploadProgress(progress: 0.42)));
      await tester.pumpAndSettle();
      expect(find.text('42%'), findsOneWidget);
    });
  });

  group('Progress', () {
    testWidgets('spinner, bars, ring, meter and split render in both modes',
        (tester) async {
      await bothModes(
        tester,
        const Column(children: [
          LdsSpinner(),
          LdsSpinner.large(),
          LdsProgressBar(
              value: 0.64, label: 'Mengunggah berkas', valueLabel: '64%'),
          LdsProgressBar(value: null, thin: true, semanticLabel: 'Memuat data'),
          LdsProgressRing(value: 0.72, semanticLabel: 'Kelengkapan berkas'),
          LdsMeter(
              value: 0.85, label: 'Penyimpanan', valueLabel: '8,5 dari 10 GB'),
          LdsPercentageBar(
            semanticLabel: 'Laporan warga per kanal',
            parts: [
              LdsPercentagePart('Aplikasi', 60),
              LdsPercentagePart('Telepon', 25),
              LdsPercentagePart('Loket', 15),
            ],
          ),
        ]),
        settle: false,
      );
    });

    testWidgets('report their values', (tester) async {
      await tester.pumpWidget(wrap(const Column(children: [
        LdsProgressBar(value: 0.64, semanticLabel: 'Unggahan'),
        LdsProgressRing(value: 1, tone: LdsTone.success, semanticLabel: 'Skor'),
      ])));
      await tester.pumpAndSettle();
      expect(find.text('100%'), findsOneWidget);
      expect(
        tester.getSemantics(find.byType(LdsProgressBar)),
        matchesSemantics(label: 'Unggahan', value: '64%'),
      );
    });

    testWidgets('meter levels follow the value', (tester) async {
      expect(const LdsMeter(value: 0.5).effectiveLevel, LdsMeterLevel.normal);
      expect(const LdsMeter(value: 0.85).effectiveLevel, LdsMeterLevel.warn);
      expect(const LdsMeter(value: 1).effectiveLevel, LdsMeterLevel.full);
      expect(const LdsMeter(value: 0.34, segments: 4).filled, 1);
    });

    testWidgets('percentage bar reads its shares', (tester) async {
      await tester.pumpWidget(wrap(const LdsPercentageBar(
        semanticLabel: 'Laporan per kanal',
        parts: [
          LdsPercentagePart('Aplikasi', 3),
          LdsPercentagePart('Loket', 1)
        ],
      )));
      expect(
          find.bySemanticsLabel('Laporan per kanal: Aplikasi 75%, Loket 25%'),
          findsOneWidget);
    });

    testWidgets('meter fills with the dark accent in dark mode',
        (tester) async {
      late LdsColors colors;
      await tester.pumpWidget(wrap(Builder(builder: (context) {
        colors = context.lds;
        return const LdsMeter(value: 0.5);
      }), dark: true));
      expect(colors.accent, LdsColors.dark.accent);
    });
  });

  group('layout in a scrolling list', () {
    testWidgets('LdsKbd hugs its label in a wide parent', (tester) async {
      await tester.pumpWidget(wrapList(const [LdsKbd('Esc')]));
      expect(tester.takeException(), isNull);
      final key = find.descendant(
          of: find.byType(LdsKbd), matching: find.byType(DecoratedBox));
      expect(tester.getSize(key.first).width, lessThan(80));
    });

    testWidgets('LdsCitation.span keeps the pill at its own size',
        (tester) async {
      await tester.pumpWidget(wrapList([
        Text.rich(TextSpan(children: [
          const TextSpan(text: 'Waktu layanan rata-rata tiga hari'),
          LdsCitation.span(1, onTap: () {}),
        ])),
      ]));
      expect(tester.takeException(), isNull);
      final pill = find.ancestor(
          of: find.text('1'), matching: find.byType(AnimatedContainer));
      expect(tester.getSize(pill.first).width, lessThan(30));
    });

    testWidgets('LdsPaper sizes number columns to their content',
        (tester) async {
      await tester.pumpWidget(wrapList(const [
        LdsPaper(
          title: 'Tagihan retribusi',
          semanticLabel: 'Tagihan',
          lines: [
            LdsPaperLine('Retribusi sampah rumah tangga', '1', 'Rp125.000',
                'Rp125.000'),
          ],
        ),
      ], width: 500));
      expect(tester.takeException(), isNull);
      final one = tester.getSize(find.text('1')).height;
      for (final e in find.text('Rp125.000').evaluate()) {
        expect((e.renderObject! as RenderBox).size.height, one);
      }
      expect(tester.getSize(find.text('Jumlah')).height,
          tester.getSize(find.text('Total')).height);
      // The description takes the remaining width and wraps instead.
      expect(tester.getSize(find.text('Retribusi sampah rumah tangga')).height,
          greaterThan(one));
    });
  });
}
