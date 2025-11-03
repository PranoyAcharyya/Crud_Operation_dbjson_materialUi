import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
} from "@mui/material";

const ViewProduct = ({ view, handleClose, product }) => {
  return (
    <Dialog
      open={view}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent>
        {product ? (
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              src={product.image}
              alt={product.name}
              sx={{
                width: 150,
                height: 150,
                margin: "0 auto",
                borderRadius: "8px",
                objectFit: "contain",
              }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Category: {product.category}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Status:{" "}
              <span style={{ color: product.status === "publish" ? "green" : "red" }}>
                {product.status}
              </span>
            </Typography>
            {product.description && (
              <DialogContentText sx={{ mt: 2 }}>
                {product.description}
              </DialogContentText>
            )}
          </Box>
        ) : (
          <Typography>No product selected</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewProduct;
