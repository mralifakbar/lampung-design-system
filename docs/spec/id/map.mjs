const cfg = (o) => JSON.stringify(o).replace(/'/g, '&#39;');

const CANTI = [-5.8165, 105.5880], SEBESI = [-5.9590, 105.4930];
const flight = {
  label: 'Kapal logistik BPBD dari Dermaga Canti ke Pulau Sebesi, 65 persen perjalanan',
  routes: [{ path: [CANTI, SEBESI], progress: 0.65, arc: true, vehicle: { icon: 'directions_boat', label: 'Kapal logistik 02', sub: 'Merapat 10.45' } }],
  markers: [
    { at: CANTI, kind: 'origin', label: 'Dermaga Canti', sub: 'Berangkat 09.30' },
    { at: SEBESI, kind: 'destination', label: 'Dermaga Tejang, Pulau Sebesi', sub: 'Merapat 10.45' },
  ],
};
const road = [[-5.4292, 105.2610], [-5.4060, 105.2050], [-5.3940, 105.1350], [-5.3836, 105.0789], [-5.3700, 105.0250], [-5.3586, 104.9746], [-5.3560, 104.9200], [-5.3530, 104.8790], [-5.3780, 104.7930], [-5.4180, 104.7550], [-5.4431, 104.7266], [-5.4720, 104.6700], [-5.4976, 104.6232]];
const truck = {
  label: 'Truk bantuan BPBD dari Bandar Lampung ke Kota Agung, sudah melewati Gedong Tataan, pemberhentian berikutnya Pringsewu',
  routes: [{ path: road, progress: 0.36, vehicle: { icon: 'local_shipping', label: 'Truk BE 9214 CD', sub: 'Berikutnya: Pringsewu 10.20' } }],
  markers: [
    { at: road[0], kind: 'origin', label: 'Gudang BPBD, Bandar Lampung', sub: 'Dimuat 15 Nov, 07.00' },
    { at: road[3], kind: 'stop', done: true, label: 'Gedong Tataan', sub: 'Dilewati 15 Nov, 09.35' },
    { at: road[5], kind: 'stop', label: 'Pringsewu', sub: 'Perkiraan 10.20' },
    { at: road[12], kind: 'destination', label: 'Kota Agung', sub: 'Perkiraan 12.15' },
  ],
};
const centres = {
  label: 'Puskesmas di Bandar Lampung',
  scrollZoom: 'modifier',
  markers: [
    { at: [-5.3835, 105.2785], label: 'Puskesmas Way Halim', sub: 'Antrean 14, buka sampai 14.00' },
    { at: [-5.3758, 105.2556], label: 'Puskesmas Kedaton', sub: 'Kuota hari ini penuh' },
    { at: [-5.3687, 105.2380], label: 'Puskesmas Rajabasa', sub: 'Antrean 6, buka sampai 14.00' },
    { at: [-5.3846, 105.3020], label: 'Puskesmas Sukarame', sub: 'Antrean 21, buka sampai 14.00' },
    { at: [-5.4740, 105.3160], label: 'Puskesmas Panjang', sub: 'Antrean 3, buka sampai 21.00' },
  ],
};
const swap = (o) => `this.closest('.docs-col').querySelector('.map')._ldsMap.handle.update(${cfg(o).replace(/"/g, '&quot;')})`;

export default {
  summary: 'Peta geser kecil di atas tile OpenStreetMap: rute dengan bagian yang sudah ditempuh berwarna aksen, kendaraan di posisinya, dan pin untuk tempat yang penting. Hanya menggambar tile yang terlihat dan selalu mencantumkan kredit data peta di sudut.',
  when: [
    'Menunjukkan posisi kiriman bantuan, ambulans, atau kapal penyeberangan saat ini, di geografi nyata, di samping detailnya.',
    'Beberapa tempat yang dipilih orang berdasarkan letaknya: puskesmas, kantor Samsat, titik penyaluran bantuan.',
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
      title: 'Penyeberangan kapal yang sedang berjalan',
      desc: 'Rutenya mengikuti lingkaran besar, dilengkungkan sedikit agar terbaca sebagai penyeberangan laut. Bagian yang sudah ditempuh tergambar saat pertama terlihat, lalu kapal mengendap, menghadap sepanjang jalurnya. Seret, gulir, cubit, atau pakai tombolnya; fokuskan peta dan pakai tombol panah serta plus atau minus.',
      html: `<div class="map" style="--map-h: 340px;" data-lds-map='${cfg(flight)}'></div>`,
    },
    {
      title: 'Perjalanan darat dengan pemberhentian',
      desc: 'Rute truk bantuan BPBD melewati titik-titik jalan. Pemberhentian yang sudah dilewati terisi, caret pada truk menunjuk arah tujuannya, dan setiap tempat menyebut waktunya di label.',
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
      html: `<div class="docs-col" style="gap: 12px;"><div class="cluster" style="--gap: 8px;"><button class="btn btn--secondary btn--sm" type="button" onclick="${swap(flight)}">Canti ke Pulau Sebesi</button><button class="btn btn--secondary btn--sm" type="button" onclick="${swap(truck)}">Bandar Lampung ke Kota Agung</button></div><div class="map" style="--map-h: 320px;" data-lds-map='${cfg(flight)}'></div></div>`,
      code: `<div class="map" style="--map-h: 320px;" data-lds-map='{"label":"Kapal logistik BPBD dari Dermaga Canti ke Pulau Sebesi","routes":[{"path":[[-5.8165,105.588],[-5.959,105.493]],"progress":0.65,"arc":true,"vehicle":{"icon":"directions_boat","label":"Kapal logistik 02"}}],"markers":[{"at":[-5.8165,105.588],"kind":"origin","label":"Dermaga Canti"},{"at":[-5.959,105.493],"kind":"destination","label":"Dermaga Tejang, Pulau Sebesi"}]}'></div>

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
    ['routes[].arc', 'Setiap ruas mengikuti lingkaran besar, diangkat menjadi lengkungan lembut. Untuk penerbangan dan penyeberangan laut.'],
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
    'Permukaan peta bisa difokus, dinamai oleh `label`, dan dijelaskan dengan satu kalimat per marker ("Asal: Dermaga Canti, Berangkat 09.30. Sekarang: Kapal logistik 02, Merapat 10.45 …") ditambah cara memakai tombolnya.',
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
