import React, { useEffect, useRef, useState } from 'react';
import { FileCode2, Briefcase, User, Mail, ArrowDown, ExternalLink, Github, Terminal, Server, Database, Network } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Typed from 'typed.js';

export default function Gui() {
  useEffect(() => {
    const publicKey = "ykUT74fyWpJPp-CbM";
    emailjs.init(publicKey);
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: false, message: '' });
  const typedRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Backend Developer', 'Software Engineer', 'AI/ML Integrator'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true
    });
    return () => typed.destroy();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: false, message: '' });
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setFormStatus({ submitting: false, success: false, error: true, message: 'Email service configuration error.' });
      return;
    }
    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setFormStatus({ submitting: false, success: true, error: false, message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => setFormStatus({ submitting: false, success: false, error: true, message: 'Failed to send. Please try again.' }));
  };

  const skills = [
    { label: 'Languages', icon: <Terminal size={18} />, value: 'Python, Java, C' },
    { label: 'Backend', icon: <Server size={18} />, value: 'FastAPI, Django, REST APIs, WebSockets' },
    { label: 'Databases', icon: <Database size={18} />, value: 'PostgreSQL, SQLAlchemy' },
    { label: 'Distributed', icon: <Server size={18} />, value: 'Redis, RabbitMQ, Celery' },
    { label: 'Infra & Tools', icon: <Terminal size={18} />, value: 'Docker, Nginx, Linux, Bash, Git' },
    { label: 'Networking', icon: <Network size={18} />, value: 'TCP/IP, HTTP/HTTPS, TLS, DNS, OIDC/JWT' },
  ];

  const projects = [
    {
      name: "Distributed Real-Time Chat Platform",
      description: "Scalable event-driven chat backend with JWT-authenticated WebSockets, WebRTC peer-to-peer video, Redis Pub/Sub for horizontal scaling, RabbitMQ + Celery for async persistence, and Keycloak OIDC auth. Nginx handles SSL/TLS termination and WebSocket routing.",
      tech: ["FastAPI", "WebSockets", "Redis", "RabbitMQ", "Celery", "PostgreSQL", "Keycloak", "Nginx", "Docker"],
      github: "https://github.com/rakshverma/Chat-App.git",
      demo: ""
    },
    {
      name: "Neural Net Trainer",
      description: "Web-based neural network training platform with dynamic model configuration, real-time metric streaming via SSE, file upload workflows, long-running training task management, and artifact downloads. Deployed on Railway with Gunicorn threaded workers.",
      tech: ["Django", "PyTorch", "SSE", "Docker", "Railway", "Gunicorn"],
      github: "",
      demo: ""
    },
    {
      name: "Constellation Detection System",
      description: "Hackathon project (Advanced to Round 3). Backend for real-time constellation detection using YOLO. End-to-end inference pipeline that processes sky images, performs object detection on star patterns, and recommends visible constellations using GPS + timestamp-based sky mapping.",
      tech: ["Django", "YOLO", "PyTorch", "OpenCV", "Docker", "REST API"],
      github: "https://github.com/TanmayGupta-play/Constellation_predictor",
      demo: "https://constellationpredict-production.up.railway.app/"
    },
    {
      name: "Social Media Platform",
      description: "Full-stack social media application with user profiles, real-time feeds, likes, and comments. Built with a React frontend and Node.js backend.",
      tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/rakshverma/Sociofy",
      demo: "https://frontend-sociofy-git-main-rvermas-projects.vercel.app/"
    },
    {
      name: "Blog Application",
      description: "Full-stack blog platform with authentication and RESTful APIs. Containerized with Docker and deployed on Railway.",
      tech: ["Django", "PostgreSQL", "Docker", "Railway"],
      github: "https://github.com/rakshverma/Happy-Blog",
      demo: "https://happy-blog-1.onrender.com"
    }
  ];

  const tagColors = {
    FastAPI: 'bg-emerald-900 text-emerald-300',
    Django: 'bg-green-900 text-green-300',
    Docker: 'bg-sky-900 text-sky-300',
    PostgreSQL: 'bg-blue-900 text-blue-300',
    Redis: 'bg-red-900 text-red-300',
    RabbitMQ: 'bg-orange-900 text-orange-300',
    Nginx: 'bg-lime-900 text-lime-300',
    Keycloak: 'bg-purple-900 text-purple-300',
    PyTorch: 'bg-rose-900 text-rose-300',
    React: 'bg-cyan-900 text-cyan-300',
    default: 'bg-zinc-800 text-zinc-300'
  };

  const getTagColor = (tech) => tagColors[tech] || tagColors.default;

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace", background: '#0a0a0f' }} className="min-h-screen text-gray-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap');
        .hero-grid {
          background-image: linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .glow { box-shadow: 0 0 30px rgba(99,102,241,0.15); }
        .tag-glow:hover { box-shadow: 0 0 8px rgba(99,102,241,0.4); }
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(99,102,241,0.12); }
        .cursor-line::after { content: ''; display: inline-block; width: 2px; height: 1em; background: #818cf8; margin-left: 2px; vertical-align: text-bottom; animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .skill-bar { background: linear-gradient(90deg, #4f46e5, #818cf8); }
        .section-line { width: 40px; height: 3px; background: linear-gradient(90deg, #4f46e5, #818cf8); }
        input, textarea { background: #0f0f1a !important; color: #e2e8f0 !important; border-color: #2d2d4e !important; }
        input:focus, textarea:focus { border-color: #4f46e5 !important; box-shadow: 0 0 0 2px rgba(79,70,229,0.2) !important; outline: none; }
        input::placeholder, textarea::placeholder { color: #4a4a6a !important; }
        .nav-dot { width: 6px; height: 6px; border-radius: 50%; background: #4f46e5; }
      `}</style>

      {/* Hero */}
      <section className="hero-grid min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="nav-dot" />
              <span style={{ color: '#818cf8', fontSize: '0.8rem', letterSpacing: '0.2em' }}>IIIT DHARWAD · CS &amp; CYBERSECURITY</span>
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05 }} className="mb-4">
              <span style={{ color: '#e2e8f0' }}>Rakshit</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #818cf8, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Verma</span>
            </h1>
            <div className="flex items-center gap-2 mb-6" style={{ fontSize: '1.1rem' }}>
              <span style={{ color: '#4a4a6a' }}>~/</span>
              <span ref={typedRef} style={{ color: '#818cf8' }} />
            </div>
            <p style={{ color: '#6b7280', lineHeight: 1.8, maxWidth: '520px', fontSize: '0.95rem' }}>
              Building scalable backend systems and distributed architectures. GPA 9.04/10 through Semester V.
            </p>
            <div className="flex gap-4 mt-10 flex-wrap">
              <a href="/resume.pdf" download
                className="flex items-center gap-2 px-6 py-3 rounded text-sm font-medium transition-all"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#fff' }}>
                <Briefcase size={15} /> Download Resume
              </a>
              <a href="#contact"
                className="flex items-center gap-2 px-6 py-3 rounded text-sm font-medium transition-all"
                style={{ border: '1px solid #2d2d4e', color: '#a5b4fc' }}>
                <Mail size={15} /> Contact Me
              </a>
            </div>
          </div>
        </div>
        <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: '#4a4a6a' }}>
          <ArrowDown size={20} />
        </a>
      </section>

      {/* About */}
      <section id="about" style={{ background: '#0d0d16' }} className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="section-line" />
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.6rem', color: '#e2e8f0' }}>About Me</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ color: '#9ca3af', lineHeight: 1.9, fontSize: '0.95rem' }} className="mb-5">
                Computer Science student at IIIT Dharwad with a Minor in Cybersecurity. I specialize in backend systems — designing RESTful services, implementing async processing pipelines, and integrating secure authentication mechanisms.
              </p>
              <p style={{ color: '#9ca3af', lineHeight: 1.9, fontSize: '0.95rem' }}>
                I have hands-on experience with distributed systems using Redis, RabbitMQ, and Celery, and I've worked with GenAI pipelines through the KausalVardhanam Initiative, integrating TTS/ASR models into production-ready speech processing systems.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="https://github.com/rakshverma" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: '#6366f1' }}>
                  <Github size={16} /> github.com/rakshverma
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {skills.map((s, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: '#0a0a0f', border: '1px solid #1e1e30' }}>
                  <div className="mt-0.5" style={{ color: '#4f46e5' }}>{s.icon}</div>
                  <div>
                    <div style={{ color: '#818cf8', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 600 }} className="mb-1">{s.label.toUpperCase()}</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ background: '#0a0a0f' }} className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="section-line" />
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.6rem', color: '#e2e8f0' }}>Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="card-hover rounded-xl p-6" style={{ background: '#0d0d16', border: '1px solid #1e1e30' }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#e2e8f0', fontSize: '1rem' }}>{project.name}</h3>
                  <div className="flex gap-3 ml-4 flex-shrink-0">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: '#4a4a6a' }} className="hover:text-indigo-400 transition-colors">
                        <Github size={16} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ color: '#4a4a6a' }} className="hover:text-indigo-400 transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.7 }} className="mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, ti) => (
                    <span key={ti} className={`text-xs px-2 py-1 rounded font-medium tag-glow ${getTagColor(tech)}`} style={{ fontSize: '0.7rem' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ background: '#0d0d16' }} className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="section-line" />
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.6rem', color: '#e2e8f0' }}>Get In Touch</h2>
          </div>
          <div className="max-w-xl">
            {formStatus.success && <div className="mb-6 p-4 rounded-lg text-sm" style={{ background: '#052e16', border: '1px solid #166534', color: '#86efac' }}>{formStatus.message}</div>}
            {formStatus.error && <div className="mb-6 p-4 rounded-lg text-sm" style={{ background: '#1c0505', border: '1px solid #7f1d1d', color: '#fca5a5' }}>{formStatus.message}</div>}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {['name', 'email'].map(field => (
                  <div key={field}>
                    <label htmlFor={field} style={{ color: '#818cf8', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 600 }} className="block mb-2">{field.toUpperCase()}</label>
                    <input type={field === 'email' ? 'email' : 'text'} id={field} name={field} value={formData[field]} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg text-sm border" placeholder={field === 'email' ? 'you@example.com' : 'Your name'} required />
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="subject" style={{ color: '#818cf8', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 600 }} className="block mb-2">SUBJECT</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg text-sm border" placeholder="What's this about?" required />
              </div>
              <div>
                <label htmlFor="message" style={{ color: '#818cf8', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 600 }} className="block mb-2">MESSAGE</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5}
                  className="w-full px-4 py-3 rounded-lg text-sm border resize-none" placeholder="Your message..." required />
              </div>
              <button type="submit" disabled={formStatus.submitting}
                className="w-full py-3 rounded-lg text-sm font-medium transition-all"
                style={{ background: formStatus.submitting ? '#3730a3' : 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#fff' }}>
                {formStatus.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#07070f', borderTop: '1px solid #1e1e30' }} className="py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#e2e8f0' }}>Rakshit Verma</span>
            <span style={{ color: '#4a4a6a', fontSize: '0.8rem' }} className="ml-3">Backend Developer · IIIT Dharwad</span>
          </div>
          <div className="flex gap-5">
            <a href="https://github.com/rakshverma" target="_blank" rel="noopener noreferrer" style={{ color: '#4a4a6a' }} className="hover:text-indigo-400 transition-colors">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/rakshit-verma-472654313/" target="_blank" rel="noopener noreferrer" style={{ color: '#4a4a6a' }} className="hover:text-indigo-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
