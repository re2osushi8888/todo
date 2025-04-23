import { zodToOpenAPI } from 'nestjs-zod';
import { z } from 'zod';

const SignUpSchema = z.object({
  username: z.string().min(8).max(20),
  password: z.string().min(8).max(20),
  sex: z
    .enum(['male', 'female', 'nonbinary'])
    .describe('We respect your gender choice'),
  social: z.record(z.string().url()),
});

const openapi = zodToOpenAPI(SignUpSchema);

console.log(openapi);
