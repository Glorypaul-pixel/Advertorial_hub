import { Suspense } from "react";
import VerifyEmail from "@/app/verify-email/Verify-Email";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
