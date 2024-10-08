import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import CssBaseline from "@mui/material/CssBaseline";
import mongoose from 'mongoose';
import Product from '../../models/Product'
import Totalproducts from "../../src/components/dashboard/Totalproducts";
import { Grid } from '@mui/material';

const Allproduct = ({products}) => {
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
        <Totalproducts products={products}/>
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
  let products = await Product.find();
  return {
    props: {products:JSON.parse(JSON.stringify(products))},
  }
}

export default Allproduct