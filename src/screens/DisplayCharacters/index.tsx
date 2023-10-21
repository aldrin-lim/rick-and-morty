import {
  Container,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material"
import { useCharacters } from "../../hooks/useCharacters"
import { useDispatch, useSelector } from "react-redux"
import { setPage, setFilter } from "../../store/characterSlice"
import { RootState, AppDispatch } from "../../store"
import { useState, useEffect } from "react"
import { CharacterInfo } from "../../types/character"
import CharacterCard from "./components/CharacterCard"

const DisplayCharacters = () => {
  const { page, filter } = useSelector((state: RootState) => state.character)
  const dispatch = useDispatch<AppDispatch>()

  const [inputValue, setInputValue] = useState<string>("")

  const { loading, error, data } = useCharacters(page, filter)

  // Keep track of the previous set of characters
  const [characters, setCharacters] = useState(data?.characters?.results || [])
  const [dataInfo, setDataInfo] = useState<CharacterInfo | undefined>(
    data?.characters?.info,
  )

  useEffect(() => {
    if (!loading && data && data.characters) {
      setCharacters(data.characters.results)
      setDataInfo(data.characters.info)
    }
  }, [loading, data])

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      dispatch(setFilter({ name: inputValue }))
    }, 300)

    // Cleanup function to clear the timeout when the component unmounts or the input value changes
    return () => {
      clearTimeout(debounceTimeout)
    }
  }, [inputValue, dispatch])

  if (loading && !characters.length) return <p>Loading...</p>
  if (error) return <p>Error loading characters.</p>

  const maxPage = dataInfo?.pages || 0

  const pageStatus = `${page}/${maxPage}`

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Grid container alignItems="center" spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => dispatch(setPage(page - 1))}
            disabled={data?.characters?.info.prev === null || loading}
          >
            PREV
          </Button>
        </Grid>
        <Grid item xs={0.5}>
          {pageStatus}
        </Grid>
        <Grid item xs={1}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => dispatch(setPage(page + 1))}
            disabled={data?.characters?.info.next === null || loading}
          >
            NEXT
          </Button>
        </Grid>
        <Grid item xs={1}>
          {loading && <CircularProgress color="primary" size={24} />}
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        {characters.map((char) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={char.id}>
            <CharacterCard character={char} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default DisplayCharacters
