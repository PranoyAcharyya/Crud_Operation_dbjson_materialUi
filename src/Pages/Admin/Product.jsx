import {
  Avatar,
  Box,
  Button,
  colors,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue, green } from "@mui/material/colors";
import API from "../../API/apiinstance";
import { products } from "../../API/apiendpoint";
import { toast } from "sonner";
import { Style } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Product = () => {
  const navigate = useNavigate();
  const [productList, setProductlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteID,setDeleteID] = useState();

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    const ProductList = async () => {
      try {
        const resdata = await API.get(products);
        setProductlist(resdata.data);
      } catch (error) {
        toast(error);
      }
    };
    ProductList();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        return (
          <Box>
            <Avatar
              src={params?.row?.image}
              alt={params?.row?.name}
              sx={{
                height: "100px",
                width: "200px",
                objectFit: "contain",
                borderRadius: "0px",
              }}
              imgProps={{
                style: { height: "100%", width: "100%", objectFit: "contain" },
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      renderCell: (params) => {
        <h3>{params?.row?.name}</h3>;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
      renderCell: (params) => {
        return (
          <Typography
            variant="h6"
            sx={{
              color: "blue",
              fontSize: "16px",
              textTransform: "capitalize",
            }}
          >
            {params?.row?.category}
          </Typography>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return(
           <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
              textTransform: "capitalize",
            color: params?.row?.status === "publish" ? "green" : "red",
          }}
        >
          {params?.row?.status}
        </Typography>
        )
       
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Box sx={{display:"flex",gap:"5"}}>
            <IconButton
              sx={{ color: "blue" }}
              onClick={() => console.log(params?.row?.id)}
            >
              <VisibilityIcon />
            </IconButton>

            <IconButton onClick={()=>navigate(`/admin/editproduct/${params?.row?.id}`)} sx={{color:"purple"}}>
              <EditIcon />
            </IconButton>

            <IconButton sx={{ color: "red" }} onClick={handleClickOpen}>
              <DeleteIcon />
              
            </IconButton>
          </Box>
        );
      },
    },
  ];



  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Container maxWidth="xxl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: "120px",
          }}
        >
          <Typography>Products</Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/addproduct")}
          >
            Add product
          </Button>
        </Box>




        <DataGrid
          rows={productList}
          columns={columns}
          autoGenerateColumns={false}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />

         <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Item From Data"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure to remove the item from database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </Container>
    </>
  );
};

export default Product;
