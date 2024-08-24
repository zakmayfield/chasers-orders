import { Container } from '@/shared/components/ui';
import { UiFeatureLayout } from '../UiFeatureLayout';
import { Btn } from '@/shared/components/ui/Btn';

export const Btns = () => {
  return (
    <UiFeatureLayout title='Btns'>
      <Container as='div' flex='row'>
        <Btn />
      </Container>
    </UiFeatureLayout>
  );
};
