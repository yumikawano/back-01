import toast from "react-simple-toasts";
import { useAxios } from "../useAxios";
import { UserList } from "../components/UserList";
import type { User } from "../types";
import { UserView } from "../components/UserView";

const texts = {
  deleteUserSuccess: "Cadastro deletado com sucesso!",
  deleteUserFailure: "Houve um erro ao deletar cadastro :(",
};

export function ClientList() {
  const [{ data: userList }] = useAxios<User[]>({
    url: "/users",
    method: "get",
  });

  const [{ data: currentUser = {} as Partial<User> }, getUser] =
    useAxios<User>(
      {
        method: "get",
      },
      {
        manual: true,
      }
    );

  const [, deleteUser] = useAxios(
    {
      method: "delete",
    },
    {
      manual: true,
    }
  );

  return (
    <section>
      <UserView
        {...currentUser}
        onDelete={async () => {
          await deleteUser({
            url: `/users/${currentUser?.id}`,
          });
          toast(texts.deleteUserSuccess);
        }}
      />
      {userList && (
        <UserList
          userList={userList}
          getUser={(id) => {
            getUser({
              url: `/users/${id}`,
            });
          }}
        />
      )}
    </section>
  );
}