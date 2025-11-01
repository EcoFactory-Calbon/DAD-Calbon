    import React, { useState, useEffect, useRef } from "react";
    import "../styles/chatbot.css";

    function ChatBot() {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Olá! 😊 Sou o assistente virtual da Calbon. Como posso te ajudar hoje?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [sessionId] = useState(() => `session_${Date.now()}`);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { sender: "usuario", text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
        // ✅ Use apenas "/chat" para que o proxy do Vite funcione
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: input, session_id: sessionId })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        setMessages(prev => [
            ...prev,
            { sender: "bot", text: data.answer || "Desculpe, não consegui entender 😅" }
        ]);
        } catch (err) {
        console.error("Erro detalhado:", err);

        const errorMessage =
            err.message.includes("Failed to fetch")
            ? "⚠️ Não foi possível conectar ao servidor remoto. Verifique se o backend está online."
            : "⚠️ Erro ao se conectar com o servidor: " + err.message;

        setMessages(prev => [...prev, { sender: "bot", text: errorMessage }]);
        } finally {
        setLoading(false); // mantém input ativo mesmo em caso de erro
        }
    };

    return (
        <div className="chat-body">
        <div className="chat-container">
            <div className="chat-card">
            <div className="chat-titulo">🤖 ChatBot Calbon</div>

            <div className="chat-mensagens">
                {messages.map((msg, idx) => (
                <div key={idx} className={`mensagem ${msg.sender}`}>
                    {msg.text}
                </div>
                ))}
                {loading && (
                <div className="mensagem bot">
                    Digitando<span className="pontos">...</span>
                </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="chat-input">
                <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={e => setInput(e.target.value)}
                />
                <button type="submit" className="btn-enviar">➤</button>
            </form>
            </div>
        </div>
        </div>
    );
    }

    export default ChatBot;
