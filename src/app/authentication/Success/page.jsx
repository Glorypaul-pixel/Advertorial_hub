"use client";

import { useRouter } from "next/navigation";

import "@/styles/Success.css";

const SuccessPage = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };
  return (
    <div className="success-container">
      <div className="success-box">
        <div className="checkmark-circle">
          <div className="checkmark"></div>
        </div>

        <h1>Account Created Successfully!</h1>
        <p>
          A verification link has been sent to your email. Please check your
          inbox and verify your account.
        </p>
        <button
          className="login-btn"
          onClick={() => navigateTo("/authentication/Login")}
        >
          Go To LogIn
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
