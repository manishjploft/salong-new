import { z } from 'zod';

export const updateCustomerSchema = z.object({
  id: z.string(),
  externalId: z.string().optional(),
  organizationNumber: z.string().optional(),
  name: z.string().optional(),
  contact: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  zip: z.string().optional(),
  city: z.string().optional(),
  kundeGruppe: z.string().optional(),
});
