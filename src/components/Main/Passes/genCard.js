import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './genCard.scss';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    position: 'relative',
    height: 270,
    marginBottom:5,
  },
  media: {
    height: 170,
  },
});

export default function GenCard({ title, passCode, imgUrl ,company }) {
  const classes = useStyles();
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
          <Typography variant="body2" color="textSecondary" component="p">
            {company}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
