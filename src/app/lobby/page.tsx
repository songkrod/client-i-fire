'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const navigator = useRouter();

  useEffect(() => {
    navigator.push('/');
  }, []);

  return <div>ERROR</div>;
};