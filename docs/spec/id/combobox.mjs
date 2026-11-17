const opt = (v, label) => `<li class="menu__item" role="option" data-value="${v}">${label}</li>`;

export default {
  summary: 'Text field yang menyaring daftar opsi saat Anda mengetik dan menyimpan satu yang dipilih. Untuk daftar panjang dan opsi dari server; ia memberi tahu saat tidak ada yang cocok.',
  when: [
    'Satu nilai dari daftar panjang yang dikenal orang lewat namanya: kabupaten atau kota, kecamatan, kelurahan, puskesmas, kantor layanan.',
    'Opsi datang dari server saat mengetik (React `Combobox` dengan `loadOptions`).',
    'Orang tahu yang mereka mau dan mengetik tiga huruf lebih cepat daripada menggulir.',
  ],
  whenNot: [
    ['Daftar tetap yang pendek (kurang dari sekitar 30 opsi)', 'select'],
    ['Mencari untuk menyaring halaman atau daftar, tanpa menyimpan pilihan', 'search-field'],
    ['Beberapa nilai, termasuk nilai baru yang dibuat orang', 'tag-input'],
    ['Melompat ke halaman atau perintah apa pun di aplikasi', 'command-palette'],
    ['Dua sampai lima opsi', 'radio'],
  ],
  where: 'Di [formulir](form-layout) seperti [text field](text-field), atau di bilah filter pada layar lebar. Daftar terbuka di bawah kolom, selebar kolom, dan menggulir di dalamnya (sampai 320 px atau setengah viewport).',
  anatomy: [
    ['.select.combobox', 'Wajib. Pembungkus berposisi. `data-lds-combobox` untuk perilaku HTML biasa.'],
    ['.control.combobox__control', 'Wajib. Kolom 44 px; `.is-open` selama daftar tampil. `.ic` di depan opsional.'],
    ['input[role=combobox]', 'Wajib. Input teks, dinamai oleh `<label for>` atau `aria-label`. JS menyetel `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`, dan `autocomplete="off"`.'],
    ['.control__btn.combobox__arrow', 'Chevron opsional (`aria-hidden`), berputar saat terbuka. Di React tombol hapus menggantikannya setelah nilai dipilih.'],
    ['ul.menu.select__menu[role=listbox]', 'Wajib. Opsi-opsinya; `li.menu__item[role=option]` dengan `data-value`.'],
    ['.select__empty', 'Wajib. Baris tanpa hasil, `role="presentation"`, `hidden` sampai tidak ada yang cocok.'],
  ],
  examples: [
    {
      title: 'Kabupaten atau kota',
      desc: 'Fokus memilih teks dan membuka daftar; mengetik menyaring bagian mana pun dari nama; Enter memilih baris yang disorot. Coba "lampung" atau "me".',
      html: `<div class="field" style="max-width: 360px; width: 100%;">
  <label class="field__label" for="cb-prov">Kabupaten atau kota</label>
  <div class="select combobox" data-lds-combobox>
    <div class="control combobox__control"><span class="ic" aria-hidden="true">location_on</span><input id="cb-prov" role="combobox" placeholder="Semua kabupaten dan kota"><span class="control__btn combobox__arrow" aria-hidden="true"><span class="ic">expand_more</span></span></div>
    <ul class="menu select__menu" role="listbox" aria-label="Kabupaten atau kota">
      ${opt('bdl', 'Kota Bandar Lampung')}
      ${opt('metro', 'Kota Metro')}
      ${opt('lamsel', 'Kabupaten Lampung Selatan')}
      ${opt('lamteng', 'Kabupaten Lampung Tengah')}
      ${opt('lampura', 'Kabupaten Lampung Utara')}
      ${opt('pringsewu', 'Kabupaten Pringsewu')}
      ${opt('pesawaran', 'Kabupaten Pesawaran')}
      ${opt('tanggamus', 'Kabupaten Tanggamus')}
      <li class="select__empty" role="presentation" hidden>Tidak ada yang cocok. Coba kata lain.</li>
    </ul>
  </div>
</div>`,
    },
    {
      title: 'Opsi dari server (React)',
      desc: 'Dengan `loadOptions` kueri ditunda (debounce 180 ms) dan permintaan sebelumnya dibatalkan saat teks berubah; spinner tampil di kolom selama memuat. `minChars` menunggu sampai hurufnya cukup.',
      html: `<div class="field" style="max-width: 360px; width: 100%;">
  <label class="field__label" for="cb-uni">Puskesmas</label>
  <div class="select combobox">
    <div class="control combobox__control is-open"><span class="ic" aria-hidden="true">local_hospital</span><input id="cb-uni" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="cb-uni-list" value="way"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
    <ul class="menu select__menu is-open" role="listbox" id="cb-uni-list" aria-label="Puskesmas">
      <li class="menu__item" role="option" aria-selected="false"><span class="select__text">Puskesmas Way Halim<small>Way Halim, Bandar Lampung</small></span></li>
      <li class="menu__item is-hover" role="option" aria-selected="false"><span class="select__text">Puskesmas Way Kandis<small>Tanjung Senang, Bandar Lampung</small></span></li>
    </ul>
  </div>
</div>`,
      code: `<Combobox
  label="Puskesmas"
  icon="local_hospital"
  value={uni}
  onChange={setUni}
  minChars={3}
  loadOptions={(q, signal) =>
    fetch(\`/api/puskesmas?q=\${encodeURIComponent(q)}\`, { signal }).then((r) => r.json())
  }
/>`,
    },
  ],
  states: [
    ['closed', 'Tampak seperti [text field](text-field) dengan chevron.'],
    ['open (.is-open on the control, aria-expanded="true")', 'Tepi aksen dan halo tetap menyala; chevron menunjuk ke atas; daftar tumbuh masuk.'],
    ['filtering', 'Baris yang tidak mengandung teks diberi `hidden`; baris pertama yang terlihat disorot.'],
    ['no match', '`.select__empty` menampilkan "Tidak ada yang cocok. Coba kata lain."'],
    ['loading (React)', '[Spinner](spinner) di kolom menggantikan chevron.'],
    ['chosen (React)', 'Tombol hapus `.control__btn` (ikon tutup, berlabel "Hapus Kabupaten atau kota") menggantikan chevron.'],
  ],
  motion: [
    'Daftar memakai gerak menu: masuk dengan `--spring-smooth` (560 ms) dari `scale(0.96) translateY(-4px)` dengan opacity dalam `--d-fast`; keluar dalam `--d-exit` (180 ms) dengan `--ease-exit`.',
    'Penyaringan langsung menyembunyikan baris; jangan menganimasikan baris masuk dan keluar di setiap ketukan, daftar jadi terasa lambat.',
    'Chevron berputar dengan `--spring-smooth`. Sorotan mengikuti pointer dalam 60 ms linear.',
    'Reduced motion: menu memudar masuk 120 ms linear tanpa skala.',
  ],
  a11y: [
    'Input punya `role="combobox"`, `aria-expanded`, `aria-controls`, dan `aria-autocomplete="list"`; `aria-activedescendant` menunjuk ke opsi yang disorot sementara fokus tetap di input.',
    'Tombol: Bawah membuka dan berpindah, Atas berpindah, Enter memilih, Escape menutup (React juga memulihkan label terpilih), Tab menutup.',
    'Baris kosong adalah `role="presentation"`; pertimbangkan hitungan `aria-live="polite"` jika hasil sering berubah banyak.',
    'Penyaringan mencocokkan bagian mana pun dari label (dan baris kedua di React), tanpa membedakan huruf besar kecil.',
  ],
  do: [
    'Taruh opsi yang paling mungkin di awal saat kolom kosong.',
    'Setel `minChars` (2 atau 3) untuk daftar dari server agar permintaan pertama berguna.',
    'Tampilkan baris kedua (`sub`) saat dua opsi punya nama yang sama.',
  ],
  dont: [
    'Menerima teks bebas yang tidak cocok dengan opsi mana pun sebagai nilai; combobox menyimpan salah satu opsinya.',
    'Memakai combobox untuk daftar pendek hanya agar tampak bisa dicari.',
  ],
  js: '`data-lds-combobox` pada `.select.combobox`: fokus memilih teks dan membuka daftar; mengetik menyaring opsi dan menyalakan atau mematikan `.select__empty`; tombol seperti di atas; pilihan menulis label ke input dan memicu `lds:change` dengan `{ value, label }`. Pemuatan dari server dan tombol hapus hanya ada di binding React.',
  react: `import { Combobox } from 'lampung-design-system/react';

// Local options, filtered in the browser
<Combobox label="Kabupaten atau kota" icon="location_on" value={prov} onChange={setProv}
  options={[{ value: 'bdl', label: 'Kota Bandar Lampung' }, { value: 'metro', label: 'Kota Metro' }]} />

// From a server: debounced 180 ms, aborted when the query changes
<Combobox label="Puskesmas" icon="local_hospital" value={uni} onChange={setUni} minChars={3}
  loadOptions={(q, signal) => fetch(\`/api/puskesmas?q=\${q}\`, { signal }).then((r) => r.json())}
  emptyText="Tidak ada puskesmas dengan nama itu. Periksa ejaannya." />`,
};
