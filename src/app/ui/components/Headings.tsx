import { Heading } from '@/shared/components/ui';
import { UiFeatureLayout } from '../UiFeatureLayout';

export const Headings = () => {
  return (
    <UiFeatureLayout title='Headings' flex='col'>
      <Heading as='h1' content='Title: h1' />
      <Heading as='h2' content='Title: h2' />
      <Heading as='h3' content='Title: h3' />
      <Heading as='h4' content='Title: h4' />
      <Heading as='h5' content='Title: h5' />
      <Heading as='h6' content='Title: h6' />
    </UiFeatureLayout>
  );
};
