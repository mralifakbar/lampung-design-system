import 'dart:async';

import 'package:lampung_design_system/lampung_design_system.dart';
import 'package:material_ui/material_ui.dart';

import 'common.dart';

Widget _btn(String label, VoidCallback onPressed) => LdsButton(
  label: label,
  variant: LdsButtonVariant.secondary,
  size: LdsButtonSize.md,
  onPressed: onPressed,
);

final List<GalleryEntry> motionEntries = [
  GalleryEntry('LdsEnterExit', 'Masuk dan keluar', (context) {
    return Hold<(bool, LdsEnterStyle)>(
      initial: (true, LdsEnterStyle.dialog),
      builder: (context, v, set) => DemoColumn(
        children: [
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              for (final s in LdsEnterStyle.values)
                LdsChip(
                  label: s.name,
                  selected: v.$2 == s,
                  onChanged: (_) => set((v.$1, s)),
                ),
            ],
          ),
          _btn(v.$1 ? 'Sembunyikan' : 'Tampilkan', () => set((!v.$1, v.$2))),
          SizedBox(
            height: 72,
            child: LdsEnterExit(
              visible: v.$1,
              style: v.$2,
              child: const LdsAlert(
                tone: LdsAlertTone.success,
                title: 'Antrean A-041 dipanggil',
              ),
            ),
          ),
        ],
      ),
    );
  }),
  GalleryEntry('LdsBlurIn', 'Muncul dari kabur', (context) {
    return Hold<int>(
      initial: 0,
      builder: (context, k, set) => DemoColumn(
        children: [
          LdsBlurIn(
            key: ValueKey(k),
            child: Text(
              'Status KTP-el: siap diambil',
              style: LdsType.title3.copyWith(color: context.lds.textStrong),
            ),
          ),
          _btn('Ulangi', () => set(k + 1)),
        ],
      ),
    );
  }),
  GalleryEntry('LdsListStagger', 'Daftar berurutan', (context) {
    return Hold<int>(
      initial: 0,
      builder: (context, k, set) => DemoColumn(
        children: [
          LdsListStagger(
            key: ValueKey(k),
            spacing: 8,
            children: [
              for (final p in const [
                'Puskesmas Kedaton',
                'Puskesmas Way Halim',
                'Puskesmas Rajabasa',
                'Puskesmas Kemiling',
              ])
                LdsCard(child: Text(p)),
            ],
          ),
          _btn('Cari ulang', () => set(k + 1)),
        ],
      ),
    );
  }),
  GalleryEntry('LdsStaggerItem', 'Butir berurutan', (context) {
    return Hold<int>(
      initial: 0,
      builder: (context, k, set) => DemoColumn(
        children: [
          for (var i = 0; i < 3; i++)
            LdsStaggerItem(
              key: ValueKey('$k-$i'),
              index: i,
              child: LdsListRow(
                title: [
                  'Samsat Kedaton',
                  'Samsat Rajabasa',
                  'Samsat keliling',
                ][i],
                icon: 'directions_car',
              ),
            ),
          _btn('Putar ulang', () => set(k + 1)),
        ],
      ),
    );
  }),
  GalleryEntry('LdsReveal', 'Muncul saat digulir', (context) {
    return SizedBox(
      height: 140,
      child: ListView(
        children: [
          const LdsReveal(child: DemoNote('Gulir ke bawah di kotak ini.')),
          const SizedBox(height: 180),
          LdsReveal(
            child: LdsCard(
              child: Text(
                '1.120 laporan selesai bulan ini',
                style: LdsType.title3.copyWith(color: context.lds.textStrong),
              ),
            ),
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }),
  GalleryEntry('LdsHaptics', 'Getaran', (context) {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        for (final (k, label) in const [
          (LdsHapticKind.light, 'Ringan'),
          (LdsHapticKind.medium, 'Sedang'),
          (LdsHapticKind.success, 'Berhasil'),
          (LdsHapticKind.error, 'Gagal'),
        ])
          _btn(label, () => LdsHaptics.play(k)),
      ],
    );
  }),
  GalleryEntry('LdsTextMorph', 'Teks berubah', (context) {
    return Hold<bool>(
      initial: false,
      builder: (context, saved, set) => Row(
        children: [
          Expanded(
            child: LdsTextMorph(
              saved ? 'Draf tersimpan' : 'Simpan draf',
              liveRegion: true,
              style: LdsType.headline.copyWith(color: context.lds.textStrong),
            ),
          ),
          _btn('Ubah', () => set(!saved)),
        ],
      ),
    );
  }),
  GalleryEntry('LdsIconSwap', 'Ikon bertukar', (context) {
    return Hold<bool>(
      initial: false,
      builder: (context, s, set) => Row(
        children: [
          LdsIconSwap(
            icon: 'content_copy',
            swappedIcon: 'check',
            swapped: s,
            size: 24,
            swappedColor: context.lds.success,
          ),
          const SizedBox(width: 12),
          _btn(s ? 'Tersalin' : 'Salin nomor tiket', () {
            set(true);
            Future<void>.delayed(const Duration(milliseconds: 1600), () {
              if (context.mounted) set(false);
            });
          }),
        ],
      ),
    );
  }),
  GalleryEntry('LdsLike', 'Suka', (context) {
    return const _LikeDemo();
  }),
  GalleryEntry('LdsBell', 'Lonceng', (context) {
    return Hold<int>(
      initial: 0,
      builder: (context, n, set) => Row(
        children: [
          LdsBell(rings: n, size: 28),
          const SizedBox(width: 16),
          _btn('Notifikasi baru', () => set(n + 1)),
        ],
      ),
    );
  }),
  GalleryEntry('LdsShimmer', 'Kilau', (context) {
    return Hold<bool>(
      initial: true,
      builder: (context, on, set) => DemoColumn(
        children: [
          LdsShimmer(
            active: on,
            child: Text(
              'Mencari jadwal Samsat keliling',
              style: LdsType.headline.copyWith(color: context.lds.textSubtle),
            ),
          ),
          LdsSwitch(value: on, label: 'Kilau aktif', onChanged: set),
        ],
      ),
    );
  }),
  GalleryEntry('LdsSharedElement', 'Elemen bersama', (context) {
    return PhotoBuilder(
      builder: (context, image) => Row(
        children: [
          GestureDetector(
            onTap: () => LdsSharedElement.open(
              context,
              tag: 'gallery-foto',
              caption: 'Jalan berlubang, Jl. Pagar Alam',
              child: Image(image: image, fit: BoxFit.cover),
            ),
            child: LdsSharedElement(
              tag: 'gallery-foto',
              child: ClipRRect(
                borderRadius: const BorderRadius.all(
                  Radius.circular(LdsRadius.sm),
                ),
                child: Image(
                  image: image,
                  width: 96,
                  height: 72,
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          const Expanded(child: DemoNote('Ketuk foto untuk memperbesar.')),
        ],
      ),
    );
  }),
  GalleryEntry('LdsMomentumDrag', 'Geser bermomentum', (context) {
    return Hold<int>(
      initial: 0,
      builder: (context, i, set) {
        final c = context.lds;
        return DemoColumn(
          children: [
            Container(
              height: 60,
              decoration: BoxDecoration(
                color: c.bgFill,
                borderRadius: const BorderRadius.all(Radius.circular(30)),
              ),
              padding: const EdgeInsets.all(4),
              alignment: Alignment.centerLeft,
              child: LdsMomentumDrag(
                semanticLabel: 'Geser untuk memilih loket',
                snapPoints: const [0, 120, 240],
                snapLabels: const ['Loket 1', 'Loket 2', 'Loket 3'],
                onSnap: set,
                child: Container(
                  width: 52,
                  height: 52,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: c.accent,
                    shape: BoxShape.circle,
                  ),
                  child: const LdsIcon('drag_indicator', color: Colors.white),
                ),
              ),
            ),
            DemoNote('Loket ${i + 1} dipilih. Lempar atau geser.'),
          ],
        );
      },
    );
  }),
  GalleryEntry('LdsThinking', 'Sedang berpikir', (context) {
    return Hold<bool>(
      initial: false,
      builder: (context, done, set) => DemoColumn(
        children: [
          LdsThinking(
            label: done
                ? 'Ditemukan 3 jadwal kosong'
                : 'Memeriksa jadwal puskesmas',
            done: done,
          ),
          _btn(done ? 'Ulangi' : 'Selesaikan', () => set(!done)),
        ],
      ),
    );
  }),
  GalleryEntry('LdsStreamingText', 'Teks mengalir', (context) {
    return const _StreamDemo();
  }),
  GalleryEntry('LdsToolCall', 'Langkah alat', (context) {
    return const DemoColumn(
      gap: 8,
      children: [
        LdsToolCall(
          label: 'Mencari di Perda Kota Contoh',
          icon: 'search',
          body: Text('Pasal 4 mengatur izin usaha mikro.'),
        ),
        LdsToolCall(
          label: 'Memeriksa kalender Samsat keliling',
          status: LdsToolCallStatus.running,
        ),
        LdsToolCall(
          label: 'Membuka data BPJS',
          icon: 'error',
          status: LdsToolCallStatus.failed,
        ),
      ],
    );
  }),
  GalleryEntry('LdsChatMessage', 'Pesan obrolan', (context) {
    return DemoColumn(
      children: [
        const LdsChatMessage.system('Hari ini'),
        const LdsChatMessage.me(
          text: 'Bagaimana cara mengurus KTP yang hilang?',
        ),
        const LdsChatMessage.assistant(
          text: 'Bawa surat kehilangan dari polsek dan KK ke Disdukcapil.',
          steps: [LdsToolCall(label: 'Mencari panduan', icon: 'search')],
          meta: '09.41',
        ),
        LdsChatMessage(
          role: LdsChatRole.me,
          text: 'Terima kasih',
          error: 'Belum terkirim. Anda sedang offline.',
          onRetry: () => galleryToast(context, 'Mengirim ulang'),
        ),
      ],
    );
  }),
  GalleryEntry('LdsComposer', 'Kotak tulis', (context) {
    return LdsComposer(
      hint: 'Tanyakan layanan kota',
      onSend: (t) => galleryToast(context, 'Terkirim: $t'),
    );
  }),
  GalleryEntry('LdsChatLayout', 'Tata letak obrolan', (context) {
    return const _ChatDemo();
  }),
];

class _LikeDemo extends StatefulWidget {
  const _LikeDemo();

  @override
  State<_LikeDemo> createState() => _LikeDemoState();
}

class _LikeDemoState extends State<_LikeDemo> {
  final _like = LdsLikeController(count: 128);

  @override
  void dispose() {
    _like.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        LdsLike(controller: _like, semanticLabel: 'Dukung usulan ini'),
        const SizedBox(width: 12),
        const Expanded(
          child: DemoNote('Dukung usulan taman baca di Way Halim.'),
        ),
      ],
    );
  }
}

const _answer =
    'Pajak kendaraan bisa dibayar di Samsat, Samsat keliling, '
    'atau aplikasi bank daerah. Siapkan KTP dan STNK asli.';

class _StreamDemo extends StatefulWidget {
  const _StreamDemo();

  @override
  State<_StreamDemo> createState() => _StreamDemoState();
}

class _StreamDemoState extends State<_StreamDemo> {
  String _text = '';
  bool _streaming = false;
  StreamSubscription<String>? _sub;

  void _start() {
    _sub?.cancel();
    setState(() {
      _text = '';
      _streaming = true;
    });
    _sub =
        LdsStreamingText.wordStream(
          _answer,
          wordDelay: const Duration(milliseconds: 90),
        ).listen(
          (t) => setState(() => _text = t),
          onDone: () => setState(() => _streaming = false),
        );
  }

  @override
  void dispose() {
    _sub?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DemoColumn(
      children: [
        LdsStreamingText(
          text: _text.isEmpty && !_streaming
              ? 'Tekan tombol untuk bertanya.'
              : _text,
          streaming: _streaming,
        ),
        _btn('Tanya cara bayar PKB', _start),
      ],
    );
  }
}

class _ChatDemo extends StatefulWidget {
  const _ChatDemo();

  @override
  State<_ChatDemo> createState() => _ChatDemoState();
}

class _ChatDemoState extends State<_ChatDemo> {
  final _messages = <Widget>[
    const LdsChatMessage.system('Asisten layanan kota (contoh)'),
    const LdsChatMessage.me(text: 'Jam buka Puskesmas Kedaton?'),
    const LdsChatMessage.assistant(
      text: 'Senin sampai Sabtu, 07.30 sampai 14.00.',
      meta: '09.41',
    ),
  ];
  bool _busy = false;

  Future<void> _send(String text) async {
    setState(() {
      _messages.add(LdsChatMessage.me(text: text));
      _busy = true;
    });
    await Future<void>.delayed(const Duration(milliseconds: 900));
    if (!mounted) return;
    setState(() {
      _busy = false;
      _messages.add(
        const LdsChatMessage.assistant(
          text: 'Pertanyaan Anda diteruskan ke petugas. Balasan dalam 1 hari kerja.',
          isNew: true,
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: const BorderRadius.all(Radius.circular(LdsRadius.md)),
      child: SizedBox(
        height: 360,
        child: LdsChatLayout(
          padding: const EdgeInsets.fromLTRB(8, 8, 8, 8),
          messages: List.of(_messages),
          composer: LdsComposer(busy: _busy, onSend: _send),
          empty: const Text('Tanyakan layanan kota'),
        ),
      ),
    );
  }
}
