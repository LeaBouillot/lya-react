import { useEffect, useRef, useState } from "react";
import Chat from "../components/Chat";
import Nav from "../components/Nav";
import Typed from "typed.js";
import dotenv from "dotenv";

// Interface pour le message de reponse
interface Chat {
  id: number;
  question: string;
  answer: string;
  date: string;
}

export default function App() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "De quoi allons nous parler aujourd'hui ?",
        "Que souhaites-tu apprendre de nouveau ?",
        "Comment puis-je t'aider ?",
      ],
      typeSpeed: 20,
      contentType: "html",
      loop: true,
      cursorChar: "...",
      fadeOut: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const [isresponded, setIsResponded] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("La réponse est vide.");
  const [question, setQuestion] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>(
    process.env.OPENAT_API_KEY || " "
  );

  return (
    <main className="bg-slate-50 p-5 flex flex-col items-center justify-between min-w-full min-h-screen">
      <Nav />
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-semibold mb-10">lya</h1>
        <p className="text-xl">
          <span ref={el}></span>
        </p>
      </section>
      <Chat />
    </main>
  );
}
