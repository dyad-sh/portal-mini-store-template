import type { CollectionConfig } from 'payload'
import { adminsOrSelf, anyone, checkRole } from './access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: (data) => {
        const resetPasswordURL = `${data?.req?.payload.config.serverURL}/reset-password?token=${data?.token}`

        return `
          <!doctype html>
          <html>
            <body>
            You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process: ${resetPasswordURL} If you did not request this, please ignore this email and your password will remain unchanged.
              
            </body>
          </html>
        `
      },
    },
  },
  access: {
    create: anyone, // Allow anyone to create a user account (for registration)
    read: adminsOrSelf, // Allow users to read their own profile, admins can read all
    update: adminsOrSelf, // Allow users to update their own profile, admins can update all
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      defaultValue: 'user',
      required: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    // Email added by default
    // Add more fields as needed
  ],
}
