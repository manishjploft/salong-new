import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const signUpSchema = zfd.formData({
  password: zfd.text(z.string().min(1, "Password is required")),
  customer_email: zfd.text(z.string().email("Invalid email").min(1, "Email is required")),
  company_number: zfd.text(z.string().min(1, "Organization number is required")),
  company_name: zfd.text(z.string().min(1, "Company name is required")),
  customer_name: zfd.text(z.string().min(1, "Name is required")),
  customer_phone: zfd.text(z.string().min(1, "Phone is required")),
  address: zfd.text(z.string().min(1, "Address is required")),
  zip: zfd.text(z.string().min(1, "Zip code is required")),
  city: zfd.text(z.string().min(1, "City is required")),

  // Optional fields
  invoice_reference: zfd.text(z.string().optional()),
  notice: zfd.text(z.string().optional()),
  checkbox_marketing_status: zfd.text(z.boolean().optional()),
  checkbox_privacy_status: zfd.text(z.boolean().optional()),
  // isAgreeMarketing: zfd.text(z.string().min(1, "Agreement is required")),
});

export const changePasswordSchema = zfd.formData({
  password: zfd.text(z.string().min(1, "Password is required")),
  // current_password: zfd.text(z.string().min(1, "Password is required")),
  password_confirmation: zfd.text(z.string().min(1, "Password is required")),
});

