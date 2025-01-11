


import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {   Typography, Container, Box } from '@mui/material'; import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from "./slices/userSlice";
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';

import Flowers from './components/Flowers';
import FlowerDetails from './components/FlowerDetails';
import RequestToManager from './components/RequestToManager';
import Producer from './components/Producer';
import ProducerDetails from './components/ProducerDetails';
import Singers from './components/Singers';
import SingerDetails from './components/SingerDetails';
import SignInAndSignUp from './components/SignInAndSignUp';
import SupplierRequest from './components/SupplierRequest';
import UserProfile from './components/UserProfile';
import Halls from './components/Halls';
import HallDetails from './components/HallDetails';
import WeddingServices from './components/SpecialForGroomBride';
import About from './components/About';
import Photographer from './components/Photographer';
import PhotographerDetails from './components/PhotographerDetails';
import Catering from './components/Catering';
import CateringDetails from './components/CateringDetails';



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />

      <Container sx={{ minHeight: '80vh', paddingY: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signInAndSignUp" element={<SignInAndSignUp />} />
          <Route path="/flowers" element={<Flowers />} />
          <Route path="/flowers/:id/details" element={<FlowerDetails />} />
          <Route path="/reqeustToManager" element={<RequestToManager />} />
          <Route path="/producer" element={<Producer />} />
          <Route path="/producer/:id/details" element={<ProducerDetails />} />
          <Route path="/singers" element={<Singers />} />
          <Route path="/singer/:id/details" element={<SingerDetails />} />
          <Route path='/supplierRequest' element={<SupplierRequest />} />
          <Route path='/userProfile' element={<UserProfile />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/halls/:id/details" element={<HallDetails />} />
          <Route path="/weddingService" element={< WeddingServices />} />
          <Route path="/about" element={<About />} />
          <Route path="/photographer" element={<Photographer />} />
          <Route path="/photographers/:id/details" element={<PhotographerDetails />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/catering/:id/details" element={<CateringDetails />} />







        </Routes>
      </Container>

      <Box
        sx={{
          backgroundColor: 'black',
          color: 'gold',
          textAlign: 'center',
          padding: 2,
          marginTop: 'auto',
          width: '100%',
        }}
      >
        <Typography variant="body2">© כל הזכויות שמורות - A&R</Typography>
      </Box>
    </BrowserRouter>
  );
};

export default App;

