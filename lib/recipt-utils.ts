export interface ReceiptData {
  date: string[];
  business_name: string[];
  services: string[];
  service_name: string[];
  service_amount: string[];
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export function convertJsonToTableData(jsonData: any[]): TableData {
    const headers = ["Date", "Store Name", "Service Name", "Service Amount"];
    let rowData: string[][] = [];
    jsonData.forEach((data) => {
        const date = data.date[0];
        const businessName = data.business_name[0];
        const serviceName = data.service_name[0];
        const serviceAmount = data.service_amount[0];
        rowData.push([date, businessName, serviceName, serviceAmount])
    });
    
    return {
      headers: headers,
      rows: rowData
    };
}
