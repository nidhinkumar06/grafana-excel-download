const { InfluxDB, flux } = require("@influxdata/influxdb-client");
const { url, token, org, bucket } = require("../env");

getCurrent = async (duration) => {
  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery = flux`from(bucket:"${bucket}") |> range(start: ${duration}) |> filter(fn: (r) => r._measurement == "modbus") |> filter(fn: (r) => r["name"] == "Energymeter 1" or r["name"] == "Energymeter 2") |> filter(fn: (r) => r["_field"] == "Current Total") |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)`;
  const currentJSON = [];

  await queryApi
    .collectRows(fluxQuery)
    .then((datas) => {
      datas.forEach((data) => {
        currentJSON.push({
          time: data._time,
          measurement: data._measurement,
          name: data.name,
          watts: parseFloat(data._value.toFixed(2)),
          host: data.host,
          field: data._field,
        });
      });
      console.log("\nCollected Current Rows", currentJSON.length);
    })
    .catch((error) => {
      console.error(error);
      console.log("\nError in current Row");
    });
  return currentJSON;
};

module.exports = {
  getCurrent,
};
