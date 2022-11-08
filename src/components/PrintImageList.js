import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function PrintImageList(props) {
  const items = props.items;
  return (
      <ImageList sx={{ width: 400, height: 600 }}>
      {items.map((item) => (
        <ImageListItem key={item}>
          <img
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="영수증 사진"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}