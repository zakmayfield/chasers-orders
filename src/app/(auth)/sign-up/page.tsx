import SignUp from '@/features/auth/SignUp';
import GridContainer from '@/features/ui/layout/GridContainer';

export default function Page() {
  return (
    <main>
      <GridContainer cols={12}>
        <SignUp />
      </GridContainer>
    </main>
  );
}
