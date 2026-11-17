import 'package:flutter/material.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

import 'common.dart';

const _columns = [
  LdsTableColumn('Pemohon', sortable: true),
  LdsTableColumn('Kecamatan'),
  LdsTableColumn('Hari', numeric: true, sortable: true),
];

const _applicants = [
  ['Ayu Rahma', 'Way Halim', 3],
  ['Budi Santoso', 'Kedaton', 5],
  ['Citra Lestari', 'Rajabasa', 1],
  ['Dimas Putra', 'Kemiling', 8],
];

final List<LdsDataRow> _residents = [
  for (var i = 0; i < 23; i++)
    LdsDataRow(
      id: 'w$i',
      cells: [
        'Warga ${String.fromCharCode(65 + i % 26)}${i ~/ 26 + 1}',
        kecamatan[i % 3],
        '${(i * 7) % 19}',
      ],
      sortValues: [null, null, (i * 7) % 19],
      tags: {'kec': kecamatan[i % 3]},
    ),
];

final _events = [
  LdsCalendarEvent(
      id: '1',
      title: 'Posyandu Melati',
      start: DateTime(2026, 11, 17, 8),
      end: DateTime(2026, 11, 17, 11),
      where: 'Balai RW 03'),
  LdsCalendarEvent(
      id: '2',
      title: 'Musrenbang kelurahan',
      start: DateTime(2026, 11, 17, 13),
      end: DateTime(2026, 11, 17, 15),
      tone: 2),
  LdsCalendarEvent(
      id: '3',
      title: 'Samsat keliling',
      start: DateTime(2026, 11, 19, 9),
      end: DateTime(2026, 11, 19, 12),
      where: 'Lapangan Saburai'),
  LdsCalendarEvent(
      id: '4',
      title: 'Libur kantor',
      start: DateTime(2026, 11, 20),
      end: DateTime(2026, 11, 21),
      allDay: true,
      tone: 3),
];

// LdsCitation.span lets its pill fill the line width; IntrinsicWidth keeps
// the pill at its own size.
InlineSpan _citation(int n, VoidCallback onTap) => WidgetSpan(
      alignment: PlaceholderAlignment.middle,
      child: IntrinsicWidth(child: LdsCitation(n, onTap: onTap)),
    );

const _fileNames = {
  LdsFileType.folder: 'Arsip keluarga',
  LdsFileType.doc: 'Surat pengantar RT.pdf',
  LdsFileType.sheet: 'Rekap posyandu.xlsx',
  LdsFileType.image: 'Foto lokasi banjir.jpg',
  LdsFileType.video: 'Rekaman CCTV simpang.mp4',
  LdsFileType.audio: 'Rekaman aduan 112.m4a',
  LdsFileType.archive: 'Berkas izin UMKM.zip',
};

final List<GalleryEntry> dataEntries = [
  GalleryEntry('LdsAvatar', 'Avatar', (context) {
    return const Wrap(
        spacing: 12,
        runSpacing: 12,
        crossAxisAlignment: WrapCrossAlignment.center,
        children: [
          LdsAvatar('AR', size: 24),
          LdsAvatar('NS', gray: true, square: true, size: 56),
          LdsAvatar('DP', online: true, semanticLabel: 'Dimas Putra, daring'),
        ]);
  }),
  GalleryEntry('LdsAvatarStack', 'Tumpukan avatar', (context) {
    return const Align(
      alignment: Alignment.centerLeft,
      child: LdsAvatarStack(
        semanticLabel: '5 petugas: Ayu, Nadia, Dimas dan 2 lainnya',
        avatars: [
          LdsAvatar('AR'),
          LdsAvatar('NS', gray: true),
          LdsAvatar('DP'),
          LdsAvatar('+2', gray: true),
        ],
      ),
    );
  }),
  GalleryEntry('LdsChip', 'Cip saring', (context) {
    return Hold<String>(
      initial: 'Semua',
      builder: (context, v, set) => Wrap(spacing: 8, runSpacing: 8, children: [
        for (final s in const ['Semua', 'Diproses', 'Selesai'])
          LdsChip(label: s, selected: v == s, onChanged: (_) => set(s)),
        const LdsChip(label: 'Ditolak', selected: false, onChanged: null),
      ]),
    );
  }),
  GalleryEntry('LdsChipRow', 'Baris cip', (context) {
    return Hold<Set<String>>(
      initial: const {'Kedaton'},
      builder: (context, v, set) => LdsChipRow(
        semanticLabel: 'Saring kecamatan',
        children: [
          for (final k in kecamatan)
            LdsChip(
              label: k,
              selected: v.contains(k),
              onChanged: (on) =>
                  set(on ? ({...v}..add(k)) : ({...v}..remove(k))),
            ),
        ],
      ),
    );
  }),
  GalleryEntry('LdsCount', 'Penghitung', (context) {
    return Hold<int>(
      initial: 3,
      builder: (context, n, set) => Row(children: [
        Text('Kotak masuk',
            style: LdsType.body.copyWith(color: context.lds.textDefault)),
        const SizedBox(width: 8),
        LdsCount(n, noun: 'laporan baru'),
        const Spacer(),
        LdsButton(
            label: 'Tambah',
            size: LdsButtonSize.sm,
            variant: LdsButtonVariant.secondary,
            onPressed: () => set(n > 120 ? 0 : n * 2 + 1)),
      ]),
    );
  }),
  GalleryEntry('LdsStatusDot', 'Titik status', (context) {
    const labels = {
      LdsStatus.neutral: 'Antrean belum dibuka',
      LdsStatus.ok: 'SIAK Disdukcapil normal',
      LdsStatus.warn: 'e-Samsat lambat',
      LdsStatus.down: 'Situs BPJS gangguan',
      LdsStatus.live: 'Siaran rapat DPRD',
    };
    return DemoColumn(gap: 8, children: [
      for (final s in LdsStatus.values)
        LdsStatusDot(labels[s] ?? 'Layanan ${s.name}', status: s),
    ]);
  }),
  GalleryEntry('LdsKbd', 'Tombol papan ketik', (context) {
    return const Row(children: [
      LdsKbd('Esc'),
      SizedBox(width: 16),
      LdsKbdRow(['Ctrl', 'K']),
    ]);
  }),
  GalleryEntry('LdsInlineCode', 'Kode sebaris', (context) {
    return Text.rich(TextSpan(
      style: LdsType.body.copyWith(color: context.lds.textDefault),
      children: [
        const TextSpan(text: 'Isi kolom '),
        LdsInlineCode.span('nik'),
        const TextSpan(text: ' dengan 16 digit.'),
      ],
    ));
  }),
  GalleryEntry('LdsCodeBlock', 'Blok kode', (context) {
    return const LdsCodeBlock.segments([
      LdsCodeSegment('// Ambil laporan warga\n', LdsCodeKind.comment),
      LdsCodeSegment('const ', LdsCodeKind.keyword),
      LdsCodeSegment('kecamatan = '),
      LdsCodeSegment("'Way Halim'", LdsCodeKind.string),
    ], title: 'laporan.js');
  }),
  GalleryEntry('LdsCopyButton', 'Tombol salin', (context) {
    return Row(children: [
      Expanded(
        child: Text('Kode bayar PKB 8801 2026 0042',
            style: LdsType.body.copyWith(color: context.lds.textDefault)),
      ),
      const LdsCopyButton(text: '880120260042'),
    ]);
  }),
  GalleryEntry('LdsLink', 'Tautan', (context) {
    return DemoColumn(gap: 8, children: [
      LdsLink('Lihat syarat permohonan',
          onTap: () => galleryToast(context, 'Syarat dibuka')),
      LdsLink('Unduh formulir F-1.01',
          external: true, onTap: () => galleryToast(context, 'Formulir dibuka')),
    ]);
  }),
  GalleryEntry('LdsLinkCard', 'Kartu tautan', (context) {
    return LdsLinkCard(
      eyebrow: 'Layanan',
      eyebrowIcon: 'description',
      title: 'Surat keterangan domisili',
      body: 'Untuk warga yang pindah ke kelurahan baru.',
      foot: 'Rata-rata 3 hari kerja',
      onTap: () => galleryToast(context, 'Layanan dibuka'),
    );
  }),
  GalleryEntry('LdsKeyValueList', 'Pasangan kunci nilai', (context) {
    return const DemoColumn(children: [
      LdsKeyValueList(variant: LdsKeyValueVariant.bare, children: [
        LdsKeyValue('NIK', '1871 0123 4567 0001'),
        LdsKeyValue('Kelurahan', 'Way Halim Permai'),
      ]),
      LdsKeyValueList(children: [
        LdsKeyValue('Status', 'Diproses'),
        LdsKeyValue('Petugas', null),
      ]),
      LdsKeyValueList(
          variant: LdsKeyValueVariant.base,
          stacked: true,
          children: [
            LdsKeyValue('Alamat', 'Jl. Contoh No. 12, Bandar Lampung'),
          ]),
    ]);
  }),
  GalleryEntry('LdsTable', 'Tabel', (context) {
    return Hold<(int, bool)>(
      initial: (2, true),
      builder: (context, sort, set) {
        final rows = [..._applicants];
        rows.sort((a, b) {
          final r = sort.$1 == 0
              ? (a[0] as String).compareTo(b[0] as String)
              : (a[2] as int).compareTo(b[2] as int);
          return sort.$2 ? r : -r;
        });
        return LdsTable(
          columns: _columns,
          sortColumn: sort.$1,
          onSort: (i) => set((i, i == sort.$1 ? !sort.$2 : true)),
          rows: [
            for (final r in rows)
              LdsTableRow(['${r[0]}', '${r[1]}', '${r[2]}'],
                  onTap: () => galleryToast(context, 'Permohonan ${r[0]}')),
          ],
        );
      },
    );
  }),
  GalleryEntry('LdsDataTable', 'Tabel data', (context) {
    return LdsDataTable(
      columns: const [
        LdsTableColumn('Nama', sortable: true),
        LdsTableColumn('Kecamatan'),
        LdsTableColumn('Laporan', numeric: true, sortable: true),
      ],
      rows: _residents,
      noun: 'warga',
      selectable: true,
      filters: [
        LdsDataFilter(
            key: 'kec',
            label: 'Saring kecamatan',
            options: kecamatan.take(3).toList()),
      ],
    );
  }),
  GalleryEntry('LdsCompareTable', 'Tabel perbandingan', (context) {
    return const LdsCompareTable(
      caption: 'Bandingkan jalur pengurusan KTP-el',
      plans: [
        LdsComparePlan('Kelurahan', price: 'Gratis'),
        LdsComparePlan('Disdukcapil', price: 'Gratis', featured: true),
        LdsComparePlan('Daring'),
      ],
      groups: [
        LdsCompareGroup('Layanan', [
          LdsCompareRow('Waktu jadi', [
            LdsCompareValue.text('14 hari'),
            LdsCompareValue.text('1 hari'),
            LdsCompareValue.text('7 hari'),
          ]),
          LdsCompareRow('Perekaman ulang', [
            LdsCompareValue.no(),
            LdsCompareValue.yes(),
            LdsCompareValue.no(),
          ]),
        ]),
      ],
    );
  }),
  GalleryEntry('LdsTimeline', 'Linimasa', (context) {
    return const LdsTimeline(items: [
      LdsTimelineItem(
          title: 'Laporan diterima',
          meta: '12 Nov, Sistem',
          state: LdsTimelineState.done),
      LdsTimelineItem(
          title: 'Diverifikasi petugas',
          meta: 'Sedang berjalan',
          state: LdsTimelineState.current),
      LdsTimelineItem(
          title: 'Ditindaklanjuti Dinas PU', meta: 'Tanggal belum ditetapkan'),
    ]);
  }),
  GalleryEntry('LdsTimestamp', 'Penanda waktu', (context) {
    final now = DateTime(2026, 11, 17, 10);
    return DemoColumn(gap: 6, children: [
      LdsTimestamp(DateTime(2026, 11, 17, 9, 55), now: now),
      LdsTimestamp(DateTime(2026, 11, 17, 7), now: now),
      LdsTimestamp(DateTime(2026, 11, 16, 9, 30), now: now),
    ]);
  }),
  GalleryEntry('LdsDateTile', 'Ubin tanggal', (context) {
    return Wrap(spacing: 8, runSpacing: 8, children: [
      for (final (i, s) in LdsDateTileState.values.indexed)
        LdsDateTile(DateTime(2026, 11, 17 + i), state: s),
    ]);
  }),
  GalleryEntry('LdsFileTile', 'Ubin berkas', (context) {
    return Hold<String?>(
      initial: 'doc',
      builder: (context, sel, set) => LdsFileGrid(children: [
        for (final t in const [LdsFileType.doc, LdsFileType.sheet])
          LdsFileTile(
            name: _fileNames[t]!,
            type: t,
            meta: '2,4 MB · 12 Nov',
            selected: sel == t.name,
            onSelectedChanged: (v) => set(v ? t.name : null),
            onTap: () => galleryToast(context, '${_fileNames[t]} dibuka'),
          ),
      ]),
    );
  }),
  GalleryEntry('LdsFileGrid', 'Grid berkas ringkas', (context) {
    return PhotoBuilder(
      builder: (context, image) => LdsFileGrid(children: [
        LdsFileTile(
            name: 'Foto lokasi.jpg',
            type: LdsFileType.image,
            image: image,
            compact: true),
        for (final t in LdsFileType.values)
          LdsFileTile(name: _fileNames[t]!, type: t, compact: true),
      ]),
    );
  }),
  GalleryEntry('LdsThumbnail', 'Gambar mini', (context) {
    return PhotoBuilder(
      builder: (context, image) => Align(
        alignment: Alignment.centerLeft,
        child: SizedBox(
          width: 220,
          child: LdsThumbnail(
            image: image,
            semanticLabel: 'Jalan berlubang di Kedaton',
            caption: 'Foto dari pelapor, 12 November',
            lightbox: true,
          ),
        ),
      ),
    );
  }),
  GalleryEntry('LdsProductTile', 'Ubin produk UMKM', (context) {
    return Hold<Map<String, int>>(
      initial: const {'kopi': 2},
      builder: (context, cart, set) {
        void add(String k) => set({...cart, k: (cart[k] ?? 0) + 1});
        return LdsProductGrid(children: [
          LdsProductTile(
              name: 'Kopi robusta Lampung 250 g',
              price: 'Rp45.000',
              meta: 'Sisa 3',
              lowStock: true,
              quantity: cart['kopi'] ?? 0,
              onTap: () => add('kopi')),
          LdsProductTile(
              name: 'Keripik pisang Bu Siti',
              price: 'Rp15.000',
              quantity: cart['keripik'] ?? 0,
              onTap: () => add('keripik')),
          LdsProductTile(
              name: 'Kain tapis mini',
              price: 'Rp120.000',
              meta: 'Habis, tersedia lagi Senin',
              soldOut: true,
              onTap: () {},
              onUnavailable: () => galleryToast(context, 'Stok habis')),
          LdsProductTile(
              name: 'Lada hitam',
              price: 'Rp30.000',
              compact: true,
              quantity: cart['lada'] ?? 0,
              onTap: () => add('lada')),
        ]);
      },
    );
  }),
  GalleryEntry('LdsInboxList', 'Kotak masuk', (context) {
    return Hold<String>(
      initial: 'b',
      builder: (context, cur, set) => LdsInboxList(avatars: true, children: [
        LdsInboxRow(
          from: 'Ayu Rahma',
          time: '09.30',
          subject: 'Lampu jalan mati di Jl. Teuku Umar',
          preview: 'Sudah tiga malam lampu di depan masjid tidak menyala.',
          avatar: const LdsAvatar('AR'),
          unread: cur != 'a',
          flagged: true,
          current: cur == 'a',
          onTap: () => set('a'),
        ),
        LdsInboxRow(
            from: 'Budi Santoso',
            time: 'Kemarin',
            subject: 'Saluran air tersumbat',
            preview: 'Terima kasih, sudah dibersihkan petugas.',
            count: 3,
            current: cur == 'b',
            avatar: const LdsAvatar('BS', gray: true),
            onTap: () => set('b')),
      ]),
    );
  }),
  GalleryEntry('LdsKanban', 'Papan kanban', (context) {
    return const _KanbanDemo();
  }),
  GalleryEntry('LdsLanes', 'Jalur jadwal', (context) {
    return LdsLanes(
      semanticLabel: 'Jadwal petugas loket, 17 sampai 21 November',
      corner: 'Petugas',
      now: 1.5,
      ticks: const [
        LdsLaneTick('Sen', sub: '17', today: true),
        LdsLaneTick('Sel', sub: '18'),
        LdsLaneTick('Rab', sub: '19'),
        LdsLaneTick('Kam', sub: '20'),
        LdsLaneTick('Jum', sub: '21', off: true),
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
                onTap: () => galleryToast(context, 'Pelayanan KTP')),
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
        const LdsLaneRow(name: 'Budi Santoso', sub: 'Loket 2', items: [
          LdsLaneItem(from: 1, span: 1.5, title: 'Kosong', kind: LdsLaneKind.free),
        ]),
      ],
    );
  }),
  GalleryEntry('LdsEventCalendar', 'Kalender kegiatan', (context) {
    // Its toolbar needs about 333 pt, so it gets nearly the full box width.
    return Padding(
      padding: const EdgeInsets.fromLTRB(4, 12, 4, 4),
      child: LdsEventCalendar(
        events: _events,
        today: galleryToday,
        now: const TimeOfDay(hour: 10, minute: 20),
        onEventTap: (e) => galleryToast(context, e.title),
      ),
    );
  }, bleed: true),
  GalleryEntry('LdsQuote', 'Kutipan', (context) {
    return const LdsQuote('Pelayanan yang baik dimulai dari mendengar warga.',
        attribution: 'Petugas loket, Kedaton');
  }),
  GalleryEntry('LdsCitation', 'Rujukan', (context) {
    return Text.rich(TextSpan(
      style: LdsType.body.copyWith(color: context.lds.textDefault),
      children: [
        const TextSpan(text: 'Waktu layanan rata-rata tiga hari'),
        _citation(1, () => galleryToast(context, 'Sumber 1: laporan bulanan')),
        const TextSpan(text: ' dan antrean turun 20 persen'),
        _citation(2, () => galleryToast(context, 'Sumber 2: survei warga')),
        const TextSpan(text: '.'),
      ],
    ));
  }),
  GalleryEntry('LdsProse', 'Prosa', (context) {
    return const LdsProse(children: [
      LdsProseHeading('Syarat permohonan'),
      Text('Siapkan dokumen berikut sebelum datang ke kantor kelurahan.'),
      LdsProseList(['Fotokopi KTP', 'Kartu keluarga'], ordered: true),
      LdsProseHeading('Catatan', level: 3),
      LdsProseList(['Data di halaman ini adalah contoh.']),
    ]);
  }),
  GalleryEntry('LdsPaper', 'Dokumen kertas', (context) {
    return const DemoColumn(gap: 1, children: [
      LdsPaper(
        title: 'Tagihan retribusi',
        semanticLabel: 'Tagihan retribusi nomor 2026/11/0042',
        brand: Text('Dinas Layanan Kota Contoh'),
        meta: [('Nomor', '2026/11/0042'), ('Jatuh tempo', '30 November 2026')],
        parties: [
          LdsPaperParty('Kepada', ['Ayu Rahma', 'Jl. Contoh No. 12', 'Kedaton']),
        ],
        lines: [LdsPaperLine('Retribusi sampah', '1', 'Rp25.000', 'Rp25.000')],
        sums: [
          LdsPaperSum('Subtotal', 'Rp25.000'),
          LdsPaperSum('Jumlah dibayar', 'Rp25.000', total: true),
        ],
        foot: Text('Data di dokumen ini adalah contoh.'),
      ),
      LdsPaper(
        title: 'Struk pasar UMKM',
        semanticLabel: 'Struk pembelian',
        receipt: true,
        lines: [LdsPaperLine('Kopi robusta', '2', 'Rp45.000', 'Rp90.000')],
        foot: Text('Terima kasih'),
      ),
    ]);
  }, bleed: true),
  GalleryEntry('LdsDataStates', 'Keadaan data', (context) {
    return Hold<LdsDataState>(
      initial: LdsDataState.loaded,
      builder: (context, s, set) => DemoColumn(children: [
        LdsSegmented<LdsDataState>(
          semanticLabel: 'Keadaan',
          value: s,
          onChanged: set,
          segments: const [
            LdsSegment(value: LdsDataState.loaded, label: 'Isi'),
            LdsSegment(value: LdsDataState.loading, label: 'Muat'),
            LdsSegment(value: LdsDataState.empty, label: 'Kosong'),
            LdsSegment(value: LdsDataState.error, label: 'Galat'),
          ],
        ),
        LdsDataStates(
          state: s,
          onRetry: () => set(LdsDataState.loaded),
          child: const LdsList(children: [
            LdsListRow(title: 'Jalan berlubang', subtitle: 'Kedaton'),
            LdsListRow(title: 'Sampah menumpuk', subtitle: 'Way Halim'),
          ]),
        ),
      ]),
    );
  }),
  GalleryEntry('LdsUploadProgress', 'Kemajuan unggah', (context) {
    return const _UploadDemo();
  }),
  GalleryEntry('LdsSpinner', 'Pemutar', (context) {
    return const Row(children: [
      LdsSpinner(),
      SizedBox(width: 24),
      LdsSpinner.large(),
    ]);
  }),
  GalleryEntry('LdsProgressBar', 'Bilah kemajuan', (context) {
    return const DemoColumn(children: [
      LdsProgressBar(value: 0.64, label: 'Mengunggah berkas KK', valueLabel: '64%'),
      LdsProgressBar(value: null, thin: true, semanticLabel: 'Memuat data'),
    ]);
  }),
  GalleryEntry('LdsProgressRing', 'Cincin kemajuan', (context) {
    return const Row(children: [
      LdsProgressRing(value: 0.72, semanticLabel: 'Kelengkapan berkas'),
      SizedBox(width: 16),
      LdsProgressRing(
          value: 1, tone: LdsTone.success, semanticLabel: 'Vaksinasi lengkap'),
    ]);
  }),
  GalleryEntry('LdsMeter', 'Meteran', (context) {
    return const DemoColumn(children: [
      LdsMeter(value: 0.45, label: 'Kuota antrean pagi', valueLabel: '45 dari 100'),
      LdsMeter(value: 0.92, label: 'Kapasitas posko BPBD', valueLabel: '92%'),
    ]);
  }),
  GalleryEntry('LdsPercentageBar', 'Bilah persentase', (context) {
    return const LdsPercentageBar(
      semanticLabel: 'Laporan warga per kanal',
      parts: [
        LdsPercentagePart('Aplikasi', 60),
        LdsPercentagePart('Telepon', 25),
        LdsPercentagePart('Loket', 15),
      ],
    );
  }),
];

class _KanbanDemo extends StatefulWidget {
  const _KanbanDemo();

  @override
  State<_KanbanDemo> createState() => _KanbanDemoState();
}

class _KanbanDemoState extends State<_KanbanDemo> {
  final Map<String, List<LdsKanbanCard>> _cols = {
    'masuk': const [
      LdsKanbanCard(id: 'a', title: 'Jalan berlubang', body: 'Jl. Pagar Alam, Kedaton'),
      LdsKanbanCard(id: 'b', title: 'Sampah menumpuk', body: 'Pasar Way Halim'),
    ],
    'proses': const [
      LdsKanbanCard(id: 'c', title: 'Lampu jalan padam', body: 'Jl. Teuku Umar'),
    ],
    'selesai': const [],
  };
  static const _titles = {
    'masuk': 'Masuk',
    'proses': 'Diproses',
    'selesai': 'Selesai',
  };

  void _move(String id, String to, int index) {
    setState(() {
      LdsKanbanCard? card;
      for (final list in _cols.values) {
        final i = list.indexWhere((c) => c.id == id);
        if (i >= 0) {
          card = list[i];
          _cols.updateAll((k, v) => v.where((c) => c.id != id).toList());
          break;
        }
      }
      if (card == null) return;
      final dest = [..._cols[to]!];
      dest.insert(index.clamp(0, dest.length), card);
      _cols[to] = dest;
    });
  }

  @override
  Widget build(BuildContext context) {
    return LdsKanban(
      columns: [
        for (final e in _cols.entries)
          LdsKanbanColumn(
              id: e.key,
              title: _titles[e.key]!,
              limit: e.key == 'proses' ? 2 : null,
              cards: e.value),
      ],
      onMove: _move,
      onCardTap: (id) => galleryToast(context, 'Laporan $id dibuka'),
    );
  }
}

class _UploadDemo extends StatefulWidget {
  const _UploadDemo();

  @override
  State<_UploadDemo> createState() => _UploadDemoState();
}

class _UploadDemoState extends State<_UploadDemo> {
  double? _p;
  bool _running = false;

  Future<void> _start() async {
    if (_running) return;
    _running = true;
    for (var i = 0; i <= 20; i++) {
      await Future<void>.delayed(const Duration(milliseconds: 90));
      if (!mounted) return;
      setState(() => _p = i / 20);
    }
    _running = false;
  }

  @override
  Widget build(BuildContext context) {
    return DemoColumn(children: [
      LdsUploadProgress(
        progress: _p,
        complete: _p == 1.0,
        title: _p == null ? 'Unggah foto KTP' : 'foto-ktp.jpg',
        body: 'PDF atau JPG, maks. 5 MB',
      ),
      LdsButton(
          label: _p == 1.0 ? 'Unggah lagi' : 'Mulai unggah',
          variant: LdsButtonVariant.secondary,
          onPressed: () {
            setState(() => _p = 0);
            _start();
          }),
    ]);
  }
}
