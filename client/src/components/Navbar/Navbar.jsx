import React from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Image from '../assets/images/programate-solo-color.png';
import '../Navbar/Navbar.css';
import UserLink from './UserLink'

const Navbar = () => {

    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth

    const handleLogout = async () => {
        try {
            // await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            localStorage.removeItem('loggedAgoraUser')
            localStorage.removeItem('isLogged')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <>
        {/* <nav className= "main-nav">
          <div className="Img">
              <img src={Image} width="120px" height="25px" alt="Logo Educamás" />
        </div>
        </nav>
        <h1>Sesiones</h1>
        <br>
        </br>


        <div style={{width: "100px", height: "100px", backgroundColor: "red"}}>
            <Link to='/login' onClick={handleLogout}> 
                logout
            </Link> 
        </div> */}




        <header>
            <div className="logo">
                <h1><Link to="/">Full Auth</Link></h1>
            </div>

            <ul style={transForm}>
                {
                    isLogged
                    ? <UserLink user = {user} handleLogout = {handleLogout}/>
                    :<li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
                }
                
            </ul>
        </header>


        </>

    
    );
}

export default Navbar;
