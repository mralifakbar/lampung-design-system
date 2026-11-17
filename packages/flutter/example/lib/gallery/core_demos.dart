import 'package:flutter/material.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

import 'common.dart';

const _variantLabels = {
  LdsButtonVariant.primary: 'Kirim laporan',
  LdsButtonVariant.secondary: 'Simpan draf',
  LdsButtonVariant.tinted: 'Unduh bukti',
  LdsButtonVariant.gray: 'Batal',
  LdsButtonVariant.plain: 'Lihat syarat',
  LdsButtonVariant.danger: 'Hapus laporan',
};

const _sizeLabels = {
  LdsButtonSize.sm: 'Kecil',
  LdsButtonSize.md: 'Sedang',
  LdsButtonSize.regular: 'Biasa',
  LdsButtonSize.lg: 'Besar',
};

final List<GalleryEntry> coreEntries = [
  GalleryEntry('LdsButton', 'Tombol', (context) {
    return Hold<bool>(
      initial: false,
      builder: (context, loading, set) => DemoColumn(children: [
        for (final v in LdsButtonVariant.values)
          LdsButton(
            label: _variantLabels[v]!,
            variant: v,
            expand: true,
            onPressed: () => galleryToast(context, '${_variantLabels[v]} (contoh)'),
          ),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            for (final s in LdsButtonSize.values)
              LdsButton(
                  label: _sizeLabels[s]!,
                  size: s,
                  icon: 'outbox',
                  onPressed: () {}),
          ],
        ),
        LdsButton(
          label: 'Ajukan KTP elektronik',
          icon: 'id_card',
          loading: loading,
          loadingLabel: 'Mengirim',
          expand: true,
          onPressed: () async {
            set(true);
            await Future<void>.delayed(const Duration(milliseconds: 1500));
            set(false);
          },
        ),
        const LdsButton(label: 'Tidak tersedia', onPressed: null, expand: true),
      ]),
    );
  }),
  GalleryEntry('LdsIconButton', 'Tombol ikon', (context) {
    return Hold<bool>(
      initial: false,
      builder: (context, saved, set) => Wrap(spacing: 8, children: [
        LdsIconButton(
            icon: 'share',
            semanticLabel: 'Bagikan',
            onPressed: () => galleryToast(context, 'Tautan dibagikan')),
        LdsIconButton(
            icon: 'bookmark',
            semanticLabel: saved ? 'Hapus dari simpanan' : 'Simpan',
            fill: saved,
            selected: saved,
            variant: LdsIconButtonVariant.filled,
            onPressed: () => set(!saved)),
        LdsIconButton(
            icon: 'call',
            semanticLabel: 'Telepon puskesmas',
            variant: LdsIconButtonVariant.accent,
            onPressed: () {}),
      ]),
    );
  }),
  GalleryEntry('LdsCard', 'Kartu', (context) {
    final c = context.lds;
    return DemoColumn(children: [
      LdsCard(
        child: Text('Puskesmas Kedaton buka Senin sampai Sabtu, 07.30 '
            'sampai 14.00.',
            style: LdsType.body.copyWith(color: c.textDefault)),
      ),
      LdsCard(
        variant: LdsCardVariant.outline,
        onTap: () => galleryToast(context, 'Detail Samsat dibuka'),
        semanticLabel: 'Samsat Bandar Lampung',
        child: Row(children: [
          LdsIcon('directions_car', color: c.accentText),
          const SizedBox(width: 12),
          Expanded(
            child: Text('Samsat Bandar Lampung, ketuk untuk detail',
                style: LdsType.bodyStrong.copyWith(color: c.textStrong)),
          ),
        ]),
      ),
    ]);
  }),
  GalleryEntry('LdsAlert', 'Peringatan', (context) {
    return Hold<Set<LdsAlertTone>>(
      initial: LdsAlertTone.values.toSet(),
      builder: (context, open, set) => DemoColumn(children: [
        if (open.contains(LdsAlertTone.info))
          LdsAlert(
              title: 'Perekaman KTP-el pindah ke Gedung B',
              body: 'Disdukcapil Kota Contoh, mulai 1 Desember.',
              closeLabel: 'Tutup',
              onClose: () => set({...open}..remove(LdsAlertTone.info))),
        if (open.contains(LdsAlertTone.success))
          LdsAlert(
              tone: LdsAlertTone.success,
              title: 'Pajak kendaraan lunas',
              body: 'BE 1234 AB berlaku sampai 17 November 2027.',
              closeLabel: 'Tutup',
              onClose: () => set({...open}..remove(LdsAlertTone.success))),
        if (open.contains(LdsAlertTone.warning))
          LdsAlert(
              tone: LdsAlertTone.warning,
              title: 'Hujan lebat sore ini',
              body: 'BPBD meminta warga Teluk Betung waspada genangan.',
              closeLabel: 'Tutup',
              onClose: () => set({...open}..remove(LdsAlertTone.warning))),
        if (open.contains(LdsAlertTone.danger))
          LdsAlert(
            tone: LdsAlertTone.danger,
            title: 'Berkas KK ditolak',
            body: 'Foto buram. Unggah ulang dalam 7 hari.',
            actions: [
              LdsButton(
                  label: 'Unggah ulang',
                  size: LdsButtonSize.sm,
                  variant: LdsButtonVariant.secondary,
                  onPressed: () {}),
            ],
          ),
        if (open.length < 4)
          LdsButton(
              label: 'Tampilkan lagi',
              variant: LdsButtonVariant.plain,
              onPressed: () => set(LdsAlertTone.values.toSet())),
      ]),
    );
  }),
  GalleryEntry('LdsBadge', 'Lencana', (context) {
    return const Wrap(spacing: 8, runSpacing: 8, children: [
      LdsBadge('Diterima'),
      LdsBadge('Diproses', tone: LdsTone.accent),
      LdsBadge('Selesai', tone: LdsTone.success, icon: 'check'),
      LdsBadge('Menunggu berkas', tone: LdsTone.warning),
      LdsBadge('Ditolak', tone: LdsTone.danger),
      LdsBadge('Terverifikasi', tone: LdsTone.gold, icon: 'verified'),
    ]);
  }),
  GalleryEntry('LdsTextField', 'Isian teks', (context) {
    return const DemoColumn(gap: 16, children: [
      LdsTextField(
        label: 'NIK',
        help: '16 digit sesuai KTP',
        prefixIcon: 'id_card',
        keyboardType: TextInputType.number,
        maxLength: 16,
      ),
      LdsTextField(
          label: 'Email',
          hint: 'nama@contoh.id',
          error: 'Format email belum benar'),
      LdsTextField(label: 'Kecamatan', optionalText: '(opsional)'),
    ]);
  }),
  GalleryEntry('LdsSegmented', 'Kontrol segmen', (context) {
    return Hold<String>(
      initial: 'minggu',
      builder: (context, v, set) => DemoColumn(children: [
        LdsSegmented<String>(
          semanticLabel: 'Rentang laporan',
          value: v,
          onChanged: set,
          segments: const [
            LdsSegment(value: 'hari', label: 'Hari'),
            LdsSegment(value: 'minggu', label: 'Minggu'),
            LdsSegment(value: 'bulan', label: 'Bulan'),
          ],
        ),
        DemoNote(switch (v) {
          'hari' => '12 laporan masuk hari ini',
          'bulan' => '1.284 laporan masuk bulan ini',
          _ => '318 laporan masuk minggu ini',
        }),
      ]),
    );
  }),
  GalleryEntry('LdsListRow', 'Baris daftar', (context) {
    return Hold<bool>(
      initial: true,
      builder: (context, on, set) => LdsList(
        header: 'Layanan',
        footer: 'Data contoh',
        children: [
          LdsListRow(
              title: 'Lapor jalan rusak',
              subtitle: 'Dinas Layanan Kota Contoh',
              icon: 'traffic',
              onTap: () => galleryToast(context, 'Formulir laporan dibuka')),
          const LdsListRow(
              title: 'Status BPJS', value: 'Aktif', icon: 'medical_services'),
          LdsListRow(
            title: 'Notifikasi antrean',
            icon: 'notifications',
            trailing: Switch(value: on, onChanged: set),
          ),
        ],
      ),
    );
  }),
  GalleryEntry('LdsList', 'Kelompok daftar', (context) {
    return LdsList(outlined: true, header: 'Puskesmas terdekat', children: [
      for (final p in const ['Kedaton', 'Way Halim', 'Rajabasa'])
        LdsListRow(
            title: 'Puskesmas $p',
            icon: 'local_hospital',
            iconColor: context.lds.tileRed,
            onTap: () {}),
    ]);
  }),
  GalleryEntry('LdsSkeleton', 'Kerangka pemuatan', (context) {
    return const Row(children: [
      LdsSkeleton.circle(semanticLabel: 'Memuat profil'),
      SizedBox(width: 12),
      Expanded(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          LdsSkeleton(width: 180, height: 14),
          SizedBox(height: 6),
          LdsSkeleton(width: 120, height: 12),
        ]),
      ),
    ]);
  }),
  GalleryEntry('LdsEmptyState', 'Keadaan kosong', (context) {
    return LdsEmptyState(
      title: 'Belum ada laporan',
      body: 'Laporan yang Anda kirim muncul di sini.',
      action: LdsButton(
          label: 'Buat laporan',
          size: LdsButtonSize.md,
          onPressed: () => galleryToast(context, 'Formulir laporan dibuka')),
    );
  }),
  GalleryEntry('LdsMasthead', 'Pita keterangan', (context) {
    return const LdsMasthead(
      safeArea: false,
      text: 'Aplikasi contoh. Bukan layanan resmi Pemerintah Provinsi '
          'Lampung.',
    );
  }),
  GalleryEntry('LdsIcon', 'Ikon', (context) {
    final c = context.lds;
    return Wrap(spacing: 16, runSpacing: 12, children: [
      for (final n in const [
        'local_hospital',
        'id_card',
        'directions_car',
        'storefront',
        'flood',
        'campaign',
      ]) ...[
        LdsIcon(n, size: 24, color: c.textDefault),
        LdsIcon(n, size: 24, fill: true, color: c.accentText),
      ],
    ]);
  }),
  GalleryEntry('LdsAksara', 'Aksara Lampung', (context) {
    return const DemoColumn(children: [
      LdsAksara('Lampung', height: 40),
      DemoNote('Dibaca: Lampung'),
      LdsAksara('Sai Bumi'),
      DemoNote('Dibaca: Sai Bumi'),
    ]);
  }),
  GalleryEntry('LdsAksaraBand', 'Pita aksara', (context) {
    return const LdsAksaraBand();
  }),
  GalleryEntry('LdsPressable', 'Area tekan', (context) {
    return Hold<int>(
      initial: 0,
      builder: (context, n, set) => LdsPressable(
        onPressed: () => set(n + 1),
        semanticLabel: 'Ambil nomor antrean',
        builder: (context, state) {
          final c = context.lds;
          return Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: state.pressed ? c.accentTintStrong : c.accentTint,
              borderRadius:
                  const BorderRadius.all(Radius.circular(LdsRadius.md)),
            ),
            child: Text(
              n == 0 ? 'Ketuk untuk ambil antrean' : 'Nomor antrean A-${n + 40}',
              style: LdsType.bodyStrong.copyWith(color: c.accentText),
            ),
          );
        },
      ),
    );
  }),
];
