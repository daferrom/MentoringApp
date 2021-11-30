import React, { useState } from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Image from '../assets/images/programate-solo-color.png';
import './NavRes.css';
import UserLink from '../Navbar/UserLink'
import styled from "styled-components";

const NavRes = () => {
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

    const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
            <Logo href="">
                <img className="LogoNavbar" src={Image} alt="programate" />
            </Logo>
            <Hamburger onClick={() => setIsOpen(!isOpen)}>
                <span />
                <span />
                <span />
            </Hamburger>
            <Menu isOpen={isOpen} isLogged={isLogged}>
                <MenuLink to="/student-assignment-sessions">Sesiones Asignadas</MenuLink>
                <MenuLink to="/student-sessions">Sesiones Habilitadas</MenuLink>
                {/* <MenuLink to="">Formularios</MenuLink>
                <MenuLink to="">Informes</MenuLink> */}
                <div style={transForm}>
                        {
                            isLogged
                            ? <UserLink user = {user} handleLogout = {handleLogout}/>
                            :<p style={{display: 'none'}}><Link to="/login"><i className="login">Iniciar sesión</i> </Link></p>
                        }
                </div>
            </Menu>
    </Nav>
  );
};

const MenuLink = styled(Link)`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #000;
  font-family: Gilroy;
  font-weight: bold;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  &:hover {
    text-decoration: underline;
    color: #000
  }
`;

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-bottom: 20px;
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: #7b7fda;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

const Menu = styled.div`
  display: ${props => props.isLogged ? "flex" : "none"};
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "280px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
    z-index: 1000;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #000;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`; 

export default NavRes;

