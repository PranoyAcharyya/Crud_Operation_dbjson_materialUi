import { Api, Category } from "@mui/icons-material";
import {
  Button,
  Container,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormHelperText,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import React, { useEffect, useState } from "react";
import API from "../../API/apiinstance";
import { products } from "../../API/apiendpoint";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const CategoryList = [
  { label: "Groccery", Value: "groccery" },
  { label: "Electronic", Value: "electronic" },
  { label: "Cosmetic", Value: "cosmetic" },
  { label: "Food", Value: "food" },
  { label: "Wear", Value: "wear" },
];

const Addproduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormdata] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    status: "",
  });

  const [error, setError] = useState({});

  const validate = () => {
    let newerror = {};
    if (!formData.name) {
      newerror.name = "Productname is required";
    }
    if (!formData.price) {
      newerror.price = "Price is required";
    }
    if (!formData.category) {
      newerror.category = "Category is required";
    }
    if (!formData.description) {
      newerror.description = "Description is required";
    }
    if (!formData.status) newerror.status = "Status is required";
    setError(newerror);
    return Object.keys(newerror).length === 0;
  };
  console.log("this is error:", error);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));

    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormdata((prev) => ({ ...prev, image: reader.result }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (id) {
        try {
          API.put(`${products}/${id}`, formData);
          toast("Product added successfully");
          navigate("/admin/product");
          // console.log(formData);
          setFormdata({
            name: "",
            price: "",
            description: "",
            category: "",
            image: "",
            status: "",
          });
        } catch (error) {
          toast.error(error);
        }
      } else {
        try {
          API.post(products, formData);
          toast("Product added successfully");
          navigate("/admin/product");
          // console.log(formData);
          setFormdata({
            name: "",
            price: "",
            description: "",
            category: "",
            image: "",
            status: "",
          });
        } catch (error) {
          toast.error(error);
        }
      }
    }
  };

  const { id } = useParams();

  useEffect(() => {
    const productById = async () => {
      setLoading(true);
      try {
        const res = await API.get(`${products}/${id}`);
        console.log("this is res", res.data);

        setFormdata(res?.data);
        console.log("this is formdata", formData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    productById();
  }, [id]);

  if (loading)
    return (
      <Box>
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      </Box>
    );

  return (
    <>
      <Container maxWidth="xxl">
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            fontSize: "60px",
            textTransform: "capitalize",
          }}
        >
          {" "}
          {id ? "Edit" : "Add"} product{" "}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: "40px",
            padding: "50px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            onChange={handleOnchange}
            helperText={error.name}
            error={error.name}
            value={formData.name}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            name="price"
            onChange={handleOnchange}
            helperText={error.price}
            error={error.price}
            value={formData.price}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              onChange={handleOnchange}
              name="category"
              value={formData.category}
              helperText={error.category}
              error={error.category}
            >
              {CategoryList.map((cat) => (
                <MenuItem value={cat.Value}>{cat.label}</MenuItem>
              ))}
            </Select>
            {error.category && (
              <FormHelperText>{error.category}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            name="description"
            label="Description"
            variant="outlined"
            onChange={handleOnchange}
            value={formData.description}
            multiline
            helperText={error.description}
            error={error.description}
            rows={4}
            InputLabelProps={{ style: { color: "#000" } }}
            InputProps={{
              style: { color: "#000" },
            }}
          />

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Status
            </FormLabel>
            <RadioGroup
              row
              name="status"
              value={formData.status}
              onChange={handleOnchange}
            >
              <FormControlLabel
                value="publish"
                control={<Radio />}
                label="Publish"
              />
              <FormControlLabel
                value="draft"
                control={<Radio />}
                label="Draft"
              />
            </RadioGroup>
            {error.status && <FormHelperText>{error.status}</FormHelperText>}
          </FormControl>

          <Box
            sx={{
              border: "2px dashed #ccc",
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            role="button"
            tabIndex={0}
            aria-label="Upload image"
            onChange={handleImageUpload}
            onClick={() => document.getElementById("uploadImage").click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                document.getElementById("uploadImage").click();
              }
            }}
          >
            {formData.image ? (
              <img
                src={formData.image}
                alt="uploaded preview"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <Typography color="textSecondary">
                Click to Upload Image
              </Typography>
            )}

            <input
              id="uploadImage"
              type="file"
              accept="image/*"
              multiple
              hidden
            />
          </Box>

          <Button variant="contained" type="submit">
            {id ? "Update" : "Submit"}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Addproduct;
