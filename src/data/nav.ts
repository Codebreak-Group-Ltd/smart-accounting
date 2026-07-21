/* Shared navigation data. Services list drives the header dropdown, the mobile
   menu, the footer, and the Services page anchors — one source (playbook DRY). */

export interface ServiceLink {
  label: string;
  anchor: string;
}

export const services: ServiceLink[] = [
  { label: 'MTD for ITSA', anchor: 'mtd' },
  { label: 'Bookkeeping Bureau', anchor: 'bookkeeping' },
  { label: 'VAT Returns', anchor: 'vat' },
  { label: 'Payroll', anchor: 'payroll' },
  { label: 'Management Accounts', anchor: 'manage-accounts' },
  { label: 'Year-End Accounts', anchor: 'year-end' },
  { label: 'Personal and Business Tax Returns', anchor: 'personal-and-business' },
  { label: 'New Business Setup', anchor: 'new-business' },
  { label: 'Bookkeeping Training and Support', anchor: 'training-and-support' },
];

// Footer shows a curated subset + "All services".
export const footerServices: ServiceLink[] = services.slice(0, 6);
