const express = require('express');
const moment = require('moment');
const momentGrafana = require('moment-relativism');
const { fluxDuration } = require("@influxdata/influxdb-client");
const { WATTHOURRECEIVED_HEADERS } = require('./src/constants');
const { getWattHourReceived } = require('./src/wattHour');
const { generateWorkBook } = require('./src/generateWorkBook');

const app = express();

const helloWorld = async(req, res) => {
  console.log('req body', JSON.stringify(req.body));
  console.log('req.query', req.query);
  let message = req.query?.message || req.body?.message || 'Hello World!';
  let startDuration;
  let endDuration;
  let fromDate;
  let toDate;

  if (req.query.from.includes('now')) {
    const from = req.query.from;
    const start = momentGrafana.relativism(from.replace('/', '|'));
    const end = momentGrafana.relativism(req.query.to);
    
    startDuration = moment.utc(start).unix();
    endDuration = moment.utc(end).unix();
      
    fromDate = moment(start).format('YYYY-MM-DDTHH:mm:ss');
    toDate = moment(end).format('YYYY-MM-DDTHH:mm:ss');
  } else {
    startDuration = moment.utc(parseInt(req.query.from)).unix();
    endDuration = moment.utc(parseInt(req.query.to)).unix();
    fromDate = parseInt(req.query.from);
    toDate = parseInt(req.query.to);
  }
  
  const whReceived = await getWattHourReceived(startDuration, endDuration);

  const workBookDatas = [
    { sheet_name: 'Wh Received', sheet_data: whReceived, column_name: WATTHOURRECEIVED_HEADERS, from: fromDate, to: toDate }
  ];

  generateWorkBook(res, workBookDatas);
};

app.get('/excelreport', helloWorld);

app.listen(3333);