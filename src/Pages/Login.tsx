
import * as React from 'react';
import Box  from '@mui/material/Box';
import { Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

let handleSubmit = (event: React.FormEvent<HTMLFormElement>, username: string, password: string, 
    setUsernameError: React.Dispatch<React.SetStateAction<string>>, setPasswordError: React.Dispatch<React.SetStateAction<string>> ) => {
    
    event.preventDefault()
    let failed = false

    if(username.length < 4){
        setUsernameError("username must be longer than 4")
        failed = true
    }
    if(password.length < 4){
        setPasswordError("password must be longer than 4")
        failed = true
    }
    if(!failed){
        setPasswordError("")
        setUsernameError("")
        alert("details sent")
    }
   
    
}




export function Login(){
   
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")

    const [passowrd, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    return (
        
        <>
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="p-6  flex items-center justify-center min-h-screen">
        <Paper 
        elevation={6} 
        sx={{ width: '100%', maxWidth: 400, padding: '20px', borderRadius: '8px' }}
      >
        
      <form onSubmit={(e) => handleSubmit(e, username, passowrd, setUsernameError, setPasswordError)} className= "h-[100%] space-y-4 ">
      <h1 className="text-3xl font-bold underline mx-auto block text-center mb-12 mt-12">
                Login
            </h1>
        <div className="flex justify-center">
        <TextField
            error={usernameError != ""}
          id="outlined-error-helper-text"
          label="username"
          helperText= {usernameError}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
         </div>
         <div className="flex justify-center">
        <TextField
            error={passwordError != ""}
          id="outlined-error-helper-text1"
           label="Password"
           type="password"
          helperText= {passwordError}
          value={passowrd}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
       </div>
       <Button className='w-[100%]'>
      <div className='flex gap-2'>

     
       <svg className="w-5 h-5 mx-auto" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_13183_10121)">
                            <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8">
                                </path><path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" 
                                fill="#34A853"></path><path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"></path>
                                <path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" 
                                fill="#EA4335"></path></g><defs><clipPath id="clip0_13183_10121"><rect width="20" height="20" fill="white" transform="translate(0.5)"></rect></clipPath></defs>
        </svg>

        <Typography className="normal-case text-white font-bold text-3xl mt-4 mb-2" >
         Sign In With Google
        </Typography>
        </div>
       </Button>
       
       
       <Box
        className="flex justify-center"
      >
        
      <div className='mx-auto w-[100%] mt-4 mb-20'>
      <Button type='submit' variant="contained" sx={{ backgroundColor: 'background.default',  color: 'text.primary', width:`100%`}} >
        Send
      </Button>
      </div>
      </Box>
      </form>
 
    </Paper>
    </div>
    </ThemeProvider>
        </>

           
       
        
       
       






    )
}
