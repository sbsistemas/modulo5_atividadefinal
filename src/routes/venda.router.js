import express  from "express";
import vendaController from "../controllers/venda.controller.js";
import vendaValidation from "../validation/venda.validation.js";

const router = express.Router();

router.post("/", vendaValidation.validateVendaPost, vendaValidation.checkRules, vendaController.createVenda);
router.get("/", vendaController.getVendas);
router.get("/:id", vendaController.getVenda);
router.delete("/:id", vendaController.deleteVenda);
router.put("/", vendaValidation.validateVendaUpdate, vendaValidation.checkRules, vendaController.updateVenda);



export default router;