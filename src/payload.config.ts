// storage-adapter-import-placeholder
import nodemailer from 'nodemailer'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Snacks } from './collections/Snacks'
import { Orders } from './collections/Orders'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const getServerSideURL = () => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return url
}

export default buildConfig({
  admin: {
    components: {
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/before-dashboard'],
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: getServerSideURL(),
  cors: [getServerSideURL()].filter(Boolean) as string[],
  collections: [Users, Media, Snacks, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    // When set to undefined or true, Payload will automatically push DB
    // changes in dev environment.
    push: process.env.DYAD_DISABLE_DB_PUSH === 'true' ? false : undefined,
  }),
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: process.env.GMAIL_USER || '',
    defaultFromName: process.env.EMAIL_DEFAULT_FROM_NAME || 'Dyad app',
    transport: await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    }),
  }),
})
