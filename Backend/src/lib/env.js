import "dotenv/config";

export const ENV = {
  PORT: Proces.env.PORT,
  MONGO_URI: Proces.env.MONGO_URI,
  JWT_SECRET: Proces.env.JWT_SECRET,
  NODE_ENV: Proces.env.NODE_ENV,
  CLIENT_URL: Proces.env.CLIENT_URL,
  RESEND_API_KEY: Proces.env.RESEND_API_KEY,
  EMAIL_FROM: Proces.env.EMAIL_FROM,
  EMAIL_FROM_NAME: Proces.env.EMAIL_FROM_NAME,
};
