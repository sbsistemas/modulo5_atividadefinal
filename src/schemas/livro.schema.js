import mongoose from "mongoose";
import AvaliacaoSchema from "./avaliacao.schema";

const LivroSchema = new mongoose.Schema(
  {
    livroId: INTEGER,
    descricao: String,
    paginas: INTEGER,
    editora: String,
    avaliacaoes: [AvaliacaoSchema],
  },
  { collection: "livroInfo" }
);

export default LivroSchema;
