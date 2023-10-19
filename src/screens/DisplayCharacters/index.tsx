import { useCharacters } from "../../hooks/useCharacters"

const DisplayCharacters = () => {
  const { loading, error, charcters } = useCharacters()

  if (loading) return <p>Loading...</p>
  if (error || !charcters) return <p>Error loading characters.</p>

  return (
    <div>
      <pre>{JSON.stringify(charcters, null, 2)}</pre>
    </div>
  )
}

export default DisplayCharacters
