import { useEffect, useState } from "react";

export const useHash = () => {
  const [hash, setHash] = useState('');
  useEffect(() => {
    if (window) {
      setHash(window.location.hash);
      const onHashChange = () => {
        setHash(window.location.hash);
      };
      window.addEventListener('hashchange', onHashChange);
      return () => window.removeEventListener('hashchange', onHashChange);
    }
  }, []);
  return hash.slice(1);
};