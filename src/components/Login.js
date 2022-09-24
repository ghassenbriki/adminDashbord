import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';



async function loginUser(credentials) {
  return fetch('http://localhost:5001/api/AdminAuth/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    

    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    .catch(err=>console.log(err))
 }


 const theme = createTheme();

 export default function SignIn() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };


  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await loginUser({
      username,
      password
    });
   
  
    if (res.success) {
      swal("Success", "you're logged in", "success", {
        buttons: false,
        timer: 1000,
      })
      .then((value) => {
        localStorage.setItem('token', res.response.token);
      
      });
    } else {

      
      swal("Failed", "verifiez vos coordonées", "error");
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={onChangeUsername}
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
              onChange={onChangePassword}
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
            >
              Sign In
            </Button>
          
          </Box>
        </Box>
     
      </Container>
    </ThemeProvider>
  );
}