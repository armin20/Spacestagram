import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Button } from "@mui/material";
import { Form, FormControl, Container, Navbar, Nav } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import DataManager from "./Components/DataManager";
import About from "./Components/About";
import NotFound from "./Components/NotFound";
const APIKEY = process.env.APIKEY;

function App() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    let APIUrl =
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

    if (date !== undefined) {
      APIUrl += `?earth_date=${date}&api_key=${APIKEY}`;
    } else {
      APIUrl += `?sol=10&api_key=${APIKEY}`;
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
    console.log(src);
    setDate(src);
  };

  const handleSearch = () => {
    setSearch(true);
  };

  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Spacestagram App</Navbar.Brand>
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
                  className="mr-sm-2"
                  value={date}
                  onChange={(e) => handleUnChange(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  onClick={handleSearch}
                  hidden={true}
                >
                  <BiSearch />
                  Search by Date
                </Button>
              </Form>
            ) : (
              <Button
                type="submit"
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
