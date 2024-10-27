import React from 'react'
import {Button, Nav, Navbar, NavbarBrand, NavItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Header({handleLogout}){
  const navigate = useNavigate();


  const onLogout = () => {
    console.log("Loggin out");

     handleLogout();
    navigate('/welcome');
  }


  return (
    <div>
      <Navbar  className="bg-black text-white p-2 border-none flex justify-between items-center minHeight: '100vh' w-full"> 
      <NavbarBrand href="/welcome" className='text-white'>TodoPage</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>          
            <Button color="light" onClick={onLogout}>Logout</Button>
            
         
        </NavItem>
      </Nav>
    </Navbar>
    </div>
  )
}

export default Header;
