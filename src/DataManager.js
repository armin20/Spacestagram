import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Form, FormControl } from "react-bootstrap";

export default function DataManager() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(undefined);
  const [like, setLiked] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let APIUrl =
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

    if (date !== undefined) {
      APIUrl += `?earth_date=${date}&api_key=42Dy7B5h6XomA7TYEz0DZ2ntOcCIWJm9vU9WMpyA`;
    } else {
      APIUrl += "?sol=10&api_key=42Dy7B5h6XomA7TYEz0DZ2ntOcCIWJm9vU9WMpyA";
    }

    return fetch(APIUrl)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setData(result.photos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  const handleLiked = (src) => {
    console.log(src);
    setLiked(true);
    let newData = [];
    // let oldData = [];

    // for (let i = 0; i < data.length; i++) {
    //   if (i === src) {
    //     newData.push();
    //     newData.push(like);
    //   }
    // }
    // let dt = [...data, newData];
    // setData(newData);
    // console.log(data);
  };

  const handleUnLiked = (src) => {
    setLiked(false);
    setIndex(src);
  };
  const handleUnChange = (src) => {
    console.log(src);
    setDate(src);
  };

  if (loading) {
    return (
      <>
        <CircularProgress /> Loading...
      </>
    );
  } else {
    return (
      <>
        <Form inline>
          <FormControl
            type="date"
            placeholder="Borough"
            className="mr-sm-2"
            value={date}
            onChange={(e) => handleUnChange(e.target.value)}
          />
        </Form>
        <div style={{ marginTop: 30 }}>
          <Grid container spacing={2}>
            {data ? (
              data.map((elem, idx) => (
                <Grid key={idx} item xs={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={elem.img_src}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {elem.camera.full_name}
                      </Typography>
                      <Typography gutterBottom variant="p" component="div">
                        {elem.earth_date}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {like && index === idx ? (
                        <Button size="small" onClick={() => handleUnLiked(idx)}>
                          <BsHeartFill />
                          Liked
                        </Button>
                      ) : (
                        <Button size="small" onClick={() => handleLiked(idx)}>
                          <BsHeart />
                          Like
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <h1>Error getting data... </h1>
            )}
          </Grid>
        </div>
      </>
    );
  }
}
