import { ArrowBackIos, ArrowForward, ArrowForwardIos, ReceiptLong } from "@mui/icons-material";
import { Button, Grid, ImageList, ImageListItem } from "@mui/material";
import { Container } from "@mui/system";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import "../App.css";

export default function SimpleComponent(props) {
    const itemData = props.items.reduce(function (acc, cur) {
        return acc.concat(cur);
    });
    console.log("imageList:", itemData);
    const { printRef } = props;
    const [page, setPage] = React.useState(0);
    const lastPage = Math.floor((itemData.length -1) / 4);
    const startIndex = page * 4;
    const items = itemData.slice(startIndex, startIndex + 4);
    const onClickLeftButton = () => {
        if (page > 0) setPage((prePage) => prePage -1);
        else alert("첫 페이지입니다.")
    }
    const onClickRightButton = () => {
        if (page < lastPage) setPage((prePage) => prePage + 1);
        else alert("마지막 페이지입니다.")
    }
    return (
        <Grid container direction="row" alignItems="center" alignContent="center">
            <Grid item xs={1}><Button onClick={onClickLeftButton}><ArrowBackIos /></Button></Grid>
            <Grid item xs={10}>
                <ImageList sx={{ width: 390, height: 800 }} cols={2} ref={printRef} alignItems="center">
                    {items.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
                 </ImageList>
            </Grid>
            <Grid item xs={1}><Button onClick={onClickRightButton}><ArrowForwardIos /></Button></Grid>
            <Grid item xs={12} textAlign='center'>{page + 1}/{lastPage + 1}</Grid>
        </Grid>
      );
  };

//   const itemData = [
//     {
//       img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//       title: '1',
//     },
//     {
//       img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//       title: '2',
//     },
//     {
//       img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//       title: '3',
//     },
//     {
//       img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//       title: '4',
//     },
//     {
//       img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//       title: '5',
//     },
//     {
//       img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//       title: '6',
//     },
//     {
//       img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//       title: '7',
//     },
//     {
//       img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//       title: '8',
//     },
//     {
//       img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//       title: '9',
//     },
//     {
//       img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//       title: '10',
//     },
//     {
//       img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//       title: '11',
//     },
//     {
//       img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//       title: '12',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//         title: '13',
//       },
//       {
//         img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//         title: '14',
//       },
//       {
//         img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//         title: '15',
//       },
//       {
//         img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//         title: '16',
//       },
//       {
//         img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//         title: '17',
//       },
//       {
//         img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//         title: '18',
//       },
//       {
//         img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//         title: '19',
//       }
//   ];