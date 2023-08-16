// import logo from './logo.svg';
import Login from './Pages/Login';
import {Link,Navigate,useNavigate,Routes,Route,useLocation,useHistory,BrowserRouter} from "react-router-dom";
import axios from "axios";
import Register from './Pages/Register';

function App() {
  return (
    <div className="App">
        <Routes>
        <Route path="/login" element={<Login/>}/> 
        <Route path="/" element={<Register/>}/> 
          </Routes>
    </div>
  );
}

export default App;
