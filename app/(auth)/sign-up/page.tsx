
"use client";

import { Controller, useForm } from "react-hook-form";
import InputField from "@/components/form/InputField";
import CountryList from "@/components/form/CountryList";
import { signUpWithEmail } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data);

      const result = await signUpWithEmail(data);

      if (result.success) {
        router.push("/");
      } else {
        toast.error("Sign up failed", {
          description: "Unable to create your account.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      toast.error("Sign up failed", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to create an account",
      });
    }
  };




  


  const selectClass =
    "h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-gray-900 shadow-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300";

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

        <div>
          <label className="mb-2 block text-sm font-semibold text-white">
            Country
          </label>

<Controller
  name="country"
  control={control}
  rules={{ required: "Please select a country" }}
  render={({ field }) => (
    <CountryList
      value={field.value ?? ""}
      onChange={field.onChange}
      placeholder="Select your country"
    />
  )}
/>

          {errors.country && (
            <p className="mt-1 text-sm text-red-500">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Investment Goals */}
        <div>
          <label
            htmlFor="investmentGoals"
            className="mb-2 block text-sm font-semibold text-white"
          >
            Investment Goals
          </label>

          <select
            id="investmentGoals"
            {...register("investmentGoals", {
              required: "Please select your investment goal",
            })}
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select your investment goal
            </option>
            <option value="Long-term">Long Term</option>
            <option value="Short-term">Short Term</option>
            <option value="Day trading">Day Trading</option>
          </select>

          {errors.investmentGoals && (
            <p className="mt-1 text-sm text-red-500">
              {errors.investmentGoals.message}
            </p>
          )}
        </div>

        {/* Risk Tolerance */}
        <div>
          <label
            htmlFor="riskTolerance"
            className="mb-2 block text-sm font-semibold text-white"
          >
            Risk Tolerance
          </label>

          <select
            id="riskTolerance"
            {...register("riskTolerance", {
              required: "Please select your risk tolerance",
            })}
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select your risk tolerance
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {errors.riskTolerance && (
            <p className="mt-1 text-sm text-red-500">
              {errors.riskTolerance.message}
            </p>
          )}
        </div>

        {/* Preferred Industry */}
        <div>
          <label
            htmlFor="preferredIndustry"
            className="mb-2 block text-sm font-semibold text-white"
          >
            Preferred Industry
          </label>

          <select
            id="preferredIndustry"
            {...register("preferredIndustry", {
              required: "Please select a preferred industry",
            })}
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select your preferred industry
            </option>
            <option value="Technology">Technology</option>
            <option value="Banking & Finance">Banking & Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Energy">Energy</option>
            <option value="Consumer Goods">Consumer Goods</option>
          </select>

          {errors.preferredIndustry && (
            <p className="mt-1 text-sm text-red-500">
              {errors.preferredIndustry.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-cyan-300 px-4 py-3 font-semibold text-gray-900 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Create Account"}
        </button>
      </form>
    </main>
  );
};

export default SignUp;
