import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const resetPasswordSchema = zfd.formData({
  password: zfd.text(z.string()),
  confirmPassword: zfd.text(z.string()),
  token: zfd.text(z.string()),
});

export const forgotPasswordSchema = zfd.formData({
  email: zfd.text(z.string()),
});
