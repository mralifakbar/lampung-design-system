const row = (t, s, b) => `<div class="lrow"><span class="lrow__body"><span class="lrow__title" style="display: block;">${t}</span><span class="lrow__sub" style="display: block;">${s}</span></span>${b}</div>`;
const skelRow = (w) => `<div class="lrow"><span class="lrow__body"><span class="skel" style="display: block; height: 14px; width: ${w}%;"></span><span class="skel" style="display: block; height: 11px; width: ${w - 25}%; margin-top: 8px;"></span></span><span class="skel" style="width: 64px; height: 22px; border-radius: 6px;"></span></div>`;

const loading = `<div class="list" role="status" aria-busy="true" aria-label="Memuat permohonan">
  ${skelRow(62)}
  ${skelRow(48)}
  ${skelRow(55)}
</div>`;
const empty = `<div class="list list--fill">
  <div class="empty">
    <div class="empty__icon"><span class="ic" aria-hidden="true">event_available</span></div>
    <div class="empty__title">Tidak ada berkas jatuh tempo minggu ini</div>
    <div class="empty__body">Permohonan baru muncul di sini begitu warga mengirimkannya.</div>
    <button class="btn btn--secondary btn--md">Buka kalender lengkap</button>
  </div>
</div>`;
const error = `<div class="alert alert--danger" role="alert">
  <span class="ic" aria-hidden="true">error</span>
  <div>
    <div class="alert__title">Permohonan gagal dimuat</div>
    <div class="alert__body">Layanan perizinan tidak menjawab tepat waktu. Data Anda tetap aman.</div>
    <div class="alert__actions"><button class="btn btn--secondary btn--sm"><span class="ic" aria-hidden="true">refresh</span>Coba lagi</button></div>
  </div>
</div>`;
const loaded = `<div class="list">
  ${row('Izin usaha mikro', 'UMKM Sukarame · jatuh tempo besok', '<span class="badge badge--warning">Besok</span>')}
  ${row('Izin keramaian', 'Kelurahan Kedaton · jatuh tempo Kamis', '<span class="badge">Kam</span>')}
  ${row('Surat keterangan domisili', 'Kecamatan Way Halim · jatuh tempo Jumat', '<span class="badge">Jum</span>')}
</div>`;

export default {
  summary: 'Setiap tampilan yang menampilkan data dirancang dalam empat status: memuat, kosong, galat, dan termuat. Setiap status memakai ulang komponen yang sudah ada (`skel`, `empty`, `alert`) dan menjaga ukuran yang sama, sehingga halaman tidak melompat di antaranya.',
  when: [
    'Daftar, tabel, grafik, grid kartu, atau panel detail apa pun yang isinya berasal dari permintaan data: rancang keempat status sebelum dirilis.',
    'Tampilan memang bisa tidak punya data (akun baru, filter tanpa hasil, minggu yang sepi) dan perlu menjelaskan alasannya serta menawarkan satu aksi yang mengisinya.',
    'Permintaan bisa gagal dan orang perlu tahu apa yang gagal dan cara mencoba lagi, tanpa kehilangan apa yang sudah mereka lihat.',
  ],
  whenNot: [
    ['Tombol yang sibuk setelah ditekan', 'button', 'Pakai status `.is-loading`-nya; jangan ganti tampilan dengan skeleton.'],
    ['Seluruh halaman memuat setelah navigasi', 'nav-progress'],
    ['Menunggu asisten atau komputasi panjang dengan timer yang jujur', 'thinking'],
    ['Progres dengan persentase yang diketahui (unggah, impor)', 'progress-bar'],
    ['Kegagalan yang menyangkut seluruh aplikasi (offline, pemeliharaan)', 'banner'],
    ['Hasil yang sudah terjadi dan tidak perlu tindakan lanjut', 'toast'],
  ],
  where: 'Setiap status mengisi tepat area yang akan diisi konten termuat: kotak daftar, isi tabel, kartu grafik. Bingkai halaman (judul, filter, tab) tetap di tempat dan tetap bisa dipakai. Di ponsel aturannya sama; status kosong berada di tempat baris pertama akan muncul.',
  anatomy: [
    ['.skel', 'Memuat. Blok berbentuk seperti konten asli (tinggi baris sama, lebar judul dan meta sama), berkilau. Lihat [skeleton](skeleton).'],
    ['.empty', 'Kosong. `.empty__icon` + `.empty__title` (apa yang kosong) + `.empty__body` (mengapa, dan apa yang mengisinya) + satu tombol. Lihat [empty state](empty-state).'],
    ['.alert.alert--danger', 'Galat. Apa yang gagal dalam kata sederhana, bahwa tidak ada yang hilang, dan tombol coba lagi di `.alert__actions`. Lihat [alert](alert).'],
    ['role="status" aria-busy="true"', 'Pada kontainer yang memuat, agar teknologi bantu tahu area itu sedang diperbarui.'],
  ],
  examples: [
    {
      title: 'Keempat status',
      desc: 'Daftar permohonan yang sama di setiap status. Beralih di antaranya: kotak tetap di tempat dan kontrol di atasnya tetap bisa dipakai.',
      html: `<div class="stack" style="--gap: 16px; max-width: 520px;">
  <div class="seg" role="group" aria-label="Status" data-lds-segmented style="max-width: 360px;">
    <span class="seg__thumb"></span>
    <button class="seg__btn" aria-pressed="true" onclick="this.closest('.stack').querySelectorAll('[data-state]').forEach(p => p.hidden = p.dataset.state !== 'loading')">Memuat</button>
    <button class="seg__btn" aria-pressed="false" onclick="this.closest('.stack').querySelectorAll('[data-state]').forEach(p => p.hidden = p.dataset.state !== 'empty')">Kosong</button>
    <button class="seg__btn" aria-pressed="false" onclick="this.closest('.stack').querySelectorAll('[data-state]').forEach(p => p.hidden = p.dataset.state !== 'error')">Galat</button>
    <button class="seg__btn" aria-pressed="false" onclick="this.closest('.stack').querySelectorAll('[data-state]').forEach(p => p.hidden = p.dataset.state !== 'loaded')">Termuat</button>
  </div>
  <div data-state="loading">${loading}</div>
  <div data-state="empty" hidden>${empty}</div>
  <div data-state="error" hidden>${error}</div>
  <div data-state="loaded" hidden>${loaded}</div>
</div>`,
      code: `<!-- loading -->
${loading}

<!-- empty -->
${empty}

<!-- error -->
${error}

<!-- loaded -->
${loaded}`,
    },
    {
      title: 'Kosong karena filter',
      desc: 'Jika filter yang menyebabkan hasil kosong, katakan begitu dan tawarkan untuk menghapusnya, bukan membuat sesuatu.',
      html: `<div class="list list--fill" style="max-width: 520px;">
  <div class="empty">
    <div class="empty__icon"><span class="ic" aria-hidden="true">filter_list</span></div>
    <div class="empty__title">Tidak ada layanan yang cocok dengan filter ini</div>
    <div class="empty__body">Tidak ada layanan yang buka di Kecamatan Rajabasa dengan waktu proses kurang dari 3 hari.</div>
    <button class="btn btn--secondary btn--md">Hapus filter</button>
  </div>
</div>`,
    },
    {
      title: 'Galat yang mempertahankan data lama',
      desc: 'Penyegaran gagal tetapi baris yang terakhir dimuat masih berguna: pertahankan dan taruh alert di atasnya.',
      html: `<div class="stack" style="--gap: 12px; max-width: 520px;">
  <div class="alert alert--warning" role="status">
    <span class="ic" aria-hidden="true">sync_problem</span>
    <div>
      <div class="alert__title">Menampilkan data pukul 09.40</div>
      <div class="alert__body">Daftar permohonan tidak bisa diperbarui. Periksa koneksi Anda lalu coba lagi.</div>
      <div class="alert__actions"><button class="btn btn--secondary btn--sm"><span class="ic" aria-hidden="true">refresh</span>Perbarui</button></div>
    </div>
  </div>
  ${loaded}
</div>`,
    },
  ],
  states: [
    ['loading', 'Skeleton yang meniru tata letak termuat, di dalam `role="status" aria-busy="true"`. Tampilkan hanya setelah sekitar 300 ms; respons cepat langsung ke termuat.'],
    ['empty', '`.empty` dengan ikon, judul yang menyebut apa yang kosong, satu kalimat alasan, dan satu aksi yang mengisinya (atau menghapus filter).'],
    ['error', '`.alert--danger` dengan `role="alert"`: apa yang gagal, bahwa tidak ada yang hilang, dan Coba lagi. Jika ada data lama, pertahankan dan pakai `.alert--warning` di atasnya.'],
    ['loaded', 'Konten asli. Hapus `aria-busy` dan role status saat data tiba.'],
  ],
  motion: [
    'Kilau skeleton: pita terang melintasi setiap `.skel` dalam 1,6 detik dengan `--ease-inout`, berulang selama memuat. Dengan reduced motion ia berjalan sekali dan blok tetap diam.',
    'Konten termuat menggantikan skeleton dengan fade dalam `--d-standard` dengan `--ease-enter`; daftar boleh datang dengan [list stagger](list-stagger) (berjarak 35 ms, total di bawah 400 ms). Jangan pernah menganimasikan ukuran kotak.',
    'Galat dan status kosong muncul tanpa gerak; mereka adalah jawaban, bukan peristiwa.',
  ],
  a11y: [
    'Area memuat: `role="status"`, `aria-busy="true"`, dan `aria-label` ("Memuat permohonan"). Blok skeleton adalah elemen kosong, jadi tidak ada lagi yang dibacakan.',
    'Galat yang menghalangi tugas memakai `role="alert"` agar diumumkan sekali; peringatan data lama memakai `role="status"`.',
    'Setelah Coba lagi, kembalikan fokus ke dalam area (baris pertama atau alert) agar pengguna keyboard tidak tertinggal di tombol yang sudah dihapus.',
    'Judul status kosong berupa teks biasa, bukan heading, kecuali area itu adalah bagian halaman dengan heading sendiri.',
  ],
  do: [
    'Bentuk skeleton seperti konten asli: jumlah baris di layar sama, tinggi sama.',
    'Tulis status kosong sebagai jawaban: apa yang kosong, mengapa, dan satu aksinya.',
    'Biarkan data lama terlihat saat penyegaran gagal.',
  ],
  dont: [
    'Menampilkan spinner sendirian di tengah kotak kosong untuk konten yang bentuknya sudah diketahui.',
    'Menulis "Tidak ada data" atau "Terjadi kesalahan" tanpa alasan dan tanpa langkah berikutnya.',
    'Mengganti kontrol halaman (filter, tab, pencarian) dengan skeleton; hanya area data yang memuat.',
  ],
  js: 'Tidak wajib. Ganti status dari lapisan data Anda. `toast()` untuk hasil aksi, bukan untuk galat pemuatan.',
  react: `import { Alert } from 'lampung-design-system/react';

if (status === 'loading') return <div className="list" role="status" aria-busy="true" aria-label="Memuat permohonan">{/* .skel rows */}</div>;
if (status === 'error') return <Alert tone="danger" title="Permohonan gagal dimuat" actions={<button className="btn btn--secondary btn--sm" onClick={retry}>Coba lagi</button>}>Layanan perizinan tidak menjawab tepat waktu.</Alert>;
if (items.length === 0) return <div className="empty">{/* icon, title, body, one action */}</div>;`,
};
