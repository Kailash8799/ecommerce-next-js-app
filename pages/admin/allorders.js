import React from 'react'
import { Grid } from "@mui/material";
import Totalorders from "../../src/components/dashboard/Totalorders";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import CssBaseline from "@mui/material/CssBaseline";
import mongoose from 'mongoose';
import Order from '../../models/Order';

const Allorders = ({orders}) => {
  
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        .footeradd {
          display:none;
        }
        .navbaradd {
          display:none;
        }
      `}</style>
    <CssBaseline />
    <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Totalorders orders={orders}/>
      </Grid>
    </Grid>
    </FullLayout>
      </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find();
  return {
    props: {orders:JSON.parse(JSON.stringify(orders))},
  }
}

export default Allorders