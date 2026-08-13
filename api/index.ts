import type { Request, Response } from 'express';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { createApp } = require('../dist/server.cjs') as typeof import('../server.js');

let appPromise: ReturnType<typeof createApp> | undefined;

export default async function handler(req: Request, res: Response) {
  appPromise ??= createApp();
  const app = await appPromise;
  return app(req, res);
}
