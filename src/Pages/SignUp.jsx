import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import API from "../API/apiinstance";
import { users } from "../API/apiendpoint";

const SignUp = () => {
  const [regData, setRegdata] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    gender: "",
  });

  const [error, setError] = useState({});
  const [userList, setUserlist] = useState([]);
  const Navigate = useNavigate();

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



  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegdata((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newErrors = {};

    if (!regData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (regData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!regData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(regData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!regData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (regData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!regData.ConfirmPassword.trim()) {
      newErrors.ConfirmPassword = "Required";
    } else if (regData.ConfirmPassword.length < 6) {
      newErrors.ConfirmPassword = "Password must be at least 6 characters";
    } else if (regData.password !== regData.ConfirmPassword) {
      newErrors.ConfirmPassword = "Passwords must match";
    }

    if (!regData.gender) {
      newErrors.gender = "Please select a gender";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  
  const exisistingMail = userList.find((u) => u.email === regData.email);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (!exisistingMail) {
          API.post(users, regData);
          // console.log("Form submitted successfully:", regData);
          toast("Sign Up Successful!");
          setRegdata({
            name: "",
            email: "",
            password: "",
            ConfirmPassword: "",
            gender: "",
          });
          Navigate("/login");
        } else {
          toast("Already Register! Please Login");
        }
      } catch (error) {
        toast.error(error);
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
        background: "#000",
      }}
    >
      <Card
        sx={{
          width: 700,
          borderRadius: "16px",
          background: "#fff",
          color: "#000",
          boxShadow: "0 8px 32px rgba(255,255,255,0.2)",
          p: 3,
        }}
      >
        <CardContent component="form" onSubmit={handleSubmit}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#000" }}
          >
            Sign Up
          </Typography>

          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                value={regData.name}
                onChange={handleChange}
                helperText={error.name}
                error={!!error.name}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                value={regData.email}
                onChange={handleChange}
                helperText={error.email}
                error={!!error.email}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                value={regData.password}
                onChange={handleChange}
                helperText={error.password}
                error={!!error.password}
              />
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="ConfirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={regData.ConfirmPassword}
                onChange={handleChange}
                helperText={error.ConfirmPassword}
                error={!!error.ConfirmPassword}
              />
            </Grid>

            {/* Gender in a row */}
            <Grid item xs={12}>
              <FormControl
                error={!!error.gender}
                component="fieldset"
                sx={{ width: "100%" }}
              >
                <FormLabel sx={{ color: "#000", fontWeight: 500 }}>
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={regData.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio color="primary" />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio color="primary" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio color="primary" />}
                    label="Other"
                  />
                </RadioGroup>
                {error.gender && (
                  <Typography variant="caption" color="error">
                    {error.gender}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.4,
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  background: "linear-gradient(90deg,#667eea,#764ba2)",
                  "&:hover": {
                    background: "linear-gradient(90deg,#5a67d8,#6b46c1)",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        {/* Navigation Buttons */}
        <Button
          onClick={() => Navigate("/login")}
          variant="outlined"
          sx={{
            borderColor: "#000",
            color: "#000",
            mt: 2,
            width: "100%",
            fontWeight: "bold",
          }}
        >
          Already have an account? Login
        </Button>

        <Button
          onClick={() => Navigate("/")}
          variant="outlined"
          sx={{
            borderColor: "#000",
            color: "#000",
            mt: 2,
            width: "100%",
            fontWeight: "bold",
          }}
        >
          Back to Home
        </Button>
      </Card>
    </Box>
  );
};

export default SignUp;
