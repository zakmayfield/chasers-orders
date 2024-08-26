//^ Sign Up
export const defaultSignUpFormValues = {
  email: '',
  password: '',
  contactName: '',
  contactPosition: '',
  contactPhoneNumber: '',
  companyName: '',
  accountPayableEmail: '',
  paymentMethod: '',
  shippingStreetAddress: '',
  shippingUnit: '',
  shippingCity: '',
  shippingState: '',
  shippingPostalCode: '',
  deliveryInstructions: '',
  billingStreetAddress: '',
  billingUnit: '',
  billingCity: '',
  billingState: '',
  billingPostalCode: '',
};

export type Key =
  | 'email'
  | 'password'
  | 'contactName'
  | 'contactPhoneNumber'
  | 'companyName'
  | 'accountPayableEmail'
  | 'paymentMethod'
  | 'shippingStreetAddress'
  | 'shippingUnit'
  | 'shippingCity'
  | 'shippingState'
  | 'shippingPostalCode'
  | 'billingStreetAddress'
  | 'billingUnit'
  | 'billingCity'
  | 'billingState'
  | 'billingPostalCode';

interface IRequiredFields {
  [step: string]: Key[];
}

export const requiredSignUpFormValues: IRequiredFields = {
  '1': ['email', 'password'],
  '2': ['contactName', 'contactPhoneNumber'],
  '3': ['companyName', 'paymentMethod'],
  '4': [
    'shippingStreetAddress',
    'shippingCity',
    'shippingState',
    'shippingPostalCode',
    'billingStreetAddress',
    'billingCity',
    'billingState',
    'billingPostalCode',
  ],
};

//^ Sign In
export const defaultSignInFormValues = {
  email: '',
  password: '',
};

//^ User
export const defaultDeliveryInstructionsFormValues = {
  deliveryInstructions: '',
};

//^ Cart
export const defaultQuantityFormValues = {
  quantity: '',
};
