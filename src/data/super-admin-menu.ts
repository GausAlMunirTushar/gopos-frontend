import { 
  LayoutGrid, Building2, Layers, CreditCard, DollarSign,
  Globe, Settings, Users, LucideIcon
} from 'lucide-react';

export interface SuperAdminMenuItem {
  title: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  badgeColor?: string;
}

export const SUPER_ADMIN_MENU_ITEMS: SuperAdminMenuItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutGrid,
    href: '/super-admin',
  },
  {
    title: 'Companies',
    icon: Building2,
    href: '/super-admin/companies',
    badge: '14',
    badgeColor: 'bg-orange-50 text-[#FF9F43]',
  },
  {
    title: 'CRM & Leads',
    icon: Users,
    href: '/super-admin/crm',
    badge: 'New',
    badgeColor: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Packages',
    icon: Layers,
    href: '/super-admin/packages',
  },
  {
    title: 'Subscriptions',
    icon: CreditCard,
    href: '/super-admin/subscriptions',
  },
  {
    title: 'Invoices',
    icon: DollarSign,
    href: '/super-admin/transactions',
  },
  {
    title: 'Custom Domains',
    icon: Globe,
    href: '/super-admin/domain-requests',
    badge: '3',
    badgeColor: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/super-admin/settings',
  },
];
