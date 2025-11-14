import '../styles/Homepage.css';
import logo from '../assets/logo.png'; // placeholder hero image

export default function Homepage() {
  return (
    <div className="homepage">
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__text">
          <h1>Hire Freelancers or Find Work <span className="highlight">Effortlessly</span></h1>
          <p>Frelyn connects talented freelancers with the right projects. Build, bid, and earn seamlessly.</p>
          <div className="hero__cta">
            <a href="/projects" className="btn btn-primary">Find Projects</a>
            <a href="/login" className="btn btn-secondary">Post a Project</a>
          </div>
        </div>
        <div className="hero__image">
          <img src={logo} alt="Frelyn Hero" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Frelyn?</h2>
        <div className="features__grid">
          <div className="feature">
            <h3>Easy Bidding</h3>
            <p>Bid on projects in seconds with a simple and intuitive interface.</p>
          </div>
          <div className="feature">
            <h3>Secure Payments</h3>
            <p>Safe and reliable payment system for both freelancers and employers.</p>
          </div>
          <div className="feature">
            <h3>Verified Freelancers</h3>
            <p>Hire trusted talent with reviews and portfolios available upfront.</p>
          </div>
        </div>
      </section>

      {/* Popular Projects */}
      <section className="projects">
        <h2>Popular Projects</h2>
        <div className="projects__grid">
          <div className="project-card">
            <h3>Website Development</h3>
            <p>Build a responsive website for a growing business.</p>
          </div>
          <div className="project-card">
            <h3>Mobile App Design</h3>
            <p>Create an intuitive mobile app UI for users worldwide.</p>
          </div>
          <div className="project-card">
            <h3>Logo Design</h3>
            <p>Design a creative logo that represents a brand identity.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
