export const getDayInput = async (day) => {
  const session = Deno.env.get('AOC_SESSION')
  if (!session) {
    throw new Error('Missing AOC_SESSION env variable')
  }

  day ??= new Date().getDate()

  const year = new Date().getFullYear()
  const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      cookie: `session=${session}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to get input for day ${day}`)
  }

  return response.text()
}
