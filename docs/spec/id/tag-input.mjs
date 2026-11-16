const tag = (t) => `<span class="tag">${t}<button type="button" aria-label="Hapus ${t}" onclick="this.parentElement.remove()"><span class="ic" aria-hidden="true">close</span></button></span>`;

const ADD = `if ((event.key === 'Enter' || event.key === ',') && this.value.trim()) { event.preventDefault(); const t = document.createElement('span'); t.className = 'tag'; t.textContent = this.value.trim(); const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Hapus ' + t.textContent); b.innerHTML = '&lt;span class=&quot;ic&quot; aria-hidden=&quot;true&quot;&gt;close&lt;/span&gt;'; b.onclick = () => t.remove(); t.append(b); this.before(t); this.value = ''; } else if (event.key === 'Backspace' && !this.value) { const last = this.previousElementSibling; if (last) last.remove(); }`;

export default {
  summary: 'Kolom yang mengubah teks ketikan menjadi tag yang bisa dihapus: Enter atau koma menambah satu, Backspace di kolom kosong menghapus yang terakhir. Untuk beberapa nilai bebas yang pendek.',
  when: [
    'Orang memasukkan beberapa nilai pendek yang tidak berasal dari daftar tetap: topik minat, kata kunci laporan, email yang diundang.',
    'Nilainya dibuat sendiri oleh orang tersebut, sehingga daftar opsi tidak bisa mencakupnya.',
  ],
  whenNot: [
    ['Beberapa pilihan dari set tetap yang pendek (hari, bidang layanan)', 'chips', 'Semua opsi terlihat, nyalakan atau matikan dengan sekali ketuk'],
    ['Beberapa pilihan dari daftar tetap yang panjang', 'checkbox', 'Dalam daftar yang menggulir atau [sheet](sheet); sistem tidak punya combobox pilihan ganda'],
    ['Satu nilai dari daftar panjang', 'combobox'],
    ['Satu baris teks', 'text-field'],
    ['Menampilkan tag atau status yang tidak disunting orang', 'badge'],
  ],
  where: 'Di [formulir](form-layout), selebar kolomnya, dengan teks bantuan yang menyebut batasnya. Kontrol bertambah tinggi saat tag turun ke baris baru.',
  anatomy: [
    ['.control.tags', 'Wajib. Kotak kolom, membungkus isinya dan tumbuh dari 44 px.'],
    ['.tag', 'Satu nilai, 28 px, isian cekung, dengan teks dan tombol hapus.'],
    ['.tag > button', 'Wajib per tag. Tombol hapus 22 px dengan ikon `close` dan `aria-label="Hapus …"`.'],
    ['input', 'Wajib. Minimal 120 px, mengambil sisa baris. Dinamai oleh label.'],
  ],
  examples: [
    {
      title: 'Topik',
      desc: 'Ketik topik lalu tekan Enter atau koma. Backspace di kolom kosong menghapus tag terakhir.',
      html: `<div class="field" style="max-width: 520px; width: 100%;">
  <label class="field__label" for="ti-in">Topik yang ingin dipelajari</label>
  <div class="control tags">${tag('Deret angka')}${tag('Pemahaman bacaan')}${tag('Pancasila')}<input id="ti-in" placeholder="Tambah topik" enterkeyhint="enter" aria-describedby="ti-help" onkeydown="${ADD}"></div>
  <span class="field__help" id="ti-help">Paling banyak 8 topik. Tekan Enter setelah setiap topik.</span>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="topics">Topik yang ingin dipelajari</label>
  <div class="control tags">
    <span class="tag">Deret angka<button type="button" aria-label="Hapus Deret angka"><span class="ic" aria-hidden="true">close</span></button></span>
    <span class="tag">Pancasila<button type="button" aria-label="Hapus Pancasila"><span class="ic" aria-hidden="true">close</span></button></span>
    <input id="topics" placeholder="Tambah topik" aria-describedby="topics-help">
  </div>
  <span class="field__help" id="topics-help">Paling banyak 8 topik. Tekan Enter setelah setiap topik.</span>
</div>
<!-- Your code: Enter or comma inserts a .tag before the input; Backspace on an empty input removes the last; each tag's button removes it. -->`,
    },
    {
      title: 'Undang lewat email, dengan nilai yang ditolak',
      desc: 'Validasi setiap nilai saat menjadi tag; biarkan teks yang salah di input dan jelaskan.',
      html: `<div class="field" style="max-width: 520px; width: 100%;">
  <label class="field__label" for="ti-mail">Undang rekan petugas</label>
  <div class="control tags is-invalid">${tag('rani@example.go.id')}${tag('dimas@example.go.id')}<input id="ti-mail" type="email" value="budi@example" aria-invalid="true" aria-describedby="ti-mail-help"></div>
  <span class="field__help field__help--error" id="ti-mail-help"><span class="ic" aria-hidden="true">error</span>budi@example belum punya domain, misalnya budi@example.go.id.</span>
</div>`,
    },
  ],
  states: [
    ['focus', 'Tepi aksen dan halo pada seluruh kotak (`:focus-within`), seperti `.control` lainnya.'],
    ['.is-invalid', 'Tepi danger saat nilai ketikan ditolak; teks tetap di input.'],
    ['at the limit', 'Nonaktifkan input dan sebutkan di teks bantuan ("8 dari 8 topik").'],
    ['tag hover', 'Tombol hapus berwarna saat hover.'],
  ],
  motion: [
    'Tag baru muncul dengan `lds-pop-in` (skala 0.6 ke 1 dengan fade) memakai `--spring-snappy` (360 ms); input ikut bergeser saat baris menata ulang.',
    'Penghapusan langsung, tanpa animasi keluar, agar Backspace bisa menghapus beberapa tag dengan cepat.',
    'Reduced motion: pop menjadi kemunculan 1 ms.',
  ],
  a11y: [
    'Input dilabeli oleh label kolom; teks bantuan menyebut cara menambah (Enter) dan batasnya.',
    'Setiap tombol hapus adalah `<button type="button">` bernama "Hapus Deret angka". Setelah menghapus, kembalikan fokus ke input.',
    'Umumkan penambahan dan penghapusan di area `aria-live="polite"` jika daftarnya panjang ("Pancasila ditambahkan, 3 topik").',
    'Enter tidak boleh mengirim formulir selama input berisi teks; cegah hanya dalam kasus itu.',
  ],
  do: [
    'Terima Enter, koma, dan tempelan daftar yang dipisahkan koma.',
    'Pangkas spasi dan abaikan duplikat, sambil menyebutkannya di teks bantuan.',
  ],
  dont: [
    'Memakai tag untuk set opsi tetap; itu tugas [chips](chips).',
    'Memberi status tertekan atau berwarna pada tag; tag adalah nilai, bukan filter.',
  ],
  js: 'Tidak ada di sistem. Tambahkan `.tag` sebelum input saat Enter atau koma, hapus yang terakhir saat Backspace di input kosong, dan hubungkan setiap tombol hapus, di kode Anda sendiri.',
};
