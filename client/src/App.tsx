import { Home } from "./routes/Home";
import { CreateUser} from "./routes/CreateUser";
import { EditUser } from "./routes/EditUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ClientList } from "./routes/ClientList";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lista-de-clientes" element={<ClientList />} />
          <Route path="/criar-usuario" element={<CreateUser />} />
          <Route path="/editar-usuario/:id" element={<EditUser />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
