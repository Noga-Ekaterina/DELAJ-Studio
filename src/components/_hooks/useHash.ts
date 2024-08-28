'use client';
import { useEffect, useState } from "react";
import {useIsHome} from "@/components/_hooks/useIsHome";

export const useHash = () => {
  const isHome=useIsHome()
  const [hash, setHash] = useState(window.location.hash
  );

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
  }, [isHome]);

  return hash.slice(1);
};