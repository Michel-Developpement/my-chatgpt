"use client";

import { TextArea } from "@/src/components/TextArea";
import { ChatCompletionRequestMessage } from "openai";
import { useState, useRef } from "react";
import { Message } from "@/src/components/Message";

export default function Home() {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([
    {
      role: "assistant",
      content: "Hello, I'm ChatGPT!",
    },
    {
      role: "user",
      content: "Hi ChatGPT!",
    },
  ]);
  const ref = useRef<HTMLUListElement>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = formData.get("user") as string;
    const newMessage = {
      role: "user",
      content: user,
    } satisfies ChatCompletionRequestMessage;
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    event.currentTarget.reset();
    scrollToLastMessage();
  };
  const scrollToLastMessage = () => {
    setTimeout(() => {
      ref.current?.children[ref.current.children.length - 1].scrollIntoView({
        behavior: "smooth",
      });
    }, 1);
  };
  return (
    <main
      className="m-auto max-w-xl flex flex-col
    py-8 h-full px-2"
    >
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          My personal ChatGPT
        </h1>
        <ul ref={ref} className="flex flex-col flex-1">
          {messages.map((message, index) => (
            <Message key={message.content + index} message={message} />
          ))}
          {messages.length === 0 && (
            <li className="text-center text-gray-400">
              No messages yet. Start chatting!
            </li>
          )}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset className="flex items-end gap-2">
          <div className="flex-1">
            <TextArea name="user" label="your message" />
          </div>
          <button
            type="submit"
            className="text-white disabled:dark:bg-blue-800 disabled:dark:text-gray-400 disabled:text-gray-400 disabled:bg-blue-300 disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </main>
  );
}
