const args = Deno.args
if (args.length === 0) {
  console.error('Please provide a day to run, e.g., day_02')
  Deno.exit(1)
}

const [day] = args
const modulePath = `./${day}/index.js`

try {
  const { main } = await import(modulePath)
  await main()
} catch (error) {
  console.error(`Failed to run ${day}:`, error)
  Deno.exit(1)
}
