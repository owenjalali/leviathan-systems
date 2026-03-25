import { defineConfig } from '@trigger.dev/sdk'
import { syncVercelEnvVars } from '@trigger.dev/build/extensions/core'

export default defineConfig({
  project: process.env.TRIGGER_PROJECT_REF || 'unset-project-ref',
  dirs: ['./src/trigger'],
  maxDuration: 300,
  build: {
    extensions: [syncVercelEnvVars()],
  },
  retries: {
    enabledInDev: false,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1_000,
      maxTimeoutInMs: 10_000,
      factor: 2,
      randomize: true,
    },
  },
})
