import { ContentWrapper, Layout, Text } from '@/shared/components/containers';
import { UiFeatureLayout } from '../UiFeatureLayout';

export const Containers = () => {
  return (
    <UiFeatureLayout title='Containers'>
      <div>
        <Text>Text P</Text>
        <Text>Text P</Text>
        <Text as='span'>Text Span</Text>
        <Text as='span'>Text Span</Text>
      </div>

      <div className='flex gap-3'>
        <ContentWrapper padding='lg' className='border'>
          <p>Content 1</p>
          <p>Content 2</p>
        </ContentWrapper>
        <ContentWrapper padding='lg' flex='row' className='border'>
          <p>Content 1</p>
          <p>Content 2</p>
        </ContentWrapper>
      </div>

      <Layout
        heading='h3'
        title='Foobar'
        padding='lg'
        contentPadding='lg'
        className='border'
      >
        Layout component
      </Layout>
    </UiFeatureLayout>
  );
};
