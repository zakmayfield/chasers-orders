import React from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa';
import { RxDashboard } from 'react-icons/rx';
export type DashboardNavItem = {
  path: string;
  icon?: JSX.Element;
  content: string;
};

export const dashboardNavItems: DashboardNavItem[] = [
  {
    path: '',
    content: 'Dashboard Home',
    icon: React.createElement(RxDashboard),
  },
  {
    path: '/favorites',
    content: 'Favorite Juice',
    icon: React.createElement(FaRegHeart),
  },
  {
    path: '/recent-orders',
    content: 'Recent Orders',
    icon: React.createElement(FaClockRotateLeft),
  },
  {
    path: '/settings',
    content: 'Settings',
    icon: React.createElement(IoSettingsOutline),
  },
];
