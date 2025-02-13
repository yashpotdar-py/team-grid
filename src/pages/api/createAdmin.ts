import { NextApiRequest, NextApiResponse } from "next";
import { getAdminCollection } from "../../utils/manage_teams";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const collection = await getAdminCollection();
    const hashedPassword = bcrypt.hashSync(password, 10);
    await collection.insertOne({ username, password: hashedPassword });
    res
      .status(200)
      .json({
        success: true,
        message: `Admin ${username} created successfully`,
      });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
