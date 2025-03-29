
import { Suspense } from "react";
import { HomeWrapper } from "./HomeWrapper";

export default function Home() {
  return (
    <Suspense fallback=''>
      <HomeWrapper />
    </Suspense>
  )
}
