# Shake

Kelompok: Mikrointeraksi. https://lampung.kartadinata.app/docs/components/shake

Tanda penolakan: kontrol bergoyang dua kali, cepat dan dengan ayunan yang mengecil (360 ms), dan alasannya muncul dalam kata-kata di sampingnya. Goyangan menarik mata tepat ke tempatnya; kata-katanya menjelaskan apa yang harus dilakukan.

## Pakai saat
- Orang menekan Lanjut atau Kirim dan inputnya ditolak: email tanpa domain, kode salah, kata sandi salah.
- Aksi optimistis dibatalkan oleh server ([like](like.md), [confirm in place](confirm-in-place.md), [inline edit](inline-edit.md) melakukannya untuk Anda).
- Batas menolak input tepat saat tercapai: stepper yang sudah di nilai maksimum, kuota antrean yang penuh.

## Pakai yang lain saat
- Validasi saat mengetik: pakai [Text field](text-field.md). Tampilkan pesan setelah kolom ditinggalkan atau saat dikirim, tanpa goyangan.
- Error dari sistem, bukan dari orangnya (server mati): pakai [Alert](alert.md).
- Konfirmasi aksi berisiko: pakai [Confirm in place](confirm-in-place.md).
- Menarik perhatian ke sesuatu yang baru: pakai [Bell](bell.md).

## Letaknya
Pada elemen terkecil yang ditolak: kontrol kolom (`.control`), baris OTP, tombol yang ditekan. Jangan pernah pada seluruh formulir, kartu, atau halaman.

## Markup

**Email tanpa domain.** Tekan Kirim kode. Kolom bergoyang, berubah merah, dan menyebut apa yang kurang. Perbaiki alamatnya lalu coba lagi: tanpa goyangan.
```html
import { shake } from 'lampung-design-system/js';
if (!valid) {
  control.classList.add('is-invalid');
  input.setAttribute('aria-invalid', 'true');
  help.hidden = false;          // the reason, in words
  shake(control);               // plus an error haptic on phones
}
```

**Kode verifikasi salah.** Tekan Verifikasi. Keenam sel berubah merah dan barisnya bergoyang sekali; pesan di bawahnya menjelaskan langkah berikutnya.
```html
import { otpError } from 'lampung-design-system/js';
otpError(document.querySelector('.otp-wrap')); // red cells and one shake; typing clears both
```

## Gerak dan mikrointeraksi
- `lds-shake` selama 360 ms dengan `--ease-standard`: −6 px, +5 px, −3 px, +2 px, diam. Dua ayunan yang mengecil, seperti kepala menggeleng; berakhir tepat di posisi awal.
- `shake(el)` memulai ulang animasi bila dipanggil lagi di tengah goyangan dan melepas `.is-shake` saat selesai. Fungsi ini juga memanggil `haptic('error')`.
- Keadaan merah (`is-invalid`, `otp.is-error`) muncul seketika bersama goyangan dan bertahan sampai input berubah; goyangannya sendiri main sekali.
- Reduced motion: tanpa goyangan (1 ms). Keadaan merah dan kata-katanya yang membawa penolakan, karena itu kata-kata wajib ada.

## Aksesibilitas
- Selalu tulis alasannya dalam teks, hubungkan dengan `aria-describedby`, dan pasang `aria-invalid="true"` pada input.
- Pindahkan fokus ke kolom yang ditolak jika belum ada di sana.
- Jangan pernah memakai goyangan sebagai satu-satunya tanda error; goyangan tidak terlihat oleh pembaca layar dan saat reduced motion.

## Lakukan
- Goyangkan kontrol yang ditolak, tepat di tempatnya.
- Sebut apa yang harus dilakukan: "Lengkapi akhir alamatnya, misalnya …".
- Pakai `shake()` agar haptic dan perilaku mulai ulang ikut terpasang.

## Hindari
- Menggoyangkan seluruh formulir, kartu, atau dialog.
- Menggoyangkan selagi orang masih mengetik.
- Menggoyangkan saat berhasil, atau untuk menarik perhatian.

## Perilaku (HTML biasa)
`shake(el)` menambahkan `.is-shake` (memulai ulang bila perlu), melepasnya setelah selesai, dan menjalankan haptic error. `otpError(wrap)` menandai baris OTP sebagai salah dan menggoyangkannya. `likeRevert`, pil konfirmasi, dan inline edit memanggilnya saat gagal.

## React
```tsx
import { reject } from 'lampung-design-system/react';

if (!valid) { setError('Add the end of the address, like ana.putri@contoh.go.id.'); reject(controlRef.current); }
```

## Terkait
[Text field](text-field.md) · [One-time code](otp.md) · [Haptics](haptics.md) · [Confirm in place](confirm-in-place.md)
