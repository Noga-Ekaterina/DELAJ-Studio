import {useEffect, useState} from 'react';
import {usePathname} from "next/navigation";
import {langType} from "@/types";

export const useLocale = () => {
  const pathname=usePathname()
  const [locale, setLocale] = useState<langType>("en")
  useEffect(() => {
      setLocale(pathname.includes("ru/")? "ru":"en")
  }, [pathname]);

  return locale
};
