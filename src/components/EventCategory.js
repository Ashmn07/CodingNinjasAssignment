import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Pagination from '@material-ui/lab/Pagination';
import EventCard from './EventCard'

const useStyles = makeStyles(()=>({
    event:{
        display: 'flex',
        flexDirection: 'column',
    },
    event__body:{
        display:'flex',
    },
    event__tags:{
        flex:1
    },
    event__cards:{
        flex:1.5,
        display:'grid',
        justifyItems:'center',
        gridTemplateColumns:'1fr 1fr',
    },
    event__pages:{
        padding:'2',
        margin:'2',
        alignSelf: 'flex-end',
    },
}))

function EventCategory({category}) {

    const classes = useStyles()
    const [subCategory,setSubCategory] = useState('Upcoming')
    const [tagList,setTagList] = useState([])
    const [pageNo,setPageNo] = useState(1)
    const [pageCount,setPageCount] = useState(0)
    const [events,setEvents] = useState()
    const [tags,setTags] = useState();

    const subCategories = [
        'Upcoming','Archived','All Time Favorites'
    ]

    useEffect(()=>{
        loadData()
    },[category,subCategory,tagList,pageNo])

    useEffect(()=>{
        loadTags()
    },[])

    const loadData = async () => {
        try{
            const url = `https://api.codingninjas.com/api/v3/events?event_category=${category}&event_sub_category=${subCategory}&tag_list=${tagList.toString()}&offset=${(pageNo-1)*20}`;
            const res = await fetch(url)
            const data = await res.json()
            setEvents(data.data.events)
            setPageCount(data.data.page_count)
        }
        catch(err){
            console.error(err)
        }
    }

    const loadTags = async () => {
        try{
            const tagUrl = "https://api.codingninjas.com/api/v3/event_tags"
            const tagRes = await fetch(tagUrl)
            const tagData = await tagRes.json()
            setTags(tagData.data.tags)
        }
        catch(err){
            console.error(err)
        }
    }

    const handleChange = (event, newValue) => {
        setSubCategory(newValue);
    };

    return (
        <div>
            <div>
            <Tabs
            value={subCategory}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            >
            {
                subCategories.map(category =>(
                    <Tab label={category} value={category} key={category}/>
                ))
            }
            </Tabs> 
            </div>
            {
                events?
                <div className={classes.event}>
                    <div className={classes.event__body}>
                        <div className={classes.event__cards}>
                            {
                                events.map(event => (
                                    <EventCard event={event} key={event.id}/>
                                ))
                            }
                        </div>
                        <div className={classes.events__tags}>
                            {
                                tags.map(tag =>(
                                    <p>{tag}</p>
                                ))
                            }
                        </div>
                    </div>
                    <div className={classes.event__pages}>
                        <Pagination count={pageCount} size="large" onChange={(page)=>setPageNo(parseInt(page.target.innerText))}/>
                    </div>
                </div>:null
            }
        </div>
    )
}

export default EventCategory
