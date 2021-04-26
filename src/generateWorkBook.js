const Excel = require('exceljs');
const { METER_NAME, BORDERS, EXCLUDED_METERS, EXCLUDED_METER_CONSUMPTION, EXCEL_FONTSTYLES, EXCEL_HORIZONTALLEFT, EXCEL_HEADING, EXCEL_ALIGNMENTSTYLES, WORKSHEET_NAMES } = require('./constants');

generateWorkBook = (res, workBookDatas) => {
  var workbook = new Excel.Workbook();

  /** Meter Reading Sheet */

  var meterSheet = workbook.addWorksheet(WORKSHEET_NAMES[0]);

  //Main Header
  meterSheet.mergeCells("A1:C3");
  const meterCell = meterSheet.getCell("A2");

  meterCell.font = EXCEL_FONTSTYLES;
  meterCell.alignment = EXCEL_ALIGNMENTSTYLES;
  meterCell.value = EXCEL_HEADING;
  meterCell.border = BORDERS;

  //OtherReadings
  var meterHeadingRow = meterSheet.addRow();
  var meterColumns = workBookDatas[0].column_name;
  var meterDatas = workBookDatas[0].sheet_data;

  meterSheet.getRow(4).font = EXCEL_FONTSTYLES;

  //setting header
  for (let i = 0; i < meterColumns.length; i++) {
    let currentColumnWidth = meterColumns[i].width;
    meterSheet.getColumn(i + 1).width = currentColumnWidth;
    let cell = meterHeadingRow.getCell(i + 1);
    cell.value = meterColumns[i].header;
    cell.border = BORDERS;
  }

  //adding rowvalues
  for (let i = 0; i < meterDatas.length; i++) {
    var meterRow = meterSheet.addRow();
    for (let j = 0; j < 3; j++) {
      meterRow.getCell(1).value = i + 1;
      meterRow.getCell(2).value = meterDatas[i].name;
      meterRow.getCell(3).value = meterDatas[i].consumption;

      meterRow.getCell(1).alignment = EXCEL_HORIZONTALLEFT;
      meterRow.getCell(1).border = BORDERS;
      meterRow.getCell(2).border = BORDERS;
      meterRow.getCell(3).border = BORDERS;
    }
  }


  /** Overall Excel Sheet */

  var worksheet = workbook.addWorksheet(WORKSHEET_NAMES[1]);
  var serialNumber = 0;

  // Main Header

  worksheet.mergeCells("A1:C3");
  const customCell = worksheet.getCell("A2");

  customCell.font = EXCEL_FONTSTYLES;
  customCell.alignment = EXCEL_ALIGNMENTSTYLES;
  customCell.value = EXCEL_HEADING;
  customCell.border = BORDERS;


  //Main Incoming Data
  worksheet.mergeCells("A4:B4");
  const mainIncomingCell = worksheet.getCell("A4");
  mainIncomingCell.alignment = EXCEL_ALIGNMENTSTYLES;
  mainIncomingCell.value = METER_NAME['Energymeter 2'];
  
  const mainIncomingValue = worksheet.getCell("C4");
  mainIncomingValue.value = workBookDatas[0].sheet_data[1].consumption || 0.00;
  
  mainIncomingCell.font = EXCEL_FONTSTYLES;
  mainIncomingValue.font = EXCEL_FONTSTYLES;
  mainIncomingCell.border = BORDERS;
  mainIncomingValue.border = BORDERS;

  //Generator Data
  worksheet.mergeCells("A5:B5");
  const generatorCell = worksheet.getCell("A5");
  generatorCell.alignment = EXCEL_ALIGNMENTSTYLES;
  generatorCell.value = METER_NAME['Energymeter 3'];
  generatorCell.font = EXCEL_FONTSTYLES;
 
  const generatorValue = worksheet.getCell("C5");
  generatorValue.value = workBookDatas[0].sheet_data[1].consumption || 0.00; //it should be 2
 
  generatorValue.font = EXCEL_FONTSTYLES;
  generatorCell.border = BORDERS;
  generatorValue.border = BORDERS;

  //Solar Data
  worksheet.mergeCells("A6:B6");
  const solarCell = worksheet.getCell("A6");
  solarCell.alignment = EXCEL_ALIGNMENTSTYLES;
  solarCell.value = METER_NAME['Energymeter 29'];
  
  const solarValue = worksheet.getCell("C6");
  solarValue.value = workBookDatas[0].sheet_data[1].consumption || 0.00; //it should be 28
  
  solarCell.font = EXCEL_FONTSTYLES;
  solarValue.font = EXCEL_FONTSTYLES;
  solarCell.border = BORDERS;
  solarValue.border = BORDERS;

  //OtherReadings
  var headerRow = worksheet.addRow();
  var columns = workBookDatas[0].column_name;
  var allItems = workBookDatas[0].sheet_data;
  worksheet.getRow(7).font = EXCEL_FONTSTYLES;

  //setting header
  for (let i = 0; i < columns.length; i++) {
    let currentColumnWidth = columns[i].width;
    worksheet.getColumn(i + 1).width = currentColumnWidth;
    let cell = headerRow.getCell(i + 1);
    cell.value = columns[i].header;
    cell.border = BORDERS;
  }

  //adding rowvalues
  for (let i = 0; i < allItems.length; i++) {
    if (!EXCLUDED_METERS.includes(allItems[i].name)) {
      var dataRow = worksheet.addRow();
      serialNumber = serialNumber + 1;
      for (let j = 0; j < 3; j++) {
        dataRow.getCell(1).value = serialNumber;
        dataRow.getCell(2).value = allItems[i].name;
        dataRow.getCell(3).value = allItems[i].consumption;

        dataRow.getCell(1).alignment = EXCEL_HORIZONTALLEFT;
        dataRow.getCell(1).border = BORDERS;
        dataRow.getCell(2).border = BORDERS;
        dataRow.getCell(3).border = BORDERS;
      }
    }
  }

  //setting footer
  const rowCount = worksheet.rowCount;
  const footerTextCell = `A${rowCount + 1}:B${rowCount + 2}`;
  const footerTextValue = `C${rowCount + 1}:C${rowCount + 2}`;
  var overallConsumption = 0;
  for (let i = 0; i < allItems.length; i++) {
    if (!EXCLUDED_METER_CONSUMPTION.includes(allItems[i].name)) {
      overallConsumption += allItems[i].consumption;
    }
  }


  worksheet.mergeCells(footerTextCell);
  worksheet.getRow(1).font = EXCEL_FONTSTYLES;
  worksheet.getCell(`A${rowCount + 1}`).alignment = EXCEL_ALIGNMENTSTYLES;
  worksheet.getCell(`A${rowCount + 1}`).value = "Overall Consumption";
  worksheet.getCell(`A${rowCount + 1}`).font = EXCEL_FONTSTYLES;
  worksheet.mergeCells(footerTextValue);
  worksheet.getCell(`C${rowCount + 1}`).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell(`C${rowCount + 1}`).value = overallConsumption;
  worksheet.getCell(`C${rowCount + 1}`).font = EXCEL_FONTSTYLES;
  worksheet.getCell(footerTextCell).border = BORDERS;
  worksheet.getCell(`C${rowCount + 1}`).border = BORDERS;

  /** Creating workbook */

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=' + `Energymeter-${Date.now()}.xlsx`
  );

  return workbook.xlsx.write(res).then(function (result) {
    console.log('excel downloaded successfully');
    res.status(200).end();
  });
};

module.exports = {
  generateWorkBook
}