// Accessibility guide: what the system guarantees and what each team still has to do.
export default {
  slug: 'aksesibilitas',
  order: 6,
  icon: 'accessible',
  id: {
    title: 'Aksesibilitas',
    lede: 'Layanan publik harus bisa dipakai setiap warga, termasuk penyandang disabilitas dan orang yang memakai ponsel lama atau layar kecil. LDS menanggung sebagian pekerjaannya; sisanya tanggung jawab tim yang membangun layanan.',
    body: `
<h2 id="dijamin">Yang sudah dijamin LDS</h2>
<p class="cdoc__p">Bila Anda memakai token dan komponen sebagaimana tertulis di dokumentasi, hal berikut sudah ditangani:</p>
<ul class="cdoc__list">
  <li><strong>Kontras WCAG 2.2 AA.</strong> Setiap pasangan warna teks dan latar di token dihitung, bukan ditebak, untuk tema terang dan gelap: teks biasa minimal 4,5:1, teks besar dan tepi kontrol minimal 3:1. Rasio tiap token tercantum di referensi token. Contoh: teks putih di atas hijau aksen 6,25:1 di tema terang.</li>
  <li><strong>Target sentuh 44 px.</strong> Tombol, kolom isian dan tombol ikon punya area sentuh minimal 44 x 44 px, meskipun gambarnya lebih kecil.</li>
  <li><strong>Cincin fokus.</strong> Setiap elemen interaktif menampilkan cincin fokus 2 px dengan jarak 2 px saat dipakai dengan papan ketik (<code class="code">:focus-visible</code>).</li>
  <li><strong>Papan ketik.</strong> Komponen dibangun dari <code class="code">&lt;button&gt;</code>, <code class="code">&lt;a href&gt;</code> dan <code class="code">&lt;input&gt;</code> asli. Lapisan seperti dialog, menu dan sheet ditutup dengan Escape lalu fokus kembali ke pemicunya.</li>
  <li><strong>Gerak dikurangi.</strong> Bila perangkat meminta gerak dikurangi (<code class="code">prefers-reduced-motion</code>), transisi berubah menjadi pudar singkat dan animasi hiasan hanya berjalan sekali.</li>
  <li><strong>Warna paksa.</strong> Cincin fokus memakai outline asli yang tetap terlihat di mode warna paksa (kontras tinggi Windows), dan pita aksara dekoratif disembunyikan.</li>
  <li><strong>HTML semantik.</strong> Contoh markup memakai elemen dan atribut ARIA yang tepat. Status tidak pernah disampaikan dengan warna saja; selalu ada ikon dan kata.</li>
</ul>
<div class="alert alert--info"><span class="ic" aria-hidden="true">info</span><div><div class="alert__title">Jaminan ini hanya berlaku bila komponen dipakai apa adanya</div><div class="alert__body">Mengganti warna dengan nilai mentah, menghapus outline atau membuat tombol dari <code class="code">&lt;div&gt;</code> membatalkannya.</div></div></div>

<h2 id="tugas-tim">Yang tetap menjadi tugas tim</h2>
<p class="cdoc__p">Sistem desain tidak tahu isi layanan Anda. Bagian ini harus dikerjakan di setiap proyek:</p>
<ul class="cdoc__list">
  <li><strong>Teks alternatif.</strong> Setiap gambar yang membawa informasi diberi <code class="code">alt</code> yang menyebut isinya ("Peta lokasi banjir di Kecamatan Contoh"). Gambar hiasan diberi <code class="code">alt=""</code>.</li>
  <li><strong>Label.</strong> Setiap kolom isian punya <code class="code">&lt;label&gt;</code> yang terlihat. Placeholder bukan label. Tombol ikon diberi <code class="code">aria-label</code>.</li>
  <li><strong>Teks untuk video dan audio.</strong> Video diberi takarir; rekaman suara diberi transkrip.</li>
  <li><strong>Atribut bahasa.</strong> Pasang <code class="code">lang="id"</code> di elemen <code class="code">&lt;html&gt;</code>, dan <code class="code">lang="en"</code> pada bagian berbahasa Inggris, agar pembaca layar mengucapkannya dengan benar.</li>
  <li><strong>Urutan dan judul.</strong> Satu <code class="code">&lt;h1&gt;</code> per halaman, judul berurutan tanpa melompat, dan urutan Tab mengikuti urutan visual.</li>
  <li><strong>Batas waktu.</strong> Bila sesi atau formulir punya batas waktu, beri tahu sebelumnya dan sediakan cara memperpanjangnya.</li>
  <li><strong>Pasangan warna baru.</strong> Warna yang Anda tambahkan sendiri harus dihitung kontrasnya di kedua tema.</li>
</ul>

<h2 id="daftar-periksa">Daftar periksa</h2>
<div class="table-box"><table class="table table--wrap">
  <thead><tr><th>Periksa</th><th>Caranya</th><th>Siapa</th></tr></thead>
  <tbody>
    <tr><td>Kontras teks dan kontrol</td><td>Hitung dengan skrip kontras untuk setiap pasangan baru, di tema terang dan gelap</td><td>LDS untuk token, tim untuk warna tambahan</td></tr>
    <tr><td>Target sentuh</td><td>Setiap target minimal 44 x 44 px dengan jarak di antaranya</td><td>LDS, tim bila membuat kontrol sendiri</td></tr>
    <tr><td>Papan ketik</td><td>Pakai seluruh alur hanya dengan Tab, Shift+Tab, Enter, Spasi dan Escape</td><td>Tim</td></tr>
    <tr><td>Fokus terlihat</td><td>Cincin fokus muncul di setiap kontrol, di kedua tema</td><td>LDS</td></tr>
    <tr><td>Teks alternatif</td><td>Setiap gambar informatif punya <code class="code">alt</code> yang bermakna</td><td>Tim</td></tr>
    <tr><td>Label formulir</td><td>Setiap kolom punya label terlihat; galat ditautkan dengan <code class="code">aria-describedby</code></td><td>Tim</td></tr>
    <tr><td>Takarir dan transkrip</td><td>Setiap video dan audio</td><td>Tim</td></tr>
    <tr><td>Bahasa halaman</td><td><code class="code">lang</code> terpasang dan benar</td><td>Tim</td></tr>
    <tr><td>Pembaca layar</td><td>Uji alur utama dengan NVDA, TalkBack dan VoiceOver</td><td>Tim</td></tr>
    <tr><td>Zoom 200%</td><td>Tidak ada teks terpotong atau bergulir mendatar</td><td>Tim</td></tr>
    <tr><td>Lebar 320 px</td><td>Tata letak mengalir tanpa gulir mendatar</td><td>Tim</td></tr>
    <tr><td>Gerak dikurangi</td><td>Aktifkan setelan gerak dikurangi di perangkat, lalu ulangi alurnya</td><td>LDS, tim untuk animasi sendiri</td></tr>
  </tbody>
</table></div>

<h2 id="kontras">Memeriksa kontras</h2>
<p class="cdoc__p">Jangan menilai kontras dengan mata, terutama untuk abu-abu di atas abu-abu. Repositori ini menyertakan skrip pemeriksa. Jalankan dari akar repositori dengan dua warna hex, teks lalu latar:</p>
<div class="codeblock"><pre>python3 skills/antislop-human/contrast-check.py "#FFFFFF" "#0B6E4F"
ratio: 6.25:1
normal text (4.5:1): PASS
large text  (3.0:1): PASS</pre></div>
<p class="cdoc__p">Ulangi untuk nilai tema gelap dari <a class="link" href="{{root}}tokens/tokens.json">tokens/tokens.json</a>. Teks biasa butuh 4,5:1; teks besar (18 px ke atas, atau 14 px tebal) dan tepi kontrol butuh 3:1. Bila pasangan gagal, pakai token teks yang sudah lolos, misalnya <code class="code">--gold-text</code> alih-alih <code class="code">--gold</code> untuk teks emas.</p>

<h2 id="pengujian">Menguji dengan pembaca layar dan zoom</h2>
<p class="cdoc__p">Pemeriksaan otomatis hanya menangkap sebagian masalah. Uji alur utama layanan (misalnya mengajukan permohonan dari awal sampai bukti terkirim) dengan cara orang benar-benar memakainya:</p>
<ul class="cdoc__list">
  <li><strong>NVDA</strong> di Windows dengan Firefox atau Chrome.</li>
  <li><strong>TalkBack</strong> di Android dengan Chrome. Banyak warga mengakses layanan dari ponsel Android, jadi jangan lewatkan ini.</li>
  <li><strong>VoiceOver</strong> di iPhone dengan Safari, dan di Mac bila tersedia.</li>
  <li><strong>Zoom 200%</strong> di peramban desktop: semua teks terbaca, tidak ada yang terpotong, tidak ada gulir mendatar.</li>
  <li><strong>Lebar 320 px</strong> (atau zoom 400% di layar 1280 px): tata letak tetap satu kolom yang utuh.</li>
</ul>
<p class="cdoc__p">Dengarkan apakah setiap kontrol menyebut nama, peran dan statusnya, apakah pesan galat dibacakan, dan apakah fokus berpindah ke tempat yang masuk akal setelah dialog ditutup. Bila memungkinkan, ajak penyandang disabilitas mencoba layanan Anda; pengalaman mereka tidak tergantikan oleh daftar periksa.</p>

<h2 id="regulasi">Catatan tentang regulasi</h2>
<p class="cdoc__p">Peraturan perundang-undangan Indonesia, antara lain Undang-Undang Nomor 25 Tahun 2009 tentang Pelayanan Publik dan Undang-Undang Nomor 8 Tahun 2016 tentang Penyandang Disabilitas, menegaskan bahwa layanan publik harus dapat diakses oleh semua warga, termasuk penyandang disabilitas. Aturan turunannya dan kebijakan di tiap daerah dapat berubah.</p>
<p class="cdoc__p">Panduan ini bukan nasihat hukum. Mengikuti LDS dan WCAG 2.2 AA adalah titik awal yang baik, tetapi periksalah kewajiban yang berlaku untuk layanan Anda bersama bagian hukum atau unit yang berwenang di instansi Anda.</p>
`,
  },
  en: {
    title: 'Accessibility',
    lede: 'Public services must work for every citizen, including people with disabilities and people on old phones or small screens. LDS carries part of the work; the rest belongs to the team that builds the service.',
    body: `
<h2 id="dijamin">What LDS guarantees</h2>
<p class="cdoc__p">When you use the tokens and components as documented, the following is already handled:</p>
<ul class="cdoc__list">
  <li><strong>WCAG 2.2 AA contrast.</strong> Every text and background pair in the tokens is computed, not guessed, for both the light and the dark theme: normal text at least 4.5:1, large text and control edges at least 3:1. The ratio of each token is listed in the tokens reference. For example, white text on the accent green is 6.25:1 in the light theme.</li>
  <li><strong>44 px targets.</strong> Buttons, fields and icon buttons have a hit area of at least 44 by 44 px, even when the drawing is smaller.</li>
  <li><strong>Focus ring.</strong> Every interactive element shows a 2 px focus ring with a 2 px offset when used by keyboard (<code class="code">:focus-visible</code>).</li>
  <li><strong>Keyboard.</strong> Components are built from real <code class="code">&lt;button&gt;</code>, <code class="code">&lt;a href&gt;</code> and <code class="code">&lt;input&gt;</code> elements. Layers such as dialogs, menus and sheets close with Escape and return focus to their trigger.</li>
  <li><strong>Reduced motion.</strong> When the device asks for less motion (<code class="code">prefers-reduced-motion</code>), transitions become a short cross-fade and decorative animations run only once.</li>
  <li><strong>Forced colors.</strong> The focus ring is a real outline that stays visible in forced colors mode (Windows high contrast), and the decorative aksara band is hidden.</li>
  <li><strong>Semantic HTML.</strong> The example markup uses the right elements and ARIA attributes. Status is never carried by color alone; there is always an icon and words.</li>
</ul>
<div class="alert alert--info"><span class="ic" aria-hidden="true">info</span><div><div class="alert__title">These guarantees hold only when components are used as written</div><div class="alert__body">Replacing colors with raw values, removing the outline or building a button from a <code class="code">&lt;div&gt;</code> undoes them.</div></div></div>

<h2 id="tugas-tim">What your team still has to do</h2>
<p class="cdoc__p">A design system does not know the content of your service. This part has to be done in every project:</p>
<ul class="cdoc__list">
  <li><strong>Alt text.</strong> Every image that carries information gets an <code class="code">alt</code> that states its content ("Map of flooded areas in Contoh district"). Decorative images get <code class="code">alt=""</code>.</li>
  <li><strong>Labels.</strong> Every field has a visible <code class="code">&lt;label&gt;</code>. A placeholder is not a label. Icon buttons get an <code class="code">aria-label</code>.</li>
  <li><strong>Captions and transcripts.</strong> Videos get captions; audio recordings get a transcript.</li>
  <li><strong>Language attribute.</strong> Set <code class="code">lang="id"</code> on the <code class="code">&lt;html&gt;</code> element, and <code class="code">lang="en"</code> on parts in English, so screen readers pronounce them correctly.</li>
  <li><strong>Order and headings.</strong> One <code class="code">&lt;h1&gt;</code> per page, headings in order without skipping levels, and a Tab order that follows the visual order.</li>
  <li><strong>Time limits.</strong> When a session or form times out, warn people before it happens and offer a way to extend it.</li>
  <li><strong>New color pairs.</strong> Any color you add yourself must have its contrast computed in both themes.</li>
</ul>

<h2 id="daftar-periksa">Checklist</h2>
<div class="table-box"><table class="table table--wrap">
  <thead><tr><th>Check</th><th>How</th><th>Who</th></tr></thead>
  <tbody>
    <tr><td>Text and control contrast</td><td>Compute with the contrast script for every new pair, in light and dark</td><td>LDS for tokens, your team for added colors</td></tr>
    <tr><td>Touch targets</td><td>Every target at least 44 by 44 px with space between them</td><td>LDS, your team for custom controls</td></tr>
    <tr><td>Keyboard</td><td>Complete the whole flow with only Tab, Shift+Tab, Enter, Space and Escape</td><td>Your team</td></tr>
    <tr><td>Visible focus</td><td>The focus ring shows on every control, in both themes</td><td>LDS</td></tr>
    <tr><td>Alt text</td><td>Every informative image has a meaningful <code class="code">alt</code></td><td>Your team</td></tr>
    <tr><td>Form labels</td><td>Every field has a visible label; errors are linked with <code class="code">aria-describedby</code></td><td>Your team</td></tr>
    <tr><td>Captions and transcripts</td><td>Every video and audio file</td><td>Your team</td></tr>
    <tr><td>Page language</td><td><code class="code">lang</code> is set and correct</td><td>Your team</td></tr>
    <tr><td>Screen readers</td><td>Test the main flows with NVDA, TalkBack and VoiceOver</td><td>Your team</td></tr>
    <tr><td>200% zoom</td><td>No clipped text and no horizontal scrolling</td><td>Your team</td></tr>
    <tr><td>320 px width</td><td>The layout reflows without horizontal scrolling</td><td>Your team</td></tr>
    <tr><td>Reduced motion</td><td>Turn on reduced motion on the device and repeat the flow</td><td>LDS, your team for its own animation</td></tr>
  </tbody>
</table></div>

<h2 id="kontras">Checking contrast</h2>
<p class="cdoc__p">Do not judge contrast by eye, least of all gray on gray. The repository ships a checker. Run it from the repository root with two hex colors, text first and background second:</p>
<div class="codeblock"><pre>python3 skills/antislop-human/contrast-check.py "#FFFFFF" "#0B6E4F"
ratio: 6.25:1
normal text (4.5:1): PASS
large text  (3.0:1): PASS</pre></div>
<p class="cdoc__p">Repeat with the dark theme values from <a class="link" href="{{root}}tokens/tokens.json">tokens/tokens.json</a>. Normal text needs 4.5:1; large text (18 px and up, or 14 px bold) and control edges need 3:1. When a pair fails, use a text token that already passes, for example <code class="code">--gold-text</code> instead of <code class="code">--gold</code> for gold text.</p>

<h2 id="pengujian">Testing with screen readers and zoom</h2>
<p class="cdoc__p">Automated checks catch only part of the problems. Test the main flows of the service (for example, filing an application from the start until the receipt arrives) the way people actually use it:</p>
<ul class="cdoc__list">
  <li><strong>NVDA</strong> on Windows with Firefox or Chrome.</li>
  <li><strong>TalkBack</strong> on Android with Chrome. Many citizens reach services from an Android phone, so do not skip this one.</li>
  <li><strong>VoiceOver</strong> on iPhone with Safari, and on a Mac when you have one.</li>
  <li><strong>200% zoom</strong> in a desktop browser: all text readable, nothing clipped, no horizontal scrolling.</li>
  <li><strong>320 px width</strong> (or 400% zoom on a 1280 px screen): the layout stays one whole column.</li>
</ul>
<p class="cdoc__p">Listen for whether each control announces its name, role and state, whether error messages are read out, and whether focus lands somewhere sensible after a dialog closes. When you can, invite people with disabilities to try your service; a checklist does not replace their experience.</p>

<h2 id="regulasi">A note on regulation</h2>
<p class="cdoc__p">Indonesian law, including Law Number 25 of 2009 on Public Services and Law Number 8 of 2016 on Persons with Disabilities, states that public services must be accessible to all citizens, including persons with disabilities. Implementing rules and regional policies can change.</p>
<p class="cdoc__p">This guide is not legal advice. Following LDS and WCAG 2.2 AA is a good starting point, but check the obligations that apply to your service with the legal team or the responsible unit in your institution.</p>
`,
  },
};
