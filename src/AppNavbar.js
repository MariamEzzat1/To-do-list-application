import { Navbar, Nav, Container, Badge, Form, Col, Row } from "react-bootstrap";
import ThemeToggleButton from "./ThemeToggleButton";

function AppNavbar({ onFilterChange, activeFilter, counts, onSearchChange }) {
  return (
    <Navbar expand="lg" className="shadow-sm bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">📝 My To-Do</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Form>
          <Nav
            className="ms-auto d-flex align-items-center gap-2"
            onSelect={(selectedKey) => onFilterChange(selectedKey)}
          >
            <Nav.Link eventKey="all" active={activeFilter === "all"}>
              All Tasks{" "}
              <Badge pill bg="secondary">
                {counts.all}
              </Badge>
            </Nav.Link>
            <Nav.Link
              eventKey="completed"
              active={activeFilter === "completed"}
            >
              Completed{" "}
              <Badge pill bg="secondary">
                {counts.completed}
              </Badge>
            </Nav.Link>
            <Nav.Link
              eventKey="important"
              active={activeFilter === "important"}
            >
              Important{" "}
              <Badge pill bg="secondary">
                {counts.important}
              </Badge>
            </Nav.Link>
            <ThemeToggleButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default AppNavbar;
