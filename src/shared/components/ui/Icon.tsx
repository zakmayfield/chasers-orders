import { Container, ContainerProps } from '@/shared/components/ui';
import { IconType } from 'react-icons';

export const Icon = ({
  IconData,
  iconClass,
  containerClass,
  width,
  padding,
  flex,
  flexCenter,
}: {
  IconData: IconType;
  iconClass?: string;
  containerClass?: string;
  width?: ContainerProps['width'];
  padding?: ContainerProps['padding'];
  flex?: ContainerProps['flex'];
  flexCenter?: ContainerProps['flexCenter'];
}) => {
  return (
    <Container
      as='div'
      width={width}
      padding={padding}
      flex={flex}
      flexCenter={flexCenter}
      className={containerClass}
    >
      <IconData className={iconClass} />
    </Container>
  );
};
