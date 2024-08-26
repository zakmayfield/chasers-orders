import { Inter, Quicksand } from 'next/font/google';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BsCartPlus } from 'react-icons/bs';
import {
  PiHeart,
  PiHeartDuotone,
  PiStorefrontLight,
  PiXCircleThin,
  PiXBold,
  PiCheckCircleDuotone,
  PiSpinnerGapThin,
  PiWarningDuotone,
  PiWarningCircleDuotone,
  PiArrowRightLight,
  PiFacebookLogoDuotone,
  PiInstagramLogoDuotone,
} from 'react-icons/pi';
import { CiShop } from 'react-icons/ci';
import { FaChevronDown } from 'react-icons/fa';
import { LuTrash2 } from 'react-icons/lu';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

//^ FONTS
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
});

//^ CLASSNAME MERGE
export function merge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//^ ICONS
export const CartIcon = BsCartPlus;
export const HeartDuotoneIcon = PiHeartDuotone;
export const HeartOutlineIcon = PiHeart;
export const StoreIcon = PiStorefrontLight;
export const XIcon = PiXCircleThin;
export const XBoldIcon = PiXBold;
export const ShopIcon = CiShop;
export const DownArrow = FaChevronDown;
export const SpinnerIcon = PiSpinnerGapThin;
export const WarningIcon = PiWarningDuotone;
export const WarningCircleIcon = PiWarningCircleDuotone;
export const CheckIcon = PiCheckCircleDuotone;
export const ArrowRight = PiArrowRightLight;
export const FacebookIcon = PiFacebookLogoDuotone;
export const InstagramIcon = PiInstagramLogoDuotone;
export const TrashIcon = LuTrash2;
export const EmptyCartIcon = MdOutlineRemoveShoppingCart;
