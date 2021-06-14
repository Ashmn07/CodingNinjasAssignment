import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Pagination from '@material-ui/lab/Pagination';
import EventCard from './EventCard'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(()=>({
    event:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor:'white',
    },
    event__subcategory:{
        backgroundColor:'#eee',
    },
    event__body:{
        display:'flex',
    },
    event__tags:{
        marginTop:'15px'
    },
    event__cards:{
        flex:1,
        display:'grid',
        justifyItems:'center',
        gridTemplateColumns:'repeat(2,1fr)',
    },
    event__pages:{
        padding:'2px',
        margin:'2px',
        alignSelf: 'flex-end',
        display:'flex',
        alignItems: 'center',
    },
    event__tag:{
        backgroundColor:'#eee',
        margin:'10px 14px',
        padding:'4px 10px',
        width:'fit-content',
        cursor:'pointer'
    },
    event__selTag:{
        backgroundColor:'orange',
        margin:'10px 5px',
        padding:'4px 10px',
        width:'fit-content',
    },
    event__pagestext:{
        padding:'7px',
        margin:'5px 0px 10px 5px'
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
    const [showfalse,setShowFalse] = useState(false)
    const [tagLimit,setTagLimit] = useState(12)

    let bgcolor,col;

    const subCategories = [
        'Upcoming','Archived','All Time Favorites'
    ]

    useEffect(()=>{
        if(subCategory==='Upcoming'){
            setTagList([])
            setPageNo(1)
            loadData()
        }else setSubCategory('Upcoming')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[category])

    useEffect(()=>{
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pageNo,tagList])

    useEffect(()=>{
        loadTags()
    },[])

    useEffect(()=>{
        setTagList([])
        setPageNo(1)
    },[subCategory])

    useEffect(()=>{
        if(events){events.length===0?setShowFalse(true):setShowFalse(false)}
    },[events])

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

    const handleTags = (tag) => {
        if(tagList.includes(tag)){
            const temp = [...tagList]
            const newArray = temp.filter(tags => tags!==tag)
            setTagList(newArray)
        }
        else{
            const updArray = [...tagList]
            updArray.push(tag)
            setTagList(updArray)
        }
    }

    const handleChange = (event, newValue) => {
        setSubCategory(newValue);
    };

    const fewTags = tags?tags.slice(0,tagLimit).map(tag=>{
        if(tagList.includes(tag)){
            bgcolor='#fa7328'
            col='#fff'
        }
        else{
            bgcolor='#eee'
            col='black'
        }
        return(
        <div className={classes.event__tag} style={{ backgroundColor:`${bgcolor}`,color:`${col}`}} onClick={()=>handleTags(tag)}>
            <Typography variant="body2">
                {tag}
            </Typography>
        </div>
        )}):null

    const handleTagsClick = () => {
        document.getElementById('moreTags').style.display='None';
        setTagLimit(tags.length)
    }

    return (
        <div>
            <div className={classes.event__subcategory}>
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
                        {
                            showfalse?
                            <h1>No events found</h1>:null
                        }
                        <div className={classes.event__cards}>
                            {
                                events.map(event => {
                                let show=event.registration_status==='REGISTRATIONS_OPEN'||event.registration_status==='REGISTRATIONS_CLOSED'?true:false
                                return(
                                    <EventCard event={event} key={event.id} showReg={show}/>
                                )})
                            }
                        </div>
                        <div className={classes.event__tags}>
                            <Typography variant="body1" color="textPrimary" align="left" style={{padding:'5px 0 0 5px'}}>
                                TAGS
                            </Typography>
                            {fewTags}
                            <Typography variant="body2" align="left" id="moreTags"
                             style={{padding:'5px',margin:'5px',color:'#fa7328',fontWeight:'600',cursor:'pointer'}} onClick={handleTagsClick}>
                                See 10 more tags
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.event__pages}>
                        <p className={classes.event__pagestext}>Page </p><Pagination page={pageNo} count={pageCount} hideNextButton hidePrevButton size="large" onChange={(page)=>{setPageNo(parseInt(page.target.innerText)); window.scrollTo(0,0)}}/>
                    </div>
                </div>:<CircularProgress color="inherit" />
            }
        </div>
    )
}

export default EventCategory
