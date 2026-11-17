# Thinking

Kelompok: Umpan balik. https://lampung.kartadinata.app/docs/components/thinking

Gelombang titik, label berkilau dan timer waktu berjalan yang jujur, untuk pekerjaan yang lamanya tidak diketahui. Saat selesai, labelnya berubah menjadi hasilnya.

## Pakai saat
- Asisten atau proses latar sedang bekerja dan kemajuannya tidak bisa diukur: memeriksa jadwal layanan, memeriksa berkas unggahan, menyusun daftar persyaratan.
- Pekerjaan yang bisa makan waktu beberapa detik sampai satu menit, saat timer waktu berjalan meyakinkan orang bahwa prosesnya tidak macet.
- Status yang semestinya mengendap menjadi jawabannya di tempat ("Ditemukan 3 slot kosong di Samsat keliling").

## Pakai yang lain saat
- Pekerjaannya punya ukuran yang terukur: pakai [Progress bar](progress-bar.md).
- Tombol sedang menjalankan aksi singkat: pakai [Button](button.md).
- Konten sedang dimuat dengan tata letak yang diketahui: pakai [Skeleton](skeleton.md).
- Tunggu singkat di baris atau daftar: pakai [Spinner](spinner.md).
- Jawabannya sendiri sedang datang kata demi kata: pakai [Streaming text](streaming-text.md).
- Langkah asisten yang sudah selesai, dengan rincian yang bisa dibuka: pakai [Tool call](tool-call.md).
- Hitung mundur menuju tenggat: pakai [Timer](timer.md).

## Letaknya
Di tempat jawaban akan muncul: di bagian atas balasan asisten di [chat](chat-message.md), di area hasil sebuah panel, di baris status sebuah proses. Satu baris, rata kiri. Biarkan di tempatnya setelah selesai, sebagai judul hasilnya.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.thinking` | Wajib. Baris inline, jarak 10 px, teks medium 14 px. `role="status"`. |
| `.dotgrid` | Wajib. Grid 3 x 3 berisi titik 4 px; JS mengisi sembilan `<i>` jika kosong. `aria-hidden="true"`. |
| `.shimmer` | Wajib. Labelnya; pita terang melintasinya setiap 1,8 detik. |
| `.thinking__time` | Waktu berjalan opsional dengan angka mono tabular, diperbarui setiap 100 ms. |
| `.is-done` | Mengendap: titik berhenti dan menjadi hijau, label berhenti berkilau dan menjadi tegas. |

## Markup

**Bekerja, lalu selesai.** Gelombangnya berjalan dengan CSS; `data-lds-thinking` menambahkan timer. Tekan Selesaikan untuk mengendapkannya menjadi hasil.
```html
<div class="thinking" data-lds-thinking role="status">
  <span class="dotgrid" aria-hidden="true"></span>
  <span class="shimmer">Memeriksa jadwal Samsat keliling</span>
  <span class="thinking__time"></span>
</div>
<script type="module">
  import { thinkingDone } from 'lampung-design-system/js';
  // when the work ends:
  thinkingDone(document.querySelector('.thinking'), 'Ditemukan 3 slot kosong di Samsat keliling');
</script>
```

**Tanpa timer.** Buang `.thinking__time` untuk tunggu yang biasanya singkat.
```html
<div class="thinking" data-lds-thinking role="status"><span class="dotgrid" aria-hidden="true"></span><span class="shimmer">Memeriksa kelengkapan berkas Anda</span></div>
```

**Mengendap.** Setelah `thinkingDone`, baris ini tetap ada sebagai judul hasilnya.
```html
<div class="thinking is-done" role="status"><span class="dotgrid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="shimmer is-settled">Daftar persyaratan siap: 4 dokumen untuk surat pindah</span><span class="thinking__time">8.4s</span></div>
```

## Status
| Status | Caranya |
|---|---|
| `working` | Titik bergelombang, label berkilau, waktu berjalan. |
| `done` | `thinkingDone(el, label)` menambahkan `.is-done`, mengendapkan kilau dan mengubah label menjadi `label` (dengan haptic success jika didukung). |
| `failed` | Endapkan sendiri dengan label yang menyebut apa yang gagal ("Kalender tidak bisa dihubungi"), lalu tawarkan coba lagi di sampingnya. |

## Gerak dan mikrointeraksi
- Gelombang titik: setiap titik menjalankan `lds-dot-wave` (opasitas 0,12 ke 1 dan kembali) selama 1,2 detik dengan `--ease-inout`, dengan jeda bertambah 90 ms secara diagonal (kolom + baris), jadi gelombang bergerak dari sudut kiri atas.
- Label: `.shimmer` menggerakkan pita terang melintasi teks selama 1,8 detik linear, tanpa henti.
- Selesai: label berubah huruf demi huruf ([text morph](text-morph.md)) dan warnanya mengendap selama `--d-standard`; titik langsung berubah ke warna success.
- Reduced motion: titik berhenti di opasitas 60 % dan kilau berhenti; timer tetap berjalan karena itu informasi.

## Aksesibilitas
- `role="status"` pada `.thinking`, agar label dan hasil akhirnya diumumkan secara sopan.
- Grid titik memakai `aria-hidden="true"`. Timer berubah sepuluh kali per detik; jika screen reader terlalu sering membacanya dalam konteks Anda, pasang `aria-hidden="true"` pada `.thinking__time`.
- Label yang mengendap harus menyebut hasilnya, bukan hanya "Selesai".

## Lakukan
- Sebut pekerjaannya di label ("Memeriksa jadwal Anda").
- Endapkan menjadi hasil, jangan dihapus.
- Tampilkan waktu berjalan jika tunggunya bisa lebih dari lima detik.

## Hindari
- Memalsukan kemajuan dengan bar untuk pekerjaan yang tidak diketahui ukurannya.
- Memakainya untuk tunggu di bawah satu detik.
- Mengganti label setiap detik agar terlihat sibuk.

## Perilaku (HTML biasa)
`data-lds-thinking` pada `.thinking` mengisi grid titik dan menjalankan waktu berjalan (satu desimal, "3.4s"). `thinkingDone(el, label)` mengendapkannya dan mengubah labelnya. Gelombangnya sendiri CSS, jadi markup yang dirender framework apa pun tetap bergerak tanpa JS.

## React
```tsx
import { Thinking } from 'lampung-design-system/react';

const [started] = useState(() => Date.now());
<Thinking label={done ? 'Found 3 open slots at Samsat keliling' : 'Checking your schedule'} startedAt={started} done={done} />
// The React timer shows whole seconds as m:ss.
```

## Terkait
[Streaming text](streaming-text.md) · [Tool call](tool-call.md) · [Progress bar](progress-bar.md) · [Spinner](spinner.md)
