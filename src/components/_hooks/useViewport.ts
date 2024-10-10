'use client';
import { useEffect, useState } from "react"

export const useViewport = () => {
  const [viewport, setViewport] = useState(document.documentElement.clientWidth / document.documentElement.clientHeight);

  useEffect(() => {
    if (window) {
      const changeViewport = () => {
        setViewport(document.documentElement.clientWidth / document.documentElement.clientHeight);
      }

      window.addEventListener('resize', changeViewport);
      return () => {
        window.removeEventListener('resize', changeViewport);
      }
    }
  },[]);

  return viewport;
}