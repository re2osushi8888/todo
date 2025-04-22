import 'zod-openapi/extend';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { createDocument } from 'zod-openapi';

import { stringify } from 'yaml';

const jobId = z.string().openapi({
  description: 'A unique identifier for a job',
  example: '12345',
  ref: 'jobId',
});

const title = z.string().openapi({
  description: 'Job title',
  example: 'My job',
});

const document = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'My API',
    version: '1.0.0',
  },
  paths: {
    '/jobs/{jobId}': {
      put: {
        requestParams: { path: z.object({ jobId }) },
        requestBody: {
          content: {
            'application/json': { schema: z.object({ title }) },
          },
        },
        responses: {
          '200': {
            description: '200 OK',
            content: {
              'application/json': { schema: z.object({ jobId, title }) },
            },
          },
        },
      },
    },
  },
});

const yaml = stringify(document, { aliasDuplicateObjects: false });

// eslint-disable-next-line no-sync
fs.writeFileSync(path.join(__dirname, 'openapi.yml'), yaml);
