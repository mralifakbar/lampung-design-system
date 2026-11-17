# Icon swap

Kelompok: Mikrointeraksi. https://lampung.kartadinata.app/docs/components/icon-swap

Satu glyph berubah menjadi glyph lain di tempatnya: yang lama mengecil ke setengah dan memudar kabur, sementara yang baru mendarat dengan spring yang sigap. Untuk ikon yang menyatakan status baru (tersalin, diputar, tersimpan), bukan untuk hiasan.

## Pakai saat
- Tombol salin mengonfirmasi berhasil: `content_copy` berubah menjadi `check` selama 1,6 detik ([tombol salin](copy-button.md) melakukannya).
- Toggle yang ikonnya menyebut status: putar dan jeda, tandai dan tersimpan, tampilkan dan sembunyikan kata sandi.
- Tombol ikon yang aksinya berubah setelah dipakai: buka dan tutup saat labelnya tidak tampil.

## Pakai yang lain saat
- Kata yang berubah (Simpan, Tersimpan): pakai [Text morph](text-morph.md).
- Dukungan dengan jumlah dan perayaan: pakai [Like](like.md).
- Ikon menu ke ikon tutup: pakai [Menu icon](menu-icon.md). Tiga garisnya melipat, bukan bertukar.
- Chevron yang berputar bersama panel yang terbuka: pakai [Height expand](height-expand.md). Putar dengan spring yang sama dengan panelnya.
- Status terpilih yang hanya mengisi ikon (tab bar, sidebar): pakai [Sliding indicator](sliding-indicator.md).

## Letaknya
Di dalam tombol: [tombol ikon](icon-button.md), tombol polos kecil di samping label, bilah blok kode. Kotak swap berukuran 20 px; kedua glyph berada di sel grid yang sama.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.swap` | Wajib. Grid inline `aria-hidden`, 20 × 20. |
| `.swap__a` | Wajib. Glyph saat diam. |
| `.swap__b` | Wajib. Glyph lainnya (tambahkan `ic--fill` untuk status terisi). |
| `.is-swapped` | Pada `.swap`: menampilkan `swap__b`. |

## Markup

**Salin, lalu tersalin.** Tekan salin: ikon menjadi centang dan labelnya berbunyi Disalin, lalu keduanya kembali setelah 1,6 detik.
```html
<div class="codeblock" style="width: 100%; max-width: 420px;"><div class="codeblock__bar"><span>Instalasi</span><button class="btn btn--plain btn--sm" data-lds-copy="npm install lampung-design-system"><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b">check</span></span><span data-lds-copy-label="Disalin">Salin</span></button></div><pre>npm install lampung-design-system</pre></div>
<button class="icon-btn" aria-label="Salin tautan undangan" data-lds-copy="https://example.id/musrenbang/way-halim"><span class="swap" aria-hidden="true"><span class="ic swap__a">link</span><span class="ic swap__b">check</span></span></button>
```

**Putar dan jeda.** Rekaman sosialisasi. Ikonnya adalah status, jadi ikon itu bertukar; labelnya ikut berubah untuk pembaca layar.
```html
<button class="icon-btn icon-btn--accent" aria-pressed="false" aria-label="Putar rekaman" onclick="this.querySelector('.swap').classList.toggle('is-swapped'); const p = this.getAttribute('aria-pressed') !== 'true'; this.setAttribute('aria-pressed', String(p)); this.setAttribute('aria-label', p ? 'Jeda rekaman' : 'Putar rekaman');"><span class="swap" aria-hidden="true"><span class="ic swap__a">play_arrow</span><span class="ic swap__b">pause</span></span></button>
<span class="card__sub">Sosialisasi pajak daerah, 48 menit</span>
```

**Simpan untuk nanti.** Menandai sebuah layanan: ikon garis bertukar ke ikon terisi. Sengaja tenang; tanpa jumlah dan tanpa ledakan.
```html
<button class="icon-btn" aria-pressed="false" aria-label="Simpan layanan" onclick="this.querySelector('.swap').classList.toggle('is-swapped'); const p = this.getAttribute('aria-pressed') !== 'true'; this.setAttribute('aria-pressed', String(p)); this.setAttribute('aria-label', p ? 'Layanan tersimpan' : 'Simpan layanan');"><span class="swap" aria-hidden="true"><span class="ic swap__a">bookmark</span><span class="ic ic--fill swap__b">bookmark</span></span></button>
<button class="icon-btn" aria-pressed="false" aria-label="Tampilkan kata sandi" onclick="this.querySelector('.swap').classList.toggle('is-swapped'); const p = this.getAttribute('aria-pressed') !== 'true'; this.setAttribute('aria-pressed', String(p)); this.setAttribute('aria-label', p ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');"><span class="swap" aria-hidden="true"><span class="ic swap__a">visibility</span><span class="ic swap__b">visibility_off</span></span></button>
```

## Gerak dan mikrointeraksi
- Glyph yang pergi: ke `scale(0.5)` dengan `blur(4px)` dan opacity 0; opacity dan blur selama `--d-fast` (160 ms) dengan `--ease-standard`, skala dengan `--spring-snappy`.
- Glyph yang datang: dari keadaan yang sama ke `none` dengan `--spring-snappy` (`--d-snappy`, 360 ms) sambil muncul perlahan selama `--d-fast`. Keduanya berjalan bersamaan, jadi pertukaran terbaca sebagai satu objek yang berubah.
- Interupsi: mengubah `.is-swapped` lagi di tengah pertukaran membalikkan kedua glyph dari posisi saat ini.
- Reduced motion: cross-fade 120 ms tanpa skala.

## Aksesibilitas
- Swap diberi `aria-hidden`. Tombolnya yang membawa makna: `aria-pressed` untuk toggle, dan `aria-label` yang menyebut aksi yang kini tersedia ("Jeda rekaman").
- Salin tidak mengumumkan apa pun dengan sendirinya; bila penting, pertahankan label terlihat yang berubah (`data-lds-copy-label`) atau tambahkan status polite.

## Lakukan
- Tukar dua glyph yang menyatakan dua status dari hal yang sama.
- Ubah `aria-label` atau `aria-pressed` bersama glyph-nya.
- Pakai `ic--fill` pada `swap__b` untuk status "aktif" yang terisi.

## Hindari
- Memutar atau membalik ikon untuk menukarnya.
- Menukar ikon saat hover.
- Memakai swap untuk menu ke tutup; pakai [menu icon](menu-icon.md).

## Perilaku (HTML biasa)
Hanya CSS: pasang atau lepas `.is-swapped` pada `.swap`. `[data-lds-copy]` melakukannya untuk tombol salin (dan mengembalikannya setelah 1,6 detik, dengan `data-lds-copy-label` untuk label yang terlihat).

## Terkait
[Copy button](copy-button.md) · [Icon button](icon-button.md) · [Toggle](toggle.md) · [Text morph](text-morph.md)
