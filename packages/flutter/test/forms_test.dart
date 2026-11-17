import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lampung_design_system/src/forms.dart';
import 'package:lampung_design_system/src/theme.dart';

import 'helpers.dart';

final _today = DateTime(2026, 11, 17);

/// Renders [build] in light and dark and expects no exceptions.
void renders(String name, Widget Function() build) {
  for (final dark in [false, true]) {
    testWidgets('$name renders ${dark ? 'dark' : 'light'}', (tester) async {
      await tester
          .pumpWidget(wrap(SingleChildScrollView(child: build()), dark: dark));
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
      final ctx = tester.element(find.byType(Scaffold));
      expect(
          Theme.of(ctx).brightness, dark ? Brightness.dark : Brightness.light);
      expect(ctx.lds, isNotNull);
    });
  }
}

/// A stateful harness: [build] gets the current value and a setter.
class _Host<T> extends StatefulWidget {
  const _Host({required this.initial, required this.build});
  final T initial;
  final Widget Function(T value, ValueChanged<T> set) build;
  @override
  State<_Host<T>> createState() => _HostState<T>();
}

class _HostState<T> extends State<_Host<T>> {
  late T value = widget.initial;
  @override
  Widget build(BuildContext context) =>
      widget.build(value, (v) => setState(() => value = v));
}

const _options = [
  LdsSelectOption(value: 'kd', label: 'Kedaton'),
  LdsSelectOption(value: 'tk', label: 'Tanjung Karang Pusat'),
  LdsSelectOption(value: 'wh', label: 'Way Halim'),
];

void main() {
  // Rendering in both appearances.
  renders(
      'LdsCheckbox',
      () => Column(children: [
            LdsCheckbox(
                value: true,
                label: 'Saya menyetujui syarat layanan',
                onChanged: (_) {}),
            LdsCheckbox(value: null, label: 'Sebagian', onChanged: (_) {}),
            const LdsCheckbox(value: false, label: 'Nonaktif', onChanged: null),
          ]));
  renders(
      'LdsRadioGroup',
      () => LdsRadioGroup<String>(
            label: 'Cara pengambilan',
            value: 'kantor',
            onChanged: (_) {},
            options: const [
              LdsRadioOption(value: 'kantor', label: 'Ambil di kantor'),
              LdsRadioOption(value: 'pos', label: 'Dikirim lewat pos'),
            ],
          ));
  renders(
      'LdsRadioCard',
      () => LdsRadioCard<int>(
            value: 1,
            groupValue: 1,
            onChanged: (_) {},
            title: 'Kirim ke rumah',
            description: '2 sampai 3 hari kerja',
            trailing: 'Rp 15.000',
          ));
  renders(
      'LdsSwitch',
      () => LdsSwitch(
          value: true, label: 'Notifikasi status laporan', onChanged: (_) {}));
  renders(
      'LdsToggleGroup',
      () => LdsToggleGroup<String>(
            items: const [
              LdsToggleItem(
                  value: 'b', icon: 'format_bold', semanticLabel: 'Tebal'),
              LdsToggleItem(value: 'l', label: 'Tautan'),
            ],
            selected: const {'b'},
            onChanged: (_) {},
          ));
  renders(
      'LdsSelect',
      () => LdsSelect<String>(
            label: 'Kecamatan',
            options: _options,
            value: 'kd',
            onChanged: (_) {},
          ));
  renders(
      'LdsCombobox',
      () => LdsCombobox<String>(
            label: 'Kelurahan',
            options: _options,
            value: null,
            onChanged: (_) {},
          ));
  renders(
      'LdsTextarea',
      () => const LdsTextarea(
          label: 'Uraian laporan', maxLength: 280, help: 'Jelaskan singkat.'));
  renders('LdsPasswordField',
      () => const LdsPasswordField(showStrength: true, newPassword: true));
  renders('LdsSearchField',
      () => const LdsSearchField(hint: 'Cari layanan', showCancel: true));
  renders(
      'LdsAmountField',
      () => const LdsAmountField(
          label: 'Biaya retribusi', value: 350000, help: 'Tanpa titik.'));
  renders(
      'LdsNumberStepper',
      () => LdsNumberStepper(
          value: 2,
          onChanged: (_) {},
          semanticLabel: 'Jumlah anggota keluarga'));
  renders('LdsOtpField',
      () => const LdsOtpField(error: 'Kode salah. Periksa SMS Anda.'));
  renders(
      'LdsDateField',
      () => LdsDateField(
          label: 'Tanggal lahir', value: DateTime(1990, 8, 17), today: _today));
  renders(
      'LdsDateRangePicker',
      () => LdsDateRangePicker(
            value: DateTimeRange(
                start: DateTime(2026, 11), end: DateTime(2026, 11, 17)),
            onChanged: (_) {},
            today: _today,
          ));
  renders(
      'LdsCalendar',
      () => LdsCalendar(
            today: _today,
            range: DateTimeRange(
                start: DateTime(2026, 11, 3), end: DateTime(2026, 11, 9)),
            onSelected: (_) {},
          ));
  renders(
      'LdsFileInput',
      () => LdsFileInput(onChoose: () {}, files: [
            LdsFileRow(
                name: 'foto-ktp.jpg',
                sizeBytes: 840000,
                progress: 0.4,
                onRemove: () {}),
            const LdsFileRow(name: 'surat.pdf', error: 'Lebih dari 5 MB'),
          ]));
  renders(
      'LdsTagInput',
      () => LdsTagInput(
          label: 'Kata kunci',
          tags: const ['banjir', 'jalan rusak'],
          onChanged: (_) {}));
  renders(
      'LdsSlider',
      () => LdsSlider(
            value: 5,
            min: 1,
            max: 20,
            onChanged: (_) {},
            semanticLabel: 'Radius pencarian',
            valueLabel: '5 km',
          ));
  renders(
      'LdsRangeSlider',
      () => LdsRangeSlider(
            values: const RangeValues(18, 40),
            max: 100,
            onChanged: (_) {},
            semanticLabel: 'Rentang usia',
            labelBuilder: (v) => '${v.round()} tahun',
          ));
  renders('LdsRating', () => LdsRating(value: 3, onChanged: (_) {}));
  renders(
      'LdsCheckMatrix',
      () => LdsCheckMatrix(
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
            value: const {(row: 'baru', column: 'email')},
            onChanged: (_) {},
          ));
  renders(
      'LdsForm',
      () => const LdsForm(children: [
            LdsTextarea(label: 'Alamat'),
            LdsFormRow(children: [
              LdsAmountField(label: 'Kode pos', prefix: null),
              LdsAmountField(label: 'RT', prefix: null),
            ]),
            LdsFormActions(children: [Text('Kirim laporan')]),
          ]));
  renders(
      'LdsInlineEdit',
      () => LdsInlineEdit(
          value: 'Laporan jalan rusak', onSave: (_) async => null));
  renders(
      'LdsHint',
      () => LdsHint(
            icon: 'touch_app',
            message: const TextSpan(children: [
              TextSpan(
                  text: 'Geser baris ke kiri',
                  style: TextStyle(fontWeight: FontWeight.w600)),
              TextSpan(text: ' untuk mengarsipkan laporan.'),
            ]),
            onClose: () {},
          ));

  // Behavior.
  testWidgets('LdsCheckbox toggles on tap', (tester) async {
    await tester.pumpWidget(wrap(_Host<bool>(
      initial: false,
      build: (v, set) => LdsCheckbox(
          value: v, label: 'Kirim salinan ke email', onChanged: set),
    )));
    await tester.tap(find.text('Kirim salinan ke email'));
    await tester.pumpAndSettle();
    expect(tester.widget<LdsCheckbox>(find.byType(LdsCheckbox)).value, isTrue);
  });

  testWidgets('LdsRadioGroup moves with arrow keys', (tester) async {
    await tester.pumpWidget(wrap(_Host<String>(
      initial: 'a',
      build: (v, set) => LdsRadioGroup<String>(
        value: v,
        onChanged: set,
        options: const [
          LdsRadioOption(value: 'a', label: 'Ambil di kantor'),
          LdsRadioOption(value: 'b', label: 'Dikirim lewat pos'),
        ],
      ),
    )));
    await tester.tap(find.text('Ambil di kantor'));
    await tester.pump();
    await tester.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await tester.pumpAndSettle();
    final group = tester
        .widget<LdsRadioGroup<String>>(find.byType(LdsRadioGroup<String>));
    expect(group.value, 'b');
  });

  testWidgets('LdsRadioCard picks its value', (tester) async {
    int? picked;
    await tester.pumpWidget(wrap(LdsRadioCard<int>(
      value: 2,
      groupValue: 1,
      onChanged: (v) => picked = v,
      title: 'Ambil di kantor kelurahan',
    )));
    await tester.tap(find.text('Ambil di kantor kelurahan'));
    expect(picked, 2);
  });

  testWidgets('LdsSwitch flips on tap', (tester) async {
    bool? next;
    await tester.pumpWidget(wrap(LdsSwitch(
        value: false, label: 'Mode hemat data', onChanged: (v) => next = v)));
    await tester.tap(find.text('Mode hemat data'));
    expect(next, isTrue);
  });

  testWidgets('LdsToggleGroup exclusive picks one', (tester) async {
    Set<String>? next;
    await tester.pumpWidget(wrap(LdsToggleGroup<String>(
      exclusive: true,
      items: const [
        LdsToggleItem(value: 'kiri', label: 'Kiri'),
        LdsToggleItem(value: 'tengah', label: 'Tengah'),
      ],
      selected: const {'kiri'},
      onChanged: (v) => next = v,
    )));
    await tester.tap(find.text('Tengah'));
    expect(next, {'tengah'});
  });

  testWidgets('LdsSelect opens and picks an option', (tester) async {
    await tester.pumpWidget(wrap(_Host<String?>(
      initial: null,
      build: (v, set) => LdsSelect<String>(
        label: 'Kecamatan',
        options: _options,
        value: v,
        onChanged: set,
      ),
    )));
    await tester.tap(find.text('Pilih salah satu'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Way Halim'));
    await tester.pumpAndSettle();
    expect(find.text('Way Halim'), findsOneWidget);
    expect(find.text('Kedaton'), findsNothing);
  });

  testWidgets('LdsCombobox filters and picks with Enter', (tester) async {
    String? picked;
    await tester.pumpWidget(wrap(LdsCombobox<String>(
      label: 'Kelurahan',
      options: _options,
      value: null,
      onChanged: (v) => picked = v,
    )));
    await tester.enterText(find.byType(TextField), 'way');
    await tester.pumpAndSettle();
    expect(find.text('Kedaton'), findsNothing);
    await tester.sendKeyEvent(LogicalKeyboardKey.enter);
    await tester.pumpAndSettle();
    expect(picked, 'wh');
  });

  testWidgets('LdsTextarea counts characters', (tester) async {
    await tester
        .pumpWidget(wrap(const LdsTextarea(label: 'Uraian', maxLength: 280)));
    await tester.enterText(find.byType(TextField), 'Jalan berlubang');
    await tester.pump();
    expect(find.text('15 / 280'), findsOneWidget);
  });

  testWidgets('LdsPasswordField reveals the text', (tester) async {
    await tester.pumpWidget(wrap(const LdsPasswordField()));
    expect(
        tester.widget<TextField>(find.byType(TextField)).obscureText, isTrue);
    await tester.tap(find.bySemanticsLabel('Tampilkan kata sandi'));
    await tester.pump();
    expect(
        tester.widget<TextField>(find.byType(TextField)).obscureText, isFalse);
    expect(LdsPasswordField.strengthOf('abc'), LdsPasswordStrength.weak);
    expect(LdsPasswordField.strengthOf('Lampung#2026xyz'),
        LdsPasswordStrength.strong);
  });

  testWidgets('LdsSearchField clears with the clear button', (tester) async {
    final text = TextEditingController();
    addTearDown(text.dispose);
    await tester.pumpWidget(wrap(LdsSearchField(controller: text)));
    await tester.enterText(find.byType(TextField), 'akta kelahiran');
    await tester.pump();
    await tester.tap(find.bySemanticsLabel('Hapus pencarian'));
    await tester.pump();
    expect(text.text, isEmpty);
  });

  testWidgets('LdsAmountField groups thousands', (tester) async {
    int? value;
    await tester.pumpWidget(
        wrap(LdsAmountField(label: 'Nominal', onChanged: (v) => value = v)));
    await tester.enterText(find.byType(TextField), '2500000');
    await tester.pump();
    expect(find.text('2.500.000'), findsOneWidget);
    expect(value, 2500000);
  });

  testWidgets('LdsNumberStepper steps and clamps', (tester) async {
    await tester.pumpWidget(wrap(_Host<int>(
      initial: 1,
      build: (v, set) => LdsNumberStepper(
          value: v, max: 2, onChanged: set, semanticLabel: 'Jumlah salinan'),
    )));
    await tester.tap(find.bySemanticsLabel('Tambah'));
    await tester.pumpAndSettle();
    await tester.tap(find.bySemanticsLabel('Tambah'));
    await tester.pumpAndSettle();
    expect(find.text('2'), findsOneWidget);
  });

  testWidgets('LdsOtpField completes after six digits', (tester) async {
    String? code;
    await tester.pumpWidget(wrap(LdsOtpField(onCompleted: (v) => code = v)));
    await tester.enterText(find.byType(TextField), '482913');
    await tester.pumpAndSettle();
    expect(code, '482913');
    expect(find.text('4'), findsOneWidget);
  });

  testWidgets('LdsDateField picks from the calendar', (tester) async {
    DateTime? picked;
    await tester.pumpWidget(wrap(LdsDateField(
      label: 'Tanggal kejadian',
      today: _today,
      value: DateTime(2026, 11, 10),
      onChanged: (v) => picked = v,
    )));
    await tester.tap(find.bySemanticsLabel('Pilih dari kalender'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('20'));
    await tester.pumpAndSettle();
    expect(picked, DateTime(2026, 11, 20));
    expect(find.text('20/11/2026'), findsOneWidget);
  });

  testWidgets('LdsDateRangePicker applies a preset', (tester) async {
    DateTimeRange? range;
    await tester.pumpWidget(wrap(LdsDateRangePicker(
      value: null,
      today: _today,
      onChanged: (v) => range = v,
    )));
    await tester.tap(find.text('Pilih rentang tanggal'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('7 hari terakhir'));
    await tester.pumpAndSettle();
    expect(range?.start, DateTime(2026, 11, 11));
    expect(range?.end, _today);
  });

  testWidgets('LdsCalendar reports the tapped day and changes month',
      (tester) async {
    DateTime? picked;
    await tester.pumpWidget(
        wrap(LdsCalendar(today: _today, onSelected: (d) => picked = d)));
    expect(find.text('November 2026'), findsOneWidget);
    await tester.tap(find.text('25'));
    expect(picked, DateTime(2026, 11, 25));
    await tester.tap(find.bySemanticsLabel('Bulan berikutnya'));
    await tester.pumpAndSettle();
    expect(find.text('Desember 2026'), findsOneWidget);
  });

  testWidgets('LdsFileInput calls choose and remove', (tester) async {
    var chose = false, removed = false;
    await tester.pumpWidget(wrap(LdsFileInput(
      onChoose: () => chose = true,
      files: [
        LdsFileRow(
            name: 'kk.pdf', sizeBytes: 2516582, onRemove: () => removed = true),
      ],
    )));
    expect(find.text('2,4 MB'), findsOneWidget);
    await tester.tap(find.text('Pilih berkas'));
    await tester.tap(find.bySemanticsLabel('Hapus berkas kk.pdf'));
    expect(chose, isTrue);
    expect(removed, isTrue);
  });

  testWidgets('LdsTagInput adds on comma and removes on Backspace',
      (tester) async {
    await tester.pumpWidget(wrap(_Host<List<String>>(
      initial: const ['banjir'],
      build: (v, set) =>
          LdsTagInput(label: 'Kata kunci', tags: v, onChanged: set),
    )));
    await tester.enterText(find.byType(TextField), 'longsor,');
    await tester.pumpAndSettle();
    expect(find.text('longsor'), findsOneWidget);
    await tester.sendKeyEvent(LogicalKeyboardKey.backspace);
    await tester.pumpAndSettle();
    expect(find.text('longsor'), findsNothing);
    expect(find.text('banjir'), findsOneWidget);
  });

  testWidgets('LdsSlider moves with a drag', (tester) async {
    double? v;
    await tester.pumpWidget(wrap(LdsSlider(
        value: 0.2, onChanged: (x) => v = x, semanticLabel: 'Kecerahan')));
    await tester.drag(find.byType(Slider), const Offset(200, 0));
    expect(v, isNotNull);
    expect(v! > 0.2, isTrue);
  });

  testWidgets('LdsRangeSlider keeps thumbs ordered', (tester) async {
    RangeValues? v;
    await tester.pumpWidget(wrap(LdsRangeSlider(
      values: const RangeValues(0.2, 0.8),
      onChanged: (x) => v = x,
      semanticLabel: 'Rentang biaya',
    )));
    await tester.tapAt(
        tester.getCenter(find.byType(RangeSlider)) + const Offset(-100, 0));
    await tester.pump();
    expect(v, isNotNull);
    expect(v!.start <= v!.end, isTrue);
  });

  testWidgets('LdsRating sets and steps with arrows', (tester) async {
    await tester.pumpWidget(wrap(_Host<int>(
      initial: 0,
      build: (v, set) => LdsRating(value: v, onChanged: set),
    )));
    await tester.tap(find.bySemanticsLabel('3 bintang'));
    await tester.pump();
    await tester.sendKeyEvent(LogicalKeyboardKey.arrowRight);
    await tester.pumpAndSettle();
    expect(tester.widget<LdsRating>(find.byType(LdsRating)).value, 4);
  });

  testWidgets('LdsCheckMatrix group box turns a column on', (tester) async {
    Set<LdsCheckMatrixCell>? next;
    await tester.pumpWidget(wrap(LdsCheckMatrix(
      columns: const [LdsCheckMatrixColumn(id: 'sms', label: 'SMS')],
      groups: const [
        LdsCheckMatrixGroup(label: 'Pengaduan', rows: [
          LdsCheckMatrixRow(id: 'a', label: 'Baru'),
          LdsCheckMatrixRow(id: 'b', label: 'Selesai'),
        ]),
      ],
      value: const {(row: 'a', column: 'sms')},
      onChanged: (v) => next = v,
    )));
    await tester.tap(find.bySemanticsLabel('SMS: semua Pengaduan'));
    expect(next, {(row: 'a', column: 'sms'), (row: 'b', column: 'sms')});
  });

  testWidgets('LdsFormRow stacks on narrow widths', (tester) async {
    await tester.binding.setSurfaceSize(const Size(360, 600));
    addTearDown(() => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(wrap(const LdsFormRow(children: [
      SizedBox(key: Key('a'), height: 10),
      SizedBox(key: Key('b'), height: 10),
    ])));
    final a = tester.getTopLeft(find.byKey(const Key('a')));
    final b = tester.getTopLeft(find.byKey(const Key('b')));
    expect(b.dy > a.dy, isTrue);
  });

  testWidgets('LdsInlineEdit saves and restores on refusal', (tester) async {
    final saved = <String>[];
    await tester.pumpWidget(wrap(LdsInlineEdit(
      value: 'Posyandu Melati',
      onSave: (v) async {
        saved.add(v);
        return v.contains('!') ? 'Nama tidak boleh memakai tanda seru.' : null;
      },
    )));
    await tester.tap(find.text('Posyandu Melati'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), 'Posyandu Mawar');
    await tester.testTextInput.receiveAction(TextInputAction.done);
    await tester.pumpAndSettle();
    expect(saved, ['Posyandu Mawar']);
    expect(find.text('Posyandu Mawar'), findsOneWidget);

    await tester.tap(find.text('Posyandu Mawar'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), 'Mawar!');
    await tester.testTextInput.receiveAction(TextInputAction.done);
    await tester.pumpAndSettle();
    expect(find.text('Posyandu Mawar'), findsOneWidget);
    expect(find.text('Nama tidak boleh memakai tanda seru.'), findsOneWidget);
  });

  testWidgets('LdsHint closes and reports it', (tester) async {
    var closed = false;
    await tester.pumpWidget(wrap(LdsHint(
      message: const TextSpan(text: 'Tekan / untuk mencari layanan.'),
      onClose: () => closed = true,
    )));
    await tester.tap(find.bySemanticsLabel('Sembunyikan petunjuk'));
    await tester.pumpAndSettle();
    expect(closed, isTrue);
  });
}
