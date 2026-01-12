import {usePathname, useRouter} from "next/navigation";

export const useChangeHash = () => {
  const router=useRouter()
  const pathname=usePathname()

  return (hash:string)=>{  // Сохраняем текущий hash
    const currentHash = window.location.hash

    // Если hash не изменился, ничего не делаем
    if (currentHash === `#${hash}`) return

    // Меняем hash через history API (не вызывает перезагрузку)
    window.history.replaceState(null, '', `#${hash}`)

    // ВРУЧНУЮ вызываем событие hashchange
    window.dispatchEvent(new HashChangeEvent('hashchange'))

  }
}