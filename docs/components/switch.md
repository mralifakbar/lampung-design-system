# Switch

Kelompok: Pilihan. https://lampung.kartadinata.app/docs/components/switch

Kontrol nyala dan mati untuk pengaturan yang berlaku saat itu juga ketika diubah, tanpa tombol Simpan. Thumb meregang selama ditahan dan berpindah dengan spring.

## Pakai saat
- Pengaturan yang langsung berlaku: notifikasi, suara, dark mode, tampilkan nomor antrean di layar kunci.
- Daftar pengaturan di ponsel (switch kecil di akhir baris daftar).
- Menyalakan fitur dengan penjelasan singkat di bawah label (`.switch__text` dengan `small`).

## Pakai yang lain saat
- Pilihan yang disimpan nanti bersama formulir: pakai [Checkbox](checkbox.md). Switch menyiratkan efek langsung.
- Memilih di antara dua status bernama (Terang, Gelap; Daftar, Grid): pakai [Segmented control](segmented-control.md).
- Status tertekan pada tombol toolbar (tebal, bisukan): pakai [Toggle](toggle.md).
- Menyetujui syarat: pakai [Checkbox](checkbox.md).
- Beberapa filter yang berlaku bersama: pakai [Chips](chips.md).

## Letaknya
Di pengaturan: satu per baris dalam kolom, atau di akhir `.lrow` di [list](list.md) inset pada ponsel (pakai `switch--sm` di sana). Di layar lebar dekatkan label dengan switch; jangan pernah menaruh switch di ujung kanan baris yang sangat lebar dengan label di ujung kiri.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `label.switch` | Wajib. Membungkus input, lintasan, dan teks; seluruh baris mengubahnya. Pakai `<span class="switch">` saat barisnya (`label.lrow`) yang menjadi label. |
| `input[type=checkbox][role=switch]` | Wajib. Checkbox bawaan yang diumumkan sebagai switch, tak terlihat di atas lintasan. |
| `.switch__track` | Wajib. 51 kali 31, abu-abu saat mati, aksen saat menyala. `aria-hidden`. |
| `.switch__thumb` | Wajib. Thumb putih 27 px di dalam lintasan. |
| `.switch__text` | Opsional. Teks label dengan baris kedua `small` yang menjelaskan efeknya. |

## Markup

**Dengan penjelasan.** Tekan dan tahan: thumb melebar ke arah tujuannya, lalu berpindah dengan spring halus dan meregang sekali saat mendarat.
```html
<div class="stack" style="--gap: 16px;">
  <label class="switch"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__text">Pengingat jadwal layanan<small>15 menit sebelum jadwal kunjungan Anda</small></span></label>
  <label class="switch"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__text">Tampilkan nomor antrean di layar kunci<small>Sembunyikan jika Anda berbagi ponsel</small></span></label>
  <label class="switch"><input type="checkbox" role="switch" disabled><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__text">Sinkronkan dengan kalender kantor<small>Minta admin dinas untuk mengaktifkannya</small></span></label>
</div>
```

**Baris pengaturan di ponsel.** Baris daftar adalah labelnya, jadi mengetuk di mana saja pada baris mengubah switch kecil di ujungnya.
```html
<div class="list list--fill" style="max-width: 380px; width: 100%;">
  <label class="lrow lrow--icon"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Pengingat jadwal</span></span><span class="switch switch--sm"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span></span></label>
  <label class="lrow lrow--icon"><span class="lrow__icon" style="background: var(--tile-blue);"><span class="ic" aria-hidden="true">touch_app</span></span><span class="lrow__body"><span class="lrow__title">Getar saat disentuh</span></span><span class="switch switch--sm"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span></span></label>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `switch (default)` | 51 kali 31, untuk halaman pengaturan dan formulir. |
| `switch--sm` | 38 kali 23, untuk baris daftar dan panel padat. |

## Status
| Status | Caranya |
|---|---|
| `on (checked)` | Lintasan aksen (memudar masuk di atas abu-abu), thumb berpindah ke kanan. |
| `:active (held)` | Thumb melebar 6 px (4 px untuk ukuran kecil) ke arah tujuannya. |
| `.is-flip` | Ditambahkan JS di setiap perubahan: thumb meregang sekali saat mendarat. |
| `focus-visible` | Focus ring di sekitar lintasan. |
| `disabled` | Lintasan dengan opasitas 40 %; sebutkan alasannya di baris `small`. |

## Gerak dan mikrointeraksi
- Perpindahan: thumb bergerak dengan `transform` memakai `--spring-smooth` (560 ms); lapisan aksen memudar dalam `--d-standard` (240 ms) dengan `--ease-standard`, warna lintasan dalam `--d-fast`.
- Tahan: lebar bertambah 6 px dengan `--spring-snappy` (360 ms); melepas di tengah perjalanan mengarahkan ulang dari posisinya saat itu.
- Mendarat: `lds-stretch` menskalakan thumb ke 1.16 kali 0.94 lalu kembali dalam 340 ms dengan `--ease-standard`, apa pun yang mengubahnya (ketuk, tombol keyboard, klik label, kode).
- Dengan ikon lonceng di dalam label, lonceng berbunyi sekali saat dinyalakan ([bell](bell.md)).
- Reduced motion: transisi menjadi 120 ms linear dan efek regang dilewati.

## Aksesibilitas
- `<input type="checkbox" role="switch">` diumumkan sebagai "switch, nyala" atau "mati"; Spasi mengubahnya. Jangan pernah membangun switch dari `div`.
- Teks yang terlihat adalah namanya. Di baris daftar, `label.lrow` adalah label untuk input di dalamnya.
- Perubahan langsung berlaku; jika bisa gagal (panggilan ke server), kembalikan switch dan jelaskan di [toast](toast.md).

## Lakukan
- Labeli pengaturannya, bukan aksinya: "Pengingat jadwal", bukan "Nyalakan pengingat".
- Terapkan langsung dan tunjukkan hasilnya jika tidak jelas.

## Hindari
- Menaruh switch di formulir yang punya tombol Simpan.
- Mengubah teks label sesuai status ("Nyala" atau "Mati"); switch sudah menunjukkannya.
- Memakai switch untuk dua opsi bernama; pakai [segmented control](segmented-control.md).

## Perilaku (HTML biasa)
Otomatis untuk setiap `.switch input`: saat berubah ia menambahkan `.is-flip` untuk regangan saat mendarat (dan membunyikan `.bell` di dalamnya saat dinyalakan). Tidak perlu `data-lds-*`.

## React
```tsx
import { Switch } from 'lampung-design-system/react';

<Switch checked={reminders} onChange={setReminders} sub="15 menit sebelum jadwal kunjungan Anda">
  Pengingat jadwal
</Switch>
<Switch size="sm" checked={haptics} onChange={setHaptics}>Getar saat disentuh</Switch>
```

## Terkait
[Checkbox](checkbox.md) · [Segmented control](segmented-control.md) · [Toggle](toggle.md) · [List](list.md)
