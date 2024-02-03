import express  from "express";
import livroController from "../controllers/livro.controller.js";
import livroValidation from "../validation/livro.valdation.js";

const router = express.Router();

router.post("/", livroValidation.validateLivroPost, livroValidation.checkRules, livroController.createLivro);
router.get("/", livroController.getLivros);
router.get("/:id", livroController.getLivro);
router.delete("/:id", livroController.deleteLivro);
router.put("/", livroValidation.validateLivroUpdate, livroValidation.checkRules, livroController.updateLivro);



export default router;