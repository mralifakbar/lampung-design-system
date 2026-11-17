# Check matrix

Kelompok: Tampilan data. https://lampung.kartadinata.app/docs/components/check-matrix

Grid kotak centang: hal yang diputuskan di baris, dikelompokkan per area, dan pilihan di kolom. Header dan kolom pertama tetap di tempat saat kotaknya digulir, dan setiap area punya satu kotak centang per kolom untuk semuanya.

## Pakai saat
- Izin per peran: peran mana yang boleh meneruskan laporan warga, menandatangani izin, mengekspor data.
- Notifikasi per kanal: peristiwa mana yang dikirim lewat email, push, dan SMS.
- Keputusan ya atau tidak untuk setiap pasangan dari dua daftar pendek (layanan per kantor kecamatan, berkas per jenis izin).

## Pakai yang lain saat
- Beberapa pilihan bebas untuk satu hal: pakai [Checkbox](checkbox.md).
- Pengaturan yang langsung berlaku, satu per baris: pakai [Switch](switch.md).
- Pilihan layanan yang dibandingkan berdampingan, hanya dibaca: pakai [Compare table](compare-table.md).
- Catatan berisi nilai, bukan pilihan: pakai [Data table](data-table.md).

## Letaknya
Selebar kolom isi, di dalam `.matrix-box`. Beri kotaknya tinggi (`--h`) bila barisnya panjang agar header tetap terlihat; di ponsel kotak bergulir ke samping dengan kolom pertama tetap. Simpan perubahan dengan tombol di sebelahnya bila pilihannya berdampak besar; selain itu simpan setiap perubahan dan konfirmasi dengan [toast](toast.md).

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.matrix-box` | Wajib. Kotak gulir: putih, ring, radius besar. `--h` mengatur tinggi maksimum. Beri `tabindex="0"`, `role="region"`, dan `aria-label` agar pengguna keyboard bisa menggulirnya. |
| `table.matrix[data-lds-matrix]` | Wajib. Tabel asli dengan `caption` (boleh `sr-only`). `--min` mengatur lebar di bawah mana tabel bergulir (560 px), `--first` kolom pertama (220 px), `--col` setiap kolom pilihan (112 px). |
| `thead th` | Pilihannya (peran, kanal), menempel di atas dengan isian tenang. `.matrix__sub` di bawah nama untuk jumlah. |
| `tr.matrix__group[data-group]` | Baris judul area: `th[scope=rowgroup]` dan satu `input[data-lds-matrix-all]` per kolom. |
| `tr[data-group] > th[scope=row]` | Wajib. Hal yang diputuskan, menempel di kiri, dengan baris `.matrix__sub` opsional. |
| `td > .check` | Wajib. Satu [checkbox](checkbox.md) per sel dengan `aria-label` yang menyebut keduanya ("Admin: Teruskan laporan"). Seluruh sel menjadi area klik. |

## Markup

**Izin per peran.** Centang satu sel, atau centang area untuk satu kolom penuh: kotak area menampilkan campuran bila hanya sebagian yang aktif. Kepala dinas dikunci. Gulir kotaknya: header dan nama izin tetap di tempat.
```html
<div class="matrix-box" tabindex="0" role="region" aria-label="Izin per peran, bisa digulir" style="--h: 360px;">
  <table class="matrix" data-lds-matrix>
    <caption class="sr-only">Izin per peran</caption>
    <thead><tr><th scope="col">Izin</th><th scope="col">Kepala dinas <span class="ic" aria-label="Dikunci">lock</span></th><th scope="col">Admin</th><th scope="col">Verifikator</th><th scope="col">Petugas loket</th></tr></thead>
    <tbody>
      <tr class="matrix__group" data-group="complaints"><th scope="rowgroup">Pengaduan</th><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Pengaduan untuk Kepala dinas"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Pengaduan untuk Admin"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Pengaduan untuk Verifikator"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Pengaduan untuk Petugas loket"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="complaints"><th scope="row">Teruskan laporan<span class="matrix__sub">Kirim laporan ke petugas kelurahan</span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Kepala dinas: Teruskan laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Admin: Teruskan laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Verifikator: Teruskan laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Petugas loket: Teruskan laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="complaints"><th scope="row">Tutup laporan<span class="matrix__sub">Tandai laporan sebagai selesai</span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Kepala dinas: Tutup laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Admin: Tutup laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Verifikator: Tutup laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Petugas loket: Tutup laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="complaints"><th scope="row">Hapus laporan<span class="matrix__sub"></span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Kepala dinas: Hapus laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Admin: Hapus laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Verifikator: Hapus laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Petugas loket: Hapus laporan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr class="matrix__group" data-group="permits"><th scope="rowgroup">Perizinan</th><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Perizinan untuk Kepala dinas"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Perizinan untuk Admin"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Perizinan untuk Verifikator"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Perizinan untuk Petugas loket"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="permits"><th scope="row">Verifikasi berkas<span class="matrix__sub"></span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Kepala dinas: Verifikasi berkas"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Admin: Verifikasi berkas"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Verifikator: Verifikasi berkas"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Petugas loket: Verifikasi berkas"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="permits"><th scope="row">Tanda tangani izin<span class="matrix__sub">Izin langsung terbit setelah ditandatangani</span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Kepala dinas: Tanda tangani izin"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Admin: Tanda tangani izin"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Verifikator: Tanda tangani izin"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Petugas loket: Tanda tangani izin"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr class="matrix__group" data-group="reports"><th scope="rowgroup">Laporan</th><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Laporan untuk Kepala dinas"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Laporan untuk Admin"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Laporan untuk Verifikator"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="Semua izin Laporan untuk Petugas loket"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="reports"><th scope="row">Lihat dasbor<span class="matrix__sub"></span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Kepala dinas: Lihat dasbor"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Admin: Lihat dasbor"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Verifikator: Lihat dasbor"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Petugas loket: Lihat dasbor"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="reports"><th scope="row">Ekspor data<span class="matrix__sub">CSV dan PDF</span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Kepala dinas: Ekspor data"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Admin: Ekspor data"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Verifikator: Ekspor data"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Petugas loket: Ekspor data"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
    </tbody>
  </table>
</div>
```

**Notifikasi per kanal.** Grid yang sama dengan kanal sebagai kolom, tanpa area. Setiap perubahan langsung tersimpan.
```html
<div class="matrix-box" tabindex="0" role="region" aria-label="Notifikasi per kanal, bisa digulir" style="max-width: 520px;">
  <table class="matrix" data-lds-matrix style="--min: 420px; --first: 180px; --col: 88px;">
    <caption class="sr-only">Notifikasi per kanal</caption>
    <thead><tr><th scope="col">Peristiwa</th><th scope="col">Email</th><th scope="col">Push</th></tr></thead>
    <tbody>
      <tr><th scope="row">Laporan baru</th><td><label class="check"><input type="checkbox" checked aria-label="Email: Laporan baru"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Push: Laporan baru"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr><th scope="row">Ditugaskan ke saya</th><td><label class="check"><input type="checkbox" checked aria-label="Email: Ditugaskan ke saya"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Push: Ditugaskan ke saya"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr><th scope="row">Ringkasan mingguan</th><td><label class="check"><input type="checkbox" checked aria-label="Email: Ringkasan mingguan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Push: Ringkasan mingguan"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
    </tbody>
  </table>
</div>
```

## Varian dan ukuran
| Kelas atau atribut | Kapan |
|---|---|
| `--h on .matrix-box` | Tinggi maksimum: kotak bergulir vertikal dan header menempel. |
| `--min / --first / --col on .matrix` | Lebar: di bawah `--min` kotak bergulir ke samping dengan kolom pertama tetap. |

## Status
| Status | Caranya |
|---|---|
| `checked / unchecked` | Centang [checkbox](checkbox.md) tergambar saat berubah. |
| `mixed` | Kotak area menampilkan garis (`.check.is-mixed`, `indeterminate`) bila hanya sebagian sel di kolomnya yang aktif. |
| `locked` | `disabled` pada sel (peran yang tidak boleh diubah siapa pun); jelaskan alasannya di header (ikon `lock` dengan label) atau catatan. |
| `changed` | `.is-changed` pada sel (`td`-nya) yang belum disimpan: ring aksen di sekeliling kotak. Hapus setelah disimpan. |
| `new column` | `.is-new` pada sel kolom yang baru ditambahkan: sel menyala dengan tint aksen sekali. |
| `hover` | Baris diberi tint di perangkat dengan pointer agar mata bisa mengikutinya. |

## Gerak dan mikrointeraksi
- Centang tergambar dengan `--ease-enter` (260 ms) dan menghilang dengan `--ease-exit` (160 ms), seperti [checkbox](checkbox.md); centang area menjalankan semua kotak di kolomnya sekaligus, tanpa jeda berurutan.
- Kolom baru menyala dengan tint aksen lalu memudar selama 1600 ms dengan `--ease-standard`, sekali saja.
- Tint baris saat hover muncul dalam 60 ms linear. Header dan kolom yang menempel tidak bergerak.
- Reduced motion: tanpa nyala; centang tetap berubah.

## Aksesibilitas
- Ini `table` asli: pilihan adalah `th[scope=col]`, hal yang diputuskan `th[scope=row]`, area `th[scope=rowgroup]`, dengan `caption`.
- Setiap kotak centang punya `aria-label` yang menyebut baris dan kolomnya ("Admin: Teruskan laporan"); kotak area berbunyi "Semua izin Pengaduan untuk Admin".
- Kotaknya bisa difokus dan berlabel agar pengguna keyboard bisa menggulirnya; Tab berpindah antar kotak centang sesuai urutan baca dan Space mencentang.
- Kolom yang dikunci menyatakannya dalam kata, bukan hanya dengan dibuat redup.

## Lakukan
- Kelompokkan baris per area bila jumlahnya lebih dari delapan.
- Tetapkan kolom pertama dan header; buat nama kolom singkat.
- Tunjukkan yang belum disimpan dan sediakan Batalkan di sebelah Simpan.

## Hindari
- Memakai switch di dalam sel; grid berisi switch terbaca seperti gangguan.
- Memasang lebih dari sekitar delapan kolom; pecah keputusannya.
- Menyembunyikan sel yang dikunci; tampilkan tercentang dan redup agar aturannya terlihat.

## Perilaku (HTML biasa)
`data-lds-matrix` pada tabel: kotak area mencentang atau mengosongkan kolomnya di area itu dan menampilkan campuran, tercentang, atau nonaktif sesuai selnya; event `lds:change` (bubbles) membawa `{ input, changed }` setelah setiap perubahan oleh orang. Setelah mengubah sel dari kode, panggil `matrixRefresh(table)`.

## Terkait
[Checkbox](checkbox.md) · [Table](table.md) · [Compare table](compare-table.md) · [Switch](switch.md)
