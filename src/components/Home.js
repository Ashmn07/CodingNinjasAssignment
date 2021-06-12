import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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
    width: '95%',
    backgroundColor: theme.palette.background.paper,
    padding:'1%',
  },
}));

export default function Home() {

  const classes = useStyles();
  const [value, setValue] = useState('ALL_EVENTS');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
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
      </AppBar>
      <EventCategory category={value}/>
    </div>
  );
}
