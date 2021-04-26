const { InfluxDB, flux } = require("@influxdata/influxdb-client");
const { url, token, org, bucket } = require("../env");
const { METER_NAME } = require('./constants');

getWattHourReceived = async (duration) => {
  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery = flux`from(bucket:"${bucket}") |> range(start: ${duration}) |> filter(fn: (r) => r._measurement == "modbus") |> filter(fn: (r) => r["_field"] == "Wh Received") |> map(fn: (r) => ({ r with _value: r._value / 1000.0}))  |> aggregateWindow(every: 1y, fn: last, createEmpty: false)`;
  const wattHourJSON = [];

  await queryApi
    .collectRows(fluxQuery)
    .then((datas) => {
      datas.forEach((data) => {
        const meterName = METER_NAME[data.name];
        wattHourJSON.push({
          time: data._time,
          measurement: data._measurement,
          name: meterName,
          consumption: parseFloat(data._value.toFixed(2)),
          host: data.host,
          field: data._field,
        });
      });
      console.log("\nCollected wh received", wattHourJSON.length);
    })
    .catch((error) => {
      console.error(error);
      console.log("\nError in wh received row");
    });
  return wattHourJSON;
};

module.exports = {
    getWattHourReceived,
};
