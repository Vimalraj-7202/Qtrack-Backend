import Plant from "../../models/plant/plant.model.js";

export const newPlant = async (data) => {
  try {
    const { plant } = data;
    if (!plant) 
      throw new Error("Plant name is required");
    const existed = await Plant.findOne({ plant });
    if (existed) throw new Error("A plant with this name already exists.")
    const newPlant = await Plant.create(data);
    return newPlant;
  } catch (error) {
    throw new Error(error.message);
  }
};
