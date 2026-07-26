import React, { useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: "Namaste! I am your AI Agent Recommendation Assistant. Describe your business challenge, tech stack, or localized operational needs (e.g., 'I run a D2C store in Delhi and need a WhatsApp voice bot to handle orders'), and I will identify the perfect tools, estimate costs in INR, and suggest your next step."
    }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate API call
    try {
      // In a real app, you would call your backend API here
      // For now, we'll just echo a response
      const botResponse = { sender: 'assistant' as const, text: `I received your message: "${input}". This is a placeholder response. In a real implementation, this would call your backend API for a recommendation.` };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse = { sender: 'assistant' as const, text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[80%] px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-100'}`}>
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center p-4 bg-slate-900 border-t border-slate-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-lg bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={handleSubmit}
          className="ml-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;