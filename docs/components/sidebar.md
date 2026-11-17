# Sidebar

Kelompok: Navigasi. https://lampung.kartadinata.app/docs/components/sidebar

Panel berbingkai berisi tautan dengan satu sorotan yang bergeser, diletakkan di dalam konten: bagian-bagian halaman pengaturan, folder kotak masuk. Bukan kerangka aplikasi.

## Pakai saat
- Halaman punya bagian sekunder sendiri yang didaftar di samping konten: Pengaturan (Profil, Notifikasi, Tagihan), kategori pusat bantuan, folder kotak masuk.
- Tata letak dua kolom (`split-2`) yang kolom kirinya mendaftar apa yang ditampilkan kolom kanan.

## Pakai yang lain saat
- Navigasi utama seluruh aplikasi, sticky setinggi layar dengan drawer di ponsel: pakai [App shell](app-shell.md). Shell sudah punya sorotan, grup, dan bagian.
- Tautan seluruh situs di bagian atas: pakai [Top nav](top-nav.md).
- Melompat ke heading dalam satu halaman panjang: pakai [Outline](outline.md).
- Dua sampai lima bagian sejajar yang muat selebar halaman: pakai [Tabs](tabs.md).
- Pohon folder yang bisa dibuka dan ditutup: pakai [Tree](tree.md).

## Letaknya
Di kolom kiri `split-2` di dalam konten, lebar 240 px, di atas kolom itu. Di bawah 860 px `split-2` menumpuknya di atas konten; di ponsel lebih baik pakai [list](list.md) berisi tautan yang masing-masing membuka halaman.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `nav.sidebar` | Wajib. Panel dengan `aria-label`; latar dasar, garis 1 px, radius 16 px. |
| `.sidebar__hl` | Wajib. Satu-satunya sorotan; anak pertama, `aria-hidden`. Geser dengan `transform: translateY(<item offsetTop>px)`. |
| `.sidebar__head` | Keterangan di atas sekelompok item. |
| `.sidebar__item` | Wajib. Tautan atau tombol: `.ic` + teks (+ `.sidebar__badge`). `aria-current="page"` pada item aktif. |
| `.sidebar__badge` | Hitungan tenang di ujung item. |

## Markup

**Bagian ruang kerja.** Pilih sebuah item: sorotan meluncur ke sana dengan spring, bukan setiap item menyala sendiri.
```html
<nav class="sidebar" aria-label="Ruang kerja">
  <span class="sidebar__hl" aria-hidden="true" style="transform: translateY(120px);"></span>
  <span class="sidebar__head">Ruang kerja</span>
  <a class="sidebar__item" href="/home"><span class="ic" aria-hidden="true">home</span>Beranda</a>
  <a class="sidebar__item" href="/services" aria-current="page"><span class="ic" aria-hidden="true">menu_book</span>Layanan<span class="sidebar__badge">6</span></a>
</nav>
<script type="module">
  // Move the one highlight to the current item
  const nav = document.querySelector('.sidebar');
  const cur = nav.querySelector('[aria-current="page"]');
  nav.querySelector('.sidebar__hl').style.transform = `translateY(${cur.offsetTop}px)`;
</script>
```

**Halaman pengaturan di samping kontennya.** Di kolom kiri `split-2`; menumpuk di atas konten di bawah 860 px.
```html
<div class="split-2" style="--side: 240px;">
  <nav class="sidebar" aria-label="Pengaturan">
    <span class="sidebar__hl" aria-hidden="true" style="transform: translateY(10px);"></span>
    <a class="sidebar__item" href="#sb2" aria-current="page"><span class="ic" aria-hidden="true">person</span>Profil</a>
    <a class="sidebar__item" href="#sb2"><span class="ic" aria-hidden="true">notifications</span>Notifikasi</a>
    <a class="sidebar__item" href="#sb2"><span class="ic" aria-hidden="true">lock</span>Kata sandi dan masuk</a>
  </nav>
  <div class="section" id="sb2">
    <div class="section__head"><h2>Profil</h2><p class="section__sub">Cara nama dan foto Anda tampil bagi petugas layanan.</p></div>
  </div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `aria-current="page"` | Teks aksen dengan ketebalan 500 dan ikon terisi; sorotan berada di belakangnya. |
| `hover` | Tint tenang pada item. |
| `focus` | Focus ring sistem. |

## Gerak dan mikrointeraksi
- Sorotan: satu `.sidebar__hl` bergeser dengan `--spring-smooth` selama `--d-smooth` (560 ms); klik kedua di tengah luncuran mengalihkan tujuannya dengan mulus. Warna teks item berubah halus selama `--d-fast`.
- Atur posisi awal tanpa transisi (`transition: none` selama satu frame) agar sorotan tidak terbang masuk saat dimuat.
- Reduced motion: sorotan bergerak dalam 120 ms linear.

## Aksesibilitas
- `<nav aria-label>`; item berupa tautan jika mengubah URL, tombol jika mengganti konten di tempat.
- Tandai item aktif dengan `aria-current="page"`, tidak hanya dengan sorotan.
- Badge dibacakan sebagai bagian nama; buat berupa angka yang bermakna.

## Lakukan
- Pakai satu sorotan dan geser; jangan pernah memberi tint pada tiap item sendiri-sendiri.
- Buat daftarnya pendek (kurang dari sepuluh item) dan labelnya beberapa kata saja.

## Hindari
- Memakai sidebar sebagai kerangka aplikasi; itu tugas [app shell](app-shell.md).
- Menaruh sidebar di dalam sidebar app shell.
- Menciutkannya menjadi ikon saja; labellah yang membuatnya mudah dipindai.

## Perilaku (HTML biasa)
Tidak ada. Pindahkan `aria-current` dan atur `transform: translateY(<offsetTop>px)` pada `.sidebar__hl` dari kode Anda. [App shell](app-shell.md) melakukannya sendiri untuk navigasi utama.

## Terkait
[App shell](app-shell.md) · [Outline](outline.md) · [Sliding indicator](sliding-indicator.md) · [Layout primitives](layout-primitives.md)
