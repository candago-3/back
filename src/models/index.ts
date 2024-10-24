import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  mail: {
    type: String,
    required: true,
    unique: true,
    maxLenght: 30,
    minLenght: 5,
    validate: {
      validator: function (value: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
      },
      message: (props: any) =>
        `${props.value} não é um formato de e-mail válido.`,
    },
  },
  password: { 
    type: String,
    required: true,
    minLenght: 8,
    maxLenght: 40,
},
});

const GrupoSchema = new Schema(
  {
    gru_id: { type: Number, required: true },
    gru_descricao: {
      type: String,
      maxlength: [50, "A descrição pode ter no máximo 50 caracteres"],
      required: true,
    },
  },
  { timestamps: true }
);

const PreparacaoSchema = new Schema(
  {
    pre_id: { type: Number, required: true },
    pre_descricao: {
      type: String,
      maxlength: [50, "A descrição pode ter no máximo 50 caracteres"],
      required: true,
    },
  },
  { timestamps: true }
);

const ProdutoSchema = new Schema(
  {
    grupo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grupo",
      required: true,
      validate: {
        validator: async function (id: string) {
          const grupo = await Grupo.findById(id); // verifica se id existe na coleção editoras
          return !!grupo; // true se a editora existir
        },
        message: "O grupo fornecido não existe!",
      },
    },
    pro_id: { type: Number, required: true },
    pro_descricao: {
      type: String,
      maxlength: [100, "A descrição pode ter no máximo 100 caracteres"],
      required: true,
    },
    pro_grupo: { type: Number, required: true },
  },
  { timestamps: true }
);

const Grupo = mongoose.model("Grupo", GrupoSchema);
const Preparacao = mongoose.model(
  "Preparacao",
  PreparacaoSchema,
  "preparacoes"
);
const Produto = mongoose.model("Produto", ProdutoSchema);
const User = mongoose.model("User", userSchema)

export { Grupo, Preparacao, Produto, User };
