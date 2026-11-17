// Privacy policy for the documentation site. Kept out of the sidebar; linked from footers.
// Update it whenever the site starts loading a new third-party service or storing anything new.
export default {
  slug: 'privasi',
  order: 90,
  icon: 'shield_person',
  hidden: true,
  id: {
    title: 'Kebijakan privasi',
    lede: 'Situs ini hanya dokumentasi. Tidak ada akun, formulir, iklan, atau cookie pelacak. Halaman ini menjelaskan sedikit data yang tetap terlibat saat Anda membukanya. Berlaku sejak 17 November 2026.',
    body: `
<h2 id="pengelola">Siapa pengelolanya</h2>
<p class="cdoc__p">Situs lampung.kartadinata.app dikelola oleh para kontributor Lampung Design System, proyek komunitas open source. Proyek ini bukan layanan pemerintah dan tidak mewakili instansi mana pun. Pertanyaan soal privasi bisa diajukan lewat <a class="link" href="https://github.com/mralifakbar/lampung-design-system/issues">isu GitHub</a>.</p>

<h2 id="data">Data yang kami simpan</h2>
<ul class="cdoc__list">
  <li><strong>Pilihan tema.</strong> Bila Anda memilih tampilan terang atau gelap, pilihan itu disimpan di <span class="code">localStorage</span> peramban Anda dengan kunci <span class="code">lds-theme</span>. Data ini tidak pernah dikirim ke server dan bisa dihapus dari pengaturan peramban.</li>
  <li><strong>Tidak ada cookie.</strong> Situs ini tidak memasang cookie, sehingga tidak menampilkan spanduk persetujuan cookie.</li>
  <li><strong>Tidak ada formulir.</strong> Formulir di halaman contoh dan dokumentasi hanya peraga. Isinya tidak dikirim ke mana pun.</li>
</ul>

<h2 id="pihak-ketiga">Layanan pihak ketiga</h2>
<ul class="cdoc__list">
  <li><strong>Cloudflare</strong> menyajikan situs ini. Seperti semua server web, Cloudflare menerima alamat IP, jenis peramban, dan halaman yang diminta untuk mengirim halaman dan menangkal serangan. Lihat <a class="link" href="https://www.cloudflare.com/privacypolicy/">kebijakan privasi Cloudflare</a>.</li>
  <li><strong>Statistik kunjungan.</strong> Kami memakai Cloudflare Web Analytics, yang menghitung kunjungan tanpa cookie dan tanpa sidik jari peramban. Kami hanya melihat angka gabungan, misalnya jumlah kunjungan per halaman.</li>
  <li><strong>Google Fonts</strong> menyajikan huruf Geist. Peramban Anda mengambil berkas huruf dari fonts.googleapis.com dan fonts.gstatic.com, sehingga Google menerima alamat IP Anda. Lihat <a class="link" href="https://developers.google.com/fonts/faq/privacy">penjelasan privasi Google Fonts</a>.</li>
  <li><strong>OpenStreetMap.</strong> Contoh komponen peta memuat ubin peta dari tile.openstreetmap.org, sehingga server OpenStreetMap menerima alamat IP Anda saat halaman itu dibuka. Lihat <a class="link" href="https://osmfoundation.org/wiki/Privacy_Policy">kebijakan privasi OSMF</a>.</li>
  <li><strong>Tautan keluar</strong> ke GitHub, npm, dan pub.dev mengikuti kebijakan situs masing-masing setelah Anda membukanya.</li>
</ul>

<h2 id="data-pribadi">Data pribadi di contoh</h2>
<p class="cdoc__p">Nama, NIK, nomor telepon, dan alamat di dokumentasi adalah rekaan dan disamarkan. Bila Anda menemukan data yang tampak nyata, laporkan lewat isu GitHub agar segera dihapus.</p>

<h2 id="hak">Hak Anda</h2>
<p class="cdoc__p">Karena kami tidak menyimpan data yang mengenali Anda, tidak ada data pribadi yang bisa kami tunjukkan, ubah, atau hapus. Hak Anda atas data yang diproses penyedia di atas berlaku sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi dan kebijakan masing-masing penyedia.</p>

<h2 id="perubahan">Perubahan</h2>
<p class="cdoc__p">Bila kami menambah layanan yang memproses data, halaman ini diperbarui lebih dulu. Riwayat perubahannya bisa dilihat di repositori GitHub.</p>
`,
  },
  en: {
    title: 'Privacy policy',
    lede: 'This site is documentation only. There are no accounts, forms, ads or tracking cookies. This page explains the little data that is still involved when you open it. In effect since 17 November 2026.',
    body: `
<h2 id="pengelola">Who runs it</h2>
<p class="cdoc__p">lampung.kartadinata.app is run by the contributors of Lampung Design System, a community open source project. It is not a government service and does not represent any agency. Privacy questions can be raised as a <a class="link" href="https://github.com/mralifakbar/lampung-design-system/issues">GitHub issue</a>.</p>

<h2 id="data">Data we keep</h2>
<ul class="cdoc__list">
  <li><strong>Theme choice.</strong> If you pick light or dark, the choice is stored in your browser's <span class="code">localStorage</span> under the key <span class="code">lds-theme</span>. It never leaves your browser and you can clear it in the browser settings.</li>
  <li><strong>No cookies.</strong> The site sets no cookies, so it shows no cookie consent banner.</li>
  <li><strong>No forms.</strong> Forms in examples and docs are demos only. Nothing you type is sent anywhere.</li>
</ul>

<h2 id="pihak-ketiga">Third-party services</h2>
<ul class="cdoc__list">
  <li><strong>Cloudflare</strong> serves this site. Like any web server, it receives your IP address, browser type and the page requested in order to deliver pages and block attacks. See the <a class="link" href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a>.</li>
  <li><strong>Visit statistics.</strong> We use Cloudflare Web Analytics, which counts visits without cookies or browser fingerprinting. We only see totals, such as visits per page.</li>
  <li><strong>Google Fonts</strong> serves the Geist typeface. Your browser fetches font files from fonts.googleapis.com and fonts.gstatic.com, so Google receives your IP address. See the <a class="link" href="https://developers.google.com/fonts/faq/privacy">Google Fonts privacy FAQ</a>.</li>
  <li><strong>OpenStreetMap.</strong> The map component examples load tiles from tile.openstreetmap.org, so OpenStreetMap's servers receive your IP address when you open those pages. See the <a class="link" href="https://osmfoundation.org/wiki/Privacy_Policy">OSMF privacy policy</a>.</li>
  <li><strong>Outbound links</strong> to GitHub, npm and pub.dev follow those sites' own policies once you open them.</li>
</ul>

<h2 id="data-pribadi">Personal data in examples</h2>
<p class="cdoc__p">Names, national ID numbers (NIK), phone numbers and addresses in the docs are made up and masked. If you find data that looks real, report it as a GitHub issue so it is removed right away.</p>

<h2 id="hak">Your rights</h2>
<p class="cdoc__p">Because we keep no data that identifies you, there is no personal data for us to show, change or delete. Your rights over data the providers above process apply under Indonesia's Personal Data Protection Law (Law No. 27 of 2022) and each provider's policy.</p>

<h2 id="perubahan">Changes</h2>
<p class="cdoc__p">If we add a service that processes data, this page is updated first. Its history is in the GitHub repository.</p>
`,
  },
};
