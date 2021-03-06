const { InfluxDB, flux } = require("@influxdata/influxdb-client");
const { url, token, org, bucket } = require("../env");

getTotalWatts = async(duration) => {
  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery = flux`from(bucket:"${bucket}") |> range(start: ${duration}) |> filter(fn: (r) => r._measurement == "modbus") |> filter(fn: (r) => r["name"] == "Energymeter 1" or r["name"] == "Energymeter 2") |> filter(fn: (r) => r["_field"] == "Watts Total") |> aggregateWindow(every: 1h, fn: sum, createEmpty: false)`;
  const wattsJSON = [];

  await queryApi
    .collectRows(fluxQuery)
    .then((datas) => {
      datas.forEach((data) => {
        // console.log('data is', data);
        wattsJSON.push({
          time: data._time,
          measurement: data._measurement,
          name: data.name,
          watts: parseFloat(data._value.toFixed(2)),
          host: data.host,
          field: data._field,
        });
      })
      console.log("\nCollected Watts Rows", wattsJSON.length);
    })
    .catch((error) => {
      console.error(error);
      console.log("\nError in Watts Row");
    });
  return wattsJSON;
};

module.exports = {
    getTotalWatts,
};
