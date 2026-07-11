import { Routes, Route, Navigate } from "react-router-dom";
import Personagens from "./pages/Personagens";
import Episodios from "./pages/Episodios";
import Localizacoes from "./pages/Localizacoes";
import Favoritos from "./pages/Favoritos";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/personagens" />} />
        <Route path="/personagens" element={<Personagens />} />
        <Route path="/episodios" element={<Episodios />} />
        <Route path="/localizacoes" element={<Localizacoes />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </div>
  );
}

export default App;
