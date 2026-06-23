"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, X, Send, Cpu, Sparkles, Activity } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";

type Message = {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
};

export default function PublicAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  const isTr = locale === "tr";

  const initialMessageText = isTr 
    ? "Merhaba! Ben Enoca AI Asistanı. SAP CX Çözümleri, e-ticaret danışmanlığı veya sunduğumuz teknolojik altyapılar hakkında size nasıl yardımcı olabilirim?"
    : "Hello! I am the Enoca AI Assistant. How can I help you with our SAP CX Solutions, e-commerce consulting, or technological infrastructures?";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: initialMessageText,
      timestamp: new Date().toLocaleTimeString(isTr ? "tr-TR" : "en-US", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString(isTr ? "tr-TR" : "en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response based on public persona
    setTimeout(() => {
      let reply = isTr 
        ? "Müşteri temsilcilerimiz size daha detaylı bilgi vermek için iletişime geçebilir. 'İletişim' sayfasından bize ulaşabilirsiniz."
        : "Our customer representatives can contact you to provide more detailed information. You can reach us from the 'Contact' page.";
      
      const lower = userMsg.text.toLowerCase();

      if (lower.includes("sap") || lower.includes("hybris")) {
        reply = isTr 
          ? "SAP CX Hybris konusunda uzman ekibimizle B2B ve B2C e-ticaret süreçlerinizi uçtan uca dijitalleştiriyoruz. Danışmanlık sayfamızı inceleyebilirsiniz."
          : "With our expert team in SAP CX Hybris, we digitalize your B2B and B2C e-commerce processes from end to end. You can review our consulting page.";
      } else if (lower.includes("fiyat") || lower.includes("price") || lower.includes("cost")) {
        reply = isTr 
          ? "Fiyatlandırma projelerinizin kapsamına göre değişiklik göstermektedir. İletişim formunu doldurarak özel bir teklif alabilirsiniz."
          : "Pricing varies depending on the scope of your projects. You can get a custom quote by filling out the contact form.";
      } else if (lower.includes("iletişim") || lower.includes("contact")) {
        reply = isTr 
          ? "Üst menüdeki 'İletişim' butonuna tıklayarak iletişim formuna veya telefon numaralarımıza ulaşabilirsiniz."
          : "You can reach our contact form or phone numbers by clicking the 'Contact' button in the top menu.";
      } else if (lower.includes("merhaba") || lower.includes("selam") || lower.includes("hello") || lower.includes("hi")) {
        reply = isTr 
          ? "Merhaba! Size teknoloji ve e-ticaret projelerinizde nasıl destek olabilirim?"
          : "Hello! How can I support you with your technology and e-commerce projects?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: reply,
          timestamp: new Date().toLocaleTimeString(isTr ? "tr-TR" : "en-US", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const tTitle = "Enoca AI";
  const tOnline = isTr ? "Çevrimiçi" : "Online";
  const tPlaceholder = isTr ? "Bir mesaj yazın..." : "Type a message...";

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30 hover:scale-110 transition-transform duration-300"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDuration: '3s' }} />
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Bot className="w-6 h-6 text-white" />
          )}
          
          {/* Status Dot */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center">
                <span className="absolute w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75"></span>
            </span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[90] flex flex-col h-[500px] max-h-[calc(100vh-120px)]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm relative">
                  <Bot className="w-5 h-5 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">{tTitle}</h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1">
                    <Activity className="w-3 h-3" /> {tOnline}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                    }`}
                  >
                    {msg.sender === "ai" && <Sparkles className="w-3 h-3 text-blue-500 mb-1" />}
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex flex-col max-w-[85%] mr-auto items-start">
                  <div className="px-4 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-bl-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tPlaceholder}
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-11 h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-md shadow-blue-600/20 disabled:shadow-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
