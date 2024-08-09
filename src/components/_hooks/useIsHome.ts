'use client';
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

export const useIsHome = () => {
  const pathname = usePathname();

  return pathname =="/" || pathname=="/ru/"
}