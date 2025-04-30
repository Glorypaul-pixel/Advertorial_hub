"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import "@/styles/Verify.css";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token");

        const response = await fetch(
          `https://advertorial-backend.onrender.com/api/auth/verify/${userId}?token=${token}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Verification failed.");
        }

        setMessage("Your email has been verified successfully.");
        setSuccess(true);
      } catch (error) {
        setMessage(error.message);
        setSuccess(false);
      }
    };

    if (userId) {
      verifyEmail();
    } else {
      setMessage("Verification link is invalid or expired.");
      setSuccess(false);
    }
  }, [userId, searchParams]);

  return (
    <div className="verify-container">
      <div className="verify-card">
        <div className="verify-header">
          <img
            src="/images/logo.png"
            alt="Advertorial Hub Logo"
            className="verify-logo"
          />
          <h1 className="verify-title">Advertorial Hub</h1>
        </div>
        <div className="verify-body">
          <p className="verify-message">
            {success === null
              ? "Please wait while we verify your email..."
              : message}
          </p>
          {success && (
            <a href="/authentication/Login/page" className="verify-button">
              Log In
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
