import Landing from "./components/MainComps/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import LandingTwo from "./components/MainComps/Feed";
import Message from "./components/MainComps/Message";
import Setting from "./components/MainComps/Setting";
import Deleteaccount from "./components/ChangesComps/Deleteaccount";
import Updateprofile from "./components/ChangesComps/Updateprofile";
import ErrorPage from "./components/Miscellaneous/ErrorPage";
import PasswordUpdate from "./components/ChangesComps/PasswordUpdate";
import ContactUs from "./components/MainComps/ContactUs";
import Navbar from "./components/Miscellaneous/Navbar";

function LandingPage() {

  return (
    <>
      <Router>
        <Navbar />

        <Routes>

          <Route exact path="/" element={<Landing />}></Route>

          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>

          <Route exact path="/afterlogin" element={<LandingTwo />}></Route>
          <Route exact path="/message" element={<Message />}></Route>
          <Route exact path="/contact" element={<ContactUs />}></Route>
          <Route exact path="/setting" element={<Setting />}></Route>
          <Route exact path="/delete" element={<Deleteaccount />}></Route>
          <Route exact path="/update" element={<Updateprofile />}></Route>
          <Route exact path="/passwordupdate" element={<PasswordUpdate />}></Route>

          <Route exact path="*" element={<ErrorPage />}></Route>

        </Routes>
      </Router>

    </>
  );
}

export default LandingPage;