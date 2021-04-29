const EXCLUDED_METERS = [
  "MainIncoming",
  "Generator",
  "Solar",
  "Tape plant chiller",
  "LG Compressor",
  "IR Compressor",
  "RO Plant",
  "Borewell",
  "Null",
];
const EXCLUDED_METER_CONSUMPTION = [
  "MainIncoming",
  "Generator",
  "Solar",
  "Tape plant chiller",
  "LG Compressor",
  "IR Compressor",
  "RO Plant",
  "Borewell",
  "Null",
];
const EXCEL_FONTSTYLES = { bold: true };
const EXCEL_ALIGNMENTSTYLES = { vertical: "middle", horizontal: "center" };
const MERGE_CELL_HEADERALIGNMENT = { wrapText: true, vertical: "middle", horizontal: "center" };
const EXCEL_HORIZONTALLEFT = { horizontal: "left" };
const EXCEL_HEADING = "Venbro Polymers";
const WORKSHEET_NAMES = ["MeterReadings", "Overall"];

const BORDERS = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
};

const WATTHOURRECEIVED_HEADERS = [
  { header: "S.No", key: "no", width: 10 },
  { header: "MeterName", key: "name", width: 32 },
  { header: "EnergyConsumption(Wh)", key: "consumption", width: 32 },
];

const TITLE_FONT = {
  color: {
    argb: `013466`,
  },
  size: 14,
  bold: true,
};

const SUBTITLE_FONT = {
  size: 10,
};

const METER_NAME = {
  "Energymeter 1": "Lighting",
  "Energymeter 2": "MainIncoming",
  "Energymeter 3": "Generator",
  "Energymeter 4": "Loom 1to8",
  "Energymeter 5": "JP Printing",
  "Energymeter 6": "VP Printing",
  "Energymeter 7": "Loom 9to21",
  "Energymeter 8": "LaminationChiller",
  "Energymeter 9": "Bale",
  "Energymeter 10": "Tape plant main",
  "Energymeter 11": "Tape plant chiller",
  "Energymeter 12": "LG Compressor",
  "Energymeter 13": "IR Compressor",
  "Energymeter 14": "RO Plant",
  "Energymeter 15": "2colorprinting",
  "Energymeter 16": "Stitching",
  "Energymeter 17": "Manual cutting",
  "Energymeter 18": "Gusseting",
  "Energymeter 19": "Tubing",
  "Energymeter 20": "Lamination",
  "Energymeter 21": "Bigbag cutting",
  "Energymeter 22": "BCS 3",
  "Energymeter 23": "BCS 1",
  "Energymeter 24": "BCS 2",
  "Energymeter 25": "Coolingtower",
  "Energymeter 26": "4colorprinting",
  "Energymeter 27": "Godown Main Incoming",
  "Energymeter 28": "Borewell",
  "Energymeter 29": "Solar",
  "Energymeter 30": "CompressorFlow1",
  "Energymeter 31": "CompressorFlow2",
};

module.exports = {
  WATTHOURRECEIVED_HEADERS,
  METER_NAME,
  BORDERS,
  EXCLUDED_METERS,
  EXCLUDED_METER_CONSUMPTION,
  EXCEL_FONTSTYLES,
  EXCEL_ALIGNMENTSTYLES,
  EXCEL_HORIZONTALLEFT,
  EXCEL_HEADING,
  WORKSHEET_NAMES,
  TITLE_FONT,
  SUBTITLE_FONT,
  MERGE_CELL_HEADERALIGNMENT,
};
