import React, { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const trimmed = input.trim();
    const normalized = trimmed.toLowerCase();

    const userMessage = { sender: "Baloch", text: input };
    setMessages((prev) => [...prev, userMessage]);

    if (normalized === "exit" || normalized === "bye") {
      setMessages((prev) => [...prev, { sender: "Nadia", text: "Bye! 👋" }]);
      setInput("");
      return;
    }

    if (normalized === "clear") {
    setMessages([]);
    setInput("");
    return;
    }

    const reply = { sender: "Nadia", text: "Jee 😅" };
    setMessages((prev) => [...prev, reply]);
    setInput("");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top left, #1f1f1f, #0d0d0d)",
        fontFamily: "Poppins, sans-serif",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 20,
          background: "#121212",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* header */}
        <div
          style={{
            background: "linear-gradient(135deg, #3a86ff, #4cc9f0)",
            padding: "12px 16px",
            fontWeight: 600,
            fontSize: "1.1rem",
            borderBottom: "1px solid #333",
            textAlign: "center",
          }}
        >
         👩🏻‍🦰 Nadia Chat
        </div>

        {/* message area */}
        <div
          style={{
            flex: 1,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            overflowY: messages.length > 5 ? "auto" : "hidden",
            maxHeight: messages.length > 5 ? "400px" : "unset",
            scrollbarWidth: "thin",
            scrollBehavior: "smooth",
          }}
        >
          {messages.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666" }}>
              Start chatting with Nadia 💬
            </p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf:
                    msg.sender === "Baloch" ? "flex-end" : "flex-start",
                  background:
                    msg.sender === "Baloch"
                      ? "linear-gradient(135deg, #3a86ff, #4cc9f0)"
                      : "linear-gradient(135deg, #8338ec, #ff006e)",
                  padding: "10px 14px",
                  borderRadius:
                    msg.sender === "Baloch"
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                  color: "#fff",
                  maxWidth: "80%",
                  wordBreak: "break-word",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* input area */}
        <form
          onSubmit={handleSend}
          style={{
            display: "flex",
            padding: 10,
            background: "#1a1a1a",
            borderTop: "1px solid #333",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message or "clear" to reset...'
            style={{
              flex: 1,
              padding: "10px 14px",
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              outline: "none",
              fontSize: "0.95rem",
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: 8,
              background: "linear-gradient(135deg, #4cc9f0, #3a86ff)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 16px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
