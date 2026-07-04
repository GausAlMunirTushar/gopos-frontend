'use client';

import React, { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  DollarSign,
  ListOrdered,
  Package,
  RefreshCcw,
} from 'lucide-react';

import { apiClient } from '@/lib/api/client';
import { apiEndpoints } from '@/lib/api/endpoints';
import { PosCart, CartItem, type PosSelectOption } from '@/features/pos/components/PosCart';
import { PosCategories } from '@/features/pos/components/PosCategories';
import { PosHeader } from '@/features/pos/components/PosHeader';
import { PosProductGrid } from '@/features/pos/components/PosProductGrid';

interface ApiLocation {
  id: string;
  name: string;
}

interface ApiContact {
  id: string;
  name: string;
}

interface ApiCategory {
  id: string;
  name: string;
}

interface ApiProduct {
  id: string;
  name: string;
  imageUrls?: string[];
  category?: ApiCategory | null;
}

interface ApiInventoryBalance {
  quantity: string | number;
}

interface ApiPosVariant {
  id: string;
  name?: string | null;
  sku: string;
  purchasePrice: string | number;
  sellingPrice: string | number;
  product: ApiProduct;
  inventoryBalances?: ApiInventoryBalance[];
}

interface PosProduct {
  id: string;
  variantId: string;
  name: string;
  cat: string;
  stock: number;
  price: number;
  unitCost: number;
  img: string;
}

const defaultImage = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200';

const toNumber = (value: string | number | null | undefined) => {
  const numeric = Number(value ?? 0);
  return Number.isFinite(numeric) ? numeric : 0;
};

const mapSelectOption = (record: ApiLocation | ApiContact): PosSelectOption => ({
  id: record.id,
  name: record.name,
});

const mapPosProduct = (variant: ApiPosVariant): PosProduct => ({
  id: variant.product.id,
  variantId: variant.id,
  name: variant.name || variant.product.name,
  cat: variant.product.category?.name ?? 'Uncategorized',
  stock: (variant.inventoryBalances ?? []).reduce(
    (sum, balance) => sum + toNumber(balance.quantity),
    0,
  ),
  price: toNumber(variant.sellingPrice),
  unitCost: toNumber(variant.purchasePrice),
  img: variant.product.imageUrls?.[0] ?? defaultImage,
});

export default function POSPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'products' | 'cart'>('products');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);

  const locationsQuery = useQuery({
    queryKey: ['pos-locations'],
    queryFn: async () =>
      apiClient.get<ApiLocation[]>(apiEndpoints.people.stores, {
        page: 1,
        limit: 100,
        sortBy: 'name',
        sortOrder: 'asc',
      }),
  });

  const customersQuery = useQuery({
    queryKey: ['pos-customers'],
    queryFn: async () =>
      apiClient.get<ApiContact[]>(apiEndpoints.people.customers, {
        page: 1,
        limit: 100,
        sortBy: 'name',
        sortOrder: 'asc',
      }),
  });

  const effectiveLocationId = selectedLocationId || locationsQuery.data?.data?.[0]?.id || '';

  const productsQuery = useQuery({
    queryKey: ['pos-products', effectiveLocationId],
    queryFn: async () =>
      apiClient.get<ApiPosVariant[]>(apiEndpoints.sales.posProducts, {
        page: 1,
        limit: 200,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        locationId: effectiveLocationId || undefined,
      }),
  });

  const products = useMemo(() => {
    return productsQuery.data?.data.map(mapPosProduct) ?? [];
  }, [productsQuery.data?.data]);

  const locations = useMemo(
    () => locationsQuery.data?.data.map(mapSelectOption) ?? [],
    [locationsQuery.data?.data],
  );
  const customers = useMemo(
    () => customersQuery.data?.data.map(mapSelectOption) ?? [],
    [customersQuery.data?.data],
  );

  const categories = useMemo(() => {
    const categoryNames = [...new Set(products.map((product) => product.cat))];
    return [
      {
        name: 'All Categories',
        items: `${products.length} Items`,
        icon: (
          <div className="w-8 h-8 grid grid-cols-2 gap-1">
            <div className="border-2 border-[#FF9F43] rounded-full"></div>
            <div className="border-2 border-[#FF9F43] rounded-full"></div>
            <div className="border-2 border-[#FF9F43] rounded-full"></div>
            <div className="border-2 border-[#FF9F43] rounded-full"></div>
          </div>
        ),
      },
      ...categoryNames.map((name) => ({
        name,
        items: `${products.filter((product) => product.cat === name).length} Items`,
        icon: <Package className="w-8 h-8 text-gray-700" />,
      })),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (activeCategory !== 'All Categories') {
      filtered = filtered.filter((product) => product.cat === activeCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) || product.cat.toLowerCase().includes(query),
      );
    }
    return filtered;
  }, [activeCategory, products, searchQuery]);

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cartItems],
  );
  const tax = useMemo(() => subtotal * 0.05, [subtotal]);
  const discount = 0;
  const total = subtotal + tax - discount;

  const checkoutMutation = useMutation({
    mutationFn: async () =>
      apiClient.post(apiEndpoints.sales.posCheckout, {
        locationId: effectiveLocationId,
        customerId: selectedCustomerId || undefined,
        createInvoice: true,
        discountTotal: discount,
        taxTotal: tax,
        shippingTotal: 0,
        items: cartItems.map((item) => ({
          variantId: item.variantId,
          quantity: item.qty,
          unitPrice: item.price,
          unitCost: item.unitCost,
          discount: 0,
          tax: 0,
        })),
        payments: total > 0 ? [{ method: 'CASH', amount: total }] : [],
      }),
    onSuccess: () => {
      setCartItems([]);
      setCheckoutError(null);
      setCheckoutSuccess('Checkout completed successfully.');
      void queryClient.invalidateQueries({ queryKey: ['pos-products'] });
      void queryClient.invalidateQueries({ queryKey: [apiEndpoints.inventory.balances] });
    },
    onError: (error) => {
      setCheckoutSuccess(null);
      setCheckoutError(error instanceof Error ? error.message : 'Checkout failed');
    },
  });

  const handleAddToCart = (product: PosProduct) => {
    setCheckoutError(null);
    setCheckoutSuccess(null);
    if (product.stock <= 0) {
      setCheckoutError(`${product.name} is out of stock at the selected location.`);
      return;
    }
    setCartItems((previous) => {
      const existing = previous.find((item) => item.variantId === product.variantId);
      if (existing) {
        if (existing.qty >= product.stock) return previous;
        return previous.map((item) =>
          item.variantId === product.variantId ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [
        ...previous,
        {
          id: product.variantId,
          variantId: product.variantId,
          name: product.name,
          price: product.price,
          unitCost: product.unitCost,
          qty: 1,
          stock: product.stock,
          img: product.img,
        },
      ];
    });
  };

  const handleUpdateQty = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setCartItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, qty: Math.min(newQty, item.stock) } : item,
      ),
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
    setCheckoutError(null);
    setCheckoutSuccess(null);
  };

  const handleLocationChange = (locationId: string) => {
    setSelectedLocationId(locationId);
    setCartItems([]);
    setCheckoutError(null);
    setCheckoutSuccess(null);
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-[#F8F9FA] overflow-hidden font-sans text-gray-800">
      <PosHeader />

      <div className="lg:hidden flex bg-white border-b border-gray-100 shrink-0 z-10 relative">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-3 text-center text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'products'
              ? 'border-orange-500 text-orange-500 bg-orange-50/50'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Products Catalog
        </button>
        <button
          onClick={() => setActiveTab('cart')}
          className={`flex-1 py-3 text-center text-sm font-bold border-b-2 transition-colors relative ${
            activeTab === 'cart'
              ? 'border-orange-500 text-orange-500 bg-orange-50/50'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Order List (Cart)
          <span className="absolute top-2 right-4 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {cartItems.length}
          </span>
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative">
        <div
          className={`flex-1 lg:flex-[0.6] xl:flex-[0.65] flex flex-col p-3 sm:p-4 overflow-hidden lg:border-r border-gray-200 ${
            activeTab === 'products' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className="flex flex-wrap gap-2 mb-4 shrink-0">
            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors active:scale-95">
              <ListOrdered className="w-4 h-4" /> <span className="hidden xs:inline">View Orders</span>
            </button>
            <button
              onClick={handleClearCart}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors active:scale-95"
            >
              <RefreshCcw className="w-4 h-4" /> <span className="hidden xs:inline">Reset</span>
            </button>
            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors active:scale-95">
              <DollarSign className="w-4 h-4" /> <span className="hidden xs:inline">Transaction</span>
            </button>
          </div>

          {productsQuery.isLoading ? (
            <div className="flex flex-1 items-center justify-center text-sm text-gray-500">
              Loading POS products...
            </div>
          ) : (
            <>
              <PosCategories
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
              <PosProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </>
          )}
        </div>

        <PosCart
          activeTab={activeTab}
          cartItems={cartItems}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={(id) => setCartItems((previous) => previous.filter((item) => item.id !== id))}
          onClearCart={handleClearCart}
          subtotal={subtotal}
          tax={tax}
          discount={discount}
          total={total}
          locations={locations}
          customers={customers}
          selectedLocationId={effectiveLocationId}
          selectedCustomerId={selectedCustomerId}
          onSelectLocation={handleLocationChange}
          onSelectCustomer={setSelectedCustomerId}
          onCheckout={() => checkoutMutation.mutate()}
          isCheckingOut={checkoutMutation.isPending}
          checkoutError={checkoutError}
          checkoutSuccess={checkoutSuccess}
        />
      </div>
    </div>
  );
}
