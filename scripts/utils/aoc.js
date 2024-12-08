export const aoc = (session, day) => {
  const year = new Date().getFullYear()
  const url = `https://adventofcode.com/${year}`
  day ??= new Date().getDate()

  return {
    getInput: async (inputDay) => {
      if (!session) {
        console.error('Its not possible to get the input without a session')
        return
      }

      const response = await fetch(`${url}/day/${inputDay ?? day}/input`, {
        headers: { cookie: `session=${session}` },
      })

      if (!response.ok) {
        console.error(`Failed to get input. Status: ${response.status}`)
        return
      }

      return response.text()
    },
    getChallenge: async (challengeDay) => {
      const response = await fetch(`${url}/day/${challengeDay ?? day}`, {
        headers: { cookie: `session=${session}` },
      })

      if (!response.ok) {
        console.error(`Failed to get challenge. Status: ${response.status}`)
        return
      }

      return response.text()
    },
  }
}
