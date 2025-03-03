import { useEffect, useRef, useState } from "react";
import Chat from "../components/Chat";
import Nav from "../components/Nav";
import Typed from "typed.js";
import dotenv from "dotenv";
import OpenAI from "openai";

// Interface pour le message de réponse
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

  const [isResponded, setIsResponded] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("La réponse est vide.");
  const [question, setQuestion] = useState<string>(
    "Quel est le meilleur cocktail en été?"
  );
  const [apiKey, setApiKey] = useState<string>(
    process.env.OPENAI_API_KEY || ""
  );
  const prepromt =
    "En tant que spécialiste en préparation de cocktail. Tu reçois des questions sur la thématique des cocktails, avec tes 20 années d'expérience tu dois répondre par un message simple, vulgarisé et drôle. Voici la question à la lquelle tu répondras : ";

  const openai = new OpenAI();
  async function askOpenAI() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prepromt + question + " ?" }],
      model: "gpt-3.5-turbo",
    });

    setResponse(completion.choices[0]);
  }

  useEffect(() => {
    askOpenAI();
    console.log(response);
  }, []);

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
