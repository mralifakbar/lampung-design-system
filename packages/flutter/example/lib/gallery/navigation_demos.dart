import 'package:flutter/material.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

import 'common.dart';

const _tabs = [
  LdsTab(value: 'ringkasan', label: 'Ringkasan'),
  LdsTab(value: 'dokumen', label: 'Berkas', count: 3),
  LdsTab(value: 'riwayat', label: 'Riwayat'),
];

const _sidebarItems = [
  LdsSidebarItem(value: 'beranda', label: 'Beranda', icon: 'home'),
  LdsSidebarItem(
      value: 'laporan',
      label: 'Laporan warga',
      icon: 'description',
      badge: '12'),
  LdsSidebarItem(value: 'umkm', label: 'UMKM binaan', icon: 'storefront'),
  LdsSidebarItem(
      value: 'pengaturan',
      label: 'Pengaturan',
      icon: 'settings',
      heading: 'Akun'),
];

Widget _panel(BuildContext context, String text) {
  final c = context.lds;
  return Container(
    alignment: Alignment.center,
    padding: const EdgeInsets.all(8),
    color: c.bgFill,
    child: Text(text,
        textAlign: TextAlign.center,
        style: LdsType.footnote.copyWith(color: c.textDefault)),
  );
}

Widget _chip(BuildContext context, String text) {
  final c = context.lds;
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
    decoration: BoxDecoration(
      color: c.bgFill,
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.sm)),
    ),
    child: Text(text, style: LdsType.footnote.copyWith(color: c.textDefault)),
  );
}

final List<GalleryEntry> navigationEntries = [
  GalleryEntry('LdsTabs', 'Tab', (context) {
    return Hold<String>(
      initial: 'ringkasan',
      builder: (context, v, set) => DemoColumn(children: [
        // Tabs stretch to their row height, so they need a bounded one.
        SizedBox(
            height: 45,
            child: LdsTabs<String>(tabs: _tabs, value: v, onChanged: set)),
        DemoNote(switch (v) {
          'dokumen' => 'KTP, KK dan surat pengantar RT.',
          'riwayat' => 'Diajukan 12 November, diverifikasi 14 November.',
          _ => 'Permohonan akta kelahiran, Disdukcapil Kota Contoh.',
        }),
        SizedBox(
          height: 45,
          child: LdsTabs<String>(
              tabs: _tabs,
              value: v,
              alignment: LdsTabsAlignment.start,
              onChanged: set),
        ),
      ]),
    );
  }),
  GalleryEntry('LdsSlidingIndicator', 'Penanda geser', (context) {
    return Hold<int>(
      initial: 0,
      builder: (context, i, set) => SizedBox(
        height: 44,
        child: LdsSlidingIndicator(
          direction: Axis.horizontal,
          spacing: 4,
          selectedIndex: i,
          children: [
            for (final (k, t) in const ['Antrean', 'Riwayat', 'Info'].indexed)
              TextButton(onPressed: () => set(k), child: Text(t)),
          ],
        ),
      ),
    );
  }),
  GalleryEntry('LdsBreadcrumbs', 'Remah roti', (context) {
    return LdsBreadcrumbs(items: [
      LdsBreadcrumb(
          label: 'Layanan', onPressed: () => galleryToast(context, 'Layanan')),
      LdsBreadcrumb(
          label: 'Perizinan',
          onPressed: () => galleryToast(context, 'Perizinan')),
      const LdsBreadcrumb(label: 'Izin usaha mikro'),
    ]);
  }),
  GalleryEntry('LdsPagination', 'Halaman', (context) {
    return Hold<int>(
      initial: 5,
      // Unbounded width lets each page button keep its own size.
      builder: (context, p, set) => SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: LdsPagination(page: p, pageCount: 12, onChanged: set),
      ),
    );
  }),
  GalleryEntry('LdsSteps', 'Langkah', (context) {
    return Hold<int>(
      initial: 1,
      builder: (context, cur, set) => DemoColumn(children: [
        LdsSteps(current: cur, steps: const [
          LdsStep(label: 'Data diri'),
          LdsStep(label: 'Dokumen', subtitle: 'KTP dan KK'),
          LdsStep(label: 'Periksa'),
        ]),
        // Vertical steps stay on the last step: an unfilled connector has
        // an infinite intrinsic height inside the package's IntrinsicHeight.
        const LdsSteps(current: 2, direction: Axis.vertical, steps: [
          LdsStep(label: 'Isi data usaha'),
          LdsStep(label: 'Unggah NIB'),
          LdsStep(label: 'Verifikasi Dinas Koperasi dan UMKM'),
        ]),
        Row(children: [
          Expanded(
            child: LdsButton(
                label: 'Kembali',
                variant: LdsButtonVariant.gray,
                onPressed: cur > 0 ? () => set(cur - 1) : null),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: LdsButton(
                label: 'Lanjut', onPressed: cur < 3 ? () => set(cur + 1) : null),
          ),
        ]),
      ]),
    );
  }),
  GalleryEntry('LdsSidebar', 'Bilah samping', (context) {
    return Hold<String>(
      initial: 'laporan',
      builder: (context, v, set) =>
          LdsSidebar<String>(items: _sidebarItems, value: v, onChanged: set),
    );
  }),
  GalleryEntry('LdsTopNav', 'Navigasi atas', (context) {
    return Hold<String>(
      initial: 'beranda',
      builder: (context, v, set) => LdsTopNav<String>(
        brand: const Text('Layanan Kota Contoh'),
        links: const [
          LdsTopNavLink(value: 'beranda', label: 'Beranda'),
          LdsTopNavLink(value: 'layanan', label: 'Layanan'),
          LdsTopNavLink(value: 'pengaduan', label: 'Pengaduan'),
        ],
        value: v,
        onChanged: set,
      ),
    );
  }),
  GalleryEntry('LdsAppShell', 'Kerangka aplikasi', (context) {
    return Hold<String>(
      initial: 'beranda',
      builder: (context, v, set) => ClipRRect(
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
        child: SizedBox(
          height: 240,
          child: LdsAppShell<String>(
            brand: const Text('Dinas Layanan Kota Contoh'),
            title: _sidebarItems.firstWhere((e) => e.value == v).label,
            destinations: _sidebarItems,
            value: v,
            onChanged: set,
            body: Padding(
              padding: const EdgeInsets.all(16),
              child: DemoNote('Halaman ${_sidebarItems.firstWhere((e) => e.value == v).label}. '
                  'Buka menu untuk berpindah.'),
            ),
          ),
        ),
      ),
    );
  }),
  GalleryEntry('LdsNavStack', 'Tumpukan navigasi', (context) {
    return ClipRRect(
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
      child: SizedBox(
        height: 200,
        child: LdsNavStack(
          rootTitle: 'Laporan',
          root: (context) => ListView(children: [
            for (final t in const ['Jalan berlubang', 'Sampah menumpuk'])
              LdsListRow(
                title: t,
                onTap: () => LdsNavStack.push<void>(
                  context,
                  (_) => Padding(
                    padding: const EdgeInsets.all(16),
                    child: DemoColumn(children: [
                      const Align(
                          alignment: Alignment.centerLeft,
                          child: LdsBackButton()),
                      Text(t, style: LdsType.title3),
                      const DemoNote('Diteruskan ke Dinas PU Kota Contoh.'),
                    ]),
                  ),
                  title: t,
                ),
              ),
          ]),
        ),
      ),
    );
  }),
  GalleryEntry('LdsBackButton', 'Tombol kembali', (context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: LdsBackButton(
          label: 'Layanan', onPressed: () => galleryToast(context, 'Kembali')),
    );
  }),
  GalleryEntry('LdsPageRoute', 'Rute halaman', (context) {
    return LdsButton(
      label: 'Buka halaman detail',
      variant: LdsButtonVariant.secondary,
      expand: true,
      onPressed: () => Navigator.of(context).push(LdsPageRoute<void>(
        title: 'Detail Samsat',
        builder: (ctx) => Scaffold(
          appBar: AppBar(title: const Text('Samsat Bandar Lampung')),
          body: const Padding(
            padding: EdgeInsets.all(20),
            child: Text('Buka Senin sampai Jumat, 08.00 sampai 15.00.'),
          ),
        ),
      )),
    );
  }),
  GalleryEntry('LdsNavProgress', 'Kemajuan navigasi', (context) {
    return Hold<bool>(
      initial: true,
      builder: (context, running, set) => DemoColumn(children: [
        LdsNavProgress(running: running),
        LdsButton(
            label: running ? 'Hentikan' : 'Mulai memuat',
            variant: LdsButtonVariant.secondary,
            onPressed: () => set(!running)),
      ]),
    );
  }),
  GalleryEntry('LdsPageHeader', 'Kepala halaman', (context) {
    return LdsPageHeader(
      title: 'Izin usaha mikro',
      subtitle: 'Nomor PB-2026-0183',
      breadcrumbs: [
        LdsBreadcrumb(label: 'Perizinan', onPressed: () {}),
        const LdsBreadcrumb(label: 'Izin usaha mikro'),
      ],
      actions: [
        LdsButton(
            label: 'Unduh',
            icon: 'download',
            size: LdsButtonSize.md,
            variant: LdsButtonVariant.secondary,
            onPressed: () {}),
      ],
    );
  }),
  GalleryEntry('LdsAccordion', 'Akordion', (context) {
    return const LdsAccordion(single: true, items: [
      LdsAccordionItem(
          title: 'Berapa lama KTP-el jadi?',
          subtitle: 'Disdukcapil',
          initiallyOpen: true,
          child: Text('Paling lama 14 hari kerja setelah perekaman.')),
      LdsAccordionItem(
          title: 'Apakah ada biaya?',
          child: Text('Tidak ada biaya untuk dokumen kependudukan.')),
      LdsAccordionItem(
          title: 'Bisa diwakilkan?',
          child: Text('Bisa, dengan surat kuasa dan KK asli.')),
    ]);
  }),
  GalleryEntry('LdsOutline', 'Daftar isi', (context) {
    return Hold<int>(
      initial: 1,
      builder: (context, v, set) => LdsOutline(
          entries: const ['Syarat', 'Biaya', 'Waktu proses', 'Kontak'],
          current: v,
          onSelected: set),
    );
  }),
  GalleryEntry('LdsTree', 'Pohon', (context) {
    return Hold<String?>(
      initial: 'ktp',
      builder: (context, v, set) => LdsTree<String>(
        initiallyExpanded: const {'arsip'},
        selected: v,
        onSelected: set,
        nodes: const [
          LdsTreeNode(
              value: 'arsip',
              label: 'Arsip keluarga',
              icon: 'folder',
              children: [
                LdsTreeNode(
                    value: 'ktp', label: 'KTP.pdf', icon: 'description'),
                LdsTreeNode(value: 'kk', label: 'KK.pdf', icon: 'description'),
              ]),
          LdsTreeNode(value: 'umkm', label: 'Dokumen UMKM', icon: 'folder', children: [
            LdsTreeNode(value: 'nib', label: 'NIB.pdf', icon: 'description'),
          ]),
        ],
      ),
    );
  }),
  GalleryEntry('LdsSeparator', 'Pemisah', (context) {
    return const DemoColumn(children: [
      LdsSeparator(),
      LdsSeparator.label('atau'),
      LdsSeparator.label('Senin, 16 November',
          labelAlign: LdsSeparatorLabelAlign.start),
      SizedBox(
        height: 24,
        child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text('Kedaton'),
          SizedBox(width: 12),
          LdsSeparator.vertical(),
          SizedBox(width: 12),
          Text('Way Halim'),
        ]),
      ),
    ]);
  }),
  GalleryEntry('LdsResizableSplit', 'Panel ubah ukuran', (context) {
    return SizedBox(
      height: 200,
      child: LdsResizableSplit(
        axis: Axis.vertical,
        first: _panel(context, 'Daftar laporan'),
        second: _panel(context, 'Detail laporan'),
      ),
    );
  }),
  GalleryEntry('LdsCarousel', 'Karosel', (context) {
    final c = context.lds;
    final tiles = [
      ('Vaksin gratis di puskesmas', c.tileGreen),
      ('Bayar PKB tanpa antre', c.tileBlue),
      ('Siaga banjir musim hujan', c.tileOrange),
      ('Pasar UMKM akhir pekan', c.tileRed),
    ];
    return LdsCarousel(height: 120, itemsPerView: 1, children: [
      for (final (t, color) in tiles)
        Container(
          padding: const EdgeInsets.all(16),
          alignment: Alignment.bottomLeft,
          decoration: BoxDecoration(
            color: color,
            borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.lg)),
          ),
          child: Text(t,
              style: LdsType.headline.copyWith(color: Colors.white)),
        ),
    ]);
  }),
  GalleryEntry('LdsShowMore', 'Tampilkan lainnya', (context) {
    return LdsShowMore(
      visible: [
        for (final k in kecamatan.take(2)) Text('Puskesmas $k'),
      ],
      rest: [
        for (final k in kecamatan.skip(2)) Text('Puskesmas $k'),
      ],
    );
  }),
  GalleryEntry('LdsHeightExpand', 'Buka tinggi', (context) {
    return Hold<bool>(
      initial: false,
      builder: (context, open, set) => DemoColumn(children: [
        LdsButton(
            label: open ? 'Sembunyikan syarat' : 'Lihat syarat',
            variant: LdsButtonVariant.tinted,
            onPressed: () => set(!open)),
        LdsHeightExpand(
          open: open,
          child: const DemoNote('KTP asli, KK, surat pengantar RT/RW, dan '
              'pas foto 3x4 latar merah.'),
        ),
      ]),
    );
  }),
  GalleryEntry('LdsScrollFades', 'Pudar gulir', (context) {
    return SizedBox(
      height: 180,
      child: LdsScrollFades(
        child: ListView.builder(
          itemCount: 20,
          itemBuilder: (context, i) => LdsListRow(
              title: 'Laporan ${1040 - i}',
              subtitle: kecamatan[i % kecamatan.length]),
        ),
      ),
    );
  }),
  GalleryEntry('LdsExpandingToolbar', 'Bilah alat melebar', (context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: LdsExpandingToolbar(tools: [
      LdsToolbarTool(
          icon: 'edit', label: 'Ubah', onPressed: () => galleryToast(context, 'Ubah')),
      LdsToolbarTool(
          icon: 'search', label: 'Cari', onPressed: () => galleryToast(context, 'Cari')),
      LdsToolbarTool(
          icon: 'share', label: 'Bagikan', onPressed: () => galleryToast(context, 'Bagikan')),
      ]),
    );
  }),
  GalleryEntry('LdsFloatingAction', 'Tombol mengambang', (context) {
    return Hold<bool>(
      initial: true,
      builder: (context, visible, set) => Row(children: [
        Expanded(
          child: LdsSwitch(
              value: visible, label: 'Tampilkan tombol', onChanged: set),
        ),
        LdsFloatingAction(
            icon: 'add',
            semanticLabel: 'Buat laporan',
            visible: visible,
            onPressed: () => galleryToast(context, 'Formulir laporan dibuka')),
      ]),
    );
  }),
  GalleryEntry('LdsButtonGroup', 'Grup tombol', (context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: LdsButtonGroup(buttons: [
      LdsGroupButton(icon: 'undo', semanticLabel: 'Urungkan', onPressed: () {}),
      const LdsGroupButton(icon: 'redo', semanticLabel: 'Ulangi', onPressed: null),
      LdsGroupButton(label: 'Riwayat', onPressed: () {}),
      ]),
    );
  }),
  GalleryEntry('LdsSplitButton', 'Tombol terbagi', (context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: LdsSplitButton(
        label: 'Terbitkan pengumuman',
        onPressed: () => galleryToast(context, 'Pengumuman terbit (contoh)'),
        items: [
          LdsSplitButtonItem(
              label: 'Jadwalkan', onPressed: () => galleryToast(context, 'Dijadwalkan')),
          LdsSplitButtonItem(
              label: 'Simpan draf', onPressed: () => galleryToast(context, 'Draf disimpan')),
        ],
      ),
    );
  }),
  GalleryEntry('LdsMenuIcon', 'Ikon menu', (context) {
    return Hold<bool>(
      initial: false,
      builder: (context, open, set) => Row(children: [
        LdsMenuIcon(open: open),
        const SizedBox(width: 16),
        TextButton(
            onPressed: () => set(!open), child: Text(open ? 'Tutup' : 'Buka')),
      ]),
    );
  }),
  GalleryEntry('LdsMenuButton', 'Tombol menu', (context) {
    return Hold<bool>(
      initial: false,
      builder: (context, open, set) => Align(
        alignment: Alignment.centerLeft,
        child: LdsMenuButton(open: open, onPressed: () => set(!open)),
      ),
    );
  }),
  GalleryEntry('LdsStack', 'Tumpukan', (context) {
    return LdsStack(children: [
      _chip(context, 'Data pemohon'),
      _chip(context, 'Data usaha'),
      _chip(context, 'Lampiran'),
    ]);
  }),
  GalleryEntry('LdsCluster', 'Gugus', (context) {
    return LdsCluster(children: [
      for (final k in kecamatan) _chip(context, k),
    ]);
  }),
  GalleryEntry('LdsAutoGrid', 'Grid otomatis', (context) {
    return LdsAutoGrid(minItemWidth: 140, children: [
      for (final s in const ['Puskesmas', 'Samsat', 'Disdukcapil', 'BPBD'])
        _chip(context, s),
    ]);
  }),
  GalleryEntry('LdsSplit2', 'Dua kolom', (context) {
    return LdsSplit2(
      side: _chip(context, 'Samping: filter kecamatan'),
      main: _chip(context, 'Utama: daftar laporan. Bertumpuk di layar sempit.'),
    );
  }),
  GalleryEntry('LdsCenter', 'Tengah', (context) {
    return LdsCenter(child: _chip(context, 'Konten di tengah'));
  }),
  GalleryEntry('LdsMeasure', 'Lebar baca', (context) {
    return const LdsMeasure(
      child: Text('Teks panjang dibatasi lebarnya agar nyaman dibaca. Di '
          'ponsel, batas ini tidak terasa karena layar sudah sempit.'),
    );
  }),
  GalleryEntry('LdsVisuallyHidden', 'Tersembunyi visual', (context) {
    return const DemoColumn(children: [
      LdsVisuallyHidden('Judul untuk pembaca layar', header: true),
      DemoNote('Ada judul di sini yang hanya dibacakan pembaca layar.'),
    ]);
  }),
  GalleryEntry('LdsSections', 'Bagian halaman', (context) {
    return const LdsSections(children: [
      LdsSection(title: 'Syarat', children: [
        Text('KTP asli dan fotokopi KK.'),
      ]),
      LdsSection(
          title: 'Biaya',
          subtitle: 'Tidak dipungut biaya.',
          children: [
            LdsSectionSubtitle('Rincian'),
            Text('Cetak ulang karena rusak juga gratis.'),
          ]),
    ]);
  }),
  GalleryEntry('LdsViewSwap', 'Ganti tampilan', (context) {
    return Hold<int>(
      initial: 0,
      builder: (context, k, set) => DemoColumn(children: [
        LdsViewSwap(
          child: Text(
            k.isEven ? 'Tampilan peta laporan' : 'Tampilan daftar laporan',
            key: ValueKey(k),
            style: LdsType.bodyStrong.copyWith(color: context.lds.textStrong),
          ),
        ),
        LdsButton(
            label: 'Ganti tampilan',
            variant: LdsButtonVariant.secondary,
            onPressed: () => set(k + 1)),
      ]),
    );
  }),
];
