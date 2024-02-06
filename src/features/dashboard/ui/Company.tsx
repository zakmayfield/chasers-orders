import { Company as CompanyType } from '@prisma/client';
import Link from 'next/link';

const Company = () => {
  return (
    <div>
      <div>
        <h2>Company Information</h2>
        {/* {company && (
          <div>
            <p>{company?.name}</p>
          </div>
        )} */}

        <div>
          <Link href='/dashboard/edit'>Edit Company</Link>
        </div>
      </div>
    </div>
  );
};

export default Company;
