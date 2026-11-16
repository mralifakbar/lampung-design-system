export default {
  summary: 'Dialog yang meminta konfirmasi untuk aksi yang destruktif atau tidak bisa dibatalkan. Judulnya menyebut objek dan akibatnya; tombol aman mendapat fokus; tombol destruktif adalah satu-satunya tempat `btn--danger`.',
  when: [
    'Sebelum sesuatu yang tidak bisa dibatalkan: menghapus layanan, mengeluarkan anggota, membuang berkas yang sudah diverifikasi.',
    'Saat toast Urungkan tidak mungkin karena aksinya berdampak di luar aplikasi (email terkirim, pembayaran dilakukan, data terhapus untuk semua orang).',
  ],
  whenNot: [
    ['Aksinya bisa dibatalkan', 'toast', 'Jalankan langsung dan tawarkan Urungkan di toast; lebih cepat dan menghargai orang'],
    ['Konfirmasi yang berbobot tetapi tidak berbahaya (kirim permohonan, bayar)', 'hold-to-confirm'],
    ['Aksi destruktif kecil di dalam baris', 'confirm-in-place', 'Kontrol berpindah dari diam ke bertanya ke selesai di tempat'],
    ['Pertanyaan yang tidak destruktif atau isian singkat', 'dialog'],
    ['Konfirmasi tingkat halaman di atas seluruh jendela', 'modal', 'Pakai `dialog.modal` dengan ikon, judul, dan tombol danger yang sama'],
  ],
  where: 'Di tengah di atas scrim dalam kontainer yang diposisikan, seperti [dialog](dialog). Muncul tepat setelah orang menekan kontrol destruktif, tidak pernah saat halaman dimuat.',
  anatomy: [
    ['.dialog[role=alertdialog][aria-modal=true]', 'Wajib. Lapisan dengan `data-lds-layer`, `aria-labelledby` ke judul, dan `aria-describedby` ke isi.'],
    ['.dialog__icon', 'Kotak 44 px ber-tint danger dengan ikon terisi (`delete`, `warning`).'],
    ['.dialog__title', 'Wajib. "Hapus layanan Izin usaha mikro?": kata kerja dan objeknya.'],
    ['.dialog__body', 'Wajib. Apa yang hilang, bagi siapa, dan bahwa ini tidak bisa dibatalkan.'],
    ['.dialog__actions', 'Wajib. Tombol aman lebih dulu (`btn--secondary`, `data-lds-autofocus`), lalu `btn--danger` yang dinamai dengan kata kerjanya.'],
    ['.scrim[data-lds-scrim]', 'Wajib. Mengkliknya membatalkan.'],
  ],
  examples: [
    {
      title: 'Hapus layanan',
      desc: 'Fokus mendarat di "Simpan layanan", sehingga Enter yang tak sengaja tetap aman. Escape, scrim, dan "Simpan layanan" semuanya membatalkan.',
      html: `<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--danger-tinted btn--md" data-lds-open="ad-delete" aria-haspopup="dialog"><span class="ic" aria-hidden="true">delete</span>Hapus layanan</button>
  </div>
  <div class="scrim" data-lds-scrim="ad-delete"></div>
  <div class="dialog" id="ad-delete" role="alertdialog" aria-modal="true" aria-labelledby="ad-delete-t" aria-describedby="ad-delete-b" data-lds-layer>
    <div class="dialog__icon"><span class="ic ic--fill" aria-hidden="true">delete</span></div>
    <h3 class="dialog__title" id="ad-delete-t">Hapus layanan Izin usaha mikro?</h3>
    <p class="dialog__body" id="ad-delete-b">Semua permohonan dan berkasnya dihapus untuk setiap pemohon. Tindakan ini tidak bisa dibatalkan.</p>
    <div class="dialog__actions"><button class="btn btn--secondary btn--md" data-lds-close data-lds-autofocus>Simpan layanan</button><button class="btn btn--danger btn--md" data-lds-close>Hapus</button></div>
  </div>
</div>`,
    },
    {
      title: 'Keluarkan anggota',
      desc: 'Ikon peringatan saat aksinya bisa dikembalikan oleh orang lain, tetapi tidak oleh orang ini.',
      html: `<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--danger-tinted btn--md" data-lds-open="ad-remove" aria-haspopup="dialog">Keluarkan dari tim</button>
  </div>
  <div class="scrim" data-lds-scrim="ad-remove"></div>
  <div class="dialog" id="ad-remove" role="alertdialog" aria-modal="true" aria-labelledby="ad-remove-t" aria-describedby="ad-remove-b" data-lds-layer>
    <div class="dialog__icon"><span class="ic ic--fill" aria-hidden="true">warning</span></div>
    <h3 class="dialog__title" id="ad-remove-t">Keluarkan Rina Wijaya dari tim verifikasi?</h3>
    <p class="dialog__body" id="ad-remove-b">Ia kehilangan akses ke berkas permohonan dan riwayat kerjanya diarsipkan. Hanya administrator yang bisa menambahkannya kembali.</p>
    <div class="dialog__actions"><button class="btn btn--secondary btn--md" data-lds-close data-lds-autofocus>Batal</button><button class="btn btn--danger btn--md" data-lds-close>Keluarkan</button></div>
  </div>
</div>`,
    },
  ],
  states: [
    ['.is-open', 'Tampil bersama scrim-nya; fokus pada tombol aman.'],
    ['danger button loading', 'Jika penghapusan butuh waktu, beri tombol danger `.is-loading` dan biarkan dialog terbuka sampai selesai, lalu konfirmasi dengan [toast](toast).'],
  ],
  motion: [
    'Sama seperti [dialog](dialog): masuk dengan `--spring-smooth` dari `translateY(4px) scale(0.98)` dengan opacity selama `--d-fast`; keluar selama `--d-exit` (180 ms) dengan `--ease-exit`.',
    'Tanpa guncangan, denyut, atau kilatan merah: kata-katanya yang membawa bobot. Reduced motion: hanya opacity.',
  ],
  a11y: [
    '`role="alertdialog"` agar pembaca layar langsung mengumumkannya, dengan `aria-labelledby` ke judul dan `aria-describedby` ke isi.',
    'Fokus menuju tombol aman (`data-lds-autofocus`); Tab dikunci; Escape membatalkan; fokus kembali ke pemicu destruktif.',
    'Tombol danger mengulang kata kerja dari judul ("Hapus", "Keluarkan"), tidak pernah "OK" atau "Ya".',
  ],
  do: [
    'Sebut objeknya di judul dan akibatnya di isi.',
    'Jadikan pilihan aman sebagai fokus bawaan.',
    'Utamakan menjalankan aksi dengan [toast](toast) Urungkan bila pembatalan memungkinkan.',
  ],
  dont: [
    'Memakai alert dialog untuk "Yakin ingin menyimpan?".',
    'Memakai `btn--danger` di tempat lain dalam produk.',
    'Meminta orang mengetik nama untuk konfirmasi kecuali kerugiannya besar sekali dan jarang terjadi.',
  ],
  js: 'Hook sama dengan [dialog](dialog): `data-lds-open`, `data-lds-close`, `data-lds-scrim`, `data-lds-layer`, `data-lds-autofocus`; `openLayer` / `closeLayer`; event `lds:open` / `lds:close`. Jalankan aksi destruktif dari handler klik tombol danger.',
};
