const head = (q, sub) => `<div><div class="chart-card__q">${q}</div><div class="chart-card__sub">${sub}</div></div>`;
const loading = `<div class="chart-card" style="min-height: 240px;" role="status" aria-busy="true" aria-label="Memuat grafik laporan warga">
  <div class="stack" style="--gap: 8px;"><div class="skel" style="height: 14px; width: 55%;"></div><div class="skel" style="height: 12px; width: 35%;"></div></div>
  <div style="display: flex; align-items: flex-end; gap: 8px; height: 140px;">
    <div class="skel" style="flex: 1; height: 40%;"></div><div class="skel" style="flex: 1; height: 70%;"></div><div class="skel" style="flex: 1; height: 55%;"></div><div class="skel" style="flex: 1; height: 85%;"></div><div class="skel" style="flex: 1; height: 30%;"></div><div class="skel" style="flex: 1; height: 20%;"></div><div class="skel" style="flex: 1; height: 12%;"></div>
  </div>
</div>`;
const empty = `<div class="chart-card" style="min-height: 240px;">
  ${head('Hari apa yang paling sibuk?', 'Laporan warga yang masuk per hari, minggu ini')}
  <div class="empty" style="padding: 16px 8px;">
    <div class="empty__title">Belum ada laporan minggu ini</div>
    <div class="empty__body">Grafik terisi begitu laporan masuk.</div>
    <button class="btn btn--secondary btn--sm">Lihat minggu lalu</button>
  </div>
</div>`;
const error = `<div class="chart-card" style="min-height: 240px;">
  ${head('Hari apa yang paling sibuk?', 'Laporan warga yang masuk per hari, minggu ini')}
  <div class="alert alert--danger" role="alert">
    <span class="ic" aria-hidden="true">error</span>
    <div>
      <div class="alert__title">Data grafik gagal dimuat</div>
      <div class="alert__body">Layanan pengaduan tidak merespons tepat waktu.</div>
      <div class="alert__actions"><button class="btn btn--secondary btn--sm"><span class="ic" aria-hidden="true">refresh</span>Coba lagi</button></div>
    </div>
  </div>
</div>`;

export default {
  summary: 'Setiap grafik dirancang dalam state loading, kosong, dan error di dalam `.chart-card` yang sama, dengan ukuran yang sama seperti grafik yang sudah dimuat: skeleton berbentuk grafiknya sendiri, pesan kosong beserta alasannya, dan error dengan tombol coba lagi.',
  when: [
    'Grafik apa pun yang datanya berasal dari request: buat ketiga state ini sebelum grafik dirilis.',
    'Rentang tanggal atau filter bisa menghasilkan data kosong, dan pembaca perlu tahu bahwa itu memang kosong, bukan rusak.',
  ],
  whenNot: [
    ['State untuk daftar, tabel, atau halaman yang bukan grafik', 'data-states'],
    ['Seluruh halaman sedang dimuat', 'nav-progress'],
    ['Pembaruan latar untuk grafik yang sudah tampil', 'spinner', 'Pertahankan grafiknya dan tampilkan spinner kecil di dekat judul; jangan ganti dengan skeleton.'],
    ['Kegagalan yang memengaruhi seluruh aplikasi', 'banner'],
  ],
  where: 'Menggantikan area plot, di dalam kartu grafik yang sama, yang mempertahankan `min-height` agar grid dasbor tidak bergeser. Judul dan subjudul tetap tampil pada state kosong dan error; saat loading keduanya juga berupa skeleton.',
  anatomy: [
    ['.chart-card[role=status][aria-busy]', 'Wadah loading, dengan `aria-label` yang menyebut nama grafiknya.'],
    ['.skel', 'Loading. Blok berbentuk grafiknya sendiri: batang untuk grafik batang, strip 14 px untuk bar persentase, lingkaran untuk donut, grid kotak untuk heatmap.'],
    ['.empty', 'Kosong. Judul menyebut apa yang tidak ada untuk periode mana, isi menjelaskan kapan terisi, satu aksi untuk mengubah rentang.'],
    ['.alert.alert--danger', 'Error. Apa yang gagal, lalu Coba lagi.'],
  ],
  examples: [
    {
      title: 'Loading, kosong, error',
      desc: 'Grafik batang yang sama dalam tiga state tanpa data, berdampingan dengan ukuran grafik aslinya.',
      html: `<div class="auto-grid" style="--min: 260px;">
${loading}
${empty}
${error}
</div>`,
    },
    {
      title: 'Bentuk loading untuk grafik lain',
      desc: 'Grafik garis dimuat sebagai garis grid-nya, donut sebagai cincin, bar persentase sebagai satu strip.',
      html: `<div class="auto-grid" style="--min: 220px;">
  <div class="chart-card" role="status" aria-busy="true" aria-label="Memuat kunjungan puskesmas">
    <div class="skel" style="height: 14px; width: 60%;"></div>
    <div class="stack" style="--gap: 30px; padding-top: 12px;"><div class="skel" style="height: 2px;"></div><div class="skel" style="height: 2px;"></div><div class="skel" style="height: 2px;"></div><div class="skel" style="height: 2px;"></div></div>
  </div>
  <div class="chart-card" role="status" aria-busy="true" aria-label="Memuat sebaran kategori laporan">
    <div class="skel" style="height: 14px; width: 60%;"></div>
    <div class="cluster" style="--gap: 20px;"><div class="skel" style="width: 120px; height: 120px; border-radius: 50%;"></div><div class="stack" style="--gap: 10px; flex: 1;"><div class="skel" style="height: 12px;"></div><div class="skel" style="height: 12px; width: 70%;"></div><div class="skel" style="height: 12px; width: 50%;"></div></div></div>
  </div>
  <div class="chart-card" role="status" aria-busy="true" aria-label="Memuat porsi pajak daerah">
    <div class="skel" style="height: 14px; width: 60%;"></div>
    <div class="skel" style="height: 14px; border-radius: 4px;"></div>
    <div class="skel" style="height: 12px; width: 80%;"></div>
  </div>
</div>`,
    },
  ],
  states: [
    ['loading', 'Skeleton berbentuk grafiknya, muncul setelah sekitar 300 ms. `role="status"` + `aria-busy="true"`.'],
    ['empty', 'Pertahankan judul; `.empty` tanpa ikon (kartunya kecil) dan satu tombol untuk mengubah rentang.'],
    ['error', '`.alert--danger` dengan `role="alert"` dan Coba lagi. Jika masih punya data lama, biarkan tetap tampil dengan `.alert--warning` di atasnya.'],
    ['partial data', 'Plot data yang ada dan sebutkan yang hilang di subjudul ("Tidak ada data untuk minggu ke-7").'],
  ],
  motion: [
    'Shimmer skeleton: 1,6 s dengan `--ease-inout`, berulang selama loading; dengan reduced motion hanya diputar sekali.',
    'Saat data tiba, plot menggantikan skeleton dengan efek pudar selama `--d-standard`; garis lalu boleh tergambar sekali dengan `.draw`.',
    'State kosong dan error muncul tanpa gerak.',
  ],
  a11y: [
    'Loading: `role="status"`, `aria-busy="true"`, dan `aria-label` yang menyebut nama grafik. Hapus keduanya saat grafik tampil.',
    'Error: `role="alert"` agar diumumkan sekali; setelah Coba lagi, pindahkan fokus ke kartu.',
    'Kosong: teks biasa di dalam kartu; judul grafik tetap berupa node teks asli agar pembaca tahu grafik mana yang kosong.',
  ],
  do: [
    'Pertahankan ukuran kartu yang sama di setiap state.',
    'Sebutkan periodenya di pesan kosong.',
    'Tawarkan satu aksi: ubah rentang, atau coba lagi.',
  ],
  dont: [
    'Menampilkan plot kosong dengan sumbu tanpa pesan.',
    'Menggambar garis datar di nol saat data tidak ada.',
    'Memakai spinner tunggal di tengah kartu grafik.',
  ],
};
