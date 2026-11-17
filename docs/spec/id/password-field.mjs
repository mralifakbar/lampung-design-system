export default {
  summary: 'Text field untuk rahasia, dengan tombol tampilkan yang menukar ikon matanya di tempat. Saat membuat kata sandi, pengukur kekuatan empat langkah dan teks bantuan menyebut apa yang akan membuatnya lebih kuat.',
  when: [
    'Masuk (kata sandi saat ini) atau membuat dan mengganti kata sandi (kata sandi baru dengan kekuatan).',
    'Rahasia apa pun yang diketik orang dan mungkin ingin mereka periksa: PIN, kata sandi akun layanan.',
  ],
  whenNot: [
    ['Kode sekali pakai yang dikirim lewat SMS atau email', 'otp', 'Sel, keyboard angka, tempel, dan isi otomatis seluruh kode'],
    ['Nilai biasa yang tidak rahasia', 'text-field'],
    ['Mengonfirmasi aksi yang merusak', 'alert-dialog', 'Jangan minta kata sandi lagi kecuali aksinya memang membutuhkannya'],
  ],
  where: 'Di [formulir](form-layout) masuk atau akun, di bawah kolom email atau nama pengguna. Di ponsel buat selebar layar; tombol tampilkan tetap di dalam kontrol.',
  anatomy: [
    ['.field / .field__label / .field__help', 'Wajib. Pembungkus yang sama dengan [text field](text-field). Teks bantuan memuat aturannya, lalu kata kekuatannya.'],
    ['.control', 'Wajib. Memuat ikon `key` di depan (opsional), input, dan tombol tampilkan.'],
    ['input[type=password]', 'Wajib. `autocomplete="current-password"` untuk masuk, `"new-password"` untuk membuat.'],
    ['.control__btn > .swap', 'Tombol tampilkan. `.swap__a` adalah `visibility`, `.swap__b` adalah `visibility_off`; `.is-swapped` menukarnya dengan crossfade.'],
    ['.meter-seg', 'Pengukur kekuatan opsional untuk kata sandi baru: empat `<i>`, `.on` untuk setiap langkah yang tercapai; `.is-warn` (cukup) atau `.is-full` (lemah, warna danger) pada pengukur.'],
  ],
  examples: [
    {
      title: 'Masuk dengan tombol tampilkan',
      desc: 'Ikon mata berganti menjadi mata dicoret dengan crossfade blur; fokus tetap di kolom.',
      html: `<div class="field" style="max-width: 380px;">
  <label class="field__label" for="pf-pw">Kata sandi</label>
  <div class="control"><span class="ic" aria-hidden="true">key</span><input id="pf-pw" type="password" autocomplete="current-password" value="wayhalim2026">
    <button type="button" class="control__btn" aria-label="Tampilkan kata sandi" aria-pressed="false" onclick="const i = this.previousElementSibling, on = i.type === 'password'; i.type = on ? 'text' : 'password'; this.setAttribute('aria-pressed', String(on)); this.setAttribute('aria-label', on ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'); this.firstElementChild.classList.toggle('is-swapped', on);"><span class="swap" aria-hidden="true"><span class="ic swap__a">visibility</span><span class="ic swap__b">visibility_off</span></span></button></div>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="pw">Kata sandi</label>
  <div class="control">
    <span class="ic" aria-hidden="true">key</span>
    <input id="pw" type="password" autocomplete="current-password">
    <button type="button" class="control__btn" aria-label="Tampilkan kata sandi" aria-pressed="false">
      <span class="swap" aria-hidden="true"><span class="ic swap__a">visibility</span><span class="ic swap__b">visibility_off</span></span>
    </button>
  </div>
</div>
<!-- On click: toggle input.type, aria-pressed, the label (Show / Hide password) and .is-swapped on .swap -->`,
    },
    {
      title: 'Kata sandi baru dengan kekuatan',
      desc: 'Empat langkah terisi saat kata sandi makin kuat; lemah tampil dalam warna danger, cukup dalam warning. Ketik untuk mencobanya.',
      html: `<div class="field" style="max-width: 380px;">
  <label class="field__label" for="pf-new">Kata sandi baru</label>
  <div class="control"><input id="pf-new" type="password" autocomplete="new-password" placeholder="Minimal 8 karakter" aria-describedby="pf-new-help"
    oninput="const v = this.value; let s = 0; if (v.length >= 8) { s = 1; if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++; if (/\\d/.test(v)) s++; if (/[^A-Za-z0-9]/.test(v)) s++; } const m = document.getElementById('pf-meter'); [...m.children].forEach((x, i) => x.classList.toggle('on', i < s)); m.classList.toggle('is-full', !!v && s <= 1); m.classList.toggle('is-warn', s === 2); document.getElementById('pf-new-help').textContent = !v ? 'Pakai 8 karakter atau lebih.' : ['Pakai 8 karakter atau lebih.', 'Lemah. Campur huruf besar dan kecil.', 'Cukup. Tambahkan angka.', 'Baik. Simbol membuatnya kuat.', 'Kata sandi kuat.'][s];"></div>
  <div class="meter-seg" id="pf-meter" style="grid-template-columns: repeat(4, minmax(0, 1fr));" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
  <span class="field__help" id="pf-new-help" aria-live="polite">Pakai 8 karakter atau lebih.</span>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="new-pw">Kata sandi baru</label>
  <div class="control"><input id="new-pw" type="password" autocomplete="new-password" aria-describedby="new-pw-help"></div>
  <div class="meter-seg is-warn" style="grid-template-columns: repeat(4, minmax(0, 1fr));" aria-hidden="true">
    <i class="on"></i><i class="on"></i><i></i><i></i>
  </div>
  <span class="field__help" id="new-pw-help" aria-live="polite">Cukup. Tambahkan angka.</span>
</div>`,
    },
    {
      title: 'Kata sandi salah',
      desc: 'Sebut apa yang gagal dan tawarkan jalan keluarnya di tempat yang sama.',
      html: `<div class="field" style="max-width: 380px;">
  <label class="field__label" for="pf-bad">Kata sandi</label>
  <div class="control is-invalid"><input id="pf-bad" type="password" value="wayhalim" aria-invalid="true" aria-describedby="pf-bad-help"></div>
  <span class="field__help field__help--error" id="pf-bad-help"><span class="ic" aria-hidden="true">error</span>Kata sandi itu tidak cocok dengan akun ini. Periksa Caps Lock atau atur ulang kata sandi.</span>
  <a class="link" href="#">Atur ulang kata sandi</a>
</div>`,
    },
  ],
  states: [
    ['hidden / shown', '`type="password"` dengan `aria-pressed="false"` dan label "Tampilkan kata sandi"; saat ditampilkan ketiganya berbalik dan `.is-swapped` ditambahkan.'],
    ['strength', 'Langkah `.meter-seg` diberi `.on`; `.is-full` (lemah, danger) dan `.is-warn` (cukup, warning); baik dan kuat memakai aksen.'],
    ['.is-invalid', 'Tepi danger dengan pesan galat di teks bantuan, seperti [text field](text-field).'],
  ],
  motion: [
    'Tampilkan: dua glyph bertukar dengan crossfade di `.swap`; yang keluar mengecil ke 0.5 dengan blur 4 px dalam `--d-fast` (160 ms) sementara yang baru mendarat dengan `--spring-snappy` (360 ms). Lihat [icon swap](icon-swap).',
    'Tombol mengecil ke 0.88 pada `:active` dan memantul kembali dengan `--spring-snappy`.',
    'Langkah pengukur berganti warna dalam `--d-standard` (240 ms) dengan `--ease-standard`; tidak membesar atau bergeser.',
    'Reduced motion: pertukaran menjadi crossfade 120 ms tanpa perubahan skala.',
  ],
  a11y: [
    'Tombol tampilkan adalah `<button type="button">` dengan `aria-pressed` dan label yang menyebut apa yang dilakukannya sekarang ("Tampilkan kata sandi", "Sembunyikan kata sandi"). Jaga fokus tetap di input setelah menekannya jika bisa.',
    'Pakai `autocomplete` yang tepat agar pengelola kata sandi berfungsi: `current-password` atau `new-password`. Jangan pernah memblokir tempel.',
    'Pengukurnya dekoratif (`aria-hidden`); teks bantuan menyebut kekuatannya dalam kata di area `aria-live="polite"`.',
    'Sebut aturannya sebelum galat; saat gagal masuk, jangan sebut apakah email atau kata sandi yang salah jika itu membocorkan keberadaan akun.',
  ],
  do: [
    'Sediakan tombol tampilkan di setiap kolom kata sandi, terutama di ponsel.',
    'Jelaskan langkah berikutnya menuju kata sandi yang lebih kuat, bukan daftar aturan yang gagal.',
  ],
  dont: [
    'Meminta orang mengetik kata sandi baru dua kali saat tombol tampilkan tersedia.',
    'Memakai warna saja untuk kekuatan; teks bantuan menyebutnya dalam kata.',
    'Menonaktifkan tempel atau isi otomatis.',
  ],
  js: 'Tidak ada. Saat diklik, ganti `type`, `aria-pressed`, label, dan `.is-swapped`; hitung kekuatan di kode Anda dan setel `.on` pada langkah pengukur.',
};
