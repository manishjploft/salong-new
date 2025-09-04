import { betterFetch } from '@/utils/betterFetch.util';
import { action } from '@/utils/safeAction.util';

import { forgotPasswordSchema, resetPasswordSchema } from './password.schema';

export const resetPassword = action(resetPasswordSchema, async (data) => {
  try {
    const { password, confirmPassword, token } = data;
    if (password !== confirmPassword) {
      return {
        message: "Passwords do not match",
      };
    }

    return await betterFetch("/api/password/reset", {
      method: "POST",
      body: {
        token,
        password,
      },
    });
  } catch (error) {
    return error;
  }
});

export const forgotPassword = action(forgotPasswordSchema, async (data) => {
  try {
    const { email } = data;
    return await betterFetch("/api/password/forgot", {
      body: { email },
      method: "POST",
    });
  } catch (error) {
    return error;
  }
});
