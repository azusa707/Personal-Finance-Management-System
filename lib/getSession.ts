// lib/getSession.ts
import { NextApiRequest } from 'next';

// Define a specific type for session or user data
interface User {
  name: string;
  // Add more fields as needed
}

// Define a specific type for the session response
interface Session {
  user: User;
}

// Adjust the return type of getSession function
export async function getSession(req: NextApiRequest): Promise<Session | null> {
  const token = req.cookies['auth-token']; // Adjust based on how you store authentication tokens

  if (!token) {
    return null;
  }

  // Validate the token and get user data
  const user = await validateToken(token);
  return user ? { user } : null;
}

// Adjust the return type of validateToken function
async function validateToken(token: string): Promise<User | null> {
  // Example function to validate token
  // Replace this with your actual validation logic
  if (token === 'valid-token') {
    return { name: 'User' }; // Example user data
  }
  return null;
}
