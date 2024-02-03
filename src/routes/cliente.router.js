import express  from "express";
import clienteController from "../controllers/cliente.controller.js";
import clienteValidation from "../validation/cliente.validation.js";

const router = express.Router();

router.post("/", clienteValidation.validateClientePost, clienteValidation.checkRules, clienteController.createCliente);
router.get("/", clienteController.getClientes);
router.get("/:id", clienteController.getCliente);
router.delete("/:id", clienteController.deleteCliente);
router.put("/", clienteValidation.validateClienteUpdate, clienteValidation.checkRules, clienteController.updateCliente);



export default router;