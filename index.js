const express = require('express');
const moment = require('moment');
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

  if (req.query.from.includes('now')) {
    const selectedDuration = req.query.from.split('-')[1];
    startDuration = fluxDuration(`-${selectedDuration}`);
    endDuration = fluxDuration(`-1ns`);
  } else {
    startDuration = moment.utc(parseInt(req.query.from)).unix();
    endDuration = moment.utc(parseInt(req.query.to)).unix();
  }
  
  const whReceived = await getWattHourReceived(startDuration, endDuration);

  const workBookDatas = [
    { sheet_name: 'Wh Received', sheet_data: whReceived, column_name: WATTHOURRECEIVED_HEADERS }
  ];

  generateWorkBook(res, workBookDatas);
};

app.get('/excelreport', helloWorld);

app.listen(3333);