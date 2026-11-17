# Site footer

Kelompok: Promosi. https://lampung.kartadinata.app/docs/components/site-footer

Bagian bawah situs layanan atau situs konten: nama layanan dan satu baris tentangnya, kelompok tautan yang memang ada, dan baris bawah untuk cetakan kecil dan kontrol tampilan.

## Pakai saat
- Setiap halaman situs landing, layanan atau dokumentasi yang memakai [top nav](top-nav.md).

## Pakai yang lain saat
- Di dalam aplikasi dengan sidebar: pakai [App shell](app-shell.md). Tautan pengaturan dan ketentuan ada di footer sidebar atau menu akun.
- Ajakan penutup: pakai [CTA band](cta-band.md).

## Letaknya
Elemen terakhir di `<body>`, setelah `<main>`. Lebar dan gutter sama dengan [marketing section](marketing-section.md). Merek memakai 2 dari 5 kolom mulai 760 px; kelompok tautan terlipat dengan lebar 104 px masing-masing, jadi tiga kelompok muat di ponsel.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `footer.site-footer` | Wajib. Garis tipis di atas. |
| `.site-footer__top` | Merek dan kelompok tautan. |
| `.site-footer__brand` | `.site-footer__name` dan `p.site-footer__about`. |
| `nav.site-footer__nav` | `nav` dengan `aria-label="Footer"`. |
| `.site-footer__group` | `h2` kecil dan `ul` berisi tautan. Hanya kelompok yang benar-benar dimiliki situs. |
| `.site-footer__bottom` | Cetakan kecil (hak cipta, keterangan contoh, ketentuan) dan kontrol tampilan. |

## Markup

**Tiga kelompok dan kontrol tampilan.** Tautan setinggi 32 px dengan pointer dan 44 px di layar sentuh.
```html
<footer class="site-footer" style="width: 100%;">
  <div class="site-footer__top">
    <div class="site-footer__brand"><span class="site-footer__name">Layanan Warga</span><p class="site-footer__about">Perizinan, pajak daerah dan laporan warga dalam satu tempat.</p></div>
    <nav class="site-footer__nav" aria-label="Footer">
      <div class="site-footer__group"><h2>Layanan</h2><ul><li><a href="#">Perizinan</a></li><li><a href="#">Pajak daerah</a></li></ul></div>
      <div class="site-footer__group"><h2>Bantuan</h2><ul><li><a href="#">Panduan</a></li><li><a href="#">Hubungi kami</a></li></ul></div>
      <div class="site-footer__group"><h2>Ketentuan</h2><ul><li><a href="#">Syarat penggunaan</a></li><li><a href="#">Privasi</a></li></ul></div>
    </nav>
  </div>
  <div class="site-footer__bottom">
    <p>© 2026 Layanan Warga. Konten contoh.</p>
    <div class="seg" role="group" aria-label="Tampilan" data-lds-segmented style="width: 200px;"><span class="seg__thumb"></span><button class="seg__btn" aria-pressed="true" data-lds-theme="light"><span class="ic ic--sm" aria-hidden="true">light_mode</span>&nbsp;Terang</button><button class="seg__btn" aria-pressed="false" data-lds-theme="dark"><span class="ic ic--sm" aria-hidden="true">dark_mode</span>&nbsp;Gelap</button></div>
  </div>
</footer>
```

## Status
| Status | Caranya |
|---|---|
| `hover` | Teks tautan menjadi tegas, hanya di perangkat yang mendukung hover. |

## Gerak dan mikrointeraksi
- Hanya warna, selama `--d-fast`.

## Aksesibilitas
- Landmark `footer` dengan `nav` berlabel; judul kelompok berupa `h2` agar tampil di outline.
- Tautan setinggi 44 px di layar sentuh.

## Lakukan
- Cantumkan hanya halaman yang ada.
- Tulis keterangan contoh di cetakan kecil pada halaman demo.

## Hindari
- Mengisi empat kolom hanya karena templat punya empat.
- Mengulang seluruh top nav dan setiap anchor bagian.

## Terkait
[Top nav](top-nav.md) · [CTA band](cta-band.md) · [Marketing section](marketing-section.md) · [Theming](theming.md)
