export default function({hours, minutes}: {hours?: number, minutes: number}) {
  return (
    (hours ? hours + ' часов' : '') + minutes + ' минут'
  )
}