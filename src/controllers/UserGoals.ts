import { UserGoal } from "../models";

class UserGoalController {
  async create(req: any, res: any): Promise<any> {
    const { user_id, age, heigth, weigth, weigthGoal } = req.body;
    try {
      const caloriesGoal = 25 * weigthGoal;
      const proteinGoal = Math.round(0.15 * caloriesGoal / 4);
      const fatGoal = Math.round(0.25 * caloriesGoal / 9);
      const carbGoal = Math.round(0.60 * caloriesGoal / 4);
      const waterGoal = Math.round(weigth * 35);

      const existingUser = await UserGoal.findOne({ user_id });
      if (existingUser) {
        return res.status(400).json({ message: 'Suas metas já foram cadastradas' });
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
      return res.status(201).json({ message: "Metas registradas com sucesso", result });
    } catch (error) {
      return res.status(500).json({ message: "Erro no servidor", error });
    }
  }

  async list(req: any, res: any): Promise<any> {
    const { user_id } = req.query;
    try {
      const user_data = await UserGoal.findOne({ user_id }).select(
        "age weigth heigth weigthGoal proteinGoal fatGoal carbGoal waterGoal caloriesGoal -_id"
      );
      return res.json(user_data);
    } catch (error) {
      return res.status(500).json({ message: "Erro no servidor", error });
    }
  }

  async update(req: any, res: any): Promise<any> {
    const { user_id, weigth, weigthGoal } = req.body;

    try {
      // Recupera os dados atuais do usuário
      const user_data = await UserGoal.findOne({ user_id });
      if (!user_data) {
        return res.status(404).json({ message: "Usuário inexistente!" });
      }

      // Calcula metas automáticas baseadas no novo peso
      const caloriesGoal = 25 * (weigthGoal || user_data.weigth);
      const proteinGoal = Math.round(0.15 * caloriesGoal / 4);
      const fatGoal = Math.round(0.25 * caloriesGoal / 9);
      const carbGoal = Math.round(0.60 * caloriesGoal / 4);
      const waterGoal = Math.round((weigth || user_data.weigth) * 35);

      // Define os campos atualizados
      const updatedFields = {
        weigth,
        weigthGoal,
        proteinGoal,
        fatGoal,
        carbGoal,
        waterGoal,
        caloriesGoal
      };

      // Atualiza no banco de dados
      const updatedUserData = await UserGoal.findOneAndUpdate(
        { user_id },
        updatedFields,
        { new: true, fields: "weigth weigthGoal proteinGoal fatGoal carbGoal waterGoal caloriesGoal -_id" }
      );

      return res.json({ message: "Registro alterado com sucesso", updatedUserData });
    } catch (error) {
      return res.status(500).json({ message: "Erro no servidor", error });
    }
  }
}

export default new UserGoalController();
