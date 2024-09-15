import {usePathname, useRouter} from "next/navigation";

export const useChangeHash = () => {
  const router=useRouter()
  const pathname=usePathname()

  return (hash:string)=>{
    router.replace(`${pathname}#${hash}`, {scroll:false})
    window.location.hash = hash
  }
}