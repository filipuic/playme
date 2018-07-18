const { app, BrowserWindow, Menu, webContents, globalShortcut } = require('electron');
const path = require('path');
let mainWindow;
let webviewId;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden-inset',
    frame: true,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  });
  mainWindow.loadURL('https://music.youtube.com');
  //mainWindow.openDevTools({ mode: 'bottom' });

  registerGlobalShortcuts();

  createMenu();
});

function registerGlobalShortcuts() {
	globalShortcut.register('MediaPlayPause', () => {
      playPause();
    });

    globalShortcut.register('MediaNextTrack', () => {
      next();
    });

    globalShortcut.register('MediaPreviousTrack', () => {
      previous();
    });
}

function playPause() {
	mainWindow.webContents.executeJavaScript(`document.getElementsByClassName('play-pause-button')[0].click()`);
}

function next() {
	mainWindow.webContents.executeJavaScript(`document.getElementsByClassName('next-button')[0].click()`)
}

function previous() {
	mainWindow.webContents.executeJavaScript(`document.getElementsByClassName('previous-button')[0].click()`)
}

function createMenu() {
  const topLevelItems = [
    {
      label: 'Application',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Actions',
      submenu: [
        {
          label: 'play/Pause',
          accelerator: 'Space',
          click() {
          	 playPause();
          }
        },
        {
          label: 'Next',
          accelerator: 'shift+N',
          click() {
          	 next();
          }
        },
        {
          label: 'Previous',
          accelerator: 'shift+P',
          click() {
          	 previous();
          }
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(topLevelItems));
}
