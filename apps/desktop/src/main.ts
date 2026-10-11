import { app, BrowserWindow, net, protocol } from 'electron';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { trialValue } from '@trial/shared';
import { assetPath } from './assets';
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
    },
  },
]);
void app
  .whenReady()
  .then(async () => {
    const root = resolve(__dirname, '../../web/dist');
    protocol.handle('app', (request) =>
      net.fetch(pathToFileURL(assetPath(request.url, root)).href),
    );
    const window = new BrowserWindow({
      title: trialValue().label,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
    });
    await window.loadURL('app://fixture/');
  })
  .catch((error: unknown) => {
    console.error(error);
    app.exit(1);
  });
app.on('window-all-closed', () => {
  app.quit();
});
