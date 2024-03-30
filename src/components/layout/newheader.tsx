import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useStore } from '@/app/stores/store';


export default observer ( function NavBar() {
    const {userStore: {user, logout}} = useStore();

    
    function handleLogout() {
        logout();
        toast.info('successfully logged out');
        redirect(`/`);
    }

    return(
        <Navbar bg="dark" variant="dark" expand="sm" className="border-bottom box-shadow mb-3">
            <Container>
                <Navbar.Brand as={Link} href="/">3D Aerospace Museum</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/articles">Contents</Nav.Link>
                        {
                            user && 
                                <>
                                  <Nav.Link as={Link} href="/modelfiles">Modelfiles</Nav.Link>
                                  <Nav.Link as={Link} href="/attachmentfiles">Attachmentfiles</Nav.Link>
                                </>
                        }
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} href="/privacy">PrivacyPolicy</Nav.Link>                        
                        {
                            user ? 
                                <>

                                    <NavDropdown title={user.username} id="collasible-nav-dropdown-user">
                                        <NavDropdown.Item as={Link} href="/register">register</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} href="/websitesettings">WebsiteSettings</NavDropdown.Item>
                                        { process.env.NODE_ENV === 'development' &&  <NavDropdown.Item as={Link} href="/errors">Errors</NavDropdown.Item>  }     
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as="a" onClick={handleLogout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    
                                </>                            
                                :
                                <>
                                    { process.env.NODE_ENV === 'development' &&  <Nav.Link as={Link} href="/login">Login</Nav.Link>  }                   
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})