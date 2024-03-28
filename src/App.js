import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Allapplicants from "./components/Allapplicants";
import Addapplicants from "./components/Addapplicants";
import Editapplicants from "./components/Editapplicants";
import Viewapplicants from "./components/Viewapplicants";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Allapplicants />} />
          <Route path="/add-applicants" element={<Addapplicants/>} />
          <Route path="/edit-applicants/:id" element={<Editapplicants />} />
          <Route path="/view-applicants/:id" element={<Viewapplicants />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
