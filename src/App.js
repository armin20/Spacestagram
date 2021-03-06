/* 
Armin Sharifiyan
*/

import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Button } from "@mui/material";
import { Form, FormControl, Container, Navbar, Nav } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { MdOutlineClear } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import DataManager from "./Components/DataManager";
import About from "./Components/About";
import NotFound from "./Components/NotFound";

function App() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    let APIUrl =
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

    if (date !== undefined) {
      APIUrl += `?earth_date=${date}&api_key=42Dy7B5h6XomA7TYEz0DZ2ntOcCIWJm9vU9WMpyA`;
    } else {
      APIUrl += `?sol=1000&api_key=42Dy7B5h6XomA7TYEz0DZ2ntOcCIWJm9vU9WMpyA`;
    }

    fetch(APIUrl)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setData(result.photos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  const handleUnChange = (src) => {
    setDate(src);
  };

  const handleSearch = () => {
    if (!search) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  };

  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <IoRocketOutline />
            Spacestagram App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/About">About</Nav.Link>
            </Nav>

            {search ? (
              <Form inline>
                <FormControl
                  type="date"
                  placeholder="Borough"
                  value={date}
                  onChange={(e) => handleUnChange(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSearch}
                >
                  <MdOutlineClear />
                </Button>
              </Form>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleSearch}
              >
                <BiSearch />
                Search by Date
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route path="/Data">
          <DataManager data={data} loading={loading} />
        </Route>
        <Route exact path="/About">
          <About />
        </Route>
        <Route exact path="/">
          <Redirect to="/Data" />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
