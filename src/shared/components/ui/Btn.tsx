'use client';
import { IconType } from 'react-icons';
import { Container, ContainerProps } from './Container';
import { merge } from '@/utils/styles';
import { SpinLoader } from './SpinLoader';

export const Btn = ({
  text,
  Icon,
  className,
  border,
  height,
  width,
  padding,
  isDisabled,
  isLoading,
  bgColor,
  fontWeight,
  fontSize,
  handleClick,
}: {
  text?: string;
  Icon?: IconType;
  className?: string;
  border?: boolean;
  height?: 'sm' | 'md' | 'lg';
  width?: 'sm' | 'md' | 'lg' | 'full';
  padding?: ContainerProps['padding'];
  isDisabled?: boolean;
  isLoading?: boolean;
  bgColor?: 'green' | 'red';
  fontWeight?: 'normal' | 'bold';
  fontSize?: 'sm' | 'md' | 'lg';
  handleClick?(): void;
}) => {
  const textDisabled = isDisabled && 'text-opacity-60';
  const textColor = bgColor ? 'text-white' : 'text-black';
  const textWeight =
    fontWeight === 'normal'
      ? 'font-normal'
      : fontWeight === 'bold'
        ? 'font-semibold'
        : 'font-light';
  const textSize =
    fontSize === 'sm'
      ? 'text-sm'
      : fontSize === 'md'
        ? 'text-base'
        : fontSize === 'lg'
          ? 'text-xl'
          : 'text-base';

  return (
    <Container as='div' width={width === 'full' ? width : undefined}>
      <button
        onClick={handleClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={merge(`
          rounded-md flex items-center justify-center
          ${border && 'border'}
          ${height === 'sm' ? 'h-8' : height === 'md' ? 'h-10' : height === 'lg' ? 'h-12' : 'h-10'}
          ${width === 'sm' ? 'w-44' : width === 'md' ? 'w-52' : width === 'lg' ? 'w-64' : width === 'full' ? 'w-full' : 'w-auto'}
          ${padding === 'sm' ? 'p-2' : padding === 'md' ? 'p-4' : padding === 'lg' ? 'p-6' : 'px-4'}
          ${(bgColor === 'green' && 'bg-green-500') || (bgColor === 'red' && 'bg-red-400') || (!bgColor && !isDisabled && 'hover:bg-slate-100')}
          ${(isDisabled && bgColor && 'bg-opacity-70') || (isDisabled && !bgColor && 'bg-slate-50')}
          ${!isDisabled && 'hover:bg-opacity-90'}
          ${className}
        `)}
      >
        {isLoading && width ? (
          <SpinLoader className={`${textColor} ${textSize}`} />
        ) : (
          <Container as='div' flex='row'>
            {Icon && (
              <Container
                as='span'
                className={`${textDisabled} ${textColor} ${textSize}`}
              >
                <Icon />
              </Container>
            )}
            {text && (
              <Container
                as='span'
                className={`${textDisabled} ${textColor} ${textWeight} ${textSize}`}
              >
                {text}
              </Container>
            )}
          </Container>
        )}
      </button>
    </Container>
  );
};
