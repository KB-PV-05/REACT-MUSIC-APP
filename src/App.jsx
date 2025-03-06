import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import CollectionDetails from "./pages/CollectionDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/collection/:id" element={<CollectionDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
