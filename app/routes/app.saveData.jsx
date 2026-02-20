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

        {records.length === 0 ? (
        <p>No records found.</p>
        ) : (
        <table border="1" cellPadding="10" cellSpacing="0" width="100%">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {records.map((item) => (
                <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.message}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
        )}
    </div>
    );
}