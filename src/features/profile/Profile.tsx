import { Company } from '@prisma/client';
import Link from 'next/link';

export default function Profile({ company }: { company: Company }) {
  return (
    <div>
      <h1>Profile</h1>

      <div>
        <h2>Company Information</h2>
        {company && (
          <div>
            <p>{company.name}</p>
          </div>
        )}

        <div>
          <Link href='/profile/edit'>Edit Company</Link>
        </div>
      </div>
    </div>
  );
}
