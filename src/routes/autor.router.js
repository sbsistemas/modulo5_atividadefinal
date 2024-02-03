
import express  from "express";

import autorController from "../controllers/autor.controller.js";
import autorValidation from "../validation/autor.validation.js";

const router = express.Router();

router.post("/", autorValidation.validateAutorPost, autorValidation.checkRules, autorController.createAutor);
router.get("/", autorController.getAutores);
router.get("/:id", autorController.getAutor);
router.delete("/:id", autorController.deleteAutor);
router.put("/", autorValidation.validateAutorPost, autorValidation.checkRules, autorController.updateAutor);



export default router;
