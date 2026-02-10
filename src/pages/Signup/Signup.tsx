import AuthForm from "@/components/common/AuthForm/AuthForm";
import InputField from "@/components/common/InputField/InputField";

const Signup = () => {
  return (
    <AuthForm title="Create Account" submitText="Sign Up">
      <InputField
        label="Full Name"
        type="text"
        placeholder="John Doe"
        name="name"
        required
        autoComplete="name"
      />

      <InputField
        label="Email Address"
        type="email"
        placeholder="email@example.com"
        name="email"
        required
        autoComplete="email"
      />

      <InputField
        label="Password"
        type="password"
        placeholder="••••••••"
        name="password"
        required
        autoComplete="new-password"
      />
    </AuthForm>
  );
};

export default Signup;
