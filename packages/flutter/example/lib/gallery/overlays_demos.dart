import 'package:flutter/material.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

import 'common.dart';

Widget _open(String label, VoidCallback onPressed, {String? icon}) =>
    LdsButton(
      label: label,
      icon: icon,
      variant: LdsButtonVariant.secondary,
      expand: true,
      onPressed: onPressed,
    );

final List<GalleryEntry> overlaysEntries = [
  GalleryEntry('LdsDialog', 'Dialog', (context) {
    return _open('Ubah alamat domisili', () {
      showLdsDialog<void>(
        context: context,
        builder: (ctx) => LdsDialog(
          title: 'Simpan perubahan alamat?',
          body: 'Alamat baru dipakai untuk surat dari Disdukcapil.',
          icon: 'info',
          onClose: () => Navigator.pop(ctx),
          actions: [
            LdsButton(
                label: 'Batal',
                variant: LdsButtonVariant.gray,
                onPressed: () => Navigator.pop(ctx)),
            LdsButton(label: 'Simpan', onPressed: () => Navigator.pop(ctx)),
          ],
        ),
      );
    }, icon: 'edit');
  }),
  GalleryEntry('LdsAlertDialog', 'Dialog konfirmasi', (context) {
    return _open('Hapus laporan #1024', () async {
      final ok = await showLdsAlertDialog(
        context: context,
        title: 'Hapus laporan #1024?',
        body: 'Laporan tidak bisa dipulihkan.',
        confirmLabel: 'Hapus laporan',
        cancelLabel: 'Batal',
      );
      if (context.mounted) {
        galleryToast(context, ok ? 'Laporan dihapus (contoh)' : 'Dibatalkan');
      }
    }, icon: 'delete');
  }),
  GalleryEntry('LdsModal', 'Modal', (context) {
    return _open('Lihat detail permohonan', () {
      showLdsModal<void>(
        context: context,
        title: 'Detail permohonan',
        closeLabel: 'Tutup',
        body: (_) => const DemoColumn(children: [
          Text('Izin usaha mikro, Keripik Pisang Bu Siti.'),
          Text('Diajukan 12 November 2026 di Mal Pelayanan Publik.'),
          Text('Status: menunggu verifikasi lapangan.'),
        ]),
      );
    });
  }),
  GalleryEntry('LdsSheet', 'Lembar bawah', (context) {
    return _open('Pilih jadwal vaksin', () {
      showLdsSheet<void>(
        context: context,
        builder: (ctx) => LdsSheet(
          title: 'Pilih jadwal di Puskesmas Kedaton',
          onClose: () => Navigator.pop(ctx),
          child: LdsList(children: [
            for (final j in const ['Senin, 08.00', 'Rabu, 09.30', 'Jumat, 08.00'])
              LdsListRow(
                  title: j,
                  icon: 'event',
                  onTap: () {
                    Navigator.pop(ctx);
                    galleryToast(context, 'Jadwal $j dipilih');
                  }),
          ]),
        ),
      );
    }, icon: 'event');
  }),
  GalleryEntry('LdsDrawer', 'Laci samping', (context) {
    return _open('Saring laporan', () {
      showLdsDrawer<void>(
        context: context,
        builder: (ctx) => LdsDrawer(
          title: 'Saring laporan',
          onClose: () => Navigator.pop(ctx),
          actions: [
            LdsButton(
                label: 'Atur ulang',
                variant: LdsButtonVariant.gray,
                onPressed: () => Navigator.pop(ctx)),
            LdsButton(label: 'Terapkan', onPressed: () => Navigator.pop(ctx)),
          ],
          child: Hold<bool>(
            initial: true,
            builder: (context, v, set) => DemoColumn(children: [
              LdsCheckbox(
                  value: v,
                  label: 'Hanya yang diproses',
                  onChanged: set),
              const DemoNote('Kecamatan: Kedaton, Way Halim'),
            ]),
          ),
        ),
      );
    }, icon: 'filter_list');
  }),
  GalleryEntry('LdsPopover', 'Popover', (context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: LdsPopover(
        semanticLabel: 'Info retribusi',
        builder: (context, c) => LdsButton(
            label: 'Info retribusi',
            icon: 'info',
            variant: LdsButtonVariant.tinted,
            onPressed: c.toggle),
        contentBuilder: (context, c) => const SizedBox(
          width: 220,
          child: Text('Retribusi sampah dibayar paling lambat tanggal 10 '
              'setiap bulan.'),
        ),
      ),
    );
  }),
  GalleryEntry('LdsAnchoredLayer', 'Lapisan berjangkar', (context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: LdsAnchoredLayer(
        builder: (context, c) => LdsButton(
            label: 'Jam buka Samsat',
            variant: LdsButtonVariant.secondary,
            onPressed: c.toggle),
        layerBuilder: (context, c) {
          final lds = context.lds;
          return Container(
            width: 220,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: lds.bgElevated,
              border: Border.all(color: lds.line),
              borderRadius:
                  const BorderRadius.all(Radius.circular(LdsRadius.md)),
            ),
            child: Text('Senin sampai Jumat 08.00 sampai 15.00. Sabtu '
                'sampai 12.00.',
                style: LdsType.footnote.copyWith(color: lds.textDefault)),
          );
        },
      ),
    );
  }),
  GalleryEntry('LdsTooltip', 'Tooltip', (context) {
    return const Row(children: [
      LdsTooltip(
        message: 'Cari layanan',
        shortcut: 'Ctrl+K',
        child: Padding(
          padding: EdgeInsets.all(10),
          child: LdsIcon('search', size: 24),
        ),
      ),
      SizedBox(width: 8),
      Expanded(child: DemoNote('Tekan lama ikon untuk melihat tooltip.')),
    ]);
  }),
  GalleryEntry('LdsHoverCard', 'Kartu sorot', (context) {
    return const DemoColumn(children: [
      LdsHoverCard(
        card: SizedBox(
          width: 220,
          child: Text('Dinas Layanan Kota Contoh, buka 08.00 sampai 15.00'),
        ),
        child: Text('Dinas Layanan Kota Contoh'),
      ),
      DemoNote('Muncul saat penunjuk mouse berhenti di atas teks.'),
    ]);
  }),
  GalleryEntry('LdsToast', 'Toast', (context) {
    return DemoColumn(children: [
      const LdsToast(
        title: 'Laporan diarsipkan',
        body: 'Pindah dari kotak masuk.',
        icon: 'inventory_2',
        actionLabel: 'Urungkan',
        remaining: 0.5,
      ),
      _open('Kirim laporan', () {
        LdsToast.show(context,
            title: 'Laporan terkirim',
            body: 'Nomor tiket LPR-2026-0142',
            icon: 'check_circle');
      }, icon: 'outbox'),
      _open('Arsipkan laporan', () {
        LdsToast.show(
          context,
          title: 'Laporan diarsipkan',
          icon: 'inventory_2',
          actionLabel: 'Urungkan',
          onAction: () {},
          actionResultTitle: 'Laporan dipulihkan',
        );
      }, icon: 'archive'),
    ]);
  }),
  GalleryEntry('LdsBanner', 'Spanduk', (context) {
    return Hold<bool>(
      initial: true,
      builder: (context, visible, set) => DemoColumn(children: [
        LdsBanner(
          message: 'Anda sedang offline.',
          icon: 'cloud_off',
          visible: visible,
          actionLabel: 'Coba lagi',
          onAction: () => galleryToast(context, 'Menyambung ulang'),
          onClose: () => set(false),
        ),
        if (!visible)
          LdsButton(
              label: 'Tampilkan spanduk',
              variant: LdsButtonVariant.plain,
              onPressed: () => set(true)),
      ]),
    );
  }),
  GalleryEntry('LdsMenu', 'Panel menu', (context) {
    return Hold<String>(
      initial: 'baru',
      builder: (context, v, set) => LdsMenu(entries: [
        const LdsMenuLabel('Urutkan laporan'),
        LdsMenuItem(
            label: 'Terbaru', checked: v == 'baru', onSelected: () => set('baru')),
        LdsMenuItem(
            label: 'Terlama', checked: v == 'lama', onSelected: () => set('lama')),
        const LdsMenuDivider(),
        LdsMenuItem(
            label: 'Unduh PDF',
            icon: 'download',
            onSelected: () => galleryToast(context, 'Mengunduh (contoh)')),
        LdsMenuItem(
            label: 'Hapus',
            icon: 'delete',
            destructive: true,
            onSelected: () => galleryToast(context, 'Dihapus (contoh)')),
      ]),
    );
  }),
  GalleryEntry('LdsDropdownMenu', 'Menu tarik turun', (context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: LdsDropdownMenu(
        entries: [
          LdsMenuItem(
              label: 'Unduh bukti bayar',
              icon: 'download',
              onSelected: () => galleryToast(context, 'Bukti diunduh')),
          LdsMenuItem(
              label: 'Bagikan',
              icon: 'share',
              onSelected: () => galleryToast(context, 'Tautan dibagikan')),
        ],
        builder: (context, c) => LdsButton(
            label: 'Tindakan',
            icon: 'expand_more',
            variant: LdsButtonVariant.secondary,
            onPressed: c.toggle),
      ),
    );
  }),
  GalleryEntry('LdsContextMenu', 'Menu konteks', (context) {
    return LdsContextMenu(
      entries: [
        LdsMenuItem(
            label: 'Ganti nama',
            icon: 'edit',
            onSelected: () => galleryToast(context, 'Ganti nama')),
        LdsMenuItem(
            label: 'Hapus',
            icon: 'delete',
            destructive: true,
            onSelected: () => galleryToast(context, 'Dihapus')),
      ],
      child: LdsCard(
        child: Row(children: [
          const LdsIcon('description', size: 24),
          const SizedBox(width: 12),
          Expanded(
            child: Text('surat-izin-umkm.pdf, tekan lama untuk menu',
                style: LdsType.body.copyWith(color: context.lds.textDefault)),
          ),
        ]),
      ),
    );
  }),
  GalleryEntry('LdsMenubar', 'Bilah menu', (context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: LdsMenubar(menus: [
        LdsMenubarMenu(label: 'Berkas', entries: [
          LdsMenuItem(label: 'Simpan', shortcut: 'Ctrl+S', onSelected: () {}),
          LdsMenuItem(label: 'Cetak', icon: 'print', onSelected: () {}),
        ]),
        LdsMenubarMenu(label: 'Ubah', entries: [
          LdsMenuItem(label: 'Urungkan', onSelected: () {}),
        ]),
        LdsMenubarMenu(label: 'Tampilan', entries: [
          LdsMenuItem(label: 'Peta', checked: true, onSelected: () {}),
        ]),
      ]),
    );
  }),
  GalleryEntry('LdsCommandPalette', 'Palet perintah', (context) {
    return _open('Buka palet perintah', () async {
      final cmd = await showLdsCommandPalette(
        context: context,
        placeholder: 'Cari perintah',
        commands: [
          LdsCommand(
              label: 'Buat laporan baru',
              icon: 'add',
              group: 'Tindakan',
              onRun: () {}),
          LdsCommand(
              label: 'Cek status KTP-el',
              icon: 'id_card',
              group: 'Halaman',
              onRun: () {}),
          LdsCommand(
              label: 'Bayar pajak kendaraan',
              icon: 'directions_car',
              group: 'Halaman',
              onRun: () {}),
        ],
      );
      if (cmd != null && context.mounted) {
        galleryToast(context, '${cmd.label} (contoh)');
      }
    }, icon: 'search');
  }),
  GalleryEntry('LdsCoachmark', 'Penanda tur', (context) {
    return LdsCoachmark(
      step: 'Langkah 1 dari 2',
      title: 'Saring menurut kecamatan',
      body: 'Lihat laporan dari wilayah Anda saja.',
      nextLabel: 'Lanjut',
      onNext: () => galleryToast(context, 'Langkah berikutnya'),
      skipLabel: 'Lewati',
      onSkip: () {},
    );
  }),
  GalleryEntry('LdsCoachmarkTour', 'Tur penanda', (context) {
    return const _TourDemo();
  }),
  GalleryEntry('LdsSpotlight', 'Sorotan', (context) {
    return LdsSpotlight(
      eyebrow: 'Langkah berikutnya',
      eyebrowIcon: 'flag',
      title: 'Lengkapi data KTP',
      body: 'Permohonan diproses setelah data lengkap.',
      actions: [
        LdsInverseButton(
            label: 'Lengkapi',
            variant: LdsInverseButtonVariant.accent,
            onPressed: () => galleryToast(context, 'Formulir dibuka')),
      ],
    );
  }),
  GalleryEntry('LdsLightbox', 'Lightbox foto', (context) {
    return PhotoBuilder(
      builder: (context, image) => Align(
        alignment: Alignment.centerLeft,
        child: SizedBox(
          width: 200,
          child: LdsLightbox(
            image: image,
            semanticLabel: 'Jalan berlubang di Jl. Pagar Alam',
            caption: 'Foto laporan warga, Jl. Pagar Alam',
            closeLabel: 'Tutup',
          ),
        ),
      ),
    );
  }),
  GalleryEntry('LdsLayerRoute', 'Rute lapisan', (context) {
    return _open('Buka lapisan', () {
      Navigator.of(context).push(LdsLayerRoute<void>(
        scrimColor: context.lds.bgScrim,
        dismissLabel: 'Tutup',
        builder: (ctx) => Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: LdsDialog(
              title: 'Lapisan dengan rute sendiri',
              body: 'Ketuk di luar untuk menutup.',
              onClose: () => Navigator.pop(ctx),
            ),
          ),
        ),
      ));
    });
  }),
  GalleryEntry('LdsConfirmInPlace', 'Konfirmasi di tempat', (context) {
    return LdsConfirmInPlace(
      icon: 'delete',
      armLabel: 'Hapus 3 berkas',
      question: 'Hapus 3 berkas?',
      confirmLabel: 'Hapus',
      cancelLabel: 'Batal',
      busyLabel: 'Menghapus',
      doneLabel: '3 berkas terhapus',
      undoLabel: 'Urungkan',
      onUndo: () {},
      onConfirm: () =>
          Future<void>.delayed(const Duration(milliseconds: 900)),
    );
  }),
  GalleryEntry('LdsHoldToConfirm', 'Tahan untuk konfirmasi', (context) {
    return LdsHoldToConfirm(
      label: 'Tahan untuk kirim SOS',
      icon: 'emergency',
      destructive: true,
      onConfirmed: () => galleryToast(context, 'Permintaan bantuan terkirim (contoh)'),
    );
  }),
  GalleryEntry('LdsSlideToConfirm', 'Geser untuk konfirmasi', (context) {
    return LdsSlideToConfirm(
      label: 'Geser untuk mengirim laporan',
      doneLabel: 'Laporan terkirim',
      knobLabel: 'Kirim laporan, tekan Enter',
      onConfirmed: () {},
    );
  }),
  GalleryEntry('LdsSwipeActions', 'Aksi geser', (context) {
    return Hold<bool>(
      initial: true,
      builder: (context, here, set) => here
          ? LdsSwipeActions(
              actions: [
                LdsSwipeAction(
                    label: 'Arsipkan',
                    icon: 'inventory_2',
                    onPressed: () => set(false)),
                LdsSwipeAction(
                  label: 'Hapus',
                  icon: 'delete',
                  tone: LdsSwipeActionTone.danger,
                  onPressed: () => set(false),
                ),
              ],
              child: const LdsListRow(
                  title: 'Lampu jalan padam',
                  subtitle: 'Geser ke kiri',
                  icon: 'lightbulb'),
            )
          : LdsButton(
              label: 'Kembalikan baris',
              variant: LdsButtonVariant.plain,
              onPressed: () => set(true)),
    );
  }),
  GalleryEntry('LdsPullToRefresh', 'Tarik untuk muat ulang', (context) {
    return Hold<int>(
      initial: 0,
      builder: (context, n, set) => SizedBox(
        height: 220,
        child: LdsPullToRefresh(
          onRefresh: () async {
            await Future<void>.delayed(const Duration(milliseconds: 800));
            set(n + 1);
          },
          child: ListView.builder(
            itemCount: 8,
            itemBuilder: (context, i) => LdsListRow(
              title: 'Laporan ${1024 - i - n}',
              subtitle: i == 0 ? 'Diperbarui $n kali. Tarik ke bawah.' : null,
            ),
          ),
        ),
      ),
    );
  }),
  GalleryEntry('LdsShake', 'Getar salah', (context) {
    return const _ShakeDemo();
  }),
  GalleryEntry('LdsSelectionBar', 'Bilah pilihan', (context) {
    return Hold<int>(
      initial: 2,
      builder: (context, n, set) => DemoColumn(children: [
        Align(
          alignment: Alignment.centerLeft,
          child: LdsNumberStepper(
              value: n,
              max: 9,
              onChanged: set,
              semanticLabel: 'Jumlah dipilih'),
        ),
        LdsSelectionBar(
          count: n,
          countLabel: (k) => '$k laporan dipilih',
          clearLabel: 'Batalkan pilihan',
          onClear: () => set(0),
          actions: [
            LdsSelectionAction(label: 'Setujui', icon: 'check', onPressed: () {}),
            LdsSelectionAction(
                label: 'Hapus',
                icon: 'delete',
                destructive: true,
                onPressed: () => set(0)),
          ],
        ),
      ]),
    );
  }),
  GalleryEntry('LdsInverseButton', 'Tombol inversi', (context) {
    final c = context.lds;
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: c.bgInverse,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
      ),
      child: Wrap(spacing: 8, runSpacing: 8, children: [
        for (final v in LdsInverseButtonVariant.values)
          LdsInverseButton(
            label: switch (v) {
              LdsInverseButtonVariant.accent => 'Lanjut',
              LdsInverseButtonVariant.danger => 'Hapus',
              _ => 'Coba lagi',
            },
            variant: v,
            onPressed: () {},
          ),
      ]),
    );
  }),
];

class _TourDemo extends StatefulWidget {
  const _TourDemo();

  @override
  State<_TourDemo> createState() => _TourDemoState();
}

class _TourDemoState extends State<_TourDemo> {
  final _a = GlobalKey();
  final _b = GlobalKey();
  bool _active = false;

  @override
  Widget build(BuildContext context) {
    return LdsCoachmarkTour(
      active: _active,
      onFinish: (_) => setState(() => _active = false),
      nextLabel: 'Lanjut',
      doneLabel: 'Selesai',
      skipLabel: 'Lewati',
      steps: [
        LdsCoachmarkStep(
            target: _a,
            title: 'Saring laporan',
            body: 'Pilih kecamatan Anda.'),
        LdsCoachmarkStep(
            target: _b,
            title: 'Buat laporan',
            body: 'Laporkan jalan rusak atau sampah.'),
      ],
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          LdsIconButton(
              key: _a,
              icon: 'filter_list',
              semanticLabel: 'Saring',
              variant: LdsIconButtonVariant.filled,
              onPressed: () {}),
          const SizedBox(width: 8),
          LdsIconButton(
              key: _b,
              icon: 'add',
              semanticLabel: 'Laporan baru',
              variant: LdsIconButtonVariant.accent,
              onPressed: () {}),
        ]),
        const SizedBox(height: 12),
        LdsButton(
            label: 'Mulai tur',
            variant: LdsButtonVariant.tinted,
            onPressed: () => setState(() => _active = true)),
      ]),
    );
  }
}

class _ShakeDemo extends StatefulWidget {
  const _ShakeDemo();

  @override
  State<_ShakeDemo> createState() => _ShakeDemoState();
}

class _ShakeDemoState extends State<_ShakeDemo> {
  final _shake = LdsShakeController();

  @override
  void dispose() {
    _shake.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DemoColumn(children: [
      LdsShake(
        controller: _shake,
        child: const LdsTextField(
            label: 'PIN Samsat online', error: 'PIN salah. Sisa 2 percobaan.'),
      ),
      LdsButton(
          label: 'Coba PIN salah',
          variant: LdsButtonVariant.secondary,
          onPressed: _shake.shake),
    ]);
  }
}
