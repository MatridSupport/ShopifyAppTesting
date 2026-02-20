import prisma from "../db.server";
import { json } from "@react-router/node";

export async function loader() {
  const records = await prisma.contactForm.findMany({
    orderBy: { createdAt: "desc" },
  });

  return json({ records });
}

export async function action({ request }) {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  await prisma.contactForm.create({
    data: {
      name,
      email,
      message,
    },
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}