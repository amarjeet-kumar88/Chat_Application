'use client';
import React from "react";

import { useState } from "react";

export default function ChatForm({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) {

  const [message, setMessage] = useState("")
  const HandleSubmit = (e: React.FormEvent ) => {
    e.preventDefault();
    if(message.trim() !== ""){
      onSendMessage(message);
      setMessage("");
    }
  }

  return (
  <form onSubmit={ HandleSubmit } className="flex gap-2 mt-4">
    <input 
    type="text" 
    onChange={(e) => setMessage(e.target.value)}
    className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none" 
    placeholder="Type your message...." />
    <button type="submit" className="px-4 py-2 rounded-lg text-white bg-blue-500"> Send</button>
  </form>
  )
}
