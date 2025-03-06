import { Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import CollectionDetails from "./pages/CollectionDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/collection/:id" element={<CollectionDetails />} />
    </Routes>
  );
}

export default App;
