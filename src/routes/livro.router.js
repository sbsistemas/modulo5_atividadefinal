import express  from "express";
import livroController from "../controllers/livro.controller.js";
import livroValidation from "../validation/livro.valdation.js";


const router = express.Router();

router.get("/info", livroController.getLivrosInfo);
router.post("/", livroValidation.validateLivroPost, livroValidation.checkRules, livroController.createLivro);
router.get("/", livroController.getLivros);
router.get("/:id", livroController.getLivro);
router.delete("/:id", livroController.deleteLivro);
router.put("/", livroValidation.validateLivroUpdate, livroValidation.checkRules, livroController.updateLivro);

router.post("/info", livroController.createLivroInfo);
router.put("/info", livroController.updateLivroInfo);
router.delete("/info/:id", livroController.deleteLivroInfo);

router.post("/:id/avaliacao", livroController.updateAvaliacao);
router.delete("/:id/avaliacao/:indice", livroController.deleteAvaliacao);

export default router;