'use client';
import { useEffect, useState } from "react";
import {usePathname} from "next/navigation";

export const useHash = () => {
  const [hash, setHash] = useState(window.location.hash
  );
  const pathname=usePathname()

  useEffect(() => {
    if (window) {
      setHash(window.location.hash);
      //@ts-ignore
      const onHashChange = (e) => {
        // e.preventDefault();
        console.log(window.location.hash)
        setHash(window.location.hash);
      };
      window.addEventListener('hashchange', onHashChange);
      return () => window.removeEventListener('hashchange', onHashChange);
    }
  }, []);

  useEffect(() => {
    setHash(window.location.hash)
  }, [pathname]);

  return hash.slice(1);
};