import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

// Export the NextAuth handler for the GET and POST requests
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
