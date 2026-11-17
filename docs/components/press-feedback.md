# Press feedback

Kelompok: Gerak. https://lampung.kartadinata.app/docs/components/press-feedback

Kontrol menanggapi tepat saat jari atau mouse turun: ia sedikit tenggelam dalam 90 ms dan memantul kembali saat dilepas. Kedalamannya mengikuti ukuran, jadi elemen kecil tenggelam lebih dalam dan elemen lebar nyaris tidak bergerak. Setiap kontrol sistem sudah melakukannya; Anda cukup memilih kontrol yang tepat.

## Pakai saat
- Kontrol apa pun yang bisa diketuk: sudah terpasang. Pakai kelas sistem dan tekanannya ikut datang.
- Memeriksa permukaan ketuk khusus yang Anda tambahkan ke sistem: beri kedalaman sesuai ukurannya dari tabel di bawah.

## Pakai yang lain saat
- Hasil tekanan perlu disampaikan (Tersimpan, Terkirim): pakai [Text morph](text-morph.md).
- Tekanan yang ditolak (kode salah, kolom kosong): pakai [Shake](shake.md).
- Tekanan yang berbahaya dan harus disengaja: pakai [Hold to confirm](hold-to-confirm.md).
- Penanda yang berpindah ke pilihan yang ditekan: pakai [Sliding indicator](sliding-indicator.md).
- Getaran sentuh di ponsel sebagai tambahan visual: pakai [Haptics](haptics.md).

## Letaknya
Pada elemen yang ditekan itu sendiri, jangan pada kontainernya atau halamannya. Tombol di dalam kartu tenggelam; kartunya tidak.

## Markup

**Tombol.** Tekan dan tahan setiap tombol. Tombol standar tenggelam ke 0,97; tombol lebar penuh dan besar ke 0,985 agar gerakannya sama besar dalam piksel; pemicu menu tidak tenggelam karena menu yang terbuka sudah menjadi umpan baliknya; icon button tenggelam ke 0,9 dengan warna tipis.
```html
<div class="docs-row">
  <button class="btn btn--primary">Kirim laporan</button>
  <button class="btn btn--secondary">Pratinjau</button>
  <button class="btn btn--gray btn--md" aria-haspopup="menu">Urutkan<span class="ic" aria-hidden="true">expand_more</span></button>
  <button class="icon-btn" aria-label="Simpan ke penanda"><span class="ic" aria-hidden="true">bookmark</span></button>
  <button class="icon-btn icon-btn--filled" aria-label="Bagikan"><span class="ic" aria-hidden="true">share</span></button>
</div>
<div class="docs-col" style="max-width: 360px; margin-top: 12px;"><button class="btn btn--primary btn--block">Mulai permohonan</button></div>
```

**Baris daftar.** Baris tidak berubah skala; baris langsung terisi warna tekan. Mengubah skala baris selebar penuh akan menggeser tepinya terhadap daftar.
```html
<div class="list" style="width: 100%; max-width: 420px;">
  <a class="lrow lrow--icon" href="#"><span class="lrow__icon"><span class="ic" aria-hidden="true">person</span></span><span class="lrow__body"><span class="lrow__title">Profil</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Notifikasi</span></span><span class="lrow__value">Aktif</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#"><span class="lrow__icon" style="background: var(--neutral);"><span class="ic" aria-hidden="true">lock</span></span><span class="lrow__body"><span class="lrow__title">Privasi</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
</div>
```

**Kartu.** Kartu yang bisa diketuk dan kartu radio tenggelam ke 0,985: cukup terasa, tidak cukup untuk menggeser grid. Kartu diam (bukan tautan) tidak bergerak sama sekali.
```html
<div class="docs-col" style="max-width: 420px;">
  <a class="card card--link" href="#"><span class="card__title" style="display: block;">Izin usaha mikro</span><span class="card__sub" style="display: block;">5 langkah, 3 dokumen</span></a>
  <div role="radiogroup" aria-label="Cara pengambilan" class="docs-col">
    <button class="rcard" role="radio" aria-checked="true" onclick="this.parentElement.querySelectorAll('.rcard').forEach((r) => r.setAttribute('aria-checked', String(r === this)))"><span class="radio__dot"></span><span><span class="rcard__title" style="display: block;">Ambil di loket</span><span class="rcard__sub" style="display: block;">Siap dalam 3 hari kerja</span></span><span class="rcard__price">Rp 0</span></button>
    <button class="rcard" role="radio" aria-checked="false" onclick="this.parentElement.querySelectorAll('.rcard').forEach((r) => r.setAttribute('aria-checked', String(r === this)))"><span class="radio__dot"></span><span><span class="rcard__title" style="display: block;">Dikirim ke rumah</span><span class="rcard__sub" style="display: block;">Tiba 2 sampai 4 hari setelah terbit</span></span><span class="rcard__price">Rp 15.000</span></button>
  </div>
</div>
```

**Chip, toggle, dan checkbox.** Target kecil tenggelam lebih dalam agar tekanannya terlihat di bawah jari: chip 0,95, toggle 0,94, checkbox dan radio 0,88. Perubahan state (isi, centang, warna) menyusul saat dilepas.
```html
<div class="chip-row">
  <button class="chip" aria-pressed="true" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic chip__check" aria-hidden="true">check</span>Jalan</button>
  <button class="chip" aria-pressed="false" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic chip__check" aria-hidden="true">check</span>Drainase</button>
  <button class="chip" aria-pressed="false" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic chip__check" aria-hidden="true">check</span>Penerangan</button>
</div>
<div class="toggle-group" role="group" aria-label="Gaya teks">
  <button class="toggle" aria-pressed="false" aria-label="Tebal" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic" aria-hidden="true">format_bold</span></button>
  <button class="toggle" aria-pressed="false" aria-label="Miring" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic" aria-hidden="true">format_italic</span></button>
  <button class="toggle" aria-pressed="false" aria-label="Garis bawah" onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"><span class="ic" aria-hidden="true">format_underlined</span></button>
</div>
<label class="check"><input type="checkbox"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">Ingatkan saya sehari sebelumnya</span></label>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `scale(0.97)` | Bawaan `.btn`. Tekan dalam 90 ms dengan `--ease-standard`. |
| `scale(0.985)` | `.btn--block`, `.btn--lg`, `.card--link`, `.rcard`, `.link-card`: target lebar. |
| `none` | `.btn[aria-haspopup]`, `.btn-group .btn`, split button: menu atau latar grup adalah umpan baliknya. |
| `scale(0.94 to 0.96)` | `.toggle`, `.like`, `.xbar__btn` (0,94); `.chip` (0,95); `.confirm__arm` (0,96). |
| `scale(0.9) + tint` | `.icon-btn`, `.composer__send`. |
| `scale(0.85 to 0.92)` | `.check__box`, `.radio__dot`, `.control__btn`, tombol stepper, `.cal__day` (0,88); `.tabbar__item .ic` (0,86); `.star` (0,85); `.pager__btn` (0,92). |
| `tint, no scale` | `button.lrow`, `a.lrow`, `.shell__link`, `.menu__item`, baris tabel: baris selebar penuh. |
| `opacity 0.6` | `.seg__btn`: thumb adalah umpan balik pilihannya. |

## Gerak dan mikrointeraksi
- Tekan: `transform: scale(…)` dengan `transition-duration: 90ms` dan `--ease-standard`, dipicu oleh `:active`, sehingga dimulai saat pointer turun.
- Lepas: kembali ke `none` dengan `--spring-snappy` selama `--d-snappy` (360 ms). Kontrol sudah bisa dipakai selama spring berjalan.
- Interupsi: ketukan cepat memutar tenggelam yang dangkal dan spring menangkapnya di tengah jalan; tekanan yang tergeser keluar dari kontrol dilepas dengan cara yang sama. Tidak ada yang menunggu tekanan selesai.
- Baris diberi warna (`--bg-tint-strong`) alih-alih berubah skala; warnanya tidak punya transisi masuk, jadi langsung tampil.
- Reduced motion: tenggelamnya tetap terjadi tetapi dalam 120 ms linear, tanpa spring; ini perubahan ukuran 3%, bukan perpindahan, jadi tetap dipertahankan.

## Aksesibilitas
- Tekanan keyboard (Spasi, Enter) juga memicu `:active` pada tombol, sehingga pengguna keyboard mendapat umpan balik yang sama.
- Press feedback bukan state. State yang menyusul (ditekan, dicentang, dipilih) tetap butuh atribut ARIA-nya (`aria-pressed`, `aria-checked`).
- Pertahankan area sentuh 44 px meskipun tampilannya lebih kecil; ruang di sekitar kontrol kecil adalah bagian dari targetnya.

## Lakukan
- Pakai kontrol sistem; tekanannya ikut datang.
- Sesuaikan kedalaman dengan ukuran saat menambahkan elemen ketuk baru ke sistem: makin kecil, makin dalam.
- Beri baris warna, bukan skala.

## Hindari
- Menambahkan transform `:active` sendiri ke komponen sistem.
- Menunggu `click` (saat dilepas) untuk menampilkan umpan balik apa pun.
- Mengubah skala kartu yang bukan tautan, atau seluruh daftar.
- Menambahkan efek ripple atau glow saat ditekan.

## Perilaku (HTML biasa)
Tidak ada. Murni CSS pada `:active`.

## Terkait
[Button](button.md) · [Motion principles](motion-principles.md) · [Haptics](haptics.md) · [Icon button](icon-button.md)
