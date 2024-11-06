// src/components/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';

const Chatbot = () => {
    const api_key = process.env.AI_API_KEY; 
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);

    const generateAnswer = async () => {
        // Add user question to messages
        const userMessage = { text: question, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCRph3O5a28IMILbwSW-7exwGe_a8UElmU",
                method: "POST",
                data: {
                    "contents": [{ "parts": [{ "text": question }] }]
                }
            });

            const aiMessage = {
                text: response.data.candidates[0].content.parts[0].text,
                sender: 'ai'
            };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            const errorMessage = {
                text: "Sorry, I couldn't get a response from the AI.",
                sender: 'ai'
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
        setQuestion(""); // Clear the input after sending the message
    };

    return (
        <div className="chatbot-container">
            <h3>Ask any queries to our new AI-assisted farmer here!</h3>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <span>{msg.text}</span>
                    </div>
                ))}
            </div>
            <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                cols="30"
                rows="3"
                placeholder="Type your question..."
            ></textarea>
            <button onClick={generateAnswer}>Ask AI</button>
        </div>
    );
};

export default Chatbot;
