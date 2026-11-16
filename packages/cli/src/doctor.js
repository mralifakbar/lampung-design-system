import { join, resolve } from 'node:path';
import { detectFramework, LABELS } from './detect.js';
import { ADAPTERS } from './frameworks.js';
import { findTag } from './edit.js';
import { CORE, VERSION, readJson, readText, allDeps, findPackageDir, firstExisting, c } from './util.js';
import { loadIndex } from './registry.js';

const hasLdsClass = (src, jsx) => {
  for (const tag of ['html', 'Html']) {
    const m = findTag(src, tag, { jsx });
    if (m && /(class|className)\s*=\s*\{?[`'"]?[^>]*\blds\b/.test(m.attrs)) return true;
  }
  return false;
};

/** Runs the checks. Returns { checks: [{ level, text }], problems }. */
export async function doctor(opts, io) {
  const { t } = io;
  const cwd = resolve(opts.cwd || '.');
  const checks = [];
  const add = (level, text) => checks.push({ level, text });
  io.log(c.bold(t('doctorHead', { dir: cwd })));

  const major = Number(process.versions.node.split('.')[0]);
  add(major >= 20 ? 'ok' : 'fail', t(major >= 20 ? 'dNode' : 'dNodeOld', { version: process.versions.node }));

  const config = readJson(join(cwd, 'lds.json'));
  add(config ? 'ok' : 'warn', t(config ? 'dConfig' : 'dConfigMissing'));
  const fw = config?.framework || detectFramework(cwd);
  add(fw ? 'ok' : 'fail', fw ? t('dFramework', { name: LABELS[fw] || fw }) : t('dFrameworkUnknown'));

  if (fw === 'flutter') {
    const pub = readText(join(cwd, 'pubspec.yaml')) || '';
    const dep = /^\s+lampung_design_system\s*:/m.test(pub);
    add(dep ? 'ok' : 'fail', t(dep ? 'dFlutterDep' : 'dFlutterDepMissing'));
    const main = readText(join(cwd, 'lib/main.dart')) || '';
    add(main.includes('LdsTheme.') ? 'ok' : 'warn', t(main.includes('LdsTheme.') ? 'dFlutterTheme' : 'dFlutterThemeMissing'));
  } else if (fw) {
    let coreVersion = null;
    if (fw !== 'html') {
      const pkg = readJson(join(cwd, 'package.json'));
      const range = allDeps(pkg)[CORE];
      add(range ? 'ok' : 'fail', range ? t('dDep', { pkg: CORE, range }) : t('dDepMissing', { pkg: CORE }));
      const dir = findPackageDir(cwd, io.env);
      coreVersion = dir ? readJson(join(dir, 'package.json'))?.version : null;
      add(coreVersion ? 'ok' : 'fail', coreVersion ? t('dInstalled', { pkg: CORE, version: coreVersion }) : t('dInstalledMissing', { pkg: CORE }));
    } else {
      coreVersion = readText(join(cwd, 'lds/VERSION'))?.trim() || null;
    }
    if (coreVersion) {
      const same = coreVersion.split('.').slice(0, 2).join('.') === VERSION.split('.').slice(0, 2).join('.');
      add(same ? 'ok' : 'warn', t(same ? 'dVersions' : 'dVersionsDiffer', { cli: VERSION, core: coreVersion }));
    }

    const loc = ADAPTERS[fw].locate(cwd);
    const cssFiles = [config?.css, loc.css, loc.layout, loc.html, 'src/main.tsx', 'src/main.jsx', 'src/main.ts', 'src/main.js', 'index.html'].filter(Boolean);
    const cssHit = cssFiles.find((f) => {
      const s = readText(join(cwd, f)) || '';
      return s.includes(`${CORE}/css`) || s.includes('lds/css/lds.css') || (fw === 'html' && f === 'lds/css/lds.css' && s.length > 0);
    });
    add(cssHit ? 'ok' : 'fail', cssHit ? t('dCss', { file: cssHit }) : t('dCssMissing'));

    const htmlFile = loc.html || firstExisting(cwd, ['index.html']);
    const htmlSrc = htmlFile ? readText(join(cwd, htmlFile)) || '' : '';
    const htmlOk = htmlFile && hasLdsClass(htmlSrc, /\.[jt]sx?$/.test(htmlFile));
    add(htmlOk ? 'ok' : 'fail', htmlOk ? t('dHtml', { file: htmlFile }) : t('dHtmlMissing'));

    const behaviorFiles = [loc.layout, loc.js, loc.html, 'index.html'].filter(Boolean);
    const behavior = behaviorFiles.find((f) => /\binit\(\)|<LdsProvider/.test(readText(join(cwd, f)) || ''));
    add(behavior ? 'ok' : 'warn', behavior ? t('dBehaviors', { file: behavior }) : t('dBehaviorsMissing'));
  }

  if (opts.registry) {
    try {
      const idx = await loadIndex(cwd, io.env);
      add('ok', `registry: ${idx.count} components`);
    } catch (e) {
      add('warn', `registry: ${e.message}`);
    }
  }

  const mark = { ok: c.green('ok  '), warn: c.yellow(t('warn').padEnd(4)), fail: c.red(t('fail').padEnd(4)) };
  for (const ch of checks) io.log(`  ${mark[ch.level]} ${ch.text}`);
  const problems = checks.filter((ch) => ch.level === 'fail').length;
  io.log(problems ? c.red(t('dSummaryFail', { count: problems })) : c.green(t('dSummaryOk')));
  return { checks, problems };
}

