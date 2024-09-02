import { ProductsTemplate } from '@/features/products/templates/ProductsTemplate';
import { Table } from './components/table';

export default async function Page() {
  return (
    <div>
      {/* <Table /> */}
      <ProductsTemplate />
    </div>
  );
}
