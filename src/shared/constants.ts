//^ PAYMENT METHOD OPTIONS
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

export const paymentMethodOptions = {
  default: 'select',
  methods: paymentMethods,
};

//^ PROVINCE SELECT OPTIONS
export const provinces: string[] = [
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

export const provinceOptions = {
  default: 'select',
  options: provinces,
};
