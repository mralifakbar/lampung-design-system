# Upload progress

Kelompok: Mikrointeraksi. https://lampung.kartadinata.app/docs/components/upload-progress

Unggahan menelusuri kemajuannya di sepanjang tepi drop zone tempat berkas dijatuhkan, dengan pil persentase di sudutnya. Garisnya berubah hijau di 100%. Angkanya nyata; tidak pernah merayap ke 90% lalu diam menunggu.

## Pakai saat
- Berkas sedang diunggah ke drop zone ([file input](file-input.md)) dan ukurannya diketahui, jadi persentase nyata tersedia.
- Satu berkas besar yang waktu tunggunya cukup lama untuk dirasakan: dokumen izin lingkungan, rekaman rapat, hasil pindai berkas permohonan.

## Pakai yang lain saat
- Beberapa berkas sekaligus: pakai [File input](file-input.md). Tampilkan progress bar di dalam setiap `.file-row`.
- Kemajuan yang bukan unggahan: pakai [Progress bar](progress-bar.md).
- Pekerjaan yang durasinya tidak diketahui: pakai [Thinking](thinking.md).
- Angka penyelesaian program atau tugas: pakai [Progress ring](progress-ring.md).

## Letaknya
Pada zona `.drop` tempat berkas masuk. Pil berada di sudut kanan atas; garis mengikuti tepinya yang membulat.

## Anatomi
| Bagian | Fungsinya |
|---|---|
| `.drop` | Wajib. Drop zone-nya. |
| `.drop__ring` | `rect` SVG dengan `pathLength="100"` yang digambar di atas tepi (dibuat oleh JS). |
| `.drop__pct` | Pil persentase, `role="progressbar"` dengan `aria-valuenow` (dibuat oleh JS). |
| `.is-uploading / .is-complete` | Dipasang oleh `uploadProgress()`. |

## Markup

**Mengunggah dokumen izin.** Tekan Unggah. Garis berjalan di sepanjang tepi seiring data terkirim dan pil menghitung; di 100% keduanya berubah hijau.
```html
import { uploadProgress, uploadReset } from 'lampung-design-system/js';

xhr.upload.onprogress = (e) => uploadProgress(drop, (e.loaded / e.total) * 100);
// to start over: uploadReset(drop)
```

**Unggahan yang berhenti.** Yang ini gagal di tengah jalan: garisnya hilang, zonanya bergoyang, dan alasannya menggantikan ukuran berkas dalam kata-kata, dengan cara untuk mencoba lagi.
```html
<div class="drop" style="max-width: 420px;"><span class="ic" aria-hidden="true">cloud_upload</span><span class="card__title">rekaman-musrenbang.mp4</span><span class="card__sub">4,2 MB</span><button class="btn btn--secondary btn--sm" style="margin-top: 6px;" onclick="const drop = this.closest('.drop'); const meta = drop.querySelector('.card__sub'); this.disabled = true; import('../../js/lds.js').then((m) => { m.uploadReset(drop); let p = 0; const t = setInterval(() => { p += 7 + Math.random() * 9; if (p > 55) { clearInterval(t); m.uploadReset(drop); meta.textContent = 'Unggahan berhenti di 58%. Periksa koneksi Anda lalu coba lagi.'; meta.classList.add('field__help--error'); this.disabled = false; this.textContent = 'Coba lagi'; m.shake(drop); return; } m.uploadProgress(drop, Math.min(p, 100)); meta.textContent = String(Math.round(Math.min(p, 100) * 0.042 * 10) / 10).replace('.', ',') + ' dari 4,2 MB'; if (p >= 100) { clearInterval(t); meta.textContent = 'Terunggah, 4,2 MB'; this.disabled = false; this.textContent = 'Unggah lagi'; } }, 220); });">Unggah</button></div>
```

## Gerak dan mikrointeraksi
- Garis: `stroke-dasharray: <percent> 200` pada `rect` dengan `pathLength="100"`, bertransisi 200 ms linear di antara pembaruan, jadi bergerak sesuai kecepatan unggahan yang sebenarnya.
- Pil: muncul dari 10 px di atas dengan blur 2 px (opacity 160 ms, transform 300 ms dengan `--spring-snappy`) saat unggahan dimulai.
- Selesai: garis dan pil berganti ke hijau selama `--d-standard`; haptic success dimainkan.
- Cincinnya muncul dan hilang perlahan selama 300 ms dengan `--ease-standard` saat unggahan dimulai atau di-reset.
- Reduced motion: garis dan pil tetap diperbarui (keduanya melaporkan kemajuan), setiap perubahan dalam 120 ms.

## Aksesibilitas
- Pil memakai `role="progressbar"` dengan `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, dan `aria-label="Kemajuan unggahan"`.
- Sampaikan hasilnya dengan kata-kata saat selesai ("Terunggah, 4,2 MB") dan alasannya saat gagal.
- Warna bukan satu-satunya tanda selesai: pil menunjukkan 100% dan teksnya berubah.

## Lakukan
- Isi dengan persentase nyata dari event unggahan.
- Ganti baris ukuran dengan hasil atau alasannya di akhir.
- Panggil `uploadReset` sebelum unggahan baru.

## Hindari
- Memalsukan kemajuan dengan timer.
- Menahan di 99% selagi server memproses; ganti labelnya menjadi "Memproses" dengan baris [thinking](thinking.md).
- Memakainya untuk beberapa berkas sekaligus.

## Perilaku (HTML biasa)
`uploadProgress(drop, percent)` membuat cincin dan pil pada panggilan pertama, memperbarui keduanya, memasang `.is-uploading` dan `.is-complete` (dengan haptic success di 100). `uploadReset(drop)` menghapus kedua keadaan itu.

## Terkait
[File input](file-input.md) · [Progress bar](progress-bar.md) · [Thinking](thinking.md) · [Haptics](haptics.md)
