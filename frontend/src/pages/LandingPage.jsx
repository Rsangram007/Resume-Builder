import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LayoutTemplate, Menu, X, Zap, Download } from "lucide-react";
import { landingPageStyles } from "../assets/dummystyle";
import { UserContext } from "../context/UserContext.jsx";
import { ProfileInfoCard } from "../components/Cards";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Modal from "../components/Modal";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenModal(true);
      setCurrentPage("login");
    } else {
      navigate("/dashboard");
    }
  };

  const stats = [
    { value: "5 Min", label: "Build Time", gradient: "from-emerald-500 to-teal-500" },
  ];

  const features = [
    {
      icon: <Zap className={landingPageStyles.featureIcon} />,
      title: "Lightning Fast",
      description: "Create professional resumes in under 5 minutes with our streamlined process",
      gradient: landingPageStyles.featureIconViolet,
      bg: landingPageStyles.featureCardViolet,
    },
    {
      icon: <LayoutTemplate className={landingPageStyles.featureIcon} />,
      title: "Pro Templates",
      description: "Choose from dozens of recruiter-approved, industry-specific templates",
      gradient: landingPageStyles.featureIconFuchsia,
      bg: landingPageStyles.featureCardFuchsia,
    },
    {
      icon: <Download className={landingPageStyles.featureIcon} />,
      title: "Instant Export",
      description: "Download high-quality PDFs instantly with perfect formatting",
      gradient: landingPageStyles.featureIconOrange,
      bg: landingPageStyles.featureCardOrange,
    },
  ];

  return (
    <div className={landingPageStyles.container}>
      {/* HEADER */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoContainer}>
            <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} />
            </div>
            <span className={landingPageStyles.logoText}>ResumeExpert24</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className={landingPageStyles.mobileMenuIcon} />
            ) : (
              <Menu size={24} className={landingPageStyles.mobileMenuIcon} />
            )}
          </button>

          {/* Desktop Auth/Profile */}
          <div className="hidden md:flex items-center">
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className={landingPageStyles.desktopAuthButton}
                onClick={() => {
                  setOpenModal(true);
                  setCurrentPage("login");
                }}
              >
                <div className={landingPageStyles.desktopAuthButtonOverlay}></div>
                <span className={landingPageStyles.desktopAuthButtonText}>Get Started</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className={landingPageStyles.main}>
        {/* Hero Section */}
        <section className={landingPageStyles.heroSection}>
          <div className={landingPageStyles.heroGrid}>
            {/* Left Side */}
            <div className={landingPageStyles.heroLeft}>
              <div className={landingPageStyles.tagline}>Professional Resume Builder</div>
              <h2 className={`${landingPageStyles.heading} text-3xl md:text-4xl`}>
                <span className={landingPageStyles.headingText}>Craft </span>
                <span className={landingPageStyles.headingGradient}>Professional </span>
                <span className={landingPageStyles.headingText}>Resumes</span>
              </h2>
              <p className={landingPageStyles.description}>
                Create job-winning resumes with expertly designed templates. 
                ATS-friendly, recruiter-approved, and tailored to your career goals.
              </p>

              {/* Stats */}
              <div className="mt-6 flex gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button className={landingPageStyles.primaryButton} onClick={handleCTA}>
                  <div className={landingPageStyles.primaryButtonOverlay}></div>
                  <span className={landingPageStyles.primaryButtonContent}>
                    Start Building
                    <ArrowRight className={landingPageStyles.primaryButtonIcon} size={18} />
                  </span>
                </button>
                <button className={landingPageStyles.secondaryButton} onClick={handleCTA}>
                  View Templates
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className={landingPageStyles.heroRight}>
              <div className={landingPageStyles.heroIllustration}>
                <svg viewBox="0 0 400 500" className={landingPageStyles.svgContainer}>
                  <rect x="50" y="50" width="300" height="400" rx="20" className={landingPageStyles.svgRect} />
                  <circle cx="120" cy="120" r="25" className={landingPageStyles.svgCircle} />
                  <rect x="160" y="105" width="120" height="8" rx="4" className={landingPageStyles.svgRectPrimary} />
                  <rect x="160" y="120" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                  <rect x="70" y="230" width="60" height="6" rx="3" className={landingPageStyles.svgRectPrimary} />
                  <rect x="70" y="250" width="40" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                  <rect x="120" y="250" width="50" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                  <rect x="180" y="250" width="45" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                  <circle cx="320" cy="100" r="15" className={landingPageStyles.svgAnimatedCircle}>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <rect x="30" y="300" width="12" height="12" rx="6" className={landingPageStyles.svgAnimatedRect}>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 5,0; 0,0" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <polygon points="360,200 370,220 350,220" className={landingPageStyles.svgAnimatedPolygon}>
                    <animateTransform attributeName="transform" type="rotate" values="0 360 210; 360 360 210; 0 360 210" dur="4s" repeatCount="indefinite" />
                  </polygon>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={landingPageStyles.featuresSection}>
          <div className={landingPageStyles.featuresContainer}>
            <div className={landingPageStyles.featuresHeader}>
              <h2 className={landingPageStyles.featuresTitle}>
                 Why choose <span className={landingPageStyles.featuresTitleGradient}>ResumeExpert24?</span>
              </h2>
              <p className={landingPageStyles.featureDescription}>
                Everything you need to create a professional resume that stands out.
              </p>
            </div>
            <div className={landingPageStyles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={landingPageStyles.featureCard}>
                  <div className={landingPageStyles.featureCardHover}></div>
                  <div className={`${landingPageStyles.featureCardContent} ${feature.bg}`}>
                    <div className={`${landingPageStyles.featureIconContainer} ${feature.gradient}`}>
                      {feature.icon}
                    </div>
                    <h3 className={landingPageStyles.featureTitle}>{feature.title}</h3>
                    <p className={landingPageStyles.featureDescription}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={landingPageStyles.ctaSection}>
          <div className={landingPageStyles.ctaContainer}>
            <div className={landingPageStyles.ctaCard}>
              <div className={landingPageStyles.ctaCardBg}></div>
              <div className={landingPageStyles.ctaCardContent}>
                <h2 className={landingPageStyles.ctaTitle}>
                  Ready to Build your <span className={landingPageStyles.ctaTitleGradient}>Standout Resume?</span>
                </h2>
                <p className={landingPageStyles.ctaDescription}>
                  Join beginners and professionals who landed their dream jobs with our platform.
                </p>
                <button className={landingPageStyles.ctaButton} onClick={handleCTA}>
                  <div className={landingPageStyles.ctaButtonOverlay}></div>
                  <span className={landingPageStyles.ctaButtonText}>Start Building Now</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={landingPageStyles.footer}>
        <div className={landingPageStyles.footerContainer}>
          <p className={landingPageStyles.footerText}>
            Crafted with <span className={landingPageStyles.footerHeart}>Renu Rawat ❤️</span>
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => setOpenModal(false)}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} onSuccess={() => setOpenModal(false)} />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} onSuccess={() => setOpenModal(false)} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
