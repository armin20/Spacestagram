/* 
Armin Sharifiyan
*/

import { useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import { Card } from "react-bootstrap";
import CardComponent from "./CardComponent";

export default function DataManager({ data, loading }) {
  const [likePhoto, setLikePhoto] = useState([]);

  const handleLiked = (src) => {
    setLikePhoto([src, ...likePhoto]);
  };

  const handleUnLiked = (src) => {
    setLikePhoto(likePhoto.filter((element) => element.id !== src));
  };

  if (loading) {
    return (
      <>
        <h1 style={{ color: "black" }}>
          <CircularProgress/>
          Loading...
        </h1>
      </>
    );
  }

  return (
    <div style={{ marginTop: 30, marginLeft: 100, marginRight: 15 }}>
      <Grid container spacing={2}>
        {data ? (
          data.map((element, idx) => (
            <Grid key={idx} item xs={4}>
              <CardComponent
                data={element}
                key={idx}
                handleLiked={handleLiked}
                handleUnLiked={handleUnLiked}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={11}>
            <Card style={{ backgroundColor: "#F5F5F5" }}>
              <Card.Body>
                <Card.Title>No Data </Card.Title>
              </Card.Body>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
