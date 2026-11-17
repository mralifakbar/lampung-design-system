# Segmented control

Kelompok: Pilihan. https://lampung.kartadinata.app/docs/components/segmented-control

Dua sampai lima segmen sama lebar dengan satu thumb yang bergeser ke segmen terpilih. Untuk mengganti tampilan atau mode dari yang ada di layar saat itu; perubahannya langsung berlaku.

## Pakai saat
- Mengganti periode atau tampilan dari konten yang sama: Hari, Minggu, Bulan; Daftar, Grid; Grafik, Tabel.
- Mode dengan dua sampai empat status bernama yang langsung berlaku: Terang, Gelap, Sistem.
- Pilihan tunggal yang ringkas di toolbar atau header kartu.

## Pakai yang lain saat
- Setiap pilihan menampilkan panel konten berbeda (Ringkasan, Berkas, Riwayat): pakai [Tabs](tabs.md). Tab membawa semantik tab dan panel.
- Lebih dari lima opsi, atau label panjang: pakai [Select](select.md).
- Satu pengaturan nyala dan mati: pakai [Switch](switch.md).
- Pilihan yang disimpan bersama formulir dan butuh penjelasan: pakai [Radio](radio.md). Atau [radio card](radio-card.md)
- Beberapa opsi bisa menyala sekaligus (filter): pakai [Chips](chips.md).
- Baris aksi toolbar: pakai [Button group](button-group.md).

## Letaknya
Di atas atau di header konten yang diubahnya: di atas grafik atau daftar, di header kartu, di toolbar. Selebar layar di ponsel di bawah judul besar; di layar lebar sesuaikan dengan labelnya (sekitar 90 px per segmen) alih-alih merentang selebar halaman.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.seg` | Wajib. Lintasan cekung; `role="group"` dengan `aria-label`; `data-lds-segmented` untuk perilakunya. |
| `.seg__thumb` | Wajib. Thumb timbul di bawah segmen terpilih. JS menyetel lebarnya selebar satu segmen dan menggerakkannya. |
| `button.seg__btn` | Wajib. Satu segmen, sama lebar, `aria-pressed`. Pemisah tipis di antara tetangga yang tidak tertekan. |

## Markup

**Periode di atas grafik.** Klik sebuah segmen atau pakai tombol panah: thumb bergeser dengan spring dan bisa diarahkan ulang di tengah perjalanan.
```html
<div class="seg" role="group" aria-label="Periode" data-lds-segmented style="max-width: 320px; width: 100%;">
  <span class="seg__thumb"></span>
  <button type="button" class="seg__btn" aria-pressed="false">Hari</button>
  <button type="button" class="seg__btn" aria-pressed="true">Minggu</button>
  <button type="button" class="seg__btn" aria-pressed="false">Bulan</button>
</div>
```

**Besar, dengan ikon.** `seg--lg` (36 px) untuk kontrol utama sebuah tampilan, seperti penampilan.
```html
<div class="seg seg--lg" role="group" aria-label="Tampilan" data-lds-segmented style="max-width: 360px; width: 100%;">
  <span class="seg__thumb"></span>
  <button type="button" class="seg__btn" aria-pressed="true"><span class="ic ic--sm" aria-hidden="true" style="margin-right: 6px;">light_mode</span>Terang</button>
  <button type="button" class="seg__btn" aria-pressed="false"><span class="ic ic--sm" aria-hidden="true" style="margin-right: 6px;">dark_mode</span>Gelap</button>
  <button type="button" class="seg__btn" aria-pressed="false"><span class="ic ic--sm" aria-hidden="true" style="margin-right: 6px;">contrast</span>Sistem</button>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `seg (default)` | Segmen 30 px, label 13 px. Toolbar dan header kartu. |
| `seg--lg` | Segmen 36 px, label 14 px. Kontrol utama sebuah layar; bawaan `Segmented` di React. |

## Status
| Status | Caranya |
|---|---|
| `aria-pressed="true"` | Segmen terpilih: label semibold di atas thumb; pemisah di sampingnya disembunyikan. |
| `:active` | Label meredup ke 60 % selama ditekan. |
| `focus-visible` | Focus ring pada segmen yang difokus. |

## Gerak dan mikrointeraksi
- Thumb bergeser dengan `transform: translateX()` memakai `--spring-smooth` (560 ms). Pilihan baru selama perjalanan mengarahkan ulang dari posisi saat itu; tidak pernah melompat kembali. Lihat [sliding indicator](sliding-indicator.md).
- Pemisah di samping segmen terpilih memudar dalam `--d-fast` (160 ms).
- Thumb tetap memakai spring-nya bahkan saat tema berganti, sehingga kontrol penampilan tidak pernah tersentak.
- Reduced motion: thumb bergerak dalam 120 ms linear.

## Aksesibilitas
- `role="group"` dengan `aria-label`; segmen adalah `<button type="button">` dengan `aria-pressed`, sehingga masing-masing diumumkan sebagai toggle tertekan atau tidak tertekan.
- Tombol panah (Kiri, Kanan, Atas, Bawah) memindahkan pilihan dan fokus dengan berputar; Tab masuk ke setiap segmen.
- Saat segmen mengganti panel konten, pakai [tabs](tabs.md) agar `role="tab"` dan `aria-controls` menghubungkannya.
- Ikon bersifat dekoratif; teksnya adalah nama. Segmen hanya ikon butuh `aria-label`.

## Lakukan
- Batasi label pada satu atau dua kata pendek dengan panjang serupa.
- Terapkan perubahan langsung dan pertahankan pilihannya saat orang kembali.

## Hindari
- Memakainya untuk berpindah antarhalaman.
- Memasang lebih dari lima segmen, atau membiarkan label terpotong.
- Membangun sendiri kontrol thumb bergeser kedua; pakai ulang `.seg`.

## Perilaku (HTML biasa)
`data-lds-segmented` pada `.seg`: menyesuaikan thumb selebar satu segmen, memindahkannya ke segmen `aria-pressed="true"`, menangani klik dan tombol panah, dan memicu `lds:change` dengan `{ index, item }` pada kelompok.

## React
```tsx
import { Segmented } from 'lampung-design-system/react';

<Segmented
  label="Periode"
  value={period}
  onChange={setPeriod}
  size="md"
  options={[{ value: 'day', label: 'Hari' }, { value: 'week', label: 'Minggu' }, { value: 'month', label: 'Bulan' }]}
/>
```

## Terkait
[Tabs](tabs.md) · [Radio](radio.md) · [Switch](switch.md) · [Sliding indicator](sliding-indicator.md)
