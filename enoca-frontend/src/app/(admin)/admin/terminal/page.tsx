"use client";

import { useState, useRef, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Terminal as TerminalIcon, ShieldAlert } from "lucide-react";

type CommandLog = {
  command: string;
  output: React.ReactNode;
  time: string;
};

export default function TerminalPage() {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: "enoca-init",
      output: (
        <div className="text-emerald-500">
          Enoca NOC Core Terminal v7.0.2<br />
          Authentication successful. System is online.<br />
          Type <span className="text-blue-400">help</span> for a list of available commands.
        </div>
      ),
      time: new Date().toLocaleTimeString("tr-TR")
    }
  ]);
  
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!mounted) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const time = new Date().toLocaleTimeString("tr-TR");
    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="text-gray-400">
            Available commands:<br />
            <span className="text-blue-400">help</span> - Show this message<br />
            <span className="text-blue-400">clear</span> - Clear the terminal<br />
            <span className="text-blue-400">system status</span> - Check core services<br />
            <span className="text-blue-400">db backup</span> - Initiate a database snapshot<br />
            <span className="text-blue-400">waf logs</span> - Tail latest WAF rejections<br />
            <span className="text-blue-400">reboot</span> - Restart node instances
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "system status":
        output = (
          <div className="text-gray-400">
            [+] API Gateway: <span className="text-emerald-400">ONLINE</span> (12ms)<br />
            [+] E-Commerce Core: <span className="text-emerald-400">ONLINE</span> (45ms)<br />
            [+] Identity Server: <span className="text-emerald-400">ONLINE</span> (22ms)<br />
            [+] DB Cluster: <span className="text-yellow-400">SYNCING</span> (3/5 nodes active)<br />
            [+] Threat Detection: <span className="text-emerald-400">ACTIVE</span> (Defcon 4)
          </div>
        );
        break;
      case "db backup":
        output = (
          <div className="text-yellow-400">
            Initiating database snapshot...<br />
            [██████████░░░░░] 64%<br />
            Snapshot created: backup_enoca_v7_10293.tar.gz<br />
            <span className="text-emerald-500">Backup successful and replicated to EU-West-3.</span>
          </div>
        );
        break;
      case "waf logs":
        output = (
          <div className="text-red-400">
            TAILING WAF LOGS...<br />
            [BLOCK] 45.33.1.2 - SQLi attempt on /api/login<br />
            [BLOCK] 104.22.9.1 - XSS payload in /contact-form<br />
            [BLOCK] 188.11.2.3 - Rate limit exceeded (DDoS heuristic)<br />
            <span className="text-gray-500">End of log tail.</span>
          </div>
        );
        break;
      case "reboot":
        output = <div className="text-red-500 flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> ACCESS DENIED. Root privileges required.</div>;
        break;
      default:
        output = <div className="text-red-400">Command not found: {cmd}. Type &apos;help&apos; for available commands.</div>;
    }

    setHistory(prev => [...prev, { command: input, output, time }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-black text-gray-300">
      <AdminHeader title="Enoca CLI Terminal" />
      
      <div className="flex-1 p-6 flex flex-col max-w-5xl mx-auto w-full">
        
        <div className="flex items-center gap-3 mb-4 text-gray-500 font-mono text-sm px-2">
          <TerminalIcon className="w-5 h-5 text-emerald-500" />
          <span>root@enoca-noc-master:~</span>
        </div>

        <div 
          className="flex-1 bg-[#0c0c0c] border border-gray-800 rounded-xl p-6 font-mono text-sm overflow-y-auto shadow-2xl relative"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="space-y-4 mb-4">
            {history.map((log, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-emerald-500 font-bold">root@enoca:~$</span>
                  <span className="text-white">{log.command}</span>
                  <span className="text-xs text-gray-600 ml-auto">{log.time}</span>
                </div>
                <div className="pl-2 border-l-2 border-gray-800 ml-1">
                  {log.output}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleCommand} className="flex items-center gap-2 text-white">
            <span className="text-emerald-500 font-bold">root@enoca:~$</span>
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono shadow-none focus:ring-0 p-0"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </form>
          <div ref={endRef} />
        </div>
        
      </div>
    </div>
  );
}
