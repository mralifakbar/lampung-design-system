import 'package:lampung_design_system/lampung_design_system.dart';
import 'package:material_ui/material_ui.dart';

import 'charts_demos.dart';
import 'common.dart';
import 'core_demos.dart';
import 'data_demos.dart';
import 'forms_demos.dart';
import 'motion_demos.dart';
import 'navigation_demos.dart';
import 'overlays_demos.dart';
import 'promo_demos.dart';

export 'common.dart' show GalleryEntry, GalleryGroup;

/// Every gallery group, in the order shown.
final List<GalleryGroup> galleryGroups = [
  GalleryGroup(
    title: 'Dasar',
    icon: 'widgets',
    summary: 'Tombol, kartu, peringatan, lencana, daftar',
    entries: coreEntries,
  ),
  GalleryGroup(
    title: 'Formulir',
    icon: 'edit_square',
    summary: 'Isian, pilihan, tanggal, berkas, penggeser',
    entries: formsEntries,
  ),
  GalleryGroup(
    title: 'Lapisan',
    icon: 'layers',
    summary: 'Dialog, lembar, menu, toast, konfirmasi',
    entries: overlaysEntries,
  ),
  GalleryGroup(
    title: 'Navigasi',
    icon: 'signpost',
    summary: 'Tab, langkah, halaman, akordion, pohon',
    entries: navigationEntries,
  ),
  GalleryGroup(
    title: 'Tampilan data',
    icon: 'view_agenda',
    summary: 'Tabel, linimasa, kanban, kemajuan, berkas',
    entries: dataEntries,
  ),
  GalleryGroup(
    title: 'Grafik',
    icon: 'bar_chart',
    summary: 'Batang, garis, donat, peta, KPI',
    entries: chartsEntries,
  ),
  GalleryGroup(
    title: 'Gerak dan obrolan',
    icon: 'chat',
    summary: 'Animasi, umpan balik, percakapan asisten',
    entries: motionEntries,
  ),
  GalleryGroup(
    title: 'Promosi',
    icon: 'campaign',
    summary: 'Hero, fitur, paket, testimoni, footer',
    entries: promoEntries,
  ),
];

/// The Komponen tab: groups, plus a search over every widget name.
class GalleryPage extends StatefulWidget {
  const GalleryPage({super.key});

  @override
  State<GalleryPage> createState() => _GalleryPageState();
}

class _GalleryPageState extends State<GalleryPage> {
  final _search = TextEditingController();
  String _query = '';

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  void _open(String title, List<GalleryEntry> entries) {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => GalleryGroupScreen(title: title, entries: entries),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    final q = _query.trim().toLowerCase();
    final total = galleryGroups.fold<int>(0, (n, g) => n + g.entries.length);

    final header = <Widget>[
      Semantics(
        header: true,
        child: Text(
          'Komponen',
          style: LdsType.title1.copyWith(color: c.textStrong),
        ),
      ),
      const SizedBox(height: LdsSpace.s4),
      Text(
        '$total widget Lampung Design System, masing-masing dengan contoh '
        'yang bisa dicoba.',
        style: LdsType.body.copyWith(color: c.textSubtle),
      ),
      const SizedBox(height: LdsSpace.s16),
      LdsSearchField(
        controller: _search,
        hint: 'Cari nama widget',
        onChanged: (v) => setState(() => _query = v),
      ),
      const SizedBox(height: LdsSpace.s20),
    ];

    if (q.isEmpty) {
      return ListView(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
        children: [
          ...header,
          LdsList(
            footer: 'Semua data di galeri ini contoh.',
            children: [
              for (final g in galleryGroups)
                LdsListRow(
                  icon: g.icon,
                  title: g.title,
                  subtitle: g.summary,
                  value: '${g.entries.length}',
                  onTap: () => _open(g.title, g.entries),
                ),
            ],
          ),
        ],
      );
    }

    final hits = <(GalleryGroup, GalleryEntry)>[
      for (final g in galleryGroups)
        for (final e in g.entries)
          if (e.name.toLowerCase().contains(q) ||
              e.title.toLowerCase().contains(q))
            (g, e),
    ];

    return ListView.builder(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
      itemCount: header.length + 1 + (hits.isEmpty ? 1 : hits.length),
      itemBuilder: (context, i) {
        if (i < header.length) return header[i];
        i -= header.length;
        if (i == 0) {
          return Padding(
            padding: const EdgeInsets.only(bottom: LdsSpace.s8),
            child: Text(
              '${hits.length} hasil',
              style: LdsType.caption.copyWith(color: c.textSubtle),
            ),
          );
        }
        if (hits.isEmpty) {
          return const LdsEmptyState(
            icon: 'search',
            title: 'Widget tidak ditemukan',
            body: 'Coba nama lain, misalnya Button, Sheet atau Chart.',
          );
        }
        final (g, e) = hits[i - 1];
        return LdsListRow(
          title: e.name,
          subtitle: '${e.title} · ${g.title}',
          onTap: () => _open(e.name, [e]),
        );
      },
    );
  }
}

/// Shows every entry of a group, built lazily.
class GalleryGroupScreen extends StatelessWidget {
  const GalleryGroupScreen({
    super.key,
    required this.title,
    required this.entries,
  });

  final String title;
  final List<GalleryEntry> entries;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Scaffold(
      backgroundColor: c.bgCanvas,
      appBar: AppBar(title: Text(title)),
      body: ListView.builder(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 40),
        itemCount: entries.length + 1,
        itemBuilder: (context, i) {
          if (i == 0) {
            return Padding(
              padding: const EdgeInsets.only(bottom: LdsSpace.s8),
              child: Text(
                '${entries.length} widget. Data di halaman ini contoh.',
                style: LdsType.footnote.copyWith(color: c.textSubtle),
              ),
            );
          }
          return _EntrySection(entry: entries[i - 1]);
        },
      ),
    );
  }
}

class _EntrySection extends StatelessWidget {
  const _EntrySection({required this.entry});

  final GalleryEntry entry;

  @override
  Widget build(BuildContext context) {
    final c = context.lds;
    return Padding(
      padding: const EdgeInsets.only(top: LdsSpace.s20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Semantics(
            header: true,
            child: Text(
              entry.title,
              style: LdsType.headline.copyWith(color: c.textStrong),
            ),
          ),
          const SizedBox(height: 2),
          Text(
            entry.name,
            style: LdsType.footnote.copyWith(
              fontFamily: LdsType.mono,
              color: c.textSubtle,
            ),
          ),
          const SizedBox(height: LdsSpace.s12),
          DecoratedBox(
            decoration: BoxDecoration(
              color: c.bgBase,
              border: Border.all(color: c.hairline),
              borderRadius: const BorderRadius.all(
                Radius.circular(LdsRadius.lg),
              ),
            ),
            child: ClipRRect(
              borderRadius: const BorderRadius.all(
                Radius.circular(LdsRadius.lg - 1),
              ),
              child: Padding(
                padding: entry.bleed
                    ? EdgeInsets.zero
                    : const EdgeInsets.all(LdsSpace.s16),
                child: Builder(builder: entry.builder),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
