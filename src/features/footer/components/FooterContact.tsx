import { FC } from 'react';

interface FooterContactProps {}

export const FooterContact: FC<FooterContactProps> = ({}) => {
  return (
    <div className='bg-light-secondary rounded-lg p-2'>
      <p>(416) 259-1557</p>
      <p>orders@chasersjuice.com</p>
    </div>
  );
};
