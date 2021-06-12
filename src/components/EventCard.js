import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
      margin:'20px 10px',
      maxWidth:600
  },
  media: {
      height:220,
      objectFit:'contain'
  },
  card__heading:{
      fontWeight:'bold',
      lineHeight:1.2,
      fontSize:'1.1rem'
  },
  card__eventDetails:{
    display:'flex',
    flexDirection:'column',
    // margin:'5px',
  },
  card__event:{
    display:'flex',
    justifyContent:'space-evenly',
    marginBottom:'20px'
  },
  card__eventDetailstext:{
      margin:'1px',
  },
  card__eventDetailsdesc:{
      margin:'1px',
      fontWeight:'bold'
  },
  card__desc:{
      marginTop:'5px',
      marginBottom:'35px'
  },
  card__tagContainer:{
      display:'flex',
      marginBottom:'20px'
  },
  card__tag:{
      backgroundColor:'#d3d3d3',
      borderRadius:'10px',
      margin:'3px',
      padding:'7px',
      width:'fit-content',
  }
});

export default function EventCard({event}) {
  const classes = useStyles();
  const date = new Date(event.start_time*1000)
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  //const eventStrt = date.toTimeString().substring(0,5) + ', ' + date.toDateString().substring(4) date.toLocaleString('en-GB',{ hour: 'numeric', hour12: true })
  const eventStrt =  strTime + ', ' + date.toDateString().substring(4)
  const price = event.fees===0?'Free':`INR ${event.fees}`

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={event.mobile_cover_picture}
          title="Contemplative Reptile"
        />
        <CardContent>
          <h2 className={classes.card__heading}>{event.name}</h2>
          <div className={classes.card__event}>
            <div className={classes.card__eventDetails}>
                <p className={classes.card__eventDetailstext}>Starts on</p>
                <p className={classes.card__eventDetailsdesc}>{eventStrt}</p>
            </div>
            <div className={classes.card__eventDetails}>
                <p className={classes.card__eventDetailstext}>Entry Fee</p>
                <p className={classes.card__eventDetailsdesc}>{price}</p>
            </div>
            <div className={classes.card__eventDetails}>
                <p className={classes.card__eventDetailstext}>Venue</p>
                <p className={classes.card__eventDetailsdesc}>{event.venue}</p>
            </div>
          </div>
          <Divider/>
          <div className={classes.card__desc}>
          <Typography variant="body2" color="textSecondary" component="p">
          {event.short_desc}
        </Typography>
          </div>
          <div className={classes.card__tagContainer}>
          {
              event.card_tags.map(tag =>(
                  <div className={classes.card__tag}>{tag}</div>
              ))
          }
          </div>
          <Divider />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Register Now
        </Button>
      </CardActions>
    </Card>
  );
}
