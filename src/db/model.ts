import { model, Schema } from "mongoose";

export const MONGODB_URL =
  "mongodb+srv://altruist:XWQvOM56LJB49Iqd@user.xk1ho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// 1. Create an interface representing a document in MongoDB.
export interface Alert {
  userId: string;
  email: string;
  phone: string;
  coin: string;
  targetPrice: number;
}

// 2. Create a Schema corresponding to the document interface.
const AlertSchema = new Schema<Alert>({
  userId: String,
  email: String,
  phone: String,
  coin: String,
  targetPrice: Number,
});

// 3. Create a Model.
const AlertModel = model<Alert>("Alert", AlertSchema);

export default AlertModel;
