const {app, BrowserWindow} = require('electron')
  const path = require('path')
  const url = require('url')


  // Mantenha uma referencia global do objeto da janela, se você não fizer isso, a janela será
  // fechada automaticamente quando o objeto JavaScript for coletado.
  let win
  
  function createWindow () {
    // Criar uma janela de navegação.
    win = new BrowserWindow({width: 800, height: 600})
    win.setMenu(null)

    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }
  
    // e carrega index.html do app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, '../html/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  
    // Abre o DevTools.
    win.webContents.openDevTools()
  
    // Emitido quando a janela é fechada.
    win.on('closed', () => {
      // Elimina a referência do objeto da janela, geralmente você iria armazenar as janelas
      // em um array, se seu app suporta várias janelas, este é o momento
      // quando você deve excluir o elemento correspondente.
      win = null
    })
  }
  
  // Este método será chamado quando o Electron tiver finalizado
  // a inicialização e está pronto para criar a janela browser.
  // Algumas APIs podem ser usadas somente depois que este evento ocorre.
  app.on('ready', createWindow)
  
  // Finaliza quando todas as janelas estiverem fechadas.
  app.on('window-all-closed', () => {
    // No macOS é comum para aplicativos e sua barra de menu 
    // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })

  
  function alterarArquivos(callback) {
    var fs = require('fs'), ini = require('ini');
    var config = ini.decode(fs.readFileSync('C:/Users/DEV10/Desktop/server.ini', 'utf-8'));
    var newConfig = {};

    newConfig.IPAPLICACAO = 'srv02'
    newConfig.USUARIO = 'TESTE'
    newConfig.SENHA = 'TESTE'
    newConfig.SERVICO = config.SERVIDOR.SERVICO;
    newConfig.BANCO = config.SERVIDOR.BANCO;
    newConfig.PORTA = config.SERVIDOR.PORTA;

    const writeIniFile = require('write-ini-file')
 
    writeIniFile('C:/Users/DEV10/Desktop/server.ini', newConfig,{section: 'SERVIDOR'}).then(() => {
        console.log('done')
    })
    
   // fs.writeFileSync('C:/Users/DEV10/Desktop/server.ini', ini.stringify(newConfig, { section: 'SERVIDOR' }))
  }
    
  
  // Neste arquivo, você pode incluir o resto do seu aplicativo especifico do processo
  // principal. Você também pode colocar eles em arquivos separados e requeridos-as aqui.