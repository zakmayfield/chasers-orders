import { Company as CompanyType } from '@prisma/client';
import Link from 'next/link';

type CompanyProps = {
  company: CompanyType | null;
};

const Company: React.FC<CompanyProps> = ({ company }) => {
  return (
    <div>
      <div>
        <h2>Company Information</h2>
        {company && (
          <div>
            <p>{company?.name}</p>
          </div>
        )}

        <div>
          <Link href='/profile/edit'>Edit Company</Link>
        </div>
      </div>
    </div>
  );
};

export default Company;
