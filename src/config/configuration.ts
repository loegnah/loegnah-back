import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
});

export const initConfig = () => {
  const env = envSchema.parse(process.env);
  return {
    port: env.PORT,
  };
};

export type Env = ReturnType<typeof initConfig>;
export type ConfigSrvEnv = ConfigService<Env, true>;
