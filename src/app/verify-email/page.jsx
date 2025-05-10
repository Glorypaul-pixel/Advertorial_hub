// app/verify-email/page.jsx
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import your client component
const VerifyEmail = dynamic(() => import("./VerifyEmail"), { ssr: false });

export default function Page() {
  return (
    <Suspense fallback={<div>Loading verification...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
