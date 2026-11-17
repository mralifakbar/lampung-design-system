import 'dart:async';

import 'package:flutter/material.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

import 'gallery/gallery.dart';

void main() => runApp(const SakaiApp());

/// Sakai: an example citizen app. Every value on screen is an example.
class SakaiApp extends StatefulWidget {
  const SakaiApp({super.key});

  @override
  State<SakaiApp> createState() => _SakaiAppState();
}

class _SakaiAppState extends State<SakaiApp> {
  ThemeMode _mode = ThemeMode.light;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sakai',
      debugShowCheckedModeBanner: false,
      theme: LdsTheme.light(),
      darkTheme: LdsTheme.dark(),
      themeMode: _mode,
      home: SakaiShell(
        mode: _mode,
        onModeChanged: (m) => setState(() => _mode = m),
      ),
    );
  }
}

class SakaiShell extends StatefulWidget {
  const SakaiShell({super.key, required this.mode, required this.onModeChanged});

  final ThemeMode mode;
  final ValueChanged<ThemeMode> onModeChanged;

  @override
  State<SakaiShell> createState() => _SakaiShellState();
}

class _SakaiShellState extends State<SakaiShell> {
  int _tab = 0;

  @override
  Widget build(BuildContext context) {
    final dark = Theme.of(context).brightness == Brightness.dark;
    final pages = [
      HomePage(
        onReport: () => setState(() => _tab = 1),
        dark: dark,
        onToggleTheme: () =>
            widget.onModeChanged(dark ? ThemeMode.light : ThemeMode.dark),
      ),
      const ReportPage(),
      AccountPage(mode: widget.mode, onModeChanged: widget.onModeChanged),
      const GalleryPage(),
    ];
    return Scaffold(
      body: Column(
        children: [
          const LdsMasthead(
            text: 'Aplikasi contoh. Bukan layanan resmi Pemerintah Provinsi '
                'Lampung.',
          ),
          Expanded(child: pages[_tab]),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tab,
        onDestinationSelected: (i) => setState(() => _tab = i),
        destinations: const [
          NavigationDestination(
            icon: LdsIcon('home', size: 24),
            selectedIcon: LdsIcon('home', size: 24, fill: true),
            label: 'Beranda',
          ),
          NavigationDestination(
            icon: LdsIcon('campaign', size: 24),
            selectedIcon: LdsIcon('campaign', size: 24, fill: true),
            label: 'Lapor',
          ),
          NavigationDestination(
            icon: LdsIcon('person', size: 24),
            selectedIcon: LdsIcon('person', size: 24, fill: true),
            label: 'Akun',
          ),
          NavigationDestination(
            icon: LdsIcon('widgets', size: 24),
            selectedIcon: LdsIcon('widgets', size: 24, fill: true),
            label: 'Komponen',
          ),
        ],
      ),
    );
  }
}

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------

class _Service {
  const _Service(this.icon, this.label, this.color);
  final String icon;
  final String label;
  final Color Function(LdsColors c) color;
}

final _services = <_Service>[
  _Service('local_hospital', 'Puskesmas', (c) => c.tileRed),
  _Service('directions_bus', 'Jadwal bus', (c) => c.tileBlue),
  _Service('description', 'Surat pengantar', (c) => c.accent),
  _Service('water_drop', 'Air bersih', (c) => c.tileBlue),
  _Service('flood', 'Info banjir', (c) => c.tileOrange),
  _Service('school', 'Beasiswa', (c) => c.tileGreen),
  _Service('payments', 'Pajak daerah', (c) => c.tileGray),
  _Service('local_police', 'Darurat', (c) => c.tileRed),
];

class _Report {
  const _Report(this.title, this.place, this.status, this.tone, this.icon);
  final String title;
  final String place;
  final String status;
  final LdsTone tone;
  final String icon;
}

const _reports = <_Report>[
  _Report('Jalan berlubang', 'Jl. Pagar Alam, Kedaton', 'Diproses',
      LdsTone.warning, 'traffic'),
  _Report('Lampu jalan padam', 'Jl. Teuku Umar, Kedaton', 'Selesai',
      LdsTone.success, 'lightbulb'),
  _Report('Sampah menumpuk', 'Pasar Way Halim', 'Diterima', LdsTone.accent,
      'delete'),
];

class HomePage extends StatefulWidget {
  const HomePage({
    super.key,
    required this.onReport,
    required this.dark,
    required this.onToggleTheme,
  });

  final VoidCallback onReport;
  final bool dark;
  final VoidCallback onToggleTheme;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String _filter = 'semua';
  bool _loading = true;
  bool _alertOpen = true;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer(const Duration(milliseconds: 1200), () {
      if (mounted) setState(() => _loading = false);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final reports = _reports.where((r) {
      return switch (_filter) {
        'proses' => r.status != 'Selesai',
        'selesai' => r.status == 'Selesai',
        _ => true,
      };
    }).toList();

    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const LdsAksara('Sakai', height: 28),
                  const SizedBox(height: LdsSpace.s4),
                  Semantics(
                    header: true,
                    child: Text(
                      'Halo, Rina',
                      style: LdsType.largeTitle.copyWith(color: c.textStrong),
                    ),
                  ),
                  Text(
                    'Bandar Lampung, Senin 16 November',
                    style: LdsType.subhead.copyWith(color: c.textSubtle),
                  ),
                ],
              ),
            ),
            LdsIconButton(
              icon: widget.dark ? 'light_mode' : 'dark_mode',
              semanticLabel:
                  widget.dark ? 'Pakai tampilan terang' : 'Pakai tampilan gelap',
              variant: LdsIconButtonVariant.filled,
              onPressed: widget.onToggleTheme,
            ),
          ],
        ),
        const SizedBox(height: LdsSpace.s20),
        if (_alertOpen) ...[
          LdsAlert(
            tone: LdsAlertTone.warning,
            title: 'Air PDAM mati Rabu, 08.00 sampai 14.00',
            body: 'Wilayah Kedaton dan Way Halim. Tampung air sejak Selasa '
                'malam.',
            onClose: () => setState(() => _alertOpen = false),
            closeLabel: 'Tutup pemberitahuan',
          ),
          const SizedBox(height: LdsSpace.s24),
        ],
        const _SectionTitle('Layanan'),
        const SizedBox(height: LdsSpace.s12),
        LayoutBuilder(builder: (context, constraints) {
          final columns = constraints.maxWidth >= 560 ? 4 : 3;
          const gap = LdsSpace.s8;
          final width =
              (constraints.maxWidth - gap * (columns - 1)) / columns;
          return Wrap(
            spacing: gap,
            runSpacing: gap,
            children: [
              for (final s in _services)
                SizedBox(
                  width: width,
                  child: LdsCard(
                    onTap: () => ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('${s.label} dibuka (contoh).')),
                    ),
                    semanticLabel: s.label,
                    padding: const EdgeInsets.symmetric(
                        horizontal: LdsSpace.s8, vertical: LdsSpace.s14),
                    child: Column(
                      children: [
                        Container(
                          width: 40,
                          height: 40,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: s.color(c),
                            borderRadius: const BorderRadius.all(
                                Radius.circular(LdsRadius.md)),
                          ),
                          child: LdsIcon(s.icon,
                              size: 22, fill: true, color: Colors.white),
                        ),
                        const SizedBox(height: LdsSpace.s8),
                        Text(
                          s.label,
                          textAlign: TextAlign.center,
                          maxLines: 2,
                          style: LdsType.footnote.copyWith(
                            color: c.textStrong,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          );
        }),
        const SizedBox(height: LdsSpace.s32),
        Row(
          children: [
            const Expanded(child: _SectionTitle('Laporan saya')),
            LdsButton(
              label: 'Lapor',
              icon: 'add',
              size: LdsButtonSize.md,
              variant: LdsButtonVariant.tinted,
              onPressed: widget.onReport,
            ),
          ],
        ),
        const SizedBox(height: LdsSpace.s12),
        LdsSegmented<String>(
          semanticLabel: 'Saring laporan',
          value: _filter,
          onChanged: (v) => setState(() => _filter = v),
          segments: const [
            LdsSegment(value: 'semua', label: 'Semua'),
            LdsSegment(value: 'proses', label: 'Berjalan'),
            LdsSegment(value: 'selesai', label: 'Selesai'),
          ],
        ),
        const SizedBox(height: LdsSpace.s12),
        if (_loading)
          const _ReportsSkeleton()
        else if (reports.isEmpty)
          LdsCard(
            child: LdsEmptyState(
              title: 'Belum ada laporan di sini',
              body: 'Laporan yang selesai ditangani akan muncul di sini.',
              action: LdsButton(
                label: 'Buat laporan',
                size: LdsButtonSize.md,
                onPressed: widget.onReport,
              ),
            ),
          )
        else
          LdsList(
            footer: 'Data di halaman ini contoh.',
            children: [
              for (final r in reports)
                LdsListRow(
                  icon: r.icon,
                  iconColor: c.tileGray,
                  title: r.title,
                  subtitle: r.place,
                  trailing: LdsBadge(r.status, tone: r.tone),
                  onTap: () {},
                ),
            ],
          ),
        const SizedBox(height: LdsSpace.s32),
        const LdsAksaraBand(),
      ],
    );
  }
}

class _ReportsSkeleton extends StatelessWidget {
  const _ReportsSkeleton();

  @override
  Widget build(BuildContext context) {
    return LdsCard(
      child: Column(
        children: [
          for (var i = 0; i < 3; i++)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: LdsSpace.s8),
              child: Row(
                children: [
                  LdsSkeleton(
                    width: 30,
                    height: 30,
                    semanticLabel: i == 0 ? 'Memuat laporan' : null,
                  ),
                  const SizedBox(width: LdsSpace.s12),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        LdsSkeleton(width: 160, height: 14),
                        SizedBox(height: LdsSpace.s6),
                        LdsSkeleton(width: 110, height: 12),
                      ],
                    ),
                  ),
                  const LdsSkeleton(width: 64, height: 22),
                ],
              ),
            ),
        ],
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle(this.text);
  final String text;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      header: true,
      child: Text(
        text,
        style: LdsType.title3.copyWith(color: context.lds.textStrong),
      ),
    );
  }
}

// ---------------------------------------------------------------------------
// Report form
// ---------------------------------------------------------------------------

class ReportPage extends StatefulWidget {
  const ReportPage({super.key});

  @override
  State<ReportPage> createState() => _ReportPageState();
}

class _ReportPageState extends State<ReportPage> {
  final _title = TextEditingController();
  final _place = TextEditingController();
  final _details = TextEditingController();
  final _phone = TextEditingController();
  String _category = 'jalan';
  bool _sms = true;
  bool _sending = false;
  String? _titleError;
  String? _placeError;

  static const _categories = {
    'jalan': 'Jalan',
    'sampah': 'Sampah',
    'air': 'Air bersih',
    'lampu': 'Lampu jalan',
    'lain': 'Lainnya',
  };

  @override
  void dispose() {
    _title.dispose();
    _place.dispose();
    _details.dispose();
    _phone.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    setState(() {
      _titleError =
          _title.text.trim().isEmpty ? 'Tulis singkat masalahnya.' : null;
      _placeError = _place.text.trim().isEmpty
          ? 'Isi lokasi agar petugas bisa menemukannya.'
          : null;
    });
    if (_titleError != null || _placeError != null) return;
    setState(() => _sending = true);
    await Future<void>.delayed(const Duration(milliseconds: 1400));
    if (!mounted) return;
    setState(() => _sending = false);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Laporan terkirim. Nomor tiket LPR-2026-0142.'),
        action: SnackBarAction(label: 'Lihat', onPressed: () {}),
      ),
    );
    _title.clear();
    _place.clear();
    _details.clear();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
      children: [
        Semantics(
          header: true,
          child: Text('Buat laporan',
              style: LdsType.title1.copyWith(color: c.textStrong)),
        ),
        const SizedBox(height: LdsSpace.s4),
        Text(
          'Laporan diteruskan ke Dinas Layanan Kota Contoh dan dibalas dalam '
          '3 hari kerja.',
          style: LdsType.body.copyWith(color: c.textSubtle),
        ),
        const SizedBox(height: LdsSpace.s24),
        Text('Kategori',
            style: LdsType.caption.copyWith(color: c.textStrong)),
        const SizedBox(height: LdsSpace.s8),
        Wrap(
          spacing: LdsSpace.s8,
          runSpacing: LdsSpace.s8,
          children: [
            for (final e in _categories.entries)
              ChoiceChip(
                label: Text(e.value),
                selected: _category == e.key,
                onSelected: (_) => setState(() => _category = e.key),
              ),
          ],
        ),
        const SizedBox(height: LdsSpace.s20),
        LdsTextField(
          label: 'Judul laporan',
          hint: 'Contoh: Jalan berlubang di depan sekolah',
          controller: _title,
          error: _titleError,
          textInputAction: TextInputAction.next,
          onChanged: (_) {
            if (_titleError != null) setState(() => _titleError = null);
          },
        ),
        const SizedBox(height: LdsSpace.s20),
        LdsTextField(
          label: 'Lokasi',
          hint: 'Nama jalan, kelurahan',
          prefixIcon: 'location_on',
          controller: _place,
          error: _placeError,
          help: 'Tambahkan patokan, misalnya nama toko terdekat.',
          textInputAction: TextInputAction.next,
          onChanged: (_) {
            if (_placeError != null) setState(() => _placeError = null);
          },
        ),
        const SizedBox(height: LdsSpace.s20),
        LdsTextField(
          label: 'Keterangan',
          optionalText: '(opsional)',
          controller: _details,
          maxLines: 4,
          minLines: 3,
          maxLength: 500,
        ),
        const SizedBox(height: LdsSpace.s20),
        LdsTextField(
          label: 'Nomor HP',
          optionalText: '(opsional)',
          hint: '0812 3456 7890',
          prefixIcon: 'smartphone',
          controller: _phone,
          keyboardType: TextInputType.phone,
          autofillHints: const [AutofillHints.telephoneNumber],
        ),
        const SizedBox(height: LdsSpace.s20),
        LdsList(
          children: [
            LdsListRow(
              title: 'Kabari saya lewat SMS',
              subtitle: 'Saat status laporan berubah',
              trailing: Switch(
                value: _sms,
                onChanged: (v) => setState(() => _sms = v),
              ),
            ),
          ],
        ),
        const SizedBox(height: LdsSpace.s20),
        const LdsAlert(
          title: 'Jangan kirim data pribadi orang lain',
          body: 'Foto wajah dan nomor kendaraan akan disamarkan petugas.',
        ),
        const SizedBox(height: LdsSpace.s24),
        LdsButton(
          label: 'Kirim laporan',
          icon: 'outbox',
          size: LdsButtonSize.lg,
          expand: true,
          loading: _sending,
          loadingLabel: 'Mengirim',
          onPressed: _submit,
        ),
        const SizedBox(height: LdsSpace.s8),
        LdsButton(
          label: 'Simpan sebagai draf',
          variant: LdsButtonVariant.plain,
          expand: true,
          onPressed: _sending ? null : () {},
        ),
      ],
    );
  }
}

// ---------------------------------------------------------------------------
// Account
// ---------------------------------------------------------------------------

class AccountPage extends StatelessWidget {
  const AccountPage({super.key, required this.mode, required this.onModeChanged});

  final ThemeMode mode;
  final ValueChanged<ThemeMode> onModeChanged;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
      children: [
        Semantics(
          header: true,
          child: Text('Akun',
              style: LdsType.title1.copyWith(color: c.textStrong)),
        ),
        const SizedBox(height: LdsSpace.s20),
        LdsCard(
          child: Row(
            children: [
              CircleAvatar(
                radius: 24,
                backgroundColor: c.accentTint,
                child: Text('RA',
                    style: LdsType.headline.copyWith(color: c.accentText)),
              ),
              const SizedBox(width: LdsSpace.s12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Rina Andriani',
                        style: LdsType.headline.copyWith(color: c.textStrong)),
                    Text('Warga Kedaton, Bandar Lampung',
                        style: LdsType.footnote.copyWith(color: c.textSubtle)),
                  ],
                ),
              ),
              const LdsBadge('Terverifikasi',
                  tone: LdsTone.gold, icon: 'verified'),
            ],
          ),
        ),
        const SizedBox(height: LdsSpace.s24),
        Text('Tampilan', style: LdsType.caption.copyWith(color: c.textSubtle)),
        const SizedBox(height: LdsSpace.s8),
        LdsSegmented<ThemeMode>(
          semanticLabel: 'Tampilan',
          value: mode,
          onChanged: onModeChanged,
          segments: const [
            LdsSegment(value: ThemeMode.light, label: 'Terang'),
            LdsSegment(value: ThemeMode.dark, label: 'Gelap'),
            LdsSegment(value: ThemeMode.system, label: 'Ikuti sistem'),
          ],
        ),
        const SizedBox(height: LdsSpace.s24),
        LdsList(
          header: 'Pengaturan',
          children: [
            LdsListRow(
                icon: 'notifications',
                title: 'Notifikasi',
                value: 'Aktif',
                onTap: () {}),
            LdsListRow(
                icon: 'language',
                iconColor: c.tileBlue,
                title: 'Bahasa',
                value: 'Indonesia',
                onTap: () {}),
            LdsListRow(
                icon: 'shield',
                iconColor: c.tileGray,
                title: 'Privasi dan data',
                onTap: () {}),
          ],
        ),
        const SizedBox(height: LdsSpace.s24),
        LdsButton(
          label: 'Keluar',
          variant: LdsButtonVariant.secondary,
          icon: 'logout',
          expand: true,
          onPressed: () => showDialog<void>(
            context: context,
            builder: (context) => AlertDialog(
              title: const Text('Keluar dari Sakai?'),
              content: const Text(
                  'Laporan yang sudah terkirim tetap tersimpan di akun Anda.'),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Batal'),
                ),
                FilledButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Keluar'),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
