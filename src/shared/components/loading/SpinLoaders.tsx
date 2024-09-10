import { merge, SpinnerGap } from '@/shared/utils/ui';

type SpinLoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  width?: 'full';
  position?: 'left' | 'center' | 'right';
  padding?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  containerClassName?: string;
  spinnerClassName?: string;
};
export const SpinLoader = (props: SpinLoaderProps) => {
  const { containerClassName, spinnerClassName, ...rest } = props;

  const { width, padding, size, position, theme } = useSpinLoaderClasses({
    ...rest,
  });

  return (
    <div className={merge(`${width} ${padding} ${containerClassName}`)}>
      <SpinnerGap
        className={`animate-spin ${size} ${position} ${theme} ${spinnerClassName}`}
      />
    </div>
  );
};

function useSpinLoaderClasses(props: SpinLoaderProps) {
  const {
    size = 'md',
    width = 'none',
    position = 'center',
    padding = 'none',
    theme = 'light',
  } = props;

  const sizeMap = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const widthMap = {
    none: '',
    content: 'max-w-min',
    full: 'w-full',
  };

  const positionMap = {
    left: 'mr-auto',
    center: 'm-auto',
    right: 'ml-auto',
  };

  const paddingMap = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-9',
  };

  const themeMap = {
    light: 'text-gray-800',
    dark: 'text-white',
  };

  const classMap = {
    size: sizeMap[size],
    width: widthMap[width],
    padding: paddingMap[padding],
    position: positionMap[position],
    theme: themeMap[theme],
  };

  return classMap;
}

export const useSpinLoader = (props: SpinLoaderProps) => {
  const Loader = () => <SpinLoader {...props} />;
  return { SpinLoader: Loader };
};
