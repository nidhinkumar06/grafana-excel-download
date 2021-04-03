const express = require('express');
const { fluxDuration } = require("@influxdata/influxdb-client");
const { TEMPERATURE_HEADERS, WATTS_HEADERS, CURRENT_HEADERS, REACTIVEPOWER_HEADERS } = require('./src/constants');
const { getTemperature } = require('./src/temperature');
const { getTotalWatts } = require('./src/totalWatts');
const { getCurrent } = require('./src/current');
const { getReactivePower } = require('./src/reactivePower');
const { generateWorkBook } = require('./src/generateWorkBook');

const app = express();

const helloWorld = async(req, res) => {
  console.log('req body', JSON.stringify(req.body));
  console.log('req.query', req.query);
  let message = req.query?.message || req.body?.message || 'Hello World!';
  const selectedDuration = req.query.from.split('-')[1];
  const duration = fluxDuration(`-${selectedDuration}`)

  const temperatureData = await getTemperature(duration);
  const wattsTotal = await getTotalWatts(duration);
  const currentTotal = await getCurrent(duration);
  const reactivePowerTotal = await getReactivePower(duration);

  const workBookDatas = [
    { sheet_name: 'Temperature', sheet_data: temperatureData, column_name: TEMPERATURE_HEADERS },
    { sheet_name: 'WattsTotal', sheet_data: wattsTotal, column_name: WATTS_HEADERS },
    { sheet_name: 'CurrentTotal', sheet_data: currentTotal, column_name: CURRENT_HEADERS },
    { sheet_name: 'ReactivePower', sheet_data: reactivePowerTotal, column_name: REACTIVEPOWER_HEADERS }
  ];

  generateWorkBook(res, workBookDatas);
  console.log('temp is', temperatureData.length);
};

app.get('/excelreport', helloWorld);

app.listen(3333);