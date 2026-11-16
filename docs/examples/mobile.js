/* Mobile preview: Sakai, a citizen app for the fictional Kota Contoh, shown in several device frames.
   Every frame runs the whole app and starts on a different screen; they share one set of example data,
   so a report sent in one frame shows up in the others. Every look comes from css/lds.css and every
   behavior that is not app logic from js/lds.js. All names, numbers and dates are example data. */
import {
  init, toast, setRoll, morphText, shake, haptic, setLoading, openLayer, closeLayer,
  pushView, popView, popToRoot, announce, fitDevice, openModal,
} from '../../js/lds.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ic = (n, cls = '') => `<span class="ic${cls ? ` ${cls}` : ''}" aria-hidden="true">${n}</span>`;
const chev = ic('chevron_right', 'lrow__chev');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const spinner = `<span class="spinner" aria-hidden="true">${'<i></i>'.repeat(8)}</span>`;
const btnLoad = (label, cls = 'btn btn--primary btn--lg btn--block', attrs = '') => `<button type="button" class="${cls}" ${attrs}><span class="btn__label">${label}</span><span class="btn__spin">${spinner}</span></button>`;
const chip = (label, on = false, attrs = '') => `<button type="button" class="chip" aria-pressed="${on}" ${attrs}><span class="ic chip__check" aria-hidden="true">check</span>${esc(label)}</button>`;
const seg = (label, items, on = 0, attrs = '') => `<div class="seg" role="group" aria-label="${esc(label)}" data-lds-segmented ${attrs}><span class="seg__thumb"></span>${items.map((t, i) => `<button type="button" class="seg__btn" aria-pressed="${i === on}" data-i="${i}">${esc(t)}</button>`).join('')}</div>`;
const tileIcon = (icon, tile) => `<span class="lrow__icon"${tile ? ` style="background: var(--tile-${tile});"` : ''}>${ic(icon)}</span>`;
const sw = (label, on, attrs = '') => `<div class="lrow"><label class="switch" style="flex: 1;"><input type="checkbox" role="switch"${on ? ' checked' : ''} ${attrs}><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__text">${esc(label)}</span></label></div>`;
const singleChoice = (row, cb) => row.addEventListener('click', (e) => {
  const c = e.target.closest('.chip'); if (!c) return;
  $$('.chip', row).forEach((x) => x.setAttribute('aria-pressed', String(x === c)));
  haptic('light'); cb && cb(c);
});
const chipText = (c) => (c ? c.lastChild.textContent.trim() : '');
const pickedChip = (row) => $('.chip[aria-pressed="true"]', row);
const copyBtn = (value, label = 'Salin') => `<button type="button" class="btn btn--gray btn--sm" data-lds-copy="${esc(value)}" data-lds-copy-announce="Disalin"><span class="swap" aria-hidden="true" style="width: 16px; height: 16px;"><span class="ic ic--sm swap__a">content_copy</span><span class="ic ic--sm swap__b">check</span></span><span data-lds-copy-label="Disalin">${esc(label)}</span></button>`;

/* ==========================================================================
   Example data, shared by every frame
   ========================================================================== */
const USER = { name: 'Rahmat Hidayat', first: 'Rahmat', initials: 'RH' };
const CATS = {
  jalan: ['Jalan rusak', 'warning', 'orange', 'Dinas Pekerjaan Umum Kota Contoh'],
  sampah: ['Sampah', 'delete', 'green', 'Dinas Lingkungan Hidup Kota Contoh'],
  lampu: ['Lampu jalan', 'lightbulb', 'gray', 'Dinas Perhubungan Kota Contoh'],
  banjir: ['Banjir dan saluran', 'flood', 'blue', 'Dinas Pekerjaan Umum Kota Contoh'],
  pohon: ['Pohon tumbang', 'park', 'green', 'Dinas Lingkungan Hidup Kota Contoh'],
  lainnya: ['Lainnya', 'more_horiz', 'gray', 'Kelurahan Sukamaju'],
};
let REPORTS = [
  {
    id: 'LPR-2611-0417', cat: 'jalan', title: 'Jalan berlubang di depan SD Negeri 2 Sukamaju', place: 'Jl. Melati Raya, Kelurahan Sukamaju', sent: '14 Nov 2026, 07.52 WIB', photos: 2,
    step: 3, note: 'Tim tambal jalan Dinas Pekerjaan Umum dijadwalkan datang Rabu, 18 Nov 2026.',
    steps: [['Diterima', '14 Nov, 07.52 WIB'], ['Diverifikasi petugas kelurahan', '14 Nov, 10.15 WIB'], ['Diteruskan ke Dinas Pekerjaan Umum', '15 Nov, 08.40 WIB'], ['Sedang dikerjakan', 'Perkiraan selesai 20 Nov'], ['Selesai', 'Menunggu pengerjaan']],
  },
  {
    id: 'LPR-2610-0233', cat: 'lampu', title: 'Tiga lampu jalan padam di Jl. Kenanga', place: 'Jl. Kenanga, Kelurahan Sukamaju', sent: '28 Okt 2026, 19.20 WIB', photos: 1,
    step: 5, rating: 0, note: '',
    steps: [['Diterima', '28 Okt, 19.20 WIB'], ['Diverifikasi petugas kelurahan', '29 Okt, 09.05 WIB'], ['Diteruskan ke Dinas Perhubungan', '29 Okt, 13.30 WIB'], ['Sedang dikerjakan', '2 Nov, 08.00 WIB'], ['Selesai', '3 Nov, 16.45 WIB']],
  },
];
let NOTIFS = [
  { id: 1, icon: 'flood', tile: 'blue', title: 'Siaga banjir di Kelurahan Way Kandis', sub: 'Hari ini, 07.30 WIB', unread: true },
  { id: 2, icon: 'check_circle', tile: 'green', title: 'LPR-2611-0417 diteruskan ke Dinas Pekerjaan Umum', sub: 'Kemarin, 08.40 WIB', unread: true },
  { id: 3, icon: 'confirmation_number', tile: 'orange', title: 'Antrean A-027 di Puskesmas Tanjung dibuka', sub: 'Hari ini, 07.05 WIB', unread: false },
  { id: 4, icon: 'payments', tile: 'gray', title: 'Pajak kendaraan BE 1234 XY jatuh tempo 12 Des 2026', sub: '13 Nov 2026', unread: false },
  { id: 5, icon: 'water_drop', tile: 'blue', title: 'Air bersih padam Kamis, 19 Nov, 09.00 sampai 15.00 WIB', sub: '12 Nov 2026', unread: false },
];
const NEWS = [
  { id: 'pasar', icon: 'storefront', tile: 'orange', title: 'Pasar murah di Lapangan Sukamaju, 18 sampai 20 Nov', sub: 'Dinas Perdagangan · 15 Nov 2026', body: ['Beras, minyak goreng, gula dan telur dijual di bawah harga pasar setiap hari pukul 08.00 sampai 12.00 WIB.', 'Bawa KTP dengan alamat Kota Contoh. Setiap KTP bisa membeli satu paket per hari selama persediaan ada.'] },
  { id: 'bus', icon: 'directions_bus', tile: 'blue', title: 'Bus Koridor 3 mulai melayani Sukamaju ke Terminal Tanjung', sub: 'Dinas Perhubungan · 13 Nov 2026', body: ['Mulai 1 Des 2026, bus Koridor 3 berangkat setiap 15 menit dari Halte Pasar Kota, pukul 05.30 sampai 21.00 WIB.', 'Tarif Rp 4.000 sekali jalan. Pelajar dan lansia membayar Rp 2.000 dengan kartu warga.'] },
  { id: 'vaksin', icon: 'local_hospital', tile: 'red', title: 'Imunisasi anak gratis di 12 puskesmas, Sabtu 21 Nov', sub: 'Dinas Kesehatan · 12 Nov 2026', body: ['Imunisasi dasar dan lanjutan untuk anak usia 0 sampai 6 tahun, pukul 08.00 sampai 13.00 WIB.', 'Bawa buku kesehatan ibu dan anak. Ambil nomor antrean dari menu Layanan agar tidak menunggu lama.'] },
];
let QUEUE = { has: true, place: 'Puskesmas Tanjung', poli: 'Poli umum', no: 27, now: 19, eta: '09.10 WIB' };
const BUSES = [
  { line: 'Koridor 1', to: 'Terminal Tanjung', bus: 'Bus TK-07', min: 3 },
  { line: 'Koridor 2', to: 'Kampus Sukamaju', bus: 'Bus TK-12', min: 9 },
  { line: 'Koridor 1', to: 'Terminal Tanjung', bus: 'Bus TK-03', min: 17 },
];
const CAMS = [
  { name: 'Simpang Pasar Kota', sub: 'Lalu lintas padat merayap', live: true },
  { name: 'Jl. Sultan Agung arah Way Kandis', sub: 'Genangan 20 cm di lajur kiri', live: true },
  { name: 'Bundaran Taman Kota', sub: 'Lalu lintas lancar', live: true },
  { name: 'Jembatan Kali Akar', sub: 'Kamera dalam perbaikan sejak 12 Nov', live: false },
];
let nextReport = 482;
let clock = 41;
const now = () => `08.${String(clock).padStart(2, '0')} WIB`;

/* ==========================================================================
   Markup: screens, tabs, sheets
   ========================================================================== */
const screen = (o) => `<section class="navstack__view" id="${o.id}"${o.root ? '' : ' hidden'} aria-label="${esc(o.title)}">
  <div class="navbar${o.root ? '' : ' navbar--inline'}" id="${o.id}-bar">
    <span>${o.root ? (o.lead || '') : `<button type="button" class="navbar__back" data-lds-back aria-label="Kembali ke ${esc(o.back)}">${ic('arrow_back_ios_new')}<span>${esc(o.back)}</span></button>`}</span>
    ${o.root ? `<span class="navbar__title" aria-hidden="true">${esc(o.title)}</span>` : `<h1 class="navbar__title">${esc(o.title)}</h1>`}
    <div class="navbar__end">${o.end || ''}</div>
  </div>
  <div class="phone__scroll" data-lds-navbar="${o.id}-bar"${o.refresh ? ' data-lds-refresh' : ''}>
    ${o.refresh ? `<div class="refresh" aria-hidden="true">${spinner}</div>` : ''}
    <div class="navbar-gap"></div>
    ${o.root ? `<h1 class="large-title">${esc(o.title)}</h1>` : ''}
    <div class="mp-screen" data-body>${o.body}</div>
  </div>
</section>`;
const sheet = (id, title, body) => `<div class="scrim" data-lds-scrim="${id}"></div>
<div class="sheet" id="${id}" role="dialog" aria-modal="true" aria-labelledby="${id}-t" data-lds-layer>
  <div class="sheet__grabber" aria-hidden="true"></div>
  <div class="sheet__head" data-lds-drag><h2 class="sheet__title" id="${id}-t">${esc(title)}</h2><button type="button" class="icon-btn icon-btn--filled" aria-label="Tutup" data-lds-close>${ic('close')}</button></div>
  ${body}
</div>`;
const TABS = [
  { key: 'home', label: 'Beranda', icon: 'home' },
  { key: 'layanan', label: 'Layanan', icon: 'account_balance' },
  { key: 'lapor', label: 'Lapor', icon: 'campaign' },
  { key: 'info', label: 'Info kota', icon: 'location_city' },
  { key: 'akun', label: 'Akun', icon: 'person' },
];

/* ---------- Shared pieces that re-render in every frame ---------- */
const stepLabel = (r) => (r.step >= r.steps.length ? 'Selesai' : r.steps[r.step][0]);
const reportBadge = (r) => (r.step >= r.steps.length ? '<span class="badge badge--success">Selesai</span>' : r.step <= 1 ? '<span class="badge">Diterima</span>' : '<span class="badge badge--accent">Diproses</span>');
const reportRow = (r, target) => `<button type="button" class="lrow lrow--icon" style="min-height: 64px;" data-lds-nav="${target}" data-report="${r.id}">${tileIcon(CATS[r.cat][1], CATS[r.cat][2])}<span class="lrow__body"><span class="lrow__title" style="font-weight: 500;">${esc(r.title)}</span><span class="lrow__sub">${r.step >= r.steps.length ? `${r.id} · selesai ${esc(r.steps.at(-1)[1].split(',')[0])}` : `${esc(stepLabel(r))} · langkah ${r.step + 1} dari ${r.steps.length}`}</span></span>${reportBadge(r)}${chev}</button>`;
const R = {
  active: (p) => {
    const list = REPORTS.filter((r) => r.step < r.steps.length);
    return list.length
      ? `<div class="list list--fill">${list.map((r) => reportRow(r, `${p}-status-home`)).join('')}</div>`
      : `<div class="list list--fill"><div class="empty"><div class="empty__icon">${ic('check_circle')}</div><div class="empty__title">Tidak ada laporan yang berjalan</div><div class="empty__body">Laporan yang Anda kirim dari menu Lapor muncul di sini sampai selesai.</div><button type="button" class="btn btn--secondary btn--md" data-go-tab="lapor">Buat laporan</button></div></div>`;
  },
  mine: (p) => `<div class="list list--fill">${REPORTS.map((r) => reportRow(r, `${p}-status-akun`)).join('')}</div>`,
  notifs: () => (NOTIFS.length
    ? `<div class="list stagger">${NOTIFS.map((n) => `<div class="swipe" data-lds-swipe data-notif="${n.id}">
        <div class="swipe__actions">${n.unread ? `<button type="button" class="swipe__act swipe__act--gray" data-swipe="read">${ic('drafts')}Dibaca</button>` : ''}<button type="button" class="swipe__act swipe__act--danger" data-swipe="delete" data-swipe-commit>${ic('delete')}Hapus</button></div>
        <div class="swipe__row lrow lrow--icon" tabindex="0" style="min-height: 68px;">${tileIcon(n.icon, n.tile)}<span class="lrow__body"><span class="lrow__title"${n.unread ? ' style="font-weight: 600;"' : ''}>${esc(n.title)}</span><span class="lrow__sub">${esc(n.sub)}</span></span>${n.unread ? '<span class="count">Baru</span>' : ''}</div>
      </div>`).join('')}</div>
      <p class="list__footer">Geser pemberitahuan ke kiri untuk menandai dibaca atau menghapusnya.</p>`
    : `<div class="list list--fill"><div class="empty" role="status"><div class="empty__icon">${ic('notifications_off')}</div><div class="empty__title">Tidak ada pemberitahuan</div><div class="empty__body">Peringatan cuaca, kabar laporan dan pengingat antrean muncul di sini.</div></div></div>`),
  queue: (p) => {
    if (!QUEUE.has) return `<div class="list list--fill"><div class="empty"><div class="empty__icon">${ic('confirmation_number')}</div><div class="empty__title">Belum ada antrean hari ini</div><div class="empty__body">Ambil nomor dari rumah, lalu datang saat giliran Anda sudah dekat.</div><button type="button" class="btn btn--primary btn--md" data-lds-open="${p}-queue" aria-haspopup="dialog">Ambil nomor antrean</button></div></div>`;
    const ahead = Math.max(0, QUEUE.no - QUEUE.now);
    const done = QUEUE.now / QUEUE.no;
    return `<article class="card mp-card" aria-labelledby="${p}-q-t">
      <div class="mp-card__head"><div><h2 class="card__title" id="${p}-q-t">${esc(QUEUE.place)}</h2><p class="card__sub">${esc(QUEUE.poli)} · Senin, 16 Nov 2026</p></div><span class="badge badge--accent">${ahead ? 'Menunggu' : 'Giliran Anda'}</span></div>
      <div class="stat-row-wrap"><dl class="stat-row" style="--n: 2">
        <div class="stat-row__item"><dt class="stat-row__label">Nomor Anda</dt><dd class="stat-row__value">A-0${QUEUE.no}</dd></div>
        <div class="stat-row__item"><dt class="stat-row__label">Sedang dilayani</dt><dd class="stat-row__value">A-0<span class="roll" data-lds-roll="${QUEUE.now}" data-lds-roll-label="A-0{n}" data-q-now></span></dd></div>
      </dl></div>
      <div><div class="progress-meta"><span id="${p}-q-l" data-q-ahead>${ahead ? `${ahead} orang lagi` : 'Silakan ke loket'}</span><b>Perkiraan ${esc(QUEUE.eta)}</b></div>
        <div class="progress" role="progressbar" aria-labelledby="${p}-q-l" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(done * 100)}"><div class="progress__fill" data-q-bar style="transform: scaleX(${done.toFixed(2)});"></div></div></div>
      <p class="card__sub">Datang 15 menit sebelum perkiraan. Bawa KTP dan kartu jaminan kesehatan.</p>
      <div class="cluster">${btnLoad(`${ic('refresh')}Perbarui posisi`, 'btn btn--secondary btn--md', 'data-act="queue-refresh"')}<button type="button" class="btn btn--danger-tinted btn--md" data-act="queue-cancel">Batalkan antrean</button></div>
    </article>`;
  },
};

/* ---------- Beranda ---------- */
const QUICK = [
  ['Lapor', 'campaign', 'data-go-tab="lapor"'],
  ['Antrean', 'confirmation_number', 'data-go-tab="layanan"'],
  ['Pajak', 'payments', 'data-open-tax="kend"'],
  ['Izin', 'badge', 'data-go-tab="layanan" data-scroll="izin"'],
  ['Bus', 'directions_bus', 'data-go-tab="info" data-pane="0"'],
  ['Banjir', 'flood', 'data-go-tab="info" data-pane="2"'],
  ['CCTV', 'videocam', 'data-go-tab="info" data-pane="3"'],
  ['Udara', 'air', 'data-go-tab="info" data-pane="1"'],
];
const homeView = (p) => screen({
  id: `${p}-home`, root: true, title: 'Beranda', refresh: true,
  end: `<button type="button" class="icon-btn" aria-label="Pemberitahuan" data-lds-nav="${p}-notif" data-bell>${ic('notifications')}</button>`,
  body: `<p class="section__sub mp-greet">Selamat pagi, ${esc(USER.first)}. Senin, 16 Nov 2026.</p>
    <div class="ptile-grid mp-quick" role="group" aria-label="Layanan cepat">${QUICK.map(([l, i, a]) => `<button type="button" class="ptile" ${a}><span class="ptile__media">${ic(i)}</span><span class="ptile__body"><span class="ptile__name">${l}</span></span></button>`).join('')}</div>
    <article class="card mp-card" aria-labelledby="${p}-wx-t">
      <div class="mp-card__head"><div class="mp-weather">${ic('partly_cloudy_day', 'ic--lg')}<div><h2 class="card__title" id="${p}-wx-t">29°C, berawan</h2><p class="card__sub">Kota Contoh · <span data-wx-time>diperbarui 08.30 WIB</span></p></div></div></div>
      <dl class="kv-list">
        <div class="kv"><dt>Siang nanti</dt><dd>Hujan lebat mulai 14.00 WIB</dd></div>
        <div class="kv"><dt>Kualitas udara</dt><dd>Sedang, ISPU 62</dd></div>
      </dl>
      <div class="alert alert--warning">${ic('flood')}<div><div class="alert__title">Siaga banjir di Kelurahan Way Kandis</div><div class="alert__body">Tinggi air di Pos Way Kandis 142 cm. Hindari Jl. Sultan Agung sore ini.</div><div class="alert__actions"><button type="button" class="btn btn--secondary btn--sm" data-go-tab="info" data-pane="2">Lihat tinggi air</button></div></div></div>
    </article>
    <div><p class="list__header">Laporan berjalan</p><div data-r="active">${R.active(p)}</div></div>
    <div><p class="list__header">Kabar kota</p><div class="list list--fill">${NEWS.map((n) => `<button type="button" class="lrow lrow--icon" style="min-height: 68px;" data-lds-nav="${p}-news" data-news="${n.id}">${tileIcon(n.icon, n.tile)}<span class="lrow__body"><span class="lrow__title" style="font-weight: 500;">${esc(n.title)}</span><span class="lrow__sub">${esc(n.sub)}</span></span>${chev}</button>`).join('')}</div></div>`,
}) + screen({
  id: `${p}-notif`, title: 'Pemberitahuan', back: 'Beranda',
  end: '<button type="button" class="btn btn--plain btn--sm" data-act="read-all">Tandai dibaca</button>',
  body: `<div data-r="notifs">${R.notifs()}</div>`,
}) + screen({
  id: `${p}-news`, title: 'Kabar kota', back: 'Beranda',
  body: '<div class="stack" style="--gap: 16px;" data-news-body></div>',
}) + statusView(p, 'home', 'Beranda');

/* ---------- Status laporan (one per stack that opens it) ---------- */
function statusView(p, where, back) {
  return screen({ id: `${p}-status-${where}`, title: 'Status laporan', back, body: '<div class="stack" style="--gap: 24px;" data-status-body></div>' });
}
function fillStatus(view, r) {
  const done = r.step >= r.steps.length;
  const body = $('[data-status-body]', view);
  view.dataset.report = r.id;
  body.innerHTML = `<div class="stack" style="--gap: 8px;">
      <div class="cluster">${reportBadge(r)}<span class="lrow__sub">${esc(CATS[r.cat][0])}</span></div>
      <h2 class="section__title">${esc(r.title)}</h2>
      <p class="section__sub">${esc(r.place)}</p>
    </div>
    <div class="list list--fill mp-pad"><ol class="tl">${r.steps.map(([t, m], i) => {
      const isDone = i < r.step;
      const cur = i === r.step;
      return `<li class="tl__item"${cur ? ' aria-current="step"' : ''}><span class="tl__dot${isDone ? ' tl__dot--done' : ''}">${isDone ? ic('check') : cur ? ic('schedule') : ''}</span><div><div class="tl__title">${esc(t)}</div><div class="tl__meta">${isDone ? '<span class="sr-only">Selesai. </span>' : ''}${esc(m)}</div></div></li>`;
    }).join('')}</ol></div>
    ${r.note && !done ? `<div class="alert alert--info">${ic('info')}<div><div class="alert__title">Kabar terakhir</div><div class="alert__body">${esc(r.note)}</div></div></div>` : ''}
    <dl class="kv-list">
      <div class="kv"><dt>Nomor laporan</dt><dd class="cluster" style="--gap: 8px; justify-content: flex-end;"><span>${r.id}</span>${copyBtn(r.id)}</dd></div>
      <div class="kv"><dt>Ditangani</dt><dd>${esc(CATS[r.cat][3])}</dd></div>
      <div class="kv"><dt>Dikirim</dt><dd>${esc(r.sent)}</dd></div>
      <div class="kv"><dt>Foto</dt><dd>${r.photos ? `${r.photos} foto terlampir` : 'Tanpa foto'}</dd></div>
    </dl>
    ${done ? `<div class="field"><span class="field__label" id="${view.id}-rate">Bagaimana penanganannya?</span><div class="stars" role="radiogroup" aria-labelledby="${view.id}-rate" data-lds-rating data-rate="${r.id}">${[1, 2, 3, 4, 5].map((n) => `<button type="button" class="star${n <= (r.rating || 0) ? ' on' : ''}" role="radio" aria-checked="${n === r.rating}" tabindex="${n === (r.rating || 1) ? 0 : -1}" aria-label="${n} bintang">${ic('star')}</button>`).join('')}</div><span class="field__help">Penilaian Anda dibaca oleh ${esc(CATS[r.cat][3].replace(' Kota Contoh', ''))}.</span></div>`
      : `<div class="list list--fill">${sw('Kabari saya setiap ada kabar baru', true, 'data-follow')}</div>`}`;
  init(body);
}

/* ---------- Lapor ---------- */
const laporView = (p) => screen({
  id: `${p}-lapor`, root: true, title: 'Lapor',
  body: `<p class="section__sub mp-greet">Laporan diperiksa petugas kelurahan, lalu diteruskan ke dinas yang menangani.</p>
    <div class="form">
      <div class="field"><span class="field__label" id="${p}-cat-l">Kategori</span><div class="chip-row" role="group" aria-labelledby="${p}-cat-l" data-cat>${Object.entries(CATS).map(([k, c]) => chip(c[0], false, `data-k="${k}"`)).join('')}</div><span class="field__help" data-help="cat">Pilih yang paling dekat dengan masalahnya.</span></div>
      <div class="field"><span class="field__label">Foto, tidak wajib</span>
        <div class="drop" data-lds-file="${p}-files" data-one="foto ditambahkan" data-many="foto ditambahkan" data-remove="Hapus">
          ${ic('photo_camera')}<span class="empty__title">Tambahkan foto kejadian</span><span class="empty__body">JPG atau PNG, paling besar 5 MB</span>
          <button type="button" class="btn btn--secondary btn--sm" data-lds-file-pick>Pilih foto</button>
          <input type="file" accept="image/*" multiple hidden aria-label="Foto kejadian">
        </div>
        <div class="stack" id="${p}-files" aria-label="Foto terpilih"></div>
      </div>
      <div class="field"><span class="field__label" id="${p}-loc-l">Lokasi</span>
        <div class="list list--fill" role="group" aria-labelledby="${p}-loc-l"><div class="lrow lrow--icon" style="min-height: 64px; flex-wrap: wrap;">${tileIcon('location_on', 'gray')}<span class="lrow__body"><span class="lrow__title" data-loc-title>Belum ada lokasi</span><span class="lrow__sub" data-loc-sub>Petugas perlu titik yang tepat</span></span>${btnLoad('Pakai lokasi saya', 'btn btn--tinted btn--sm', 'data-act="locate"')}</div></div>
        <span class="field__help" data-help="loc">Lokasi dari ponsel Anda, bisa diperbarui sebelum dikirim.</span></div>
      <div class="field"><label class="field__label" for="${p}-desc">Keterangan <span class="counter" id="${p}-desc-c">0 / 500</span></label>
        <div class="control control--area"><textarea id="${p}-desc" rows="4" maxlength="500" data-lds-count="${p}-desc-c" aria-describedby="${p}-desc-h ${p}-desc-c" placeholder="Lubang selebar kira-kira satu meter, dua motor terjatuh minggu ini."></textarea></div>
        <span class="field__help" id="${p}-desc-h" data-help="desc">Paling sedikit 20 huruf: apa yang terjadi dan sejak kapan.</span></div>
      <div class="list list--fill">${sw('Sembunyikan nama saya dari laporan publik', false, 'data-anon')}</div>
      ${btnLoad('Kirim laporan', 'btn btn--primary btn--lg btn--block', 'data-act="send"')}
    </div>`,
}) + statusView(p, 'lapor', 'Lapor');

/* ---------- Layanan ---------- */
const PERMITS = [
  ['Nomor induk berusaha, Warung Bu Sari', 'Verifikasi berkas · langkah 2 dari 4', '<span class="badge badge--accent">Diproses</span>', 'storefront', 'orange'],
  ['Persetujuan bangunan, rumah tinggal', 'Unggah denah baru sebelum 20 Nov 2026', '<span class="badge badge--warning">Perlu revisi</span>', 'apartment', 'blue'],
  ['Surat keterangan domisili', 'Terbit 9 Nov 2026 · berlaku 6 bulan', '<span class="badge badge--success">Selesai</span>', 'description', 'green'],
];
const layananView = (p) => screen({
  id: `${p}-layanan`, root: true, title: 'Layanan',
  body: `<div><p class="list__header">Antrean puskesmas</p><div data-r="queue">${R.queue(p)}</div></div>
    <div><p class="list__header">Pajak daerah</p><div class="list list--fill">
      <button type="button" class="lrow lrow--icon" style="min-height: 60px;" data-open-tax="kend">${tileIcon('directions_car', 'blue')}<span class="lrow__body"><span class="lrow__title" style="font-weight: 500;">Pajak kendaraan</span><span class="lrow__sub">Tagihan dan jatuh tempo dari nomor polisi</span></span>${chev}</button>
      <button type="button" class="lrow lrow--icon" style="min-height: 60px;" data-open-tax="pbb">${tileIcon('home', 'green')}<span class="lrow__body"><span class="lrow__title" style="font-weight: 500;">PBB rumah dan tanah</span><span class="lrow__sub">Tagihan tahun 2026 dari nomor objek pajak</span></span>${chev}</button>
    </div></div>
    <div data-izin><p class="list__header">Status izin</p><div class="list list--fill">${PERMITS.map(([t, s, b, i, c]) => `<div class="lrow lrow--icon" style="min-height: 64px;">${tileIcon(i, c)}<span class="lrow__body"><span class="lrow__title">${esc(t)}</span><span class="lrow__sub">${esc(s)}</span></span>${b}</div>`).join('')}</div>
      <p class="list__footer">Izin diajukan di Mal Pelayanan Publik Kota Contoh. Statusnya ikut diperbarui di sini.</p></div>`,
});

/* ---------- Info kota ---------- */
const busRows = () => BUSES.map((b, i) => `<div class="lrow lrow--icon" style="min-height: 64px;">${tileIcon('directions_bus', i === 1 ? 'orange' : 'blue')}<span class="lrow__body"><span class="lrow__title">${b.line} ke ${esc(b.to)}</span><span class="lrow__sub">${esc(b.bus)}${i === 0 ? ' · <span class="status status--live"><i aria-hidden="true"></i>Mendekat</span>' : ''}</span></span><span class="lrow__value" style="font-variant-numeric: tabular-nums; color: var(--text-strong);"><span class="roll" data-lds-roll="${b.min}" data-lds-roll-label="{n} menit" data-bus="${i}"></span> mnt</span></div>`).join('');
const WATER = [
  ['Pos Way Kandis', 142, 200, 'Siaga 3', 'is-warn', '<span class="badge badge--warning">Siaga 3</span>'],
  ['Pos Kali Akar', 88, 200, 'Normal', '', '<span class="badge">Normal</span>'],
  ['Pos Sukamaju', 64, 200, 'Normal', '', '<span class="badge">Normal</span>'],
];
const meter = (id, v, max, text, cls) => { const on = Math.round((v / max) * 10); return `<div class="meter-seg${cls ? ` ${cls}` : ''}" role="meter" aria-labelledby="${id}" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${v}" aria-valuetext="${v} cm, ${text}">${Array.from({ length: 10 }, (_, i) => `<i${i < on ? ' class="on"' : ''}></i>`).join('')}</div>`; };
const infoView = (p) => screen({
  id: `${p}-info`, root: true, title: 'Info kota', refresh: true,
  body: `${seg('Jenis info', ['Bus', 'Udara', 'Banjir', 'CCTV'], 0, 'data-panes')}
    <div data-pane="0" class="stack" style="--gap: 8px;">
      <p class="list__header" style="padding-bottom: 0;">Halte Pasar Kota · <span data-bus-time>diperbarui 08.40 WIB</span></p>
      <div class="list list--fill">${busRows()}</div>
      <p class="list__footer">Tarik daftar ke bawah untuk memperbarui waktu tiba.</p>
    </div>
    <div data-pane="1" hidden class="stack" style="--gap: 16px;" data-air></div>
    <div data-pane="2" hidden class="stack" style="--gap: 8px;">
      <p class="list__header" style="padding-bottom: 0;">Tinggi muka air, batas siaga 1 di 200 cm</p>
      <div class="list list--fill mp-pad stack" style="--gap: 20px;">${WATER.map(([n, v, max, t, cls, b], i) => `<div><div class="progress-meta"><span id="${p}-w${i}">${n}</span><b>${v} cm</b></div>${meter(`${p}-w${i}`, v, max, t, cls)}<div class="cluster" style="margin-top: 8px;">${b}<span class="lrow__sub">Diukur 08.30 WIB</span></div></div>`).join('')}</div>
      <p class="list__footer">Data dari pos pantau BPBD Kota Contoh, diperbarui setiap 15 menit.</p>
    </div>
    <div data-pane="3" hidden class="stack" style="--gap: 8px;">
      <div class="list list--fill">${CAMS.map((c, i) => `<button type="button" class="lrow lrow--icon" style="min-height: 64px;" data-lds-open="${p}-cam" data-cam="${i}" aria-haspopup="dialog">${tileIcon('videocam', c.live ? 'gray' : '')}<span class="lrow__body"><span class="lrow__title" style="font-weight: 500;">${esc(c.name)}</span><span class="lrow__sub">${c.live ? `<span class="status status--ok"><i aria-hidden="true"></i>Aktif</span> · ` : ''}${esc(c.sub)}</span></span>${c.live ? '' : '<span class="badge">Nonaktif</span>'}${chev}</button>`).join('')}</div>
      <p class="list__footer">Rekaman kamera hanya ditampilkan langsung, tidak disimpan di ponsel Anda.</p>
    </div>`,
});
const airPane = (p) => `<div class="list list--fill mp-pad" style="display: grid; justify-items: center;"><div data-lds-chart='{"type":"gauge","label":"Indeks standar pencemar udara 62 dari 300, kategori sedang.","value":62,"max":300,"center":"62","unit":"ISPU, sedang","minLabel":"0","maxLabel":"300","tone":"warning"}' style="--size: 200px;"></div></div>
  <dl class="kv-list">
    <div class="kv"><dt>Partikel halus PM2,5</dt><dd>21 µg/m³</dd></div>
    <div class="kv"><dt>Suhu</dt><dd>29°C</dd></div>
    <div class="kv"><dt>Kelembapan</dt><dd>78%</dd></div>
    <div class="kv"><dt>Stasiun</dt><dd>Taman Kota</dd></div>
  </dl>
  <div class="alert alert--info">${ic('air')}<div><div class="alert__title">Masih aman untuk beraktivitas di luar</div><div class="alert__body">Orang dengan asma sebaiknya mengurangi olahraga berat di dekat jalan raya.</div></div></div>`;

/* ---------- Akun ---------- */
const akunView = (p) => screen({
  id: `${p}-akun`, root: true, title: 'Akun',
  body: `<article class="card mp-card" aria-labelledby="${p}-id-t">
      <div class="mp-card__head"><div class="cluster" style="--gap: 12px; flex-wrap: nowrap;"><span class="avatar" style="--size: 48px;">${USER.initials}</span><div><h2 class="card__title" id="${p}-id-t">${esc(USER.name)}</h2><p class="card__sub">Kartu warga digital</p></div></div><span class="badge badge--success">${ic('verified')}Terverifikasi</span></div>
      <dl class="kv-list">
        <div class="kv"><dt>NIK</dt><dd>•••• •••• •••• 0042</dd></div>
        <div class="kv"><dt>Kelurahan</dt><dd>Sukamaju</dd></div>
        <div class="kv"><dt>Alamat</dt><dd>Jl. Melati Raya No. 8, RT 004/RW 002</dd></div>
      </dl>
      <button type="button" class="btn btn--primary btn--md btn--block" data-lds-open="${p}-qr" aria-haspopup="dialog">${ic('qr_code')}Tampilkan kode QR</button>
    </article>
    <div><p class="list__header">Laporan saya</p><div data-r="mine">${R.mine(p)}</div></div>
    <div><p class="list__header">Pemberitahuan</p><div class="list list--fill">
      ${sw('Peringatan banjir dan cuaca', true, 'data-toast-on="Peringatan banjir aktif" data-toast-off="Peringatan banjir nonaktif"')}
      ${sw('Kabar laporan saya', true, 'data-toast-on="Kabar laporan aktif" data-toast-off="Kabar laporan nonaktif"')}
      ${sw('Pengingat pajak 7 hari sebelum jatuh tempo', false, 'data-toast-on="Pengingat pajak aktif" data-toast-off="Pengingat pajak nonaktif"')}
    </div></div>
    <div><p class="list__header">Privasi</p><div class="list list--fill"><div class="lrow" style="flex-wrap: wrap; min-height: 60px;"><span class="lrow__body"><span class="lrow__title">Riwayat lokasi laporan</span><span class="lrow__sub" data-hist>12 titik tersimpan di ponsel ini</span></span>
      <div class="confirm" data-lds-confirm data-confirm="hist">
        <span class="confirm__face confirm__face--rest"><button type="button" class="confirm__arm" data-act="arm">${ic('delete')}Hapus</button></span>
        <span class="confirm__face confirm__face--ask"><span class="confirm__q">Hapus 12 titik?</span><button type="button" class="btn btn--plain" data-act="cancel">Simpan</button><button type="button" class="btn btn--danger" data-act="confirm">Hapus</button></span>
        <span class="confirm__face confirm__face--busy" role="status">${spinner}<span class="shimmer">Menghapus</span></span>
        <span class="confirm__face confirm__face--done" role="status">${ic('check_circle')}Terhapus<button type="button" class="confirm__undo" data-act="undo">Urungkan</button></span>
      </div></div></div><p class="list__footer">Laporan yang sudah dikirim tetap menyimpan lokasinya.</p></div>
    <div class="list list--fill"><button type="button" class="lrow" style="justify-content: center;" data-act="signout"><span class="lrow__title" style="color: var(--danger-text); font-weight: 500; flex: none;">Keluar</span></button></div>`,
}) + statusView(p, 'akun', 'Akun');

/* ---------- Sheets ---------- */
const sheets = (p) => sheet(`${p}-queue`, 'Ambil nomor antrean', `<div class="form">
    <div class="field"><span class="field__label" id="${p}-qp-l">Puskesmas</span><div class="chip-row" role="group" aria-labelledby="${p}-qp-l" data-q-place>${chip('Puskesmas Tanjung', true)}${chip('Puskesmas Sukamaju')}${chip('Puskesmas Way Kandis')}</div></div>
    <div class="field"><span class="field__label" id="${p}-qs-l">Layanan</span><div class="chip-row" role="group" aria-labelledby="${p}-qs-l" data-q-poli>${chip('Poli umum', true)}${chip('Poli gigi')}${chip('KIA dan KB')}${chip('Lansia')}</div><span class="field__help">Sisa kuota hari ini 14 nomor. Loket buka 07.30 sampai 14.00 WIB.</span></div>
    ${btnLoad('Ambil nomor', 'btn btn--primary btn--lg btn--block', 'data-act="queue-take"')}
  </div>`)
  + sheet(`${p}-tax`, 'Cek pajak daerah', `<div class="form">
    ${seg('Jenis pajak', ['Kendaraan', 'PBB'], 0, 'data-tax-seg')}
    <div class="field"><label class="field__label" for="${p}-tax-in" data-tax-label>Nomor polisi</label><div class="control"><input id="${p}-tax-in" autocomplete="off" autocapitalize="characters" placeholder="BE 1234 XY" aria-describedby="${p}-tax-h" data-tax-in></div><span class="field__help" id="${p}-tax-h" data-tax-help>Sesuai yang tertulis di STNK.</span></div>
    ${btnLoad('Cek tagihan', 'btn btn--primary btn--lg btn--block', 'data-act="tax-check"')}
    <div data-tax-out aria-live="polite"></div>
  </div>`)
  + sheet(`${p}-cam`, 'Kamera kota', `<div class="stack" style="--gap: 16px;">
    <div class="thumb" style="--ratio: 16 / 9;" role="img" data-cam-shot aria-label="Cuplikan kamera"></div>
    <p class="section__sub" data-cam-note>Siaran langsung tidak ditampilkan di contoh ini.</p>
    <dl class="kv-list"><div class="kv"><dt>Kondisi</dt><dd data-cam-sub></dd></div><div class="kv"><dt>Diperbarui</dt><dd data-cam-time>08.40 WIB</dd></div></dl>
  </div>`)
  + sheet(`${p}-qr`, 'Kode QR kartu warga', `<div class="stack" style="--gap: 16px;">
    <div class="card mp-qr" role="img" aria-label="Tempat kode QR kartu warga ${esc(USER.name)}"><div class="card__media">${ic('qr_code')}</div><div class="card__title">${esc(USER.name)}</div><div class="card__sub">NIK •••• 0042 · <span data-qr-time>dibuat 08.38 WIB</span></div></div>
    <p class="section__sub">Tunjukkan ke petugas loket untuk mengisi data Anda. Kode berganti setiap 5 menit.</p>
    ${btnLoad('Buat kode baru', 'btn btn--secondary btn--lg btn--block', 'data-act="qr-new"')}
  </div>`);

const app = (p) => `<div class="app">
  ${TABS.map((t, i) => `<div class="app__tab" data-tab="${t.key}"${i ? ' hidden' : ''}><div class="navstack" data-lds-navstack>${{ home: homeView, layanan: layananView, lapor: laporView, info: infoView, akun: akunView }[t.key](p)}</div></div>`).join('')}
  <nav class="tabbar" aria-label="Sakai">${TABS.map((t, i) => `<button type="button" class="tabbar__item" data-tab="${t.key}"${i ? '' : ' aria-current="page"'}>${ic(t.icon)}${esc(t.label)}</button>`).join('')}</nav>
</div>`;
const sheetIds = (p) => ['queue', 'tax', 'cam', 'qr'].map((s) => `${p}-${s}`).join(' ');
const phone = (p) => `<div class="device" data-lds-device data-fit-margin="120">
  <div class="phone" id="${p}-phone" data-lds-push="${sheetIds(p)}">
    <div class="phone__content">${app(p)}</div>
    ${sheets(p)}
    <div class="toaster" role="status" aria-live="polite"></div>
    <div class="device__status" aria-hidden="true">
      <span>8:41</span>
      <span class="device__status-end"><span class="device__signal"><i></i><i></i><i></i><i></i></span><span class="ic">wifi</span><span class="device__battery" style="--level: 0.68;"></span></span>
    </div>
    <span class="device__island" aria-hidden="true"></span>
    <span class="home-ind" aria-hidden="true"></span>
  </div>
</div>`;

/* ==========================================================================
   The frames on the page
   ========================================================================== */
const COMP = {
  'phone-bars': 'Bilah ponsel', 'nav-stack': 'Tumpukan navigasi', 'pull-to-refresh': 'Tarik untuk memuat ulang', 'product-tile': 'Ubin',
  card: 'Kartu', alert: 'Peringatan', 'key-value': 'Kunci dan nilai', list: 'Daftar', badge: 'Lencana', chips: 'Chip', 'file-input': 'Unggah berkas',
  textarea: 'Area teks', switch: 'Sakelar', shake: 'Getar', toast: 'Toast', timeline: 'Linimasa', 'copy-button': 'Tombol salin', rating: 'Rating',
  'stat-row': 'Baris angka', 'rolling-number': 'Angka bergulir', 'progress-bar': 'Bilah progres', sheet: 'Sheet', 'segmented-control': 'Kontrol segmen',
  gauge: 'Gauge', meter: 'Meter', 'status-dot': 'Titik status', 'swipe-actions': 'Geser baris', 'empty-state': 'Keadaan kosong', count: 'Hitungan',
  avatar: 'Avatar', 'confirm-in-place': 'Konfirmasi di tempat', 'device-frame': 'Bingkai perangkat',
};
const SHOTS = [
  { k: 'beranda', name: 'Beranda', tab: 'home', hint: 'Tarik layar ke bawah untuk memperbarui cuaca. Ketuk ubin layanan, laporan berjalan atau kabar kota.', comps: ['phone-bars', 'pull-to-refresh', 'product-tile', 'card', 'alert', 'nav-stack'] },
  { k: 'lapor', name: 'Lapor', tab: 'lapor', hint: 'Kirim tanpa kategori untuk melihat penolakannya, lalu lengkapi dan kirim. Toast memberi waktu untuk membatalkan.', comps: ['chips', 'file-input', 'textarea', 'shake', 'toast', 'switch'] },
  { k: 'status', name: 'Status laporan', tab: 'home', push: 'status', hint: 'Linimasa dari diterima sampai selesai. Seret dari tepi kiri layar untuk kembali ke Beranda.', comps: ['timeline', 'alert', 'key-value', 'copy-button', 'nav-stack'] },
  { k: 'layanan', name: 'Layanan', tab: 'layanan', hint: 'Perbarui posisi antrean, batalkan lalu urungkan, atau cek pajak dengan nomor polisi.', comps: ['stat-row', 'rolling-number', 'progress-bar', 'sheet', 'badge', 'toast'] },
  { k: 'info', name: 'Info kota', tab: 'info', hint: 'Ganti antara bus, udara, banjir dan CCTV. Tarik daftar bus ke bawah untuk waktu tiba terbaru.', comps: ['segmented-control', 'gauge', 'meter', 'status-dot', 'sheet'] },
  { k: 'notif', name: 'Pemberitahuan', tab: 'home', push: 'notif', hint: 'Geser pemberitahuan ke kiri. Geser jauh untuk menghapus, lalu urungkan dari toast.', comps: ['swipe-actions', 'count', 'toast', 'empty-state'] },
  { k: 'akun', name: 'Akun', tab: 'akun', hint: 'Tampilkan kode QR kartu warga, atur pemberitahuan, atau hapus riwayat lokasi lalu urungkan.', comps: ['card', 'avatar', 'sheet', 'switch', 'confirm-in-place', 'rating'] },
];
const shotFigure = (s) => `<figure class="mp-shot" id="layar-${s.k}" data-shot="${s.k}" aria-labelledby="cap-${s.k}">
  <div class="mp-shot__stage">${phone(s.k)}</div>
  <figcaption class="mp-shot__cap">
    <h2 class="section__title-sm" id="cap-${s.k}">${esc(s.name)}</h2>
    <p class="section__sub">${esc(s.hint)}</p>
    <p class="mp-shot__comps">${s.comps.map((c) => `<a class="link" href="../components/${c}.html">${COMP[c]}</a>`).join('<span aria-hidden="true"> · </span>')}</p>
  </figcaption>
</figure>`;

/* ==========================================================================
   Behavior, per frame
   ========================================================================== */
const phones = () => $$('.phone[id$="-phone"]');
const pOf = (el) => el.closest('.phone').id.replace(/-phone$/, '');
const say = (root, o) => toast({ ...o, container: root });

function renderAll(...kinds) {
  phones().forEach((ph) => {
    const p = pOf(ph);
    kinds.forEach((k) => $$(`[data-r="${k}"]`, ph).forEach((el) => {
      el.innerHTML = k === 'notifs' ? R.notifs() : R[k](p);
      init(el);
    }));
    syncBell(ph);
  });
}
function syncBell(ph) {
  const n = NOTIFS.filter((x) => x.unread).length;
  const bell = $('[data-bell]', ph);
  if (bell) {
    let c = $('.count', bell);
    if (n && !c) { c = document.createElement('span'); c.className = 'count'; c.setAttribute('aria-hidden', 'true'); bell.appendChild(c); }
    if (c) { if (n) c.textContent = String(n); else c.remove(); }
    bell.setAttribute('aria-label', n ? `Pemberitahuan, ${n} belum dibaca` : 'Pemberitahuan');
  }
  const all = $('[data-act="read-all"]', ph); if (all) all.disabled = !n;
}

function switchTab(ph, t, { fromBar = false } = {}) {
  const a = $('.app', ph);
  if (ph._tab === t) {
    const stack = $(`.app__tab[data-tab="${t}"] .navstack`, a);
    if (fromBar && stack._views && stack._views.length > 1) popToRoot(stack);
    else if (fromBar) (stack._views?.at(-1) || $('.navstack__view', stack)).querySelector('.phone__scroll').scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  ph._tab = t;
  $$('.app__tab', a).forEach((x) => { const on = x.dataset.tab === t; x.hidden = !on; if (on) { x.classList.remove('view-in'); void x.offsetWidth; x.classList.add('view-in'); } });
  $$('.tabbar__item', a).forEach((b) => { if (b.dataset.tab === t) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  haptic('light');
}
function showPane(view, i) {
  const s = $('[data-panes]', view);
  const b = $$('.seg__btn', s)[i];
  if (b && b.getAttribute('aria-pressed') !== 'true') b.click();
}

function wire(ph) {
  const p = pOf(ph);
  const lapor = $(`#${p}-lapor`);

  /* Tab bar, and shortcuts that jump to a tab (and a pane or section in it) */
  $('.tabbar', ph).addEventListener('click', (e) => { const b = e.target.closest('.tabbar__item'); if (b) switchTab(ph, b.dataset.tab, { fromBar: true }); });
  ph.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go-tab]');
    if (go) {
      switchTab(ph, go.dataset.goTab);
      if (go.dataset.pane) showPane($(`#${p}-info`), Number(go.dataset.pane));
      if (go.dataset.scroll) setTimeout(() => {
        const el = $('[data-izin]', ph); const sc = el.closest('.phone__scroll');
        const k = sc.getBoundingClientRect().height / sc.offsetHeight || 1;
        sc.scrollTo({ top: sc.scrollTop + (el.getBoundingClientRect().top - sc.getBoundingClientRect().top) / k - 110, behavior: 'smooth' });
      }, 60);
      return;
    }
    const tax = e.target.closest('[data-open-tax]');
    if (tax) { const s = $('[data-tax-seg]', $(`#${p}-tax`)); const b = $$('.seg__btn', s)[tax.dataset.openTax === 'pbb' ? 1 : 0]; if (b.getAttribute('aria-pressed') !== 'true') b.click(); openLayer(`${p}-tax`, tax); }
  });

  /* Rows that push a detail: fill it first (capture), then the stack slides it in */
  ph.addEventListener('click', (e) => {
    const r = e.target.closest('[data-report][data-lds-nav]');
    if (r) fillStatus(document.getElementById(r.getAttribute('data-lds-nav')), REPORTS.find((x) => x.id === r.dataset.report));
    const n = e.target.closest('[data-news]');
    if (n) {
      const item = NEWS.find((x) => x.id === n.dataset.news);
      $(`#${p}-news [data-news-body]`).innerHTML = `<div class="cluster">${tileIcon(item.icon, item.tile)}<span class="lrow__sub">${esc(item.sub)}</span></div><h2 class="section__title">${esc(item.title)}</h2>${item.body.map((t) => `<p class="mp-prose">${esc(t)}</p>`).join('')}`;
    }
    const c = e.target.closest('[data-cam]');
    if (c) {
      const cam = CAMS[Number(c.dataset.cam)]; const sh = $(`#${p}-cam`);
      $('.sheet__title', sh).textContent = cam.name;
      $('[data-cam-sub]', sh).textContent = cam.sub;
      $('[data-cam-shot]', sh).setAttribute('aria-label', `Tempat cuplikan kamera ${cam.name}`);
      $('[data-cam-note]', sh).textContent = cam.live ? 'Siaran langsung tidak ditampilkan di contoh ini.' : 'Kamera ini sedang diperbaiki. Coba kamera lain di sekitarnya.';
      $('[data-cam-time]', sh).textContent = cam.live ? now() : '12 Nov 2026, 14.10 WIB';
    }
  }, true);

  /* Beranda: refresh the weather */
  $(`#${p}-home`).addEventListener('lds:refresh', (e) => e.detail.wait(wait(900).then(() => {
    clock = Math.min(59, clock + 1);
    $$('[data-wx-time]', ph).forEach((t) => { t.textContent = `diperbarui ${now()}`; });
    say(ph, { title: 'Info cuaca terbaru dimuat', body: 'Peringatan banjir masih berlaku.', icon: 'check_circle' });
  })));

  /* Notifications: swipe to read or delete, Undo from the toast */
  ph.addEventListener('lds:swipe', (e) => {
    const box = e.target.closest('[data-notif]'); if (!box) return;
    const id = Number(box.dataset.notif); const n = NOTIFS.find((x) => x.id === id);
    if (e.detail.action === 'read') { n.unread = false; setTimeout(() => renderAll('notifs'), 300); return; }
    const at = NOTIFS.indexOf(n); NOTIFS.splice(at, 1);
    say(ph, { title: 'Pemberitahuan dihapus', body: n.title, icon: 'delete', action: 'Urungkan', duration: 5000, onAction: () => { NOTIFS.splice(at, 0, n); renderAll('notifs'); return { title: 'Pemberitahuan dikembalikan', icon: 'undo' }; } });
    setTimeout(() => renderAll('notifs'), 420);
  });

  /* Status: rating and the follow switch */
  ph.addEventListener('lds:change', (e) => {
    const stars = e.target.closest('[data-rate]');
    if (stars) { const r = REPORTS.find((x) => x.id === stars.dataset.rate); r.rating = Number(e.detail.value); say(ph, { title: 'Terima kasih, penilaian terkirim', body: `${r.rating} dari 5 bintang untuk ${r.id}.`, icon: 'star' }); }
  });
  ph.addEventListener('change', (e) => {
    const t = e.target;
    if (t.matches('[data-follow]')) say(ph, { title: t.checked ? 'Anda akan dikabari' : 'Kabar laporan ini dimatikan', icon: t.checked ? 'notifications' : 'notifications_off' });
    if (t.matches('[data-toast-on]')) say(ph, { title: t.checked ? t.dataset.toastOn : t.dataset.toastOff, icon: t.checked ? 'notifications' : 'notifications_off' });
    if (t.matches('[data-anon]')) say(ph, { title: t.checked ? 'Nama Anda disembunyikan' : 'Nama Anda ditampilkan', body: t.checked ? 'Petugas tetap bisa menghubungi Anda.' : '', icon: t.checked ? 'visibility_off' : 'visibility' });
  });

  /* Lapor */
  const help = (k) => $(`[data-help="${k}"]`, lapor);
  const HELP = { cat: 'Pilih yang paling dekat dengan masalahnya.', loc: 'Lokasi dari ponsel Anda, bisa diperbarui sebelum dikirim.', desc: 'Paling sedikit 20 huruf: apa yang terjadi dan sejak kapan.' };
  const okHelp = (k) => { const h = help(k); h.classList.remove('field__help--error'); h.textContent = HELP[k]; };
  const badHelp = (k, text) => { const h = help(k); h.classList.add('field__help--error'); h.textContent = text; };
  const desc = $(`#${p}-desc`);
  singleChoice($('[data-cat]', lapor), () => okHelp('cat'));
  desc.addEventListener('input', () => { if (desc.value.trim().length >= 20) { okHelp('desc'); desc.parentElement.classList.remove('is-invalid'); desc.removeAttribute('aria-invalid'); } });
  let located = false;
  const setLoc = (on) => {
    located = on;
    $('[data-loc-title]', lapor).textContent = on ? 'Jl. Melati Raya No. 8' : 'Belum ada lokasi';
    $('[data-loc-sub]', lapor).textContent = on ? 'Kelurahan Sukamaju · tepat sampai 12 m' : 'Petugas perlu titik yang tepat';
    $('[data-act="locate"] .btn__label', lapor).textContent = on ? 'Perbarui' : 'Pakai lokasi saya';
  };
  const resetForm = () => {
    $$('[data-cat] .chip', lapor).forEach((c) => c.setAttribute('aria-pressed', 'false'));
    desc.value = ''; desc.dispatchEvent(new Event('input'));
    $(`#${p}-files`).innerHTML = '';
    setLoc(false); ['cat', 'loc', 'desc'].forEach(okHelp);
  };

  ph.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-act]'); if (!b || b.closest('.confirm')) return;
    const act = b.dataset.act;

    if (act === 'locate') {
      setLoading(b, true); await wait(900); setLoading(b, false);
      setLoc(true); okHelp('loc'); announce('Lokasi terisi: Jl. Melati Raya No. 8, Kelurahan Sukamaju');
    }

    if (act === 'send') {
      const cat = pickedChip($('[data-cat]', lapor));
      const text = desc.value.trim();
      const errs = [];
      if (!cat) { badHelp('cat', 'Pilih kategori agar laporan sampai ke dinas yang tepat.'); shake($('[data-cat]', lapor)); errs.push('kategori'); }
      if (!located) { badHelp('loc', 'Isi lokasi dengan tombol Pakai lokasi saya.'); errs.push('lokasi'); }
      if (text.length < 20) { badHelp('desc', `Tulis ${20 - text.length} huruf lagi: apa yang terjadi dan sejak kapan.`); desc.parentElement.classList.add('is-invalid'); desc.setAttribute('aria-invalid', 'true'); errs.push('keterangan'); }
      if (errs.length) { shake(b); announce(`Laporan belum lengkap: ${errs.join(', ')}.`); return; }
      setLoading(b, true); await wait(1100); setLoading(b, false);
      const k = cat.dataset.k;
      const photos = $$(`#${p}-files .file-row`).length;
      const r = {
        id: `LPR-2611-0${nextReport++}`, cat: k, title: text.length > 64 ? `${text.slice(0, 62).trim()}…` : text,
        place: 'Jl. Melati Raya No. 8, Kelurahan Sukamaju', sent: `16 Nov 2026, ${now()}`, photos, step: 1,
        note: 'Petugas Kelurahan Sukamaju memeriksa laporan Anda paling lambat 1 x 24 jam.',
        steps: [['Diterima', `16 Nov, ${now()}`], ['Diverifikasi petugas kelurahan', 'Paling lambat 17 Nov'], [`Diteruskan ke ${CATS[k][3].replace(' Kota Contoh', '')}`, 'Setelah diverifikasi'], ['Sedang dikerjakan', 'Belum dijadwalkan'], ['Selesai', 'Menunggu pengerjaan']],
      };
      const snap = { k, text, photosHtml: $(`#${p}-files`).innerHTML };
      REPORTS.unshift(r);
      const nId = Date.now();
      NOTIFS.unshift({ id: nId, icon: 'campaign', tile: 'green', title: `${r.id} diterima petugas kelurahan`, sub: `Hari ini, ${now()}`, unread: true });
      renderAll('active', 'mine', 'notifs');
      const view = $(`#${p}-status-lapor`);
      fillStatus(view, r); pushView(view, b);
      resetForm();
      say(ph, {
        title: 'Laporan terkirim', body: `Nomor ${r.id}. Kabar berikutnya muncul di Pemberitahuan.`, icon: 'check_circle', action: 'Batalkan', duration: 6000,
        onAction: () => {
          REPORTS = REPORTS.filter((x) => x !== r); NOTIFS = NOTIFS.filter((x) => x.id !== nId);
          renderAll('active', 'mine', 'notifs');
          popView(view);
          const c = $(`[data-cat] .chip[data-k="${snap.k}"]`, lapor); c && c.setAttribute('aria-pressed', 'true');
          desc.value = snap.text; desc.dispatchEvent(new Event('input'));
          $(`#${p}-files`).innerHTML = snap.photosHtml; setLoc(true);
          return { title: 'Laporan dibatalkan, isinya dikembalikan', icon: 'undo' };
        },
      });
    }

    if (act === 'read-all') {
      NOTIFS.forEach((n) => { n.unread = false; });
      renderAll('notifs');
      say(ph, { title: 'Semua pemberitahuan sudah dibaca', icon: 'check_circle' });
    }

    if (act === 'queue-refresh') {
      setLoading(b, true); await wait(800);
      if (QUEUE.now < QUEUE.no) QUEUE.now += 1;
      phones().forEach((x) => {
        const roll = $('[data-q-now]', x); if (!roll) return;
        setRoll(roll, QUEUE.now);
        const ahead = QUEUE.no - QUEUE.now;
        $('[data-q-ahead]', x).textContent = ahead ? `${ahead} orang lagi` : 'Silakan ke loket';
        $('[data-q-bar]', x).style.transform = `scaleX(${(QUEUE.now / QUEUE.no).toFixed(2)})`;
        $('[data-q-bar]', x).parentElement.setAttribute('aria-valuenow', String(Math.round((QUEUE.now / QUEUE.no) * 100)));
      });
      if (b.isConnected) setLoading(b, false);
      announce(`Sedang dilayani A-0${QUEUE.now}. ${QUEUE.no - QUEUE.now} orang lagi sebelum Anda.`);
    }

    if (act === 'queue-cancel') {
      const was = { ...QUEUE };
      QUEUE = { ...QUEUE, has: false };
      renderAll('queue');
      say(ph, { title: `Antrean A-0${was.no} dibatalkan`, body: `${was.place}, ${was.poli.toLowerCase()}.`, icon: 'event_busy', action: 'Urungkan', duration: 5000, onAction: () => { QUEUE = was; renderAll('queue'); return { title: `Antrean A-0${was.no} dipulihkan`, icon: 'undo' }; } });
    }

    if (act === 'queue-take') {
      const sh = $(`#${p}-queue`);
      setLoading(b, true); await wait(900); setLoading(b, false);
      QUEUE = { has: true, place: chipText(pickedChip($('[data-q-place]', sh))), poli: chipText(pickedChip($('[data-q-poli]', sh))), no: 31, now: 20, eta: '09.40 WIB' };
      closeLayer(sh);
      renderAll('queue');
      say(ph, { title: 'Nomor A-031 untuk Anda', body: `${QUEUE.place}, perkiraan dipanggil ${QUEUE.eta}.`, icon: 'confirmation_number', action: 'Batalkan', duration: 5000, onAction: () => { QUEUE = { ...QUEUE, has: false }; renderAll('queue'); return { title: 'Nomor A-031 dibatalkan', icon: 'undo' }; } });
    }

    if (act === 'tax-check') {
      const sh = $(`#${p}-tax`); const input = $('[data-tax-in]', sh); const h = $('[data-tax-help]', sh); const out = $('[data-tax-out]', sh);
      const pbb = sh.dataset.mode === 'pbb';
      const v = input.value.trim().toUpperCase().replace(/\s+/g, ' ');
      const ok = pbb ? v.replace(/\D/g, '').length === 18 : /^[A-Z]{1,2} ?\d{1,4} ?[A-Z]{0,3}$/.test(v);
      if (!ok) {
        input.parentElement.classList.add('is-invalid'); input.setAttribute('aria-invalid', 'true');
        h.className = 'field__help field__help--error';
        h.textContent = pbb ? (v ? 'Nomor objek pajak terdiri dari 18 angka, lihat di lembar SPPT.' : 'Isi nomor objek pajak dari lembar SPPT.') : (v ? 'Tulis seperti BE 1234 XY: huruf wilayah, angka, lalu huruf akhir.' : 'Isi nomor polisi kendaraan Anda.');
        shake(b); input.focus(); return;
      }
      setLoading(b, true); out.innerHTML = ''; await wait(1000); setLoading(b, false);
      const code = pbb ? '3207 2611 0034 0001' : '3207 2611 1234 0042';
      out.innerHTML = `<div class="stack" style="--gap: 12px;">
        <dl class="kv-list">${pbb
          ? `<div class="kv"><dt>Objek pajak</dt><dd>Jl. Melati Raya No. 8</dd></div><div class="kv"><dt>PBB 2026</dt><dd>Rp 412.500</dd></div><div class="kv"><dt>Status</dt><dd><span class="badge badge--success">Lunas 30 Agu 2026</span></dd></div>`
          : `<div class="kv"><dt>Kendaraan</dt><dd>${esc(v)} · sepeda motor, 2021</dd></div><div class="kv"><dt>Pajak kendaraan</dt><dd>Rp 284.000</dd></div><div class="kv"><dt>SWDKLLJ</dt><dd>Rp 35.000</dd></div><div class="kv"><dt>Total</dt><dd><b>Rp 319.000</b></dd></div><div class="kv"><dt>Jatuh tempo</dt><dd><span class="badge badge--warning">12 Des 2026</span></dd></div>`}
        </dl>
        ${pbb ? '' : `<div class="control" style="padding-right: 6px;"><span class="mp-code">Kode bayar ${code}</span>${copyBtn(code.replace(/ /g, ''))}</div><span class="field__help">Bayar di bank atau gerai yang bekerja sama dengan Badan Pendapatan Daerah Kota Contoh.</span>`}
      </div>`;
      init(out);
    }

    if (act === 'qr-new') {
      setLoading(b, true); await wait(700); setLoading(b, false);
      clock = Math.min(59, clock + 1);
      morphText($('[data-qr-time]', ph), `dibuat ${now()}`);
      say(ph, { title: 'Kode QR baru siap', body: 'Kode lama tidak berlaku lagi.', icon: 'qr_code' });
    }

    if (act === 'signout') say(ph, { title: 'Keluar dimatikan di contoh ini', icon: 'info' });
  });

  /* Tax sheet: the segmented control switches what the field asks for */
  const tax = $(`#${p}-tax`);
  tax.dataset.mode = 'kend';
  const resetTax = () => { const i = $('[data-tax-in]', tax); i.parentElement.classList.remove('is-invalid'); i.removeAttribute('aria-invalid'); const h = $('[data-tax-help]', tax); h.className = 'field__help'; h.textContent = tax.dataset.mode === 'pbb' ? '18 angka, tertulis di lembar SPPT.' : 'Sesuai yang tertulis di STNK.'; };
  $('[data-tax-seg]', tax).addEventListener('lds:change', (e) => {
    const pbb = e.detail.index === 1;
    tax.dataset.mode = pbb ? 'pbb' : 'kend';
    $('[data-tax-label]', tax).textContent = pbb ? 'Nomor objek pajak' : 'Nomor polisi';
    const i = $('[data-tax-in]', tax); i.value = ''; i.placeholder = pbb ? '18.71.040.005.012-0034.0' : 'BE 1234 XY'; i.inputMode = pbb ? 'numeric' : 'text';
    $('[data-tax-out]', tax).innerHTML = ''; resetTax();
  });
  $('[data-tax-in]', tax).addEventListener('input', resetTax);
  $('[data-tax-in]', tax).addEventListener('keydown', (e) => { if (e.key === 'Enter') $('[data-act="tax-check"]', tax).click(); });
  tax.addEventListener('lds:close', () => { $('[data-tax-in]', tax).value = ''; $('[data-tax-out]', tax).innerHTML = ''; resetTax(); });

  /* Queue sheet */
  const qs = $(`#${p}-queue`);
  singleChoice($('[data-q-place]', qs)); singleChoice($('[data-q-poli]', qs));

  /* Info kota: panes, the air gauge drawn on first view, bus times on refresh */
  const info = $(`#${p}-info`);
  $('[data-panes]', info).addEventListener('click', (e) => {
    const b = e.target.closest('.seg__btn'); if (!b) return;
    $$('[data-pane]', info).forEach((x) => { const on = x.dataset.pane === b.dataset.i; x.hidden = !on; if (on) { x.classList.remove('view-in'); void x.offsetWidth; x.classList.add('view-in'); } });
    const air = $('[data-air]', info);
    if (b.dataset.i === '1' && !air.childElementCount) { air.innerHTML = airPane(p); init(air); }
  });
  info.addEventListener('lds:refresh', (e) => e.detail.wait(wait(900).then(() => {
    BUSES.forEach((bus) => { bus.min = Math.max(1, bus.min - 1); });
    clock = Math.min(59, clock + 1);
    phones().forEach((x) => { $$('[data-bus]', x).forEach((r) => setRoll(r, BUSES[Number(r.dataset.bus)].min)); $$('[data-bus-time]', x).forEach((t) => { t.textContent = `diperbarui ${now()}`; }); });
    say(ph, { title: 'Waktu tiba diperbarui', body: `${BUSES[0].line} tiba ${BUSES[0].min} menit lagi.`, icon: 'directions_bus' });
  })));

  /* Akun: clear location history with Undo in place */
  const conf = $('[data-confirm="hist"]', ph);
  conf.addEventListener('lds:confirm', (e) => e.detail.wait(wait(700).then(() => { $('[data-hist]', ph).textContent = 'Tidak ada titik tersimpan'; })));
  conf.addEventListener('lds:undo', () => { $('[data-hist]', ph).textContent = '12 titik tersimpan di ponsel ini'; });
}

/* ==========================================================================
   Page
   ========================================================================== */
const mode = document.documentElement.getAttribute('data-theme') || 'system';
$$('[data-lds-theme]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.ldsTheme === mode)));

$('[data-shots]').innerHTML = SHOTS.map(shotFigure).join('');

/* Frames that start one level deep get their stack set before the behaviors bind, so nothing animates on load */
SHOTS.forEach((s) => {
  const ph = $(`#${s.k}-phone`);
  ph._tab = 'home';
  if (s.tab !== 'home') {
    $$('.app__tab', ph).forEach((x) => { x.hidden = x.dataset.tab !== s.tab; });
    $$('.tabbar__item', ph).forEach((b) => { if (b.dataset.tab === s.tab) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    ph._tab = s.tab;
  }
  if (s.push) {
    const root = $(`#${s.k}-home`), view = $(`#${s.k}-${s.push === 'status' ? 'status-home' : s.push}`);
    if (s.push === 'status') fillStatus(view, REPORTS[0]);
    const stack = root.closest('.navstack');
    stack._views = [root, view];
    view.hidden = false; root.classList.add('is-under'); root.inert = true;
  }
});
init();
phones().forEach((ph) => { wire(ph); syncBell(ph); });

/* Phone-sized windows show one frame at a time, full bleed, picked from the bar */
const small = matchMedia('(max-width: 599px)');
let current = SHOTS[0].k;
const show = (k, { remember = false } = {}) => {
  current = k;
  $$('.mp-shot').forEach((f) => { f.classList.toggle('is-current', f.dataset.shot === k); });
  if (remember) try { history.replaceState(null, '', `#layar-${k}`); } catch (err) { /* file URLs */ }
};
const setMode = () => {
  $$('[data-lds-device]').forEach((d) => { d.classList.toggle('device--bleed', small.matches); fitDevice(d); });
};
small.addEventListener('change', setMode); setMode();
$('[data-shot-pick]').addEventListener('lds:change', (e) => show(e.detail.value, { remember: true }));
$('[data-about]').addEventListener('click', () => openModal($('#mp-about')));
const first = (location.hash || '').replace('#layar-', '');
if (SHOTS.some((s) => s.k === first)) {
  show(first);
  const opt = $(`[data-shot-pick] [data-value="${first}"]`);
  if (opt) { $$('[data-shot-pick] [role="option"]').forEach((o) => o.setAttribute('aria-selected', String(o === opt))); $('[data-shot-pick] .select__value').textContent = opt.textContent.trim(); }
  if (!small.matches) setTimeout(() => document.getElementById(`layar-${first}`)?.scrollIntoView({ block: 'start' }), 0);
} else show(current);
