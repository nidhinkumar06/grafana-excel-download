const { InfluxDB, fluxDuration } = require("@influxdata/influxdb-client");
const { url, token, org, bucket } = require("../env");

getTemperature = async(duration) => {
  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery = `from(bucket:"${bucket}") |> range(start: ${duration}) |> filter(fn: (r) => r._measurement == "temp")`;
  const temparatureJSON = [];

  await queryApi
    .collectRows(fluxQuery)
    .then((datas) => {
      datas.forEach((data) => {
        temparatureJSON.push({
          time: data._time,
          measurement: data._measurement,
          host: data.host,
          sensor: data.sensor,
          field: data._field,
          value: data._value,
        });
      })
      console.log("\nCollected Temperature Rows");
    })
    .catch((error) => {
      console.error(error);
      console.log("\nError in Temperature Rows");
    });
  return temparatureJSON;
};

module.exports = {
  getTemperature,
};
