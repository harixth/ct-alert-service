import { connect } from "mongoose";
import {
  formatErrorResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import AlertModel, { MONGODB_URL } from "../../db/model";

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    await connect(MONGODB_URL);

    const { userId, email, phone, targetPrice } = event.body;

    const newAlert = new AlertModel({
      userId,
      email,
      phone,
      targetPrice,
    });

    const alert = await newAlert.save();

    return formatJSONResponse({
      message: `successfully created new alert`,
      alert,
    });
  } catch (error) {
    let message = error.message ?? `Something when wrong during creating alert`;
    return formatErrorResponse(
      {
        message,
        error,
      },
      500
    );
  }
};

export const main = middyfy(create);
