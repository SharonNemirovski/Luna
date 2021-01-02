import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 295,
    margin: 25,
    height: 250,
  },
  media: {
    height: 170,
  },
});

export default function GenCard({ title,passCode,imgUrl }) {
  const classes = useStyles();
  //const {  } = description;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={imgUrl} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {passCode}
            
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
