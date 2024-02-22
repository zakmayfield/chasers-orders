import * as fs from 'fs';
import products_original from './products-original.json';

type TransformedItem = {
  name: string;
  category: string;
  units: {
    size: string;
    price: number;
    code: string;
  }[];
};

// parse and write original product data to new json structure
function parseAndWriteData(dataArray: any) {
  // transform data to proper JSON
  const transformedData = transformInitialData(dataArray);
  // remove exact object dupes
  const deduped = removeDupes(transformedData);
  // merge products & units ensuring category consistency thus eliminating shallow duplicates
  const merged = mergeMisconfiguredProducts(deduped);

  writeToFile(merged, 'prisma/products-final.json');
}

function writeToFile(data: TransformedItem[], fileName: string) {
  const jsonString = JSON.stringify(data, null, 2);

  fs.writeFile(fileName, jsonString, (err: any) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.info('Data has been written to', fileName);
    }
  });
}

function transformInitialData(data: any) {
  const transformedData = [];

  for (const item of data) {
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

  return transformedData;
}

function removeDupes(items: TransformedItem[]): TransformedItem[] {
  const seenItems = new Set<string>();
  const uniqueItems: TransformedItem[] = [];

  for (const item of items) {
    const itemString = JSON.stringify(item); // Stringify for reliable comparison
    if (!seenItems.has(itemString)) {
      seenItems.add(itemString);
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
}

function mergeMisconfiguredProducts(
  items: TransformedItem[]
): TransformedItem[] {
  const mergedItems: TransformedItem[] = [];
  const productMap = new Map<string, TransformedItem>();

  for (const item of items) {
    const normalizedName = item.name.toLowerCase().split('-').sort().join('-'); // Normalize name for comparison
    const categoryKey = `${normalizedName}-${item.category}`;

    let existingProduct = productMap.get(categoryKey);

    if (existingProduct) {
      // Merge units, ensuring no duplicates
      existingProduct.units = mergeUniqueUnits(
        existingProduct.units,
        item.units
      );
    } else {
      productMap.set(categoryKey, item);
      mergedItems.push(item);
    }
  }

  return mergedItems;
}

function mergeUniqueUnits(
  units1: { size: string; price: number; code: string }[],
  units2: { size: string; price: number; code: string }[]
): { size: string; price: number; code: string }[] {
  const uniqueSizes = new Set<string>();
  const mergedUnits: { size: string; price: number; code: string }[] = [];

  for (const unit of units1) {
    if (!uniqueSizes.has(unit.size)) {
      uniqueSizes.add(unit.size);
      mergedUnits.push(unit);
    }
  }

  for (const unit of units2) {
    if (!uniqueSizes.has(unit.size)) {
      uniqueSizes.add(unit.size);
      mergedUnits.push(unit);
    }
  }

  // arragne units by size: [1L, 2L, 355ml, 500ml, 20L]
  const sizeOrder = ['1L', '2L', '355ml', '500ml', '20L'];

  // Sort the mergedUnits array based on the sizeOrder
  mergedUnits.sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a.size);
    const bIndex = sizeOrder.indexOf(b.size);

    // Ensure consistent sorting even for sizes not in the sizeOrder array
    if (aIndex === -1 && bIndex !== -1) return 1;
    if (aIndex !== -1 && bIndex === -1) return -1;

    return aIndex - bIndex;
  });

  return mergedUnits;
}

parseAndWriteData(products_original);
