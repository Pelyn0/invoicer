export interface InvoiceItem {
  title: string;
  manufacturer: string;
  quantity: number;
  price: number;
  discount?: number;
  selectedCar?: string;
  value?: string;
  category?: string;
  discountPercents?: number;
}
