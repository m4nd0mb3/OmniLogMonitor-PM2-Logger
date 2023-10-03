const pm2 = require('pm2');
const pmx = require('pmx');
const axios = require('axios');

const config = pmx.initModule();

pm2.launchBus((err, bus) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  bus.on('log:out', (log) => {
    // Enviar o log para o seu webhook
    if ( log.process.name !== "OmniLogMonitor-PM2-Logger" ) {
        axios.post(config.webhookUrl, { log })
        .then(response => {
            console.log('Log enviado com sucesso para o webhook');
        })
        .catch(error => {
            console.error('Erro ao enviar log para o webhook:', error);
        });
    }
  });
});
