export interface InvoiceItem {
  title: string;
  manufacturer: string;
  quantity: number;
  price: number;
  discount: number = 0;
  selectedCar?: string;
  value?: string;
  category?: string;
}
