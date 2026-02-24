import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Details } from './pages/Details';

// Componente principal do aplicativo, responsável por configurar as rotas usando React Router
function App() {
  return (
    <BrowserRouter>
        <Routes>
        {/* Rota principal da Pokédex */}
        <Route path="/" element={<Home />} />
        {/* Rota dinâmica para os detalhes do Pokémon */}
        <Route path="/pokemon/:name" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;