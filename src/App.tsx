import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  Github,
  Linkedin,
  FileText,
  Briefcase,
  User,
  Code,
  Wrench,
  Mail,
  Moon,
} from 'lucide-react';
import ContactForm from './components/ContactForm';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroImage = document.getElementById('hero-image');
      const navImage = document.getElementById('nav-image');
      const scrollPosition = window.scrollY;
      const heroImageRect = heroImage?.getBoundingClientRect();
      const navImageRect = navImage?.getBoundingClientRect();

      if (heroImageRect && navImageRect) {
        const progress = Math.min(Math.max(scrollPosition / 300, 0), 1);
        setIsScrolled(progress > 0.1);

        // Calculate positions
        const startX = heroImageRect.left + (heroImageRect.width / 2);
        const startY = heroImageRect.top + (heroImageRect.height / 2);
        const endX = navImageRect.left + (navImageRect.width / 2);
        const endY = navImageRect.top + (navImageRect.height / 2);

        // Calculate current position
        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;
        const scale = 1 - (0.7 * progress); // Scale from 1 to 0.3

        if (progress < 1) {
          heroImage.style.transform = `translate(${currentX - startX}px, ${currentY - startY}px) scale(${scale})`;
          heroImage.style.opacity = `${1 - progress}`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up', 'opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-5');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      element.classList.add('opacity-0', 'translate-y-5');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-right" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-sm z-50 px-6 py-3 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img
            id="nav-image"
            src="https://avatars.githubusercontent.com/u/your-username"
            alt="Profile"
            className={`w-10 h-10 rounded-full transition-all duration-300 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-red-500 transition-colors duration-200">About</a>
            <a href="#experience" className="hover:text-red-500 transition-colors duration-200">Experience</a>
            <a href="#projects" className="hover:text-red-500 transition-colors duration-200">Projects</a>
            <a href="#skills" className="hover:text-red-500 transition-colors duration-200">Skills</a>
            <a href="#contact" className="hover:text-red-500 transition-colors duration-200">Contact</a>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 hover:text-red-500 hover:scale-110 transition-all duration-200" />
              </a>
              <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 hover:text-red-500 hover:scale-110 transition-all duration-200" />
              </a>
              <button className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200">
                <Moon className="w-5 h-5" />
              </button>
              <a
                href="/resume.pdf"
                className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 animate-fade-in">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <img
              id="hero-image"
              src="https://avatars.githubusercontent.com/u/-username"
              alt="Profile"
              className="w-32 h-32 rounded-full absolute top-0 left-0 transition-transform duration-200"
              style={{ transformOrigin: 'center center' }}
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">Aarsh Mishra</h1>
          <p className="text-xl text-gray-400 mb-8">Software Engineer</p>
          <div className="flex justify-center gap-4">
            <a href="#contact" className="px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 hover:scale-105 transition-all duration-200">
              Get in touch
            </a>
            <a href="#projects" className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 hover:scale-105 transition-all duration-200">
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#0a0404]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center animate-on-scroll">About Me</h2>
          <div className="bg-[#1a0f0f] p-8 rounded-lg shadow-xl hover-scale animate-on-scroll">
            <p className="text-lg text-gray-300 mb-6">
              I am a passionate Software Engineer currently working at Nagarro, where I specialize in building robust and scalable applications. With experience in both frontend and backend development, I have developed a strong foundation in software development and a keen eye for creating efficient solutions.
            </p>
            <p className="text-lg text-gray-300">
              My technical journey has equipped me with expertise in various technologies and frameworks, allowing me to tackle complex challenges and deliver high-quality results. I am constantly learning and staying updated with the latest industry trends.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center animate-on-scroll">Experience</h2>
          <div className="space-y-8">
            <div className="bg-[#1a0f0f] p-8 rounded-lg shadow-xl hover-scale animate-on-scroll">
              <div className="flex items-center gap-4 mb-4">
                <Briefcase className="w-8 h-8 text-red-500" />
                <div>
                  <h3 className="text-xl font-bold">Engineer</h3>
                  <p className="text-gray-400">Nagarro • Jan- 204 - Present</p>
                </div>
              </div>
              <p className="text-gray-300">
                Developed and optimized 250+ APIs for seamless system integration
                Delivered scalable backend solutions to enhance performance and reliability
                Collaborated with teams to ensure efficient data flow across platforms
              </p>
            </div>
            <div className="bg-[#1a0f0f] p-8 rounded-lg shadow-xl hover-scale animate-on-scroll">
              <div className="flex items-center gap-4 mb-4">
                <Briefcase className="w-8 h-8 text-red-500" />
                <div>
                  <h3 className="text-xl font-bold">Full Stack Developer</h3>
                  <p className="text-gray-400">Tech Corp • 2021 - 2023</p>
                </div>
              </div>
              <p className="text-gray-300">
                Developed and maintained multiple full-stack applications using React, Node.js, and PostgreSQL. Led a team of 4 developers and implemented agile methodologies that increased team productivity by 30%.
              </p>
            </div>
            <div className="bg-[#1a0f0f] p-8 rounded-lg shadow-xl hover-scale animate-on-scroll">
              <div className="flex items-center gap-4 mb-4">
                <Briefcase className="w-8 h-8 text-red-500" />
                <div>
                  <h3 className="text-xl font-bold">Software Engineer Intern</h3>
                  <p className="text-gray-400">StartUp Inc • 2020 - 2021</p>
                </div>
              </div>
              <p className="text-gray-300">
                Contributed to the development of a real-time analytics dashboard. Implemented new features and fixed bugs in the existing codebase. Reduced page load time by 50% through optimization techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[#0a0404]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center animate-on-scroll">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1a0f0f] p-8 rounded-lg shadow-xl hover-scale animate-on-scroll">
              <h3 className="text-xl font-bold mb-4">E-commerce Platform</h3>
              <p className="text-gray-300 mb-4">
                A full-stack e-commerce platform with real-time inventory management and payment processing. Features include user authentication, order tracking, and admin dashboard.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">React</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">Node.js</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">PostgreSQL</span>
              </div>
            </div>
            <div className="bg-[#1a0f0f] p-8 rounded-lg shadow-xl hover-scale animate-on-scroll">
              <h3 className="text-xl font-bold mb-4">Real-time Chat Application</h3>
              <p className="text-gray-300 mb-4">
                A modern chat application with features like real-time messaging, file sharing, and group conversations. Includes end-to-end encryption and message persistence.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">Vue.js</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">WebSocket</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">MongoDB</span>
              </div>
            </div>
            <div className="bg-[#1a0f0f] p-8 rounded-lg shadow-xl hover-scale animate-on-scroll">
              <h3 className="text-xl font-bold mb-4">AI-Powered Analytics Dashboard</h3>
              <p className="text-gray-300 mb-4">
                A sophisticated analytics platform that uses machine learning to provide insights from user data. Features interactive visualizations and predictive analytics.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">Python</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">TensorFlow</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">D3.js</span>
              </div>
            </div>
            <div className="bg-[#1a0f0f] p-8 rounded-lg shadow-xl hover-scale animate-on-scroll">
              <h3 className="text-xl font-bold mb-4">DevOps Automation Suite</h3>
              <p className="text-gray-300 mb-4">
                A comprehensive DevOps toolkit that automates deployment pipelines, monitoring, and scaling of cloud infrastructure. Reduced deployment time by 70%.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">Docker</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">Kubernetes</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">AWS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center animate-on-scroll">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1a0f0f] p-8 rounded-lg shadow-xl hover-scale animate-on-scroll">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Code className="w-6 h-6 text-red-500" />
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">React</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">Vue.js</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">TypeScript</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">Tailwind CSS</span>
              </div>
            </div>
            <div className="bg-[#1a0f0f] p-8 rounded-lg shadow-xl hover-scale animate-on-scroll">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Wrench className="w-6 h-6 text-red-500" />
                Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">Node.js</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">Express</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">PostgreSQL</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">MongoDB</span>
              </div>
            </div>
            <div className="bg-[#1a0f0f] p-8 rounded-lg shadow-xl hover-scale animate-on-scroll">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-red-500" />
                Other
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">Git</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">Docker</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">AWS</span>
                <span className="px-3 py-1 bg-red-900/50 rounded-full text-sm hover:bg-red-800/50 transition-colors duration-200">CI/CD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#0a0404]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center animate-on-scroll">Get in Touch</h2>
          <div className="animate-on-scroll">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0404] py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Aarsh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
