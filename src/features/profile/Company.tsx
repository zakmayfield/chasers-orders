import { Company } from '@prisma/client';
import Link from 'next/link';

export default function Company({ company }: { company: Company | null }) {
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
}
