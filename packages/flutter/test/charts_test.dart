import 'package:flutter_test/flutter_test.dart';
import 'package:lampung_design_system/src/charts.dart';
import 'package:lampung_design_system/src/theme.dart';
import 'package:lampung_design_system/src/tokens.g.dart';
import 'package:material_ui/material_ui.dart';

import 'helpers.dart';

// Example data: laporan warga per hari dan per kecamatan (contoh).
const _days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

Map<String, Widget> _gallery() => {
  'bar': const LdsBarChart(
    labels: _days,
    series: [
      LdsChartSeries(name: 'Laporan', values: [12, 18, 26, 22, 31, 9, 4]),
    ],
    highlight: 4,
    semanticLabel: 'Laporan warga per hari. Jumat tersibuk dengan 31.',
  ),
  'bar stacked': const LdsBarChart(
    labels: _days,
    stacked: true,
    series: [
      LdsChartSeries(name: 'Aplikasi', values: [8, 10, 14, 12, 20, 5, 2]),
      LdsChartSeries(name: 'Loket', values: [4, 8, 12, 10, 11, 4, 2]),
    ],
    semanticLabel: 'Laporan per kanal.',
  ),
  'line': const LdsLineChart(
    labels: ['M1', 'M2', 'M3', 'M4', 'M5'],
    series: [
      LdsChartSeries(name: 'Metro', values: [62, 68, 65, 71, 74]),
      LdsChartSeries(
        name: 'Rata-rata',
        values: [64, 66, 67, 68, 70],
        dashed: true,
      ),
    ],
    refs: [LdsChartRef(72, 'Target 72')],
    semanticLabel: 'Skor layanan Metro naik di atas rata-rata.',
  ),
  'area': const LdsAreaChart(
    labels: ['1', '2', '3', '4', '5', '6'],
    stacked: true,
    step: true,
    series: [
      LdsChartSeries(name: 'Kedaton', values: [3, 4, 2, null, 6, 5]),
      LdsChartSeries(name: 'Rajabasa', values: [1, 2, 2, 3, 2, 4]),
    ],
    semanticLabel: 'Kunjungan per hari, Bandar Lampung.',
  ),
  'combo': const LdsComboChart(
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    format: LdsNumberFormat(prefix: 'Rp ', compact: true),
    series: [
      LdsChartSeries(name: 'Realisasi', values: [31000, 34000, -2000, 38000]),
      LdsChartSeries(
        name: 'Rencana',
        values: [32000, 33000, 34000, 36000],
        kind: LdsSeriesKind.line,
        dashed: true,
      ),
    ],
    semanticLabel: 'Realisasi anggaran terhadap rencana.',
  ),
  'donut': const LdsDonut(
    segments: [
      LdsChartSegment('Aplikasi', 540),
      LdsChartSegment('Loket', 330),
      LdsChartSegment('Telepon', 240),
      LdsChartSegment('Surel', 100),
      LdsChartSegment('Media sosial', 74),
    ],
    unit: 'laporan',
    semanticLabel: 'Asal 1.284 laporan bulan ini.',
  ),
  'gauge': const LdsGauge(
    value: 78,
    max: 120,
    unit: '78 dari 120 kursi',
    minLabel: '0',
    maxLabel: '120',
    semanticLabel: 'Kursi aula terisi 78 dari 120.',
  ),
  'gauge segments': const LdsGauge.segments(
    segments: [
      LdsChartSegment('Tersedia', 20),
      LdsChartSegment('Menipis', 8),
      LdsChartSegment('Habis', 4),
    ],
    semanticLabel: 'Stok obat puskesmas.',
  ),
  'heatmap': LdsHeatmap(
    values: [for (var i = 0; i < 140; i++) (i * 7 % 5).toDouble()],
    cellLabels: [for (var i = 0; i < 140; i++) 'Hari ${i + 1}'],
    semanticLabel: 'Layanan tersibuk hari Rabu.',
  ),
  'funnel': const LdsFunnel(
    steps: [
      LdsFunnelStep('Membuka halaman izin', 12480),
      LdsFunnelStep('Mengisi formulir', 5240),
      LdsFunnelStep('Mengunggah dokumen', 1310),
      LdsFunnelStep('Izin terbit', 1120),
    ],
    semanticLabel: 'Alur permohonan izin, November.',
  ),
  'ranked': const LdsRankedBars(
    items: [
      LdsRankedItem('Rajabasa', 210, icon: 'location_on'),
      LdsRankedItem('Kedaton', 420, sub: 'Bandar Lampung'),
      LdsRankedItem('Metro Pusat', 130),
    ],
    showRank: true,
    muted: true,
    semanticLabel: 'Laporan per kecamatan.',
  ),
  'sparkline stat': const LdsSparklineStat(
    question: 'Seberapa cepat laporan selesai?',
    subtitle: 'Tingkat penyelesaian, 12 minggu terakhir',
    value: '92%',
    history: [88, 87, 89, 88, 90, 89, 91, 90, 92],
    historyLabel: 'Naik dari 88 ke 92 persen',
    change: '4 poin di atas awal triwulan',
  ),
  'kpi': const LdsKpiCard(
    label: 'Permohonan izin masuk',
    value: '1.284',
    icon: 'inbox',
    delta: LdsTrendDelta(
      '+12%',
      direction: LdsTrendDirection.up,
      meaning: LdsTrendMeaning.good,
    ),
    baseline: 'dari 1.146 di Oktober',
    spark: [3, 5, 4, 6, 7, 6, 8],
    sparkLabel: 'Naik sepanjang bulan',
  ),
  'kpi bars': const LdsKpiCard(
    label: 'Pendaftar per hari',
    value: '86',
    bars: [4, 6, 3, 8, 5],
  ),
  'stat row': const LdsStatRow(
    stats: [
      LdsStat('Laporan selesai', '1.120', sub: 'Dari 1.284 laporan'),
      LdsStat('Rata-rata waktu', '2,4 hari'),
      LdsStat('Sedang diproses', null),
    ],
  ),
  'trend pill': const LdsTrendDelta(
    '−3',
    direction: LdsTrendDirection.down,
    meaning: LdsTrendMeaning.good,
    pill: true,
    note: 'vs Oktober',
  ),
  'target': const LdsTargetBar(
    label: 'Izin terbit',
    valueText: '842 dari 1.000',
    value: 0.842,
    forecast: 0.97,
    footStart: 'Perkiraan 970 pada 31 Des',
    footEnd: '45 hari lagi',
    semanticLabel: 'Izin terbit 842 dari 1.000, target 1.000.',
  ),
  'uptime': LdsUptimeBars(
    statuses: [
      for (var i = 0; i < 90; i++)
        i == 40
            ? LdsUptimeStatus.down
            : i % 17 == 0
            ? LdsUptimeStatus.warn
            : LdsUptimeStatus.ok,
    ],
    labels: [for (var i = 0; i < 90; i++) 'Hari ${i + 1}: tanpa gangguan'],
    summary: 'Semua layanan berjalan normal',
    startLabel: '90 hari lalu',
    endLabel: 'Hari ini',
    semanticLabel: 'Situs layanan, 90 hari terakhir: 99,97% aktif.',
  ),
  'card': const LdsChartCard(
    question: 'Hari apa yang paling sibuk?',
    subtitle: 'Laporan warga per hari, minggu ini',
    figure: LdsChartFigure(
      '122',
      delta: LdsTrendDelta('+8%', direction: LdsTrendDirection.up),
    ),
    footer: 'Diperbarui 08.00 WIB',
    child: LdsChartStates(status: LdsChartStatus.loading, child: SizedBox()),
  ),
  'map': const LdsMap(
    regions: [
      LdsMapRegion(
        name: 'Kedaton',
        points: [Offset(0, 0), Offset(10, 0), Offset(10, 10), Offset(0, 10)],
        value: 3,
        label: 'Kedaton: 128 laporan',
      ),
      LdsMapRegion(
        name: 'Rajabasa',
        points: [Offset(10, 0), Offset(20, 0), Offset(20, 10), Offset(10, 10)],
        value: 1,
      ),
    ],
    pins: [
      LdsMapPin(at: Offset(5, 5), label: 'Posko Kedaton'),
      LdsMapPin(
        at: Offset(15, 8),
        label: 'Terminal Rajabasa',
        kind: LdsMapPinKind.destination,
      ),
      LdsMapPin(at: Offset(2, 8), label: 'Halte', kind: LdsMapPinKind.stop),
      LdsMapPin(at: Offset(18, 2), label: 'Asal', kind: LdsMapPinKind.origin),
    ],
    routes: [
      LdsMapRoute(
        path: [Offset(18, 2), Offset(12, 6), Offset(15, 8)],
        progress: 0.4,
      ),
    ],
    selected: 5,
    showScale: true,
    height: 200,
    semanticLabel: 'Laporan per kecamatan di Bandar Lampung.',
  ),
  'floor': LdsFloorPlan(
    columns: 6,
    semanticLabel: 'Mal Pelayanan Publik, lantai 1',
    zones: const [
      LdsFloorZone(name: 'Ruang tunggu', column: 4, row: 0, columnSpan: 2),
    ],
    units: const [
      LdsFloorUnit(
        id: 'l1',
        name: 'Loket 1',
        meta: 'Kosong',
        column: 0,
        row: 0,
      ),
      LdsFloorUnit(
        id: 'l2',
        name: 'Loket 2',
        meta: 'Melayani',
        column: 1,
        row: 0,
        tone: LdsFloorTone.strong,
        flag: 'flag',
      ),
      LdsFloorUnit(
        id: 'm1',
        name: 'M1',
        meta: 'Dipesan',
        column: 2,
        row: 0,
        round: true,
        tone: LdsFloorTone.accent,
      ),
    ],
    selected: 'l2',
    onSelect: (_) {},
  ),
  'route': const LdsRouteSchematic(
    stops: [
      LdsRouteStop('Rajabasa', sub: 'Berangkat 06.10'),
      LdsRouteStop('Kalianda', sub: '07.40'),
      LdsRouteStop('Bakauheni', sub: 'Tiba 08.45'),
    ],
    position: 1.4,
    vehicleLabel: 'Bus DAMRI 21',
    semanticLabel: 'Bus Rajabasa ke Bakauheni, tiba 08.45.',
  ),
  'route flight narrow': const SizedBox(
    width: 200,
    child: LdsRouteSchematic(
      stops: [
        LdsRouteStop('Radin Inten'),
        LdsRouteStop('Soekarno-Hatta'),
        LdsRouteStop('Ngurah Rai'),
      ],
      position: 0.5,
      mode: LdsRouteMode.flight,
      semanticLabel: 'Penerbangan.',
    ),
  ),
  'number count': const LdsNumberCount(1284, countOnFirstBuild: true),
  'rolling': const LdsRollingNumber(12840),
  'timer': const LdsTimer(seconds: 90, icon: 'schedule'),
};

void main() {
  for (final dark in [false, true]) {
    group(dark ? 'dark' : 'light', () {
      for (final entry in _gallery().entries) {
        testWidgets('${entry.key} renders', (tester) async {
          await tester.pumpWidget(
            wrap(SingleChildScrollView(child: entry.value), dark: dark),
          );
          await tester.pump(const Duration(seconds: 1));
          expect(tester.takeException(), isNull);
        });
      }
    });
  }

  testWidgets('series colors come from tokens', (tester) async {
    late LdsColors c;
    await tester.pumpWidget(
      wrap(
        Builder(
          builder: (context) {
            c = context.lds;
            return const SizedBox();
          },
        ),
        dark: true,
      ),
    );
    expect(LdsSeriesColor.series1.resolve(c), c.series1);
    expect(LdsSeriesColor.at(7), LdsSeriesColor.neutral);
  });

  test('number format reads Indonesian', () {
    expect(const LdsNumberFormat().format(12480), '12.480');
    expect(const LdsNumberFormat(decimals: 1).format(3.5), '3,5');
    expect(const LdsNumberFormat(compact: true).format(1500), '1,5 rb');
    expect(const LdsNumberFormat(prefix: 'Rp ').format(-500), '−Rp 500');
  });

  testWidgets('bar chart has a label and a text alternative', (tester) async {
    final handle = tester.ensureSemantics();
    await tester.pumpWidget(wrap(_gallery()['bar']!));
    await tester.pumpAndSettle();
    final node = tester.getSemantics(
      find.bySemanticsLabel(RegExp('Jumat tersibuk')),
    );
    expect(node.value, contains('Jum: Laporan: 31'));
    handle.dispose();
  });

  testWidgets('tapping a bar reads its period', (tester) async {
    final handle = tester.ensureSemantics();
    await tester.pumpWidget(
      wrap(
        const SizedBox(
          width: 300,
          child: LdsBarChart(
            labels: ['A', 'B'],
            series: [
              LdsChartSeries(name: 'Laporan', values: [5, 9]),
            ],
            semanticLabel: 'Dua periode.',
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    final box = tester.getRect(find.byType(CustomPaint).last);
    await tester.tapAt(Offset(box.right - 20, box.center.dy));
    await tester.pump();
    final node = tester.getSemantics(find.bySemanticsLabel('Dua periode.'));
    expect(node.value, 'B, Laporan: 9');
    handle.dispose();
  });

  testWidgets('legend keeps at least one series on', (tester) async {
    await tester.pumpWidget(wrap(_gallery()['bar stacked']!));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Aplikasi'));
    await tester.pump();
    await tester.tap(find.text('Loket'));
    await tester.pump();
    final legend = tester.widget<LdsChartLegend>(find.byType(LdsChartLegend));
    expect(legend.items.where((i) => i.on), hasLength(1));
  });

  testWidgets('empty status shows the empty state', (tester) async {
    await tester.pumpWidget(
      wrap(
        const LdsChartStates(
          status: LdsChartStatus.empty,
          emptyTitle: 'Belum ada laporan minggu ini',
          child: Text('grafik'),
        ),
      ),
    );
    expect(find.text('Belum ada laporan minggu ini'), findsOneWidget);
    expect(find.text('grafik'), findsNothing);
  });

  testWidgets('error status offers a retry', (tester) async {
    var retried = 0;
    await tester.pumpWidget(
      wrap(
        LdsChartStates(
          status: LdsChartStatus.error,
          onRetry: () => retried++,
          child: const SizedBox(),
        ),
      ),
    );
    await tester.tap(find.text('Coba lagi'));
    expect(retried, 1);
  });

  testWidgets('donut folds a fifth part into Lainnya', (tester) async {
    final handle = tester.ensureSemantics();
    await tester.pumpWidget(wrap(_gallery()['donut']!));
    final node = tester.getSemantics(
      find.bySemanticsLabel(RegExp('Asal 1.284')),
    );
    expect(node.value, contains('Lainnya 74'));
    handle.dispose();
  });

  testWidgets('funnel flags the weakest step', (tester) async {
    await tester.pumpWidget(wrap(_gallery()['funnel']!));
    await tester.pumpAndSettle();
    final drop = tester.widget<Text>(find.text('25% dari langkah sebelumnya'));
    expect(drop.style!.color, LdsColors.light.dangerText);
  });

  testWidgets('uptime reads the day under the pointer', (tester) async {
    await tester.pumpWidget(
      wrap(SizedBox(width: 300, child: _gallery()['uptime'])),
    );
    expect(find.text('Semua layanan berjalan normal'), findsOneWidget);
    final box = tester.getRect(find.byType(CustomPaint).last);
    await tester.tapAt(box.topLeft + const Offset(1, 10));
    await tester.pump();
    expect(find.text('Hari 1: tanpa gangguan'), findsOneWidget);
  });

  testWidgets('map selection shows its words', (tester) async {
    final handle = tester.ensureSemantics();
    await tester.pumpWidget(
      wrap(
        const SizedBox(
          width: 300,
          child: LdsMap(
            height: 200,
            regions: [
              LdsMapRegion(
                name: 'Kedaton',
                points: [
                  Offset(0, 0),
                  Offset(10, 0),
                  Offset(10, 10),
                  Offset(0, 10),
                ],
                value: 3,
                label: 'Kedaton: 128 laporan',
              ),
            ],
            semanticLabel: 'Laporan per kecamatan.',
          ),
        ),
      ),
    );
    final node = tester.getSemantics(
      find.bySemanticsLabel('Laporan per kecamatan.'),
    );
    expect(node.value, 'Kedaton: 128 laporan');
    await tester.tapAt(
      tester.getCenter(find.byType(LdsMap)) - const Offset(0, 10),
    );
    await tester.pump();
    expect(find.text('Kedaton: 128 laporan'), findsOneWidget);
    handle.dispose();
  });

  testWidgets('floor plan unit reports its id', (tester) async {
    String? picked;
    await tester.pumpWidget(
      wrap(
        LdsFloorPlan(
          columns: 2,
          semanticLabel: 'Ruang rapat',
          units: const [
            LdsFloorUnit(
              id: 'a',
              name: 'R1',
              meta: 'Kosong',
              column: 0,
              row: 0,
            ),
          ],
          onSelect: (id) => picked = id,
        ),
      ),
    );
    await tester.tap(find.text('R1'));
    await tester.pumpAndSettle();
    expect(picked, 'a');
    expect(find.bySemanticsLabel('R1, Kosong'), findsOneWidget);
  });

  testWidgets('number count settles on its value', (tester) async {
    await tester.pumpWidget(wrap(const LdsNumberCount(10)));
    await tester.pumpWidget(wrap(const LdsNumberCount(1284)));
    await tester.pump(const Duration(milliseconds: 100));
    expect(find.text('1.284'), findsNothing);
    await tester.pumpAndSettle();
    expect(find.text('1.284'), findsOneWidget);
  });

  testWidgets('number count jumps with reduced motion', (tester) async {
    await tester.pumpWidget(wrap(const LdsNumberCount(10), reduceMotion: true));
    await tester.pumpWidget(
      wrap(const LdsNumberCount(1284), reduceMotion: true),
    );
    await tester.pump();
    expect(find.text('1.284'), findsOneWidget);
  });

  testWidgets('rolling number announces the value once', (tester) async {
    await tester.pumpWidget(wrap(const LdsRollingNumber(12840)));
    await tester.pumpAndSettle();
    expect(find.bySemanticsLabel('12.840'), findsOneWidget);
    await tester.pumpWidget(wrap(const LdsRollingNumber(12841)));
    await tester.pumpAndSettle();
    expect(find.bySemanticsLabel('12.841'), findsOneWidget);
  });

  testWidgets('timer ticks, turns low, and fires once at zero', (tester) async {
    var up = 0;
    await tester.pumpWidget(
      wrap(
        LdsTimer(
          seconds: 3,
          low: 2,
          onTimeUp: () => up++,
          semanticLabel: 'Sisa waktu sesi',
        ),
      ),
    );
    expect(find.text('0:03'), findsOneWidget);
    await tester.pump(const Duration(seconds: 1));
    expect(find.text('0:02'), findsOneWidget);
    expect(find.bySemanticsLabel(RegExp('hampir habis')), findsOneWidget);
    await tester.pump(const Duration(seconds: 3));
    expect(find.text('0:00'), findsOneWidget);
    expect(up, 1);
    expect(find.bySemanticsLabel(RegExp('waktu habis')), findsOneWidget);
  });

  testWidgets('elapsed timer counts up past its target', (tester) async {
    await tester.pumpWidget(
      wrap(const LdsTimer.elapsed(seconds: 719, target: 720)),
    );
    await tester.pump(const Duration(seconds: 2));
    expect(find.text('12:01'), findsOneWidget);
    expect(find.bySemanticsLabel(RegExp('waktu habis')), findsOneWidget);
  });

  testWidgets('trend delta speaks its direction', (tester) async {
    await tester.pumpWidget(
      wrap(
        const LdsTrendDelta(
          '+12%',
          direction: LdsTrendDirection.up,
          semanticLabel: 'naik dari bulan lalu',
        ),
      ),
    );
    expect(find.bySemanticsLabel('+12% naik dari bulan lalu'), findsOneWidget);
  });
}
