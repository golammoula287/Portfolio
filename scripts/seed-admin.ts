import { connectToDatabase } from "../src/lib/db/connect";
import { hashPassword } from "../src/lib/auth/password";
import { UserModel } from "../src/models/user";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set (see .env.example)");
  }

  await connectToDatabase();

  const passwordHash = await hashPassword(password);
  const user = await UserModel.findOneAndUpdate(
    { email: email.toLowerCase().trim() },
    { email: email.toLowerCase().trim(), passwordHash, role: "admin" },
    { upsert: true, returnDocument: "after" }
  );

  console.log(`Admin user ready: ${user.email}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
