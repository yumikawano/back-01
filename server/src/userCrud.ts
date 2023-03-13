import type { User } from "./types";
import { promises as fs } from "fs";

export async function createUser(user: Partial<User>) {
  const { id: latestId } = await JSON.parse(
    (await fs.readFile("../latest-id.json")).toString()
  );
  user.id = latestId + 1;
  await fs.writeFile(
    "../latest-id.json",
    JSON.stringify({
      id: user.id,
    })
  );
  user.createdAt = new Date();
  await fs.writeFile(
    `../users/${user.id}.json`,
    JSON.stringify(user, undefined, 2)
  );

  return { success: true, user };
}

export async function deleteUser(id: number) {
  let success = false;
  let user = null;

  try {
    const userBuffer = await fs.readFile(`../users/${id}.json`);
    user = JSON.parse(userBuffer.toString());
    await fs.unlink(`../users/${id}.json`);
    success = true;
    if (!success) {
      user = null;
    }
  } catch (error) {
    console.log(error);
    success = false;
  }

  return {
    success,
    user,
  };
}

export async function getUser(id: number) {
  const userBuffer = await fs.readFile(`../users/${id}.json`);
  const user = JSON.parse(userBuffer.toString());
  return user;
}

export async function getUsers() {
  const usersPaths = (await fs.readdir("../users")).map(
    (path) => `../users/${path}`
  );

  const usersPromises = usersPaths.map((path) => fs.readFile(path));
  const usersBuffers = await Promise.all(usersPromises);
  const users = usersBuffers
    .map((user) => JSON.parse(user.toString()))
    .map(({ content, ...user }) => user);

  return users;
}

export async function updateUser(id: number, nextUser: Partial<User>) {
  const currentUserBuffer = await fs.readFile(`../users/${id}.json`);
  const currentUser = JSON.parse(currentUserBuffer.toString());
  const user = {
    ...currentUser,
    ...nextUser,
  };

  await fs.writeFile(
    `../users/${id}.json`,
    JSON.stringify(user, undefined, 2)
  );

  return { success: true, user };
}
