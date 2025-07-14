import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import "./App.css";

// Data
const NAV_LINKS = [
  { id: "home", label: "HOME" },
   { id: "practice", label: "SERVICES" },
   { id: "team", label: "TEAM" },
   { id: "contact", label: "CONTACT" },
  { id: "about", label: "ABOUT US" },
 

];
const WHATSAPP_NUMBER = "919945293599";
const whatsappUrls = `https://wa.me/${WHATSAPP_NUMBER}`;
const HERO_SLIDES = [
  {
    id: 1,
    title: "Corporate Law Experts",
    subtitle: "Your Trusted Legal Partner",
    description:
      "Comprehensive corporate compliance solutions for businesses across India, US, and Middle East since 2017.",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: "⚖️",
  },
  {
    id: 2,
    title: "Global Legal Services",
    subtitle: "International Compliance",
    description:
      "Expert guidance on cross-border legal matters, regulatory compliance, and international business law.",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: "🌍",
  },
  {
    id: 3,
    title: "Strategic Advisory",
    subtitle: "Business Formation & Growth",
    description:
      "Complete support for company incorporation, contract law, and strategic business legal advisory.",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    icon: "📈",
  },
  {
    id: 4,
    title: "Dispute Resolution",
    subtitle: "Legal Expertise You Can Trust",
    description:
      "Professional litigation support and alternative dispute resolution services with proven track record.",
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    icon: "🏛️",
  },
];

const TEAM = [
  {
    name: "Srittam Das",
    role: "Chief Executive Consultant",
    specialty: "IT, Finance , Law ",
    photo: "",
    experience: "25+ Years",
    education: "MBA , LLB, CA",
  },
  {
    name: "Anuraj Das",
    role: "Director",
    specialty: "Marketing ",
    photo: "",
    experience: "1+ Years",
    education: "BBA International Marketing ",
  },
  {
    name: "Jyoti Prasad Tripathy",
    role: "IT Director ",
    specialty: "IT, Digital Marketing ",
    photo: "",
    experience: "13+ Years",
    education: "BE ",
  },
  {
    name: "Subhankar Dash",
    role: "IT Consultant ",
    specialty: " WEB Design Expert ",
    photo: "/subhankardash.png",
    experience: "1+ Years",
    education: "MCA",
  },
    {
    name: "Smrutirekha Das",
    role: "Content Creator ",
    specialty: "Content Design ",
    photo: "",
    experience: "1+ Years",
    education: "MCA",
  },
];

const PRACTICE_AREAS = [
  {
    title: "LEGAL",
    desc: "Comprehensive compliance solutions for businesses across various industries and jurisdictions.",
    icon: "🏢",
    features: [
      "Banking and IBC ",
      "Alternative Dispute Resolutions ",
      "White Collar Criminal Compilance ",
      "Corporate Governance ",
    ],
  },
  {
    title: "FINANCE & BANKING",
    desc: "Expert guidance on regulatory matters and government relations.",
    icon: "📋",
    features: [
      "Loans Syndications",
      "Project Funding",
      "Loan Restructuring",
    ],
  },
  {
    title: "INFORMATION TECHNOLOGY",
    desc: "Cross-border legal services for businesses operating in multiple countries.",
    icon: "🌐",
    features: [
      "Oracle project Management Implementation  ",
      "Sales Force Implementation ",
      "Customized CRM, HRM ,Finance , Supply Chain Management , ",
    ],
  },
  
  {
    title: "TAX CONSULTATION",
    desc: "Expert guidance on regulatory matters and government relations.",
    icon: "📋",
    features: [
      "Income Tax Related ",
      "GST Related",
      
    ],
  },
  {
    title: "DIGITAL MARKETING ",
    desc: "Complete solution with webpage ,SEO ,Funnel Creations , Lead Generations , Digital Advertising , ",
    icon: "🚀",
    features: [
      "Web Development ",
      "Application Development",
      "Digital Advertising ",
      "Google My Business "

    ],
  },
  {
    title: "CONSULTING",
    desc: "Consulting Of Data Transformations , Business Due Dilligence , Merger & Acquitions, Application Modernizations ",
    icon: "📄",
    features: ["Data transformation & Modernization consulting ", "Application Modernization ", "Oracle E B S-Process Improvement consulting ", "License optimization analysis & Consulting: "],
  },
  
];

const TESTIMONIALS = [
  {
    text: "Legal Stanley guided our company through complex international compliance. Their expertise saved us significant time and resources. Highly recommended!",
    name: "Priya Menon",
    title: "CEO, Menon Exports",
    rating: 5,
    company: "Menon Exports Pvt Ltd",
  },
  {
    text: "Professional, responsive, and always a step ahead. The best legal partner for our startup journey. They understand modern business needs.",
    name: "James Lee",
    title: "Co-Founder, FinTechX",
    rating: 5,
    company: "FinTechX Solutions",
  },
  {
    text: "Their regulatory advisory saved us from costly mistakes. Trustworthy, reliable, and incredibly knowledgeable about international law.",
    name: "Aisha Al-Farsi",
    title: "Director, Gulf Holdings",
    rating: 5,
    company: "Gulf Holdings LLC",
  },
  {
    text: "Exceptional service in corporate law. They handled our complex merger with professionalism and expertise. Truly world-class legal services.",
    name: "Robert Chen",
    title: "Managing Director, TechVentures",
    rating: 5,
    company: "TechVentures Inc",
  },
];

const SERVICE_STATS = [
  { number: 500, label: "Cases Handled", suffix: "+" },
  { number: 8, label: "Years Experience", suffix: "+" },
  { number: 3, label: "Countries Served", suffix: "" },
  { number: 250, label: "Happy Clients", suffix: "+" },
  { number: 15, label: "Legal Experts", suffix: "" },
  { number: 98, label: "Success Rate", suffix: "%" },
];

// Custom Hooks
function useAnimatedCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration]);
  return count;
}

function useSlider(slides, autoPlay = true, interval = 5000) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, interval);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, slides.length, interval]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const pauseSlider = () => setIsPlaying(false);
  const playSlider = () => setIsPlaying(true);

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    pauseSlider,
    playSlider,
    isPlaying,
  };
}

// Custom Slider Component
function HeroSlider() {
  const {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    pauseSlider,
    playSlider,
    isPlaying,
  } = useSlider(HERO_SLIDES, true, 6000);

  return (
    <div
      className="hero-slider"
      onMouseEnter={pauseSlider}
      onMouseLeave={playSlider}
    >
      <div className="slider-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="slide"
            style={{ background: HERO_SLIDES[currentSlide].background }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="slide-content">
              <motion.div
                className="slide-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              >
                {HERO_SLIDES[currentSlide].icon}
              </motion.div>
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {HERO_SLIDES[currentSlide].title}
              </motion.h2>
              <motion.h3
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {HERO_SLIDES[currentSlide].subtitle}
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {HERO_SLIDES[currentSlide].description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <button
        className="slider-nav prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        className="slider-nav next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="slider-indicators">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        className="slider-play-pause"
        onClick={isPlaying ? pauseSlider : playSlider}
        aria-label={isPlaying ? "Pause slider" : "Play slider"}
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>
    </div>
  );
}

// Enhanced Stats Component
function StatsSection() {
  return (
    <section className="stats-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Our Achievements
        </motion.h2>
        <div className="stats-grid">
          {SERVICE_STATS.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item neumorphic-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <AnimatedStat target={stat.number} suffix={stat.suffix} />
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({ target, suffix }) {
  const count = useAnimatedCounter(target);
  return (
    <h3>
      {count}
      {suffix}
    </h3>
  );
}

function App() {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [dark, setDark] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [newsletter, setNewsletter] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs
  const lastScroll = useRef(window.scrollY);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll/active section logic
  useEffect(() => {
    const handleScroll = () => {
      // Navbar auto-hide
      const currentScroll = window.scrollY;
      setNavbarVisible(
        currentScroll < 80 || currentScroll < lastScroll.current
      );
      lastScroll.current = currentScroll;

      // Section highlight
      const sections = NAV_LINKS.map((l) => l.id);
      const scrollPosition = window.scrollY + 100;
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
          }
        }
      });

      // Scroll-to-top button
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  // Newsletter validation
  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(newsletter)) {
      setNewsletterStatus("Please enter a valid email address.");
      return;
    }
    setNewsletterStatus("Subscribed! 🎉 Welcome to our newsletter!");
    setNewsletter("");
    setTimeout(() => setNewsletterStatus(""), 4000);
  };

  // Form validation feedback
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus(
      "Thank you for contacting Legal Stanley! We'll get back to you soon."
    );
    setTimeout(() => setFormStatus(""), 4000);
    e.target.reset();
  };

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Framer Motion variants
  const navVariants = {
    hidden: { y: -60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80 },
    },
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 48 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.7, type: "spring" },
    }),
  };
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i = 1) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.08, type: "spring", stiffness: 80 },
    }),
    hover: { scale: 1.04, boxShadow: "0 8px 32px 0 var(--primary-glow)" },
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  return (
    <div className="App">
      <Helmet>
        <title>
          Legal Stanley | Corporate Law Firm - Complete Legal Solutions
        </title>
        <meta
          name="description"
          content="Legal Stanley - Complete Corporate Compliance Solutions since 2017. Expert legal services across India, US, and Middle East. Corporate law, international compliance, and strategic advisory."
        />
        <meta
          name="keywords"
          content="corporate law, legal services, compliance, international law, business formation, contract law, dispute resolution"
        />
      </Helmet>

      {/* Interactive cursor effect */}
      <div
        className="cursor-effect"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />

      {/* Animated glass blobs for background */}
      <div className="glass-blob one"></div>
      <div className="glass-blob two"></div>
      <div className="glass-blob three"></div>

      {/* Sticky, auto-hiding Navbar */}
      <AnimatePresence>
        {navbarVisible && (
          <motion.header
            className="header"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={navVariants}
          >
            <div className="container">
              <div className="header-top">
                <div className="contact-info">
                  <span></span>
                  <span></span>
                </div>
                <div className="social-links">
                  
                  
                </div>
                
                <button
                  className="theme-toggle neumorphic-btn"
                  aria-label="Toggle theme"
                  onClick={() => setDark((d) => !d)}
                >
                  {dark ? "🌙" : "☀️"}
                </button>
              </div>
              <nav className="navbar" aria-label="Main navigation">
                <div className="nav-brand">
                  <h2>
                    Lega<span>lion</span>
                  </h2>
                  <p>HOUSE OF LAW AND TECH</p>
                </div>
                <div className={`nav-menu${isMenuOpen ? " active" : ""}`}>
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      className={activeSection === link.id ? "active" : ""}
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                    >
                      <span className="nav-link-text">{link.label}</span>
                      {activeSection === link.id && (
                        <motion.span
                          className="nav-underline"
                          layoutId="nav-underline"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </a>
                  ))}
                </div>
                <div className="contact-phone">
                  <span></span>
                </div>
                <button
                  className="mobile-menu-btn"
                  onClick={toggleMenu}
                  aria-label="Toggle navigation"
                >
                  <span className="neuburger">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>
              </nav>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Scroll-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-btn neumorphic-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            aria-label="Scroll to top"
          >
            ⬆️
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section with Custom Slider */}
      <section id="home" className="hero">
        <div className="hero-wrapper">
          <HeroSlider />
          <motion.div
            className="hero-overlay-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8, type: "spring" }}
            >
               {" "}
              <span className="gradient-text">End to End One Stop Platform for  Business Solutions </span>
            </motion.h1>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              LEGAL ,FINANCE , IT , DIGITAL MARKETING  
            </motion.h2>
            <motion.div
              className="hero-cta-group"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <motion.button
                className="cta-button primary neumorphic-btn"
                whileHover={{
                  scale: 1.07,
                  boxShadow: "0 0 32px 0 var(--accent-glow)",
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection("contact")}
              >
                CONTACT NOW
              </motion.button>
              
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* About Section with Enhanced Counters */}
      <section id="about" className="about">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            About Legalion
          </motion.h2>
          <div className="about-content">
            <motion.div
              className="about-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              custom={1}
            >
              <p>
                Legal Stanley is a leading corporate law firm established in
                2017, providing comprehensive legal solutions across multiple
                jurisdictions. Our expertise spans corporate compliance,
                regulatory matters, and strategic legal advisory services with
                an unwavering commitment to excellence.
              </p>
              <p>
                With offices serving clients in India, United States, and the
                Middle East, we offer internationally recognized legal services
                tailored to meet the complex needs of modern businesses. Our
                team of experienced attorneys brings decades of combined
                expertise in corporate law, international regulations, and
                strategic business advisory.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <span className="feature-icon">🏆</span>
                  <span>Award-Winning Legal Team</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🌍</span>
                  <span>International Presence</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Rapid Response Time</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section id="team" className="team">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
              Team
          </motion.h2>
          <motion.div
            className="team-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.18, delayChildren: 0.25 },
              },
            }}
          >
            {TEAM.map((member, idx) => (
              <motion.div
                className="team-member neumorphic-card"
                key={idx}
                variants={cardVariants}
                custom={idx}
                whileHover="hover"
                tabIndex={0}
                aria-label={member.name}
              >
                <div className="member-photo">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <defs>
                      <linearGradient
                        id={`memberGradient${idx}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#6c63ff" />
                        <stop offset="100%" stopColor="#ffb86c" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="40"
                      cy="40"
                      r="38"
                      fill={`url(#memberGradient${idx})`}
                    />
                    <circle cx="40" cy="32" r="16" fill="#fff" />
                    <path d="M20 65 Q40 55 60 65" fill="#fff" />
                  </svg>
                </div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-specialty">{member.specialty}</p>
                <div className="member-details">
                  <span className="experience">{member.experience}</span>
                  <span className="education">{member.education}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Practice Areas Section */}
      <section id="practice" className="practice">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            SERVICES FOR YOU    
          </motion.h2>
          <motion.div
            className="practice-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: 0.18 },
              },
            }}
          >
            {PRACTICE_AREAS.map((area, idx) => (
              <motion.div
                className="practice-card neumorphic-card"
                key={idx}
                variants={cardVariants}
                custom={idx}
                whileHover="hover"
                tabIndex={0}
                aria-label={area.title}
              >
                <div  className="practice-icon">{area.icon}</div>
                <h3>{area.title}</h3>
                <p>{area.desc}</p>
                <ul className="practice-features">
                  {area.features.map((feature, featIdx) => (
                    <li key={featIdx}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <button className="quote-btn neumorphic-btn">
                  Get A Quote
           </button>
        </div>
      </section>

      {/* Enhanced Testimonials Carousel */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            What Our Clients Say
          </motion.h2>
          <div className="testimonial-carousel">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                className="testimonial-card neumorphic-card"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.6, type: "spring" }}
                tabIndex={0}
                aria-label="Testimonial"
              >
                <div className="testimonial-rating">
                  {[...Array(TESTIMONIALS[testimonialIdx].rating)].map(
                    (_, i) => (
                      <span key={i} className="star">
                        ⭐
                      </span>
                    )
                  )}
                </div>
                <p className="testimonial-text">
                  "{TESTIMONIALS[testimonialIdx].text}"
                </p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <strong>{TESTIMONIALS[testimonialIdx].name}</strong>
                    <span>{TESTIMONIALS[testimonialIdx].title}</span>
                    <span className="company">
                      {TESTIMONIALS[testimonialIdx].company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="testimonial-controls">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  className={`testimonial-dot${
                    idx === testimonialIdx ? " active" : ""
                  }`}
                  onClick={() => setTestimonialIdx(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Contact Us
          </motion.h2>
          <div className="contact-content">
            <motion.div
              className="contact-info"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              custom={1}
            >
              <div  className="contact-item neumorphic-card">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>info@Legalion.co.in</p>
                </div>
              </div>
              
              <div className="contact-item neumorphic-card">
                <div className="contact-icon">📍</div>
                <div style={{overflowY:"scroll"}}>
                  <h4 style={{textAlign:"center"}}>Address</h4>
                  <h4>Bhubaneswar</h4>
                  <p>Plot 10/10 , Anantam Residency  ,Bhubaneswar-751010</p>
                  <h4 >Bengaluru</h4>
                  <p>First floor “Das Building” Plot N0 125, Gotegere, Bangalore- 560083</p>
                  <h4>Mumbai</h4>
                  <p>#108, 1st Floor, A Wing, BSEL Tech Park,
Sector 30A, Vashi, Navi Mumbai
400703 Maharastra</p>
                  
                </div>
              </div>
              <div className="contact-item neumorphic-card">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 9945293599</p>
                </div>
              </div>
              
            </motion.div>
            <motion.div
              className="contact-form neumorphic-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              custom={2}
            >
              <form onSubmit={handleContactSubmit} autoComplete="off">
                <div className="form-group">
                  <input type="text" placeholder="Your Full Name" required />
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    required
                  />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Your Phone Number" required />
                  <select required>
                    <option value="">Select Service</option>
                    <option value="corporate">Corporate Compliance</option>
                    <option value="international">International Law</option>
                    <option value="regulatory">Regulatory Advisory</option>
                    <option value="formation">Business Formation</option>
                    <option value="contract">Contract Law</option>
                    <option value="dispute">Dispute Resolution</option>
                  </select>
                </div>
                <textarea
                  placeholder="Describe your  requirements..."
                  rows="5"
                  required
                ></textarea>
                <motion.button
                  type="submit"
                  className="neumorphic-btn submit-btn"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 32px 0 var(--accent-glow)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send Message
                </motion.button>
                <AnimatePresence>
                  {formStatus && (
                    <motion.div
                      className="form-status success"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                    >
                      {formStatus}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
              <div className="newsletter-section">
                <h4>Stay Updated</h4>
                <form className="newsletter-form" onSubmit={handleNewsletter}>
                  <input
                    type="email"
                    placeholder="Subscribe to our legal newsletter"
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.value)}
                    required
                    aria-label="Newsletter email"
                  />
                  <button type="submit" className="neumorphic-btn">
                    Subscribe
                  </button>
                  <AnimatePresence>
                    {newsletterStatus && (
                      <motion.div
                        className="newsletter-status success"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                      >
                        {newsletterStatus}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Live Chat Widget */}

      <motion.div
        className="live-chat-widget neumorphic-card"
        tabIndex={0}
        aria-label="Live chat widget"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <a
          href={whatsappUrls}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          style={{ textDecoration: "none" }}
        >
          <img src="../icons8-whatsapp-48.png" alt="" srcset="" />
        </a>
        <span className="chat-icon"></span>
        <span className="chat-text">Live Chat</span>
        <span className="chat-status">Available</span>
      </motion.div>

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section brand-section">
              <h3>
                Lega<span>Lion</span>
              </h3>
              <p className="footer-tagline">Corporate Law Firm</p>
              <p>
                Providing comprehensive legal solutions since 2017. Your trusted
                partner for corporate compliance, international law, and
                strategic legal advisory services.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">
                  📘
                </a>
                <a href="#" aria-label="Twitter">
                  🐦
                </a>
                <a href="#" aria-label="LinkedIn">
                  💼
                </a>
                <a href="#" aria-label="WhatsApp">
                  💬
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(l.id);
                      }}
                    >
                      {l.label.charAt(0) + l.label.slice(1).toLowerCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>
                  <a href="#practice">Corporate Compliance</a>
                </li>
                <li>
                  <a href="#practice">International Law</a>
                </li>
                <li>
                  <a href="#practice">Regulatory Advisory</a>
                </li>
                <li>
                  <a href="#practice">Business Formation</a>
                </li>
                <li>
                  <a href="#practice">Contract Law</a>
                </li>
                <li>
                  <a href="#practice">Dispute Resolution</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-details">
                <p>📧 info@legalion.co.in</p>
                <p>📞 +91 9945293599</p>
                <p>📍 Bengaluru</p>
              </div>
              <div className="office-hours">
                <h5>Business Hours</h5>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>
                 Legalion Consulting © All rights
                reserved  {new Date().getFullYear()}.
              </p>
              <div className="footer-legal">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#disclaimer">Legal Disclaimer</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
