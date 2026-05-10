/**
 * Starts Expo web dev server, waits until it responds, then launches Electron.
 * Replaces `concurrently` + `wait-on` in npm scripts.
 */
const http = require('http');
const path = require('path');
const { spawn } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const DEV_URL = process.env.EXPO_WEB_WAIT_URL ?? 'http://127.0.0.1:8081';
const WAIT_MS = Number(process.env.EXPO_WEB_WAIT_TIMEOUT_MS ?? 120000);

let electronStarted = false;

function waitForHttpOk(url) {
  const deadline = Date.now() + WAIT_MS;
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      if (Date.now() > deadline) {
        reject(
          new Error(
            `Timed out waiting for dev server (${url}). Is port 8081 free?`,
          ),
        );
        return;
      }
      http
        .get(url, (res) => {
          res.resume();
          resolve();
        })
        .on('error', () => setTimeout(tryOnce, 400));
    };
    tryOnce();
  });
}

const expo = spawn('npx', ['expo', 'start', '--web', '--localhost'], {
  cwd: ROOT_DIR,
  stdio: 'inherit',
  shell: true,
});

expo.on('exit', (code) => {
  if (!electronStarted) {
    process.exit(code ?? 1);
  }
});

function killExpo() {
  if (expo.pid && !expo.killed) {
    expo.kill('SIGTERM');
  }
}

const electronPath = require('electron');

async function main() {
  try {
    await waitForHttpOk(DEV_URL);
  } catch (e) {
    console.error(e.message || e);
    killExpo();
    process.exit(1);
  }

  electronStarted = true;

  const mainCjs = path.join(__dirname, 'main.cjs');
  const child = spawn(electronPath, [mainCjs], {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  });

  child.on('close', (code) => {
    killExpo();
    process.exit(code ?? 0);
  });
}

function stop() {
  killExpo();
  process.exit(1);
}

process.on('SIGINT', stop);
process.on('SIGTERM', stop);

main().catch((err) => {
  console.error(err);
  killExpo();
  process.exit(1);
});
