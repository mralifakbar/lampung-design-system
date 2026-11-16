const cfg = (o) => JSON.stringify(o).replace(/'/g, '&#39;');

export default {
  summary: 'Pemberhentian satu perjalanan di sebuah garis: bagian yang sudah ditempuh berwarna aksen, kendaraan di posisinya sekarang, dan tempat serta waktu di bawah setiap pemberhentian. Diagram, bukan peta, sehingga tetap jujur dan terbaca di lebar berapa pun.',
  when: [
    'Melacak satu kiriman, pengantaran, atau perjalanan melewati beberapa pemberhentian yang diketahui: gudang, hub, pelabuhan, penerima.',
    'Detail perpindahan atau pemesanan dengan transit: dari mana berangkat, di mana sekarang, apa berikutnya.',
    'Rute yang perlu dilihat sekilas di samping detailnya, ketika peta jalan hanya menambah gangguan dan waktu muat.',
  ],
  whenNot: [
    ['Riwayat satu catatan dengan waktu dan orang, bukan tempat', 'timeline'],
    ['Urutan langkah tetap dalam formulir', 'steps'],
    ['Seberapa jauh sebuah nilai menuju target', 'target-bar'],
  ],
  where: 'Di atas detail kiriman atau perjalanan, selebar kolomnya. Dua sampai enam pemberhentian. Di bawah sekitar 104 px per pemberhentian berubah menjadi vertikal, pemberhentian tersusun ke bawah di kiri dengan keterangannya di samping.',
  anatomy: [
    ['.route[data-lds-route]', 'Wajib. Kotak berisi isian; `drawRoute` (atau hook-nya) mengisinya dari sebuah config. `role="group"` yang dinamai oleh `label`.'],
    ['svg.route__svg', 'Dibuat otomatis, disembunyikan dari teknologi bantu. `.route__track` (titik-titik, seluruh jalur), `.route__done` (aksen, bagian yang sudah ditempuh), `.route__dot` per pemberhentian (`.is-done`, `.is-next`).'],
    ['ol.route__stops > li.route__stop', 'Dibuat otomatis. Satu per pemberhentian: `.route__name` dan `.route__sub` (waktu, kode, status), ditambah state dalam kata untuk pembaca layar.'],
    ['.route__vehicle', 'Dibuat otomatis selama perjalanan berlangsung. Cakram ber-ring dengan ikon moda di ruas yang sedang ditempuh; penerbangan berbelok mengikuti lengkungnya.'],
  ],
  examples: [
    {
      title: 'Penerbangan yang sedang berjalan',
      desc: 'Kargo udara dari Jakarta ke Singapura, 65 % perjalanan. Lengkungnya tergambar sekali, lalu pesawat mengendap di atasnya, menghadap sepanjang kurva.',
      html: `<div class="route" style="max-width: 560px;" data-lds-route='${cfg({ label: 'Kargo udara dari Jakarta ke Singapura, 65 persen perjalanan, mendarat pukul 08.45.', mode: 'flight', position: 0.65, stops: [{ name: 'Jakarta CGK', sub: 'Berangkat 06.10' }, { name: 'Singapura SIN', sub: 'Mendarat 08.45' }] })}'></div>`,
    },
    {
      title: 'Perjalanan darat dengan pemberhentian',
      desc: 'Empat pemberhentian dengan truk. Pemberhentian yang sudah dilewati terisi, yang berikutnya ditandai aksen, dan keterangan di bawah masing-masing menyebut waktunya.',
      html: `<div class="route" style="max-width: 640px;" data-lds-route='${cfg({ label: 'Angkutan darat dari Bandung ke Yogyakarta, sudah melewati Tasikmalaya, pemberhentian berikutnya Purwokerto.', mode: 'road', position: 1.4, stops: [{ name: 'Bandung', sub: 'Dimuat 15 Nov, 21.00' }, { name: 'Tasikmalaya', sub: 'Dilewati 16 Nov, 01.40' }, { name: 'Purwokerto', sub: 'Perkiraan 06.30' }, { name: 'Yogyakarta', sub: 'Perkiraan 10.15' }] })}'></div>`,
    },
    {
      title: 'Sempit: vertikal',
      desc: 'Di kolom sempit rute yang sama berjalan ke bawah di kiri, sehingga nama tempat yang panjang tidak pernah terjepit. Rute yang sudah tiba tidak punya kendaraan; semua pemberhentian terisi.',
      html: `<div class="route" style="max-width: 300px;" data-lds-route='${cfg({ label: 'Kargo laut dari Panjang ke Tanjung Priok, sudah tiba.', mode: 'sea', position: 2, stops: [{ name: 'Pelabuhan Panjang, Bandar Lampung', sub: 'Berlayar 13 Nov, 18.00' }, { name: 'Selat Sunda', sub: 'Dilewati 14 Nov, 02.20' }, { name: 'Tanjung Priok, Jakarta', sub: 'Tiba 14 Nov, 09.15' }] })}'></div>`,
      code: `<div class="route" data-lds-route='{"label":"Kargo laut dari Panjang ke Tanjung Priok, sudah tiba.","mode":"sea","position":2,"stops":[{"name":"Pelabuhan Panjang, Bandar Lampung","sub":"Berlayar 13 Nov, 18.00"},{"name":"Selat Sunda","sub":"Dilewati 14 Nov, 02.20"},{"name":"Tanjung Priok, Jakarta","sub":"Tiba 14 Nov, 09.15"}]}'></div>

<script type="module">
  import { drawRoute } from 'lampung-design-system/js';
  // the truck reported a new position: the travelled part and the vehicle move there
  drawRoute(el, { ...config, position: 1.8 });
</script>`,
    },
  ],
  variants: [
    ['mode: "flight"', 'Setiap ruas berupa lengkung dan pesawat berbelok mengikutinya.'],
    ['mode: "road" | "sea" | "rail"', 'Ruas lurus; ikon truk, kapal, atau rute.'],
    ['position', 'Posisi kendaraan, dihitung dalam pemberhentian dari 0 (1,4 berarti 40 % dari pemberhentian kedua ke ketiga). Indeks terakhir berarti sudah tiba: tanpa kendaraan.'],
    ['.is-vertical', 'Dipasang skrip bila satu pemberhentian mendapat kurang dari sekitar 104 px; pemberhentian tersusun ke bawah di kiri.'],
  ],
  states: [
    ['under way', 'Titik yang sudah dilewati terisi, titik berikutnya diberi ring aksen dan namanya bertinta aksen, kendaraan di ruas yang sedang ditempuh.'],
    ['arrived', 'Semua titik terisi, tanpa kendaraan, pemberhentian terakhir menyebut kapan tiba.'],
    ['delayed or on hold', 'Sebutkan di keterangan pemberhentian ("Ditahan di bea cukai sejak 14.20") dan dengan badge di samping rute; skema tetap memakai warnanya.'],
    ['loading', 'Blok `.skel` setinggi yang sama di kotak isian.'],
  ],
  motion: [
    'Tampilan pertama: ruas yang sudah ditempuh tergambar satu per satu selama sekitar 1,1 dtk secara total, lalu kendaraan muncul memudar dan mengendap dari 0,6 dengan `--spring-smooth`. Titik terisi saat garis mencapainya.',
    'Memanggil `drawRoute` lagi (kiriman lain, posisi baru) menggambar ulang bagian yang sudah ditempuh dari awal.',
    'Mengubah ukuran menyusun ulang pemberhentian seketika, tanpa animasi.',
    'Reduced motion: langsung tergambar, kendaraan begitu saja muncul.',
  ],
  a11y: [
    'Kotaknya adalah grup yang dinamai oleh `label`, yang sebaiknya menyebut perjalanan dan posisinya dalam satu kalimat.',
    'Pemberhentian adalah daftar berurutan asli; setiap butir diakhiri state-nya dalam kata (Sudah dilewati, Pemberhentian berikutnya, Di depan, Sudah tiba).',
    'Gambar dan kendaraan diberi `aria-hidden`; tidak ada yang hanya ada di gambar.',
  ],
  do: [
    'Tulis waktu atau status di bawah setiap pemberhentian.',
    'Batasi pada pemberhentian yang penting bagi orang; dua sampai enam.',
    'Pasangkan dengan [timeline](timeline) bila peristiwa di antara pemberhentian penting.',
  ],
  dont: [
    'Menggambar garis pantai, negara, atau jalan di sekitarnya; ini skema.',
    'Mengulang gerak kendaraan di sepanjang garis; kendaraan berdiri di posisi perjalanannya.',
    'Mewarnai pemberhentian hanya menurut status; kata-katanya yang membawa arti.',
  ],
  js: '`data-lds-route` dengan config JSON digambar oleh `init()`. Dari kode: `drawRoute(el, { label, mode, position, stops: [{ name, sub }] })` mengembalikan `{ config, update(next) }`; skema digambar ulang saat ukuran berubah.',
};
