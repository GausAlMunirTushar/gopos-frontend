import { 
  LayoutGrid, UserCog, Package, PackagePlus, History, TrendingDown,
  FolderTree, GitBranch, Triangle, Boxes, SlidersHorizontal, BadgeCheck,
  ScanBarcode, QrCode, Layers, Sparkles, RefreshCw, ShoppingCart,
  Receipt, RotateCcw, FileQuestion, Monitor, Ticket, Gift, Percent,
  ShoppingBag, ClipboardList, Undo2, FileMinus, FilePlus, Landmark,
  CircleDollarSign, Scale, Clock, Search, FileText, Users, UserCheck,
  Truck, Store, Warehouse, User, Compass, GitFork, Shuffle,
  CalendarCheck, CalendarMinus, CalendarHeart, Banknote, BarChart3,
  PieChart, Filter, Trash2, Files, BookOpen, MapPin, Star,
  HelpCircle, UserCircle, Shield, FileWarning, File, DollarSign,
  Send, AlertTriangle, Settings, Globe, Smartphone, Coins, Hexagon,
  LogOut, LucideIcon
} from 'lucide-react';

export interface SubMenuItem {
  name: string;
  href: string;
  icon?: LucideIcon;
}

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  items?: SubMenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutGrid,
    href: '/dashboard',
  },
  {
    title: 'Inventory',
    icon: Package,
    items: [
      { name: 'Products', href: '/inventory/products', icon: Package },
      { name: 'Create Product', href: '/inventory/products/create', icon: PackagePlus },
      { name: 'Expired Products', href: '/inventory/expired', icon: History },
      { name: 'Low Stocks', href: '/inventory/low-stock', icon: TrendingDown },
      { name: 'Category', href: '/inventory/category', icon: FolderTree },
      { name: 'Sub Category', href: '/inventory/sub-category', icon: GitBranch },
      { name: 'Brands', href: '/inventory/brands', icon: Triangle },
      { name: 'Units', href: '/inventory/units', icon: Boxes },
      { name: 'Variant Attributes', href: '/inventory/variants', icon: SlidersHorizontal },
      { name: 'Warranties', href: '/inventory/warranties', icon: BadgeCheck },
      { name: 'Print Barcode', href: '/inventory/barcode', icon: ScanBarcode },
      { name: 'Print QR Code', href: '/inventory/qrcode', icon: QrCode },
    ],
  },
  {
    title: 'Stock',
    icon: Layers,
    items: [
      { name: 'Manage Stock', href: '/stock/manage', icon: Layers },
      { name: 'Stock Adjustment', href: '/stock/adjustment', icon: Sparkles },
      { name: 'Stock Transfer', href: '/stock/transfer', icon: RefreshCw },
    ],
  },
  {
    title: 'Sales',
    icon: ShoppingCart,
    items: [
      { name: 'Sales', href: '/sales', icon: ShoppingCart },
      { name: 'Invoices', href: '/sales/invoices', icon: Receipt },
      { name: 'Sales Return', href: '/sales/returns', icon: RotateCcw },
      { name: 'Quotation', href: '/sales/quotation', icon: FileQuestion },
      { name: 'POS', href: '/pos', icon: Monitor },
    ],
  },
  {
    title: 'Promo',
    icon: Ticket,
    items: [
      { name: 'Coupons', href: '/promo/coupons', icon: Ticket },
      { name: 'Gift Card', href: '/promo/gift-cards', icon: Gift },
      { name: 'Discount', href: '/promo/discount', icon: Percent },
    ],
  },
  {
    title: 'Purchases',
    icon: ShoppingBag,
    items: [
      { name: 'Purchases', href: '/purchases', icon: ShoppingBag },
      { name: 'Purchase Order', href: '/purchases/orders', icon: ClipboardList },
      { name: 'Purchase Return', href: '/purchases/returns', icon: Undo2 },
    ],
  },
  {
    title: 'Finance & Accounts',
    icon: Landmark,
    items: [
      { name: 'Expenses', href: '/finance/expenses', icon: FileMinus },
      { name: 'Income', href: '/finance/income', icon: FilePlus },
      { name: 'Bank Accounts', href: '/finance/banks', icon: Landmark },
      { name: 'Money Transfer', href: '/finance/transfer', icon: CircleDollarSign },
      { name: 'Balance Sheet', href: '/finance/balance-sheet', icon: Scale },
      { name: 'Trial Balance', href: '/finance/trial-balance', icon: Clock },
      { name: 'Cash Flow', href: '/finance/cash-flow', icon: Search },
      { name: 'Account Statement', href: '/finance/statement', icon: FileText },
    ],
  },
  {
    title: 'Peoples',
    icon: Users,
    items: [
      { name: 'Customers', href: '/customers', icon: Users },
      { name: 'Billers', href: '/peoples/billers', icon: UserCheck },
      { name: 'Suppliers', href: '/peoples/suppliers', icon: Truck },
      { name: 'Stores', href: '/peoples/stores', icon: Store },
      { name: 'Warehouses', href: '/peoples/warehouses', icon: Warehouse },
    ],
  },
  {
    title: 'HRM',
    icon: User,
    items: [
      { name: 'Employees', href: '/hrm/employees', icon: User },
      { name: 'Departments', href: '/hrm/departments', icon: Compass },
      { name: 'Designation', href: '/hrm/designation', icon: GitFork },
      { name: 'Shifts', href: '/hrm/shifts', icon: Shuffle },
      { name: 'Attendence', href: '/hrm/attendance', icon: CalendarCheck },
      { name: 'Leaves', href: '/hrm/leaves', icon: CalendarMinus },
      { name: 'Holidays', href: '/hrm/holidays', icon: CalendarHeart },
      { name: 'Payroll', href: '/hrm/payroll', icon: Banknote },
    ],
  },
  {
    title: 'Reports',
    icon: BarChart3,
    items: [
      { name: 'Sales Report', href: '/reports/sales', icon: BarChart3 },
      { name: 'Purchase Report', href: '/reports/purchase', icon: PieChart },
      { name: 'Inventory Report', href: '/reports/inventory', icon: Filter },
      { name: 'Invoice Report', href: '/reports/invoice', icon: Receipt },
      { name: 'Supplier Report', href: '/reports/supplier', icon: Truck },
      { name: 'Customer Report', href: '/reports/customer', icon: Users },
      { name: 'Product Report', href: '/reports/product', icon: Package },
      { name: 'Expense Report', href: '/reports/expense', icon: FileMinus },
      { name: 'Income Report', href: '/reports/income', icon: TrendingDown },
      { name: 'Tax Report', href: '/reports/tax', icon: Percent },
      { name: 'Profit & Loss', href: '/reports/profit-loss', icon: RotateCcw },
      { name: 'Annual Report', href: '/reports/annual', icon: Clock },
    ],
  },
  {
    title: 'User Management',
    icon: UserCog,
    items: [
      { name: 'Users', href: '/users', icon: UserCog },
      { name: 'Roles & Permissions', href: '/users/roles', icon: Sparkles },
      { name: 'Delete Account Request', href: '/users/delete-requests', icon: Trash2 },
    ],
  },
  {
    title: 'Content (CMS)',
    icon: Files,
    items: [
      { name: 'Pages', href: '/cms/pages', icon: Files },
      { name: 'Blog', href: '/cms/blog', icon: BookOpen },
      { name: 'Location', href: '/cms/locations', icon: MapPin },
      { name: 'Testimonials', href: '/cms/testimonials', icon: Star },
      { name: 'FAQ', href: '/cms/faq', icon: HelpCircle },
    ],
  },
  {
    title: 'Pages',
    icon: FileText,
    items: [
      { name: 'Profile', href: '/profile', icon: UserCircle },
      { name: 'Authentication', href: '/login', icon: Shield },
      { name: 'Error Page', href: '/404', icon: FileWarning },
      { name: 'Blank Page', href: '/blank', icon: File },
      { name: 'Pricing', href: '/pricing', icon: DollarSign },
      { name: 'Coming Soon', href: '/coming-soon', icon: Send },
      { name: 'Under Maintenance', href: '/maintenance', icon: AlertTriangle },
    ],
  },
  {
    title: 'Settings',
    icon: Settings,
    items: [
      { name: 'General Settings', href: '/settings', icon: Settings },
      { name: 'Website Settings', href: '/settings#website', icon: Globe },
      { name: 'App Settings', href: '/settings#app', icon: Smartphone },
      { name: 'System Settings', href: '/settings#system', icon: Monitor },
      { name: 'Financial Settings', href: '/settings#financial', icon: Coins },
      { name: 'Other Settings', href: '/settings#other', icon: Hexagon },
      { name: 'Logout', href: '/login', icon: LogOut },
    ],
  },
];
