import type { ReactNode } from "react";
import { GoogleTagManager } from "@next/third-parties/google";

export default function QuizesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <GoogleTagManager gtmId="GTM-T5MN26B8" />
    </>
  );
}