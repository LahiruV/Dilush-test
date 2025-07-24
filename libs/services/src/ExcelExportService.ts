/**
 * Exports data to an Excel file with specified columns and filename.
 * 
 * @param data - The data to be exported to Excel.
 * @param coloumns - The columns configuration for the Excel sheet.
 * @param fileName - The name of the file to be saved.
 * @param color - The background color for the header row in ARGB format. Default is 'FFFFFF'.
 * 
 * @returns A promise that resolves when the Excel file is generated and saved.
 * 
 * @example
 * ```typescript
 * const data = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 25 }
 * ];
 * const columns = [
 *   { header: 'Name', key: 'name', width: 10 },
 *   { header: 'Age', key: 'age', width: 5 }
 * ];
 * const fileName = 'UserList';
 * exportToExcel(data, columns, fileName);
 * ```
 * 
 * @author Lahiru Vimukthi
 * @date 18/09/2024 
 */

import ExcelJS from 'exceljs';

export const exportToExcel = async (data: any, coloumns: any, fileName: string, color = 'FFFFFF') => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(fileName);
    worksheet.columns = coloumns;

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: color },
        };
    });

    data.forEach((row: any) => {
        worksheet.addRow(row);
    });

    worksheet.columns.forEach(column => {
        if (column.header) {
            column.width = column.header.length < 12 ? 12 : column.header.length;
        } else {
            column.width = 12;
        }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName + '.xlsx');
};

function saveAs(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}
