export interface DuellCustomer {
  customer_id: string;
  company_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  ref: string | null;
  comment: string;
  tagget: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  is_active: boolean;
  is_deleted: boolean;
  checkbox_marketing_status: boolean;
  checkbox_marketing_datetime: string;
  checkbox_marketing_description: string;
  checkbox_privacy_status: boolean;
  checkbox_privacy_datetime: string;
  checkbox_privacy_description: string;
  checkbox_terms_status: boolean;
  checkbox_terms_datetime: string;
  checkbox_terms_description: string;
  created_at: string;
  updated_at: string;
  additional_addresses: {
    address_id: string;
    address: string;
    zip: string;
    city: string;
    latitude: string;
    longitude: string;
  }[];
  customer_groups: {
    customer_group_id: string;
    customer_group_name: string;
    description: string | null;
    discount_percentage: string;
    is_default: boolean;
    use_pricelist: boolean;
    category_discount: {
      service?: {
        category_id: string;
        discount_percentage: string;
      }[];
      product?: {
        category_id: string;
        discount_percentage: string;
      }[];
    };
  }[];
  contact_persons: {
    id: string;
    name: string;
    country: string;
    phone: string;
    email: string;
  }[];
  cashpoint: {
    customer_id: string;
    point_balance: string;
    balance_updated_at: string;
    last_reminder_send_at: string;
  }[];
}

export interface DuellCustomers {
  [key: string]: DuellCustomer;
}
