import { useEffect, useRef } from "react";
import Chat from "../components/Chat";
import Nav from "../components/Nav";
import Typed from 'typed.js';

export default function App() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['De quoi allons nous parler aujourd\'hui ?', 'Que souhaites-tu apprendre de nouveau ?', 'Comment puis-je t\'aider ?'],
      typeSpeed: 20,
      contentType: 'html',
      loop: true,
      cursorChar: '...',
      fadeOut: true,
      });

      return () => {
        typed.destroy();
      };
  }, []);

  return (
    <main className="bg-slate-50 p-5 flex flex-col items-center justify-between min-w-full min-h-screen">
      <Nav />
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-semibold mb-10">lya</h1>
        <p className="text-xl"><span ref={el}></span></p>
      </section>
      <Chat />
    </main>
  )
}