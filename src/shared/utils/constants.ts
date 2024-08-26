export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
export const GMAIL_USERNAME = process.env.GMAIL_USERNAME;
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const paymentMethods = [
  {
    key: 1,
    value: 'Cash on delivery',
  },
  {
    key: 2,
    value: 'Credit card',
  },
  {
    key: 3,
    value: 'Pay on pick up',
  },
];

const provinces: string[] = [
  'AB', // Alberta
  'BC', // British Columbia
  'MB', // Manitoba
  'NB', // New Brunswick
  'NL', // Newfoundland and Labrador
  'NT', // Northwest Territories
  'NS', // Nova Scotia
  'NU', // Nunavut
  'ON', // Ontario
  'PE', // Prince Edward Island
  'QC', // Quebec
  'SK', // Saskatchewan
  'YT', // Yukon Territory
];

export const paymentMethodOptions = {
  default: 'select',
  methods: paymentMethods,
};

export const provinceOptions = {
  default: 'select',
  options: provinces,
};

export const categories: string[] = [
  'blends',
  'singles',
  'lemonades',
  'limonades',
  'ice pops',
  'tea',
  'mojito',
  'chili peppers',
  'ciders',
  'dried',
  'garnish',
  'nut milks',
  'organic',
  'purees',
  'smoothies',
  'syrups',
  'vegetables',
  'zest',
  'mocktail',
  'cleanses',
  'wholesale',
];
