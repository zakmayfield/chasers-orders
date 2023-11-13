import * as fs from 'fs';
import products_original from './products1.json';
import type { Unit } from '@prisma/client';

type TransformedItem = {
  name: string;
  category: string;
  units: Omit<Unit, 'productId' | 'id'>[];
};

// parse and write original product data to new json structure
function parseData(dataArray: any) {
  const transformedData = [];

  for (const item of dataArray) {
    const transformedItem: TransformedItem = {
      name: item.name,
      category: item.category,
      units: [],
    };

    for (let i = 1; i <= 5; i++) {
      /**
       * The original product data sizes are called `unit1`, `unit2` ect.
       * hence why `sizeKey` has a value of `unit{{ index }}`
       */
      const sizeKey = `unit${i}`;
      const priceKey = `price${i}`;
      const codeKey = `code${i}`;

      if (item[sizeKey] && item[priceKey] !== null && item[codeKey]) {
        transformedItem.units.push({
          size: item[sizeKey],
          price: item[priceKey],
          code: item[codeKey],
        });
      }
    }

    transformedData.push(transformedItem);
  }

  writeToFile(transformedData, 'prisma/products.json');

  return transformedData;
}

function writeToFile(data: TransformedItem[], fileName: string) {
  const jsonString = JSON.stringify(data, null, 2);

  fs.writeFile(fileName, jsonString, (err: any) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data has been written to', fileName);
    }
  });
}

const transformedData = parseData(products_original);
// console.log(JSON.stringify(transformedData, null, 2));
