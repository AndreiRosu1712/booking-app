import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import HotelPage from './pages/HotelPage';
import Home from './pages/Home';
import ManagerHotels from './pages/ManagerHotels';
import ManagerHotelPage from './pages/ManagerHotelPage';
import ManagerChatPage from './pages/ManagerChatPage';
import MyBookings from './pages/MyBookings';
import ManagerHotelRooms from './pages/ManagerHotelRooms';
import HotelBookings from './pages/HotelBookings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manager-hotels" element={<ManagerHotels />} />
        <Route path="/manager-hotel/:id" element={<ManagerHotelPage />} />
        <Route path="/manager-hotel/:idHotel/client/:idClient" element={<ManagerChatPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        {/* aici pt hotelrooms */}
        <Route path="/manager-hotel/:id/rooms" element={<ManagerHotelRooms />} />
        <Route path="/manager-hotel/:id/bookings" element={<HotelBookings />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;