import { Button } from "./Button";
import type { User } from "../types";
import { Link } from "./Link";
import { Modal } from "react-bootstrap";


const texts = {
  deleteButton: "Deletar",
  closeButton: "Fechar",
  editLink: "Editar",
};

export type UserViewProps = Partial<User> & {
  onDelete?: () => void | Promise<void>;
};

export function UserView({
  id,
  name,
  phone,
  email,
  address,
  birth,
  onDelete,
}: UserViewProps) {
  return (
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        {id !== undefined && (
            <>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{id !== undefined && (
              <span>#{id}</span>
            )}</p>
            <p>{phone}</p>
            <p>{email}</p>
            <p>{address}</p>
            <p>{birth}</p>
          </Modal.Body>

          <Modal.Footer>
          <Button onClick={onDelete}>
            {texts.deleteButton}
          </Button>
          <Button>
            <Link to={`/editar-usuario/${id}`}>{texts.editLink}</Link>
          </Button>
          </Modal.Footer>
        </Modal.Dialog>
        </>
          )}
      </div>
  );
}
