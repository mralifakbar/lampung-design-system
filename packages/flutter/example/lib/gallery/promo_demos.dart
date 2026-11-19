import 'package:lampung_design_system/lampung_design_system.dart';
import 'package:material_ui/material_ui.dart';

import 'common.dart';

// Household waste levy tiers, an example of a public-service tariff.
List<LdsPlan> _levies(BuildContext context) => [
  LdsPlan(
    name: 'Rumah tangga',
    description: 'Untuk satu rumah tinggal',
    monthlyPrice: 15000,
    yearlyPrice: 12500,
    yearlyNote: 'Rp 150.000 sekali setahun',
    monthlyNote: 'Dibayar tiap bulan',
    features: const ['Angkut 3 kali seminggu', 'Lapor lewat aplikasi'],
    actionLabel: 'Pilih rumah tangga',
    onSelect: () => galleryToast(context, 'Rumah tangga dipilih (contoh)'),
  ),
  LdsPlan(
    name: 'Usaha mikro',
    description: 'Warung, kios dan UMKM',
    monthlyPrice: 35000,
    yearlyPrice: 29000,
    featured: true,
    features: const ['Angkut tiap hari', 'Kantong pilah gratis'],
    actionLabel: 'Pilih usaha mikro',
    onSelect: () => galleryToast(context, 'Usaha mikro dipilih (contoh)'),
  ),
];

Widget _stageContent(BuildContext context) {
  final c = context.lds;
  return Padding(
    padding: const EdgeInsets.all(16),
    child: Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const LdsBadge('Diproses', tone: LdsTone.accent),
        const SizedBox(height: 8),
        Text(
          'Izin usaha mikro',
          style: LdsType.headline.copyWith(color: c.textStrong),
        ),
        Text(
          'Diverifikasi petugas, 14 Nov',
          style: LdsType.footnote.copyWith(color: c.textSubtle),
        ),
      ],
    ),
  );
}

Widget _phoneBody(BuildContext context, int tab) {
  final rows = switch (tab) {
    1 => const [
      ('Posyandu Melati', 'Selasa 08.00'),
      ('Samsat keliling', 'Kamis 09.00'),
    ],
    2 => const [('Rina Andriani', 'Warga Kedaton'), ('Bahasa', 'Indonesia')],
    _ => const [
      ('Jalan berlubang', 'Diproses'),
      ('Lampu jalan padam', 'Selesai'),
      ('Sampah menumpuk', 'Diterima'),
    ],
  };
  return LdsList(
    children: [for (final (t, s) in rows) LdsListRow(title: t, subtitle: s)],
  );
}

final List<GalleryEntry> promoEntries = [
  GalleryEntry('LdsHero', 'Hero', (context) {
    return LdsHero(
      title: 'Urus izin usaha dari rumah.',
      quietTitle: 'Tanpa antre.',
      lede: 'Ajukan, pantau dan unduh izin UMKM dalam satu tempat.',
      actions: [
        LdsButton(
          label: 'Ajukan izin',
          onPressed: () => galleryToast(context, 'Formulir izin dibuka'),
        ),
      ],
      note: 'Contoh data, bukan layanan resmi.',
      media: LdsFeatureStage(child: _stageContent(context)),
    );
  }),
  GalleryEntry('LdsMarketingSection', 'Bagian promosi', (context) {
    return LdsMarketingSection(
      eyebrow: 'Layanan',
      eyebrowIcon: 'widgets',
      title: 'Semua layanan kota di satu tempat',
      lede: 'Pilih layanan, isi formulir, pantau statusnya.',
      aside: LdsLink('Lihat semua', onTap: () {}),
      rule: true,
      child: const LdsCluster(
        children: [
          LdsBadge('Disdukcapil'),
          LdsBadge('Puskesmas'),
          LdsBadge('Samsat'),
          LdsBadge('BPBD'),
        ],
      ),
    );
  }),
  GalleryEntry('LdsFeatureRow', 'Baris fitur', (context) {
    return LdsFeatureRow(
      eyebrow: 'Pelacakan',
      title: 'Pantau permohonan',
      body: 'Status berubah begitu petugas memeriksa berkas.',
      points: const [
        LdsFeaturePoint(icon: 'check_circle', text: 'Notifikasi tiap tahap'),
        LdsFeaturePoint(icon: 'schedule', text: 'Perkiraan waktu selesai'),
      ],
      stage: LdsFeatureStage(child: _stageContent(context)),
      caption: 'Contoh data.',
    );
  }),
  GalleryEntry('LdsFeatureStage', 'Panggung fitur', (context) {
    return LdsFeatureStage(child: _stageContent(context));
  }),
  GalleryEntry('LdsCtaBand', 'Pita ajakan', (context) {
    return LdsCtaBand(
      title: 'Siap mendaftarkan UMKM Anda?',
      body: 'Gratis untuk warga Kota Contoh.',
      actions: [
        LdsButton(
          label: 'Daftar sekarang',
          onPressed: () => galleryToast(context, 'Pendaftaran dibuka'),
        ),
      ],
    );
  }),
  GalleryEntry('LdsTestimonial', 'Testimoni', (context) {
    return const DemoColumn(
      gap: 20,
      children: [
        LdsTestimonial(
          quote: 'Izin warung saya selesai dalam tiga hari.',
          name: 'Siti Rahma',
          role: 'Pemilik warung, Kedaton (contoh)',
          large: true,
        ),
        LdsTestimonial(
          quote: 'Jadwal Samsat keliling sekarang mudah dicari.',
          name: 'Hendra',
          role: 'Warga Rajabasa (contoh)',
        ),
      ],
    );
  }),
  GalleryEntry('LdsPlans', 'Pilihan tarif', (context) {
    return Hold<LdsBillingPeriod>(
      initial: LdsBillingPeriod.month,
      builder: (context, p, set) => LdsPlans(
        period: p,
        onPeriodChanged: set,
        saveNote: 'Hemat 2 bulan dengan bayar tahunan',
        plans: _levies(context),
      ),
    );
  }),
  GalleryEntry('LdsPlanCard', 'Kartu tarif', (context) {
    return LdsPlanCard(
      plan: _levies(context).last,
      period: LdsBillingPeriod.month,
    );
  }),
  GalleryEntry('LdsSiteFooter', 'Kaki situs', (context) {
    return LdsSiteFooter(
      name: 'Layanan Kota Contoh',
      about: 'Contoh situs, bukan layanan resmi.',
      groups: [
        LdsFooterGroup(
          title: 'Layanan',
          links: [
            LdsFooterLink(
              label: 'Izin usaha',
              onTap: () => galleryToast(context, 'Izin usaha'),
            ),
            LdsFooterLink(
              label: 'Pengaduan',
              onTap: () => galleryToast(context, 'Pengaduan'),
            ),
          ],
        ),
        LdsFooterGroup(
          title: 'Bantuan',
          links: [
            LdsFooterLink(
              label: 'Kontak',
              onTap: () => galleryToast(context, 'Kontak'),
            ),
          ],
        ),
      ],
      smallPrint: '© 2026 Dinas Layanan Kota Contoh. Data contoh.',
    );
  }),
  GalleryEntry('LdsDeviceFrame', 'Bingkai perangkat', (context) {
    return Hold<bool>(
      initial: false,
      builder: (context, pushed, set) => DemoColumn(
        children: [
          Center(
            child: SizedBox(
              width: 240,
              height: 460,
              child: LdsDeviceFrame(
                pushed: pushed,
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(12, 56, 12, 12),
                  child: _phoneBody(context, 0),
                ),
              ),
            ),
          ),
          LdsSwitch(value: pushed, label: 'Lapisan di atasnya', onChanged: set),
        ],
      ),
    );
  }),
  GalleryEntry('LdsPhoneStatusBar', 'Bilah status ponsel', (context) {
    return Container(
      decoration: BoxDecoration(
        color: context.lds.bgFill,
        borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
      ),
      child: const LdsPhoneStatusBar(time: '07.30', battery: 0.6),
    );
  }),
  GalleryEntry('LdsPhoneScreen', 'Layar ponsel', (context) {
    return Hold<int>(
      initial: 0,
      builder: (context, tab, set) => Center(
        child: SizedBox(
          width: 260,
          height: 500,
          child: LdsDeviceFrame(
            child: LdsPhoneScreen(
              title: const ['Laporan', 'Jadwal', 'Profil'][tab],
              tabs: const [
                LdsPhoneTab(icon: 'home', label: 'Beranda'),
                LdsPhoneTab(icon: 'calendar_month', label: 'Jadwal'),
                LdsPhoneTab(icon: 'person', label: 'Profil'),
              ],
              currentTab: tab,
              onTabSelected: set,
              children: [_phoneBody(context, tab)],
            ),
          ),
        ),
      ),
    );
  }),
];
