'use client';
import { useEffect, useState } from "react";
import {useIsHome} from "@/components/_hooks/useIsHome";

export const useHash = () => {
  const isHome=useIsHome()
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (window) {
      setHash(window.location.hash);
      //@ts-ignore
      const onHashChange = (e) => {
        // e.preventDefault();
        setHash(window.location.hash);
      };
      window.addEventListener('hashchange', onHashChange);
      return () => window.removeEventListener('hashchan-ge', onHashChange);
    }
  }, []);

  useEffect(() => {
    setHash(window.location.hash)
  }, [isHome]);

  return hash.slice(1);
};