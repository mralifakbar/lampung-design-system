// Lanes: rows of people or resources, time across, blocks placed by start and length.
const hours = ['07.00', '08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00'];
const who = (ini, name, sub) => `<div class="lanes__who"><span class="avatar avatar--gray" aria-hidden="true">${ini}</span><span class="lanes__id"><span class="lanes__name">${name}</span><span class="lanes__sub">${sub}</span></span></div>`;
const item = (from, span, title, sub = '', mod = '', tag = 'div') => `<${tag} class="lanes__item${mod}"${tag === 'button' ? ' type="button"' : ''} style="--from: ${from}; --span: ${span};"><span>${title}</span>${sub ? `<small>${sub}</small>` : ''}</${tag}>`;

const roster = `<div class="lanes-box" tabindex="0" role="region" aria-label="Jadwal dokter hari ini, bisa digulir ke samping">
  <div class="lanes lanes--now" style="--cols: 10; --now: 3.33;">
    <div class="lanes__head"><div class="lanes__corner">Dokter</div><div class="lanes__ticks">${hours.map((h) => `<span class="lanes__tick">${h}</span>`).join('')}</div></div>
    <div class="lanes__row">${who('NP', 'dr. Nadia Putri', 'Poli umum')}<div class="lanes__track">${item(1, 2, 'Posyandu lansia', 'Ruang 3')}${item(5, 1, 'Istirahat', '', ' lanes__item--muted')}${item(6, 1.5, 'Kosong', 'Pesan 13.00', ' lanes__item--free', 'button')}${item(7.5, 2, 'Konsultasi daring', 'Telekonsultasi', ' lanes__item--3')}</div></div>
    <div class="lanes__row">${who('RH', 'dr. Rizky Hartono', 'Poli anak')}<div class="lanes__track">${item(0, 3, 'Imunisasi', 'Ruang B', ' lanes__item--4')}${item(3.5, 1.5, 'Kosong', 'Pesan 10.30', ' lanes__item--free', 'button')}${item(5, 1, 'Istirahat', '', ' lanes__item--muted')}${item(6, 3, 'Rekap rekam medis', '', ' lanes__item--2')}</div></div>
    <div class="lanes__row">${who('AL', 'drg. Ayu Lestari', 'Poli gigi')}<div class="lanes__track"><span class="lanes__off" style="--from: 0; --span: 2;"></span>${item(2, 2.5, 'Pemeriksaan pasien', '6 pasien')}${item(5, 1, 'Istirahat', '', ' lanes__item--muted')}${item(6, 2, 'Ditahan: UKGS sekolah', 'Belum pasti', ' lanes__item--pending')}</div></div>
  </div>
</div>`;

const days = [['Sen', 16], ['Sel', 17], ['Rab', 18], ['Kam', 19], ['Jum', 20], ['Sab', 21], ['Min', 22], ['Sen', 23], ['Sel', 24], ['Rab', 25], ['Kam', 26], ['Jum', 27], ['Sab', 28], ['Min', 29]];
const off = '<span class="lanes__off" style="--from: 5; --span: 2;"></span><span class="lanes__off" style="--from: 12; --span: 2;"></span>';
const leave = `<div class="lanes-box" tabindex="0" role="region" aria-label="Cuti tim, 16 sampai 29 November, bisa digulir ke samping">
  <div class="lanes" style="--cols: 14; --col-min: 44px; --who: 180px;">
    <div class="lanes__head"><div class="lanes__corner">Tim layanan digital</div><div class="lanes__ticks">${days.map(([d, n], i) => `<span class="lanes__tick${i === 0 ? ' is-today' : ''}${d === 'Sab' || d === 'Min' ? ' is-off' : ''}">${d}<b>${n}</b></span>`).join('')}</div></div>
    <div class="lanes__row">${who('DL', 'Dewi Lestari', 'Desainer')}<div class="lanes__track">${off}${item(2, 3, 'Cuti tahunan')}</div></div>
    <div class="lanes__row">${who('GR', 'Galih Ramadhan', 'Pengembang')}<div class="lanes__track">${off}${item(0, 1, 'Sakit', '', ' lanes__item--2')}${item(9, 3, 'Diajukan', 'Cuti tahunan', ' lanes__item--pending')}</div></div>
    <div class="lanes__row">${who('SH', 'Sari Handayani', 'Pengelola layanan')}<div class="lanes__track">${off}${item(7, 5, 'Cuti melahirkan', 'Sampai 4 Des', ' lanes__item--4')}</div></div>
  </div>
</div>`;

export default {
  summary: 'Siapa sibuk kapan: satu baris per orang, ruangan, atau sumber daya, waktu berjalan mendatar, dan blok yang diletakkan menurut awal dan panjangnya. Pertanyaan yang dijawab adalah "siapa yang kosong, dan kapan", jadi celahnya sama penting dengan bloknya.',
  when: [
    'Jadwal tempat orang memesan atau merencanakan di sekitar waktu orang lain: jam praktik dokter hari ini, pendamping, sif petugas.',
    'Cuti tim selama satu sampai empat minggu, beserta pengajuan yang belum disetujui.',
    'Ruangan, tempat tidur, atau kendaraan yang dipesan per jam atau per hari.',
  ],
  whenNot: [
    ['Acara satu orang atau satu tim per bulan, minggu, atau agenda', 'event-calendar'],
    ['Pekerjaan yang bergerak melewati tahap', 'kanban'],
    ['Riwayat satu catatan', 'timeline'],
    ['Aktivitas per hari selama berbulan-bulan, sebagai intensitas', 'heatmap'],
  ],
  where: 'Selebar kolom isi, atau minimal delapan dari dua belas kolom: waktu butuh ruang. Di ponsel kotaknya bergulir ke samping dengan kolom nama tetap; kolom nama menyempit dan melepas avatar di bawah 560 px lebar kotak. Taruh legenda di bawahnya bila blok memakai lebih dari satu tone.',
  anatomy: [
    ['.lanes-box', 'Wajib. Kotak gulir: putih, ring, radius besar. Beri `tabindex="0"`, `role="region"`, dan `aria-label` yang menyebut rentang waktunya, agar pengguna keyboard bisa menggulirnya.'],
    ['.lanes', 'Wajib. Grid-nya. `--cols` jumlah kolom waktu, `--col-min` lebar tersempit kolom sebelum kotaknya bergulir (56 px), `--who` kolom nama (200 px), `--row-h` tinggi baris (56 px).'],
    ['.lanes__head > .lanes__corner + .lanes__ticks > .lanes__tick', 'Wajib. Apa isi barisnya, lalu satu tanda per kolom: jam, atau nama hari dengan tanggal di `b`. `.is-today` dengan aksen, `.is-off` dengan isian tenang untuk akhir pekan dan jam tutup.'],
    ['.lanes__row > .lanes__who', 'Wajib. Nama, menempel di kiri: `.avatar` opsional dan `.lanes__id` berisi `.lanes__name` dan `.lanes__sub`. `button.lanes__who` membuka detail orangnya.'],
    ['.lanes__track', 'Wajib. Baris waktu dengan garis tipis per kolom. Berisi blok `.lanes__off` dan `.lanes__item`.'],
    ['.lanes__item', 'Blok di `--from` (jumlah kolom dari awal, pecahan boleh) selama `--span` kolom, dengan judul `span` dan baris `small` opsional. Berupa `button` bila membuka sesuatu.'],
    ['.lanes__off', 'Waktu yang tidak dihitung (akhir pekan, tutup): isian tenang di belakang blok, diletakkan seperti butir.'],
    ['.lanes--now + --now', 'Garis waktu sekarang di setiap baris, pada `--now` kolom, digambar di belakang blok.'],
  ],
  examples: [
    {
      title: 'Siapa yang kosong hari ini',
      desc: 'Dokter per jam, dengan garis di waktu sekarang. Waktu kosong berupa blok tenang bergaris putus yang bisa dipesan saat ditekan; jadwal yang ditahan dan belum pasti punya tepi putus-putus dengan tone-nya; istirahat netral. Persempit jendela: kotaknya bergulir dan nama tetap di tempat.',
      html: roster,
    },
    {
      title: 'Cuti tim',
      desc: 'Dua minggu per hari, hari ini dengan aksen, akhir pekan dengan isian tenang. Cuti yang disetujui terisi menurut jenisnya; pengajuan yang masih menunggu hanya punya tepi putus-putus.',
      html: `${leave}
<div class="legend" style="margin-top: 12px;"><span><i style="background: var(--series-1);"></i>Cuti tahunan</span><span><i style="background: var(--series-2);"></i>Sakit</span><span><i style="background: var(--series-4);"></i>Cuti melahirkan</span></div>`,
    },
  ],
  variants: [
    ['.lanes__item', 'Tone seri 1. `--2`, `--3`, `--4` untuk warna seri lain, satu per jenis blok, dengan legenda.'],
    ['.lanes__item--muted', 'Istirahat dan waktu yang diblokir: netral, teks lebih tenang.'],
    ['.lanes__item--pending', 'Belum pasti (pengajuan, jadwal ditahan): tanpa isian, tepi putus-putus dengan tone-nya.'],
    ['.lanes__item--free', 'Waktu terbuka yang bisa dipesan: tepi netral putus-putus dan teks success; diberi tint saat hover.'],
    ['.lanes--now', 'Menampilkan garis waktu sekarang di `--now`.'],
  ],
  states: [
    ['hover (button item)', 'Tint menebal menjadi 24 %.'],
    ['pressed', 'Blok mengecil ke 0,97 dan memantul kembali dengan `--spring-snappy`.'],
    ['focus', 'Focus ring 2 px di luar blok, diangkat di atas tetangganya.'],
    ['.is-new', 'Blok yang baru ditambahkan (pengajuan yang disetujui, pemesanan baru) tumbuh dari awalnya sekali.'],
    ['filtered', '`hidden` pada `.lanes__row` menghapus seluruh baris.'],
    ['loading', 'Pertahankan head; baris skeleton setinggi `--row-h` dengan nama `.skel` dan dua atau tiga blok `.skel`.'],
    ['empty', '[Empty state](empty-state) di bawah head: "Tidak ada yang cuti dalam dua minggu ini".'],
  ],
  motion: [
    'Blok tombol mengecil ke 0,97 saat ditekan dan kembali dengan `--spring-snappy` (360 ms); tint berubah selama `--d-fast`.',
    'Blok baru (`.is-new`) tumbuh dari tepi awalnya dengan `--spring-snappy`, sekali, agar mata menemukan yang berubah.',
    'Tidak ada lagi yang bergerak: grid ini rujukan yang dibaca, bukan pertunjukan. Reduced motion: tanpa skala saat ditekan, tanpa tumbuh.',
  ],
  a11y: [
    'Kotaknya adalah `region` berlabel yang bisa difokus dan menyebut apa dan kapan ("Dokter hari ini, 07.00 sampai 17.00"), sehingga bisa digulir dengan keyboard.',
    'Setiap blok menyebut waktunya dalam kata bila hanya posisinya yang menunjukkan itu: taruh jam atau tanggal di baris `small`, atau di `aria-label` tombol ("Kosong dari 13.00 sampai 14.30, pesan").',
    'Tone mengulang kata di blok atau legenda; jangan hanya mengandalkan warna. Pending menyebut "Diajukan" atau "Ditahan" di judulnya.',
    'Blok interaktif adalah tombol asli dengan focus ring yang terlihat; blok baca-saja adalah elemen biasa.',
  ],
  do: [
    'Mulai kolom pada awal hari atau periode bagi pembacanya (07.00, Senin).',
    'Tampilkan waktu kosong bila pembaca mencarinya, dan buat bisa dipesan.',
    'Tandai akhir pekan dan jam tutup dengan `.lanes__off`.',
  ],
  dont: [
    'Memakai lebih dari empat tone dalam satu grid.',
    'Memerasnya di bawah sekitar 480 px tanpa membiarkannya bergulir; blok yang lebih pendek dari satu kolom jam kehilangan katanya.',
    'Memakainya untuk satu bulan milik satu orang; itu [event calendar](event-calendar).',
  ],
};
