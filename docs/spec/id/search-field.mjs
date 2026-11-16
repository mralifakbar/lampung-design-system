export default {
  summary: 'Kolom berisi tanpa label untuk menemukan sesuatu: layanan, warga, laporan. Di ponsel, memfokuskannya menggeser masuk tombol Batal yang menghapus teks dan keluar dari pencarian.',
  when: [
    'Orang mempersempit daftar atau halaman dengan mengetik: cari layanan, saring tabel warga, temukan laporan di arsip.',
    'Layar ponsel punya bilah pencarian di bawah judul besar (dengan Batal, `data-lds-search`).',
    'Toolbar di atas tabel atau grid butuh kotak pencarian ringkas.',
  ],
  whenNot: [
    ['Mencari perintah dan halaman di seluruh aplikasi dari mana saja (Ctrl K)', 'command-palette'],
    ['Memilih satu nilai dari daftar panjang untuk kolom formulir', 'combobox', 'Combobox menyimpan pilihan; search field hanya menyaring yang ditampilkan'],
    ['Nilai formulir yang berlabel (nama, email)', 'text-field'],
    ['Mempersempit dengan beberapa kategori tetap', 'chips', 'Filter chip di samping search field boleh saja'],
  ],
  where: 'Di atas hal yang disaringnya: di bawah judul besar pada [layar ponsel](phone-screen), di toolbar di atas [tabel](table) atau daftar pada layar lebar, di bagian atas [sidebar](sidebar) untuk navigasi panjang. Beri lebar sesuai konten yang disaring, paling lebar sekitar 520 px di layar lebar.',
  anatomy: [
    ['.search-wrap', 'Baris opsional yang memuat kolom dan tombol Batal; tambahkan `data-lds-search` untuk perilaku ponsel.'],
    ['.control.search', 'Wajib. Tinggi 38 px, radius 11 px, isian cekung, tanpa garis tepi sampai difokus.'],
    ['.ic (search)', 'Wajib. Kaca pembesar di depan.'],
    ['input', 'Wajib. Dinamai dengan `aria-label` (tanpa label terlihat).'],
    ['.control__btn', 'Tombol hapus opsional dengan ikon `cancel` berisi, hanya tampil saat ada teks.'],
    ['.search__cancel', 'Tombol Batal di ponsel. Tersembunyi (lebar 0) sampai pembungkus mendapat `.is-active`.'],
  ],
  examples: [
    {
      title: 'Pencarian ponsel dengan Batal',
      desc: 'Fokus menggeser Batal masuk dan kolom memberinya ruang. Batal menghapus teks, memicu `input`, dan keluar dari pencarian.',
      html: `<div class="search-wrap" data-lds-search style="max-width: 420px; width: 100%;">
  <div class="control search" style="flex: 1;"><span class="ic" aria-hidden="true">search</span><input placeholder="Cari layanan" aria-label="Cari layanan" enterkeyhint="search"></div>
  <button type="button" class="search__cancel">Batal</button>
</div>`,
    },
    {
      title: 'Menyaring daftar, dengan hapus dan tanpa hasil',
      desc: 'Hasil diperbarui saat mengetik. Jika tidak ada yang cocok, katakan begitu dan sarankan apa yang bisa dicoba. Ketik "izin" atau "zzz".',
      html: `<div class="docs-col" style="max-width: 420px;">
  <div class="control search"><span class="ic" aria-hidden="true">search</span><input placeholder="Cari layanan" aria-label="Cari layanan" aria-controls="sf-list"
    oninput="const q = this.value.trim().toLowerCase(); let n = 0; document.querySelectorAll('#sf-list .lrow').forEach((r) => { const hit = r.textContent.toLowerCase().includes(q); r.hidden = !hit; n += hit; }); document.getElementById('sf-empty').hidden = n > 0; this.nextElementSibling.hidden = !this.value;"><button type="button" class="control__btn" aria-label="Hapus pencarian" hidden onclick="const i = this.previousElementSibling; i.value = ''; i.dispatchEvent(new Event('input')); i.focus();"><span class="ic ic--fill" aria-hidden="true">cancel</span></button></div>
  <div class="list" id="sf-list">
    <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Kartu tanda penduduk</span></span><span class="lrow__value">DUK-01</span></a>
    <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Izin usaha mikro</span></span><span class="lrow__value">IZN-03</span></a>
    <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Pajak kendaraan bermotor</span></span><span class="lrow__value">PJK-02</span></a>
  </div>
  <div class="empty" id="sf-empty" role="status" hidden><div class="empty__title">Tidak ada layanan yang cocok</div><div class="empty__body">Periksa ejaannya, atau cari dengan kode layanan.</div></div>
</div>`,
    },
  ],
  variants: [
    ['.control.search', 'Mandiri, untuk toolbar dan sidebar desktop.'],
    ['.search-wrap[data-lds-search] + .search__cancel', 'Pola ponsel dengan Batal.'],
  ],
  states: [
    ['rest', 'Isian cekung, tanpa garis tepi, tanpa garis tepi saat hover.'],
    ['focus', 'Tepi aksen dan halo 4 px (dari `.control`); kaca pembesar menjadi warna aksen.'],
    ['.is-active (wrap)', 'Disetel oleh `data-lds-search` saat fokus: Batal bergeser masuk.'],
    ['has text', 'Tampilkan `.control__btn` hapus; sembunyikan saat kosong.'],
    ['no results', '[Empty state](empty-state) di bawah kolom yang menyebut kuerinya dan apa yang bisa dicoba.'],
  ],
  motion: [
    'Batal masuk lewat `max-width` 0 ke 80 px dan `margin-left` 0 ke 12 px dengan `--spring-smooth` (560 ms), dengan opacity dalam `--d-fast`. Kolom ikut menyusut, jadi tidak ada yang melompat. Keluar membalik transisi yang sama.',
    'Focus ring: `--d-fast` (160 ms) dengan `--ease-standard`.',
    'Hasil yang berubah saat mengetik tidak boleh masuk bertahap di setiap ketukan; tukar langsung, atau pakai [list stagger](list-stagger) singkat hanya untuk muatan pertama.',
    'Reduced motion: transisi menjadi 120 ms linear; Batal tetap muncul.',
  ],
  a11y: [
    'Tidak ada label terlihat, jadi input butuh `aria-label` ("Cari layanan"). Bungkus pencarian tingkat halaman dengan `<form role="search">` saat Enter mengirim.',
    'Pakai `enterkeyhint="search"` agar keyboard ponsel menampilkan tombol Cari. Lebih baik `type="text"`: `type="search"` menambahkan tombol hapus bawaan kedua yang tidak disembunyikan sistem.',
    'Umumkan jumlah hasil atau pesan tanpa hasil di area `role="status"` agar pengguna pembaca layar tahu daftarnya berubah.',
    'Batal dan hapus adalah tombol sungguhan (`type="button"`); tombol hapus punya `aria-label`.',
  ],
  do: [
    'Sebut apa yang dicari di placeholder ("Cari layanan").',
    'Saring saat orang mengetik untuk daftar lokal; tunda sekitar 180 ms untuk pencarian ke server.',
    'Pertahankan kueri saat orang kembali ke daftar.',
  ],
  dont: [
    'Memberi search field garis tepi dan label seperti kolom formulir.',
    'Memakainya untuk memilih nilai formulir; itu tugas [combobox](combobox).',
    'Menampilkan "Tidak ada hasil" tanpa menyebut apa yang bisa dicoba.',
  ],
  js: '`data-lds-search` pada `.search-wrap`: fokus menambahkan `.is-active`; Batal menghapus input, memicu `input`, menghapus `.is-active`, dan melepas fokus. Penyaringan dan tombol hapus adalah tugas Anda.',
};
