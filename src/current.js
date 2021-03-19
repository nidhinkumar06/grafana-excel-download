const { InfluxDB } = require("@influxdata/influxdb-client");
const { url, token, org, bucket } = require("../env");

getCurrent = async (duration) => {
  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery = `from(bucket:"${bucket}") |> range(start: ${duration}) |> filter(fn: (r) => r._measurement == "modbus") |> filter(fn: (r) => r["name"] == "Energymeter 1" or r["name"] == "Energymeter 2") |> filter(fn: (r) => r["_field"] == "Current Total")`;
  const currentJSON = [];

  await queryApi
    .collectRows(fluxQuery)
    .then((datas) => {
      datas.forEach((data) => {
        currentJSON.push({
          time: data._time,
          measurement: data._measurement,
          name: data.name,
          watts: data._value,
          host: data.host,
          field: data._field,
        });
      });
      console.log("\nCollected Current Rows");
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
