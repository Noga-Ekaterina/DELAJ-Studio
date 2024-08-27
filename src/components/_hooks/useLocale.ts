import {useEffect, useState} from 'react';
import {usePathname} from "next/navigation";
import {LangType} from "@/types";

export const useLocale = () => {
  const pathname=usePathname()
  const [locale, setLocale] = useState<LangType>("en")
  useEffect(() => {
      setLocale(pathname.includes("ru/")? "ru":"en")
  }, [pathname]);

  return locale
};
