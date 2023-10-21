import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material"
import { CharacterResult } from "../../../../types/character"
import styled from "@emotion/styled"

interface CharacterCardProps {
  character: CharacterResult
}

const InfoBox = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  top: 0;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  align-items: center;
`

const InfoText = styled(Typography)`
  color: white;
  padding: 8px;
  background: rgba(25, 118, 210, 0.8);
  display: inline-block;
`

const StyledCard = styled(Card)`
  position: relative;
  &:hover ${InfoBox} {
    display: flex;
  }
`

const CharacterCard: React.FC<CharacterCardProps> = ({
  character: {
    name,
    image,
    gender,
    species,
    location: { name: location },
    origin: { name: origin },
  },
}) => {
  return (
    <StyledCard style={{ position: "relative" }}>
      <CardMedia component="img" height="200" image={image} alt={name} />
      <CardContent>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {species}
        </Typography>
      </CardContent>
      <InfoBox>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <InfoText variant="body1">{gender}</InfoText>
          </Grid>
          <Grid item xs={12}>
            <InfoText variant="body1">{species}</InfoText>
          </Grid>
          <Grid item xs={12}>
            <InfoText variant="body1">{location}</InfoText>
          </Grid>
        </Grid>
      </InfoBox>
    </StyledCard>
  )
}

export default CharacterCard
