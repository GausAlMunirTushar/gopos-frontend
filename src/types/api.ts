export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TenantRecord {
  id: string;
  organizationId: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductVariant extends TenantRecord {
  sku: string;
  barcode?: string | null;
  sellingPrice: string;
  purchasePrice: string;
}

export interface Product extends TenantRecord {
  name: string;
  slug: string;
  variants: ProductVariant[];
  category?: { id: string; name: string } | null;
  brand?: { id: string; name: string } | null;
  unit?: { id: string; name: string; shortName: string } | null;
}
