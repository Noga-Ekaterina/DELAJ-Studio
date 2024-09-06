import store from "@/store/store";
export const changeOverflow = (hidden: boolean) => {
  const hash=window.location.hash.slice(1)
  const pathname=window.location.pathname
  const isHome= pathname =="/" || pathname=="/ru/"
  const {togleScroll}=store
  if (hidden){
    togleScroll(false)
    document.documentElement.style.overflow="hidden"
  } else if ((hash!="" && hash!="main-screen") || !isHome){
    setTimeout(()=>{
      togleScroll(true)
      document.documentElement.style.overflow=""
    },750)
  }
}