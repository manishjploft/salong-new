import * as z from 'zod';



export const CartItemAddSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export const CartItemRemoveSchema = z.object({
  cartItemId: z.string(),
  // isAll: z.number().optional(),
});

export const CartItemUpdateSchema = z.object({
  cartItemId: z.string(),
  newQuantity: z.number(),
});

export type CartItemAdd = z.infer<typeof CartItemAddSchema>;
export type CartItemRemove = z.infer<typeof CartItemRemoveSchema>;
export type CartItemUpdate = z.infer<typeof CartItemUpdateSchema>;
