export default {
  summary: 'Satu baris teks bebas dengan label di atasnya dan baris bantuan di bawahnya. Baris bantuan berubah menjadi pesan galat, sehingga tata letak tidak pernah melompat.',
  when: [
    'Orang mengetik nilai bebas yang pendek: nama, email, NIK, nama kelurahan.',
    'Formulir butuh kolom yang memvalidasi (setelah blur pertama, lalu secara langsung) dan menyebut apa yang perlu diperbaiki dengan kata-kata.',
    'Nilai butuh ikon di depan, satuan, atau satu aksi di belakang seperti hapus (`.control__btn`).',
  ],
  whenNot: [
    ['Lebih dari satu baris teks (catatan, alasan, deskripsi)', 'textarea'],
    ['Uang atau angka lain yang bersatuan', 'amount-field', '`.control` yang sama, dengan mata uang sebagai awalan dan keyboard angka'],
    ['Menemukan sesuatu di daftar atau halaman', 'search-field', 'Bentuk berisi, tanpa label, Batal di ponsel'],
    ['Kata sandi atau PIN', 'password-field'],
    ['Kode sekali pakai dari SMS atau email', 'otp'],
    ['Jawabannya salah satu dari daftar yang diketahui', 'select', 'Atau [combobox](combobox) saat daftarnya panjang dan orang mengetik untuk menemukan'],
    ['Tanggal', 'date-field'],
    ['Beberapa nilai pendek (topik, email yang diundang)', 'tag-input'],
  ],
  where: 'Di dalam [formulir](form-layout): kolom bertumpuk berjarak 20 px di `.form`, pasangan pendek (nama depan dan belakang, kota dan kode pos) berbagi `.form__row`, dan tombol menutup formulir di `.form__actions`. Selebar kolomnya di ponsel; di layar lebar batasi formulir sekitar 560 px alih-alih merentangkan kolom selebar halaman.',
  anatomy: [
    ['.field', 'Wajib. Pembungkus kolom, jarak 8 px antara label, kontrol, dan teks bantuan.'],
    ['.field__label', 'Wajib. `<label for>` di atas kontrol. `<span>` di dalamnya adalah catatan tenang di sisi kanan ("Opsional", penghitung).'],
    ['.control', 'Wajib. Kotak 44 px dengan garis tepi, focus ring, dan statusnya. Memuat `<input>`, yang mengisi sisa baris.'],
    ['.control > .ic', 'Ikon opsional di depan, 19 px, redup; menjadi warna aksen saat kolom difokus.'],
    ['.control__suffix', 'Teks satuan atau awalan opsional (Rp, kg, %, @contoh.id).'],
    ['.control__btn', 'Icon button 30 px opsional di belakang (hapus, tampilkan, buka kalender). Butuh `aria-label`.'],
    ['.field__help', 'Teks bantuan di bawah kontrol. Tambahkan `--error` (dengan ikon `error`) atau `--ok` (dengan `check_circle`) untuk mengubahnya menjadi umpan balik di tempat yang sama.'],
  ],
  examples: [
    {
      title: 'Label, kontrol, bantuan',
      desc: 'Label selalu terlihat; placeholder hanya contoh, tidak pernah menjadi label. Teks bantuan menyebut format sebelum ada yang salah mengisi.',
      html: `<div class="form" style="max-width: 420px;">
  <div class="field">
    <label class="field__label" for="tf-name">Nama lengkap</label>
    <div class="control"><input id="tf-name" autocomplete="name" placeholder="Siti Rahmawati" aria-describedby="tf-name-help"></div>
    <span class="field__help" id="tf-name-help">Sesuai yang tertulis di KTP.</span>
  </div>
  <div class="field">
    <label class="field__label" for="tf-school">Kelurahan <span>Opsional</span></label>
    <div class="control"><span class="ic" aria-hidden="true">location_on</span><input id="tf-school" autocomplete="address-level4" placeholder="Kelurahan Way Halim Permai"></div>
  </div>
</div>`,
    },
    {
      title: 'Galat dan berhasil di tempat bantuan',
      desc: 'Baris bantuan menjadi pesannya, jadi tidak ada yang bergeser di bawahnya. Pesan galat menyebut apa yang terjadi dan cara memperbaikinya. Ketik alamat yang valid lalu tinggalkan kolom untuk melihatnya menjadi hijau.',
      html: `<div class="form" style="max-width: 420px;">
  <div class="field">
    <label class="field__label" for="tf-email">Email</label>
    <div class="control is-invalid"><span class="ic" aria-hidden="true">mail</span><input id="tf-email" type="email" autocomplete="email" value="siti@contoh" aria-invalid="true" aria-describedby="tf-email-help"
      onblur="const ok = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]{2,}$/.test(this.value); const c = this.parentElement, h = document.getElementById('tf-email-help'); c.classList.toggle('is-invalid', !ok); this.setAttribute('aria-invalid', String(!ok)); h.className = 'field__help ' + (ok ? 'field__help--ok' : 'field__help--error'); h.firstElementChild.textContent = ok ? 'check_circle' : 'error'; h.lastChild.textContent = ok ? 'Bukti permohonan dikirim ke sini.' : 'Alamat ini belum punya domain, misalnya siti@contoh.id.';"></div>
    <span class="field__help field__help--error" id="tf-email-help"><span class="ic" aria-hidden="true">error</span><span>Alamat ini belum punya domain, misalnya siti@contoh.id.</span></span>
  </div>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="email">Email</label>
  <div class="control is-invalid">
    <span class="ic" aria-hidden="true">mail</span>
    <input id="email" type="email" autocomplete="email" aria-invalid="true" aria-describedby="email-help">
  </div>
  <span class="field__help field__help--error" id="email-help"><span class="ic" aria-hidden="true">error</span>Alamat ini belum punya domain, misalnya siti@contoh.id.</span>
</div>

<!-- Valid -->
<span class="field__help field__help--ok" id="email-help"><span class="ic" aria-hidden="true">check_circle</span>Bukti permohonan dikirim ke sini.</span>`,
    },
    {
      title: 'Aksi di belakang dan nonaktif',
      desc: 'Tombol hapus muncul setelah ada teks. Kolom nonaktif menyebut siapa yang bisa mengubahnya, di teks bantuan.',
      html: `<div class="form" style="max-width: 420px;">
  <div class="field">
    <label class="field__label" for="tf-course">Nama usaha</label>
    <div class="control"><input id="tf-course" value="Keripik Pisang Bu Rina" oninput="this.nextElementSibling.hidden = !this.value"><button type="button" class="control__btn" aria-label="Hapus nama usaha" onclick="const i = this.previousElementSibling; i.value = ''; this.hidden = true; i.focus();"><span class="ic" aria-hidden="true">close</span></button></div>
  </div>
  <div class="field">
    <label class="field__label" for="tf-sid">NIK</label>
    <div class="control is-disabled"><span class="ic" aria-hidden="true">lock</span><input id="tf-sid" value="1871 •••• •••• 0003" disabled aria-describedby="tf-sid-help"></div>
    <span class="field__help" id="tf-sid-help">Diambil dari data kependudukan. Ajukan perubahan di kantor kelurahan.</span>
  </div>
</div>`,
    },
    {
      title: 'Di dalam formulir',
      desc: 'Pasangan kolom berdampingan saat ada ruang dan menumpuk di ponsel; tombol menutup formulir dan menjadi selebar layar di bawah 560 px.',
      html: `<form class="form" style="max-width: 560px;" onsubmit="event.preventDefault()">
  <div class="form__row">
    <div class="field"><label class="field__label" for="tf-first">Nama depan</label><div class="control"><input id="tf-first" autocomplete="given-name"></div></div>
    <div class="field"><label class="field__label" for="tf-last">Nama belakang</label><div class="control"><input id="tf-last" autocomplete="family-name"></div></div>
  </div>
  <div class="field"><label class="field__label" for="tf-phone">Nomor ponsel</label><div class="control"><span class="ic" aria-hidden="true">call</span><input id="tf-phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="08xx xxxx xxxx"></div></div>
  <div class="form__actions"><button type="button" class="btn btn--secondary">Batal</button><button type="submit" class="btn btn--primary">Simpan profil</button></div>
</form>`,
    },
  ],
  variants: [
    ['.control > .ic', 'Ikon di depan untuk kolom yang jenisnya tidak jelas dari label (surat, telepon, lokasi).'],
    ['.control__suffix', 'Teks satuan atau awalan; lihat [amount field](amount-field).'],
    ['.control__btn', 'Satu aksi di belakang: hapus, tampilkan ([password field](password-field)), buka kalender ([date field](date-field)).'],
    ['.field__help--error / --ok', 'Baris bantuan sebagai umpan balik, dengan ikon `error` atau `check_circle`.'],
  ],
  states: [
    ['hover', 'Garis tepi menggelap ke `--text-subtle` (perangkat yang bisa hover).'],
    ['focus', 'Otomatis lewat `:focus-within`: tepi aksen 1.5 px ditambah halo `--accent-ring` 4 px; ikon depan menjadi warna aksen.'],
    ['.is-invalid + aria-invalid="true"', 'Tepi dan halo danger. Pasangkan dengan `.field__help--error` dan jaga `aria-describedby` menunjuk ke sana.'],
    ['.is-disabled + disabled', 'Latar berisi, garis tepi tenang, teks redup. Pasang `disabled` pada input dan kelasnya pada `.control`.'],
    ['autofill', 'Ditangani sistem: warna isian browser dipotong sebatas teks dan kolom mempertahankan latarnya sendiri. Pada kolom yang diletakkan di atas warna lain, setel `--autofill-bg` padanya.'],
    ['on a filled surface', 'Di dalam `.card--fill`, `.list--fill`, `.kv-list`, atau `.spotlight` kontrol beralih ke warna dasar dengan sendirinya (tidak pernah isian di atas isian).'],
  ],
  motion: [
    'Focus ring dan garis tepi: `box-shadow` dan `background-color` bertransisi dalam `--d-fast` (160 ms) dengan `--ease-standard`; warna ikon depan mengikuti dalam waktu yang sama. Melepas fokus membalik transisi yang sama, jadi berpindah cepat dengan Tab di formulir tidak pernah berkedip.',
    'Galat muncul di tempat: tukar teks bantuan, jangan menggeser baris baru masuk. Jika pengiriman ditolak, [shake](shake) kolomnya sekali (dua osilasi pendek, 360 ms) alih-alih menganimasikan pesannya.',
    'Validasi setelah blur pertama, lalu langsung di setiap input: pesan berubah begitu nilainya benar, sehingga orang melihat status hijau saat masih mengetik.',
    'Reduced motion: setiap transisi menjadi 120 ms linear; tidak ada yang berpindah di dalam kolom, jadi perilakunya selebihnya sama.',
  ],
  a11y: [
    'Setiap input punya `<label for>`. Jangan pernah mengandalkan placeholder; ia hilang saat mengetik dan memang berkontras rendah.',
    'Arahkan `aria-describedby` ke teks bantuan agar petunjuk format dan nanti pesan galatnya dibacakan bersama kolom. Setel `aria-invalid="true"` bersamaan dengan `.is-invalid`.',
    'Pakai `type`, `inputmode`, dan `autocomplete` yang tepat (`email`, `tel`, `name`, `given-name`, `organization`) agar ponsel menampilkan keyboard yang benar dan browser bisa mengisinya.',
    'Di layar sentuh input tampil 16 px atau lebih (sistem melakukannya di bawah `pointer: coarse`), sehingga iOS tidak pernah memperbesar halaman saat fokus. Jangan setel font lebih kecil pada `.control input`.',
    '`.control__btn` adalah `<button type="button">` sungguhan dengan `aria-label` yang menyebut efeknya ("Hapus nama usaha").',
  ],
  do: [
    'Tulis label sebagai kata benda ("Email"), teks bantuan sebagai format atau alasan Anda bertanya ("Bukti permohonan dikirim ke sini").',
    'Tandai kolom opsional yang jarang dengan "Opsional" di span label alih-alih memberi bintang pada setiap kolom wajib.',
    'Pertahankan satu kolom di ponsel; pasangkan hanya kolom pendek yang terkait dengan `.form__row`.',
  ],
  dont: [
    'Menaruh label di dalam kolom sebagai placeholder, atau membuatnya melayang.',
    'Menampilkan galat saat seseorang masih mengetik percobaan pertamanya.',
    'Menulis gaya kotak baru untuk kolom (pil membulat, hanya garis bawah, bayangan). Pakai `.control`.',
    'Menonaktifkan kolom tanpa menyebut alasannya di teks bantuan.',
  ],
};
