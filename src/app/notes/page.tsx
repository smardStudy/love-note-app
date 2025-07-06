'use client';

import { useState } from 'react';

type Message = {
  user: string;
  text: string;
  time: string;
};

export default function NotesPage() {
  const [input, setInput] = useState('');
  const [user, setUser] = useState('Suryansh');
  const [messages, setMessages] = useState<Message[]>([]); // ✅ Fix

  const handleSend = async () => {
    if (!input.trim()) return;

    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, text: input.trim() }),
    });

    const data = await res.json();
    if (data.success) {
      setMessages((prev) => [
        ...prev,
        { user, text: input.trim(), time: new Date().toLocaleString() },
      ]);
      setInput('');
    } else {
      alert(data.message || 'Failed to send');
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a message..."
      />
      <button onClick={handleSend}>Send</button>

      <div>
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.user}</strong>: {m.text} — <i>{m.time}</i>
          </p>
        ))}
      </div>
    </div>
  );
}
