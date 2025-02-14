import logo from './hand.svg';
import './App.css';
import CRUD from './CRUD';
import { Navbar, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container className='d-flex align-items-center'>
          <div className="d-flex align-items-center">
            <img src={logo} alt="Logo" style={{ width: "100px", height: "100px", marginRight: "10px" }} />
            <Navbar.Brand>NeYo's Employee Web Portal</Navbar.Brand>
          </div>
        </Container>
      </Navbar>
      <CRUD />
    </div>
  );
}

export default App;
