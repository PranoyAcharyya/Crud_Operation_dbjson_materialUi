import React, { useState , useEffect} from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { users } from "../API/apiendpoint";
import API from "../API/apiinstance";
import Cookies from "js-cookie";

const Login = () => {
  const [formData, setformData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [userList, setUserlist] = useState([]);


   useEffect(() => {
      const userList = async () => {
        try {
          const res = await API.get(users);
          setUserlist(res.data);
        } catch (error) {
          toast(error.message);
        }
      };
  
      userList();
    }, []);
  

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newError = {};
    if (!formData.email) {
      newError.email = "Email is required";
    }
    if (!formData.password) {
      newError.password = "Password is required";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };
  const exisistingMail = userList.find((u) => u.email === formData.email);

  const exsistingPassword = userList.find(
    (u) => u.password == formData.password
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (exisistingMail) {
        if (exsistingPassword) {
          toast("login successfull");
           const token = Math.random().toString(36).substring(2, 12);
           Cookies.set("token",token,{
            expires:1
           })
            setformData({
              email: "",
            password: "",
            })
          Navigate("/admin/dashboard");

        } else {
          toast("password incorrect");
        }
      } else {
        toast("Account not found in this email, Please Sign Up");
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        sx={{
          width: 380,
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          color: "#fff",
          p: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Welcome Back
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                onChange={handleChange}
                helperText={error.email}
                error={!!error.email}
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                }}
              />
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={handleChange}
                helperText={error.password}
                error={!!error.password}
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: "10px",
                  fontWeight: "bold",
                  background: "linear-gradient(90deg,#667eea,#764ba2)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  transition: "0.3s",
                  "&:hover": {
                    background: "linear-gradient(90deg,#5a67d8,#6b46c1)",
                  },
                }}
              >
                Login
              </Button>
            </Stack>
          </form>
          <Button
            onClick={() => Navigate("/signup")}
            variant="contained"
            sx={{
              background: "white",
              color: "#000",
              marginTop: "20px",
              alignSelf: "center",
              width: "100%",
            }}
          >
            No Account? Sign Up
          </Button>
          <Button
            onClick={() => Navigate("/")}
            variant="contained"
            sx={{
              background: "white",
              color: "#000",
              marginTop: "20px",
              alignSelf: "center",
              width: "100%",
            }}
          >
            back to home
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
