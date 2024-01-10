import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  TELEGRAM_BOT_TOKEN: z.string(),
});

export const initConfig = () => {
  const env = envSchema.parse(process.env);
  return {
    port: env.PORT,
    telegramBotToken: env.TELEGRAM_BOT_TOKEN,
  };
};

export type Env = ReturnType<typeof initConfig>;
export type ConfigSrvEnv = ConfigService<Env, true>;
