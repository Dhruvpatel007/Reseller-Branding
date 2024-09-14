import React, { useState } from "react";
import { Grid, Container, Button, Checkbox, FormControlLabel, TextField, Typography, } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define the function to HandleLogin
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      const { token } = res.data;
      const decoded = jwtDecode(token);
      localStorage.setItem("token", token);
      if (token) {
        dispatch(login(decoded));
        navigate("/branding");
      }
    } catch (error) {
      // alert("Invalid Credential");
      toast.error("Invalid Credential")
    }
  };

  return (
    <>
       <ToastContainer />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Container maxWidth="sm" sx={{ mx: 'auto', width: 500 }} >
            <Typography component="h1" variant="h4" >
              Sign in
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="UserName"
              label="Email"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </Container>
        </Grid>
      </Grid>
    </>


  );
};

export default Login;
