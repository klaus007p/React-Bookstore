import { Client, Account, ID } from 'appwrite';  // From Appwrite SDK docs to setup authentication without creating external backend server


const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Appwrite Cloud or self-hosted endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Replace with your Appwrite Project ID

export const account = new Account(client);
export { ID };
