import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
    maxLength: 50,
  },
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
    maxLenght: 60,
  },
});

const UserGoalSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: String,
    required: true,
  },
  weigth: {
    type: String,
    required: true,
    minLenght: 2,
    maxLenght: 3,
  },
  heigth: {
    type: String,
    required: true,
    minLenght: 2,
    maxLenght: 3,
  },
  weigthGoal: {
    type: String,
    required: true,
    minLenght: 2,
    maxLenght: 3,
  },
  caloriesGoal: {
    type: String,
    required: true,
    maxLenght: 5,
  },
  proteinGoal: {
    type: String,
    required: true,
    maxLenght: 5,
  },
  fatGoal: {
    type: String,
    required: true,
    maxLenght: 5,
  },
  carbGoal: {
    type: String,
    required: true,
    maxLenght: 5,
  },
  waterGoal: {
    type: String,
    required: true,
    maxLenght: 5,
  }
});

const UserDailyRefSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    prodprep_id: {
      type: String,
      required: true,
    },
    food_weigth: {
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

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
          const grupo = await Grupo.findById(id);
          return !!grupo;
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

const ProdPrepSchema = new Schema(
  {
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produto",
      required: true,
    },
    preparacao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Preparacao",
      required: true,
    },
    energia: { type: Number, required: true },
    proteina: { type: Number, required: true },
    lipidio: { type: Number, required: true },
    carboidrato: { type: Number, required: true },
    fibra: { type: Number, required: true },
    colesterol: { type: Number, required: true },
    agsaturado: { type: Number, required: true },
    agmono: { type: Number, required: true },
    agpoli: { type: Number, required: true },
    aglinoleico: { type: Number, required: true },
    aglinolenico: { type: Number, required: true },
    agtranstotal: { type: Number, required: true },
    acucartotal: { type: Number, required: true },
    acucaradicao: { type: Number, required: true },
    calcio: { type: Number, required: true },
    magnesio: { type: Number, required: true },
    manganes: { type: Number, required: true },
    fosforo: { type: Number, required: true },
    ferro: { type: Number, required: true },
    sodio: { type: Number, required: true },
    sodioadicao: { type: Number, required: true },
    potassio: { type: Number, required: true },
    cobre: { type: Number, required: true },
    zinco: { type: Number, required: true },
    selenio: { type: Number, required: true },
    retinol: { type: Number, required: true },
    vitamina_a: { type: Number, required: true },
    tiamina: { type: Number, required: true },
    riboflavina: { type: Number, required: true },
    niacina: { type: Number, required: true },
    niacina_ne: { type: Number, required: true },
    piridoxina: { type: Number, required: true },
    cobalamina: { type: Number, required: true },
    folato: { type: Number, required: true },
    vitamina_d: { type: Number, required: true },
    vitamina_e: { type: Number, required: true },
    vitamina_c: { type: Number, required: true },
  },
  { timestamps: true }
);

const Grupo = mongoose.model("Grupo", GrupoSchema);
const Preparacao = mongoose.model(
  "Preparacao",
  PreparacaoSchema,
  "preparacoes"
);
const UserDailyRef = mongoose.model("UserDailyRef", UserDailyRefSchema);
const Produto = mongoose.model("Produto", ProdutoSchema);
const User = mongoose.model("User", UserSchema);
const ProdPrep = mongoose.model("ProdPrep", ProdPrepSchema);
const UserGoal = mongoose.model("UserGoal", UserGoalSchema);

export { Grupo, Preparacao, Produto, User, ProdPrep, UserDailyRef, UserGoal };
