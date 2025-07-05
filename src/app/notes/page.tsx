'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Note = {
  sender: string;
  message: string;
  time: string;
};

export default function NotesPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/login');
    } else {
      setUser(loggedInUser);
      const savedNotes = JSON.parse(localStorage.getItem('loveNotes') || '[]');
      setNotes(savedNotes);
    }
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [notes]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#fdf6f9';
  }, [darkMode]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newNote: Note = {
      sender: user!,
      message: input.trim(),
      time: new Date().toLocaleString(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('loveNotes', JSON.stringify(updatedNotes));
    setInput('');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    router.push('/login');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: darkMode ? '#121212' : '#fdf6f9',
      color: darkMode ? '#fff' : '#000',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: darkMode ? '#1e1e1e' : '#ff69b4',
        color: '#fff',
        position: 'relative'
      }}>
        <h2 style={{ margin: 0 }}>💌 Love Notes</h2>

        {/* User Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
             <span>{user}</span>
             <span style={{ fontSize: '0.8rem' }}>▼</span>
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: darkMode ? '#333' : '#fff',
              color: darkMode ? '#fff' : '#000',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              borderRadius: '6px',
              overflow: 'hidden',
              zIndex: 1000,
              minWidth: '150px',
            }}>
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: 'none',
                  backgroundColor: 'inherit',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: 'none',
                  backgroundColor: 'inherit',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notes Display */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {notes.map((note, idx) => (
          <div key={idx} style={{
            alignSelf: note.sender === user ? 'flex-end' : 'flex-start',
            backgroundColor: note.sender === user
              ? (darkMode ? '#ff8db3' : '#ffb6c1')
              : (darkMode ? '#8888dd' : '#e6e6fa'),
            padding: '12px 16px',
            borderRadius: '10px',
            maxWidth: '70%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            whiteSpace: 'pre-wrap',
          }}>
            <div style={{ fontWeight: 'bold' }}>{note.sender}</div>
            <div>{note.message}</div>
            <div style={{ fontSize: '0.75rem', textAlign: 'right', marginTop: '6px', opacity: 0.6 }}>{note.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div style={{
        padding: '16px',
        borderTop: darkMode ? '1px solid #444' : '1px solid #ddd',
        display: 'flex',
        gap: '12px',
        backgroundColor: darkMode ? '#1e1e1e' : '#fff',
      }}>
        <textarea
          placeholder="Write your heart out..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          style={{
            flex: 1,
            resize: 'none',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            backgroundColor: darkMode ? '#2c2c2c' : '#fff',
            color: darkMode ? '#fff' : '#000',
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: '12px 20px',
            backgroundColor: '#ff69b4',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
