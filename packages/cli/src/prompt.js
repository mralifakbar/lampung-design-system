import { createInterface, emitKeypressEvents } from 'node:readline';
import { c } from './util.js';

/**
 * Arrow-key select list on a TTY; a numbered question otherwise.
 * choices: [{ value, label, hint? }]. Resolves to the chosen value, or null when cancelled.
 */
export async function select(message, choices, { hint = '', numberPrompt = '> ', input = process.stdin, output = process.stdout } = {}) {
  if (!input.isTTY || typeof input.setRawMode !== 'function') {
    output.write(`${message}\n`);
    choices.forEach((ch, i) => output.write(`  ${i + 1}. ${ch.label}${ch.hint ? ` (${ch.hint})` : ''}\n`));
    const rl = createInterface({ input, output });
    const answer = await new Promise((res) => {
      rl.question(numberPrompt, res);
      rl.on('close', () => res(''));
    });
    rl.close();
    if (!input.isTTY) output.write('\n');
    const n = Number.parseInt(String(answer).trim(), 10);
    const byName = choices.find((ch) => ch.value === String(answer).trim());
    return byName ? byName.value : choices[n - 1]?.value ?? null;
  }
  return new Promise((resolve) => {
    let index = 0;
    let drawn = 0;
    const draw = () => {
      if (drawn) output.write(`\x1b[${drawn}A\x1b[J`);
      const lines = [`${c.bold(message)} ${c.dim(hint)}`];
      choices.forEach((ch, i) => lines.push(i === index ? c.cyan(`> ${ch.label}`) : `  ${ch.label}`));
      output.write(`${lines.join('\n')}\n`);
      drawn = lines.length;
    };
    emitKeypressEvents(input);
    input.setRawMode(true);
    input.resume();
    output.write('\x1b[?25l');
    const done = (value) => {
      input.off('keypress', onKey);
      input.setRawMode(false);
      input.pause();
      output.write('\x1b[?25h');
      resolve(value);
    };
    const onKey = (_s, key = {}) => {
      if (key.ctrl && key.name === 'c') return done(null);
      if (key.name === 'escape') return done(null);
      if (key.name === 'up' || key.name === 'k') index = (index - 1 + choices.length) % choices.length;
      else if (key.name === 'down' || key.name === 'j' || key.name === 'tab') index = (index + 1) % choices.length;
      else if (key.name === 'return' || key.name === 'enter') return done(choices[index].value);
      else return;
      draw();
    };
    input.on('keypress', onKey);
    draw();
  });
}
