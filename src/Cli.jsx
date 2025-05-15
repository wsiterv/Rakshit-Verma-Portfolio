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
  const [showWelcome, setShowWelcome] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const [terminalVisible, setTerminalVisible] = useState(true);
  
  const [emailMode, setEmailMode] = useState(false);
  const [emailStep, setEmailStep] = useState(0);
  const [emailStatus, setEmailStatus] = useState(null);
  const [emailFormData, setEmailFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const portfolioData = {
    about: {
      name: "Rakshit Verma",
      title: "AI-Powered Full Stack Developer",
      summary: "I'm a passionate developer with experience in React, Node.js, and Python. I love building intuitive and responsive web applications that solve real-world problems.",
    },
    skills: [
      { category: "Frontend", items: ["React", "TypeScript", "HTML/CSS", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "Express", "Python/Django", "SQL/NoSQL"] },
      { category: "Tools", items: ["Docker",  "Linux/Bash",] }
    ],
    projects: [
      {
        name: "Blog Site",
        description: "A responsive blog platform with user authentication, post creation, and comment features.",
        tech: "Django, Bootstrap",
      link: "https://github.com/rakshverma/Happy-Blog",
      },
      {
        name: "Skin Cancer Prediction",
        description: "A web app that uses deep learning to predict skin cancer from images, with user-friendly interface for uploading and viewing results.",
        tech: "TensorFlow, Django",
      link: "https://github.com/rakshverma/skin-cancer-prediction",
      },
      {
        name: "Social Media Platform",
        description: "A full-stack social media application with user profiles, real-time feeds, likes, and comments.",
        tech: "React, Node.js, MongoDB, Tailwind CSS",
      link: "https://github.com/rakshverma/Sociofy",
      }
    ],
    experience: [],
    contact: {
      email: "raks@gmail.com",
      github: "https://github.com/rakshverma/",
      linkedin: "https://www.linkedin.com/in/rakshit-verma-472654313/",
      resume: "resume.pdf"
    }
  };

  const fileSystem = {
    '~': {
      type: 'directory',
      children: {
        'about.txt': {
          type: 'file',
          content: `Name: ${portfolioData.about.name}\nTitle: ${portfolioData.about.title}\n\n${portfolioData.about.summary}`
        },
        'contact.txt': {
          type: 'file',
          content: `Email: ${portfolioData.contact.email}\nGitHub: ${portfolioData.contact.github}\nLinkedIn: ${portfolioData.contact.linkedin}\nResume: ${portfolioData.contact.resume}`
        },
        'projects.txt': {
          type: 'file',
          content: portfolioData.projects.map(project => 
            `${project.name}\n${'-'.repeat(project.name.length)}\n` +
            `Description: ${project.description}\n` +
            `Tech: ${project.tech}\n` +
            `Link: ${project.link}\n`
          ).join('\n')
        },
        'skills.txt': {
          type: 'file',
          content: portfolioData.skills.map(category => 
            `${category.category}:\n${category.items.map(item => `  - ${item}`).join('\n')}`
          ).join('\n\n')
        }
      }
    }
  };

  // Neofetch style summary component
  const SystemInfo = () => {
    const infoLines = [
      `OS: Rakshit Verma`,
      `Host: Personal Portfolio`,
      `Kernel: React ${React.version}`,
      `Uptime: Always available for new tech`,
      `Shell: Portfolio`,
      `CPU: Full Stack Development + AI/ML`,
      `Version: 3rd Year Student at IIIT Dharwad`,
    ];
    
    return (
      <div className="flex flex-col md:flex-row">
        <div className="text-green-500 mr-8 mb-4 md:mb-0">
<pre className="hidden md:block text-base md:text-lg font-bold leading-tight">
{`   _____       _        _     _ _     __      __                         
|  __ \\     | |      | |   (_) |    \\ \\    / /                         
| |__) |__ _| | _____| |__  _| |_    \\ \\  / /__ _ __ _ __ ___   __ _   
|  _  // _\` | |/ / __| '_ \\| | __|    \\ \\/ / _ \\ '__| '_ \` _ \\ / _\` |  
| | \\ \\ (_| |   <\\__ \\ | | | | |_      \\  /  __/ |  | | | | | | (_| |  
|_|  \\_\\__,_|_|\\_\\___/_| |_|_|\\__|      \\/ \\___|_|  |_| |_| |_|\\__,_|  
`}
      </pre>
      
      {/* Mobile version - simplified to two lines */}
      <pre className="block md:hidden text-base font-bold leading-tight">
{`   _____       _        _     _ _     
|  __ \\     | |      | |   (_) |    
| |__) |__ _| | _____| |__  _| |_   
|  _  // _\` | |/ / __| '_ \\| | __|  
| | \\ \\ (_| |   <\\__ \\ | | | | |_   
|_|  \\_\\__,_|_|\\_\\___/_| |_|_|\\__|  

__      __                         
\\ \\    / /                         
 \\ \\  / /__ _ __ _ __ ___   __ _   
  \\ \\/ / _ \\ '__| '_ \` _ \\ / _\` |  
   \\  /  __/ |  | | | | | | (_| |  
    \\/ \\___|_|  |_| |_| |_|\\__,_|  
`}
      </pre>

        </div>
        <div className="flex flex-col justify-center">
          <div className="text-white text-xl mb-2">{portfolioData.about.name} <span className="text-green-400">@</span> <span className="text-green-300">{portfolioData.about.title}</span></div>
          <div className="border-b border-green-500 mb-2"></div>
          {infoLines.map((line, index) => {
            const [category, value] = line.split(': ');
            return (
              <div key={index} className="text-sm">
                <span className="text-green-400 font-bold">{category}:</span> <span className="text-white">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Commands
  const commands = {
    help: () => {
      return [
        'Available commands:',
        '  help            - Show this help message',
        '  about           - Display information about me',
        '  skills          - List my technical skills',
        '  projects        - Show my portfolio projects',
        '  contact         - Show my contact information',
        '  email           - Send me an email through the terminal',
        '  clear           - Clear the terminal screen',
        '  ls              - List available files',
        '  cat <file>      - Display file contents',
        '  curl resume     - Download my resume',
        '  shutdown        - Close this terminal window'
      ].join('\n');
    },
    
    about: () => {
      const about = portfolioData.about;
      return `Name: ${about.name}\nTitle: ${about.title}\n\n${about.summary}`;
    },
    
    email: () => {
      setEmailMode(true);
      setEmailStep(1);
      return "Starting email form...\nPlease enter your name (or type 'ctrl+c' to cancel):";
    },
    
    skills: () => {
      return portfolioData.skills.map(category => 
        `${category.category}:\n${category.items.map(item => `  - ${item}`).join('\n')}`
      ).join('\n\n');
    },
    
projects: () => {
  return portfolioData.projects.map(project => 
    `${project.name}<br />${'-'.repeat(project.name.length)}<br />` +
    `Description: ${project.description}<br />` +
    `Tech: ${project.tech}<br />` +
    `Link: <a href="${project.link}" target="_blank" class="text-blue-400 hover:underline">${project.link}</a><br /><br />`
  ).join('');
},

    
    experience: () => {
      if (portfolioData.experience.length === 0) {
        return "Experience information is currently being updated.";
      }
      return portfolioData.experience.map(job => 
        `${job.role} at ${job.company} (${job.period})\n` +
        `${'-'.repeat(job.role.length + job.company.length + job.period.length + 7)}\n` +
        `${job.description}\n`
      ).join('\n');
    },
    
    contact: () => {
   const contact = portfolioData.contact;
return `Email: ${contact.email}<br />` + 
       `GitHub: <a href="${contact.github}" target="_blank" class="text-blue-400 hover:underline">${contact.github}</a><br />` +
       `LinkedIn: <a href="${contact.linkedin}" target="_blank" class="text-blue-400 hover:underline">${contact.linkedin}</a><br />` +
       `Resume: Type 'curl resume' to download`;

    },
    
    clear: () => {
      // Keep only the system info in history
      setHistory([{ type: 'systemInfo', component: <SystemInfo /> }]);
      return null;
    },
    
    shutdown: () => {
      setTerminalVisible(false);
      return "Shutting down terminal...";
    },
    
    ls: () => {
      const dir = fileSystem[currentDirectory];
      if (!dir) {
        return 'Directory not found';
      }
      
      const contents = Object.keys(dir.children).join('  ');
      return contents;
    },
    
    cat: (args) => {
      if (!args) {
        return 'Usage: cat <filename>';
      }
      
      const dir = fileSystem[currentDirectory];
      if (!dir) {
        return `cat: no such directory: ${currentDirectory}`;
      }
      
      if (dir.children[args]) {
        if (dir.children[args].type === 'file') {
          return dir.children[args].content;
        } else {
          return `cat: ${args}: Is a directory`;
        }
      } else {
        return `cat: ${args}: No such file or directory`;
      }
    },
    
    curl: (args) => {
      if (args === 'resume') {
        setTimeout(() => {
          window.open(portfolioData.contact.resume, '_blank');
        }, 1000);
        return "Downloading resume...\nOpening in a new tab.";
      } else {
        return `curl: Could not download: ${args}`;
      }
    }
  };

  // Process command input
  const processCommand = (input) => {
    const [command, ...args] = input.trim().split(' ');
    
    if (command === '') {
      return '';
    }
    
    if (commands[command]) {
      return commands[command](args.join(' '));
    } else {
      return `Command not found: ${command}. Type 'help' to see available commands.`;
    }
  };

  // Handle email mode input
  const handleEmailInput = (input) => {
    if (input.toLowerCase() === 'ctrl+c') {
      setEmailMode(false);
      setEmailStep(0);
      setEmailFormData({ name: '', email: '', message: '' });
      return "Email canceled.";
    }

    switch (emailStep) {
      case 1: // Name
        setEmailFormData(prev => ({ ...prev, name: input }));
        setEmailStep(2);
        return `Name: ${input}\nPlease enter your email address (or type 'ctrl+c' to cancel):`;
      
      case 2: // Email
        // Simple email validation
        if (!input.includes('@') || !input.includes('.')) {
          return "Invalid email format. Please enter a valid email address (or type 'ctrl+c' to cancel):";
        }
        setEmailFormData(prev => ({ ...prev, email: input }));
        setEmailStep(3);
        return `Email: ${input}\nPlease enter your message (or type 'ctrl+c' to cancel):`;
      
      case 3: // Message
        setEmailFormData(prev => ({ ...prev, message: input }));
        setEmailStep(4);
        return `Message: ${input}\n\nReview your email:\nName: ${emailFormData.name}\nEmail: ${emailFormData.email}\nMessage: ${input}\n\nType 'send' to confirm or 'ctrl+c' to cancel:`;
      
      case 4: // Confirmation
        if (input.toLowerCase() === 'send') {
          handleEmailSubmit();
          return "Sending email...";
        } else if (input.toLowerCase() !== 'ctrl+c') {
          return "Invalid command. Type 'send' to confirm or 'ctrl+c' to cancel:";
        }
        break;
      
      default:
        return "Something went wrong. Type 'ctrl+c' to exit email mode.";
    }
  };

  // Handle email form submission
  const handleEmailSubmit = () => {
    setEmailStatus('sending');
    
    // Replace these with your actual EmailJS service ID and template ID
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "your_service_id";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "your_template_id";
    
    emailjs.send(serviceId, templateId, {
      from_name: emailFormData.name,
      reply_to: emailFormData.email,
      message: emailFormData.message
    })
    .then(() => {
      setEmailStatus('success');
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: 'Email sent successfully! Thank you for your message.' 
      }]);
      setEmailMode(false);
      setEmailStep(0);
      setEmailFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Email sending failed:', error);
      setEmailStatus('error');
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: 'Failed to send email. Please try again later.' 
      }]);
      setEmailMode(false);
      setEmailStep(0);
    });
  };

  // Handle command submission
  const handleSubmit = () => {
    // Increment command count
    const newCommandCount = commandCount + 1;
    setCommandCount(newCommandCount);
    
    // Add command to history
    setHistory(prev => [
      ...prev,
      { type: 'command', text: `${currentDirectory} $ ${input}` }
    ]);

    // If this is the second command, hide welcome screen
    if (newCommandCount === 2) {
      setShowWelcome(false);
    }

    let output;
    
    // Handle email mode separately
    if (emailMode) {
      output = handleEmailInput(input);
    } else {
      // Process regular command
      output = processCommand(input);
    }

    // Add output to history if not null
    if (output !== null) {
      setTimeout(() => {
        setHistory(prev => [...prev, { type: 'output', text: output, isHTML: output.includes('<a href=') }]);
      }, 100);
    }

    // If this is every second command, clear the terminal but keep the system info
    if (newCommandCount % 2 === 0 && newCommandCount > 0 && output !== null && !emailMode) {
      setTimeout(() => {
        setHistory(prev => {
          // Keep only the latest command, its output, and the system info
          const systemInfo = prev.find(item => item.type === 'systemInfo');
          const latestCommand = prev[prev.length - 2]; // The command
          const latestOutput = prev[prev.length - 1];  // The output
          
          return systemInfo ? [systemInfo, latestCommand, latestOutput] : [latestCommand, latestOutput];
        });
      }, 1000);
    }

    // Update command history for up/down navigation
    if (!emailMode) {
      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
    }
    
    // Clear input
    setInput('');
  };

  // Handle key press events for command history navigation and submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit();
      }
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
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.ctrlKey && e.key === 'c' && emailMode) {
      e.preventDefault();
      setEmailMode(false);
      setEmailStep(0);
      setEmailFormData({ name: '', email: '', message: '' });
      setHistory(prev => [...prev, { 
        type: 'output', 
        text: '^C\nEmail canceled.' 
      }]);
      setInput('');
    }
  };

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const pkey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY|| "your_public_key";
    emailjs.init(pkey);
  }, []);

  useEffect(() => {
    setHistory([
      { type: 'systemInfo', component: <SystemInfo /> },
      { type: 'output', text: 'Welcome to my portfolio!' },
      { type: 'output', text: 'Type "help" to see available commands.' }
    ]);
  }, []);

  // Auto-focus the input field and scroll to bottom on render
  useEffect(() => {
    if (!isMobile) {
      inputRef.current?.focus();
    }
    
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isMobile]);

  // Handle window clicks to focus on input
  useEffect(() => {
    const handleWindowClick = () => {
      if (!isMobile) {
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener('click', handleWindowClick);
    
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [isMobile]);

  if (!terminalVisible) {
    return <h1>Press Ctrl+R or go to GUI</h1>; // Return nothing when the terminal is shut down
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-green-500 font-mono">
      {/* Terminal header */}
      <div className="bg-gray-800 p-2 flex items-center">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-center flex-grow text-white font-bold truncate">
          rakshit@terminal: ~
        </div>
        <button 
          className="text-gray-400 hover:text-white focus:outline-none"
          onClick={() => setShowCommandHelp(!showCommandHelp)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Help panel */}
      {showCommandHelp && (
        <div className="bg-gray-900 p-3 border-b border-green-800">
          <h3 className="text-green-400 font-bold mb-2">Available Commands</h3>
          <p className="text-xs text-gray-400">
            Type 'help' to see all available commands. Try 'ls' to list files, 'cat' to view file contents, 
            and 'curl resume' to download my resume.
          </p>
        </div>
      )}
      
      {/* Terminal body */}
      <div 
        ref={terminalRef}
        className="flex-grow p-4 overflow-auto bg-black bg-opacity-70"
      >
        {/* Command history */}
        {history.map((item, index) => (
          <div key={index} className={`mb-1 ${item.type === 'command' ? 'text-white' : item.type === 'systemInfo' ? '' : 'text-green-400'}`}>
            {item.type === 'systemInfo' ? (
              item.component
            ) : item.isHTML ? (
              <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
            ) : (
              item.text.split('\n').map((line, lineIndex) => (
                <div key={lineIndex} className="whitespace-pre-wrap break-words">{line}</div>
              ))
            )}
          </div>
        ))}
        
        {/* Current command input */}
        <div className="flex flex-wrap mt-2">
          <span className="text-white mr-2">
            {emailMode ? 'email' : currentDirectory} $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent text-white outline-none border-none"
            autoFocus
          />
        </div>
      </div>
      
      {/* Mobile command bar */}
      {isMobile && (
        <div className="bg-gray-800 p-2 border-t border-green-700">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command here..."
              className="flex-grow bg-gray-700 text-white px-3 py-2 rounded-l-md border-none outline-none"
            />
            <button
              onClick={handleSubmit}
              className="bg-green-700 text-white px-4 py-2 rounded-r-md"
            >
              Run
            </button>
          </div>
        </div>
      )}
      
      {/* Terminal footer */}
      <div className="bg-gray-800 p-2 text-xs text-gray-400 flex justify-between">
        <span>
          {emailMode 
            ? `Email mode: ${['', 'Enter name', 'Enter email', 'Enter message', 'Confirm'][emailStep]} (Ctrl+C to cancel)` 
            : "Type 'help' for available commands"}
        </span>
        <span>{portfolioData.about.name} © {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
