import { useState } from "react";
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

export default function DataManager({ data, loading }) {
  const [like, setLiked] = useState(false);
  const [index, setIndex] = useState(0);

  const handleLiked = (src) => {
    setLiked(true);
    setIndex(src);
  };
  const handleUnLiked = (src) => {
    setLiked(false);
    setIndex(src);
  };

  if (loading) {
    return (
      <>
        <CircularProgress /> Loading...
      </>
    );
  }
  return (
    <div style={{ marginTop: 30, marginLeft: 100, marginRight: 15 }}>
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
                    <Button size="meduim" onClick={() => handleUnLiked(idx)}>
                      <BsHeartFill />
                    </Button>
                  ) : (
                    <Button size="small" onClick={() => handleLiked(idx)}>
                      <BsHeart /> Like
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
  );
}
