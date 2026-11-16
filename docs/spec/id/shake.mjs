const EMAIL = "const f = this.closest('.docs-col'); const c = f.querySelector('.control'); const input = c.querySelector('input'); const help = f.querySelector('.field__help'); const ok = /@.+[.].+/.test(input.value); c.classList.toggle('is-invalid', !ok); input.setAttribute('aria-invalid', String(!ok)); help.hidden = ok; if (!ok) import('../../js/lds.js').then((m) => m.shake(c)); else this.textContent = 'Kode terkirim';";
const OTP = "const f = this.closest('.docs-col'); f.querySelector('.field__help').hidden = false; import('../../js/lds.js').then((m) => m.otpError(f.querySelector('.otp-wrap')));";

export default {
  summary: 'Tanda penolakan: kontrol bergoyang dua kali, cepat dan dengan ayunan yang mengecil (360 ms), dan alasannya muncul dalam kata-kata di sampingnya. Goyangan menarik mata tepat ke tempatnya; kata-katanya menjelaskan apa yang harus dilakukan.',
  when: [
    'Orang menekan Lanjut atau Kirim dan inputnya ditolak: email tanpa domain, kode salah, kata sandi salah.',
    'Aksi optimistis dibatalkan oleh server ([like](like), [confirm in place](confirm-in-place), [inline edit](inline-edit) melakukannya untuk Anda).',
    'Batas menolak input tepat saat tercapai: stepper yang sudah di nilai maksimum, kuota antrean yang penuh.',
  ],
  whenNot: [
    ['Validasi saat mengetik', 'text-field', 'Tampilkan pesan setelah kolom ditinggalkan atau saat dikirim, tanpa goyangan.'],
    ['Error dari sistem, bukan dari orangnya (server mati)', 'alert'],
    ['Konfirmasi aksi berisiko', 'confirm-in-place'],
    ['Menarik perhatian ke sesuatu yang baru', 'bell'],
  ],
  where: 'Pada elemen terkecil yang ditolak: kontrol kolom (`.control`), baris OTP, tombol yang ditekan. Jangan pernah pada seluruh formulir, kartu, atau halaman.',
  examples: [
    {
      title: 'Email tanpa domain',
      desc: 'Tekan Kirim kode. Kolom bergoyang, berubah merah, dan menyebut apa yang kurang. Perbaiki alamatnya lalu coba lagi: tanpa goyangan.',
      html: `<div class="docs-col" style="max-width: 360px;">
  <div class="field">
    <label class="field__label" for="sh-email">Email</label>
    <div class="control"><span class="ic" aria-hidden="true">mail</span><input id="sh-email" type="email" value="ana.putri@contoh" aria-describedby="sh-email-help"></div>
    <span class="field__help field__help--error" id="sh-email-help" hidden><span class="ic" aria-hidden="true">error</span>Lengkapi akhir alamatnya, misalnya ana.putri@contoh.go.id.</span>
  </div>
  <button class="btn btn--primary btn--block" onclick="${EMAIL}">Kirim kode</button>
</div>`,
      code: `import { shake } from 'lampung-design-system/js';
if (!valid) {
  control.classList.add('is-invalid');
  input.setAttribute('aria-invalid', 'true');
  help.hidden = false;          // the reason, in words
  shake(control);               // plus an error haptic on phones
}`,
    },
    {
      title: 'Kode verifikasi salah',
      desc: 'Tekan Verifikasi. Keenam sel berubah merah dan barisnya bergoyang sekali; pesan di bawahnya menjelaskan langkah berikutnya.',
      html: `<div class="docs-col" style="max-width: 360px;">
  <div class="field">
    <span class="field__label" id="sh-otp">Kode verifikasi</span>
    <div class="otp-wrap" data-lds-otp>
      <div class="otp" aria-hidden="true"><span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__sep"></span><span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__cell"></span></div>
      <input class="otp__input" inputmode="numeric" autocomplete="one-time-code" maxlength="6" aria-labelledby="sh-otp" value="482913">
    </div>
    <span class="field__help field__help--error" hidden><span class="ic" aria-hidden="true">error</span>Kode tidak cocok. Periksa email terbaru atau minta kode baru.</span>
  </div>
  <button class="btn btn--primary btn--block" onclick="${OTP}">Verifikasi</button>
</div>`,
      code: `import { otpError } from 'lampung-design-system/js';
otpError(document.querySelector('.otp-wrap')); // red cells and one shake; typing clears both`,
    },
  ],
  motion: [
    '`lds-shake` selama 360 ms dengan `--ease-standard`: −6 px, +5 px, −3 px, +2 px, diam. Dua ayunan yang mengecil, seperti kepala menggeleng; berakhir tepat di posisi awal.',
    '`shake(el)` memulai ulang animasi bila dipanggil lagi di tengah goyangan dan melepas `.is-shake` saat selesai. Fungsi ini juga memanggil `haptic(\'error\')`.',
    'Keadaan merah (`is-invalid`, `otp.is-error`) muncul seketika bersama goyangan dan bertahan sampai input berubah; goyangannya sendiri main sekali.',
    'Reduced motion: tanpa goyangan (1 ms). Keadaan merah dan kata-katanya yang membawa penolakan, karena itu kata-kata wajib ada.',
  ],
  a11y: [
    'Selalu tulis alasannya dalam teks, hubungkan dengan `aria-describedby`, dan pasang `aria-invalid="true"` pada input.',
    'Pindahkan fokus ke kolom yang ditolak jika belum ada di sana.',
    'Jangan pernah memakai goyangan sebagai satu-satunya tanda error; goyangan tidak terlihat oleh pembaca layar dan saat reduced motion.',
  ],
  do: [
    'Goyangkan kontrol yang ditolak, tepat di tempatnya.',
    'Sebut apa yang harus dilakukan: "Lengkapi akhir alamatnya, misalnya …".',
    'Pakai `shake()` agar haptic dan perilaku mulai ulang ikut terpasang.',
  ],
  dont: [
    'Menggoyangkan seluruh formulir, kartu, atau dialog.',
    'Menggoyangkan selagi orang masih mengetik.',
    'Menggoyangkan saat berhasil, atau untuk menarik perhatian.',
  ],
  js: '`shake(el)` menambahkan `.is-shake` (memulai ulang bila perlu), melepasnya setelah selesai, dan menjalankan haptic error. `otpError(wrap)` menandai baris OTP sebagai salah dan menggoyangkannya. `likeRevert`, pil konfirmasi, dan inline edit memanggilnya saat gagal.',
};
