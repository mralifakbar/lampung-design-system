# List stagger

Kelompok: Gerak. https://lampung.kartadinata.app/docs/components/list-stagger

Saat sekelompok butir tiba bersamaan, setiap butir menyusul butir sebelumnya dengan jeda 35 ms, memudar masuk dari blur 4 px dan naik 4 px. Seluruh rangkaian selesai di bawah 400 ms, sehingga daftar terbaca sebagai satu kedatangan yang punya arah, bukan iring-iringan yang lambat.

## Pakai saat
- Hasil pencarian atau hasil filter yang tiba setelah orang memintanya.
- Notifikasi atau pesan baru yang masuk bersamaan selama panel tertutup.
- Kartu-kartu dasbor pada pemuatan pertama dalam satu sesi.
- Butir menu atau sheet yang terbuka dengan daftar yang dibuat saat itu juga (hanya jika belum dirender sebelumnya).

## Pakai yang lain saat
- Satu butir yang bergabung ke daftar yang sudah ada: pakai [Enter and exit](enter-and-exit.md).
- Gambar dan ilustrasi yang muncul saat halaman di-scroll: pakai [Reveal on scroll](reveal-on-scroll.md). Punya stagger sendiri 30 ms, dibatasi sampai butir keempat.
- Daftar yang sama dirender ulang setelah diurutkan atau berubah sedikit: pakai [Motion principles](motion-principles.md). Jangan dianimasikan; cukup perbarui.
- Konten yang masih dimuat: pakai [Skeleton](skeleton.md).
- Riwayat obrolan panjang yang dibuka: pakai [Chat layout](chat-layout.md). Jangan pernah memberi stagger pada riwayat.

## Letaknya
Pada anak langsung dari daftar yang tiba: baris `.lrow`, `.card` dan kartu `.kpi` di dalam `auto-grid`, `.file-row`. Jangan pada kontainer daftar dan jangan pada bagian bertingkat di dalamnya.

## Markup

**Hasil pencarian yang tiba.** Hasil mengalir dari atas ke bawah: yang pertama langsung terbaca, yang terakhir sudah tiba pada 380 ms. Tekan Putar ulang.
```html
<!-- Sistem belum punya kelas stagger: keyframe dan token adalah kontraknya. -->
<a class="lrow" href="…" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 0ms;">…</a>
<a class="lrow" href="…" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 35ms;">…</a>
<!-- jeda = min(indeks, 4) × 35 ms: semua butir setelah butir kelima tiba bersama butir kelima -->
```

**Notifikasi yang masuk bersamaan.** Membuka panel setelah pagi yang sibuk: tiga notifikasi baru tiba berurutan, yang terbaru di atas.
```html
<div class="list" style="width: 100%; max-width: 440px;">
  <div class="lrow" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 0ms;"><span class="avatar" style="--size: 36px;">AP</span><span class="lrow__body"><span class="lrow__title">Ana Putri menanggapi laporan Anda</span><span class="lrow__sub">2 menit lalu</span></span></div>
  <div class="lrow" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 35ms;"><span class="avatar avatar--gray" style="--size: 36px;">RS</span><span class="lrow__body"><span class="lrow__title">Rizal Siregar memperbarui status perbaikan jalan</span><span class="lrow__sub">40 menit lalu</span></span></div>
  <div class="lrow" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 70ms;"><span class="avatar avatar--gray" style="--size: 36px;">BK</span><span class="lrow__body"><span class="lrow__title">Tagihan PBB tahun ini sudah terbit</span><span class="lrow__sub">1 jam lalu</span></span></div>
</div>
```

**Kartu dasbor pada pemuatan pertama.** Kartu KPI tiba dari kiri ke kanan sesuai urutan baca. Lakukan ini hanya pada pemuatan pertama dalam sesi; kembali ke halaman ini menampilkannya seketika.
```html
<div class="auto-grid" style="--min: 150px; width: 100%;">
  <article class="kpi" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 0ms;"><div class="kpi__head"><span class="kpi__label">Laporan hari ini</span></div><div class="kpi__value">128</div></article>
  <article class="kpi" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 35ms;"><div class="kpi__head"><span class="kpi__label">Menunggu tindak lanjut</span></div><div class="kpi__value">24</div></article>
  <article class="kpi" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 70ms;"><div class="kpi__head"><span class="kpi__label">Rata-rata waktu tanggap</span></div><div class="kpi__value">2,4 hari</div></article>
  <article class="kpi" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 105ms;"><div class="kpi__head"><span class="kpi__label">Selesai minggu ini</span></div><div class="kpi__value">96</div></article>
</div>
```

## Gerak dan mikrointeraksi
- Setiap butir: `lds-blur-in` (dari `translateY(4px)`, `blur(4px)`, transparan) selama `--d-standard` (240 ms) dengan `--ease-enter`, dengan `animation-fill-mode: both` sehingga butir tersembunyi sampai gilirannya.
- Jeda: `min(index, 4) × 35 ms`. Butir kelima dan seterusnya berbagi jeda 140 ms, sehingga rangkaian selesai pada 380 ms berapa pun panjang daftarnya.
- Urutan mengikuti urutan baca: atas ke bawah di daftar, kiri ke kanan lalu ke bawah di grid. Yang terbaru di atas pada feed.
- Diputar sekali saat tiba. Keyframe boleh dipakai di sini karena kedatangan tidak dibalik; jika daftar diganti lagi di tengah rangkaian, render butir baru dan biarkan rangkaiannya sendiri dimulai, jangan menunggu.
- Jangan beri stagger pada gerakan keluar: butir pergi bersamaan dalam 180 ms dengan `--ease-exit`, atau menutup ruangnya dengan [height expand](height-expand.md).
- Reduced motion: animasi berjalan dalam 1 ms, sehingga butir langsung muncul bersamaan.

## Aksesibilitas
- Konten sudah ada di DOM sejak awal; hanya penggambarannya yang ditunda, sehingga pembaca layar dan pencarian di halaman langsung menemukannya.
- Umumkan jumlah hasil sekali ("5 hasil") di live region yang sopan; gerakannya tidak mengumumkan apa pun.
- Jaga total di bawah 400 ms agar pengguna keyboard tidak pernah menunggu untuk mencapai sebuah butir.

## Lakukan
- Beri stagger hanya pada hal yang tiba bersamaan karena orang memintanya.
- Batasi jeda sampai butir kelima.
- Pakai keyframe dan token yang sama dengan sistem (`lds-blur-in`, `--d-standard`, `--ease-enter`).

## Hindari
- Memberi stagger pada setiap daftar di setiap render, atau mengulang stagger setelah diurutkan.
- Memakai jeda lebih dari 35 ms atau rangkaian lebih dari 400 ms.
- Memberi stagger pada gerakan keluar atau pada anak bertingkat di dalam setiap butir.

## Perilaku (HTML biasa)
Tidak ada: ini CSS pada butirnya. Belum ada kelas atau atribut sistem untuk ini, jadi pasang animasinya secara inline (atau lewat style prop di framework) seperti contoh. Untuk gambar yang muncul saat scroll, pakai `data-lds-reveal` dengan `--i`.

## Terkait
[Enter and exit](enter-and-exit.md) · [Reveal on scroll](reveal-on-scroll.md) · [List](list.md) · [Motion principles](motion-principles.md)
