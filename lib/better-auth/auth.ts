
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import mongoose from "mongoose";
import type { Db } from "mongodb";

import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

// Define the factory first so TypeScript can infer its exact return type.
function createAuth(db: Db) {
  return betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
    },
    plugins: [nextCookies()],
  });
}

// Infer the exact type from your configured Better Auth instance.
type AuthInstance = ReturnType<typeof createAuth>;

let authInstance: AuthInstance | null = null;

export async function getAuth(): Promise<AuthInstance> {
  // Return the existing instance if available.
  if (authInstance) {
    return authInstance;
  }

  // Connect to MongoDB.
  await connectToDatabase();

  // Retrieve the native MongoDB database.
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("MongoDB connection is not available.");
  }

  // Initialize and cache Better Auth.
  authInstance = createAuth(db);

  return authInstance;
}

export const auth = await getAuth();