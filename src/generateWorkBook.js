const Excel = require('exceljs');

generateWorkBook = (res, workBookDatas) => {
    var workbook = new Excel.Workbook();

    //Worksheet
    workBookDatas.forEach(workBookData => {
      var sheet = workbook.addWorksheet(workBookData.sheet_name);
      sheet.columns = workBookData.column_name;
      sheet.addRows(workBookData.sheet_data);
    });

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