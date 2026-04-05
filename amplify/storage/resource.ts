import { defineStorage } from '@aws-amplify/backend';

export const users = defineStorage({
  name: 'users',
  access: (allow) => ({
    'users/{phonenumber}/*': [
      allow.guest.to(['read', 'write', 'delete']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ]}),
});