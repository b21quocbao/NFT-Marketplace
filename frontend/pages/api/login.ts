// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
// eslint-disable-next-line
const Web3 = require("web3");

type Data = {
  accessToken: string;
  refreshToken: string;
  user: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db();

  const usersCollection = db.collection("users");

  const web3 = new Web3();

  try {
    const recover = await web3.eth.accounts.recover(
      req.body.message,
      req.body.password
    );

    const recoverConvert = Web3.utils.toChecksumAddress(recover);
    const addressConvert = Web3.utils.toChecksumAddress(req.body.username);

    if (addressConvert !== recoverConvert) {
      throw new Error("WRONG_SIGNATURE");
    }
  } catch (err) {
    throw new Error("WRONG_SIGNATURE");
  }

  let user = await usersCollection.findOne({
    address: { $regex: new RegExp(req.body.username, "i") },
  });

  if (!user) {
    await usersCollection.insertOne({ address: req.body.username });
    user = await usersCollection.findOne({ address: req.body.username });
  }

  if (user) {
    const payload = {
      sub: user.id,
      address: user.address,
    };
    const accessTokenConfig = {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    };

    const refreshTokenPayload = { sub: user.id };
    const refreshTokenConfig = {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    };

    const response: Data = {
      accessToken: jwt.sign(
        payload,
        process.env.JWT_REFRESH_TOKEN_SECRET as string,
        accessTokenConfig
      ),
      refreshToken: jwt.sign(
        refreshTokenPayload,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
        refreshTokenConfig
      ),
      user,
    };

    await usersCollection.updateOne(
      { _id: user.id },
      {
        $set: { refreshToken: response.refreshToken },
      }
    );

    res.status(200).json(response);
  }
}
