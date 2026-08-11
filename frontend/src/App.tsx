import React, { useState } from 'react';
import { Shield, Activity, Terminal, AlertTriangle, CheckCircle, ShieldAlert, Zap, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState(['root@agentshield:~$ Type a command or `help`']);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.trim().toLowerCase();
      let output = '';
      
      switch(cmd) {
        case 'waf-status':
          output = 'Coraza WAF ONLINE | Rules: 1,421 | Requests: 12,421 | Blocked: 381';
          break;
        case 'model-status':
          output = 'PromptGuard ONLINE | Transformer ONLINE | Embedding Engine ONLINE';
          break;
        case 'health':
          output = 'System Healthy | CPU: 12% | Memory: 42% | Latency: 23ms';
          break;
        case 'help':
          output = 'Commands: waf-status, model-status, health';
          break;
        case '':
          break;
        default:
          output = `Command not found: ${cmd}`;
      }
      
      setTerminalOutput([...terminalOutput, `root@agentshield:~$ ${cmd}`, output]);
      setTerminalInput('');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AgentShield-X Ultimate
          </h1>
        </div>
        <div className="flex items-center space-x-4 text-sm font-semibold">
          <div className="flex items-center text-success"><CheckCircle className="w-4 h-4 mr-2"/> FIREWALL ACTIVE</div>
          <div className="flex items-center text-secondary"><Lock className="w-4 h-4 mr-2"/> PRIVACY MODE</div>
        </div>
      </header>

      <nav className="flex space-x-4 mb-8">
        <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'hover:bg-gray-800 text-gray-400'}`}>
          AI-SOC Dashboard
        </button>
        <button onClick={() => setActiveTab('terminal')} className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'terminal' ? 'bg-primary text-white' : 'hover:bg-gray-800 text-gray-400'}`}>
          Security Terminal
        </button>
      </nav>

      {activeTab === 'dashboard' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 flex flex-col items-center justify-center text-center">
             <Activity className="w-12 h-12 text-primary mb-4" />
             <h2 className="text-4xl font-bold">12,482</h2>
             <p className="text-gray-400 uppercase tracking-wider text-sm mt-2">Requests Processed</p>
          </div>
          <div className="glass-panel p-6 flex flex-col items-center justify-center text-center">
             <AlertTriangle className="w-12 h-12 text-warning mb-4" />
             <h2 className="text-4xl font-bold">381</h2>
             <p className="text-gray-400 uppercase tracking-wider text-sm mt-2">Threats Detected</p>
          </div>
          <div className="glass-panel p-6 flex flex-col items-center justify-center text-center">
             <ShieldAlert className="w-12 h-12 text-danger mb-4" />
             <h2 className="text-4xl font-bold">192</h2>
             <p className="text-gray-400 uppercase tracking-wider text-sm mt-2">Connections Blocked</p>
          </div>

          <div className="col-span-1 lg:col-span-3 glass-panel p-6 mt-4">
            <h3 className="text-lg font-bold mb-6 flex items-center"><Zap className="w-5 h-5 mr-2 text-yellow-400" /> Real-time Firewall Pipeline</h3>
            <div className="flex items-center justify-between w-full relative">
               <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -z-10 -translate-y-1/2"></div>
               
               {['Internet', 'Rust Gateway', 'Go WAF', 'Transformer AI', 'Risk Engine', 'Policy'].map((step, idx) => (
                 <motion.div 
                   key={step}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.15 }}
                   className="flex flex-col items-center"
                 >
                   <div className="w-12 h-12 rounded-full bg-surface border-2 border-primary flex items-center justify-center z-10 text-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                     {idx + 1}
                   </div>
                   <p className="mt-3 font-semibold text-sm">{step}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel border-gray-700 bg-black overflow-hidden flex flex-col" style={{height: '600px'}}>
           <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
             <div className="flex items-center space-x-2">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
             </div>
             <p className="text-xs text-gray-400 font-mono">root@agentshield-x</p>
             <Terminal className="w-4 h-4 text-gray-500" />
           </div>
           
           <div className="p-4 font-mono text-sm text-green-400 flex-1 overflow-y-auto">
             {terminalOutput.map((line, i) => (
               <div key={i} className="mb-2 break-all">{line}</div>
             ))}
             <div className="flex mt-2">
               <span className="mr-2 text-primary">root@agentshield:~$</span>
               <input 
                 type="text" 
                 value={terminalInput}
                 onChange={(e) => setTerminalInput(e.target.value)}
                 onKeyDown={handleCommand}
                 className="bg-transparent border-none outline-none flex-1 text-green-400"
                 autoFocus
               />
             </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default App;
