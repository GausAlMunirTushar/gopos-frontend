export type ApiRecord = Record<string, unknown>;

const asString = (value: unknown, fallback = '') => {
  if (value === null || value === undefined) return fallback;
  return String(value);
};

const asNumber = (value: unknown, fallback = 0) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
};

const asStatus = (value: unknown) => {
  const status = asString(value, 'ACTIVE').toLowerCase();
  return status.charAt(0).toUpperCase() + status.slice(1).replaceAll('_', ' ');
};

const asDate = (value: unknown) => {
  if (!value) return '';
  const date = new Date(asString(value));
  return Number.isNaN(date.getTime())
    ? asString(value)
    : new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
};

/**
 * Shared display helpers for turning backend resource records into legacy table
 * row shapes while the frontend is converted module-by-module.
 */
export const rowValue = {
  string: asString,
  number: asNumber,
  status: asStatus,
  date: asDate,
};

export const contactRow = (row: ApiRecord, index: number) => ({
  code: asString(row.code, `CT${String(index + 1).padStart(3, '0')}`),
  name: asString(row.name, asString(row.companyName, 'Unnamed contact')),
  company: asString(row.companyName, asString(row.name, '')),
  email: asString(row.email, '—'),
  phone: asString(row.phone, '—'),
  country: asString(row.country, '—'),
  status: asStatus(row.status),
  avatar: `https://i.pravatar.cc/100?img=${(index % 60) + 1}`,
  img: asString(row.name, 'supplier').toLowerCase().replaceAll(' ', '-'),
});

export const locationRow = (row: ApiRecord) => ({
  store: asString(row.name, 'Unnamed store'),
  warehouse: asString(row.name, 'Unnamed warehouse'),
  user: asString(row.contactPerson, '—'),
  person: asString(row.contactPerson, '—'),
  email: asString(row.email, '—'),
  phone: asString(row.phone, '—'),
  products: asNumber(row.products),
  stock: asNumber(row.stock),
  qty: asNumber(row.quantity),
  created: asDate(row.createdAt),
  status: asStatus(row.status),
});

export const namedRow = (row: ApiRecord, index: number) => ({
  code: asString(row.code, String(index + 1).padStart(3, '0')),
  name: asString(row.name, asString(row.title, 'Untitled')),
  slug: asString(row.slug, asString(row.name).toLowerCase().replaceAll(' ', '-')),
  short: asString(row.shortName, asString(row.code)),
  img: asString(row.logoUrl, 'logo'),
  products: asNumber(row.productsCount ?? (row._count as ApiRecord | undefined)?.products),
  date: asDate(row.createdAt),
  description: asString(row.description, '—'),
  status: asStatus(row.status),
  created: asDate(row.createdAt),
});

export const productRow = (row: ApiRecord, index: number) => {
  const variants = Array.isArray(row.variants) ? (row.variants as ApiRecord[]) : [];
  const firstVariant = variants[0] ?? {};
  const category = row.category as ApiRecord | undefined;
  const brand = row.brand as ApiRecord | undefined;
  const unit = row.unit as ApiRecord | undefined;
  const createdBy = row.createdBy as ApiRecord | undefined;

  return {
    sku: asString(firstVariant.sku ?? row.sku, `PT${String(index + 1).padStart(3, '0')}`),
    name: asString(row.name, 'Unnamed product'),
    cat: asString(category?.name ?? row.categoryName, '—'),
    brand: asString(brand?.name ?? row.brandName, '—'),
    price: `$${asNumber(firstVariant.sellingPrice ?? row.sellingPrice).toFixed(2)}`,
    unit: asString(unit?.shortName ?? unit?.name ?? row.unitName, 'Pc'),
    qty: asNumber(row.quantity ?? row.stock),
    creator: asString(createdBy?.name ?? row.creator, 'System'),
    avatar: `https://i.pravatar.cc/150?u=product-${index}`,
  };
};

export const subCategoryRow = (row: ApiRecord, index: number) => {
  const parent = row.parent as ApiRecord | undefined;

  return {
    img: asString(row.name, 'category').toLowerCase().replaceAll(' ', '-'),
    name: asString(row.name, 'Unnamed sub category'),
    cat: asString(parent?.name ?? row.parentName, '—'),
    code: asString(row.code, `CT${String(index + 1).padStart(3, '0')}`),
    desc: asString(row.description, '—'),
    status: asStatus(row.status),
  };
};

export const variantAttributeRow = (row: ApiRecord) => ({
  name: asString(row.name, 'Unnamed variant'),
  values: Array.isArray(row.values)
    ? (row.values as ApiRecord[]).map((value) => asString(value.value)).filter(Boolean).join(', ')
    : asString(row.values, '—'),
  date: asDate(row.createdAt),
  status: asStatus(row.status),
});

export const warrantyRow = (row: ApiRecord) => ({
  name: asString(row.name, 'Unnamed warranty'),
  desc: asString(row.description, '—'),
  duration: `${asNumber(row.duration)} ${asString(row.durationUnit, 'Days').toLowerCase()}`,
  status: asStatus(row.status),
});

export const stockBalanceRow = (row: ApiRecord, index: number) => {
  const variant = row.variant as ApiRecord | undefined;
  const product = variant?.product as ApiRecord | undefined;
  const location = row.location as ApiRecord | undefined;

  return {
    warehouse: asString(location?.type) === 'WAREHOUSE' ? asString(location?.name, '—') : '—',
    store: asString(location?.type) === 'STORE' ? asString(location?.name, '—') : '—',
    product: asString(product?.name ?? variant?.name, 'Unnamed product'),
    date: asDate(row.updatedAt ?? row.createdAt),
    person: 'System',
    qty: asNumber(row.quantityOnHand ?? row.quantity),
    img: asString(product?.name ?? variant?.name, `stock-${index}`).toLowerCase().replaceAll(' ', '-'),
  };
};

export const documentRow = (row: ApiRecord, index: number) => ({
  reference: asString(
    row.saleNumber ?? row.purchaseNumber ?? row.orderNumber ?? row.invoiceNumber ?? row.returnNumber ?? row.quotationNumber,
    `DOC-${String(index + 1).padStart(4, '0')}`,
  ),
  customer: asString(
    row.customerName ??
      (row.customer as ApiRecord | undefined)?.name ??
      row.supplierName ??
      (row.supplier as ApiRecord | undefined)?.name,
    '—',
  ),
  supplier: asString(row.supplierName ?? (row.supplier as ApiRecord | undefined)?.name, '—'),
  date: asDate(row.saleDate ?? row.purchaseDate ?? row.orderDate ?? row.issuedAt ?? row.returnDate ?? row.createdAt),
  status: asStatus(row.status),
  payment: asStatus(row.paymentStatus),
  total: asNumber(row.grandTotal ?? row.total),
  paid: asNumber(row.paidTotal),
  due: Math.max(0, asNumber(row.grandTotal ?? row.total) - asNumber(row.paidTotal)),
});

const statusColor = (status: unknown) => {
  const normalized = asString(status).toUpperCase();
  if (['COMPLETED', 'RECEIVED', 'PAID', 'ACCEPTED', 'ACTIVE'].includes(normalized)) return 'bg-teal-500';
  if (['PENDING', 'PARTIAL', 'PARTIALLY_RECEIVED', 'ORDERED', 'SENT', 'DRAFT'].includes(normalized)) return 'bg-orange-500';
  return 'bg-red-500';
};

const pillColor = (status: unknown) => {
  const normalized = asString(status).toUpperCase();
  if (['COMPLETED', 'RECEIVED', 'PAID', 'ACCEPTED', 'ACTIVE'].includes(normalized)) return 'bg-green-100 text-green-600';
  if (['PENDING', 'PARTIAL', 'PARTIALLY_RECEIVED', 'ORDERED', 'SENT', 'DRAFT'].includes(normalized)) return 'bg-orange-100 text-orange-600';
  if (['OVERDUE', 'CANCELLED', 'EXPIRED', 'VOID'].includes(normalized)) return 'bg-red-100 text-red-600';
  return 'bg-blue-100 text-blue-600';
};

export const saleRow = (row: ApiRecord, index: number) => ({
  id: asString(row.saleNumber, `SL${String(index + 1).padStart(3, '0')}`),
  customer: asString((row.customer as ApiRecord | undefined)?.name ?? row.customerName, 'Walk-in Customer'),
  date: asDate(row.saleDate ?? row.createdAt),
  status: asStatus(row.status),
  payment: asStatus(row.paymentStatus),
  total: `$${asNumber(row.grandTotal ?? row.total).toFixed(2)}`,
  baddr: asString((row.customer as ApiRecord | undefined)?.country, '—'),
  color: statusColor(row.status),
});

export const purchaseRow = (row: ApiRecord, index: number) => ({
  id: asString(row.purchaseNumber ?? row.orderNumber, `PR${String(index + 1).padStart(3, '0')}`),
  supplier: asString((row.supplier as ApiRecord | undefined)?.name ?? row.supplierName, '—'),
  date: asDate(row.purchaseDate ?? row.orderDate ?? row.createdAt),
  deliveryDate: asDate(row.expectedDate ?? row.deliveryDate),
  status: asStatus(row.status),
  payment: asStatus(row.paymentStatus),
  total: `$${asNumber(row.grandTotal ?? row.total).toFixed(2)}`,
  amount: `$${asNumber(row.grandTotal ?? row.total).toFixed(2)}`,
  color: statusColor(row.status),
});

export const invoiceRow = (row: ApiRecord, index: number) => ({
  id: asString(row.invoiceNumber, `INV-${String(index + 1).padStart(3, '0')}`),
  customer: asString((row.sale as ApiRecord | undefined)?.customerName ?? row.customerName, '—'),
  date: asDate(row.issuedAt ?? row.createdAt),
  dueDate: asDate(row.dueAt),
  amount: `$${asNumber(row.total).toFixed(2)}`,
  status: asStatus(row.status),
  color: pillColor(row.status),
});

export const quotationRow = (row: ApiRecord, index: number) => ({
  id: asString(row.quotationNumber, `QT-${String(index + 1).padStart(3, '0')}`),
  customer: asString((row.customer as ApiRecord | undefined)?.name ?? row.customerName, '—'),
  date: asDate(row.quotationDate ?? row.createdAt),
  expiry: asDate(row.expiresAt),
  amount: `$${asNumber(row.grandTotal ?? row.total).toFixed(2)}`,
  status: asStatus(row.status),
  color: pillColor(row.status),
});

export const saleReturnRow = (row: ApiRecord, index: number) => ({
  id: asString(row.returnNumber, `SR-${String(index + 1).padStart(3, '0')}`),
  saleId: asString((row.sale as ApiRecord | undefined)?.saleNumber, '—'),
  customer: asString((row.sale as ApiRecord | undefined)?.customerName ?? row.customerName, '—'),
  date: asDate(row.returnDate ?? row.createdAt),
  amount: `$${asNumber(row.total).toFixed(2)}`,
  status: asStatus(row.status),
  color: pillColor(row.status),
});

export const purchaseReturnRow = (row: ApiRecord, index: number) => ({
  id: asString(row.returnNumber, `PR-${String(index + 1).padStart(3, '0')}`),
  purchaseId: asString((row.purchase as ApiRecord | undefined)?.purchaseNumber, '—'),
  supplier: asString((row.purchase as ApiRecord | undefined)?.supplierName ?? row.supplierName, '—'),
  date: asDate(row.returnDate ?? row.createdAt),
  amount: `$${asNumber(row.total).toFixed(2)}`,
  status: asStatus(row.status),
  color: pillColor(row.status),
});

export const bankRow = (row: ApiRecord, index: number) => ({
  id: asString(row.code, `BNK${String(index + 1).padStart(3, '0')}`),
  name: asString(row.bankName, 'Unnamed bank'),
  accountName: asString(row.accountName, '—'),
  accountNo: asString(row.accountNumber, '—'),
  balance: asString(row.currentBalance ?? row.openingBalance, '0'),
  status: asStatus(row.status),
  color: pillColor(row.status),
});

export const financeEntryRow = (row: ApiRecord, index: number) => ({
  id: asString(row.code, `FIN${String(index + 1).padStart(3, '0')}`),
  source: asString(row.title ?? row.description ?? (row.category as ApiRecord | undefined)?.name, 'Income'),
  category: asString((row.category as ApiRecord | undefined)?.name ?? row.title, 'Expense'),
  date: asDate(row.entryDate ?? row.date ?? row.createdAt),
  amount: `$${asNumber(row.amount).toFixed(2)}`,
  status: asStatus(row.status),
  color: pillColor(row.status),
});

export const departmentRow = (row: ApiRecord, index: number) => ({
  id: asString(row.code, `DPT${String(index + 1).padStart(3, '0')}`),
  name: asString(row.name, 'Unnamed department'),
  code: asString(row.code, '—'),
  employeeCount: asNumber((row._count as ApiRecord | undefined)?.employees ?? row.employeeCount),
  status: asStatus(row.status),
  color: pillColor(row.status),
});

export const designationRow = (row: ApiRecord, index: number) => ({
  id: asString(row.code, `DSG${String(index + 1).padStart(3, '0')}`),
  name: asString(row.name, 'Unnamed designation'),
  status: asStatus(row.status),
  color: pillColor(row.status),
});

export const employeeRow = (row: ApiRecord, index: number) => ({
  id: asString(row.employeeNumber, `EMP${String(index + 1).padStart(3, '0')}`),
  name: asString(row.name, 'Unnamed employee'),
  email: asString(row.email, '—'),
  phone: asString(row.phone, '—'),
  department: asString((row.department as ApiRecord | undefined)?.name, '—'),
  designation: asString((row.designation as ApiRecord | undefined)?.name, '—'),
  status: asStatus(row.status),
  color: pillColor(row.status),
});

export const couponRow = (row: ApiRecord, index: number) => ({
  id: asString(row.code, `CPN${String(index + 1).padStart(3, '0')}`),
  code: asString(row.code, '—'),
  discount: `${asNumber(row.discountValue).toFixed(row.discountType === 'PERCENTAGE' ? 0 : 2)}${row.discountType === 'PERCENTAGE' ? '%' : ''}`,
  type: asStatus(row.discountType),
  expiry: asDate(row.endsAt ?? row.expiresAt),
  status: asStatus(row.status),
  color: pillColor(row.status),
});

export const giftCardRow = (row: ApiRecord, index: number) => ({
  id: asString(row.code, `GC${String(index + 1).padStart(3, '0')}`),
  customer: asString((row.customer as ApiRecord | undefined)?.name ?? row.customerName, '—'),
  amount: `$${asNumber(row.initialBalance ?? row.amount).toFixed(2)}`,
  balance: `$${asNumber(row.currentBalance ?? row.balance).toFixed(2)}`,
  expiry: asDate(row.expiresAt),
  status: asStatus(row.status),
  color: pillColor(row.status),
});

export const transferRow = (row: ApiRecord, index: number) => ({
  from: asString((row.fromLocation as ApiRecord | undefined)?.name ?? (row.sourceLocation as ApiRecord | undefined)?.name, '—'),
  to: asString((row.toLocation as ApiRecord | undefined)?.name ?? (row.destinationLocation as ApiRecord | undefined)?.name, '—'),
  products: asNumber((row._count as ApiRecord | undefined)?.items ?? row.products),
  qty: asNumber(row.totalQuantity ?? row.quantity),
  ref: asString(row.transferNumber ?? row.reference, `#${String(index + 1).padStart(6, '0')}`),
  date: asDate(row.transferDate ?? row.createdAt),
});

export const lowStockRow = (row: ApiRecord, index: number) => {
  const balance = stockBalanceRow(row, index);
  const variant = row.variant as ApiRecord | undefined;
  const product = variant?.product as ApiRecord | undefined;
  const category = product?.category as ApiRecord | undefined;

  return {
    warehouse: balance.warehouse,
    store: balance.store,
    img: balance.img,
    name: balance.product,
    category: asString(category?.name ?? row.categoryName, '—'),
    sku: asString(variant?.sku ?? row.sku, '—'),
    qty: asNumber(row.quantityOnHand ?? row.quantity),
    qtyAlert: asNumber(product?.reorderLevel ?? row.reorderLevel),
  };
};

export const expiredProductRow = (row: ApiRecord, index: number) => {
  const variant = row.variant as ApiRecord | undefined;
  const product = variant?.product as ApiRecord | undefined;

  return {
    sku: asString(variant?.sku ?? row.sku, `PT${String(index + 1).padStart(3, '0')}`),
    img: asString(product?.name ?? row.name, `expired-${index}`).toLowerCase().replaceAll(' ', '-'),
    name: asString(product?.name ?? row.name, 'Unnamed product'),
    mfg: asDate(row.manufacturedAt),
    exp: asDate(row.expiresAt ?? row.expiryDate),
  };
};
