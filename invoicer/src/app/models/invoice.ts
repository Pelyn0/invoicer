import { InvoiceItem } from './invoice-item';

export interface Invoice {
  actions: string[];
  invoiceData: InvoiceItem[];
  contacts: string[];
  contactImage: string;
}
