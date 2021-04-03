const { InfluxDB, flux } = require("@influxdata/influxdb-client");
const { url, token, org, bucket } = require("../env");

getReactivePower = async (duration) => {
  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery = flux`from(bucket:"${bucket}") |> range(start: ${duration}) |> filter(fn: (r) => r._measurement == "modbus") |> filter(fn: (r) => r["name"] == "Energymeter 1" or r["name"] == "Energymeter 2") |> filter(fn: (r) => r["_field"] == "VA Total") |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)`;
  const reactivePowerJSON = [];

  await queryApi
    .collectRows(fluxQuery)
    .then((datas) => {
      datas.forEach((data) => {
        reactivePowerJSON.push({
          time: data._time,
          measurement: data._measurement,
          name: data.name,
          watts: parseFloat(data._value.toFixed(2)),
          host: data.host,
          field: data._field,
        });
      });
      console.log("\nCollected reactive power rows", reactivePowerJSON.length);
    })
    .catch((error) => {
      console.error(error);
      console.log("\nError in reactive power row");
    });
  return reactivePowerJSON;
};

module.exports = {
  getReactivePower,
};
