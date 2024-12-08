const getFileName = (day) => `day_${day.toString().padStart(2, '0')}`

export const getDay = async (dayRaw, srcPath) => {
  if (dayRaw) {
    return { dayRaw, day: getFileName(dayRaw) }
  }

  const days = []
  for await (const { isDirectory, name } of Deno.readDir(srcPath)) {
    if (!isDirectory) continue
    days.push(name)
  }

  const [lastDay] = days.at(-1)?.match(/\d+/) ?? [0]
  const newDay = +lastDay + 1

  return { dayRaw: newDay, day: getFileName(newDay) }
}
