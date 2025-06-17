import { useForm } from "react-hook-form";
import AccountInfoSection from "./AccountInformation";
import { Link } from "react-router-dom"; // fixed import (was from "react-router")
import { useState } from "react";
import ContactInfoSection from "./ContactInformation";
import PersonalInfoSection from "./PersonalInformation";
import Header from "./Header";
import TermsAndCondition from "./TermsAndCondition";
import SubmitButton from "./SubmitButton";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
    getValues,
  } = useForm();

  const isAgree = watch("isAgree", false); // Get checkbox value

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Call API or navigate to next step
  };

  return (
    <section className="flex flex-col items-center justify-center px-2 mx-4 my-4 sm:mx-4 md:mx-6 md:my-6 sm:px-4 ">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg sm:p-6 md:p-8 rounded-xl shadow-gray-300/60">
        {/* Header */}
        <Header />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8"
        >
          {/* Account Information */}
          <AccountInfoSection
            register={register}
            errors={errors}
            watch={watch}
          />
          <PersonalInfoSection
            register={register}
            errors={errors}
            control={control}
          />
          <ContactInfoSection
            register={register}
            errors={errors}
            control={control}
          />

          {/* Terms and Conditions */}
          <TermsAndCondition register={register} errors={errors} />

          {/* Submit button */}
          <SubmitButton isAgree={isAgree} />
        </form>
      </div>
    </section>
  );
}

export default SignUp;
