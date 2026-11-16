# Berkontribusi / Contributing

Terima kasih ingin membantu Lampung Design System. *Thank you for helping. English below.*

## Bahasa Indonesia

1. **Laporkan atau usulkan** lewat [GitHub Issues](https://github.com/mralifakbar/lampung-design-system/issues): bug, komponen baru, perbaikan terjemahan, atau ejaan aksara Lampung.
2. **Siapkan lingkungan:** Node.js 20+, Python 3. `npm install`, `npm run build`, `npm test`, `npm run serve` (http://localhost:5173).
3. **Baca `AGENTS.md`.** Itu aturan repositori ini, untuk manusia maupun agen AI.
4. **Commit kecil dengan Conventional Commits.** Satu perubahan logis per commit, misalnya `feat(css): add masthead`, `docs(i18n): translate toast spec`, `fix(cli): detect astro config`. Subjek huruf kecil, kalimat perintah, tanpa titik, maksimal 72 karakter. Jalankan `npm run lint:commits` sebelum membuka pull request.
5. **Komponen baru** butuh CSS (token saja), spesifikasi Inggris di `docs/spec/<slug>.mjs` dan terjemahannya di `docs/spec/id/<slug>.mjs`, lalu `npm run build:docs`.
6. **Pull request** kecil dan fokus, dengan tangkapan layar mode terang dan gelap untuk perubahan tampilan.

## English

1. **Report or propose** through [GitHub Issues](https://github.com/mralifakbar/lampung-design-system/issues): bugs, new components, translation fixes, or aksara Lampung spellings.
2. **Set up:** Node.js 20+, Python 3. `npm install`, `npm run build`, `npm test`, `npm run serve` (http://localhost:5173).
3. **Read `AGENTS.md`.** It is the rule book of this repository, for people and AI agents alike.
4. **Small commits with Conventional Commits.** One logical change per commit, for example `feat(css): add masthead`, `docs(i18n): translate toast spec`, `fix(cli): detect astro config`. Lowercase imperative subject, no trailing period, 72 characters at most. Run `npm run lint:commits` before opening a pull request.
5. **New components** need CSS (tokens only), an English spec in `docs/spec/<slug>.mjs` and its Indonesian override in `docs/spec/id/<slug>.mjs`, then `npm run build:docs`.
6. **Pull requests** small and focused, with light and dark screenshots for visual changes.

Partnerships: alif@kartadinata.app. By contributing you agree that your work is released under the MIT License and you follow the [code of conduct](CODE_OF_CONDUCT.md).
