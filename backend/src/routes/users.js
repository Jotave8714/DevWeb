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

router.post("/register", userCtrl.createUser);
router.post("/login", userCtrl.loginUser);
router.get("/", userCtrl.getUsers);
router.get("/:id", userCtrl.getUserById);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

export default router;

