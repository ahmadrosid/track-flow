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

export function convertJsonToTableData(jsonData: any): TableData {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    
    // Extract the single values from arrays with one element
    const date = data.date[0];
    const businessName = data.business_name[0];
    const serviceName = data.service_name[0];
    const serviceAmount = data.service_amount[0];
    
    // Create the headers array
    const headers = ["Date", "Business Name", "Service Name", "Service Amount"];
    
    // Create the row data array
    const rowData = [date, businessName, serviceName, serviceAmount];
    
    return {
      headers: headers,
      rows: [rowData] // We have just one row in this case
    };
}
  