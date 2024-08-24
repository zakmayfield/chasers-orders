'use client';
import { IconType } from 'react-icons';
import { Container, ContainerProps } from './Container';
import { merge } from '@/utils/styles';

export const Btn = ({
  text,
  Icon,
  className,
  border,
  size,
  width,
  padding,
  isDisabled,
  bgColor,

  fontWeight,
  handleClick,
}: {
  text?: string;
  Icon?: IconType;
  className?: string;
  border?: boolean;
  size?: 'sm' | 'md' | 'lg';
  width?: 'full';
  padding?: ContainerProps['padding'];
  isDisabled?: boolean;
  bgColor?: 'green' | 'red';

  fontWeight?: 'normal' | 'bold';
  handleClick?(): void;
}) => {
  const textDisabled = isDisabled && 'text-opacity-60';
  const textColor = bgColor ? 'text-white' : 'text-black';

  return (
    <Container as='div'>
      <button
        onClick={handleClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={merge(`
          rounded-md flex items-center w-auto hover:bg-opacity-90
          ${border && 'border'}
          ${width === 'full' && 'w-full justify-center'}
          ${size === 'sm' ? 'h-8' : size === 'md' ? 'h-10' : size === 'lg' ? 'h-12' : 'h-10'}
          ${padding === 'sm' ? 'p-2' : padding === 'md' ? 'p-4' : padding === 'lg' ? 'p-6' : 'px-4'}
          ${(bgColor === 'green' && 'bg-green-500') || (bgColor === 'red' && 'bg-red-400')}
          ${(isDisabled && bgColor && 'bg-opacity-70') || (isDisabled && !bgColor && 'bg-slate-50')}
          ${className}
        `)}
      >
        <Container as='div' flex='row'>
          {Icon && (
            <Container as='span' className={`${textDisabled} ${textColor}`}>
              <Icon />
            </Container>
          )}
          {text && (
            <Container as='span' className={`${textDisabled} ${textColor}`}>
              {text}
            </Container>
          )}
        </Container>
      </button>
    </Container>
  );
};
