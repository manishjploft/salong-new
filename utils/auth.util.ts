import { jwtVerify, SignJWT } from "jose";
import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: any;
      email: string | null | undefined; // Allow null or undefined for email
      role?: any;
      accessToken?: any;
      primaryAddressId?: string;
      organizationNumber?: any;
      // Add other fields as necessary
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string;
    accessToken?: any;
    primaryAddressId?: string;
    organizationNumber?: string;
    customer_name?: string;
    // Add other fields as necessary
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your@email.com" },
        phone: { label: "Phone", type: "tel", placeholder: "number" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const { email, password, phone } = credentials;

        try {
          let response;
          if (email && password) {
            response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({ email: email, password }),
            });
          } else {
            response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}verify-otp`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ phone: phone, otp: password }),
              }
            );
          }
          const data = await response.json();
          if (!response.ok) {
            console.error("Login API response error", response.status);
            throw new Error(data.error || data.msg || "Invalid credentials");
          }

          //console.log("dataaaaaa", data);

          if (data.access_token && data.data) {
            return {
              email: data.data.email,
              role: data.data.role, // add any additional properties as needed
              id: data.data._id,
              accessToken: data.access_token,
              organizationNumber: data.data.customer_number,
            };
          }

          return null;
        } catch (error: any) {
          console.error("Error during login", error);
          throw new Error(error.message || "An error occurred during login");
        }
      },
    }),
  ],
  pages: {
    signIn: "/logg-inn",
    error: "/logg-inn",
  },
  session: {
    strategy: "jwt", // This determines how the session is stored (JWT or database)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken; // Add accessToken to the JWT
        token.id = user.id;
        token.name = user.customer_name;
        token.organizationNumber = user.organizationNumber;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      session.user.organizationNumber = token.organizationNumber;
      return session;
    },
  },
};

export const auth = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
