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
  PiArrowCircleRightDuotone,
  PiHouseDuotone,
  PiInfoDuotone,
  PiSpinnerGap,
  PiTrashDuotone,
  PiXCircleDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
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
export const ArrowRight = PiArrowRightLight;
export const CartIcon = BsCartPlus;
export const CheckIcon = PiCheckCircleDuotone;
export const DownArrow = FaChevronDown;
export const EmptyCartIcon = MdOutlineRemoveShoppingCart;
export const FacebookIcon = PiFacebookLogoDuotone;
export const HeartDuotoneIcon = PiHeartDuotone;
export const HeartOutlineIcon = PiHeart;
export const InstagramIcon = PiInstagramLogoDuotone;
export const ShopIcon = CiShop;
export const StoreIcon = PiStorefrontLight;
export const SpinnerIcon = PiSpinnerGapThin;
export const TrashIcon = LuTrash2;
export const WarningCircleIcon = PiWarningCircleDuotone;
export const WarningIcon = PiWarningDuotone;
export const XBoldIcon = PiXBold;
export const XIcon = PiXCircleThin;

//^ NEW ICONS - duotone
export const ArrowCircleRightDuotone = PiArrowCircleRightDuotone;
export const CheckCircleDuotone = PiCheckCircleDuotone;
export const EyeDuotone = PiEyeDuotone;
export const EyeClosedDuotone = PiEyeClosedDuotone;
export const FacebookDuotone = PiFacebookLogoDuotone;
export const HeartDuotone = PiHeartDuotone;
export const HouseDuotone = PiHouseDuotone;
export const InfoDuotone = PiInfoDuotone;
export const InstagramDuotone = PiInstagramLogoDuotone;
export const TrashDuotone = PiTrashDuotone;
export const WarningCircleDuotone = PiWarningCircleDuotone;
export const WarningTriangleDuotone = PiWarningDuotone;
export const XCircleDuotone = PiXCircleDuotone;
//^ - regular
export const SpinnerGap = PiSpinnerGap;
