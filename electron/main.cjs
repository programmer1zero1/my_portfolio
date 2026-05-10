const path = require('path');
const http = require('http');

const ROOT_DIR = path.join(__dirname, '..');
require('dotenv').config({ path: path.join(ROOT_DIR, '.env') });
require('dotenv').config({ path: path.join(ROOT_DIR, '.env.local'), override: true });

const express = require('express');
const { app, BrowserWindow } = require('electron');

const DEV_SERVER_URL =
  process.env.EXPO_WEB_URL ?? 'http://localhost:8081';

const DIST_DIR = path.resolve(path.join(ROOT_DIR, 'dist'));

/** Set ELECTRON_LOAD_STATIC=1 to open `dist/` via a local server (required — file:// breaks `/asset` URLs). */
const LOAD_STATIC_BUILD =
  process.env.ELECTRON_LOAD_STATIC === '1' || app.isPackaged;

/** Set ELECTRON_OPEN_DEVTOOLS=0 to suppress DevTools while using the dev server. */
function shouldOpenDevTools() {
  if (LOAD_STATIC_BUILD) {
    return false;
  }
  const flag = process.env.ELECTRON_OPEN_DEVTOOLS ?? '1';
  return flag === '1' || flag.toLowerCase() === 'true';
}

let staticServer = null;
let lastStartUrl = DEV_SERVER_URL;

/**
 * Expo's static export uses root-absolute URLs (`/_expo/...`, `/assets/...`).
 * `loadFile()` => `file://` so `/...` resolves to the drive root and scripts never load (blank window).
 * Serve `dist/` on HTTP instead.
 *
 * Reload / force-reload issues a real HTTP GET for the current path (e.g. `/appFlow/home`).
 * With `serve-handler` + `cleanUrls: false`, extensionless URLs did not map to `.html` export
 * files → 404. We use `express.static` with `extensions: ['html']` plus an SPA fallback so
 * dynamic routes (and any missed static path) still bootstrap from `index.html`.
 */
function startDistServer() {
  return new Promise((resolve, reject) => {
    const web = express();
    web.use(
      express.static(DIST_DIR, {
        extensions: ['html'],
        index: 'index.html',
        fallthrough: true,
      }),
    );
    function spaFallback(req, res) {
      const p = req.path;
      if (p.startsWith('/_expo') || p.startsWith('/assets')) {
        res.status(404).send('Not Found');
        return;
      }
      res.sendFile(path.join(DIST_DIR, 'index.html'));
    }
    web.get('*', spaFallback);
    web.head('*', spaFallback);

    const server = http.createServer(web);

    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.removeListener('error', reject);
      const { port } = server.address();
      staticServer = server;
      resolve(`http://127.0.0.1:${port}/`);
    });
  });
}

function createMainWindow(startUrl) {
  const window = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'MyPortfolio',
    backgroundColor: '#0f1117',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      spellcheck: true,
    },
  });

  window.webContents.on(
    'did-fail-load',
    (_event, errorCode, errorDescription, validatedURL) => {
      console.error(
        '[electron] did-fail-load',
        { errorCode, errorDescription, validatedURL },
      );
    },
  );

  window.loadURL(startUrl).catch((err) => {
    console.error('[electron] loadURL failed:', err);
  });

  if (!LOAD_STATIC_BUILD && shouldOpenDevTools()) {
    window.webContents.openDevTools({ mode: 'detach' });
  }
  return window;
}

app.whenReady().then(async () => {
  try {
    lastStartUrl = LOAD_STATIC_BUILD
      ? await startDistServer()
      : DEV_SERVER_URL;
  } catch (e) {
    console.error(
      '[electron] Could not start static file server — is dist/ present? Run: npx expo export --platform web',
      e,
    );
    app.quit();
    return;
  }

  createMainWindow(lastStartUrl);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow(lastStartUrl);
    }
  });
});

app.on('before-quit', () => {
  if (staticServer) {
    staticServer.close();
    staticServer = null;
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
