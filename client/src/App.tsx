//dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Auth
import PrivateRoute from "./auth/PrivateRoute";

//components
//import GetUsers from "./components/GetUsers";
import PublicLandingPage from "./pages/PublicLandingPage";

//pages
import Home from "./pages/Home";
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
          <Route path="/google-auth" element={<GoogleAuth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
