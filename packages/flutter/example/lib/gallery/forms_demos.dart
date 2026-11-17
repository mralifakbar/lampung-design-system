import 'package:flutter/material.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

import 'common.dart';

const _kecamatanOptions = [
  LdsSelectOption(value: 'kd', label: 'Kedaton'),
  LdsSelectOption(value: 'tk', label: 'Tanjung Karang Pusat'),
  LdsSelectOption(value: 'wh', label: 'Way Halim'),
  LdsSelectOption(value: 'rb', label: 'Rajabasa'),
  LdsSelectOption(value: 'km', label: 'Kemiling'),
];

final List<GalleryEntry> formsEntries = [
  GalleryEntry('LdsCheckbox', 'Kotak centang', (context) {
    return Hold<(bool?, bool)>(
      initial: (null, true),
      builder: (context, v, set) => DemoColumn(gap: 4, children: [
        LdsCheckbox(
            value: v.$2,
            label: 'Saya menyetujui syarat layanan',
            onChanged: (x) => set((v.$1, x))),
        LdsCheckbox(
            value: v.$1,
            label: 'Kirim salinan ke email (sebagian)',
            onChanged: (x) => set((x, v.$2))),
        const LdsCheckbox(value: false, label: 'Nonaktif', onChanged: null),
      ]),
    );
  }),
  GalleryEntry('LdsRadio', 'Tombol radio', (context) {
    return Hold<int>(
      initial: 1,
      builder: (context, v, set) => DemoColumn(gap: 4, children: [
        LdsRadio<int>(
            value: 1,
            groupValue: v,
            onChanged: set,
            label: 'Antrean pagi',
            description: '07.30 sampai 10.00'),
        LdsRadio<int>(
            value: 2,
            groupValue: v,
            onChanged: set,
            label: 'Antrean siang',
            description: '10.00 sampai 13.00'),
      ]),
    );
  }),
  GalleryEntry('LdsRadioGroup', 'Grup radio', (context) {
    return Hold<String>(
      initial: 'kantor',
      builder: (context, v, set) => LdsRadioGroup<String>(
        label: 'Cara pengambilan KTP-el',
        value: v,
        onChanged: set,
        options: const [
          LdsRadioOption(value: 'kantor', label: 'Ambil di kantor Disdukcapil'),
          LdsRadioOption(
              value: 'pos',
              label: 'Dikirim lewat pos',
              description: 'Tambahan 3 hari kerja'),
        ],
      ),
    );
  }),
  GalleryEntry('LdsRadioCard', 'Kartu radio', (context) {
    return Hold<int>(
      initial: 1,
      builder: (context, v, set) => DemoColumn(gap: 8, children: [
        LdsRadioCard<int>(
            value: 1,
            groupValue: v,
            onChanged: set,
            title: 'Kirim ke rumah',
            description: '2 sampai 3 hari kerja',
            trailing: 'Rp 15.000'),
        LdsRadioCard<int>(
            value: 2,
            groupValue: v,
            onChanged: set,
            title: 'Ambil di kantor kelurahan',
            description: 'Siap besok pagi',
            trailing: 'Gratis'),
      ]),
    );
  }),
  GalleryEntry('LdsSwitch', 'Sakelar', (context) {
    return Hold<bool>(
      initial: true,
      builder: (context, v, set) => LdsSwitch(
          value: v,
          label: 'Notifikasi status laporan',
          onChanged: set),
    );
  }),
  GalleryEntry('LdsToggleGroup', 'Grup sakelar', (context) {
    return Hold<Set<String>>(
      initial: const {'b'},
      builder: (context, v, set) => DemoColumn(children: [
        LdsToggleGroup<String>(
          items: const [
            LdsToggleItem(
                value: 'b', icon: 'format_bold', semanticLabel: 'Tebal'),
            LdsToggleItem(
                value: 'i', icon: 'format_italic', semanticLabel: 'Miring'),
            LdsToggleItem(value: 'l', label: 'Tautan'),
          ],
          selected: v,
          onChanged: set,
        ),
        Hold<Set<String>>(
          initial: const {'peta'},
          builder: (context, w, setW) => LdsToggleGroup<String>(
            exclusive: true,
            items: const [
              LdsToggleItem(value: 'peta', label: 'Peta'),
              LdsToggleItem(value: 'daftar', label: 'Daftar'),
            ],
            selected: w,
            onChanged: setW,
          ),
        ),
      ]),
    );
  }),
  GalleryEntry('LdsSelect', 'Pilihan', (context) {
    return Hold<String?>(
      initial: null,
      builder: (context, v, set) => LdsSelect<String>(
        label: 'Kecamatan',
        options: _kecamatanOptions,
        value: v,
        onChanged: set,
      ),
    );
  }),
  GalleryEntry('LdsCombobox', 'Pilihan dengan pencarian', (context) {
    return Hold<String?>(
      initial: null,
      builder: (context, v, set) => LdsCombobox<String>(
        label: 'Kecamatan domisili',
        options: _kecamatanOptions,
        value: v,
        onChanged: set,
      ),
    );
  }),
  GalleryEntry('LdsTextarea', 'Isian panjang', (context) {
    return const LdsTextarea(
        label: 'Uraian laporan',
        maxLength: 280,
        help: 'Jelaskan singkat apa yang terjadi.');
  }),
  GalleryEntry('LdsPasswordField', 'Kata sandi', (context) {
    return const LdsPasswordField(showStrength: true, newPassword: true);
  }),
  GalleryEntry('LdsSearchField', 'Pencarian', (context) {
    return const LdsSearchField(hint: 'Cari layanan', showCancel: true);
  }),
  GalleryEntry('LdsAmountField', 'Isian nominal', (context) {
    return Hold<int?>(
      initial: 350000,
      builder: (context, v, set) => LdsAmountField(
        label: 'Retribusi izin usaha mikro',
        value: v,
        onChanged: set,
        help: 'Tanpa titik. Pembayaran lewat bank daerah.',
      ),
    );
  }),
  GalleryEntry('LdsNumberStepper', 'Penghitung', (context) {
    return Hold<int>(
      initial: 2,
      builder: (context, v, set) => Row(children: [
        Expanded(
          child: Text('Anggota keluarga di KK',
              style: LdsType.body.copyWith(color: context.lds.textDefault)),
        ),
        LdsNumberStepper(
            value: v,
            max: 12,
            onChanged: set,
            semanticLabel: 'Jumlah anggota keluarga'),
      ]),
    );
  }),
  GalleryEntry('LdsOtpField', 'Kode verifikasi', (context) {
    return Hold<String?>(
      initial: null,
      builder: (context, v, set) => DemoColumn(children: [
        LdsOtpField(
          onCompleted: set,
          error: v != null && v != '123456'
              ? 'Kode salah. Kode contoh: 123456.'
              : null,
        ),
        DemoNote(v == '123456'
            ? 'Nomor HP terverifikasi.'
            : 'Kode dikirim lewat SMS ke 0812 •••• 7890.'),
      ]),
    );
  }),
  GalleryEntry('LdsDateField', 'Isian tanggal', (context) {
    return Hold<DateTime?>(
      initial: DateTime(1990, 8, 17),
      builder: (context, v, set) => LdsDateField(
          label: 'Tanggal lahir',
          value: v,
          onChanged: set,
          today: galleryToday),
    );
  }),
  GalleryEntry('LdsDateRangePicker', 'Rentang tanggal', (context) {
    return Hold<DateTimeRange?>(
      initial: DateTimeRange(
          start: DateTime(2026, 11), end: DateTime(2026, 11, 17)),
      builder: (context, v, set) => LdsDateRangePicker(
          value: v, onChanged: set, today: galleryToday),
    );
  }),
  GalleryEntry('LdsCalendar', 'Kalender', (context) {
    return Hold<DateTime?>(
      initial: DateTime(2026, 11, 20),
      builder: (context, v, set) => DemoColumn(children: [
        LdsCalendar(today: galleryToday, selected: v, onSelected: set),
        DemoNote(v == null
            ? 'Pilih tanggal kunjungan puskesmas.'
            : 'Kunjungan: ${v.day}/${v.month}/${v.year}'),
      ]),
    );
  }),
  GalleryEntry('LdsFileInput', 'Unggah berkas', (context) {
    return Hold<List<String>>(
      initial: const ['foto-ktp.jpg'],
      builder: (context, files, set) => LdsFileInput(
        onChoose: () => set([...files, 'kk-${files.length + 1}.pdf']),
        files: [
          for (final f in files)
            LdsFileRow(
                name: f,
                sizeBytes: 840000,
                onRemove: () => set([...files]..remove(f))),
          const LdsFileRow(name: 'akta-lahir.pdf', error: 'Lebih dari 5 MB'),
        ],
      ),
    );
  }),
  GalleryEntry('LdsTagInput', 'Isian label', (context) {
    return Hold<List<String>>(
      initial: const ['banjir', 'jalan rusak'],
      builder: (context, v, set) =>
          LdsTagInput(label: 'Kata kunci laporan', tags: v, onChanged: set),
    );
  }),
  GalleryEntry('LdsSlider', 'Penggeser', (context) {
    return Hold<double>(
      initial: 5,
      builder: (context, v, set) => LdsSlider(
        value: v,
        min: 1,
        max: 20,
        divisions: 19,
        onChanged: set,
        semanticLabel: 'Radius pencarian puskesmas',
        valueLabel: '${v.round()} km',
      ),
    );
  }),
  GalleryEntry('LdsRangeSlider', 'Penggeser rentang', (context) {
    return Hold<RangeValues>(
      initial: const RangeValues(18, 40),
      builder: (context, v, set) => LdsRangeSlider(
        values: v,
        max: 100,
        onChanged: set,
        semanticLabel: 'Rentang usia penerima vaksin',
        labelBuilder: (x) => '${x.round()} tahun',
      ),
    );
  }),
  GalleryEntry('LdsRating', 'Penilaian', (context) {
    return Hold<int>(
      initial: 3,
      builder: (context, v, set) => DemoColumn(children: [
        LdsRating(value: v, onChanged: set),
        DemoNote('Nilai layanan Samsat: $v dari 5'),
      ]),
    );
  }),
  GalleryEntry('LdsCheckMatrix', 'Matriks centang', (context) {
    return Hold<Set<LdsCheckMatrixCell>>(
      initial: const {(row: 'baru', column: 'email')},
      builder: (context, v, set) => LdsCheckMatrix(
        columns: const [
          LdsCheckMatrixColumn(id: 'email', label: 'Email'),
          LdsCheckMatrixColumn(id: 'sms', label: 'SMS'),
        ],
        groups: const [
          LdsCheckMatrixGroup(label: 'Laporan warga', rows: [
            LdsCheckMatrixRow(id: 'baru', label: 'Laporan baru'),
            LdsCheckMatrixRow(
                id: 'selesai',
                label: 'Laporan selesai',
                description: 'Setelah petugas menutup laporan'),
          ]),
        ],
        value: v,
        onChanged: set,
      ),
    );
  }),
  GalleryEntry('LdsForm', 'Tata letak formulir', (context) {
    return LdsForm(children: [
      const LdsTextField(label: 'Nama usaha', hint: 'Keripik Pisang Bu Siti'),
      const LdsFormRow(children: [
        LdsAmountField(label: 'Kode pos', prefix: null),
        LdsAmountField(label: 'RT', prefix: null),
      ]),
      LdsFormActions(children: [
        LdsButton(
            label: 'Daftarkan UMKM',
            onPressed: () => galleryToast(context, 'Pendaftaran terkirim (contoh)')),
      ]),
    ]);
  }),
  GalleryEntry('LdsInlineEdit', 'Ubah di tempat', (context) {
    return LdsInlineEdit(
      value: 'Posyandu Melati',
      onSave: (v) async {
        await Future<void>.delayed(const Duration(milliseconds: 400));
        return v.contains('!') ? 'Nama tidak boleh memakai tanda seru.' : null;
      },
    );
  }),
  GalleryEntry('LdsHint', 'Petunjuk', (context) {
    return Hold<bool>(
      initial: true,
      builder: (context, open, set) => open
          ? LdsHint(
              icon: 'touch_app',
              message: const TextSpan(children: [
                TextSpan(
                    text: 'Geser baris ke kiri',
                    style: TextStyle(fontWeight: FontWeight.w600)),
                TextSpan(text: ' untuk mengarsipkan laporan.'),
              ]),
              onClose: () => set(false),
            )
          : LdsButton(
              label: 'Tampilkan petunjuk',
              variant: LdsButtonVariant.plain,
              onPressed: () => set(true)),
    );
  }),
];
