const row = ({ icon = 'description', name, meta, pct, state }) => `<li class="file-row${state === 'error' ? ' is-error' : ''}">
      <span class="file-row__icon"><span class="ic" aria-hidden="true">${state === 'error' ? 'error' : icon}</span></span>
      <span class="file-row__body"><span class="file-row__name">${name}</span><span class="file-row__meta">${meta}</span>${pct != null ? `<span class="progress progress--thin" role="progressbar" aria-label="Mengunggah ${name}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span class="progress__fill" style="transform: scaleX(${pct / 100});"></span></span>` : ''}</span>
      ${state === 'error' ? `<button type="button" class="icon-btn" aria-label="Coba lagi ${name}"><span class="ic" aria-hidden="true">refresh</span></button>` : state === 'up' ? `<button type="button" class="icon-btn" aria-label="Batalkan unggahan ${name}"><span class="ic" aria-hidden="true">close</span></button>` : `<button type="button" class="icon-btn" aria-label="Hapus ${name}"><span class="ic" aria-hidden="true">delete</span></button>`}
    </li>`;

const PICK = `const list = document.getElementById('fi-list'); [...this.files].forEach((f) => { const li = document.createElement('li'); li.className = 'file-row'; li.innerHTML = document.getElementById('fi-tpl').innerHTML; li.querySelector('.file-row__name').textContent = f.name; li.querySelector('.file-row__meta').textContent = (f.size / 1048576).toFixed(1) + ' MB'; list.append(li); }); this.value = '';`;

export default {
  summary: 'Zona lepas dengan tombol Pilih sungguhan, dan satu baris per berkas terpilih yang menampilkan ukuran, progres unggah, galat, dan cara menghapusnya. Tombol adalah jalur utama; menjatuhkan berkas hanya jalan pintas.',
  when: [
    'Orang melampirkan berkas ke formulir: KTP, kartu keluarga, foto lokasi, surat pengantar.',
    'Beberapa berkas diunggah sekaligus dan masing-masing butuh progres, coba lagi, dan hapus sendiri (`.file-row`).',
    'Satu berkas besar diunggah dan zona lepas itu sendiri menampilkan progres di sekeliling tepinya (`uploadProgress`).',
  ],
  whenNot: [
    ['Menampilkan berkas yang sudah tersimpan, untuk dibuka atau diunduh', 'list', 'Baris bertautan dengan ikon berkas; tanpa zona lepas'],
    ['Progres satu tugas panjang yang bukan unggahan (verifikasi, impor)', 'progress-bar'],
    ['Menempel atau mengetik teks, tautan, atau kode', 'textarea'],
    ['Melihat gambar terpilih dalam ukuran besar', 'lightbox'],
  ],
  where: 'Di [formulir](form-layout), selebar kolomnya, dengan baris berkas tepat di bawah zona lepas. Di ponsel buat zona lepas pendek (orang mengetuk Pilih; tidak ada yang menyeret) dan baris selebar layar.',
  anatomy: [
    ['.drop', 'Wajib. Zonanya: kolom di tengah, padding 28 px, tepi garis 1.5 px. `.is-over` selama berkas diseret di atasnya.'],
    ['.drop > .ic', 'Wajib. Ikon 28 px (`upload_file` atau `cloud_upload`); naik 3 px selama `.is-over`.'],
    ['.empty__title / .empty__body', 'Judul ("Lepaskan berkas Anda di sini") serta jenis dan ukuran yang diterima. Zona lepas tidak punya kelas teks sendiri; kelas empty state ini memberi tipografi yang tepat.'],
    ['.btn + input[type=file][hidden]', 'Wajib. Tombol sungguhan yang membuka input berkas tersembunyi. Ini jalur keyboard dan ponsel.'],
    ['ul > li.file-row', 'Satu baris per berkas, 56 px, isian tenang, berjarak 6 px. Masuk dengan blur-in singkat.'],
    ['.file-row__icon', 'Petak 36 px dengan ikon jenis berkas (`description`, `image`, `insert_drive_file`); menampilkan `error` saat gagal.'],
    ['.file-row__body', 'Nama (`.file-row__name`, satu baris dengan elipsis), meta (`.file-row__meta`, ukuran dan status), dan `.progress.progress--thin` selama mengunggah.'],
    ['.icon-btn', 'Aksi di belakang: batal saat mengunggah, hapus saat selesai, coba lagi saat galat. Dinamai dengan berkasnya.'],
    ['.drop__ring / .drop__pct', 'Dibuat oleh `uploadProgress(drop, pct)`: jejak di sekeliling tepi dan pil persentase.'],
  ],
  examples: [
    {
      title: 'Zona lepas dengan baris berkas',
      desc: 'Pilih berkas (atau seret ke atas zona). Setiap berkas menjadi satu baris; baris yang mengunggah menampilkan bilah tipis, baris selesai menampilkan tombol hapus, baris gagal menyebut alasannya dan menawarkan coba lagi.',
      html: `<div class="docs-col" style="max-width: 520px;">
  <div class="drop" ondragover="event.preventDefault(); this.classList.add('is-over');" ondragleave="this.classList.remove('is-over');" ondrop="event.preventDefault(); this.classList.remove('is-over'); const i = this.querySelector('input'); i.files = event.dataTransfer.files; i.dispatchEvent(new Event('change'));">
    <span class="ic" aria-hidden="true">upload_file</span>
    <span class="empty__title">Lepaskan dokumen persyaratan di sini</span>
    <span class="empty__body">PDF atau gambar, masing-masing paling besar 10 MB</span>
    <button type="button" class="btn btn--secondary btn--sm" style="margin-top: 8px;" onclick="this.nextElementSibling.click()">Pilih berkas</button>
    <input type="file" multiple accept=".pdf,image/*" hidden aria-label="Dokumen persyaratan" onchange="${PICK}">
  </div>
  <template id="fi-tpl"><span class="file-row__icon"><span class="ic" aria-hidden="true">description</span></span><span class="file-row__body"><span class="file-row__name"></span><span class="file-row__meta"></span></span><button type="button" class="icon-btn" aria-label="Hapus berkas" onclick="this.parentElement.remove()"><span class="ic" aria-hidden="true">delete</span></button></template>
  <ul id="fi-list" aria-label="Berkas terpilih">
    ${row({ name: 'ktp-pemohon.pdf', meta: '2,4 MB · Terunggah' })}
    ${row({ icon: 'image', name: 'foto-lokasi-usaha.jpg', meta: '1,1 MB dari 3,0 MB · 37%', pct: 37, state: 'up' })}
    ${row({ name: 'surat-pengantar-rt.pdf', meta: 'Unggahan gagal. Periksa koneksi lalu coba lagi.', state: 'error' })}
  </ul>
</div>`,
      code: `<div class="drop">
  <span class="ic" aria-hidden="true">upload_file</span>
  <span class="empty__title">Lepaskan dokumen persyaratan di sini</span>
  <span class="empty__body">PDF atau gambar, masing-masing paling besar 10 MB</span>
  <button type="button" class="btn btn--secondary btn--sm">Pilih berkas</button>
  <input type="file" multiple accept=".pdf,image/*" hidden aria-label="Dokumen persyaratan">
</div>
<ul aria-label="Berkas terpilih">
  <li class="file-row">
    <span class="file-row__icon"><span class="ic" aria-hidden="true">image</span></span>
    <span class="file-row__body">
      <span class="file-row__name">foto-lokasi-usaha.jpg</span>
      <span class="file-row__meta">1,1 MB dari 3,0 MB · 37%</span>
      <span class="progress progress--thin" role="progressbar" aria-label="Mengunggah foto-lokasi-usaha.jpg" aria-valuemin="0" aria-valuemax="100" aria-valuenow="37"><span class="progress__fill" style="transform: scaleX(0.37);"></span></span>
    </span>
    <button type="button" class="icon-btn" aria-label="Batalkan unggahan foto-lokasi-usaha.jpg"><span class="ic" aria-hidden="true">close</span></button>
  </li>
  <li class="file-row is-error">…<span class="file-row__meta">Unggahan gagal. Periksa koneksi lalu coba lagi.</span>…</li>
</ul>
<!-- Your code: the button calls input.click(); dragover sets .is-over, dragleave and drop remove it; each file becomes a row. -->`,
    },
    {
      title: 'Satu berkas, progres di sekeliling tepi',
      desc: 'Untuk satu unggahan, zona menelusuri tepinya sendiri dan menampilkan pil persentase; jejaknya menjadi hijau pada 100 %. Tekan Unggah.',
      html: `<div class="drop" id="fi-drop" style="max-width: 520px; width: 100%;">
  <span class="ic" aria-hidden="true">cloud_upload</span>
  <span class="empty__title">denah-lokasi-usaha.pdf</span>
  <span class="empty__body">8,6 MB</span>
  <button type="button" class="btn btn--secondary btn--sm" style="margin-top: 8px;" onclick="const d = document.getElementById('fi-drop'); import('../../js/lds.js').then((m) => { m.uploadReset(d); let p = 0; const t = setInterval(() => { p += 4 + Math.random() * 10; m.uploadProgress(d, Math.min(p, 100)); if (p >= 100) clearInterval(t); }, 220); });">Unggah</button>
</div>`,
    },
  ],
  states: [
    ['.drop.is-over', 'Berkas sedang diseret di atasnya: warna aksen tipis, tepi aksen 2 px, skala 1.01, ikon naik 3 px.'],
    ['.drop.is-uploading / .is-complete', 'Disetel oleh `uploadProgress`: tepi menjadi tenang, jejak tergambar, pil menampilkan persentase; selesai mengubah keduanya menjadi hijau.'],
    ['.file-row uploading', 'Meta berbunyi "1,1 MB dari 3,0 MB · 37%", bilah `.progress--thin` di bawahnya, tombol batal.'],
    ['.file-row done', 'Meta menyebut ukuran dan "Terunggah"; bilah hilang; tombol hapus.'],
    ['.file-row.is-error', 'Ikon dan meta dalam warna danger; meta menyebut apa yang gagal dan apa yang harus dilakukan; tombol coba lagi.'],
    ['rejected file', 'Jenis salah atau terlalu besar: jangan tambahkan baris; sebutkan di bawah zona dengan `.field__help--error` ("surat.docx bukan PDF atau gambar").'],
  ],
  motion: [
    'Seret di atas: warna dan tepi dalam `--d-fast` (160 ms) dengan `--ease-standard`; zona berskala 1.01 dengan `--spring-smooth` (560 ms); ikon naik dengan `--spring-snappy`. Keluar membalik transisi yang sama.',
    'Baris baru masuk dengan `lds-blur-in` (naik 4 px dan blur 4 px) dalam `--d-standard` (240 ms) dengan `--ease-enter`.',
    'Bilah baris terisi dengan `transform: scaleX()` dalam `--d-considered` (480 ms) dengan `--ease-inout`, sehingga event progres yang melompat-lompat tetap tampak halus.',
    'Jejak tepi (`uploadProgress`) menggerakkan garis putusnya dalam 200 ms linear; pil turun dari 10 px dengan blur memakai `--spring-snappy`; pada 100 % haptic berhasil berbunyi di ponsel. Lihat [upload progress](upload-progress).',
    'Reduced motion: tanpa skala atau naik; perubahan warna dan progres menjadi 120 ms linear.',
  ],
  a11y: [
    'Pengguna keyboard dan pembaca layar memakai tombol Pilih, `<button type="button">` sungguhan yang memanggil `input.click()` pada input berkas `hidden` dengan `aria-label`. Menjatuhkan berkas tidak pernah menjadi satu-satunya cara.',
    'Setel `accept` dan sebutkan jenis serta ukurannya di teks zona, sebelum orang memilih.',
    'Setiap baris yang mengunggah punya bilah `role="progressbar"` dengan `aria-valuenow` dan nama; pil persentase dari `uploadProgress` juga progressbar.',
    'Tombol baris menyebut aksi dan berkasnya ("Coba lagi surat-pengantar-rt.pdf"). Umumkan unggahan yang selesai atau gagal di area `aria-live="polite"` atau [toast](toast).',
  ],
  do: [
    'Unggah langsung setelah memilih dan tampilkan progres per berkas; biarkan orang tetap mengisi formulir.',
    'Sebutkan alasan berkas gagal dan pertahankan barisnya agar bisa dicoba lagi.',
    'Pakai tombol sungguhan yang dilabeli sesuai hasilnya ("Pilih berkas", "Pilih foto").',
  ],
  dont: [
    'Mengandalkan seret dan lepas saja, atau menyembunyikan input berkas tanpa tombol.',
    'Menambahkan baris untuk berkas yang akan ditolak; jelaskan di bawah zona.',
    'Menggambar bilah progres sendiri di dalam baris; pakai `.progress--thin`.',
  ],
  js: '`uploadProgress(drop, pct)` membuat jejak tepi dan pil persentase pada `.drop` lalu memperbaruinya (menambahkan `.is-uploading`, `.is-complete` pada 100 %); `uploadReset(drop)` menghapus kedua kelas. Memilih berkas, seret di atas, dan baris berkas adalah tugas Anda: sistem tidak punya hook `data-lds-*` untuk itu.',
};
