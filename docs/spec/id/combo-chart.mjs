import { cfg } from '../_chart-data.mjs';

const m = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const sales = [31, 34, 29, 38, 41, 37, 44, 47, 43, 52, 56, 0];
const plan = [32, 33, 34, 36, 38, 40, 42, 44, 46, 49, 52, 55];
const revenue = {
  label: 'Realisasi pajak daerah per bulan dibanding rencana, 2026. Di atas rencana sejak Juli; November Rp 56 M dibanding rencana Rp 52 M. Desember belum ditutup.',
  x: m, xFull: m.map((x) => `${x} 2026`), xName: 'Bulan', format: { prefix: 'Rp ', suffix: ' M' },
  series: [{ name: 'Realisasi', values: sales, kind: 'bar' }, { name: 'Rencana', values: plan, kind: 'line', dashed: true, color: 4 }],
  refs: [{ value: 50, label: 'Ambang Rp 50 M' }],
  height: 240,
};
const hours = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const study = {
  label: 'Sampah terangkut per hari minggu ini dibanding target harian 2 ton. Target tercapai pada Rabu, Jumat, dan Sabtu.',
  x: hours, xName: 'Hari', format: { decimals: 1, suffix: ' ton' },
  series: [{ name: 'Sampah terangkut', values: [1.5, 2, 2.5, 1, 3, 4, 0.5], kind: 'bar', color: 3 }, { name: 'Target harian', values: [2, 2, 2, 2, 2, 2, 2], kind: 'line', dashed: true, color: 'neutral' }],
  height: 200,
};

export default {
  summary: 'Batang untuk apa yang terjadi di setiap periode dan garis untuk apa yang diharapkan (rencana, prakiraan, tahun lalu), pada satu skala bersama, dengan garis acuan putus-putus opsional untuk ambang tetap. Digambar dari data seperti area chart.',
  when: [
    'Realisasi dibanding rencana per bulan atau minggu: pajak daerah dibanding rencana, sampah terangkut dibanding target, pendaftar dibanding prakiraan.',
    'Periode terpisah (batang) dengan harapan yang berkelanjutan melintasinya (garis).',
    'Ambang tetap yang dicek pembaca setiap periode: batas aman, batas maksimum, nilai minimum (garis acuan).',
  ],
  whenNot: [
    ['Dua ukuran dengan satuan berbeda di dua sumbu', 'line-chart', 'Dua sumbu y mengundang perbandingan yang keliru. Pecah menjadi dua grafik yang berbagi sumbu x, atau indeks keduanya ke 100.'],
    ['Hanya realisasi, tanpa harapan', 'bar-chart'],
    ['Satu total dibanding satu target', 'target-bar'],
    ['Volume selama banyak hari', 'area-chart'],
  ],
  where: 'Di [kartu grafik](chart-card), selebar halaman untuk 12 bulan, setengah lebar untuk satu minggu. Tinggi 200 sampai 240 px.',
  anatomy: [
    ['.chart[data-lds-chart]', 'Wajib. Mesin yang sama dengan [area chart](area-chart); seri memakai `kind: "bar"` atau `"line"`.'],
    ['.chart__bar', 'Batang per periode, membulat di atas, lebar maksimal 26 px per seri; beberapa seri batang berkelompok berdampingan.'],
    ['.chart__series.is-dashed', 'Harapan sebagai garis putus-putus yang melewati tengah batang.'],
    ['.chart__ref', 'Ambang tetap, putus-putus, dengan label di ujung kanan.'],
    ['.chart__band', 'Saat hover atau fokus seluruh periode diberi tint dan tooltip mencantumkan kedua seri.'],
  ],
  examples: [
    {
      title: 'Realisasi dibanding rencana',
      desc: 'Batang tumbuh dari garis dasar saat pertama terlihat; garis rencana muncul memudar. Arahkan kursor ke satu bulan: seluruh kolom diberi tint dan tooltip memberi kedua nilainya. Matikan rencana di legenda.',
      html: `<section class="chart-card" aria-labelledby="cb-q">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cb-q">Apakah penerimaan pajak di atas rencana?</div><div class="chart-card__sub">Realisasi pajak daerah per bulan, dalam miliar rupiah, 2026</div></div></div>
  <div class="chart" data-lds-chart='${cfg(revenue)}'></div>
</section>`,
    },
    {
      title: 'Satu minggu dibanding target harian',
      desc: 'Garis target datar berwarna netral: hari-hari di atasnya mudah dihitung.',
      html: `<section class="chart-card" style="max-width: 520px;" aria-labelledby="cb-w">
  <div><div class="chart-card__q" id="cb-w">Apakah target angkut sampah tercapai?</div><div class="chart-card__sub">Sampah terangkut per hari dalam ton, minggu ini</div></div>
  <div class="chart" data-lds-chart='${cfg(study)}'></div>
</section>`,
    },
  ],
  variants: [
    ['series[].kind: "bar"', 'Satu seri batang per periode; dua atau tiga seri batang berkelompok berdampingan.'],
    ['series[].kind: "line", dashed: true', 'Harapan yang melewati tengah batang.'],
    ['refs', 'Ambang tetap dengan keterangannya.'],
    ['format: { prefix: "$", compact: true }', 'Tick terbaca $40k, tooltip $41,000. Untuk rupiah pakai `prefix: "Rp "` dan satuan di `suffix`.'],
  ],
  states: [
    ['open period', 'Biarkan bulan berjalan bernilai 0 atau keluarkan, dan sebutkan "Desember belum ditutup" di label.'],
    ['hover / focus', 'Kolom diberi tint, tooltip berisi setiap seri; tombol panah berpindah per bulan.'],
    ['loading, empty, error', 'Lihat [state grafik](chart-states).'],
  ],
  motion: [
    'Saat pertama terlihat: batang tumbuh dari garis dasar selama `--d-smooth` (560 ms) dengan kurva masuk; garis putus-putus muncul memudar.',
    'Perubahan data dan toggle men-tween nilai dan skala selama `--d-considered` dengan `--ease-inout`, dari yang tampil.',
    'Reduced motion: langsung digambar.',
  ],
  a11y: [
    'Sama seperti [area chart](area-chart): satu gambar yang bisa difokus dengan kesimpulan sebagai namanya, tombol panah mengumumkan setiap periode, dan tabel tersembunyi berisi setiap nilai.',
    'Harapan digambar putus-putus dan dinamai di legenda, jadi dibedakan lebih dari warna.',
  ],
  do: [
    'Pakai satu skala untuk kedua seri; keduanya harus bersatuan sama.',
    'Namai harapan sesuai isinya: Rencana, Prakiraan, Tahun lalu.',
  ],
  dont: [
    'Menambah sumbu y kedua di kanan.',
    'Menggambar harapan sebagai batang juga; pembaca jadi membandingkan empat tinggi batang, bukan satu batang dengan satu garis.',
  ],
  js: 'Sama seperti [area chart](area-chart): `data-lds-chart` atau `drawChart(el, config)`.',
};
