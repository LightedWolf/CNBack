import { Model, Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  asignedUsers: {
    type: Array,
  },
  budget: {
    type: Number,
  },
  costumer: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const ProjectModel: Model<any> = model("project", ProjectSchema);

export default ProjectModel;
