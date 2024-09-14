// app/sign-out/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();

  const handleSignOut = () => {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Clear auth token from cookies
    router.push("/sign-in"); // Redirect to sign-in page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Sign Out</h1>
        <p className="mb-4">Are you sure you want to sign out?</p>
        <button
          onClick={handleSignOut}
          className="py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
