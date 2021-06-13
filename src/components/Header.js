import React from 'react'
import Typography from '@material-ui/core/Typography';

function Header() {

    const bgImg = {
        backgroundImage:`url(https://files.codingninjas.in/0000000000002471.png)`,
        height:'33vh',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        opacity:0.9,
        position:'relative',
    }

    return (
        <div style={bgImg}>
            <div style={{position:'absolute',bottom:'40px',left:'30px'}}>
                <Typography variant="h2" style={{color:'white'}}>
                Events and News
                </Typography>
                <Typography variant="subtitle1" style={{color:'white'}}>
                Explore Events to learn,compete and grow
                </Typography>
            </div>
        </div>
    )
}

export default Header
