// app/sign-in/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

// Import your components (Input, Button) from your UI library
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Zod validation schema
const signInSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." })
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState("");

  // Using react-hook-form with zodResolver
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    try {
      const res = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const { token } = await res.json();
        document.cookie = `authToken=${token}; path=/`; // Set auth token in cookies
        router.push("/dashboard");
      } else {
        const { error } = await res.json();
        setError(error);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };
  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  return (
    
 
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit"  variant={"long"}>
            Sign In
          </Button>
          <p>Don’t have an account?</p>
          <Button onClick={handleSignUpClick} variant={"long"}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
