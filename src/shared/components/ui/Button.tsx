import { IconType } from 'react-icons';
import { Container, ContainerProps } from './Container';
import { merge } from '@/utils/styles';
import { SpinLoader } from './SpinLoader';

export const Button = ({
  text,
  Icon,
  className,
  width,
  padding,
  rounded,
  textColor,
  textSize,
  bg,
  isLoading,
}: {
  text: string;
  Icon?: IconType;
  className?: string;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
  padding?: ContainerProps['padding'];
  rounded?: ContainerProps['rounded'];
  textColor?: 'white' | 'black';
  textSize?: 'sm' | 'md' | 'lg';
  bg?: 'green' | 'translucent';
  isLoading?: boolean;
}) => {
  return (
    <button
      className={merge(`
        hover:bg-opacity-90 
        ${width === 'xs' ? 'max-w-[5rem] w-full' : width === 'sm' ? 'max-w-[8rem] w-full' : width === 'md' ? 'max-w-[12rem] w-full' : width === 'lg' ? 'max-w-[15rem] w-full' : width === 'full' ? 'w-full' : 'w-fit'}
        ${padding === 'sm' ? 'p-2 px-4' : padding === 'md' ? 'p-4 px-6' : padding === 'lg' ? 'p-6 px-8' : 'p-0'}
        ${rounded === 'sm' ? 'rounded-md' : rounded === 'md' ? 'rounded-lg' : rounded === 'lg' ? 'rounded-xl' : 'rounded-md'}
        ${bg === 'green' ? 'bg-green-500' : bg === 'translucent' ? 'bg-none border' : 'bg-green-500'}
        ${className}
      `)}
    >
      <Container as='div' flex='row' flexCenter={true} width='full'>
        {Icon && !isLoading && (
          <Container as='span'>
            <Icon
              className={`
                ${textColor === 'white' ? 'text-white' : textColor === 'black' ? 'text-black' : ''}
                ${textSize === 'sm' ? 'text-base' : textSize === 'md' ? 'text-lg' : textSize === 'lg' ? 'text-xl' : ''}
                ${bg === 'translucent' && 'text-black'}
                `}
            />
          </Container>
        )}
        {isLoading && (
          <SpinLoader
            className={`
              ${textColor === 'white' ? 'text-white' : textColor === 'black' ? 'text-black' : ''}
              ${textSize === 'sm' ? 'text-base' : textSize === 'md' ? 'text-lg' : textSize === 'lg' ? 'text-xl' : ''}
              ${bg === 'translucent' && 'text-black'}
              `}
          />
        )}
        <Container
          as='span'
          className={`
            ${textColor === 'white' ? 'text-white' : textColor === 'black' ? 'text-black' : ''}
            ${textSize === 'sm' ? 'text-base' : textSize === 'md' ? 'text-lg' : textSize === 'lg' ? 'text-xl' : ''}
            ${bg === 'translucent' && 'text-black'}
              `}
        >
          {text}
        </Container>
      </Container>
    </button>
  );
};
