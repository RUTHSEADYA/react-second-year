// // import React from 'react';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';

// // import HomePage from './components/HomePage';
// // import SignUp from './components/SignUp';
// // import Login from './components/Login';
// // import HomeAfterRegister from './components/HomeAfterRegisret';
// // import Flowers from './components/Flowers';
// // import FlowerDetails from './components/FlowerDetails';
// // import RequestToManager from './components/RequestToManager';
// // import HomePageStyles from './css/HomePageStyle';
// // import Producer from './components/Producer';
// // import HomeAfterRegisretStyle from './css/HomeAfterRegisterStyle';
// // import ProducerDetails from './components/ProducerDetails';
// // //import FlowerDetailsStyles from './css/FlowerDetailsStyles';
// // import FlowersStyles from './css/FlowerStyles';
// // import Singers from './components/Singers';
// // import SingerDetails from './components/SingerDetails';
// // function App() {
// //   return (

// //     <BrowserRouter>
// //     <Routes>
// //     <Route path="/" element={<HomePage />} />

// //         <Route path="/home" element={<HomePage />} />
// //         <Route path="/sign-up" element={<SignUp />} />
// //         <Route path="/Login" element={<Login />} />
// //         <Route path='homeAfterRegister' element={<HomeAfterRegister/>}/>
// //         <Route path="flowers" element={<Flowers/>}/>
// //        <Route path="/flowers/:id/details" element={<FlowerDetails />} />
// //        <Route path='reqeustToManager' element={<RequestToManager/>}/>
// //        <Route path='/homePageStyle' element={<HomePageStyles/>}/>
// //        <Route path='/producer' element={<Producer/>}/>
// //        <Route path='/homeAfterRegisterStyle' element={<HomeAfterRegisretStyle/>}/>
// //        <Route path="/producer/:id/details" element={<ProducerDetails />} />
// //        <Route path="/flowerStyles" element={<FlowersStyles />} />
// //        <Route path='/singers' element={<Singers/>}/>
// //        <Route path="/singer/:id/details" element={<SingerDetails />} />









// //     </Routes>
// // </BrowserRouter>
// //   );
// // }




// // export default App;

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
// import HomePage from './components/HomePage';

// import HomeAfterRegister from './components/HomeAfterRegisret';
// import Flowers from './components/Flowers';
// import FlowerDetails from './components/FlowerDetails';
// import RequestToManager from './components/RequestToManager';
// import Producer from './components/Producer';
// import ProducerDetails from './components/ProducerDetails';
// import Singers from './components/Singers';
// import SingerDetails from './components/SingerDetails';
// import SignInAndSignUp from './components/SignInAndSignUp';
// import SupplierRequest from './components/SupplierRequest';
// import { loadUserFromStorage } from "./slices/userSlice";
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import UserProfile from './components/UserProfile';
// import Halls from './components/Halls';
// import HallDetails from './components/HallDetails';
// import WeddingServices from './components/SpecialForGroomBride';
// import About from './components/About';
// import Photographer from './components/Photographer';
// import PhotographerDetails from './components/PhotographerDetails';


// const App = () => {

//   const user = useSelector((state) => state.user.currentUser); // המידע על המשתמש המחובר
//   const dispatch = useDispatch();

//   useEffect(() => {
//       // טעינת משתמש מ-localStorage
//       dispatch(loadUserFromStorage());
//   }, [dispatch]);

//   return (
//     <BrowserRouter>
//       {/* AppBar לניווט */}
//       <AppBar position="static" sx={{ backgroundColor: 'black', color: 'gold' }}>
//         <Toolbar>
//           {/* לוגו */}
//           <Box
//             component="img"
//             src="\src\photo\קולולו (4).gif" // הכנס כאן את הנתיב לתמונת הלוגו שלך
//             alt="לוגו"
//             sx={{ height: '60px',  marginRight: 30, }}
//           />
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//                       </Typography>

//           {/* כפתורים */}
//           {user?.username === 'מנהל' && user?.password === '12' && (
//             <Button
//               component={Link}
//               to="/reqeustToManager"
//               sx={{
//                 color: 'gold',
//                 '&:hover': {
//                   color: 'white',
//                 },
//               }}
//             >
//               בקשות למנהל
//             </Button>
//           )}
//           <Button
//             component={Link}
//             to="/weddingService"
//             sx={{
//               color: 'gold',
//               '&:hover': {
//                 color: 'white',
//               },
//             }}
//           >
//             שירותים מיוחדים לחתן ולכלה
//           </Button>

// {(user?.userType === 'SUPPLIER' ||user?.username === 'מנהל' && user?.password === '12' )&&(
//             <Button 
//             component={Link}
//             to="/supplierRequest"
//             sx={{
//               color:'gold',
//               '&:hover':{
//                 color:'white'
//               },
//             }}
//             >
//               פרסום באתר
//             </Button>
//           )}
//           <Button
//             component={Link}
//             to="/home"
//             sx={{
//               color: 'gold',
//               '&:hover': {
//                 color: 'white',
//               },
//             }}
//           >
//             דף הבית
//           </Button>
         

//           <Button
//             component={Link}
//             to="/flowers"
//             sx={{
//               color: 'gold',
//               '&:hover': {
//                 color: 'white',
//               },
//             }}
//           >
//             מעצבי פרחים
//           </Button>
//           <Button
//             component={Link}
//             to="/producer"
//             sx={{
//               color:"gold",
//               '&:hover': {
//                 color: 'white',
//               },
//             }}
//           >
//             מפיקים
//           </Button>
//           <Button
//             component={Link}
//             to="/photographer"
//             sx={{
//               color:"gold",
//               '&:hover': {
//                 color: 'white',
//               },
//             }}
//           >
//             צלמים
//           </Button>
//           <Button
//             component={Link}
//             to="/halls"
//             sx={{
//               color: 'gold',
//               '&:hover': {
//                 color: 'white',
//               },
//             }}
//           >
//             אולמות
//           </Button>
//           <Button
//             component={Link}
//             to="/singers"
//             sx={{
//               color: 'gold',
//               '&:hover': {
//                 color: 'white',
//               },
//             }}
//           >
//             זמרים
//           </Button>
          
//           <Button
//             component={Link}
//             to="/about"
//             sx={{
//               color: 'gold',
//               '&:hover': {
//                 color: 'white',
//               },
//             }}
//           >
//             אודותינו
//           </Button>


//          {!user &&(

//          <Button
//       component={Link}
//       to="/signInAndSignUp"
//       sx={{
//         backgroundColor: 'black',
//         color: 'gold',
//         padding: '8px 16px',
//         border: '2px solid gold',
//         marginRight:"16px",
//         borderRadius: '8px',
//         fontWeight: 'bold',
//         textTransform: 'none',
//         fontSize: '16px',
//         '&:hover': {
//           backgroundColor: 'gold',
//           color: 'black',
//           borderColor: 'black',
//         },
//       }}
    
//     >
//       התחברות
    
//     </Button>
//          )}

//     {/* פרופיל משתמש */}
//     <UserProfile />
//   </Toolbar>
//       </AppBar>

//       {/* תוכן המרכזי */}
//       <Container sx={{ minHeight: '80vh', paddingY: 4 }}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/home" element={<HomePage />} />
//           <Route path="/signInAndSignUp" element={<SignInAndSignUp/>} />
//           <Route path="/homeAfterRegister" element={<HomeAfterRegister />} />
//           <Route path="/flowers" element={<Flowers />} />
//           <Route path="/flowers/:id/details" element={<FlowerDetails />} />
//           <Route path="/reqeustToManager" element={<RequestToManager />} />
//           <Route path="/producer" element={<Producer />} />
//           <Route path="/producer/:id/details" element={<ProducerDetails />} />
//           <Route path="/singers" element={<Singers />} />
//           <Route path="/singer/:id/details" element={<SingerDetails />} />
//           <Route path='/supplierRequest' element={<SupplierRequest/>}/>
//           <Route path='/userProfile' element={<UserProfile/>}/>
//           <Route path="/halls" element={<Halls />} />
//           <Route path="/halls/:id/details" element={<HallDetails />} />
//           <Route path="/weddingService" element={< WeddingServices/>} />
//           <Route path="/about" element={<About/>}/>
//           <Route path="/photographer" element={<Photographer/>}/>
//           <Route path="/photographers/:id/details" element={<PhotographerDetails />} />





          
//         </Routes>
//       </Container>

//       {/* פוטר */}
//       <Box
//         sx={{
//           backgroundColor: 'black',
//           color: 'gold',
//           textAlign: 'center',
//           padding: 2,
//           marginTop: 'auto',
//         }}
//       >
//         <Typography variant="body2">© כל הזכויות שמורות - A&R</Typography>
//       </Box>
//     </BrowserRouter>
//   );
// };

// export default App;


import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';import { useDispatch } from 'react-redux';
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


// ייבוא שאר הקומפוננטות...

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // טעינת משתמש מ-localStorage
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* ניווט */}
      <Navbar />

      {/* תוכן המרכזי */}
      <Container sx={{ minHeight: '80vh', paddingY: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
           <Route path="/signInAndSignUp" element={<SignInAndSignUp/>} />
           <Route path="/flowers" element={<Flowers />} />
           <Route path="/flowers/:id/details" element={<FlowerDetails />} />
           <Route path="/reqeustToManager" element={<RequestToManager />} />
           <Route path="/producer" element={<Producer />} />
           <Route path="/producer/:id/details" element={<ProducerDetails />} />
          <Route path="/singers" element={<Singers />} />
          <Route path="/singer/:id/details" element={<SingerDetails />} />
/         <Route path='/supplierRequest' element={<SupplierRequest/>}/>
         <Route path='/userProfile' element={<UserProfile/>}/>
          <Route path="/halls" element={<Halls />} />
           <Route path="/halls/:id/details" element={<HallDetails />} />
           <Route path="/weddingService" element={< WeddingServices/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/photographer" element={<Photographer/>}/>
          <Route path="/photographers/:id/details" element={<PhotographerDetails />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/catering/:id/details" element={<CateringDetails/>} />







          {/* שאר ה-Routes */}
        </Routes>
      </Container>

      {/* פוטר */}
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

