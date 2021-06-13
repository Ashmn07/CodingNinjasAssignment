import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme)=>({
  root: {
      margin:'20px 10px',
      maxWidth:514,
      borderRadius:'10px',
      height:'fit-content',
      boxShadow:'0 2px 19px 0 rgb(0 0 0 / 10%)'
  },
  card__pic:{
    position: 'relative'
  },
  media: {
      height:190,
  },
  card__overlay:{
    position:'absolute',
    bottom:'7px',
    right:'7px',
    backgroundColor:'white',
    borderRadius:'5px',
  },
  card__overlaytext:{
    padding:'7px 15px',
    margin:0
  },
  card__heading:{
      fontWeight:'bold',
      lineHeight:1.2,
      fontSize:'1.1rem',
  },
  card__eventDetails:{
    display:'flex',
    flexDirection:'column',
    // margin:'5px',
  },
  card__event:{
    display:'flex',
    justifyContent:'space-around',
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
      marginBottom:'35px',
      textAlign:'left'
  },
  card__tagContainer:{
      display:'flex',
      marginBottom:'40px',
      alignItems:'center'
  },
  card__tag:{
      backgroundColor:'#d3d3d3',
      borderRadius:'10px',
      margin:'3px',
      padding:'7px',
      width:'fit-content',
  },
  card__footer:{
    display:'flex',
    justifyContent: 'space-between',
    // marginTop:'10px',
    width:'100%',
    alignItems: 'center',
  },
  card__users:{
    display:'flex',
    flexDirection:'column',
  },
  card__images:{
    display:'flex'
  },
  card__footimage:{
    width:theme.spacing(3),
    height:theme.spacing(3),
    margin:'2px'
  },
  card__username:{
    padding:'2px',
    backgroundColor:'d3d3d3',
    fontSize:'0.5rem'
  }
}));

export default function EventCard({event,showReg}) {


  const classes = useStyles();
  const date = new Date(event.start_time*1000)
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  const eventStrt =  strTime + ', ' + date.toDateString().substring(4)
  const price = event.fees===0?'Free':`INR ${event.fees}`
  let regtime;
  let tagcount = 0

  if(showReg){
    const regDate = new Date(event.registration_start_time)
    hours = regDate.getHours();
    minutes = regDate.getMinutes();
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    regtime = 'Registrations open till ' + regDate.toDateString().substring(4,10) + ', ' + hours + ':' + minutes + ' ' + ampm;
  }
  else{
    regtime = 'Registrations closed'
  }


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className={classes.card__pic}>
          <CardMedia
            className={classes.media}
            image={event.mobile_cover_picture}
            title={event.name}
          />
          {
            showReg?
            <div className={classes.card__overlay}>
              <p className={classes.card__overlaytext}>{regtime}</p>
            </div>
            :null
          }
        </div>
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
              event.card_tags.map((tag) =>{
                tagcount++;
                if(tagcount === 4){
                  return(
                    <div style={{color:'#fa7328'}}> + {event.card_tags.length - tagcount +1} more</div>
                  )
                }
                else if(tagcount<=3){
                  return(
                    <div className={classes.card__tag}>{tag}</div>
                  )}
                  else return null
                })
          }
          </div>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
      <div className={classes.card__footer}>
        {
          event.registered_users.show_users_count === true ?
          <div className={classes.card__users}>
            <div className={classes.card__images}>
              {
                event.registered_users.top_users.map(user =>(
                  <Tooltip title={user.name} placement="top">
                  <Avatar src={user.image_url} className={classes.card__footimage}/>
                  </Tooltip>
                ))
              }
            </div>
            <div className={classes.card__footertext}>
              and {event.registered_users.other_users_count} others registered
            </div>
          </div>
          :<div></div>
        }
        <img height="35" src={`https://files.codingninjas.in/0000000000001272.png`} alt=''/>
      </div>
      </CardActions>
    </Card>
  );
}
