import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { useState } from "react";
import Heart from "react-animated-heart";

export default function CardComponent({ data, handleLiked, handleUnLiked }) {
  const [liked, setLike] = useState(false);

  const handleLike = () => {
    setLike(!liked);

    if (liked) {
      handleUnLiked(data.id);
    } else {
      handleLiked(data);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={data.img_src}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Full Name: {data.camera.full_name}
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          Earth Date: {data.earth_date}
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          Rover: {data.rover.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Heart isClick={liked} onClick={() => handleLike()} />
        {!liked ? <p>Like</p> : null}
      </CardActions>
    </Card>
  );
}
