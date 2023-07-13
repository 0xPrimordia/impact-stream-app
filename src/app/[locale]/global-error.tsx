'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>{error.message = "crypto.randomUUID is not a function" ? "Unsupported browser version. Please use modern versions of Chrome or Safari.": error.message}</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
