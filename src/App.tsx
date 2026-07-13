import { Routes, Route, Navigate } from "react-router-dom";
import Personagens from "./pages/Personagens";
import Episodios from "./pages/Episodios";
import Localizacoes from "./pages/Localizacoes";
import Favoritos from "./pages/Favoritos";
import Sidebar from "./components/Sidebar";
import InfoLine from "./components/InfoLine";

function App() {
  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <InfoLine />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/personagens" />} />
            <Route path="/personagens" element={<Personagens />} />
            <Route path="/episodios" element={<Episodios />} />
            <Route path="/localizacoes" element={<Localizacoes />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
