import { Container, Heading } from '@/shared/components/ui';
import {
  ArrowCircleRightDuotone,
  ArrowRight,
  CartIcon,
  CheckCircleDuotone,
  CheckIcon,
  DownArrow,
  EmptyCartIcon,
  FacebookDuotone,
  FacebookIcon,
  HeartDuotoneIcon,
  HeartOutlineIcon,
  HouseDuotone,
  InfoDuotone,
  InstagramDuotone,
  InstagramIcon,
  ShopIcon,
  SpinnerGap,
  SpinnerIcon,
  StoreIcon,
  TrashDuotone,
  TrashIcon,
  WarningCircleIcon,
  WarningIcon,
  WarningTriangleDuotone,
  XBoldIcon,
  XCircleDuotone,
  XIcon,
} from '@/shared/utils/ui';

export const Icons = () => {
  return (
    <Container as='div' flex='col'>
      <h1 className='border-b'>Icons</h1>

      <Container as='div' flex='col'>
        <Container as='div' flex='col'>
          <Heading as='h3' content='Duotone' />
          <Container as='div' flex='row'>
            <ArrowCircleRightDuotone />
            <CheckCircleDuotone />
            <FacebookDuotone />
            <HeartDuotoneIcon />
            <HouseDuotone />
            <InfoDuotone />
            <InstagramDuotone />
            <TrashDuotone />
            <WarningCircleIcon />
            <WarningTriangleDuotone />
            <XCircleDuotone />
          </Container>
        </Container>

        <Container as='div' flex='col'>
          <Heading as='h3' content='Other' />
          <Container as='div' flex='row'>
            <SpinnerGap />
          </Container>
        </Container>

        {/* <ArrowRight />
        <CartIcon />
        <CheckIcon />
        <DownArrow />
        <EmptyCartIcon />
        <FacebookIcon />
        <HeartDuotoneIcon />
        <HeartOutlineIcon />
        <InstagramIcon />
        <ShopIcon />
        <StoreIcon />
        <SpinnerIcon />
        <TrashIcon />
        <WarningCircleIcon />
        <WarningIcon />
        <XBoldIcon />
        <XIcon /> */}
      </Container>
    </Container>
  );
};
