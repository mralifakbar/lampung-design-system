#!/usr/bin/env node
import { main } from '../src/cli.js';

process.stdout.on('error', (err) => {
  if (err.code === 'EPIPE') process.exit(0);
  throw err;
});

main().then(
  (code) => {
    process.exitCode = code;
  },
  (err) => {
    console.error(err?.stack || err);
    process.exitCode = 1;
  },
);
