import SignUp from '@/features/auth/SignUp';
import GridContainer from '@/features/shared/GridContainer';

export default function Page() {
  return (
    <GridContainer cols={12}>
      <SignUp />
    </GridContainer>
  );
}
