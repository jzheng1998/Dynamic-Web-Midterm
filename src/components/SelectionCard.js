import {
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import React from "react";

const useStyles = makeStyles({
  root: {
    margin: 15,
    maxWidth: 345,
  },
  name: {
    textTransform: "capitalize",
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default function SelectionCard({ animal }) {
  const classes = useStyles();
  const {
    age,
    breeds,
    description,
    gender,
    name,
    primary_photo_cropped,
    size,
    url,
  } = animal;

  return (
    <Card
      onClick={() => {
        window.open(url, "_blank");
      }}
      className={classes.root}
    >
      <CardActionArea>
        {primary_photo_cropped ? (
          <CardMedia
            component="img"
            alt={name}
            image={primary_photo_cropped.full}
          />
        ) : null}
        <CardContent>
          <Typography className={classes.name} variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {`${gender}, ${age}, ${size}`}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {`Primary: ${breeds.primary}`}
          </Typography>
          {breeds.mixed && breeds.secondary ? (
            <Typography variant="subtitle2" color="textSecondary">
              {`Secondary: ${breeds.secondary}`}
            </Typography>
          ) : null}
          <Typography className={classes.description} variant="body1">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
