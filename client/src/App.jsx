import "./App.css";
import { Routes, Route } from "react-router-dom";
import Authpage from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Authpage />} />
    </Routes>
  );
}

export default App;
