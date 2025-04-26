// export const Nav = () => {

//     return <nav>
//         <img src={`${process.env.PUBLIC_URL}/images/nav.jpg`} alt="Nav" className="nav-img"></img>

//     </nav>

// }

import { AccountCircle } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const Nav = (props) => {

    const advertiser = useSelector(x => x.advertiser.currentAdvertiser)
    const nav = useNavigate()
    useEffect(() => {
        console.log("advertiser", advertiser)
    }, [advertiser])

    const {source} = props

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const login = () => {
        handleClose()
        nav('/login')
    }
    const register = () => {
        handleClose()
        nav('/register')
    }
    const personalArea = () => {
        handleClose()
        nav('/advertiser')
    }

    return <nav>
        <div className='nav'>
            <img src={`${process.env.PUBLIC_URL}/images/logo-w.png`} onClick={()=>{nav('/')}} alt="Nav" className="nav-img"></img>

            <div className='flex-r'>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle sx={{ fontSize: 60, color: "#449092" }} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {!advertiser.name && <>
                            <MenuItem onClick={login}>התחברות</MenuItem>
                            <MenuItem onClick={register}>הרשמה</MenuItem>
                        </>}

                        {advertiser.name && <>
                            <MenuItem onClick={login}>התחברות</MenuItem>                        
                            {source!=="personal" && <MenuItem onClick={personalArea}>אזור אישי</MenuItem>}
                        </>}

                    </Menu>
                </div>
                {advertiser.name ? <p>!שלום {advertiser.name}</p> : <p>!שלום אורח</p>}
            </div>
        </div>
    </nav>


}