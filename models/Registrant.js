import { Schema, model, models } from 'mongoose';

const registrantModel = new Schema({
  name: String,
  email: String
});

const Registrant = models.Registrant || model('Registrant', registrantModel);

export default Registrant;
