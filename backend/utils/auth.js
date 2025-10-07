import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "../db.js";
import { openAPI } from "better-auth/plugins";

process.loadEnvFile()
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db),
  plugins: [openAPI()],
});
