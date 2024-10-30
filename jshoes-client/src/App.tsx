import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShoeDetail from "./components/ShoeDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shoes/:id" element={<ShoeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
