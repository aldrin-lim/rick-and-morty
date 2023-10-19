import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material"
import { useCharacters } from "../../hooks/useCharacters"

const DisplayCharacters = () => {
  const { loading, error, characters } = useCharacters()

  if (loading) return <p>Loading...</p>
  if (error || !characters) return <p>Error loading characters.</p>

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid container spacing={3}>
        {characters.results.map((char) => (
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
    </Container>
  )
}

export default DisplayCharacters
