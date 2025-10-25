import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";

export default function Landing() {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        color: "#000000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
            py: { xs: 6, md: 12 },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: 32, md: 56 },
                lineHeight: 1.05,
                fontWeight: 700,
                textTransform: "capitalize",
              }}
            >
              first material ui project
            </Typography>

            <Typography
              variant="body1"
              sx={{ mt: 2, color: "#222222", maxWidth: 680 }}
            >
              A clean, minimal landing hero using Material UI. White background
              and black text — ready to be extended into a full site or
              converted into your own theme.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#000000", color: "#ffffff", px: 3, py: 1.5 }}
              >
                Get started
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: "#000000",
                  borderColor: "#000000",
                  px: 3,
                  py: 1.5,
                }}
              >
                Learn more
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              width: { xs: 0, md: "40%" },
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              sx={{
                height: 320,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#555555",
                backgroundImage: `url("https://images.unsplash.com/photo-1670057046254-3b5095eb4b66?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
