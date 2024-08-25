import Link from 'next/link';

interface FormSwitchLinkProps {
  formType: 'sign-in' | 'sign-up';
}

const FormSwitchLink: React.FC<FormSwitchLinkProps> = ({ formType }) => {
  return (
    <div className='form-switch-link'>
      {formType === 'sign-in' ? (
        <SwitchLink
          label='Need to create an account?'
          content='Sign Up Here'
          path='/sign-up'
        />
      ) : (
        <SwitchLink
          label=' Prefer to sign in?'
          content='Log In Here'
          path='/'
        />
      )}
    </div>
  );
};

type SwitchLinkProps = {
  label: string;
  content: string;
  path: string;
};

function SwitchLink({ label, content, path }: SwitchLinkProps) {
  return (
    <div className='text-center mt-12'>
      <p className='text-sm'>
        {label}{' '}
        <Link href={path} className='text-sm underline'>
          {content}
        </Link>
      </p>
    </div>
  );
}

export default FormSwitchLink;
