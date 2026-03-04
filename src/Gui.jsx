import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Mail, ArrowDown, ExternalLink, Github, Server, Database, Network, Terminal } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Typed from 'typed.js';

export default function Gui() {
  useEffect(() => {
    emailjs.init("ykUT74fyWpJPp-CbM");
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: false, message: '' });
  const typedRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Backend Developer', 'Software Engineer', 'AI/ML Integrator'],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 1800,
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
    { label: 'Languages', icon: <Terminal size={16} />, value: 'Python, Java, C' },
    { label: 'Backend', icon: <Server size={16} />, value: 'FastAPI, Django, REST APIs, WebSockets' },
    { label: 'Databases', icon: <Database size={16} />, value: 'PostgreSQL, SQLAlchemy' },
    { label: 'Distributed', icon: <Server size={16} />, value: 'Redis, RabbitMQ, Celery' },
    { label: 'Infra & Tools', icon: <Terminal size={16} />, value: 'Docker, Nginx, Linux, Bash, Git' },
    { label: 'Networking', icon: <Network size={16} />, value: 'TCP/IP, HTTP/HTTPS, TLS, DNS, OIDC/JWT' },
  ];

  const projects = [
    {
      name: "Distributed Real-Time Chat Platform",
      tag: "Distributed Systems",
      description: "Scalable event-driven chat backend with JWT-authenticated WebSockets, WebRTC peer-to-peer video, Redis Pub/Sub for horizontal scaling, RabbitMQ + Celery for async persistence, and Keycloak OIDC auth. Nginx handles SSL/TLS termination and WebSocket routing.",
      tech: ["FastAPI", "WebSockets", "Redis", "RabbitMQ", "Celery", "PostgreSQL", "Keycloak", "Nginx", "Docker"],
      github: "https://github.com/rakshverma/Chat-App.git",
      demo: ""
    },
    {
      name: "Neural Net Trainer",
      tag: "ML Platform",
      description: "Web-based neural network training platform with dynamic model configuration, real-time metric streaming via SSE, file upload workflows, long-running training task management, and artifact downloads. Deployed on Railway with Gunicorn threaded workers.",
      tech: ["Django", "PyTorch", "SSE", "Docker", "Railway", "Gunicorn"],
      github: "",
      demo: ""
    },
    {
      name: "Constellation Detection System",
      tag: "Hackathon · Round 3",
      description: "Backend for real-time constellation detection using YOLO. End-to-end inference pipeline processes sky images, detects star patterns, and recommends visible constellations using GPS + timestamp-based sky mapping.",
      tech: ["Django", "YOLO", "PyTorch", "OpenCV", "Docker", "REST API"],
      github: "https://github.com/TanmayGupta-play/Constellation_predictor",
      demo: "https://constellationpredict-production.up.railway.app/"
    },
    {
      name: "Social Media Platform",
      tag: "Full Stack",
      description: "Full-stack social media application with user profiles, real-time feeds, likes, and comments. React frontend with Node.js backend and MongoDB.",
      tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/rakshverma/Sociofy",
      demo: "https://frontend-sociofy-git-main-rvermas-projects.vercel.app/"
    },
    {
      name: "Blog Application",
      tag: "Full Stack",
      description: "Full-stack blog platform with authentication and RESTful APIs. Containerized with Docker and deployed on Railway.",
      tech: ["Django", "PostgreSQL", "Docker", "Railway"],
      github: "https://github.com/rakshverma/Happy-Blog",
      demo: "https://happy-blog-1.onrender.com"
    }
  ];

  const techColors = {
    FastAPI: '#059669', Django: '#15803d', Docker: '#0369a1', PostgreSQL: '#1d4ed8',
    Redis: '#dc2626', RabbitMQ: '#d97706', Nginx: '#65a30d', Keycloak: '#7c3aed',
    PyTorch: '#e11d48', React: '#0891b2', 'Node.js': '#16a34a', MongoDB: '#15803d',
    WebSockets: '#0e7490', Celery: '#16a34a', SSE: '#7c3aed', Railway: '#334155',
    Gunicorn: '#92400e', YOLO: '#b45309', OpenCV: '#0f766e', 'REST API': '#4338ca',
    'Tailwind CSS': '#0891b2', default: '#475569'
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: '#fafaf8', color: '#1a1a2e' }} className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        

        .rv-hero {
          background: #fafaf8; position: relative; overflow: hidden;
          min-height: 100vh; display: flex; align-items: center;
          padding-top: 60px;
        }
        .rv-hero::before {
          content: ''; position: absolute; top: -160px; right: -160px;
          width: 560px; height: 560px; border-radius: 50%;
          background: radial-gradient(circle, rgba(14,116,144,0.07) 0%, transparent 68%);
          pointer-events: none;
        }
        .rv-hero::after {
          content: ''; position: absolute; bottom: -80px; left: -80px;
          width: 380px; height: 380px; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 68%);
          pointer-events: none;
        }

        .rv-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 100px;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
          background: #f0fdfa; color: #0e7490;
          border: 1px solid #99f6e4; text-transform: uppercase;
        }

        .rv-heading {
          font-family: 'Fraunces', serif; font-weight: 300; font-style: italic;
          line-height: 1.04; letter-spacing: -0.03em; color: #1a1a2e;
        }

        .rv-typed { color: #0e7490; }

        .rv-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 26px; border-radius: 8px;
          font-size: 0.85rem; font-weight: 600;
          background: #1a1a2e; color: #fafaf8;
          text-decoration: none; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s; letter-spacing: 0.01em;
          font-family: inherit;
        }
        .rv-btn-primary:hover { background: #0e7490; transform: translateY(-2px); }

        .rv-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 26px; border-radius: 8px;
          font-size: 0.85rem; font-weight: 600;
          background: transparent; color: #1a1a2e;
          text-decoration: none; border: 1.5px solid #e2e8f0; cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
          font-family: inherit;
        }
        .rv-btn-secondary:hover { border-color: #0e7490; color: #0e7490; transform: translateY(-2px); }

        .rv-section-label {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em;
          color: #94a3b8; text-transform: uppercase;
          display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .rv-section-label::before {
          content: ''; width: 26px; height: 1.5px;
          background: #cbd5e1; display: inline-block; flex-shrink: 0;
        }

        .rv-section-title {
          font-family: 'Fraunces', serif; font-weight: 400; font-style: italic;
          font-size: clamp(1.9rem, 3vw, 2.5rem);
          letter-spacing: -0.02em; color: #1a1a2e; margin-bottom: 32px;
        }

        .rv-skill-row {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 18px; border-radius: 10px;
          background: #fff; border: 1px solid #f1f5f9;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .rv-skill-row:hover { border-color: #bae6fd; box-shadow: 0 2px 12px rgba(14,116,144,0.07); }
        .rv-skill-icon { color: #0e7490; margin-top: 1px; flex-shrink: 0; }
        .rv-skill-label { font-size: 0.67rem; font-weight: 700; letter-spacing: 0.13em; color: #94a3b8; text-transform: uppercase; margin-bottom: 3px; }
        .rv-skill-value { font-size: 0.87rem; color: #334155; }

        .rv-project-card {
          background: #fff; border: 1px solid #f1f5f9; border-radius: 14px;
          padding: 28px; display: flex; flex-direction: column; gap: 14px;
          position: relative; overflow: hidden;
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .rv-project-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 3px; background: linear-gradient(90deg, #0e7490, #7c3aed);
          opacity: 0; transition: opacity 0.22s;
        }
        .rv-project-card:hover { border-color: #e0f2fe; box-shadow: 0 8px 32px rgba(14,116,144,0.1); transform: translateY(-4px); }
        .rv-project-card:hover::before { opacity: 1; }

        .rv-project-tag {
          font-size: 0.67rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #0e7490;
          background: #f0fdfa; border: 1px solid #99f6e4;
          padding: 3px 10px; border-radius: 100px; display: inline-block;
        }

        .rv-project-name {
          font-family: 'Fraunces', serif; font-size: 1.08rem; font-weight: 600;
          color: #1a1a2e; letter-spacing: -0.01em; line-height: 1.3;
        }

        .rv-project-desc { font-size: 0.85rem; color: #64748b; line-height: 1.75; flex: 1; }

        .rv-tech-tag {
          font-size: 0.67rem; font-weight: 600;
          padding: 3px 10px; border-radius: 100px; border: 1px solid;
          letter-spacing: 0.03em;
        }

        .rv-icon-link {
          color: #94a3b8; text-decoration: none; transition: color 0.2s;
        }
        .rv-icon-link:hover { color: #0e7490; }

        .rv-input {
          width: 100%; padding: 11px 16px;
          border: 1.5px solid #e2e8f0; border-radius: 8px;
          font-family: inherit; font-size: 0.87rem; color: #1a1a2e;
          background: #fff; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .rv-input:focus { border-color: #0e7490; box-shadow: 0 0 0 3px rgba(14,116,144,0.1); }
        .rv-input::placeholder { color: #cbd5e1; }
        .rv-label { font-size: 0.74rem; font-weight: 600; color: #475569; letter-spacing: 0.04em; margin-bottom: 6px; display: block; }

        .rv-submit {
          width: 100%; padding: 13px; background: #1a1a2e; color: #fafaf8;
          border: none; border-radius: 8px; font-family: inherit;
          font-size: 0.87rem; font-weight: 600; cursor: pointer;
          letter-spacing: 0.03em; transition: background 0.2s, transform 0.15s;
        }
        .rv-submit:hover:not(:disabled) { background: #0e7490; transform: translateY(-1px); }
        .rv-submit:disabled { opacity: 0.55; cursor: not-allowed; }

        .rv-divider { width: 100%; height: 1px; background: #f1f5f9; }

        .rv-contact-link {
          display: flex; align-items: center; gap: 12px;
          color: #475569; text-decoration: none; font-size: 0.88rem; font-weight: 500;
          transition: color 0.2s;
        }
        .rv-contact-link:hover { color: #0e7490; }
        .rv-contact-icon {
          width: 36px; height: 36px; border-radius: 8px;
          background: #f1f5f9; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background 0.2s;
        }
        .rv-contact-link:hover .rv-contact-icon { background: #e0f2fe; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .rv-fi { animation: fadeUp 0.55s ease both; }
        .rv-fi-1 { animation-delay: 0.08s; }
        .rv-fi-2 { animation-delay: 0.2s; }
        .rv-fi-3 { animation-delay: 0.32s; }
        .rv-fi-4 { animation-delay: 0.44s; }

        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
        .rv-bounce { animation: bounce 2s ease-in-out infinite; }

        @media (max-width: 768px) {
          .rv-nav-links { display: none; }
          .rv-two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
          .rv-hero-inner { padding: 2rem 1.5rem !important; }
        }
      `}</style>

      {/* Hero */}
      <section className="rv-hero">
        <div className="rv-hero-inner" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2.5rem', width: '100%' }}>
          <div className="rv-fi rv-fi-1" style={{ marginBottom: '28px' }}>
            <span className="rv-badge">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0e7490', display: 'inline-block' }} />
              IIIT Dharwad · CS &amp; Cybersecurity
            </span>
          </div>

          <h1 className="rv-heading rv-fi rv-fi-2" style={{ fontSize: 'clamp(3.5rem, 7.5vw, 6.5rem)', marginBottom: '18px' }}>
            Rakshit Verma
          </h1>

          <div className="rv-fi rv-fi-3" style={{ marginBottom: '22px', fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', color: '#94a3b8' }}>
            <span ref={typedRef} className="rv-typed" />
          </div>

          <p className="rv-fi rv-fi-3" style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.82, maxWidth: '480px', marginBottom: '42px' }}>
            Building scalable backend systems and distributed architectures. Passionate about systems design, async processing, and secure infrastructure.
          </p>

          <div className="rv-fi rv-fi-4" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="/resume.pdf" download className="rv-btn-primary">
              <Briefcase size={15} /> Download Resume
            </a>
            <a href="#contact" className="rv-btn-secondary">
              <Mail size={15} /> Contact Me
            </a>
          </div>
        </div>

        <a href="#about" className="rv-bounce" style={{ position: 'absolute', bottom: '32px', left: '50%', color: '#cbd5e1' }}>
          <ArrowDown size={20} />
        </a>
      </section>

      <div className="rv-divider" />

      {/* About */}
      <section id="about" style={{ background: '#fafaf8', padding: '100px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2.5rem' }}>
          <div className="rv-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <div className="rv-section-label">About</div>
              <h2 className="rv-section-title">Who I am</h2>
              <p style={{ color: '#64748b', lineHeight: 1.88, fontSize: '0.96rem', marginBottom: '20px' }}>
                Computer Science student at IIIT Dharwad specializing in backend systems and distributed architectures. I design RESTful services, implement async processing pipelines, and integrate secure authentication mechanisms.
              </p>
              <p style={{ color: '#64748b', lineHeight: 1.88, fontSize: '0.96rem', marginBottom: '36px' }}>
                Through the KausalVardhanam Initiative, I worked on integrating TTS/ASR models into production-ready GenAI speech pipelines, contributing to backend architecture and Terraform-based infrastructure provisioning.
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <a href="https://github.com/rakshverma" target="_blank" rel="noopener noreferrer" className="rv-contact-link">
                  <div className="rv-contact-icon"><Github size={15} /></div>
                  github.com/rakshverma
                </a>
                <a href="https://www.linkedin.com/in/rakshit-verma-472654313/" target="_blank" rel="noopener noreferrer" className="rv-contact-link">
                  <div className="rv-contact-icon"><ExternalLink size={15} /></div>
                  LinkedIn
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {skills.map((s, i) => (
                <div key={i} className="rv-skill-row">
                  <div className="rv-skill-icon">{s.icon}</div>
                  <div>
                    <div className="rv-skill-label">{s.label}</div>
                    <div className="rv-skill-value">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="rv-divider" />

      {/* Projects */}
      <section id="projects" style={{ background: '#f8fafc', padding: '100px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2.5rem' }}>
          <div className="rv-section-label">Work</div>
          <h2 className="rv-section-title">Selected projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '20px' }}>
            {projects.map((project, index) => (
              <div key={index} className="rv-project-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="rv-project-tag">{project.tag}</span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="rv-icon-link">
                        <Github size={15} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="rv-icon-link">
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="rv-project-name">{project.name}</div>
                <p className="rv-project-desc">{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.tech.map((tech, ti) => {
                    const color = techColors[tech] || techColors.default;
                    return (
                      <span key={ti} className="rv-tech-tag" style={{ color, borderColor: color + '38', background: color + '0c' }}>
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rv-divider" />

      {/* Contact */}
      <section id="contact" style={{ background: '#fafaf8', padding: '100px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2.5rem' }}>
          <div className="rv-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <div className="rv-section-label">Contact</div>
              <h2 className="rv-section-title">Get in touch</h2>
              <p style={{ color: '#64748b', lineHeight: 1.88, fontSize: '0.96rem', marginBottom: '36px' }}>
                Open to internships, collaborations, or just a conversation about backend systems and distributed architecture.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a href="https://github.com/rakshverma" target="_blank" rel="noopener noreferrer" className="rv-contact-link">
                  <div className="rv-contact-icon"><Github size={16} /></div>
                  github.com/rakshverma
                </a>
                <a href="https://www.linkedin.com/in/rakshit-verma-472654313/" target="_blank" rel="noopener noreferrer" className="rv-contact-link">
                  <div className="rv-contact-icon">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                  </div>
                  LinkedIn Profile
                </a>
              </div>
            </div>

            <div>
              {formStatus.success && (
                <div style={{ marginBottom: '20px', padding: '14px 18px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', fontSize: '0.87rem' }}>
                  {formStatus.message}
                </div>
              )}
              {formStatus.error && (
                <div style={{ marginBottom: '20px', padding: '14px 18px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.87rem' }}>
                  {formStatus.message}
                </div>
              )}
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {['name', 'email'].map(field => (
                    <div key={field}>
                      <label htmlFor={field} className="rv-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                      <input type={field === 'email' ? 'email' : 'text'} id={field} name={field}
                        value={formData[field]} onChange={handleChange} className="rv-input"
                        placeholder={field === 'email' ? 'you@example.com' : 'Your name'} required />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="subject" className="rv-label">Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject}
                    onChange={handleChange} className="rv-input" placeholder="What's this about?" required />
                </div>
                <div>
                  <label htmlFor="message" className="rv-label">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange}
                    rows={5} className="rv-input" placeholder="Your message..." style={{ resize: 'none' }} required />
                </div>
                <button type="submit" disabled={formStatus.submitting} className="rv-submit">
                  {formStatus.submitting ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1a1a2e', padding: '36px 2.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', color: '#e2e8f0', fontSize: '1.05rem', fontWeight: 400 }}>
            Rakshit Verma
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="https://github.com/rakshverma" target="_blank" rel="noopener noreferrer" style={{ color: '#475569', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/rakshit-verma-472654313/" target="_blank" rel="noopener noreferrer" style={{ color: '#475569', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
            </a>
          </div>
          <span style={{ color: '#334155', fontSize: '0.78rem', letterSpacing: '0.04em' }}>IIIT Dharwad · B.Tech CSE</span>
        </div>
      </footer>
    </div>
  );
}
