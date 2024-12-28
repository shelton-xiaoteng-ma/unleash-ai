"use client";

import { ProModal } from "@/components/pro-modal";
import { useEffect, useState } from "react";
import { IssueModal } from "./issue-modal";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <IssueModal />
      <ProModal />
    </>
  );
};
