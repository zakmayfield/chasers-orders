import { ProductsTemplate } from '@/features/templates/ProductsTemplate';
import { Table } from './components/table';

export default async function Page() {
  return (
    <div>
      {/* <Table /> */}
      <ProductsTemplate />
    </div>
  );
}
