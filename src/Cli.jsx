import { useState, useEffect, useRef } from 'react';
import React from 'react';
import emailjs from '@emailjs/browser';

export default function RakshitTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [showCommandHelp, setShowCommandHelp] = useState(false);
  const [commandCount, setCommandCount] = useState(0);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const [terminalVisible, setTerminalVisible] = useState(true);

  const [emailMode, setEmailMode] = useState(false);
  const [emailStep, setEmailStep] = useState(0);
  const [emailStatus, setEmailStatus] = useState(null);
  const [emailFormData, setEmailFormData] = useState({ name: '', email: '', message: '' });

  const portfolioData = {
    about: {
      name: "Rakshit Verma",
      title: "Backend Developer · Software Engineer · AI/ML Integrator",
      summary: "Computer Science student at IIIT Dharwad (Minor: Cybersecurity). Experienced in building scalable backend systems and web applications. Skilled in designing RESTful services using FastAPI and Django, implementing asynchronous processing, and integrating secure authentication mechanisms. Strong foundation in OOP, relational databases, Linux systems, and networking fundamentals.",
    },
    skills: [
      { category: "Languages", items: ["Python", "Java", "C"] },
      { category: "Backend", items: ["FastAPI", "Django", "REST APIs", "WebSockets"] },
      { category: "Databases", items: ["PostgreSQL", "SQLAlchemy"] },
      { category: "Distributed Systems", items: ["Redis", "RabbitMQ", "Celery"] },
      { category: "Infra & Tools", items: ["Docker", "Docker Compose", "Nginx", "Linux", "Bash", "Git"] },
      { category: "Networking", items: ["TCP/IP", "HTTP/HTTPS", "TLS", "DNS", "OIDC/JWT Authentication"] },
    ],
    experience: [
      {
        role: "GenAI Integrator",
        company: "KausalVardhanam Initiative",
        period: "2024",
        description: "Integrated TTS and ASR models into an end-to-end speech processing pipeline.\nFine-tuned speech synthesis components to improve phoneme alignment and output quality.\nDeveloped preprocessing and inference optimization modules for deployment-ready systems.\nContributed to backend architecture planning and Terraform-based infrastructure provisioning."
      }
    ],
    projects: [
      {
        name: "Distributed Real-Time Chat Platform",
        description: "Scalable event-driven chat backend with JWT-authenticated WebSockets, WebRTC peer-to-peer video, Redis Pub/Sub for horizontal scaling, RabbitMQ + Celery for async persistence, and Keycloak OIDC auth. Nginx handles SSL/TLS termination and WebSocket routing.",
        tech: "FastAPI, WebSockets, Redis, RabbitMQ, Celery, PostgreSQL, Keycloak, Nginx, Docker",
        link: "https://github.com/rakshverma/Chat-App.git",
      },
      {
        name: "Neural Net Trainer",
        description: "Web-based neural network training platform with dynamic model configuration, real-time metric streaming via SSE, file upload workflows, long-running training task management, and artifact downloads. Deployed on Railway with Gunicorn threaded workers.",
        tech: "Django, PyTorch, SSE, Docker, Railway, Gunicorn",
        link: "",
      },
      {
        name: "Constellation Detection System",
        description: "Hackathon project (Advanced to Round 3). Backend for real-time constellation detection using YOLO. End-to-end inference pipeline processes sky images, detects star patterns, and recommends visible constellations using GPS + timestamp-based sky mapping.",
        tech: "Django, YOLO, PyTorch, OpenCV, Docker, REST API",
        link: "https://github.com/TanmayGupta-play/Constellation_predictor",
      },
      {
        name: "Social Media Platform",
        description: "Full-stack social media app with user profiles, real-time feeds, likes, and comments.",
        tech: "React, Node.js, MongoDB, Tailwind CSS",
        link: "https://github.com/rakshverma/Sociofy",
      },
      {
        name: "Blog Application",
        description: "Full-stack blog platform with authentication and RESTful APIs. Containerized with Docker and deployed on Railway.",
        tech: "Django, PostgreSQL, Docker, Railway",
        link: "https://github.com/rakshverma/Happy-Blog",
      },
    ],
    contact: {
      email: "vermarakshit609@gmail.com",
      github: "https://github.com/rakshverma/",
      linkedin: "https://www.linkedin.com/in/rakshit-verma-472654313/",
      resume: "resume.pdf"
    }
  };

  const fileSystem = {
    '~': {
      type: 'directory',
      children: {
        'about.txt': { type: 'file', content: `Name: ${portfolioData.about.name}\nTitle: ${portfolioData.about.title}\n\n${portfolioData.about.summary}` },
        'contact.txt': { type: 'file', content: `Email: ${portfolioData.contact.email}\nGitHub: ${portfolioData.contact.github}\nLinkedIn: ${portfolioData.contact.linkedin}\nResume: type 'curl resume' to download` },
        'projects.txt': {
          type: 'file',
          content: portfolioData.projects.map(p =>
            `${p.name}\n${'-'.repeat(p.name.length)}\nDescription: ${p.description}\nTech: ${p.tech}\nLink: ${p.link || 'N/A'}\n`
          ).join('\n')
        },
        'skills.txt': {
          type: 'file',
          content: portfolioData.skills.map(s =>
            `${s.category}:\n${s.items.map(i => `  - ${i}`).join('\n')}`
          ).join('\n\n')
        },
        'experience.txt': {
          type: 'file',
          content: portfolioData.experience.map(e =>
            `${e.role} @ ${e.company} (${e.period})\n${'-'.repeat(30)}\n${e.description}`
          ).join('\n\n')
        }
      }
    }
  };

  const SystemInfo = () => {
    const infoLines = [
      `OS: Rakshit Verma`,
      `Host: Personal Portfolio`,
      `Kernel: React ${React.version}`,
      `Shell: Portfolio CLI`,
      `Institution: IIIT Dharwad`,
      `Degree: B.Tech CSE (Minor: Cybersecurity)`,
      `Focus: Backend · Distributed Systems · GenAI`,
    ];
    return (
      <div className="flex flex-col md:flex-row">
        <div className="text-green-500 mr-8 mb-4 md:mb-0">
          <pre className="hidden md:block text-sm font-bold leading-tight">
{`  ____       _        _     _ _   
 |  _ \\ __ _| | _____| |__ (_) |_ 
 | |_) / _\` | |/ / __| '_ \\| | __|
 |  _ < (_| |   <\\__ \\ | | | | |_ 
 |_| \\_\\__,_|_|\\_\\___/_| |_|_|\\__|
  __     __                        
  \\ \\   / /__ _ __ _ __ ___   __ _ 
   \\ \\ / / _ \\ '__| '_ \` _ \\ / _\` |
    \\ V /  __/ |  | | | | | | (_| |
     \\_/ \\___|_|  |_| |_| |_|\\__,_|`}
          </pre>
          <pre className="block md:hidden text-xs font-bold leading-tight">
{`  ____       _        _     _ _   
 |  _ \\ __ _| | _____| |__ (_) |_ 
 | |_) / _\` | |/ / __| '_ \\| | __|
 |  _ < (_| |   <\\__ \\ | | | | |_ 
 |_| \\_\\__,_|_|\\_\\___/_| |_|_|\\__|`}
          </pre>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-white text-lg mb-1">
            {portfolioData.about.name} <span className="text-green-400">@</span> <span className="text-green-300">portfolio</span>
          </div>
          <div className="border-b border-green-700 mb-2 w-48" />
          {infoLines.map((line, i) => {
            const [cat, val] = line.split(': ');
            return (
              <div key={i} className="text-sm">
                <span className="text-green-400 font-bold">{cat}:</span>{' '}
                <span className="text-white">{val}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const commands = {
    help: () => [
      'Available commands:',
      '  help              - Show this help message',
      '  about             - About me',
      '  skills            - Technical skills',
      '  projects          - Portfolio projects',
      '  experience        - Work experience',
      '  contact           - Contact information',
      '  email             - Send me an email',
      '  ls                - List files',
      '  cat <file>        - Read a file',
      '  curl resume       - Download resume',
      '  clear             - Clear terminal',
      '  shutdown          - Close terminal',
    ].join('\n'),

    about: () => `Name: ${portfolioData.about.name}\nTitle: ${portfolioData.about.title}\n\n${portfolioData.about.summary}`,

    skills: () => portfolioData.skills.map(s =>
      `${s.category}:\n${s.items.map(i => `  - ${i}`).join('\n')}`
    ).join('\n\n'),

    projects: () => portfolioData.projects.map(p =>
      `${p.name}<br/>${'-'.repeat(Math.min(p.name.length, 40))}<br/>` +
      `Description: ${p.description}<br/>` +
      `Tech: ${p.tech}<br/>` +
      (p.link ? `Link: <a href="${p.link}" target="_blank" class="text-blue-400 hover:underline">${p.link}</a>` : `Link: N/A`) +
      `<br/><br/>`
    ).join(''),

    experience: () => portfolioData.experience.map(e =>
      `${e.role} @ ${e.company} (${e.period})\n${'-'.repeat(30)}\n${e.description}`
    ).join('\n\n'),

    contact: () => {
      const c = portfolioData.contact;
      return `Email: ${c.email}<br/>` +
        `GitHub: <a href="${c.github}" target="_blank" class="text-blue-400 hover:underline">${c.github}</a><br/>` +
        `LinkedIn: <a href="${c.linkedin}" target="_blank" class="text-blue-400 hover:underline">${c.linkedin}</a><br/>` +
        `Resume: type 'curl resume' to download`;
    },

    email: () => {
      setEmailMode(true);
      setEmailStep(1);
      return "Starting email form...\nEnter your name (or type 'ctrl+c' to cancel):";
    },

    clear: () => {
      setHistory([{ type: 'systemInfo', component: <SystemInfo /> }]);
      return null;
    },

    shutdown: () => {
      setTerminalVisible(false);
      return "Shutting down terminal...";
    },

    ls: () => {
      const dir = fileSystem[currentDirectory];
      return dir ? Object.keys(dir.children).join('  ') : 'Directory not found';
    },

    cat: (args) => {
      if (!args) return 'Usage: cat <filename>';
      const dir = fileSystem[currentDirectory];
      if (!dir) return `cat: no such directory: ${currentDirectory}`;
      if (dir.children[args]) {
        return dir.children[args].type === 'file'
          ? dir.children[args].content
          : `cat: ${args}: Is a directory`;
      }
      return `cat: ${args}: No such file or directory`;
    },

    curl: (args) => {
      if (args === 'resume') {
        setTimeout(() => window.open(portfolioData.contact.resume, '_blank'), 1000);
        return "Downloading resume...\nOpening in a new tab.";
      }
      return `curl: Could not fetch: ${args}`;
    }
  };

  const processCommand = (input) => {
    const [command, ...args] = input.trim().split(' ');
    if (command === '') return '';
    if (commands[command]) return commands[command](args.join(' '));
    return `Command not found: ${command}. Type 'help' to see available commands.`;
  };

  const handleEmailInput = (input) => {
    if (input.toLowerCase() === 'ctrl+c') {
      setEmailMode(false); setEmailStep(0);
      setEmailFormData({ name: '', email: '', message: '' });
      return "Email canceled.";
    }
    switch (emailStep) {
      case 1:
        setEmailFormData(prev => ({ ...prev, name: input }));
        setEmailStep(2);
        return `Name: ${input}\nEnter your email address (or 'ctrl+c' to cancel):`;
      case 2:
        if (!input.includes('@') || !input.includes('.'))
          return "Invalid email. Please enter a valid address (or 'ctrl+c' to cancel):";
        setEmailFormData(prev => ({ ...prev, email: input }));
        setEmailStep(3);
        return `Email: ${input}\nEnter your message (or 'ctrl+c' to cancel):`;
      case 3:
        setEmailFormData(prev => ({ ...prev, message: input }));
        setEmailStep(4);
        return `Message: ${input}\n\nReview:\nName: ${emailFormData.name}\nEmail: ${emailFormData.email}\nMessage: ${input}\n\nType 'send' to confirm or 'ctrl+c' to cancel:`;
      case 4:
        if (input.toLowerCase() === 'send') { handleEmailSubmit(); return "Sending email..."; }
        else if (input.toLowerCase() !== 'ctrl+c') return "Type 'send' to confirm or 'ctrl+c' to cancel:";
        break;
      default:
        return "Something went wrong. Type 'ctrl+c' to exit.";
    }
  };

  const handleEmailSubmit = () => {
    setEmailStatus('sending');
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    emailjs.send(serviceId, templateId, {
      from_name: emailFormData.name,
      reply_to: emailFormData.email,
      message: emailFormData.message
    }).then(() => {
      setEmailStatus('success');
      setHistory(prev => [...prev, { type: 'output', text: 'Email sent successfully! Thank you.' }]);
      setEmailMode(false); setEmailStep(0);
      setEmailFormData({ name: '', email: '', message: '' });
    }).catch(() => {
      setEmailStatus('error');
      setHistory(prev => [...prev, { type: 'output', text: 'Failed to send email. Please try again.' }]);
      setEmailMode(false); setEmailStep(0);
    });
  };

  const handleSubmit = () => {
    const newCount = commandCount + 1;
    setCommandCount(newCount);
    setHistory(prev => [...prev, { type: 'command', text: `${currentDirectory} $ ${input}` }]);
    let output = emailMode ? handleEmailInput(input) : processCommand(input);
    if (output !== null) {
      setTimeout(() => {
        setHistory(prev => [...prev, { type: 'output', text: output, isHTML: typeof output === 'string' && output.includes('<a href=') }]);
      }, 80);
    }
    if (!emailMode) { setCommandHistory(prev => [...prev, input]); setHistoryIndex(-1); }
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) handleSubmit();
    } else if (e.key === 'ArrowUp' && !emailMode) {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown' && !emailMode) {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1); setInput('');
      }
    } else if (e.ctrlKey && e.key === 'c' && emailMode) {
      e.preventDefault();
      setEmailMode(false); setEmailStep(0);
      setEmailFormData({ name: '', email: '', message: '' });
      setHistory(prev => [...prev, { type: 'output', text: '^C\nEmail canceled.' }]);
      setInput('');
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const pkey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (pkey) emailjs.init(pkey);
  }, []);

  useEffect(() => {
    setHistory([
      { type: 'systemInfo', component: <SystemInfo /> },
      { type: 'output', text: 'Welcome to my portfolio terminal!' },
      { type: 'output', text: 'Type "help" to see available commands.' },
    ]);
  }, []);

  useEffect(() => {
    if (!isMobile) inputRef.current?.focus();
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history, isMobile]);

  useEffect(() => {
    const handleWindowClick = () => { if (!isMobile) inputRef.current?.focus(); };
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, [isMobile]);

  if (!terminalVisible) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-green-400 font-mono text-sm">Terminal closed. Switch to GUI mode using the button above.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-green-500 font-mono">
      {/* Terminal header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center border-b border-gray-700">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-center flex-grow text-gray-300 text-sm truncate">
          rakshit@portfolio: ~
        </div>
        <button
          className="text-gray-500 hover:text-gray-300 transition-colors"
          onClick={() => setShowCommandHelp(!showCommandHelp)}
          aria-label="Toggle help"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {showCommandHelp && (
        <div className="bg-gray-900 px-4 py-3 border-b border-green-900">
          <p className="text-green-400 font-bold text-sm mb-1">Quick reference</p>
          <p className="text-xs text-gray-400">help · about · skills · projects · experience · contact · email · ls · cat &lt;file&gt; · curl resume · clear · shutdown</p>
        </div>
      )}

      {/* Terminal body */}
      <div ref={terminalRef} className="flex-grow p-4 overflow-auto" style={{ background: '#0d1117' }}>
        {history.map((item, index) => (
          <div key={index} className={`mb-1 ${item.type === 'command' ? 'text-white' : item.type === 'systemInfo' ? '' : 'text-green-400'}`}>
            {item.type === 'systemInfo' ? item.component
              : item.isHTML ? <div dangerouslySetInnerHTML={{ __html: item.text }} />
              : item.text.split('\n').map((line, li) => (
                  <div key={li} className="whitespace-pre-wrap break-words leading-relaxed">{line || '\u00A0'}</div>
                ))
            }
          </div>
        ))}

        <div className="flex flex-wrap mt-2 items-center">
          <span className="text-green-500 mr-2 select-none">
            {emailMode ? 'email' : currentDirectory} $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent text-white outline-none border-none caret-green-400"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>

      {/* Mobile bar */}
      {isMobile && (
        <div className="bg-gray-800 p-2 border-t border-gray-700">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command..."
              className="flex-grow bg-gray-700 text-white px-3 py-2 rounded-l text-sm outline-none border-none"
            />
            <button onClick={handleSubmit} className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-r text-sm font-medium transition-colors">
              Run
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-800 px-4 py-1.5 text-xs text-gray-500 flex justify-between border-t border-gray-700">
        <span>
          {emailMode
            ? `email mode · step ${emailStep}/4 · ctrl+c to cancel`
            : "type 'help' for commands · ↑↓ for history"}
        </span>
        <span>{portfolioData.about.name} © {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
