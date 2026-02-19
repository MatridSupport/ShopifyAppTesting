import { useState } from "react";

export default function Home() {
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const res = await fetch("/api/save-form", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setSuccess(true);
      e.target.reset();
    }
  }

  return (
    <div style={{ padding: 20, background: 'white', borderRadius: '7px' }}>
      <h2>Custom Form</h2>

      {success && <p>Saved successfully ✅</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" style={{ padding: '7px',borderRadius: '7px',border: '1px solid black' }} required />
        <br /><br />

        <input name="email" type="email" placeholder="Email" style={{ padding: '7px',borderRadius: '7px',border: '1px solid black' }} required />
        <br /><br />

        <textarea name="message" placeholder="Message" style={{ padding: '7px',borderRadius: '7px',border: '1px solid black' }} required />
        <br /><br />

        <button type="submit" style={{ padding: '7px',borderRadius: '7px',border: '1px solid black', background: 'black', color: 'white', fontWeight: 'bold' }}>Submit</button>
      </form>
    </div>
  );
}
