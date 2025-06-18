import { useForm } from "react-hook-form";
import AccountInfoSection from "./AccountInformation";
import ContactInfoSection from "./ContactInformation";
import PersonalInfoSection from "./PersonalInformation";
import Header from "./Header";
import TermsAndCondition from "./TermsAndCondition";
import SubmitButton from "./SubmitButton";
import useSignUp from "../../../hooks/useSignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router";

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
  const { isAuthenticated } = useAuthContext();
  const { registerUser, isCreatingUser, isError, error } = useSignUp();

  const isAgree = watch("isAgree", false);

  const onSubmit = (data) => {
    // If user hasn't agreed to terms, don't submit
    if (!isAgree) return;
    registerUser(data);
  };
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <section className="flex flex-col items-center justify-center px-2 mx-4 my-4 sm:mx-4 md:mx-6 md:my-6 sm:px-4 ">
      <ToastContainer />
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
          <SubmitButton isAgree={isAgree} isLoading={isCreatingUser} />
        </form>
      </div>
    </section>
  );
}

export default SignUp;
