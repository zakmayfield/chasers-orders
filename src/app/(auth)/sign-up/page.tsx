import SignUp from '@/features/auth/SignUp';
import GridContainer from '@/features/ui/layout/GridContainer';

export default function Page() {
  return (
    <GridContainer cols={12}>
      <SignUp />
    </GridContainer>
  );
}
