import * as z from "zod";

export const OrderItemAddSchema = z.object({
  delivery_address: z.object({
    address: z.string(),
    zip: z.string(),
    city: z.string(),
  }),
  contact_person: z.object({
    contact_person_name: z.string(),
    contact_person_email: z.string(),
    contact_person_phone: z.string(),
  }),
});

export const CartItemRemoveSchema = z.object({
  cartItemId: z.string(),
  // isAll: z.number().optional(),
});

export const CartItemUpdateSchema = z.object({
  cartItemId: z.string(),
  newQuantity: z.number(),
});

export type OrderItemAdd = z.infer<typeof OrderItemAddSchema>;
export type OrderItemRemove = z.infer<typeof CartItemRemoveSchema>;
export type OrderItemUpdate = z.infer<typeof CartItemUpdateSchema>;
