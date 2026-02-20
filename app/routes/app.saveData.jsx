import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "../db.server"; // adjust path if needed

// Loader fetches all records from ContactForm table
export async function loader() {
  const records = await prisma.contactForm.findMany({
    orderBy: { createdAt: "desc" },
  });
  return json({ records });
}

// React component displays the records
export default function SaveData() {
  const { records } = useLoaderData();

  return (
    <div style={{ padding: 20 }}>
      <h2>All Saved Records</h2>
      {records.length === 0 && <p>No records found.</p>}
      {records.map((item) => (
        <div key={item.id} style={{ marginBottom: 15 }}>
          <strong>{item.name}</strong>
          <p>{item.email}</p>
          <p>{item.message}</p>
          <small>{new Date(item.createdAt).toLocaleString()}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}