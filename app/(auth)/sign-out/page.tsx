"use client";

import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();

  const handleSignOut = () => {
    // Add your sign-out logic here (e.g., clear cookies, localStorage, etc.)
    router.push("/auth/sign-in");
  };

  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
