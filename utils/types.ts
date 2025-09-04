export type NewCustomerInfo = {
  id: number;
  date: string;
  organization_number: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
};

export type OrderListItem = {
  id: number;
  customerid: number;
  date: string;
  organizationnumber: number;
  ordernumber: string;
  status: string;
  contactname: string;
  contactemail: string;
  deliveryadress: string;
  deliveryzip: number;
  deliverycity: string;
  deliverycountry: string;
  orderitems: [];
  totalprice: number;
};
export type AddressItem = {
  id: number;
  address: string;
  zip: number;
  city: string;
};
export type MainAddressItem = {
  id: number;
  primary_address: string;
  primary_zip: number;
  city: string;
};
