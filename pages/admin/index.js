import React,{useEffect} from "react";
import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import Totalorders from "../../src/components/dashboard/Totalorders";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";

export default function Index() {
  let router = useRouter();
  useEffect(() => {
      let token = localStorage.getItem("token");
      if(!token){
        router.push(process.env.NEXT_PUBLIC_HOST);
      }
  }, [])
  
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
        <SalesOverview />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid>
      <Grid item xs={12} lg={8}>
        <Totalorders />
      </Grid>
      <Grid item xs={12} lg={12}>
        <BlogCard />
      </Grid>
    </Grid>
    </FullLayout>
      </ThemeProvider>
  );
}
