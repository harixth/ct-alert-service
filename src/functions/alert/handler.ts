import { connect } from "mongoose";
import {
  formatErrorResponse,
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import AlertModel, { MONGODB_URL } from "../../db/model";
import schema from "./schema";

const find: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { price, userId } = event.body;

    await connect(MONGODB_URL);
    const range = 10;

    const alerts = price
      ? await AlertModel.find({
          targetPrice: {
            $gte: price - range,
            $lte: price + range,
          },
        })
      : await AlertModel.find({ userId });

    if (!alerts || alerts.length < 1) {
      throw new Error("There is no any matched alert");
    }

    if (price) {
      alerts.forEach(async (alert) => await AlertModel.deleteOne(alert._id));
    }

    return formatJSONResponse({
      message: `successfully find matched alerts`,
      alerts,
    });
  } catch (error) {
    return formatErrorResponse(
      {
        message:
          error.message ?? `Something when wrong during finding matched alerts`,
        error,
      },
      500
    );
  }
};

export const main = middyfy(find);
