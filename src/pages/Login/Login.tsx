import AuthForm from "@/components/common/AuthForm/AuthForm";
import InputField from "@/components/common/InputField/InputField";

const Login = () => {
  return (
    <AuthForm
      title="Welcome Back"
      submitText="Login"
    >
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
        autoComplete="current-password"
      />
    </AuthForm>
  );
};

export default Login;
