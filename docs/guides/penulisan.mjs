// Writing guide: how to write interface copy for public services in Indonesian.
export default {
  slug: 'penulisan',
  order: 5,
  icon: 'edit_square',
  id: {
    title: 'Penulisan',
    lede: 'Cara menulis teks antarmuka untuk layanan publik dalam bahasa Indonesia: jelas bagi setiap warga, sopan tanpa berbelit, dan selalu memberi tahu langkah berikutnya.',
    body: `
<h2 id="prinsip">Bahasa yang dipahami semua warga</h2>
<p class="cdoc__p">Layanan publik dipakai oleh siapa saja: pelajar, petani, pedagang, pensiunan, orang yang baru pertama kali memakai ponsel pintar. Tulislah untuk mereka semua. Teks yang bisa dipahami orang dengan pendidikan dasar tetap terasa jelas bagi orang dengan gelar sarjana; sebaliknya tidak berlaku.</p>
<ul class="cdoc__list">
  <li>Satu kalimat, satu gagasan. Usahakan kalimat di bawah 20 kata.</li>
  <li>Pakai kata sehari-hari: "isi", "kirim", "ubah", bukan "lakukan pengisian", "melakukan pengiriman", "melakukan perubahan".</li>
  <li>Letakkan hal terpenting di awal: apa yang harus dilakukan, sampai kapan, dan apa akibatnya.</li>
  <li>Hindari bahasa surat dinas di layar. "Dengan hormat, bersama ini kami sampaikan" tidak dibutuhkan di formulir.</li>
</ul>

<h2 id="nada">Kalimat aktif, sapaan dan huruf kapital</h2>
<p class="cdoc__p"><strong>Kalimat aktif.</strong> Sebutkan siapa yang berbuat. "Petugas akan memeriksa berkas Anda dalam 3 hari kerja" lebih jelas daripada "Berkas akan diperiksa". Kalimat pasif boleh dipakai bila pelakunya memang tidak penting atau tidak diketahui.</p>
<p class="cdoc__p"><strong>Sapaan.</strong> Sapa pembaca dengan "Anda" (huruf A kapital), tetapi seperlunya. Kalimat perintah yang sopan sering lebih ringkas: "Unggah foto KTP" cukup, tidak perlu "Anda diharapkan untuk mengunggah foto KTP Anda". Jangan memakai "kamu", "Bapak/Ibu" atau "Saudara" di antarmuka; satu sapaan yang sama di seluruh layanan memudahkan orang.</p>
<p class="cdoc__p"><strong>Huruf kapital kalimat.</strong> Judul, tombol, label dan menu memakai huruf kapital hanya di awal dan pada nama diri: "Riwayat permohonan", bukan "Riwayat Permohonan". Jangan menulis seluruh kata dengan huruf kapital untuk memberi tekanan.</p>
<p class="cdoc__p"><strong>Tanda baca.</strong> Jangan memakai tanda pisah panjang (em dash). Pecah kalimatnya, atau pakai titik dua, koma atau tanda kurung. Build dokumentasi ini menolak tanda pisah panjang. Hindari tanda seru kecuali untuk peringatan keselamatan yang sungguh mendesak.</p>

<h2 id="tombol">Tombol dan tautan</h2>
<p class="cdoc__p">Label tombol menyebut hasil yang terjadi setelah tombol ditekan. Orang harus bisa menebak akibatnya tanpa membaca teks lain di layar.</p>
<ul class="cdoc__list">
  <li>Pakai kata kerja dan objeknya: <code class="code">Kirim laporan</code>, <code class="code">Simpan perubahan</code>, <code class="code">Unduh bukti bayar</code>, <code class="code">Batalkan permohonan</code>.</li>
  <li>Hindari label umum seperti "Submit", "OK", "Proses" atau "Klik di sini".</li>
  <li>Dalam dialog konfirmasi, tombol mengulang tindakannya: "Hapus draf?" dijawab dengan <code class="code">Hapus draf</code> dan <code class="code">Batal</code>, bukan "Ya" dan "Tidak".</li>
  <li>Teks tautan menyebut tujuannya: "Lihat syarat izin usaha", bukan "selengkapnya".</li>
  <li>Satu tombol utama per layar. Lihat <a class="link" href="{{comp}}button.html">Tombol</a> untuk varian dan urutannya.</li>
</ul>

<h2 id="galat">Pesan galat dan konfirmasi</h2>
<p class="cdoc__p">Pesan galat menjawab dua pertanyaan: apa yang terjadi, dan apa yang bisa dilakukan sekarang. Jangan menyalahkan pembaca, jangan menampilkan kode teknis tanpa penjelasan, dan jangan berhenti di "Terjadi kesalahan".</p>
<ul class="cdoc__list">
  <li>Galat pada kolom ditaruh tepat di bawah kolom itu: "NIK harus 16 angka. Anda mengisi 15." (lihat <a class="link" href="{{comp}}text-field.html">Kolom teks</a>).</li>
  <li>Galat sistem menyebut apa yang tetap aman: "Laporan belum terkirim karena koneksi terputus. Isian Anda tersimpan. Coba kirim lagi."</li>
  <li>Konfirmasi sukses menyebut hasil dan waktu tunggu: "Laporan terkirim. Nomor tiket LPR-20261112-0042. Petugas membalas dalam 2 hari kerja."</li>
  <li>Ringkasan di atas formulir memakai <a class="link" href="{{comp}}alert.html">Alert</a>; warna dan ikon hanya pendukung, kata-katanya yang membawa makna.</li>
</ul>
<div class="alert alert--danger"><span class="ic" aria-hidden="true">error</span><div><div class="alert__title">Foto KTP belum bisa diunggah</div><div class="alert__body">Ukuran berkas 8 MB, batasnya 5 MB. Perkecil foto atau pilih berkas lain.</div></div></div>

<h2 id="angka">Angka, tanggal, waktu dan mata uang</h2>
<p class="cdoc__p">Pakai format Indonesia di semua teks berbahasa Indonesia, termasuk di tabel dan grafik.</p>
<div class="table-box"><table class="table table--wrap">
  <thead><tr><th>Jenis</th><th>Tulis</th><th>Jangan</th></tr></thead>
  <tbody>
    <tr><td>Mata uang</td><td>Rp 75.000</td><td>Rp75000, IDR 75,000, 75rb</td></tr>
    <tr><td>Desimal</td><td>2,5 km</td><td>2.5 km</td></tr>
    <tr><td>Ribuan</td><td>12.480 warga</td><td>12,480 warga</td></tr>
    <tr><td>Tanggal</td><td>12 November 2026</td><td>11/12/2026, 2026-11-12, Nov 12</td></tr>
    <tr><td>Hari dan tanggal</td><td>Kamis, 12 November 2026</td><td>Kamis 12/11</td></tr>
    <tr><td>Waktu</td><td>08.30 WIB</td><td>8:30 AM, jam 8.30 pagi</td></tr>
    <tr><td>Rentang</td><td>08.00 sampai 15.00 WIB</td><td>08.00-15.00</td></tr>
    <tr><td>Nomor telepon</td><td>0721 123 456</td><td>(0721)123456</td></tr>
  </tbody>
</table></div>
<p class="cdoc__p">Tulis zona waktu (WIB) bila layanan bisa diakses dari luar Lampung. Angka yang berubah atau disejajarkan di tabel memakai angka tabular. Di dalam kalimat, angka satu sampai sembilan boleh ditulis dengan huruf, kecuali untuk jumlah, ukuran dan tenggat yang perlu dipindai cepat.</p>

<h2 id="istilah">Istilah, singkatan dan bahasa inklusif</h2>
<p class="cdoc__p"><strong>Singkatan.</strong> Tulis kepanjangannya pada kemunculan pertama, lalu singkatannya: "Nomor Induk Kependudukan (NIK)", "organisasi perangkat daerah (OPD)". Bila ruang sempit, seperti label kolom, pakai singkatan yang sudah dikenal luas (NIK, KTP) dan jelaskan di teks bantuan. Singkatan internal kantor jangan muncul di layar warga.</p>
<p class="cdoc__p"><strong>Jargon.</strong> Ganti istilah birokrasi dengan apa yang dialami warga: "berkas Anda sedang diperiksa", bukan "dalam proses verifikasi dan validasi". Bila istilah resmi harus muncul (misalnya nama dokumen), tambahkan penjelasan singkat.</p>
<p class="cdoc__p"><strong>Istilah bahasa Inggris.</strong> Utamakan padanan Indonesia yang umum dipakai: "kata sandi", "unggah", "unduh", "masuk", "keluar". Pakai istilah bahasa Inggris hanya bila padanannya asing bagi kebanyakan orang atau istilah itulah yang tertulis di perangkat mereka (misalnya "email", "QR"). Apa pun pilihannya, pakai istilah yang sama di seluruh layanan.</p>
<p class="cdoc__p"><strong>Bahasa inklusif.</strong> Tulis "penyandang disabilitas", bukan "cacat". Tulis "warga lanjut usia". Pakai sebutan netral seperti "petugas" dan "pemohon". Jangan menebak jenis kelamin, agama atau status pernikahan dari nama, dan jangan meminta data itu kecuali layanan memang memerlukannya, dengan alasan yang ditulis di samping kolomnya.</p>

<h2 id="contoh">Contoh baik dan buruk</h2>
<div class="table-box"><table class="table table--wrap">
  <thead><tr><th>Hindari</th><th>Tulis</th><th>Alasannya</th></tr></thead>
  <tbody>
    <tr><td>Submit</td><td>Kirim laporan</td><td>Menyebut hasil, dalam bahasa Indonesia</td></tr>
    <tr><td>Terjadi kesalahan. Silakan coba lagi.</td><td>Laporan belum terkirim karena koneksi terputus. Isian Anda tersimpan. Coba kirim lagi.</td><td>Menyebut apa yang terjadi dan apa yang aman</td></tr>
    <tr><td>Input NIK tidak valid</td><td>NIK harus 16 angka. Anda mengisi 15.</td><td>Memberi tahu cara memperbaikinya</td></tr>
    <tr><td>Data Anda telah berhasil dilakukan penyimpanan</td><td>Perubahan tersimpan</td><td>Aktif dan ringkas</td></tr>
    <tr><td>Mohon Untuk Melengkapi Dokumen Persyaratan</td><td>Lengkapi dokumen persyaratan</td><td>Huruf kapital kalimat, kalimat perintah</td></tr>
    <tr><td>Biaya: IDR 75,000</td><td>Biaya: Rp 75.000</td><td>Format Indonesia</td></tr>
    <tr><td>Jadwal: 12/11 jam 8:30</td><td>Jadwal: Kamis, 12 November 2026, 08.30 WIB</td><td>Tidak bisa salah dibaca</td></tr>
    <tr><td>Hubungi OPD terkait</td><td>Hubungi organisasi perangkat daerah (OPD) yang menangani izin ini</td><td>Singkatan dijelaskan pada kemunculan pertama</td></tr>
    <tr><td>Klik di sini</td><td>Lihat syarat izin usaha</td><td>Tautan menyebut tujuannya</td></tr>
  </tbody>
</table></div>

<h2 id="aksara">Aksara Lampung di samping teks</h2>
<p class="cdoc__p">Aksara Lampung (had Lampung) boleh menemani teks sebagai aksen budaya: nama layanan, judul bagian atau satu pita hiasan. Aksara tidak pernah menggantikan teks Latin. Isi, label formulir, tombol, pesan galat dan apa pun yang harus dibaca orang selalu ditulis dalam huruf Latin.</p>
<ul class="cdoc__list">
  <li>Letakkan bacaan Latin tepat di sampingnya, atau di <code class="code">aria-label</code>. Bila bacaan Latin terlihat di sampingnya, beri aksara <code class="code">aria-hidden="true"</code>.</li>
  <li>Cukup satu atau dua kemunculan per halaman.</li>
  <li>Alih aksara otomatis cocok untuk nama dan frasa pendek. Periksakan teks yang akan dicetak atau bersifat resmi kepada penutur atau guru aksara Lampung.</li>
</ul>
<p class="cdoc__p">Cara memakainya ada di halaman komponen <a class="link" href="{{comp}}aksara.html">Aksara Lampung</a>.</p>
`,
  },
  en: {
    title: 'Writing',
    lede: 'How to write interface copy for public services in Indonesian: clear to every citizen, polite without padding, and always telling people what happens next.',
    body: `
<h2 id="prinsip">Plain language for every citizen</h2>
<p class="cdoc__p">Public services are used by everyone: students, farmers, traders, retirees, people using a smartphone for the first time. Write for all of them. Copy that someone with primary schooling understands still reads clearly to someone with a degree; the reverse is not true.</p>
<ul class="cdoc__list">
  <li>One sentence, one idea. Aim for fewer than 20 words a sentence.</li>
  <li>Use everyday verbs: "isi", "kirim", "ubah" (fill in, send, change), not "lakukan pengisian", "melakukan pengiriman", "melakukan perubahan" (carry out the filling, perform the sending).</li>
  <li>Put what matters first: what to do, by when, and what happens if you do not.</li>
  <li>Leave official letter style out of the screen. "Dengan hormat, bersama ini kami sampaikan" (with respect, we hereby convey) has no place on a form.</li>
</ul>

<h2 id="nada">Active voice, address and capitals</h2>
<p class="cdoc__p"><strong>Active voice.</strong> Say who acts. "Petugas akan memeriksa berkas Anda dalam 3 hari kerja" (an officer will check your documents within 3 working days) is clearer than "Berkas akan diperiksa" (documents will be checked). Passive is fine when the actor is unknown or does not matter.</p>
<p class="cdoc__p"><strong>Address.</strong> Address the reader as "Anda" (capital A), but sparingly. A polite imperative is often shorter: "Unggah foto KTP" (upload your ID card photo) is enough; "Anda diharapkan untuk mengunggah foto KTP Anda" (you are expected to upload your ID card photo) is padding. Do not use "kamu", "Bapak/Ibu" or "Saudara" in the interface; one form of address across the whole service is easier on people.</p>
<p class="cdoc__p"><strong>Sentence case.</strong> Titles, buttons, labels and menus capitalize only the first word and proper names: "Riwayat permohonan", not "Riwayat Permohonan". Never set whole words in capitals for emphasis.</p>
<p class="cdoc__p"><strong>Punctuation.</strong> Do not use em dashes. Split the sentence, or use a colon, a comma or parentheses. The docs build rejects em dashes. Avoid exclamation marks except for safety warnings that are truly urgent.</p>

<h2 id="tombol">Buttons and links</h2>
<p class="cdoc__p">A button label names what happens after it is pressed. People should be able to predict the result without reading anything else on the screen.</p>
<ul class="cdoc__list">
  <li>Use a verb and its object: <code class="code">Kirim laporan</code> (send report), <code class="code">Simpan perubahan</code> (save changes), <code class="code">Unduh bukti bayar</code> (download receipt), <code class="code">Batalkan permohonan</code> (cancel application).</li>
  <li>Avoid generic labels such as "Submit", "OK", "Proses" (process) or "Klik di sini" (click here).</li>
  <li>In a confirm dialog the button repeats the action: "Hapus draf?" (delete draft?) is answered with <code class="code">Hapus draf</code> and <code class="code">Batal</code>, not "Ya" and "Tidak" (yes, no).</li>
  <li>Link text names the destination: "Lihat syarat izin usaha" (see business permit requirements), not "selengkapnya" (more).</li>
  <li>One primary button per screen. See <a class="link" href="{{comp}}button.html">Button</a> for variants and order.</li>
</ul>

<h2 id="galat">Error and confirmation messages</h2>
<p class="cdoc__p">An error message answers two questions: what happened, and what the person can do now. Do not blame the reader, do not show technical codes without an explanation, and never stop at "Terjadi kesalahan" (an error occurred).</p>
<ul class="cdoc__list">
  <li>A field error sits right under its field: "NIK harus 16 angka. Anda mengisi 15." (the national ID number must be 16 digits; you entered 15). See <a class="link" href="{{comp}}text-field.html">Text field</a>.</li>
  <li>A system error says what is still safe: "Laporan belum terkirim karena koneksi terputus. Isian Anda tersimpan. Coba kirim lagi." (the report was not sent because the connection dropped; your answers are saved; try sending again).</li>
  <li>A success message names the result and the wait: "Laporan terkirim. Nomor tiket LPR-20261112-0042. Petugas membalas dalam 2 hari kerja." (report sent, ticket number, an officer replies within 2 working days).</li>
  <li>A summary above a form uses an <a class="link" href="{{comp}}alert.html">Alert</a>; color and icon only support it, the words carry the meaning.</li>
</ul>
<div class="alert alert--danger"><span class="ic" aria-hidden="true">error</span><div><div class="alert__title">Foto KTP belum bisa diunggah</div><div class="alert__body">Ukuran berkas 8 MB, batasnya 5 MB. Perkecil foto atau pilih berkas lain.</div></div></div>
<p class="cdoc__p">In English: "Your ID card photo could not be uploaded. The file is 8 MB and the limit is 5 MB. Make the photo smaller or choose another file."</p>

<h2 id="angka">Numbers, dates, time and currency</h2>
<p class="cdoc__p">Use Indonesian formats in all Indonesian copy, including tables and charts.</p>
<div class="table-box"><table class="table table--wrap">
  <thead><tr><th>Kind</th><th>Write</th><th>Not</th></tr></thead>
  <tbody>
    <tr><td>Currency</td><td>Rp 75.000</td><td>Rp75000, IDR 75,000, 75rb</td></tr>
    <tr><td>Decimal</td><td>2,5 km</td><td>2.5 km</td></tr>
    <tr><td>Thousands</td><td>12.480 warga</td><td>12,480 warga</td></tr>
    <tr><td>Date</td><td>12 November 2026</td><td>11/12/2026, 2026-11-12, Nov 12</td></tr>
    <tr><td>Day and date</td><td>Kamis, 12 November 2026</td><td>Kamis 12/11</td></tr>
    <tr><td>Time</td><td>08.30 WIB</td><td>8:30 AM, jam 8.30 pagi</td></tr>
    <tr><td>Range</td><td>08.00 sampai 15.00 WIB</td><td>08.00-15.00</td></tr>
    <tr><td>Phone number</td><td>0721 123 456</td><td>(0721)123456</td></tr>
  </tbody>
</table></div>
<p class="cdoc__p">Write the time zone (WIB, Western Indonesian Time) when the service can be used from outside Lampung. Numbers that change or align in a table use tabular figures. Inside a sentence, one to nine may be spelled out, except for amounts, sizes and deadlines that people scan for.</p>

<h2 id="istilah">Terms, abbreviations and inclusive language</h2>
<p class="cdoc__p"><strong>Abbreviations.</strong> Spell them out on first use, then use the short form: "Nomor Induk Kependudukan (NIK)" for the national ID number, "organisasi perangkat daerah (OPD)" for a regional government office. Where space is tight, such as a column label, use abbreviations everyone knows (NIK, KTP) and explain them in the help text. Internal office abbreviations never reach a citizen's screen.</p>
<p class="cdoc__p"><strong>Jargon.</strong> Replace bureaucratic terms with what the citizen experiences: "berkas Anda sedang diperiksa" (your documents are being checked), not "dalam proses verifikasi dan validasi" (in the verification and validation process). When an official term must appear, such as the name of a document, add a short explanation.</p>
<p class="cdoc__p"><strong>English terms.</strong> Prefer the common Indonesian word: "kata sandi" (password), "unggah" (upload), "unduh" (download), "masuk" (sign in), "keluar" (sign out). Use the English term only when the Indonesian one is unfamiliar to most people or when the English word is what their device shows (for example "email", "QR"). Whatever you choose, use the same term across the whole service.</p>
<p class="cdoc__p"><strong>Inclusive language.</strong> Write "penyandang disabilitas" (persons with disabilities), not "cacat" (defective). Write "warga lanjut usia" (older residents). Use neutral roles such as "petugas" (officer) and "pemohon" (applicant). Do not guess gender, religion or marital status from a name, and do not ask for them unless the service needs them, with the reason written next to the field.</p>

<h2 id="contoh">Good and bad pairs</h2>
<p class="cdoc__p">The copy stays in Indonesian, because that is what citizens read; the last column explains the change.</p>
<div class="table-box"><table class="table table--wrap">
  <thead><tr><th>Avoid</th><th>Write</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>Submit</td><td>Kirim laporan</td><td>Names the result, in Indonesian</td></tr>
    <tr><td>Terjadi kesalahan. Silakan coba lagi.</td><td>Laporan belum terkirim karena koneksi terputus. Isian Anda tersimpan. Coba kirim lagi.</td><td>Says what happened and what is safe</td></tr>
    <tr><td>Input NIK tidak valid</td><td>NIK harus 16 angka. Anda mengisi 15.</td><td>Says how to fix it</td></tr>
    <tr><td>Data Anda telah berhasil dilakukan penyimpanan</td><td>Perubahan tersimpan</td><td>Active and short</td></tr>
    <tr><td>Mohon Untuk Melengkapi Dokumen Persyaratan</td><td>Lengkapi dokumen persyaratan</td><td>Sentence case, imperative</td></tr>
    <tr><td>Biaya: IDR 75,000</td><td>Biaya: Rp 75.000</td><td>Indonesian format</td></tr>
    <tr><td>Jadwal: 12/11 jam 8:30</td><td>Jadwal: Kamis, 12 November 2026, 08.30 WIB</td><td>Cannot be misread</td></tr>
    <tr><td>Hubungi OPD terkait</td><td>Hubungi organisasi perangkat daerah (OPD) yang menangani izin ini</td><td>Abbreviation explained on first use</td></tr>
    <tr><td>Klik di sini</td><td>Lihat syarat izin usaha</td><td>The link names its destination</td></tr>
  </tbody>
</table></div>

<h2 id="aksara">Aksara Lampung beside the text</h2>
<p class="cdoc__p">Aksara Lampung (had Lampung, the script of Lampung) may accompany text as a cultural accent: a service name, a section title or one decorative band. It never replaces Latin text. Content, form labels, buttons, error messages and anything people must read are always written in Latin letters.</p>
<ul class="cdoc__list">
  <li>Put the Latin reading right next to it, or in <code class="code">aria-label</code>. When the Latin reading is visible beside it, give the aksara <code class="code">aria-hidden="true"</code>.</li>
  <li>One or two appearances per page are enough.</li>
  <li>Automatic transliteration suits names and short phrases. Have anything printed or official checked by a speaker or teacher of had Lampung.</li>
</ul>
<p class="cdoc__p">How to use it is on the <a class="link" href="{{comp}}aksara.html">Aksara Lampung</a> component page.</p>
`,
  },
};
