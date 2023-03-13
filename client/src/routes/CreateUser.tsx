import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { delay } from "../delay";
import { useAxios } from "../useAxios";
import { Button } from "../components/Button";
import { Container, Stack } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const texts = {
  name: "Cadastrar Clientes",
  nameFieldPlaceholder: "Insira o nome completo",
  phoneFieldPlaceholder: "Insira o número de celular",
  emailFieldPlaceholder: "Insira o e-mail",
  submitButton: "Criar agora",
  submitSuccess: "Seu cadastro foi criado com sucesso!",
  submitFailure: "Houve um erro ao criar o seu cadastro :(",
};

const initialCreateUserState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  birth: "",
};

export function CreateUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialCreateUserState);
  const [disabled, setDisabled] = useState(false);
  const [, createUser] = useAxios(
    {
      url: "/users",
      method: "post",
      data: form,
    },
    {
      manual: true,
    }
  );

  return (
    <>
      <Container className="create-user">
        <h2>{texts.name}</h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome:</Form.Label>
            <Form.Control placeholder={texts.nameFieldPlaceholder}
              value={form.name} disabled={disabled}
              onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" disabled={disabled} placeholder={texts.emailFieldPlaceholder}
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Celular:</Form.Label>
            <Form.Control disabled={disabled} placeholder={texts.phoneFieldPlaceholder}
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              placeholder="Informe seu endereço"
              value={form.address}
              onChange={(event) =>
                setForm({ ...form, address: event.target.value })} />
          </Form.Group>
          <Form.Group controlId="inscription-number" className="mb-3">
            <Form.Label className="m-0">Data de nascimento</Form.Label>
            <Form.Control
              placeholder="Informe sua data de nascimento"
              value={form.birth}
              onChange={(event) =>
                setForm({ ...form, birth: event.target.value })} />
          </Form.Group>
        </Form>
        <Stack gap={1} className="col-md-5 mx-auto">
        <Button id="btn-cadastrar"
        disabled={disabled}
        onClick={async () => {
          await createUser();
          setDisabled(true);
          setForm(initialCreateUserState);
          toast(texts.submitSuccess);
          await delay(2);
          navigate("/");
        }}
      >
        {texts.submitButton}
      </Button>
    </Stack>
      </Container>
    </>
  );
}
