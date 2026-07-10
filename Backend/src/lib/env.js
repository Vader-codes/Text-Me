import "dotenv/config";

export const ENV = {
  PORT: Process.env.PORT,
  MONGO_URI: Process.env.MONGO_URI,
  JWT_SECRET: Process.env.JWT_SECRET,
  NODE_ENV: Process.env.NODE_ENV,
  CLIENT_URL: Process.env.CLIENT_URL,
  RESEND_API_KEY: Process.env.RESEND_API_KEY,
  EMAIL_FROM: Process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: Process.env.EMAIL_FROM_NAME,
};
