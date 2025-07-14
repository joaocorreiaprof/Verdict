//dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Auth
import PrivateRoute from "./auth/PrivateRoute";

//components
//import GetUsers from "./components/GetUsers";
import PublicLandingPage from "./pages/PublicLandingPage/PublicLandingPage";

//pages
import Home from "./pages/Home";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Books from "./pages/Books/Books";
import Games from "./pages/Games/Games";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GoogleAuth from "./pages/GoogleAuth";

//styles
import "./styles/App.css";

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<PrivateRoute component={Home} />} />
          <Route path="/movies" element={<PrivateRoute component={Movies} />} />
          <Route path="/series" element={<PrivateRoute component={Series} />} />
          <Route path="/books" element={<PrivateRoute component={Books} />} />
          <Route path="/games" element={<PrivateRoute component={Games} />} />
          <Route path="/google-auth" element={<GoogleAuth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
