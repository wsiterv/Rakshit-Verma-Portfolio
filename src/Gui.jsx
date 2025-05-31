import React, { useEffect, useRef, useState } from 'react';
import { FileCode2, Briefcase, User, Mail, ArrowDown, ExternalLink, Github } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Typed from 'typed.js';

export default function Gui() {
  // Initialize EmailJS once with your public key
  useEffect(() => {
    const publicKey = "ykUT74fyWpJPp-CbM";
    emailjs.init(publicKey);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });

  const typedRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Frontend Developer', 'Backend Developer', 'AI/ML Integrator'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true
    });
    return () => {
      typed.destroy();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // In your handleSubmit function, replace the existing EmailJS code with this:

const handleSubmit = (e) => {
  e.preventDefault();
  setFormStatus({ submitting: true, success: false, error: false, message: '' });
  
  // Get environment variables
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  // Log values to check if they're being retrieved correctly (remove in production)
  
  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS configuration missing");
    setFormStatus({
      submitting: false,
      success: false,
      error: true,
      message: 'Email service configuration error. Please contact the administrator.'
    });
    return;
  }
  
  // Send email using the form reference
  emailjs.sendForm(
    serviceId,
    templateId,
    formRef.current,
    publicKey  // Pass the public key here as well
  )
  .then((result) => {
    console.log("EmailJS success:", result.text);
    setFormStatus({
      submitting: false,
      success: true,
      error: false,
      message: 'Message sent successfully!'
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  })
  .catch((error) => {
    console.error('EmailJS error:', error);
    setFormStatus({
      submitting: false,
      success: false,
      error: true,
      message: 'Failed to send message. Please try again.'
    });
  });
};

  const projects = [
    {
      name: "Blog Site",
      description: "A responsive blog platform with user authentication, post creation, and comment features.",
      tech: ["Django", "Bootstrap"],
      github: "https://github.com/rakshverma/Happy-Blog",
      demo: "https://happy-blog-1.onrender.com"
    },
    {
      name: "Skin Cancer Prediction",
      description: "A web app that uses deep learning to predict skin cancer from images, with user-friendly interface for uploading and viewing results.",
      tech: ["TensorFlow", "Django"],
      github: "https://github.com/rakshverma/skin-cancer-prediction",
      demo: ""
    },
    {
      name: "Social Media Platform",
      description: "A full-stack social media application with user profiles, real-time feeds, likes, and comments.",
      tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/rakshverma/Sociofy",
      demo: "https://frontend-sociofy-git-main-rvermas-projects.vercel.app/"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
           <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
  Hi, I'm <span className="text-blue-600">Rakshit Verma</span>
</h1>
<p className="text-xl text-gray-600 mb-4 max-w-2xl">
  I'm a <span ref={typedRef} className="text-blue-600"></span>
</p>
<p className="text-xl text-gray-600 mb-8 max-w-2xl">
  Transforming ideas into scalable web applications with modern technologies and AI integration
</p>
            <div className="flex space-x-4">
             <a
  href="/resume.pdf"
  download
  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
>
  <Briefcase size={18} className="mr-2" />
  Download Resume
</a>

              <a
                href="#contact"
                className="border border-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
              >
                <Mail size={18} className="mr-2" />
                Contact Me
              </a>
            </div>
            <a href="#about" className="mt-16 animate-bounce">
              <ArrowDown size={24} className="text-gray-400" />
            </a>
          </div>
        </div>
      </section>
      {/* About Me Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="bg-blue-600 rounded-full w-64 h-64 mx-auto overflow-hidden border-8 border-white shadow-xl">
                {/* Replace with your image */}
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <img src="/user.gif" alt="User" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">About Me</h2>
             <p className="text-gray-600 mb-4">
  Full-stack developer passionate about crafting intelligent web applications that bridge 
  technology and human needs. With expertise spanning Django backends, React frontends, 
  and deep learning integration, I specialize in building robust solutions that combine 
  functionality with intuitive user experiences.
</p>
<p className="text-gray-600 mb-8">
  My technical journey encompasses everything from CNN-powered healthcare diagnostics to 
  LLM-driven applications, complemented by automation tools and data processing pipelines. 
  I thrive on transforming complex problems into elegant digital solutions, with a 
  particular focus on healthcare technology and social platforms that create meaningful impact.
</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-2">Frontend</h3>
                  <p className="text-gray-600">React, Vue, JavaScript</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-2">Backend</h3>
                  <p className="text-gray-600">Django, Node.js, MongoDB</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-2">Tools</h3>
                  <p className="text-gray-600">Git, Docker, Bash</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-2">Design</h3>
                  <p className="text-gray-600">Tailwind CSS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <FileCode2 size={48} className="text-indigo-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-gray-700 hover:text-blue-600"
                    >
                      <Github size={16} className="mr-1" />
                      GitHub
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-700 hover:text-blue-600"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Get In Touch</h2>
          <div className="max-w-2xl mx-auto">
            {formStatus.success && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                {formStatus.message}
              </div>
            )}
            {formStatus.error && (
              <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                {formStatus.message}
              </div>
            )}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="What is this regarding?"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                  disabled={formStatus.submitting}
                >
                  {formStatus.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white">Rakshit Verma</h3>
              <p className="mt-2">Building digital experiences with passion</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/rakshverma" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/rakshit-verma-472654313/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          </div>
        </div>
      </footer>
    </div>
  );
}
