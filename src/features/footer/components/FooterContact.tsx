import { FC } from 'react';

interface FooterContactProps {}

export const FooterContact: FC<FooterContactProps> = ({}) => {
  return (
    <div>
      <h6 className='mb-1'>Contact</h6>
      <ContactDetails />
    </div>
  );
};

function ContactDetails() {
  return (
    <div className='bg-light-secondary rounded-lg py-2 px-4'>
      <p>(416) 259-1557</p>
      <p>orders@chasersjuice.com</p>
    </div>
  );
}
