
"use client";

import { useForm } from "react-hook-form";
import InputField from "@/components/form/InputField";

type SignInFormData = {
  nameOrEmail: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <main className="min-h-screen bg-dark px-6 py-10 lg:h-screen lg:overflow-hidden lg:py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-lg flex-col gap-5"
      >
        <h1 className="form-title text-2xl font-semibold text-white">
          Sign In
        </h1>

        <p className="text-sm text-gray-400">
          Welcome back! Sign in to your account.
        </p>

        <InputField
          name="nameOrEmail"
          label="Name or Email"
          placeholder="Enter your name or email"
          register={register}
          errors={errors}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={register}
          errors={errors}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-cyan-300 px-4 py-3
            font-semibold text-gray-950 transition
            hover:bg-cyan-400 disabled:cursor-not-allowed
            disabled:opacity-50"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </main>
  );
};

export default SignIn;
  