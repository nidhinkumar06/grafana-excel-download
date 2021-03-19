const TEMPERATURE_HEADERS = [
    { header: "Time", key: "time", width: 40 },
    { header: "Measurement", key: "measurement", width: 32 },
    { header: "Host", key: "host", width: 32 },
    { header: "Sensor", key: "sensor", width: 32 },
    { header: "Field", key: "field", width: 32 },
    { header: "Value", key: "value", width: 10 },
];

const WATTS_HEADERS = [
    { header: 'Time', key: 'time', width: 40 },
    { header: 'Measurement', key: 'measurement', width: 32 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'Watts', key: 'watts', width: 32 },
    { header: 'Host', key: 'host', width: 32 },
    { header: 'Field', key: 'field', width: 32 },
];

const CURRENT_HEADERS = [
    { header: 'Time', key: 'time', width: 40 },
    { header: 'Measurement', key: 'measurement', width: 32 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'Current', key: 'watts', width: 32 },
    { header: 'Host', key: 'host', width: 32 },
    { header: 'Field', key: 'field', width: 32 },
];

const REACTIVEPOWER_HEADERS = [
    { header: 'Time', key: 'time', width: 40 },
    { header: 'Measurement', key: 'measurement', width: 32 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'ReactivePower', key: 'watts', width: 32 },
    { header: 'Host', key: 'host', width: 32 },
    { header: 'Field', key: 'field', width: 32 },
];

module.exports = {
    TEMPERATURE_HEADERS,
    WATTS_HEADERS,
    CURRENT_HEADERS,
    REACTIVEPOWER_HEADERS
}