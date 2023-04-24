import { InvoiceItem } from './invoice-item';

export interface Invoice {
  actions: string[];
  invoiceData: InvoiceItem[];
}
