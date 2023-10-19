import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material"
import { useCharacters } from "../../hooks/useCharacters"
import { useDispatch, useSelector } from "react-redux"
import { setPage } from "../../store/characterSlice"
import { RootState, AppDispatch } from "../../store"
import { useState, useEffect } from "react"

const DisplayCharacters = () => {
  const { page, filter } = useSelector((state: RootState) => state.character)
  const dispatch = useDispatch<AppDispatch>()

  const { loading, error, data } = useCharacters(page, filter)

  // Keep track of the previous set of characters
  const [characters, setCharacters] = useState(data?.characters.results || [])

  useEffect(() => {
    if (!loading && data) {
      setCharacters(data.characters.results)
    }
  }, [loading, data])

  if (loading && !characters.length) return <p>Loading...</p>
  if (error || !characters.length) return <p>Error loading characters.</p>

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid container spacing={3}>
        {characters.map((char) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={char.id}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={char.image}
                alt={char.name}
              />
              <CardContent>
                <Typography variant="h6">{char.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {char.species}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div>
        <Button
          variant="contained"
          onClick={() => dispatch(setPage(page - 1))}
          disabled={data?.characters.info.prev === null || loading}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(setPage(page + 1))}
          disabled={data?.characters.info.next === null || loading}
        >
          Next
        </Button>
      </div>
    </Container>
  )
}

export default DisplayCharacters
