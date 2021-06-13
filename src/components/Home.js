import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EventCategory from './EventCategory';

const event_category = [
    {
      name:'All Events',
      value:'ALL_EVENTS'
    },
    {
        name:'Webinars',
        value:'WEBINAR'
    },
    {
        name:'Coding Events',
        value:'CODING_EVENT'
    },
    {
        name:'Bootcamp events',
        value:'BOOTCAMP_EVENT'
    },
    {
        name:'Workshop',
        value:'WORKSHOP'
    },    
  ]

//sample api : https://api.codingninjas.com/api/v3/events?event_category=ALL_EVENTS&event_sub_category=Upcoming&tag_list=Career%20Guidance,Web%20Development&offset=1

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // width: '95%',
    margin:'4%',
    // border: '2px solid #d3d3d3',
    borderRadius:'10px',
    boxShadow:'0 4px 20px 0 rgb(0 0 0 / 20%)'
  },
  event__categories:{
    backgroundColor:'white',
  }
}));

export default function Home() {

  const classes = useStyles();
  const [value, setValue] = useState('ALL_EVENTS');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.event__categories}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
      {
          event_category.map(event =>(
              <Tab label={event.name} value={event.value} key={event.value}/>
          ))
      }
      </Tabs>
      </div>
      <EventCategory category={value}/>
    </div>
  );
}
