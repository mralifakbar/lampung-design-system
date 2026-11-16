const shut = `const o = this.closest('.overlay'); o.classList.add('is-closing'); setTimeout(() => { o.hidden = true; o.classList.remove('is-closing'); document.getElementById('md-ov-open').focus(); }, 180);`;

export default {
  summary: 'Dialog tingkat halaman di atas seluruh jendela: `<dialog class="modal">` native di top layer, atau `.overlay` yang dirender di tempat oleh framework. Di bawah 600 px modal native menjadi bottom sheet. Tutup dengan `closeModal()` agar animasi keluarnya diputar.',
  when: [
    'Formulir atau konfirmasi milik seluruh halaman, bukan satu area: laporkan kesalahan data, undang petugas, ubah data profil.',
    'Lapisan harus berada di atas segalanya, termasuk header sticky dan app shell, tanpa mengatur z-index.',
    'Aplikasi React atau framework lain yang memasang dan melepas lapisan sendiri (`.overlay`).',
  ],
  whenNot: [
    ['Pertanyaan singkat di dalam area yang diposisikan (kanvas, pratinjau, bingkai ponsel)', 'dialog'],
    ['Mengonfirmasi aksi destruktif', 'alert-dialog', 'Pakai anatomi alert dialog (ikon, judul, tombol danger) di dalam modal jika harus tingkat halaman'],
    ['Tugas di ponsel yang sebaiknya bisa diseret dan tetap memperlihatkan halaman di belakang', 'sheet'],
    ['Filter atau detail di samping daftar pada layar lebar', 'drawer'],
    ['Menampilkan gambar lebih besar', 'lightbox'],
    ['Alur panjang dengan banyak langkah', 'steps', 'Beri halaman sendiri dengan steps'],
  ],
  where: 'Di tengah jendela, paling lebar 520 px (`.overlay__panel` 440 px), berjarak 16 px dari tepi dan bergulir sendiri jika tinggi. Di bawah 600 px modal native menempel di bawah sebagai sheet dengan sudut atas membulat dan padding safe-area. Taruh `<dialog>` di mana saja di halaman; top layer yang mengangkatnya.',
  anatomy: [
    ['dialog.modal', 'Wajib untuk versi native. `id`, `aria-labelledby` ke judul. Dibuka dengan `showModal()`.'],
    ['.overlay', 'Wajib untuk versi di tempat: scrim fixed selebar jendela yang menengahkan panel; dirender hanya saat terbuka.'],
    ['.overlay__panel[role=dialog][aria-modal=true]', 'Panel di dalam `.overlay`; kolom dengan jarak 8 px.'],
    ['.dialog__close', '[Icon button](icon-button) tutup, kanan atas; `data-lds-modal-close` di versi native.'],
    ['.dialog__title / .dialog__body', 'Judul wajib dan baris konteks, bagian yang sama dengan [dialog](dialog).'],
    ['.dialog__actions', 'Wajib. Sekunder lalu utama, berbagi lebar.'],
    ['[data-lds-modal="id"]', 'Pemicu untuk modal native.'],
  ],
  examples: [
    {
      title: 'Modal halaman native',
      desc: 'Terbuka di atas seluruh halaman di top layer. Escape, klik pada backdrop, dan Batal semuanya memutar animasi keluar sebelum menutup. Persempit jendela di bawah 600 px untuk melihatnya sebagai bottom sheet.',
      html: `<button class="btn btn--secondary" data-lds-modal="md-report"><span class="ic" aria-hidden="true">error</span>Laporkan kesalahan data</button>
<dialog class="modal" id="md-report" aria-labelledby="md-report-t">
  <button class="icon-btn dialog__close" data-lds-modal-close aria-label="Tutup"><span class="ic" aria-hidden="true">close</span></button>
  <h2 class="dialog__title" id="md-report-t">Laporkan kesalahan data</h2>
  <p class="dialog__body">Beri tahu kami apa yang salah pada data jadwal puskesmas dan seharusnya seperti apa.</p>
  <div class="field" style="margin-top: 16px;"><div class="control control--area"><textarea aria-label="Apa yang salah" placeholder="Jadwal menulis buka pukul 07.00, papan di lokasi menulis 08.00."></textarea></div></div>
  <div class="dialog__actions"><button class="btn btn--secondary" data-lds-modal-close>Batal</button><button class="btn btn--primary" data-lds-modal-close>Kirim laporan</button></div>
</dialog>`,
    },
    {
      title: 'Overlay di tempat',
      desc: 'Lapisan yang sama dirender oleh framework: pasang `.overlay` untuk membuka, panggil `closeModal(el, unmount)` untuk memutar animasi keluar lalu melepasnya. Di sini ditampilkan di dalam kotak ini.',
      html: `<button class="btn btn--secondary" id="md-ov-open" onclick="const o = document.getElementById('md-ov'); o.hidden = false; o.querySelector('input').focus();"><span class="ic" aria-hidden="true">person_add</span>Undang petugas</button>
<div class="overlay" id="md-ov" hidden>
  <div class="overlay__panel" role="dialog" aria-modal="true" aria-labelledby="md-ov-t">
    <button class="icon-btn dialog__close" aria-label="Tutup" onclick="${shut}"><span class="ic" aria-hidden="true">close</span></button>
    <h2 class="dialog__title" id="md-ov-t">Undang petugas</h2>
    <p class="dialog__body">Petugas menerima email berisi tautan untuk bergabung dengan tim verifikasi izin.</p>
    <div class="control"><input type="email" aria-label="Alamat email" placeholder="nama@contoh.id"></div>
    <div class="dialog__actions"><button class="btn btn--secondary" onclick="${shut}">Batal</button><button class="btn btn--primary" onclick="${shut}">Kirim undangan</button></div>
  </div>
</div>`,
      code: `{open && (
  <div className="overlay" ref={ref} onKeyDown={(e) => e.key === 'Escape' && closeModal(ref.current, () => setOpen(false))}>
    <div className="overlay__panel" role="dialog" aria-modal="true" aria-labelledby="invite-t">
      <h2 className="dialog__title" id="invite-t">Undang petugas</h2>
      <p className="dialog__body">Petugas menerima email berisi tautan untuk bergabung dengan tim verifikasi izin.</p>
      <div className="dialog__actions">
        <button className="btn btn--secondary" onClick={() => closeModal(ref.current, () => setOpen(false))}>Batal</button>
        <button className="btn btn--primary" onClick={send}>Kirim undangan</button>
      </div>
    </div>
  </div>
)}`,
    },
  ],
  variants: [
    ['dialog.modal', 'Native: top layer, `::backdrop`, fokus diurus browser, bottom sheet di bawah 600 px. Bawaan.'],
    ['.overlay > .overlay__panel', 'Di tempat: untuk framework yang merender lapisan secara kondisional. Tetap di tengah di ponsel. Anda yang menangani Escape, fokus, dan klik backdrop.'],
  ],
  states: [
    ['[open]', 'Modal native tampil; masuk dengan spring dan backdrop-nya muncul perlahan.'],
    ['.is-closing', 'Memutar animasi keluar (`lds-modal-out`, atau `lds-sheet-down` di ponsel). Ditambahkan oleh `closeModal()`, dihapus setelah tertutup.'],
  ],
  motion: [
    'Masuk: `lds-modal-in` dari `translateY(8px) scale(0.96)` dan transparan, dengan `--spring-smooth` selama `--d-smooth` (560 ms). Backdrop muncul selama `--d-standard` (240 ms); `.overlay` muncul selama `--d-fast`.',
    'Keluar: `lds-modal-out` ke `scale(0.97)` dan transparan selama `--d-exit` (180 ms) dengan `--ease-exit`, backdrop memudar bersamanya. `closeModal()` menunggunya, lalu memanggil `close()` atau `done` Anda.',
    'Ponsel (600 px ke bawah): modal native naik dengan `lds-sheet-up` pada `--spring-smooth` dan turun dengan `lds-sheet-down` dalam 260 ms dengan `--ease-exit`.',
    'Reduced motion: tanpa animasi; `closeModal()` langsung menutup.',
  ],
  a11y: [
    'Native: `showModal()` membuat sisa halaman inert, mengunci fokus, dan memindahkannya ke elemen pertama yang bisa difokus (atau `[autofocus]`); saat ditutup browser mengembalikan fokus ke pemicu.',
    'Native: `aria-labelledby` ke judul. Escape dicegat (`cancel`) agar animasi keluar diputar sebelum menutup.',
    'Overlay: taruh `role="dialog"`, `aria-modal="true"`, dan `aria-labelledby` pada `.overlay__panel`; pindahkan fokus ke dalamnya saat dipasang, kunci Tab, tutup dengan Escape, dan kembalikan fokus ke pemicu setelah dilepas. Sistem tidak melakukan ini untuk `.overlay`.',
  ],
  do: [
    'Tutup dengan `closeModal()` (atau `[data-lds-modal-close]`) agar animasi keluar diputar; jangan pernah memanggil `dialog.close()` langsung.',
    'Batasi pada satu tugas dengan satu aksi utama.',
    'Biarkan konten panjang bergulir di dalam modal, bukan halaman di belakangnya.',
  ],
  dont: [
    'Membungkus `dialog.modal` dengan pembungkus fixed sendiri atau memberinya z-index; top layer sudah melakukannya.',
    'Membuka modal saat halaman dimuat.',
    'Menumpuk modal di atas modal.',
  ],
  js: '`[data-lds-modal="id"]` membuka `dialog#id.modal` dengan `openModal(el)` (`showModal()`). Di dalamnya, `[data-lds-modal-close]`, Escape, dan klik pada backdrop memanggil `closeModal(el)`, yang menambahkan `.is-closing`, menunggu animasi keluar (180 ms; 260 ms sebagai sheet ponsel), lalu menutup. `closeModal(overlayEl, done)` melakukan hal yang sama untuk `.overlay` lalu memanggil `done` untuk melepasnya.',
  react: `import { closeModal } from 'lampung-design-system/react';

const ref = useRef<HTMLDivElement>(null);
{open && (
  <div className="overlay" ref={ref}>
    <div className="overlay__panel" role="dialog" aria-modal="true" aria-labelledby="t">…
      <button className="btn btn--secondary" onClick={() => closeModal(ref.current, () => setOpen(false))}>Batal</button>
    </div>
  </div>
)}`,
};
