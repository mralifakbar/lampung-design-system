# Button group

Kelompok: Aksi. https://lampung.kartadinata.app/docs/components/button-group

Dua sampai empat tombol yang menyatu dalam satu kotak bergaris, untuk aksi terpisah pada objek yang sama (urungkan, ulangi, riwayat). Setiap tombol menjalankan sesuatu; tidak ada yang tetap terpilih.

## Pakai saat
- Beberapa aksi milik satu objek yang dipakai bersamaan: urungkan dan ulangi, perkecil dan perbesar, sebelumnya dan berikutnya.
- Toolbar yang menyatukan tombol untuk menunjukkan bahwa mereka satu set dan menghemat ruang.

## Pakai yang lain saat
- Salah satu tombol tetap terpilih untuk menunjukkan tampilan saat ini: pakai [Segmented control](segmented-control.md). Grup menjalankan aksi; segmented control menyimpan pilihan.
- Setiap tombol menyalakan atau mematikan sebuah mode (tebal, miring): pakai [Toggle](toggle.md). Pakai toggle group: ia menunjukkan status tertekan.
- Satu aksi utama dengan beberapa variannya: pakai [Split button](split-button.md).
- Aksi yang tidak berhubungan dan hanya kebetulan berdekatan: pakai [Layout primitives](layout-primitives.md). Beri jarak antartombol dengan `cluster`.
- Lebih dari empat aksi: pakai [Dropdown menu](dropdown-menu.md). Simpan dua yang paling sering dipakai di grup dan pindahkan sisanya ke menu lainnya.

## Letaknya
Di toolbar dan header halaman atau kartu, sejajar dengan kontrol ukuran sedang (36 px) lainnya. Di ponsel batasi paling banyak tiga, atau pindahkan ke menu lainnya; grup tidak turun baris.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.btn-group` | Wajib. Kotak bergaris, radius 10 px, memotong isinya. Beri `role="group"` dan `aria-label`. |
| `.btn.btn--md` | Wajib. Dua sampai empat tombol, tinggi 36 px, tanpa kelas varian: grup yang mengatur tampilannya. Garis tipis memisahkan tombol yang bersebelahan. |
| `.ic` | Ikon opsional di depan setiap tombol. |

## Markup

**Riwayat suntingan.** Tiga aksi pada dokumen yang sama.
```html
<div class="btn-group" role="group" aria-label="Riwayat suntingan">
  <button class="btn btn--md"><span class="ic" aria-hidden="true">undo</span>Urungkan</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">redo</span>Ulangi</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">history</span>Riwayat</button>
</div>
```

**Sebelumnya dan berikutnya.** Menelusuri berkas di layar pemeriksaan permohonan, di samping jumlah berkas.
```html
<div class="cluster" style="--gap: 12px;">
  <span class="card__sub" style="margin: 0;">Berkas 4 dari 40</span>
  <div class="btn-group" role="group" aria-label="Berkas">
    <button class="btn btn--md"><span class="ic" aria-hidden="true">chevron_left</span>Sebelumnya</button>
    <button class="btn btn--md">Berikutnya<span class="ic" aria-hidden="true">chevron_right</span></button>
  </div>
</div>
```

## Status
| Status | Caranya |
|---|---|
| `hover` | `--bg-tint` hanya di belakang tombol yang disorot. |
| `:active` | Tanpa skala (akan merusak tepi yang menyatu); tombol terisi `--bg-tint-strong`. |
| `disabled` | `disabled` pada satu tombol (ulangi saat tidak ada yang bisa diulangi) meredupkannya ke 38 %. |

## Gerak dan mikrointeraksi
- Tombol dalam grup tidak mengecil saat ditekan; `transform` dimatikan agar garis tepi tetap lurus. Umpan baliknya adalah isian `--bg-tint-strong` yang langsung muncul.
- Isian hover berubah selama `--d-fast` dengan `--ease-standard`.

## Aksesibilitas
- `role="group"` dengan `aria-label` yang menamai set tersebut ("Riwayat suntingan").
- Setiap anak adalah `<button>` biasa yang dicapai dengan Tab; jangan tambahkan navigasi tombol panah (itu untuk toggle group dan segmented control).
- Tombol hanya ikon di dalam grup masing-masing perlu `aria-label`.

## Lakukan
- Buat label pendek dan sejajar ("Urungkan", "Ulangi").
- Pakai ukuran sedang; grup dirancang untuk tombol 36 px.

## Hindari
- Memakai grup sebagai tab atau pengganti tampilan.
- Menaruh varian primary atau danger di dalam grup.
- Menaruh tombol terpisah dengan tinggi yang sama tepat di samping grup; beri jarak dengan `cluster`.

## Terkait
[Segmented control](segmented-control.md) · [Toggle](toggle.md) · [Split button](split-button.md) · [Button](button.md)
