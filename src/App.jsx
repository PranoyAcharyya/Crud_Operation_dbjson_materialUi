import Button from '@mui/material/Button';
import './App.css'
import {RouterProvider } from 'react-router-dom';
import Router from './Routing/Router';
import { Toaster } from 'sonner';

function App() {


  return (
    <>
    <Toaster position='center center'/>
     <RouterProvider router={Router}/>
    </>
  )
}

export default App
