import Link from 'next/link';

const Company = () => {
  return (
    <div>
      <div>
        <h2>Company Information</h2>
        <div>
          <Link href='/dashboard/edit'>Edit Company</Link>
        </div>
      </div>
    </div>
  );
};

export default Company;
