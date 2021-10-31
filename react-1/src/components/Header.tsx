import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'

export default function Header() {
   return (
      <Navbar bg="light" expand="lg">
         <Container>
            <Navbar.Brand href="/">Главная</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link href="/change-current-city">Смена города</Nav.Link>
                  <Nav.Link href="/favorites-city">Избранные города</Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}