export type NavItem = {
  path: string;
  content: string;
};

export const navData: NavItem[] = [
  {
    path: '/products',
    content: 'Shop',
  },
  {
    path: '/cart',
    content: 'Cart',
  },
  {
    path: '/dashboard',
    content: 'Dashboard',
  },
];
