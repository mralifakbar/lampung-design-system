// Every string the CLI prints, in English and Indonesian. Placeholders are {name}.

const en = {
  help: `lampung-ds {version}: set up Lampung Design System (unofficial) in your project

Usage
  lampung-ds <command> [options]

Commands
  init                 Set up LDS in the current project
  create <name>        Create a new project with the framework's own creator, then run init
  add <component...>   Copy component markup into your project
  list                 List the components in the registry
  doctor               Check that LDS is installed and wired

Options for init
  -t, --template <id>  next, vite, start, react-router, astro, laravel, html, flutter
      --cwd <dir>      Project directory (default: current directory)
  -y, --yes            Accept the defaults, ask nothing
      --theme <mode>   light, dark or system (default: light)
      --pm <name>      npm, pnpm, yarn or bun (default: from the lockfile)
      --no-install     Do not install packages
      --shadcn         Also write the LDS shadcn/ui theme into the global CSS
      --dry-run        Print the plan, change nothing

Options for create
  -t, --template <id>  Required. Same list as init
      --pm <name>      Package manager for the new project
      --dry-run        Print the commands, run nothing

Options for add
      --all            Add every component
      --overwrite      Replace files that already exist
      --dry-run        Print the plan, change nothing

Global options
      --lang <id|en>   Output language (also LDS_LANG or the system locale)
  -h, --help           Show this help
  -v, --version        Show the version

Docs: https://lampung.kartadinata.app/docs/en/guide/cli.html`,
  created: 'created',
  updated: 'updated',
  files: '{count} files',
  detected: 'Framework: {name}{ts}',
  typescript: ' (TypeScript)',
  pickFramework: 'Which framework does this project use?',
  pickHint: 'Use the arrow keys, then Enter',
  pickNumber: 'Type a number and press Enter: ',
  cannotDetect: 'Could not tell which framework this project uses. Pass one with -t (next, vite, start, react-router, astro, laravel, html, flutter).',
  unknownTemplate: 'Unknown template "{name}". Use one of: {list}.',
  unknownTheme: 'Unknown theme "{name}". Use light, dark or system.',
  unknownPm: 'Unknown package manager "{name}". Use npm, pnpm, yarn or bun.',
  unknownCommand: 'Unknown command "{name}". Run lampung-ds --help.',
  noCwd: 'The directory {dir} does not exist.',
  noPackageJson: 'No package.json in {dir}. Create the project first, or use lampung-ds create.',
  dryRun: 'Dry run: nothing was written. This is the plan:',
  nothing: 'Nothing to change. LDS is already set up here.',
  applying: 'Changes:',
  done: 'Done. {count} file(s) changed.',
  installing: 'Installing {pkg} with {pm}...',
  installFailed: 'Install failed: {cmd}. Fix it and run init again; nothing else was changed.',
  commandFailed: 'Command failed: {cmd}',
  installNote: 'install the core package',
  noteCssImport: 'import the LDS stylesheet',
  noteHtmlClass: 'class="lds" and data-theme on <html>',
  noteProvider: 'runs init() and restoreTheme() in the browser',
  noteMountProvider: 'mount LdsProvider',
  noteBehaviors: 'init() and restoreTheme()',
  noteViteDirective: 'load app.css and app.js',
  noteConfig: 'LDS settings for lampung-ds add',
  noteShadcn: 'LDS shadcn/ui theme',
  noteVendor: 'vendored from {from}',
  noteStarter: 'starter page',
  noteFlutterTheme: 'use LdsTheme',
  noteThemeScript: 'set the saved theme before paint',
  noteFlutterPub: 'add the Flutter package',
  manualHtml: 'Could not find the root <html> element. Add class="lds" and data-theme="{theme}" to it yourself.',
  manualCss: 'Could not find a global stylesheet or entry file. Import "lampung-design-system/css" once in your app.',
  manualProvider: 'Could not find where to mount LdsProvider. Render <LdsProvider /> (from {file}) once in your root component.',
  manualFlutter: 'lib/main.dart is not the default template, so it was not changed. Use the LDS theme in your MaterialApp:',
  shadcnMissing: 'The installed package has no dist/shadcn/globals.css; the shadcn theme was skipped.',
  vendorMissing: 'Could not find the LDS files locally or download them ({reason}).',
  downloading: 'Downloading LDS {version} from the CDN...',
  pagesRouter: 'Next.js pages router detected: the stylesheet and LdsProvider go in pages/_app, the html class in pages/_document.',
  nextTranspile: 'To use lampung-design-system/react, add transpilePackages: ["lampung-design-system"] to next.config.',
  astroLayout: 'Astro: wired {file}. Pages that do not use this layout need the same class and script.',
  laravelVite: 'Run your Vite dev server (npm run dev) so Blade picks up the CSS and JS.',
  flutterFonts: 'Fonts: see https://lampung.kartadinata.app/docs/en/guide/cli.html#flutter for Plus Jakarta Sans and the icon fonts.',
  nextSteps: 'Next: lampung-ds add button text-field',
  // create
  createUsage: 'Usage: lampung-ds create <name> -t <template>',
  createExists: 'The directory {dir} already exists and is not empty.',
  createRunning: 'Creating {name} with {cmd}',
  createDry: 'Dry run: these commands would run:',
  createDone: 'Created {name}. Next: cd {name}',
  createFailed: 'The project creator failed. Nothing was set up.',
  // add
  addUsage: 'Usage: lampung-ds add <component...> [--all] [--overwrite]',
  addNoConfig: 'No lds.json here; using defaults for {name}. Run lampung-ds init to set LDS up.',
  addUnknown: 'Unknown component "{name}".',
  addDidYouMean: 'Did you mean: {list}?',
  addExists: 'skipped {file}: already exists (use --overwrite)',
  addFlutter: 'Flutter uses the LdsTheme widgets from the lampung_design_system package; there is no markup to copy.',
  addBinding: '{title} has a React binding in lampung-design-system/react; use it when React owns the state.',
  addNothing: 'Nothing to add: every file already exists.',
  registryFail: 'Could not load the component registry ({reason}). Install lampung-design-system or check your connection.',
  // list
  listHead: '{count} components (lampung-ds add <slug>):',
  // doctor
  doctorHead: 'lampung-ds doctor in {dir}',
  ok: 'ok',
  warn: 'warn',
  fail: 'fail',
  dNode: 'Node.js {version}',
  dNodeOld: 'Node.js {version} is older than 20',
  dFramework: 'Framework: {name}',
  dFrameworkUnknown: 'Framework not detected',
  dConfig: 'lds.json found',
  dConfigMissing: 'No lds.json (run lampung-ds init)',
  dDep: '{pkg} {range} in package.json',
  dDepMissing: '{pkg} is not in package.json',
  dInstalled: '{pkg} {version} installed',
  dInstalledMissing: '{pkg} is not installed (run your package manager install)',
  dVersions: 'CLI {cli}, core {core}',
  dVersionsDiffer: 'CLI {cli} and core {core} differ; keep them on the same version',
  dCss: 'Stylesheet imported in {file}',
  dCssMissing: 'The LDS stylesheet is not imported',
  dHtml: 'class="lds" on <html> in {file}',
  dHtmlMissing: 'class="lds" is missing on the root <html>',
  dBehaviors: 'Behaviors wired in {file}',
  dBehaviorsMissing: 'init() is not called anywhere (behaviors are optional)',
  dFlutterDep: 'lampung_design_system in pubspec.yaml',
  dFlutterDepMissing: 'lampung_design_system is not in pubspec.yaml',
  dFlutterTheme: 'LdsTheme used in lib/main.dart',
  dFlutterThemeMissing: 'LdsTheme is not used in lib/main.dart',
  dSummaryOk: 'Everything looks good.',
  dSummaryFail: '{count} problem(s) found.',
};

const id = {
  help: `lampung-ds {version}: pasang Lampung Design System (tidak resmi) di proyek Anda

Cara pakai
  lampung-ds <perintah> [opsi]

Perintah
  init                 Pasang LDS di proyek ini
  create <nama>        Buat proyek baru dengan pembuat resmi framework, lalu jalankan init
  add <komponen...>    Salin markup komponen ke proyek
  list                 Tampilkan daftar komponen di registry
  doctor               Periksa apakah LDS sudah terpasang dan tersambung

Opsi init
  -t, --template <id>  next, vite, start, react-router, astro, laravel, html, flutter
      --cwd <dir>      Folder proyek (bawaan: folder saat ini)
  -y, --yes            Pakai nilai bawaan, tanpa pertanyaan
      --theme <mode>   light, dark atau system (bawaan: light)
      --pm <nama>      npm, pnpm, yarn atau bun (bawaan: dari lockfile)
      --no-install     Jangan pasang paket
      --shadcn         Tulis juga tema shadcn/ui LDS ke CSS global
      --dry-run        Tampilkan rencana, tanpa mengubah apa pun

Opsi create
  -t, --template <id>  Wajib. Daftar sama dengan init
      --pm <nama>      Package manager untuk proyek baru
      --dry-run        Tampilkan perintah, tanpa menjalankannya

Opsi add
      --all            Tambahkan semua komponen
      --overwrite      Timpa berkas yang sudah ada
      --dry-run        Tampilkan rencana, tanpa mengubah apa pun

Opsi umum
      --lang <id|en>   Bahasa keluaran (juga LDS_LANG atau locale sistem)
  -h, --help           Tampilkan bantuan ini
  -v, --version        Tampilkan versi

Dokumentasi: https://lampung.kartadinata.app/docs/guide/cli.html`,
  created: 'dibuat',
  updated: 'diubah',
  files: '{count} berkas',
  detected: 'Framework: {name}{ts}',
  typescript: ' (TypeScript)',
  pickFramework: 'Framework apa yang dipakai proyek ini?',
  pickHint: 'Pilih dengan tombol panah, lalu Enter',
  pickNumber: 'Ketik nomor lalu tekan Enter: ',
  cannotDetect: 'Framework proyek ini tidak bisa dikenali. Sebutkan dengan -t (next, vite, start, react-router, astro, laravel, html, flutter).',
  unknownTemplate: 'Template "{name}" tidak dikenal. Pakai salah satu: {list}.',
  unknownTheme: 'Tema "{name}" tidak dikenal. Pakai light, dark atau system.',
  unknownPm: 'Package manager "{name}" tidak dikenal. Pakai npm, pnpm, yarn atau bun.',
  unknownCommand: 'Perintah "{name}" tidak dikenal. Jalankan lampung-ds --help.',
  noCwd: 'Folder {dir} tidak ada.',
  noPackageJson: 'Tidak ada package.json di {dir}. Buat proyeknya dulu, atau pakai lampung-ds create.',
  dryRun: 'Uji coba: tidak ada yang ditulis. Ini rencananya:',
  nothing: 'Tidak ada yang perlu diubah. LDS sudah terpasang di sini.',
  applying: 'Perubahan:',
  done: 'Selesai. {count} berkas berubah.',
  installing: 'Memasang {pkg} dengan {pm}...',
  installFailed: 'Pemasangan gagal: {cmd}. Perbaiki lalu jalankan init lagi; tidak ada yang lain diubah.',
  commandFailed: 'Perintah gagal: {cmd}',
  installNote: 'pasang paket inti',
  noteCssImport: 'impor stylesheet LDS',
  noteHtmlClass: 'class="lds" dan data-theme di <html>',
  noteProvider: 'menjalankan init() dan restoreTheme() di browser',
  noteMountProvider: 'pasang LdsProvider',
  noteBehaviors: 'init() dan restoreTheme()',
  noteViteDirective: 'muat app.css dan app.js',
  noteConfig: 'pengaturan LDS untuk lampung-ds add',
  noteShadcn: 'tema shadcn/ui LDS',
  noteVendor: 'disalin dari {from}',
  noteStarter: 'halaman awal',
  noteFlutterTheme: 'pakai LdsTheme',
  noteThemeScript: 'pasang tema tersimpan sebelum halaman tampil',
  noteFlutterPub: 'tambahkan paket Flutter',
  manualHtml: 'Elemen <html> utama tidak ditemukan. Tambahkan sendiri class="lds" dan data-theme="{theme}".',
  manualCss: 'Stylesheet global atau berkas entri tidak ditemukan. Impor "lampung-design-system/css" sekali di aplikasi Anda.',
  manualProvider: 'Tempat memasang LdsProvider tidak ditemukan. Render <LdsProvider /> (dari {file}) sekali di komponen utama.',
  manualFlutter: 'lib/main.dart bukan template bawaan, jadi tidak diubah. Pakai tema LDS di MaterialApp:',
  shadcnMissing: 'Paket yang terpasang tidak punya dist/shadcn/globals.css; tema shadcn dilewati.',
  vendorMissing: 'Berkas LDS tidak ditemukan di komputer dan gagal diunduh ({reason}).',
  downloading: 'Mengunduh LDS {version} dari CDN...',
  pagesRouter: 'Next.js pages router terdeteksi: stylesheet dan LdsProvider di pages/_app, class html di pages/_document.',
  nextTranspile: 'Untuk memakai lampung-design-system/react, tambahkan transpilePackages: ["lampung-design-system"] di next.config.',
  astroLayout: 'Astro: {file} sudah disambungkan. Halaman yang tidak memakai layout ini perlu class dan script yang sama.',
  laravelVite: 'Jalankan server Vite (npm run dev) agar Blade memuat CSS dan JS.',
  flutterFonts: 'Font: lihat https://lampung.kartadinata.app/docs/guide/cli.html#flutter untuk Plus Jakarta Sans dan font ikon.',
  nextSteps: 'Berikutnya: lampung-ds add button text-field',
  createUsage: 'Cara pakai: lampung-ds create <nama> -t <template>',
  createExists: 'Folder {dir} sudah ada dan tidak kosong.',
  createRunning: 'Membuat {name} dengan {cmd}',
  createDry: 'Uji coba: perintah ini yang akan dijalankan:',
  createDone: '{name} sudah dibuat. Berikutnya: cd {name}',
  createFailed: 'Pembuat proyek gagal. Belum ada yang dipasang.',
  addUsage: 'Cara pakai: lampung-ds add <komponen...> [--all] [--overwrite]',
  addNoConfig: 'Tidak ada lds.json di sini; memakai pengaturan bawaan untuk {name}. Jalankan lampung-ds init untuk memasang LDS.',
  addUnknown: 'Komponen "{name}" tidak dikenal.',
  addDidYouMean: 'Mungkin maksud Anda: {list}?',
  addExists: '{file} dilewati: sudah ada (pakai --overwrite)',
  addFlutter: 'Flutter memakai widget LdsTheme dari paket lampung_design_system; tidak ada markup yang perlu disalin.',
  addBinding: '{title} punya binding React di lampung-design-system/react; pakai itu bila React yang memegang state-nya.',
  addNothing: 'Tidak ada yang ditambahkan: semua berkas sudah ada.',
  registryFail: 'Registry komponen gagal dimuat ({reason}). Pasang lampung-design-system atau periksa koneksi Anda.',
  listHead: '{count} komponen (lampung-ds add <slug>):',
  doctorHead: 'lampung-ds doctor di {dir}',
  ok: 'ok',
  warn: 'perhatian',
  fail: 'gagal',
  dNode: 'Node.js {version}',
  dNodeOld: 'Node.js {version} lebih lama dari 20',
  dFramework: 'Framework: {name}',
  dFrameworkUnknown: 'Framework tidak terdeteksi',
  dConfig: 'lds.json ditemukan',
  dConfigMissing: 'Tidak ada lds.json (jalankan lampung-ds init)',
  dDep: '{pkg} {range} di package.json',
  dDepMissing: '{pkg} tidak ada di package.json',
  dInstalled: '{pkg} {version} terpasang',
  dInstalledMissing: '{pkg} belum terpasang (jalankan install package manager Anda)',
  dVersions: 'CLI {cli}, inti {core}',
  dVersionsDiffer: 'Versi CLI {cli} dan inti {core} berbeda; samakan versinya',
  dCss: 'Stylesheet diimpor di {file}',
  dCssMissing: 'Stylesheet LDS belum diimpor',
  dHtml: 'class="lds" di <html> pada {file}',
  dHtmlMissing: 'class="lds" belum ada di <html> utama',
  dBehaviors: 'Perilaku disambungkan di {file}',
  dBehaviorsMissing: 'init() belum dipanggil di mana pun (perilaku bersifat opsional)',
  dFlutterDep: 'lampung_design_system ada di pubspec.yaml',
  dFlutterDepMissing: 'lampung_design_system belum ada di pubspec.yaml',
  dFlutterTheme: 'LdsTheme dipakai di lib/main.dart',
  dFlutterThemeMissing: 'LdsTheme belum dipakai di lib/main.dart',
  dSummaryOk: 'Semua beres.',
  dSummaryFail: '{count} masalah ditemukan.',
};

export const STRINGS = { en, id };

function systemLocale(env) {
  const v = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
  if (v) return v;
  try {
    return Intl.DateTimeFormat().resolvedOptions().locale || '';
  } catch {
    return '';
  }
}

/** --lang wins, then LDS_LANG, then the system locale. Indonesian when it starts with "id". */
export function detectLang(flag, env = process.env) {
  const pick = (v) => (v ? (String(v).toLowerCase().startsWith('id') ? 'id' : 'en') : null);
  return pick(flag) || pick(env.LDS_LANG) || pick(systemLocale(env)) || 'en';
}

export function createT(lang) {
  const table = STRINGS[lang] || en;
  return (key, vars = {}) => {
    const s = table[key] ?? en[key] ?? key;
    return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  };
}
