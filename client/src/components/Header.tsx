import { Button } from "./Button";
import Logo from "../assets/images/logo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <Container>
        <Row>
          <Col>
            <a href="/" >
              <img
                src={Logo}
                className="logo"
                alt="Logo Studio"
                width={200}
                height={200}
              />
            </a>
          </Col>
          <Col className="btn-menu">
            <Button id="btn-header"
              onClick={() => {
                navigate("/");
              }}>Inicio</Button>
            <Button id="btn-header"
              onClick={() => {
                navigate("/lista-de-clientes");
              }}>Lista de Clientes</Button>
            <Button id="btn-header"
              onClick={() => {
                navigate("/criar-usuario");
              }}>Cadastrar Usuário</Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
}