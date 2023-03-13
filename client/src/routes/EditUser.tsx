import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { delay } from "../delay";
import { useAxios } from "../useAxios";
import { Button } from "../components/Button";
import { Container, Form, Stack } from "react-bootstrap";

const texts = {
  title: "Editar cadastro",
  nameFieldPlaceholder: "Nome",
  phoneFieldPlaceholder: "Celular",
  emailFieldPlaceholder: "E-mail",
  addressFieldPlaceholder: "Address",
  birthFieldPlaceholder: "Birth",
  submitButton: "Editar",
  submitSuccess: "O cadastro foi editado com sucesso!",
  submitFailure: "Houve um erro ao editar o cadastro :(",
};

const initialEditUserState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  birth: "",
};

export function EditUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialEditUserState);
  const [disabled, setDisabled] = useState(false);
  const { id } = useParams();
  const [{ data: userData }, getUser] = useAxios(
    {
      url: `/users/${id}`,
      method: "get",
    },
    {
      manual: true,
    }
  );

  const [, editUser] = useAxios(
    {
      url: `/users/${id}`,
      method: "patch",
      data: form,
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (userData) {
      setForm(userData);
    }
  }, [userData]);

  return (
    <>
      <Container id="editar">
        <h2>{texts.title}</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome:</Form.Label>
            <Form.Control type="name" disabled={disabled}
              placeholder={texts.nameFieldPlaceholder}
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Celular:</Form.Label>
            <Form.Control disabled={disabled} placeholder={texts.phoneFieldPlaceholder}
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" disabled={disabled}
              placeholder={texts.emailFieldPlaceholder}
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="address" disabled={disabled}
              placeholder={texts.addressFieldPlaceholder}
              value={form.address}
              onChange={(event) =>
                setForm({ ...form, address: event.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data de nascimento</Form.Label>
            <Form.Control
              type="address" disabled={disabled}
              placeholder={texts.birthFieldPlaceholder}
              value={form.birth}
              onChange={(event) =>
                setForm({ ...form, birth: event.target.value })} />
          </Form.Group>
        </Form>
        <Stack>
        <Button id="btn-editar"
        disabled={disabled}
        onClick={async () => {
          await editUser();
          setDisabled(true);
          setForm(initialEditUserState);
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
