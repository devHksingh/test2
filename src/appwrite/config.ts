import { Client, Databases } from 'appwrite'

const client = new Client()

// client.setEndpoint(`${import.meta.env.VITE_PUBLIC_ENDPOINT}`);
// client.setProject(`${import.meta.env.VITE_PUBLIC_PROJECT_ID}`);
client
    .setEndpoint(import.meta.env.VITE_PUBLIC_ENDPOINT)
    .setProject(import.meta.env.VITE_PUBLIC_PROJECT_ID);

const databases = new Databases(client)

export { client, databases }