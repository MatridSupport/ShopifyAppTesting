import { useEffect, useState } from "react";

export default function SaveData() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch manually from your API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/save-form"); // make sure this endpoint returns all saved records
        const data = await res.json();
        setRecords(data.records || []);
      } catch (err) {
        console.error("Error fetching records:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

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