import React, { useState } from 'react'
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Stack, TextField, Checkbox, FormGroup, FormControlLabel,
  RadioGroup, Radio, FormLabel, FormControl,
  Button
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addproduct = () => {

  const [title, settitle] = useState("")
  const [slug, setslug] = useState("")
  const [desc, setdesc] = useState("")
  const [img, setimg] = useState("")
  const [color, setcolor] = useState("")
  const [price, setprice] = useState("")
  const [size, setsize] = useState("")
  const [category, setcategory] = useState("")
  const [availableQty, setavailableQty] = useState("")

  const onChange = (e) => {
    let name = e.target.name
    let val = e.target.value
    if (name == 'title') {
      settitle(val)
    }
    else if (name == 'slug') {
      setslug(val)
    }
    else if (name == 'desc') {
      setdesc(val)
    }
    else if (name == 'img') {
      setimg(val)
    }
    else if (name == 'color') {
      setcolor(val)
    }
    else if (name == 'price') {
      setprice(val)
    }
    else if (name == 'qty') {
      setavailableQty(val)
    }
    else if (name == 'size') {
      setsize(val)
    }
    else if (name == 'category') {
      setcategory(val)
    }
  }

  const onSubmitClick = async () => {
    let data = [{ title, slug, desc, img, color, price, size, category, availableQty }]
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    let res = await response.json();
    if (res.sucess) {
      toast.success('Product added successfully', {
        position: "top-left",
        autoClose: 300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      settitle("")
      setprice("")
      setavailableQty("")
      setcolor("")
      setdesc("")
      setsize("")
      setslug("")
      setcategory("")
      setimg("")
    }
    else {
      toast.error('Some error accured', {
        position: "top-left",
        autoClose: 300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

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
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CssBaseline />
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add Product">
              <Stack spacing={3}>
                <TextField
                  id="title"
                  label="Title"
                  name='title'
                  value={title}
                  onChange={onChange}
                  variant="outlined"
                />
                <TextField
                  id="slug"
                  label="Slug"
                  name='slug'
                  value={slug}
                  onChange={onChange}
                  variant="outlined"
                />
                <TextField
                  id="imgurl"
                  label="Image URL"
                  name='img'
                  value={img}
                  onChange={onChange}
                  variant="outlined"
                />
                <TextField
                  id="price"
                  label="Price"
                  name='price'
                  value={price}
                  onChange={onChange}
                  variant="outlined"
                />
                <TextField
                  id="color"
                  label="Color"
                  name='color'
                  value={color}
                  onChange={onChange}
                  variant="outlined"
                />
                <TextField
                  id="qty"
                  label="availableQty"
                  name='qty'
                  value={availableQty}
                  onChange={onChange}
                  variant="outlined"
                />
                <TextField
                  id="desc"
                  label="Description"
                  name='desc'
                  value={desc}
                  onChange={onChange}
                  multiline
                  rows={4}
                />
                <Grid>
                  <FormControl className='mr-10 md:mr-40 mb-5 md:mb-0'>
                    <FormLabel id="demo-radio-buttons-group-label">Size</FormLabel>
                    <RadioGroup
                      onChange={onChange}
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={size}
                      name="size"
                    >
                      <FormControlLabel
                        value="S"
                        control={<Radio />}
                        label="S"
                      />
                      <FormControlLabel
                        value="M"
                        control={<Radio />}
                        label="M"
                      />
                      <FormControlLabel
                        value="L"
                        control={<Radio />}
                        label="L"
                      />
                      <FormControlLabel
                        value="XL"
                        control={<Radio />}
                        label="XL"
                      />
                      <FormControlLabel
                        value="XXL"
                        control={<Radio />}
                        label="XXL"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
                    <RadioGroup onChange={onChange}
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={category}
                      name="category"
                    >
                      <FormControlLabel
                        value="T-Shirts"
                        control={<Radio />}
                        label="T-Shirts"
                      />
                      <FormControlLabel
                        value="Hoodies"
                        control={<Radio />}
                        label="Hoodies"
                      />
                      <FormControlLabel
                        value="Mugs"
                        control={<Radio />}
                        label="Mugs"
                      />
                      <FormControlLabel
                        value="Stickers"
                        control={<Radio />}
                        label="Stickers"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Stack>
              <br />
              <Button onClick={onSubmitClick} className='bg-teal-200 text-gray-700' variant='contained' mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
}

export default Addproduct