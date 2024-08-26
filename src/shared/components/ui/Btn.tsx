'use client';
import { IconType } from 'react-icons';
import { Container } from './Container';
import { merge } from '@/shared/utils/ui';
import { SpinLoader } from './SpinLoader';
import { useButtonClasses } from '@/shared/hooks/utils';

export type BtnStyleProps = {
  isDisabled?: boolean;
  border?: boolean;
  width?: 'sm' | 'md' | 'lg' | 'full';
  height?: 'sm' | 'md' | 'lg';
  padding?: 'sm' | 'md' | 'lg';
  bgColor?: 'green' | 'red';
  fontWeight?: 'normal' | 'bold';
  fontSize?: 'sm' | 'md' | 'lg';
  className?: string;
};

type BtnProps = BtnStyleProps & {
  type?: 'button' | 'reset' | 'submit';
  text?: string;
  isLoading?: boolean;
  Icon?: IconType;
  handleClick?(): void;
};

export const Btn = (props: BtnProps) => {
  const { text, isDisabled, isLoading, width, Icon, handleClick } = props;
  const { buttonClasses, contentClasses } = useButtonClasses({ ...props });

  return (
    <Container as='div' width={width === 'full' ? width : undefined}>
      <button
        onClick={handleClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={merge(buttonClasses)}
      >
        {isLoading && width ? (
          <SpinLoader
            className={merge(`${contentClasses} text-opacity-100 text-xl`)}
          />
        ) : (
          <Container as='div' flex='row'>
            {Icon && (
              <Container as='span' className={contentClasses}>
                <Icon />
              </Container>
            )}
            {text && (
              <Container as='span' className={contentClasses}>
                {text}
              </Container>
            )}
          </Container>
        )}
      </button>
    </Container>
  );
};
