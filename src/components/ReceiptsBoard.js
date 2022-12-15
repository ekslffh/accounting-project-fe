import { Box, Grid } from "@mui/material";
import { Line } from "recharts";

function ReceiptsBox() {
    return (
        <>
        <Grid item xs={11}>
        <Box
          className="imageblock"
          sx={{
            width: '100%',
            height: 345,
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        />
        </Grid>
        <Grid item xs={1}>
        <Box
          className="imageblock"
          sx={{
            width: '100%',
            height: 345,
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        />
        </Grid>
        </>
    )
}

export default function ReceiptsBoard() {
    return (
        <Grid container >          
            <ReceiptsBox />
            <ReceiptsBox />
            <ReceiptsBox />
        </Grid>
    )
}