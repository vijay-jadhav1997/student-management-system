import { z } from "zod"
import dotenv from "dotenv"

dotenv.config() 

// zod schema - environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("8080"),
  MONGO_URL: z.string().url("MONGO_URL must be a valid MongoDB connection string"),
  DB: z.string(),
  CLIENT: z.string().url("CLIENT must be a valid URL"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  DOMAIN: z.string().optional(),
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error("Invalid environment configuration:", env.error.issues)
  process.exit(1) 
}

// typed config object
export const config = {
  nodeEnv: env.data.NODE_ENV,
  port: Number(env.data.PORT),
  mongoUri: `${env.data.MONGO_URL}/${env.data.DB}`,
  clientUrl: env.data.CLIENT,
  jwtSecret: env.data.JWT_SECRET,
  domain: env.data.DOMAIN,
}
