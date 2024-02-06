import mongoose from "mongoose";

const AvaliacaoSchema = new mongoose.Schema(
  {
    nome: String,
    nota: String,
    avaliacao: String,
  },
  { collection: "avaliacoes" }
);

export default AvaliacaoSchema;
