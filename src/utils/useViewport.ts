import { useEffect, useState } from "react"

export const useViewport = () => {
  const [viewport, setViewport] = useState(0);

  useEffect(() => {
    if (window) {
      const changeViewport = () => {
        setViewport(window.innerWidth / window.innerHeight);
      }

      window.addEventListener('resize', changeViewport);
      return () => {
        window.removeEventListener('resize', changeViewport);
      }
    }
  },[]);

  return viewport;
}