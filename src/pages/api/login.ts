import { NextApiRequest, NextApiResponse } from "next";
import { getAdminCollection } from "../../utils/manage_teams";
import { setCookie } from "nookies";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const collection = await getAdminCollection();
    const admin = await collection.findOne({ username });

    if (admin && bcrypt.compareSync(password, admin.password)) {
      setCookie({ res }, "admin-auth", "true", {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
