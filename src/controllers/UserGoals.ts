import { User, UserGoal } from "../models";

class UserGoalController {
  async create(req: any, res: any): Promise<any> { //cria o registro de peso e meta do usuario, tbem armazena infos como idade e altura
    const { user_id, age, heigth, weigth, weigthGoal } = req.body;
    try {
    const caloriesGoal = 25 * weigthGoal;
    const proteinGoal = Math.round(0.15 * caloriesGoal / 4);
    const fatGoal = Math.round(0.25 * caloriesGoal / 9);
    const carbGoal = Math.round(0.60 * caloriesGoal / 4);
    const waterGoal = Math.round(weigth * 35);
    const existingUser = await UserGoal.findOne({ user_id });//procura se ja tem registro do caba
    console.log(existingUser);
    if (existingUser) { //se tiver não cria mais um novo pra evitar duplicatas
        return res.status(400).json({ message: 'Suas metas ja foram cadastradas' });
    }
      const newUserGoal = new UserGoal({
        user_id,
        age,
        heigth,
        weigth,
        weigthGoal,
        proteinGoal,
        fatGoal,
        carbGoal,
        waterGoal,
        caloriesGoal
      });
      const result = await newUserGoal.save();
      return res
        .status(201)
        .json({ message: "Metas registradas com sucesso", result });
    } catch (error) {
      return res.status(500).json({ message: "Erro no servidor", error });
    }
  }

  async list(req: any, res: any): Promise<any> { //so puxa as infos do caba
    const { user_id } = req.body;
    try {
      const user_data = await UserGoal.find({ user_id: user_id }).select(
        "age weigth heigth weigthGoal -_id"
      );
      console.log(user_data);
      return res.json(user_data);
    } catch (error) {
      return res.status(500).json({ message: "Erro no servidor", error });
    }
  }

  async update(req: any, res: any): Promise<any> {
    const { user_id, weigth, weigthGoal } = req.body;
    try {
      const user_data = await UserGoal.findOneAndUpdate({ user_id: user_id }, { weigth: weigth, weigthGoal:weigthGoal }, 
        {new: true, fields: "weigth weigthGoal - _id"} // seleciona e atualiza o baguio
      );
      console.log(user_data);
      if (user_data) {
        return res.json({ message: "Registro alterado com sucesso", user_data });
      }
      else {
        return res.json({ message: "Usuário inexistente!" });
      }
    } catch (error:any) {
      return res.status(500).json({ message: "Erro no servidor", error });
    }
  }
}

export default new UserGoalController();
