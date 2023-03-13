import express from "express";
import { promises as fs } from "fs";
import type { User } from "../types";
import * as userCrud from "../userCrud";

export const users = express.Router();

// Lista todos os usuário
users.get("/", async (req, res) => {
  console.log((req as any).requestDate);
  const users = await userCrud.getUsers();
  res.status(200).json(users);
});

// Adiciona um novo usuário
users.post("/", async (req, res) => {
  const result = await userCrud.createUser(req.body);
  res.status(201).json(result);
});

// Carrega um usuário pelo id
users.get("/:id", async (req, res) => {
  const user = await userCrud.getUser(Number(req.params.id));
  res.status(200).json(user);
});

// Atualiza um usuário pelo id
users.put("/:id", (req, res) => {
  req.body.createdAt = new Date(req.body.createdAt);
  res.status(200).json({
    success: true,
    data: {
      id: Number(req.params.id),
      ...req.body,
    },
  });
});

// Atualização parcial de um usuário pelo id
users.patch("/:id", async (req, res) => {
  const { success, user } = await userCrud.updateUser(
    Number(req.params.id),
    req.body
  );

  res.status(200).json({
    success,
    data: user,
  });
});

// Deleta um usuário pelo id
users.delete("/:id", async (req, res) => {
  const result = await userCrud.deleteUser(Number(req.params.id));
  res.status(200).json(result);
});
