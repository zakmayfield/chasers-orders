import React from 'react';

// Phosphor Icons
import { PiDiamondsFourLight } from 'react-icons/pi';
import { PiDiamondsFourDuotone } from 'react-icons/pi';
import { PiDiamondsFourFill } from 'react-icons/pi';

import { PiHeartStraightLight } from 'react-icons/pi';
import { PiHeartStraightDuotone } from 'react-icons/pi';
import { PiHeartStraightFill } from 'react-icons/pi';

import { PiClockCounterClockwiseLight } from 'react-icons/pi';
import { PiClockCounterClockwiseDuotone } from 'react-icons/pi';

import { PiGearSixLight } from 'react-icons/pi';
import { PiGearSixDuotone } from 'react-icons/pi';
import { PiGearSixFill } from 'react-icons/pi';

export type DashboardNavItem = {
  path: string;
  icon?: JSX.Element;
  content: string;
};

export const navData: DashboardNavItem[] = [
  {
    path: '',
    content: 'Dashboard',
    icon: React.createElement(PiDiamondsFourDuotone),
  },
  {
    path: '/favorites',
    content: 'Favorites',
    icon: React.createElement(PiHeartStraightDuotone),
  },
  {
    path: '/recent-orders',
    content: 'Recent Orders',
    icon: React.createElement(PiClockCounterClockwiseDuotone),
  },
  // {
  //   path: '/settings',
  //   content: 'Settings',
  //   icon: React.createElement(PiGearSixDuotone),
  // },
];
