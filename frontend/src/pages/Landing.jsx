/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../css/Landingcss.css'

// --- CSS STYLES (Injected directly for single-file support) ---

// --- STAGGERED MENU COMPONENT (Internal) ---
const StaggeredMenu = ({ items, socialItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants
  const menuVariants = {
    closed: { x: "100%", transition: { type: "tween", duration: 0.5 } },
    open: { x: 0, transition: { type: "tween", duration: 0.5 } },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 + 0.3, duration: 0.4 },
    }),
  };

  return (
    <>
      <button 
        className="nav-toggle-btn" 
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <div style={{ position: "relative", width: "24px", height: "24px" }}>
            <span 
                className="hamburger-line" 
                style={{ 
                    top: isOpen ? "11px" : "4px", 
                    transform: isOpen ? "rotate(45deg)" : "rotate(0)" 
                }} 
            />
            <span 
                className="hamburger-line" 
                style={{ 
                    top: "11px", 
                    opacity: isOpen ? 0 : 1 
                }} 
            />
            <span 
                className="hamburger-line" 
                style={{ 
                    top: isOpen ? "11px" : "18px", 
                    transform: isOpen ? "rotate(-45deg)" : "rotate(0)" 
                }} 
            />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              background: "#0f1012",
              zIndex: 1999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <nav style={{ textAlign: "center" }}>
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={itemVariants}
                        style={{ margin: "20px 0" }}
                    >
                        <a 
                            href={item.link} 
                            onClick={toggleMenu}
                            style={{ 
                                fontSize: "2rem", 
                                color: "#fff", 
                                textDecoration: "none", 
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: "700"
                            }}
                        >
                            {item.label}
                        </a>
                    </motion.div>
                ))}
                
                <div style={{ marginTop: "40px", display: "flex", gap: "20px", justifyContent: "center" }}>
                    {socialItems.map((social, i) => (
                         <motion.div
                            key={i}
                            custom={items.length + i}
                            variants={itemVariants}
                        >
                            <a 
                                href={social.link} 
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "#FFA500", textDecoration: "none", fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                {social.label}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- MAIN COMPONENT ---
export default function Landing() {
  const menuItems = [
    { label: "Home", link: "#home" },
    { label: "Why", link: "#why" },
    { label: "Curriculum", link: "#curriculum" },
    { label: "How it Works", link: "#how-it-works" },
  ];

  const socialItems = [
    { label: "X", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  // --- CONTENT DATA ---
  const whyPoints = [
    { title: "Clear Explanations", desc: "Every concept broken down logically." },
    { title: "Your Environment", desc: "Code in VS Code, CLion, or IntelliJ." },
    { title: "Multi-Language", desc: "Solutions in C++ | Java | Python | JS." },
    { title: "No Time Pressure", desc: "Learn at your own pace." },
    { title: "Real Mindset", desc: "Develop true problem-solving intuition." },
  ];

  const masterTopics = [
    "Arrays & Strings", "Searching & Sorting", "Linked Lists",
    "Stacks & Queues", "Recursion", "Trees", "Graphs",
    "Dynamic Programming", "Backtracking", "Hashing & more…"
  ];

  const howSteps = [
    { num: "01", title: "Learn the Concept", desc: "Clear logic breakdown + visuals" },
    { num: "02", title: "Try Yourself First", desc: "Implement on your IDE — real coding feel" },
    { num: "03", title: "Compare Solutions", desc: "Best optimized approaches explained" },
    { num: "04", title: "Improve", desc: "Notes + reference + alternative methods" },
  ];

  return (
    <div className="page-wrapper">
      {/* INJECT CSS */}

      {/* Navbar Wrapper */}
      <div className="navbar-wrapper text-[1.5rem]">
        <StaggeredMenu
          items={menuItems}
          socialItems={socialItems}
        />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="hero-section" id="home">
        {/* Abstract Glow Background */}
        {/* <div className="glow-bg"></div> */}

        <div className="center-content">
          
          {/* LEFT: Hero Text */}
          <div className="hero-text-side">
            <h1 className="title">
              algo<span className="nerd-text">NERD</span>
              <span className="dot">.</span>
            </h1>
            
            <h2 className="tagline">
              <span className="code-bracket">&lt;</span>
              Code Like a Nerd
              <span className="code-bracket">/&gt;</span>
            </h2>

            <p className="subtitle">
              Build real problem-solving skills using your own IDE.<br/>
              Stop memorizing. Start engineering.
            </p>

            <div className="btn-box">
              <button className="btn primary-btn">Start Learning</button>
              <button className="btn secondary-btn">Browse Questions</button>
            </div>
          </div>

          {/* RIGHT: Curriculum Panel */}
          <div className="hero-visual-side">
            <div className="curriculum-card">
              <div className="curr-header">
                <h3 className="curr-title">What You'll Master</h3>
                <span className="curr-badge">70+ Problems</span>
              </div>
              <div className="hero-topics-grid">
                {masterTopics.map((topic, i) => (
                  <span className="hero-topic-pill" key={i}>
                    <span className="hash">#</span>{topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* SCROLL INDICATOR */}
        <a href="#why" className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </a>
      </section>

      {/* --- WHY ALGONERD --- */}
      <section className="section-container" id="why">
        <div className="section-header">
          <span className="section-tag">💡 Why AlgoNerd?</span>
          <h2 className="section-title">We don’t want you to learn.<br />We want you to <span className="highlight">understand.</span></h2>
          <p className="section-sub">No spoon-feeding. Just pure logic.</p>
        </div>

        <div className="grid-cards">
          {whyPoints.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="card-border"></div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="section-container" id="how-it-works">
        <span className="section-tag center-tag">⭐ Workflow</span>
        <h2 className="section-title center-text">How it Works</h2>
        
        <div className="steps-container">
          {howSteps.map((step, i) => (
            <div className="step-card" key={i}>
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- INDUSTRY PREP --- */}
      <section className="section-container prep-section">
        <div className="prep-box">
          <h2>🧑‍💻 Built For Industry</h2>
          <p className="prep-intro">Tech companies don't ask you to code in browser IDEs. Why prepare that way?</p>
          
          <div className="checklist-container">
            <div className="check-item">
              <span className="check-icon">✓</span>
              <span>Debugging Skills</span>
            </div>
            <div className="check-item">
              <span className="check-icon">✓</span>
              <span>Memory Management</span>
            </div>
            <div className="check-item">
              <span className="check-icon">✓</span>
              <span>Real Setup</span>
            </div>
          </div>

          <div className="student-goals">
            <h4>For Students Who Want To...</h4>
            <div className="goals-grid">
              <span>Understand &gt; Memorize</span>
              <span>Build Intuition</span>
              <span>Crack Interviews</span>
              <span>Code Confidently</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER / MOTTO --- */}
      <footer className="footer-section">
        <div className="footer-content">
            <p className="motto">“Think logically. Code practically.”</p>
            <p className="copyright">© 2025 AlgoNerd.</p>
        </div>
      </footer>

    </div>
  );
}