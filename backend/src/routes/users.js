// import express from 'express';
// import * as userCtrl from '../controllers/UserController.js';



// router.post('/', userCtrl.createUser);
// router.get('/', userCtrl.getUsers);
// router.get('/:id', userCtrl.getUserById);
// router.put('/:id', userCtrl.updateUser);
// router.delete('/:id', userCtrl.deleteUser);

import express from "express";
import * as userCtrl from "../controllers/UserController.js";

const router = express.Router();

// 🟢 Cadastro de usuário
router.post("/register", userCtrl.createUser);

// 🔑 Login de usuário
router.post("/login", userCtrl.loginUser); // 👈 precisa adicionar essa função no controller

// 📋 Listar todos
router.get("/", userCtrl.getUsers);

// 🔍 Buscar por ID
router.get("/:id", userCtrl.getUserById);

// ✏️ Atualizar
router.put("/:id", userCtrl.updateUser);

// ❌ Excluir
router.delete("/:id", userCtrl.deleteUser);


export default router;
