export default {
  summary: 'Tab bergaris bawah yang berpindah di antara bagian sejajar dalam satu halaman, masing-masing dengan panelnya sendiri. Satu garis tinta meluncur ke tab yang dipilih.',
  when: [
    'Satu data atau halaman punya bagian sejajar yang dikunjungi satu per satu: Ringkasan, Permohonan, Dokumen, Diskusi.',
    'Bagian-bagiannya berisi jenis konten berbeda, sehingga masing-masing butuh panel sendiri.',
    'Empat bagian atau lebih, atau label panjang: tab rata awal (`.tabs--start`) selebar labelnya.',
  ],
  whenNot: [
    ['Berpindah di antara dua sampai lima tampilan atau filter dari konten yang sama (Minggu, Bulan; Semua, Belum dibaca)', 'segmented-control', 'Tabs mengganti bagian; segmented control mengubah nilai'],
    ['Berpindah antarhalaman aplikasi', 'app-shell'],
    ['Urutan tetap yang harus dilalui berurutan', 'steps'],
    ['Konten yang mungkin ingin dibaca beberapa bagiannya sekaligus', 'accordion'],
    ['Tujuan di bagian bawah layar ponsel', 'phone-bars'],
  ],
  where: 'Tepat di bawah [page header](page-header) dari hal yang dibaginya, selebar kolom konten, dengan panel tepat di bawahnya. Di ponsel tetap di bawah judul; jika label tidak muat, pakai `.tabs--start` di dalam gulir horizontal alih-alih mengecilkan teks.',
  anatomy: [
    ['.tabs[role=tablist]', 'Wajib. Barisnya, dengan `aria-label`; garis tipis di sepanjang bawahnya. Tab berbagi lebar sama rata.'],
    ['.tabs__ink', 'Garis 2 px di bawah tab terpilih. Anak pertama; satu per baris.'],
    ['.tabs__btn[role=tab]', 'Wajib. Sebuah tab: `aria-selected`, `aria-controls` ke id panel.'],
    ['.tabs__count', 'Pil hitungan opsional setelah label, hanya jika angkanya membantu memutuskan ke mana pergi.'],
    ['.tab-panel[role=tabpanel]', 'Wajib. Satu per tab, dengan `id` yang cocok; yang tidak aktif `hidden`. Naik masuk dengan blur singkat.'],
  ],
  examples: [
    {
      title: 'Bagian layanan',
      desc: 'Tab selebar sama dengan hitungan. Klik atau pakai tombol panah: tinta meluncur dan panel baru naik masuk.',
      html: `<div class="tabs" role="tablist" aria-label="Bagian layanan" data-lds-tabs>
  <span class="tabs__ink" aria-hidden="true"></span>
  <button class="tabs__btn" role="tab" aria-selected="true" aria-controls="tb-p1" id="tb-t1">Ringkasan</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb-p2" id="tb-t2">Permohonan <span class="tabs__count">3</span></button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb-p3" id="tb-t3">Dokumen</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb-p4" id="tb-t4">Diskusi <span class="tabs__count">12</span></button>
</div>
<div class="tab-panel" role="tabpanel" id="tb-p1" aria-labelledby="tb-t1" tabindex="0">Tujuan layanan, persyaratan, dan jam layanan petugas.</div>
<div class="tab-panel" role="tabpanel" id="tb-p2" aria-labelledby="tb-t2" tabindex="0" hidden>Tiga permohonan masih terbuka. Tenggat terdekat hari Jumat pukul 23.59.</div>
<div class="tab-panel" role="tabpanel" id="tb-p3" aria-labelledby="tb-t3" tabindex="0" hidden>Formulir dan panduan, yang terbaru di atas.</div>
<div class="tab-panel" role="tabpanel" id="tb-p4" aria-labelledby="tb-t4" tabindex="0" hidden>Dua belas balasan belum dibaca di percakapan yang Anda ikuti.</div>`,
    },
    {
      title: 'Rata awal untuk banyak bagian',
      desc: 'Setiap tab selebar labelnya dan baris dimulai dari kiri. Di HTML biasa, hilangkan tinta di sini: skrip mengukurnya untuk tab selebar sama. Tab terpilih tetap terbaca dari ketebalan dan warnanya; `Tabs` React dengan `align="start"` mengukur dan menampilkan tintanya.',
      html: `<div class="tabs tabs--start" role="tablist" aria-label="Data pemohon" data-lds-tabs>
  <button class="tabs__btn" role="tab" aria-selected="true" aria-controls="tb2-p1" id="tb2-t1">Profil</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb2-p2" id="tb2-t2">Permohonan</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb2-p3" id="tb2-t3">Kehadiran</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb2-p4" id="tb2-t4">Tagihan</button>
  <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="tb2-p5" id="tb2-t5">Catatan dari petugas</button>
</div>
<div class="tab-panel" role="tabpanel" id="tb2-p1" aria-labelledby="tb2-t1" tabindex="0">Nama, NIK, dan kontak.</div>
<div class="tab-panel" role="tabpanel" id="tb2-p2" aria-labelledby="tb2-t2" tabindex="0" hidden>Permohonan tahun ini, per layanan.</div>
<div class="tab-panel" role="tabpanel" id="tb2-p3" aria-labelledby="tb2-t3" tabindex="0" hidden>Hadir 92 % di enam sesi pendampingan.</div>
<div class="tab-panel" role="tabpanel" id="tb2-p4" aria-labelledby="tb2-t4" tabindex="0" hidden>Retribusi sudah dibayar sampai akhir tahun.</div>
<div class="tab-panel" role="tabpanel" id="tb2-p5" aria-labelledby="tb2-t5" tabindex="0" hidden>Belum ada catatan.</div>`,
    },
  ],
  variants: [
    ['(default)', 'Lebar sama; dua sampai empat tab dengan label pendek.'],
    ['.tabs--start', 'Tab selebar labelnya, rata kiri, berjarak 4 px; empat tab atau lebih atau label panjang.'],
  ],
  states: [
    ['aria-selected="true"', 'Teks tegas dengan ketebalan 600; tinta berada di bawahnya; `tabindex="0"`, yang lain `-1`.'],
    ['hover', 'Teks yang tidak terpilih menggelap menjadi tegas.'],
    ['focus', 'Focus ring sistem pada tab; tombol panah memindahkan pilihan dan fokus bersamaan.'],
    ['.tab-panel[hidden]', 'Panel tidak aktif dikeluarkan dari layout dan dari accessibility tree.'],
  ],
  motion: [
    'Tinta: satu elemen bergeser ke tab terpilih dengan `--spring-smooth` selama `--d-smooth` (560 ms); label tidak pernah beranimasi sendiri. Klik baru di tengah luncuran mengalihkan tujuannya dari posisinya.',
    'Panel: panel baru masuk dengan `lds-blur-in` selama `--d-standard` (240 ms) dengan `--ease-enter`; panel lama langsung disembunyikan, sehingga tidak ada cross-fade.',
    'Warna label berubah halus selama `--d-standard`. Reduced motion: transisi turun ke 120 ms linear dan panel muncul tanpa blur.',
  ],
  a11y: [
    '`role="tablist"` dengan `aria-label`, tombol `role="tab"` dengan `aria-selected` dan `aria-controls`, panel `role="tabpanel"` dengan `aria-labelledby` dan `tabindex="0"` jika tidak berisi konten yang bisa difokus.',
    'Roving tabindex: hanya tab terpilih yang masuk urutan Tab. Kiri/Kanan (dan Atas/Bawah) memindahkan pilihan dan fokus, berputar di ujung. Binding React juga mendukung Home dan End.',
    'Hitungan menjadi bagian nama tab ("Permohonan 3"); pastikan bermakna.',
  ],
  do: [
    'Namai tab dengan kata benda sesuai isinya: "Permohonan", bukan "Lihat permohonan".',
    'Pertahankan tab terpilih saat orang kembali ke halaman (simpan di URL atau state).',
    'Pakai `.tabs--start` begitu label tidak lagi muat sama rata.',
  ],
  dont: [
    'Memakai tabs untuk memfilter daftar atau mengganti grafik; itu tugas [segmented control](segmented-control).',
    'Menyarangkan tabs di dalam tabs.',
    'Menaruh aksi (Simpan, Hapus) di baris tab.',
  ],
  js: '`data-lds-tabs` pada `.tabs` memilih tab saat diklik atau dengan tombol panah, mengatur `aria-selected` dan roving `tabindex`, menggeser dan mengukur `.tabs__ink` (lebar sama), menampilkan panel yang disebut `aria-controls` dan menyembunyikan sisanya, lalu memicu `lds:change` dengan `{ index, item }`.',
  react: `import { Tabs } from 'lampung-design-system/react';

const [tab, setTab] = useState<'overview' | 'assignments'>('overview');

<Tabs label="Bagian layanan" value={tab} onChange={setTab} align="fill"
  items={[{ value: 'overview', label: 'Ringkasan' }, { value: 'assignments', label: 'Permohonan', count: 3 }]} />
{tab === 'overview' ? <div className="tab-panel" role="tabpanel">…</div> : <div className="tab-panel" role="tabpanel">…</div>}`,
};
