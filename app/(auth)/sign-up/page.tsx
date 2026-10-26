
"use client";

import { useForm } from "react-hook-form";
import InputField from "@/components/form/InputField";

const countries = [
  { label: "🇮🇳 India", value: "India" },
  { label: "🇺🇸 United States", value: "United States" },
  { label: "🇬🇧 United Kingdom", value: "United Kingdom" },
  { label: "🇨🇦 Canada", value: "Canada" },
  { label: "🇦🇺 Australia", value: "Australia" },
  { label: "🇦🇪 United Arab Emirates", value: "United Arab Emirates" },
  { label: "🇸🇦 Saudi Arabia", value: "Saudi Arabia" },
  { label: "🇵🇰 Pakistan", value: "Pakistan" },
  { label: "🇧🇩 Bangladesh", value: "Bangladesh" },
  { label: "🇸🇬 Singapore", value: "Singapore" },
  { label: "🇯🇵 Japan", value: "Japan" },
  { label: "🇩🇪 Germany", value: "Germany" },
  { label: "🇫🇷 France", value: "France" },
  { label: "🇳🇱 Netherlands", value: "Netherlands" },
];

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    try{
      console.log(data);
    }catch(error){
      console.error("Error submitting form:", error);
    }

    
  };

  return (
    <main className="min-h-screen bg-dark px-6 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-lg flex-col gap-5"
      >
        <h1 className="form-title text-2xl font-semibold text-gray-900">
          Sign Up & Personalize
        </h1>

        <InputField
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          register={register}
          errors={errors}
        />

        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          register={register}
          errors={errors}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Create a password"
          type="password"
          register={register}
          errors={errors}
        />

        <InputField
          name="country"
          label="Country"
          placeholder="Select your country"
          options={countries}
          register={register}
          errors={errors}
        />

        <InputField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="e.g. Long-term growth"
          register={register}
          errors={errors}
        />

        <InputField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="e.g. Moderate"
          register={register}
          errors={errors}
        />

        <InputField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="e.g. Technology"
          register={register}
          errors={errors}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-cyan-300 px-4 py-3
            font-semibold text-gray-900 transition
            hover:bg-cyan-400 disabled:cursor-not-allowed
            disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Create Account"}
        </button>
      </form>
    </main>
  );
};

export default SignUp;
