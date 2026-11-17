import 'package:flutter/material.dart';
import 'package:lampung_design_system/lampung_design_system.dart';

import 'common.dart';

// Example data: citizen reports in Bandar Lampung (all values are examples).
const _days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const _months = ['Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov'];

const _perDay = LdsChartSeries(
    name: 'Laporan', values: [12, 18, 26, 22, 31, 9, 4]);

// Rough schematic blocks of seven kecamatan, not a real map.
const _regions = [
  LdsMapRegion(
      name: 'Rajabasa',
      points: [Offset(0, 0), Offset(10, 0), Offset(11, 8), Offset(0, 9)],
      value: 2,
      label: 'Rajabasa: 64 laporan'),
  LdsMapRegion(
      name: 'Kedaton',
      points: [Offset(10, 0), Offset(20, 0), Offset(19, 9), Offset(11, 8)],
      value: 4,
      label: 'Kedaton: 128 laporan'),
  LdsMapRegion(
      name: 'Way Halim',
      points: [Offset(20, 0), Offset(30, 1), Offset(29, 10), Offset(19, 9)],
      value: 3,
      label: 'Way Halim: 97 laporan'),
  LdsMapRegion(
      name: 'Kemiling',
      points: [Offset(0, 9), Offset(11, 8), Offset(10, 17), Offset(0, 16)],
      value: 1,
      label: 'Kemiling: 31 laporan'),
  LdsMapRegion(
      name: 'Tanjung Karang Pusat',
      points: [Offset(11, 8), Offset(19, 9), Offset(20, 17), Offset(10, 17)],
      value: 3,
      label: 'Tanjung Karang Pusat: 88 laporan'),
  LdsMapRegion(
      name: 'Sukarame',
      points: [Offset(19, 9), Offset(29, 10), Offset(30, 18), Offset(20, 17)],
      value: 2,
      label: 'Sukarame: 52 laporan'),
  LdsMapRegion(
      name: 'Teluk Betung Selatan',
      points: [Offset(5, 16.5), Offset(25, 17.5), Offset(22, 22), Offset(8, 22)],
      value: 4,
      label: 'Teluk Betung Selatan: 141 laporan'),
];

final List<GalleryEntry> chartsEntries = [
  GalleryEntry('LdsBarChart', 'Grafik batang', (context) {
    return const DemoColumn(gap: 24, children: [
      LdsBarChart(
        labels: _days,
        series: [_perDay],
        highlight: 4,
        semanticLabel: 'Laporan warga per hari. Jumat tersibuk dengan 31.',
      ),
      LdsBarChart(
        labels: _days,
        stacked: true,
        series: [
          LdsChartSeries(name: 'Aplikasi', values: [8, 10, 14, 12, 20, 5, 2]),
          LdsChartSeries(name: 'Loket', values: [4, 8, 12, 10, 11, 4, 2]),
        ],
        semanticLabel: 'Laporan per kanal, per hari.',
      ),
    ]);
  }),
  GalleryEntry('LdsLineChart', 'Grafik garis', (context) {
    return const LdsLineChart(
      labels: _months,
      series: [
        LdsChartSeries(
            name: 'Puskesmas Kedaton', values: [62, 68, 65, 71, 74, 77]),
        LdsChartSeries(
            name: 'Rata-rata kota',
            values: [64, 66, 67, 68, 70, 71],
            dashed: true),
      ],
      refs: [LdsChartRef(72, 'Target 72')],
      yMin: 50,
      yMax: 85,
      semanticLabel: 'Indeks kepuasan Puskesmas Kedaton naik di atas rata-rata.',
    );
  }),
  GalleryEntry('LdsAreaChart', 'Grafik area', (context) {
    return const LdsAreaChart(
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      stacked: true,
      series: [
        LdsChartSeries(name: 'Kedaton', values: [3, 4, 2, 5, 6, 5, 7]),
        LdsChartSeries(name: 'Rajabasa', values: [1, 2, 2, 3, 2, 4, 3]),
      ],
      semanticLabel: 'Kunjungan posyandu per hari, dua kecamatan.',
    );
  }),
  GalleryEntry('LdsComboChart', 'Grafik gabungan', (context) {
    return const LdsComboChart(
      labels: ['Jul', 'Agu', 'Sep', 'Okt'],
      format: LdsNumberFormat(prefix: 'Rp ', compact: true),
      series: [
        LdsChartSeries(
            name: 'Realisasi PKB', values: [31000000, 34000000, 29000000, 38000000]),
        LdsChartSeries(
            name: 'Rencana',
            values: [32000000, 33000000, 34000000, 36000000],
            kind: LdsSeriesKind.line,
            dashed: true),
      ],
      semanticLabel: 'Realisasi pajak kendaraan Samsat terhadap rencana.',
    );
  }),
  GalleryEntry('LdsCartesianChart', 'Grafik kartesius', (context) {
    return const LdsCartesianChart(
      labels: _months,
      kind: LdsSeriesKind.bar,
      series: [
        LdsChartSeries(name: 'KTP-el tercetak', values: [820, 910, 760, 1040, 990, 1120]),
      ],
      semanticLabel: 'KTP-el tercetak per bulan di Disdukcapil Kota Contoh.',
    );
  }),
  GalleryEntry('LdsDonut', 'Donat', (context) {
    return const LdsDonut(
      segments: [
        LdsChartSegment('Aplikasi', 540),
        LdsChartSegment('Loket', 330),
        LdsChartSegment('Telepon', 240),
        LdsChartSegment('Surel', 100),
        LdsChartSegment('Media sosial', 74),
      ],
      unit: 'laporan',
      semanticLabel: 'Asal 1.284 laporan bulan ini.',
    );
  }),
  GalleryEntry('LdsGauge', 'Pengukur', (context) {
    return const DemoColumn(gap: 24, children: [
      LdsGauge(
        value: 78,
        max: 120,
        unit: '78 dari 120 kursi',
        minLabel: '0',
        maxLabel: '120',
        semanticLabel: 'Ruang tunggu Mal Pelayanan Publik terisi 78 dari 120.',
      ),
      LdsGauge.segments(
        segments: [
          LdsChartSegment('Tersedia', 20),
          LdsChartSegment('Menipis', 8),
          LdsChartSegment('Habis', 4),
        ],
        semanticLabel: 'Stok obat Puskesmas Way Halim.',
      ),
    ]);
  }),
  GalleryEntry('LdsHeatmap', 'Peta panas', (context) {
    return LdsHeatmap(
      values: [for (var i = 0; i < 140; i++) ((i * 7 + i ~/ 7) % 5).toDouble()],
      cellLabels: [for (var i = 0; i < 140; i++) 'Hari ${i + 1}'],
      semanticLabel: 'Antrean Disdukcapil tersibuk hari Senin.',
    );
  }),
  GalleryEntry('LdsFunnel', 'Corong', (context) {
    return const LdsFunnel(
      steps: [
        LdsFunnelStep('Membuka halaman izin UMKM', 12480),
        LdsFunnelStep('Mengisi formulir', 5240),
        LdsFunnelStep('Mengunggah dokumen', 1310),
        LdsFunnelStep('Izin terbit', 1120),
      ],
      semanticLabel: 'Alur permohonan izin usaha mikro, November.',
    );
  }),
  GalleryEntry('LdsRankedBars', 'Batang peringkat', (context) {
    return const LdsRankedBars(
      items: [
        LdsRankedItem('Teluk Betung Selatan', 141, icon: 'location_on'),
        LdsRankedItem('Kedaton', 128, sub: 'Jalan dan drainase'),
        LdsRankedItem('Way Halim', 97),
        LdsRankedItem('Tanjung Karang Pusat', 88),
        LdsRankedItem('Rajabasa', 64),
      ],
      showRank: true,
      semanticLabel: 'Laporan per kecamatan, November.',
    );
  }),
  GalleryEntry('LdsSparkline', 'Garis mini', (context) {
    return const LdsSparkline(
      values: [12, 15, 11, 18, 22, 19, 26],
      semanticLabel: 'Laporan banjir ke BPBD naik minggu ini.',
      color: LdsSeriesColor.series2,
    );
  }),
  GalleryEntry('LdsSparklineStat', 'Statistik garis mini', (context) {
    return const LdsSparklineStat(
      question: 'Seberapa cepat laporan selesai?',
      subtitle: 'Tingkat penyelesaian, 12 minggu terakhir',
      value: '92%',
      history: [88, 87, 89, 88, 90, 89, 91, 90, 92],
      historyLabel: 'Naik dari 88 ke 92 persen',
      change: '4 poin di atas awal triwulan',
    );
  }),
  GalleryEntry('LdsKpiCard', 'Kartu KPI', (context) {
    return const DemoColumn(children: [
      LdsKpiCard(
        label: 'Permohonan izin masuk',
        value: '1.284',
        icon: 'inbox',
        delta: LdsTrendDelta('+12%',
            direction: LdsTrendDirection.up, meaning: LdsTrendMeaning.good),
        baseline: 'dari 1.146 di Oktober',
        spark: [3, 5, 4, 6, 7, 6, 8],
        sparkLabel: 'Naik sepanjang bulan',
      ),
      LdsKpiCard(
        label: 'Pasien per hari, Puskesmas Kedaton',
        value: '86',
        bars: [64, 72, 58, 91, 86],
      ),
    ]);
  }),
  GalleryEntry('LdsStatRow', 'Baris statistik', (context) {
    return const LdsStatRow(stats: [
      LdsStat('Laporan selesai', '1.120', sub: 'Dari 1.284 laporan'),
      LdsStat('Rata-rata waktu', '2,4 hari'),
      LdsStat('Sedang diproses', null),
    ]);
  }),
  GalleryEntry('LdsTrendDelta', 'Perubahan tren', (context) {
    return const Wrap(spacing: 12, runSpacing: 12, children: [
      LdsTrendDelta('+12%',
          direction: LdsTrendDirection.up, meaning: LdsTrendMeaning.good),
      LdsTrendDelta('−3',
          direction: LdsTrendDirection.down,
          meaning: LdsTrendMeaning.good,
          pill: true,
          note: 'vs Oktober'),
      LdsTrendDelta('+18%',
          direction: LdsTrendDirection.up,
          meaning: LdsTrendMeaning.bad,
          pill: true,
          note: 'antrean'),
    ]);
  }),
  GalleryEntry('LdsTargetBar', 'Bilah target', (context) {
    return const LdsTargetBar(
      label: 'Vaksinasi campak anak',
      valueText: '842 dari 1.000',
      value: 0.842,
      forecast: 0.97,
      footStart: 'Perkiraan 970 pada 31 Des',
      footEnd: '45 hari lagi',
      semanticLabel: 'Vaksinasi 842 dari 1.000, target 1.000.',
    );
  }),
  GalleryEntry('LdsUptimeBars', 'Bilah ketersediaan', (context) {
    return LdsUptimeBars(
      statuses: [
        for (var i = 0; i < 90; i++)
          i == 40
              ? LdsUptimeStatus.down
              : i % 17 == 0
                  ? LdsUptimeStatus.warn
                  : LdsUptimeStatus.ok
      ],
      labels: [for (var i = 0; i < 90; i++) 'Hari ${i + 1}'],
      summary: 'Layanan e-Samsat berjalan normal',
      startLabel: '90 hari lalu',
      endLabel: 'Hari ini',
      semanticLabel: 'e-Samsat, 90 hari terakhir: 99,97% aktif.',
    );
  }),
  GalleryEntry('LdsChartCard', 'Kartu grafik', (context) {
    return const LdsChartCard(
      question: 'Hari apa yang paling sibuk?',
      subtitle: 'Laporan warga per hari, minggu ini',
      figure: LdsChartFigure('122',
          delta: LdsTrendDelta('+8%', direction: LdsTrendDirection.up)),
      footer: 'Diperbarui 08.00 WIB',
      child: LdsBarChart(
        labels: _days,
        series: [_perDay],
        highlight: 4,
        height: 160,
        semanticLabel: 'Jumat tersibuk dengan 31 laporan.',
      ),
    );
  }),
  GalleryEntry('LdsChartStates', 'Keadaan grafik', (context) {
    return Hold<LdsChartStatus>(
      initial: LdsChartStatus.loading,
      builder: (context, s, set) => DemoColumn(children: [
        LdsSegmented<LdsChartStatus>(
          semanticLabel: 'Keadaan grafik',
          value: s,
          onChanged: set,
          segments: const [
            LdsSegment(value: LdsChartStatus.ready, label: 'Siap'),
            LdsSegment(value: LdsChartStatus.loading, label: 'Muat'),
            LdsSegment(value: LdsChartStatus.empty, label: 'Kosong'),
            LdsSegment(value: LdsChartStatus.error, label: 'Galat'),
          ],
        ),
        LdsChartStates(
          status: s,
          emptyTitle: 'Belum ada laporan minggu ini',
          onRetry: () => set(LdsChartStatus.ready),
          child: const LdsBarChart(
            labels: _days,
            series: [_perDay],
            semanticLabel: 'Laporan per hari.',
          ),
        ),
      ]),
    );
  }),
  GalleryEntry('LdsChartLegend', 'Legenda', (context) {
    return Hold<List<bool>>(
      initial: const [true, true, true],
      builder: (context, on, set) {
        final c = context.lds;
        return LdsChartLegend(
          items: [
            LdsLegendItem('Aplikasi', LdsSeriesColor.series1.resolve(c), on: on[0]),
            LdsLegendItem('Loket', LdsSeriesColor.series2.resolve(c), on: on[1]),
            LdsLegendItem('Telepon', LdsSeriesColor.series3.resolve(c), on: on[2]),
          ],
          onToggle: (i) {
            final next = [...on]..[i] = !on[i];
            if (next.contains(true)) set(next);
          },
        );
      },
    );
  }),
  GalleryEntry('LdsMap', 'Peta wilayah', (context) {
    return Hold<int?>(
      initial: 1,
      builder: (context, sel, set) => LdsMap(
        regions: _regions,
        pins: const [
          LdsMapPin(at: Offset(15, 4), label: 'Posko BPBD Kedaton'),
          LdsMapPin(
              at: Offset(14, 20),
              label: 'Pelabuhan Panjang',
              kind: LdsMapPinKind.destination),
          LdsMapPin(
              at: Offset(4, 4), label: 'Terminal Rajabasa', kind: LdsMapPinKind.origin),
        ],
        routes: const [
          LdsMapRoute(
              path: [Offset(4, 4), Offset(12, 10), Offset(14, 20)], progress: 0.4),
        ],
        selected: sel,
        onSelect: set,
        showScale: true,
        height: 240,
        semanticLabel: 'Laporan per kecamatan di Bandar Lampung (skema).',
      ),
    );
  }),
  GalleryEntry('LdsFloorPlan', 'Denah lantai', (context) {
    return Hold<String?>(
      initial: 'l2',
      builder: (context, sel, set) => LdsFloorPlan(
        columns: 3,
        semanticLabel: 'Mal Pelayanan Publik, lantai 1',
        zones: const [
          LdsFloorZone(name: 'Ruang tunggu', column: 0, row: 1, columnSpan: 3),
        ],
        units: const [
          LdsFloorUnit(id: 'l1', name: 'Disdukcapil', meta: 'Kosong', column: 0, row: 0),
          LdsFloorUnit(
              id: 'l2',
              name: 'Samsat',
              meta: 'Melayani',
              column: 1,
              row: 0,
              tone: LdsFloorTone.strong,
              flag: 'flag'),
          LdsFloorUnit(
              id: 'm1',
              name: 'Info',
              meta: 'Dipesan',
              column: 2,
              row: 0,
              round: true,
              tone: LdsFloorTone.accent),
        ],
        selected: sel,
        onSelect: set,
      ),
    );
  }),
  GalleryEntry('LdsRouteSchematic', 'Skema rute', (context) {
    return const DemoColumn(gap: 24, children: [
      LdsRouteSchematic(
        stops: [
          LdsRouteStop('Rajabasa', sub: 'Berangkat 06.10'),
          LdsRouteStop('Kalianda', sub: '07.40'),
          LdsRouteStop('Bakauheni', sub: 'Tiba 08.45'),
        ],
        position: 1.4,
        vehicleLabel: 'Bus DAMRI 21',
        semanticLabel: 'Bus Rajabasa ke Bakauheni, tiba 08.45.',
      ),
      LdsRouteSchematic(
        stops: [
          LdsRouteStop('Radin Inten II'),
          LdsRouteStop('Soekarno-Hatta'),
        ],
        position: 0.5,
        mode: LdsRouteMode.flight,
        semanticLabel: 'Penerbangan Lampung ke Jakarta.',
      ),
    ]);
  }),
  GalleryEntry('LdsNumberCount', 'Angka berhitung', (context) {
    return Hold<double>(
      initial: 1284,
      builder: (context, n, set) => Row(children: [
        Expanded(
          child: LdsNumberCount(n,
              countOnFirstBuild: true,
              style: LdsType.title1.copyWith(color: context.lds.textStrong)),
        ),
        LdsButton(
            label: 'Tambah 100',
            size: LdsButtonSize.sm,
            variant: LdsButtonVariant.secondary,
            onPressed: () => set(n + 100)),
      ]),
    );
  }),
  GalleryEntry('LdsRollingNumber', 'Angka bergulir', (context) {
    return Hold<int>(
      initial: 12840,
      builder: (context, n, set) => Row(children: [
        Expanded(
          child: LdsRollingNumber(n,
              style: LdsType.title1.copyWith(color: context.lds.textStrong)),
        ),
        LdsButton(
            label: 'Antrean baru',
            size: LdsButtonSize.sm,
            variant: LdsButtonVariant.secondary,
            onPressed: () => set(n + 37)),
      ]),
    );
  }),
  GalleryEntry('LdsTimer', 'Pengatur waktu', (context) {
    return const Wrap(spacing: 16, runSpacing: 12, children: [
      LdsTimer(
          seconds: 90,
          icon: 'schedule',
          semanticLabel: 'Sisa waktu memasukkan kode OTP'),
      LdsTimer.elapsed(
          seconds: 300, target: 600, semanticLabel: 'Lama melayani di loket'),
    ]);
  }),
];
