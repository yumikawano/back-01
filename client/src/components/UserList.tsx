import type { User } from "../types";
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "./Button";

export type UserListProps = {
  userList: User[];
  getUser: (id: number) => Promise<void> | void;
};

export function UserList({ userList, getUser }: UserListProps) {
  return (
    <>
      {userList?.map(({ id, name, phone, createdAt }) => (
        <ListGroup>
          <ListGroup.Item key={id}
            onClick={() => {
              getUser(id);
            } }>
          </ListGroup.Item>
          <ListGroup.Item key={createdAt}>{new Date(createdAt).toLocaleDateString()}</ListGroup.Item>
          <ListGroup.Item>{name}</ListGroup.Item>
         <ListGroup.Item>{phone}</ListGroup.Item>
         <Button  onClick={() => {
              getUser(id);
            } }>Visualizar Cadastro</Button>
        </ListGroup>
      ))}
    </>
  );
}
