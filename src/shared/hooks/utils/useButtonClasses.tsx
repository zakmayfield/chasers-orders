import { BtnStyleProps } from '@/shared/components/ui';
import { useMemo } from 'react';

export const useButtonClasses = ({
  width,
  height,
  padding,
  border,
  bgColor,
  textColor,
  isDisabled,
  fontWeight,
  fontSize,
  className,
}: BtnStyleProps) =>
  useMemo(() => {
    const widthMap = {
      sm: 'w-44',
      md: 'w-52',
      lg: 'w-64',
      full: 'w-full',
      default: 'w-auto',
    };
    const heightMap = {
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-12',
      default: 'h-10',
    };
    const paddingMap = {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      default: 'px-4',
    };
    const bgColorMap = {
      green: 'bg-green-500',
      red: 'bg-red-400',
      default: 'bg-none',
    };
    const fontWeightMap = {
      normal: 'font-normal',
      bold: 'font-semibold',
      default: 'font-light',
    };
    const fontSizeMap = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
      default: 'text-base',
    };

    // Button
    const baseClasses = 'rounded-md flex items-center justify-center';
    const widthClasses = (width && widthMap[width]) || widthMap.default;
    const heightClasses = (height && heightMap[height]) || heightMap.default;
    const paddingClasses =
      (padding && paddingMap[padding]) || paddingMap.default;
    const borderClasses = border && 'border';
    const bgColorClasses =
      (bgColor && bgColorMap[bgColor]) || bgColorMap.default;
    const hoverClasses =
      (!isDisabled && !bgColor && 'hover:bg-slate-100') ||
      (!isDisabled && 'hover:bg-opacity-90');
    const disabledClasses =
      (isDisabled && bgColor && 'bg-opacity-70') ||
      (isDisabled && !bgColor && 'bg-slate-50');

    // Content
    const textDisabled = isDisabled && 'text-opacity-60';
    const color =
      !textColor && bgColor
        ? 'text-white'
        : textColor
          ? textColor
          : 'text-black';
    const textWeight =
      (fontWeight && fontWeightMap[fontWeight]) || fontWeightMap.default;
    const textSize = (fontSize && fontSizeMap[fontSize]) || fontSizeMap.default;

    return {
      contentClasses: `
        ${textDisabled}
        ${color}
        ${textWeight}
        ${textSize}
      `,
      buttonClasses: `
        ${baseClasses}
        ${widthClasses}
        ${heightClasses}
        ${paddingClasses}
        ${borderClasses}
        ${bgColorClasses}
        ${hoverClasses}
        ${disabledClasses}
        ${className}
      `,
    };
  }, [
    width,
    height,
    padding,
    border,
    bgColor,
    isDisabled,
    fontWeight,
    fontSize,
    className,
  ]);
