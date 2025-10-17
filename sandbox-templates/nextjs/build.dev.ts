import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') })

import { Template, defaultBuildLogger } from 'e2b'
import { template } from './template'

async function main() {
  await Template.build(template, {
    alias: 'vortex-ai-dev',
    onBuildLogs: defaultBuildLogger(),
  });
}

main().catch(console.error);