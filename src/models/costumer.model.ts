import { Model, Schema, model } from "mongoose";

const CostumerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const CostumerModel: Model<any> = model("costumer", CostumerSchema);

export default CostumerModel;
