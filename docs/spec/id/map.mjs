const cfg = (o) => JSON.stringify(o).replace(/'/g, '&#39;');

const CGK = [-6.1256, 106.6559], SIN = [1.3644, 103.9915];
const flight = {
  label: 'Kargo udara dari Jakarta ke Singapura, 65 persen perjalanan',
  routes: [{ path: [CGK, SIN], progress: 0.65, arc: true, vehicle: { icon: 'flight', label: 'Penerbangan 884', sub: 'Mendarat 08.45' } }],
  markers: [
    { at: CGK, kind: 'origin', label: 'Jakarta CGK', sub: 'Berangkat 06.10' },
    { at: SIN, kind: 'destination', label: 'Singapura SIN', sub: 'Mendarat 08.45' },
  ],
};
const road = [[-6.9175, 107.6191], [-6.94, 107.75], [-7.03, 107.89], [-7.06, 108.08], [-7.3274, 108.2207], [-7.33, 108.35], [-7.37, 108.54], [-7.30, 108.76], [-7.52, 109.06], [-7.4245, 109.2302], [-7.51, 109.29], [-7.61, 109.51], [-7.67, 109.65], [-7.72, 109.91], [-7.71, 110.01], [-7.86, 110.16], [-7.7956, 110.3695]];
const truck = {
  label: 'Angkutan darat dari Bandung ke Yogyakarta, sudah melewati Tasikmalaya, pemberhentian berikutnya Purwokerto',
  routes: [{ path: road, progress: 0.36, vehicle: { icon: 'local_shipping', label: 'Truk D 8812 KL', sub: 'Berikutnya: Purwokerto 06.30' } }],
  markers: [
    { at: road[0], kind: 'origin', label: 'Bandung', sub: 'Dimuat 15 Nov, 21.00' },
    { at: road[4], kind: 'stop', done: true, label: 'Tasikmalaya', sub: 'Dilewati 16 Nov, 01.40' },
    { at: road[9], kind: 'stop', label: 'Purwokerto', sub: 'Perkiraan 06.30' },
    { at: road[16], kind: 'destination', label: 'Yogyakarta', sub: 'Perkiraan 10.15' },
  ],
};
const centres = {
  label: 'Lokasi ujian di Bandung',
  scrollZoom: 'modifier',
  markers: [
    { at: [-6.8915, 107.6107], label: 'Lokasi Dago', sub: '120 kursi, sisa 2 sesi' },
    { at: [-6.9147, 107.6098], label: 'Lokasi Braga', sub: '80 kursi, penuh' },
    { at: [-6.9389, 107.6229], label: 'Lokasi Buah Batu', sub: '96 kursi, sisa 5 sesi' },
    { at: [-6.8721, 107.5841], label: 'Lokasi Setiabudi', sub: '60 kursi, sisa 1 sesi' },
    { at: [-6.9447, 107.5774], label: 'Lokasi Kopo', sub: '140 kursi, sisa 8 sesi' },
  ],
};
const swap = (o) => `this.closest('.docs-col').querySelector('.map')._ldsMap.handle.update(${cfg(o).replace(/"/g, '&quot;')})`;

export default {
  summary: 'Peta geser kecil di atas tile OpenStreetMap: rute dengan bagian yang sudah ditempuh berwarna aksen, kendaraan di posisinya, dan pin untuk tempat yang penting. Hanya menggambar tile yang terlihat dan selalu mencantumkan kredit data peta di sudut.',
  when: [
    'Menunjukkan posisi kiriman, pengemudi, atau penerbangan saat ini, di geografi nyata, di samping detailnya.',
    'Beberapa tempat yang dipilih orang berdasarkan letaknya: lokasi ujian, titik penjemputan, kantor cabang.',
    'Gambaran semua yang sedang bergerak sekaligus, ketika klik pada kendaraan membuka catatannya.',
  ],
  whenNot: [
    ['Pemberhentian satu perjalanan secara berurutan, dibaca sekilas tanpa geografi, atau di baris daftar yang sempit', 'route-schematic', 'Tidak butuh tile maupun jaringan, dan terbaca sama di lebar berapa pun.'],
    ['Riwayat satu catatan dengan waktu dan orang', 'timeline'],
    ['Alamat yang hanya perlu dibaca atau disalin', 'key-value', 'Tulis alamatnya; tautkan ke aplikasi peta lengkap bila perlu petunjuk arah.'],
  ],
  where: 'Di detail sebuah catatan, selebar kolomnya, tinggi sekitar 280 sampai 400 px (`--map-h`); di drawer atau ponsel 240 sampai 280 px. Peta gambaran umum berada di atas halaman, selebar penuh. Jangan pernah di dalam kartu yang sudah punya ring; peta punya ring sendiri.',
  anatomy: [
    ['.map[data-lds-map]', 'Wajib. Kotaknya; atur tingginya dengan `--map-h` (default 320 px). `drawMap` (atau hook-nya) mengisinya dari sebuah config.'],
    ['.map__view', 'Dibuat otomatis. Permukaan yang bisa difokus (`role="region"`, `aria-roledescription="map"`, dinamai oleh `label`), dijelaskan oleh ringkasan teks setiap marker.'],
    ['.map__tiles', 'Dibuat otomatis. Tile raster yang terlihat; diredupkan di dark mode oleh token filter `--map-tiles`.'],
    ['svg.map__lines', 'Dibuat otomatis. Per rute: `.map__casing` (halo lembut), `.map__track` (putus-putus, bagian yang masih di depan), dan `.map__done` (aksen, bagian yang sudah ditempuh).'],
    ['button.map__marker', 'Dibuat otomatis. Satu per marker: `--origin` (cakram ber-ring), `--destination` (pin), `--stop` (titik, `.is-done` terisi), `--point` (titik aksen), `--vehicle` (cakram ber-ring dengan ikon moda dan caret ke arah tujuannya). `.map__label` tampil saat hover dan fokus.'],
    ['.map__controls', 'Dibuat otomatis. Perbesar, perkecil, dan tampilkan semua.'],
    ['.map__attr', 'Dibuat otomatis. Diwajibkan penyedia tile: "© OpenStreetMap contributors" yang menaut ke halaman hak cipta. Jangan pernah disembunyikan.'],
    ['.map__status', 'Dibuat otomatis. "Memuat peta" selama tile pertama datang; bila tile gagal, catatan dan Coba lagi.'],
  ],
  examples: [
    {
      title: 'Penerbangan yang sedang berjalan',
      desc: 'Rutenya mengikuti lingkaran besar, dilengkungkan sedikit agar terbaca sebagai penerbangan. Bagian yang sudah ditempuh tergambar saat pertama terlihat, lalu pesawat mengendap, menghadap sepanjang jalurnya. Seret, gulir, cubit, atau pakai tombolnya; fokuskan peta dan pakai tombol panah serta plus atau minus.',
      html: `<div class="map" style="--map-h: 340px;" data-lds-map='${cfg(flight)}'></div>`,
    },
    {
      title: 'Perjalanan darat dengan pemberhentian',
      desc: 'Rute truk melewati titik-titik jalan. Pemberhentian yang sudah dilewati terisi, caret pada truk menunjuk arah tujuannya, dan setiap tempat menyebut waktunya di label.',
      html: `<div class="map" style="--map-h: 360px;" data-lds-map='${cfg(truck)}'></div>`,
    },
    {
      title: 'Beberapa tempat, dipaskan',
      desc: 'Tanpa rute, peta memaskan semua marker dengan ruang untuk pinnya. Di dalam halaman yang bergulir, `scrollZoom: "modifier"` menyerahkan roda mouse ke halaman dan hanya memperbesar bila Ctrl atau Cmd ditahan, dengan petunjuk singkat.',
      html: `<div class="map" style="--map-h: 300px; max-width: 560px;" data-lds-map='${cfg(centres)}'></div>`,
    },
    {
      title: 'Berganti catatan: terbang untuk memaskan',
      desc: 'Memanggil `drawMap` lagi pada elemen yang sama (atau `handle.update`) menerbangkan peta keluar dan masuk kembali untuk memaskan rute baru, lalu menggambar bagian yang sudah ditempuh. Seret atau tombol apa pun menghentikan penerbangan di tempatnya.',
      html: `<div class="docs-col" style="gap: 12px;"><div class="cluster" style="--gap: 8px;"><button class="btn btn--secondary btn--sm" type="button" onclick="${swap(flight)}">Jakarta ke Singapura</button><button class="btn btn--secondary btn--sm" type="button" onclick="${swap(truck)}">Bandung ke Yogyakarta</button></div><div class="map" style="--map-h: 320px;" data-lds-map='${cfg(flight)}'></div></div>`,
      code: `<div class="map" style="--map-h: 320px;" data-lds-map='{"label":"Kargo udara dari Jakarta ke Singapura","routes":[{"path":[[-6.1256,106.6559],[1.3644,103.9915]],"progress":0.65,"arc":true,"vehicle":{"icon":"flight","label":"Penerbangan 884"}}],"markers":[{"at":[-6.1256,106.6559],"kind":"origin","label":"Jakarta CGK"},{"at":[1.3644,103.9915],"kind":"destination","label":"Singapura SIN"}]}'></div>

<script type="module">
  import { drawMap } from 'lampung-design-system/js';
  const map = drawMap(el, config);          // or let init() read data-lds-map
  list.addEventListener('click', (e) => {
    const s = shipments[e.target.closest('[data-id]').dataset.id];
    map.update({ label: s.label, routes: s.routes, markers: s.markers });   // flies to fit
  });
  el.addEventListener('lds:mapselect', (e) => openShipment(e.detail.id));   // a marker was clicked
</script>`,
    },
  ],
  variants: [
    ['routes[].arc', 'Setiap ruas mengikuti lingkaran besar, diangkat menjadi lengkungan lembut. Untuk penerbangan.'],
    ['routes[].progress', '0 sampai 1 dari panjangnya. Bagian yang sudah ditempuh berwarna aksen penuh, sisanya putus-putus redup. 1 berarti sudah tiba: tanpa kendaraan kecuali `vehicle.arrived`.'],
    ['routes[].thin', 'Garis lebih tipis untuk gambaran umum dengan banyak rute.'],
    ['markers[].kind', '`origin`, `destination`, `stop` (`done: true` mengisinya), `point`. Kendaraan berasal dari `routes[].vehicle`.'],
    ['tone: "warning" | "danger"', 'Pada kendaraan atau titik: ring dan caret memakai warna status. Sebutkan juga statusnya di label.'],
    ['size: "sm", selected', 'Kendaraan lebih kecil untuk gambaran umum; `selected: true` mengisi yang dipilih dengan aksen dan memasang `aria-pressed`.'],
    ['fitTo: "markers"', 'Paskan hanya marker dan kendaraan, bukan seluruh rute. Untuk gambaran umum ketika rute membentang jauh melampaui posisi saat ini.'],
    ['scrollZoom', '`true` (default) roda mouse memperbesar; `"modifier"` hanya dengan Ctrl atau Cmd, untuk peta di dalam halaman yang bergulir; `false` tidak pernah.'],
    ['tiles, attribution', 'Server tile lain (URL `{z}/{x}/{y}`) dan kredit yang diwajibkannya.'],
  ],
  states: [
    ['loading', 'Garis dan marker langsung tergambar di atas isian tenang; tile muncul memudar saat tiba. Setelah 300 ms tanpa tile, "Memuat peta" tampil di sudut.'],
    ['tile error', 'Bila semua tile yang terlihat gagal, sudut peta menyebutkannya dan menawarkan Coba lagi; rute dan marker tetap bisa dipakai di atas isian polos.'],
    ['empty', 'Tanpa marker dan rute, peta menampilkan dunia di zoom 2. Biasanya tampilkan empty state sebagai ganti peta.'],
    ['focus', 'Seluruh kotak mendapat focus ring; marker yang difokus memberi ring pada pinnya dan menampilkan labelnya.'],
    ['dragging', 'Kursor berubah menjadi menggenggam; klik marker diabaikan setelah menyeret.'],
  ],
  motion: [
    'Tampilan pertama: bagian yang sudah ditempuh tergambar selama 1 dtk (ease out), lalu kendaraan muncul memudar dan mengendap dari 0,6 dengan `--spring-smooth`.',
    'Memaskan rute baru dilakukan dengan terbang: peta memperkecil lalu memperbesar kembali di tengah jalan bila tujuannya jauh (480 sampai 1300 ms, ease in out). Pointer, roda mouse, atau tombol apa pun menghentikannya di tempat.',
    'Sentakan membuat peta terus bergeser dan melambat sendiri (peluruhan eksponensial, konstanta waktu 325 ms). Tombol dan keyboard memperbesar satu level dalam 320 ms di sekitar titik tengah; panah menggeser 80 px (240 dengan Shift) dalam 200 ms.',
    'Tile muncul memudar selama `--d-standard`; level zoom sebelumnya tetap di bawah sampai yang baru masuk, sehingga peta tidak pernah berkedip kosong.',
    'Reduced motion: tanpa gambar masuk, tanpa terbang, tanpa momentum; tampilan langsung melompat.',
  ],
  a11y: [
    'Permukaan peta bisa difokus, dinamai oleh `label`, dan dijelaskan dengan satu kalimat per marker ("Asal: Jakarta CGK, Berangkat 06.10. Sekarang: Penerbangan 884, Mendarat 08.45 …") ditambah cara memakai tombolnya.',
    'Tombol panah menggeser, plus dan minus memperbesar dan memperkecil, Home atau 0 menampilkan semuanya. Tombol zoom dan paskan adalah tombol asli bernama; tombol zoom nonaktif di batasnya.',
    'Marker adalah tombol dengan nama lengkap (jenis, tempat, waktu); label visualnya disembunyikan dari teknologi bantu agar tidak terbaca dua kali.',
    'Tidak ada yang hanya ada di peta: simpan rute, status, dan waktu di catatan di sebelahnya.',
    'Tautan atribusi tetap terlihat dan bisa dicapai dengan keyboard.',
  ],
  do: [
    'Beri setiap rute label kendaraan dan setiap tempat waktu atau status.',
    'Pakai `scrollZoom: "modifier"` bila peta berada di halaman yang bergulir.',
    'Pertahankan atribusi; pakai server tile sendiri untuk lalu lintas tinggi.',
  ],
  dont: [
    'Menaruh dua peta untuk hal yang sama berdampingan, atau route schematic tepat di sebelah peta.',
    'Mewarnai kendaraan hanya menurut status; labelnya yang menyebutkan.',
    'Menganimasikan kendaraan berulang di sepanjang garis; kendaraan berdiri di posisi perjalanannya.',
  ],
  js: '`data-lds-map` dengan config JSON digambar oleh `init()`. Dari kode: `drawMap(el, { label, routes: [{ path, progress, arc, vehicle }], markers: [{ at, kind, label, sub, id }] })` mengembalikan handle dengan `update(next)`, `fit()`, `zoomIn()`, `zoomOut()`, `flyTo(center, zoom)`, `view`, dan `destroy()`. Klik marker memicu `lds:mapselect` dengan `{ id, marker, kind, element }`. Tile default-nya `https://tile.openstreetmap.org/{z}/{x}/{y}.png`; tanpa library tambahan, tanpa API key.',
};
