export const defaultSettings = {
  shippingCost: process.env.NEXT_PUBLIC_STORE_SETTINGS_SHIPPING_PRICE,
  freeShippingOver: process.env.NEXT_PUBLIC_STORE_SETTINGS_FREE_SHIPPING_OVER,
  estimatedDelivery: process.env.NEXT_PUBLIC_STORE_SETTINGS_ESTIMATED_DELIVERY,
  isVAT: process.env.NEXT_PUBLIC_STORE_SETTINGS_IS_VAT === 'true'
}