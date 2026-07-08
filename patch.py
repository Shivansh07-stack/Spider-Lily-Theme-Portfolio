import re

app_tsx_code = """import { useState, useRef, useEffect } from 'react';
import SpiderLily from './SpiderLily';
import './index.css';

const Sidebar = ({ activeSection, scrollToSection }: { activeSection: string, scrollToSection: (id: string) => void }) => {
  const navItems = [
    { id: 'journey', icon: '❀', label: 'Journey' },
    { id: 'skills', icon: '✧', label: 'Skills' },
    { id: 'projects', icon: '</>', label: 'Projects' },
    { id: 'experience', icon: '💼', label: 'Experience' },
    { id: 'research', icon: '📖', label: 'Research' },
    { id: 'live', icon: '⚡', label: 'Live' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
        <div className="sidebar-logo-inner">❀</div>
        <div className="sidebar-wordmark">SHIVANSH SHARMA</div>
      </div>
      <nav className="nav-menu">
        {navItems.map(item => (
          <a
            key={item.id}
            onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

const MoonProgress = () => {
  const [phase, setPhase] = useState(4); // 0 to 4
  return (
    <div className="glass-card widget-card">
      <div className="widget-label">MOON PROGRESS</div>
      <div className="moon-phases">
        {[0, 1, 2, 3, 4].map(p => (
          <div key={p} className={`moon-phase ${p === phase ? 'active' : ''}`}></div>
        ))}
      </div>
      <div className="progress-row">
        <span className="progress-label">Journey Completion</span>
        <span className="progress-value">75%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: '75%' }}></div>
      </div>
    </div>
  );
};

const Ambience = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="glass-card widget-card">
      <div className="ambience-top">
        <div className="ambience-info">
          <span className="icon">❀</span>
          <div className="track-details">
            <div className="track-title">Moonlight Sonata</div>
            <div className="track-subtitle">Beethoven</div>
          </div>
        </div>
        <button className={`play-btn ${isPlaying ? 'playing' : ''}`} onClick={toggle}>
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>
      <div className="waveform">
        <div className="wave-line"></div>
      </div>
      <div className="toggle-row">
        <span className="toggle-label">Toggle Ambience</span>
        <div className={`toggle-switch ${isPlaying ? 'on' : ''}`} onClick={toggle}>
          <div className="toggle-knob"></div>
        </div>
        <audio ref={audioRef} loop src="https://upload.wikimedia.org/wikipedia/commons/2/23/Beethoven_Moonlight_1st_movement.ogg" />
      </div>
    </div>
  );
};

const HeroSection = () => (
  <section className="hero-section" id="hero">
    <div className="hero-background"></div>
    
    <div className="hero-content">
      <h2 className="hero-quote">
        Every <span className="highlight-crimson">bloom</span> is a lesson.<br/>
        Every <span className="highlight-crimson">lesson</span> shaped<br/>
        how I solve problems.
      </h2>
      <hr className="hero-divider" />
      <button className="hero-link-btn" onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}>
        Begin the Journey <div className="hero-btn-arrow">→</div>
      </button>
    </div>

    <div className="hero-widgets">
      <MoonProgress />
      <Ambience />
    </div>
  </section>
);

const JourneyTimeline = ({ isActive }: { isActive?: boolean }) => {
  const journey = [
    { year: '2003', title: 'The Beginning', desc: 'Curious mind with a love for puzzles' },
    { year: '2021', title: 'Started Coding', desc: 'First "Hello World" changed everything' },
    { year: '2022', title: 'Discovered Data', desc: 'Fell in love with the stories hidden in data' },
    { year: '2023', title: 'Machine Learning', desc: 'Turning data into intelligence' },
    { year: '2024', title: 'AI & LLMs', desc: 'Exploring the future of intelligent systems' },
    { year: '2025', title: 'And Beyond', desc: 'Building solutions that create real impact' }
  ];

  return (
    <div className={`glass-card card-timeline ${isActive ? 'glow-active' : ''}`} id="journey">
      <div className="card-title"><span className="icon">❀</span> JOURNEY TIMELINE</div>
      <div className="timeline-container">
        {journey.map((item, i) => (
          <div className="timeline-item interactive" key={i}>
            <div className="timeline-dot"></div>
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-title">{item.title}</div>
            <div className="timeline-desc">{item.desc}</div>
          </div>
        ))}
      </div>
      <div className="watermark watermark-pagoda"></div>
    </div>
  );
};

const ProjectGarden = ({ isActive }: { isActive?: boolean }) => {
  const projects = [
    { title: 'Bank Churn Prediction', problem: 'Banks lose millions when customers churn. Can we predict who is likely to leave?', architecture: 'XGBoost, Random Forest Ensembles, SMOTE for class imbalance', businessImpact: 'Identified key churn drivers, allowing targeted retention campaigns that could save $2.4M annually.', metrics: [{label: 'Accuracy', value: '86%'}], links: {github: 'https://github.com/Shivansh07-stack/Bank_Data_Churn'} },
    { title: 'Credit Card Fraud Detection', problem: 'Fraudulent transactions cause heavy losses.', architecture: 'Isolation Forest, Autoencoders', businessImpact: 'Reduced false positives by 30%.', metrics: [{label: 'F1 Score', value: '0.92'}], links: {github: 'https://github.com/Shivansh07-stack/Credit_Card_Fraud_Detection'} },
    { title: 'AI Job Analyzer', problem: 'Scanning resumes takes too much time.', architecture: 'NLP, BERT embeddings', businessImpact: 'Automated 80% of initial screening.', metrics: [{label: 'Speedup', value: '5x'}], links: {github: 'https://github.com/Shivansh07-stack/AI_Job_Analyzer'} },
    { title: 'RAG Chatbot (Multi-Document)', problem: 'Information retrieval across docs is slow.', architecture: 'LangChain, Pinecone, GPT-4', businessImpact: 'Instant knowledge access.', metrics: [{label: 'Latency', value: '800ms'}], links: {github: 'https://github.com/Shivansh07-stack/Multi-Document_RAG_Chatbot'} },
    { title: 'AI Business Analyst', problem: 'Generating business insights is manual.', architecture: 'Pandas, GPT-4 Data Analysis', businessImpact: 'Automated daily reporting.', metrics: [{label: 'Reports', value: '100+'}], links: {github: 'https://github.com/Shivansh07-stack/AI_Business_Analyst'} },
    { title: 'Twitter Sentiment Analysis', problem: 'Brand perception is hard to track.', architecture: 'HuggingFace Sentiment Pipeline', businessImpact: 'Real-time PR monitoring.', metrics: [{label: 'Accuracy', value: '89%'}], links: {github: 'https://github.com/Shivansh07-stack/Twitter-Recent-Tweets-Sentiment-Analysis'} },
    { title: 'University Curriculum Analyzer', problem: 'Curriculum alignment is tedious.', architecture: 'LLM, Semantic Search', businessImpact: 'Streamlined accreditation process.', metrics: [{label: 'Time Saved', value: '90%'}], links: {github: '#'} },
    { title: 'Object Detection', problem: 'Distance estimation for robotics navigation.', architecture: 'YOLOv8, Depth Estimation', businessImpact: 'Enabled autonomous navigation.', metrics: [{label: 'mAP', value: '0.74'}], links: {github: 'https://github.com/Shivansh07-stack/Object-Detection-Distance-Estimation-for-Robotics-Navigation'} }
  ];

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className={`glass-card card-garden ${isActive ? 'glow-active' : ''}`} id="projects">
      <div className="card-title"><span className="icon">❀</span> PROJECT GARDEN</div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Each flower represents a project.<br/>Click to explore.</p>
      <div className="garden-grid">
        {projects.map((proj, i) => (
          <div className="flower-item" key={i} onClick={() => setSelected(selected === i ? null : i)}>
            <div className="flower-slot-wrapper">
              <SpiderLily id={`project-${i}`} isOpen={true} />
            </div>
            <div className="flower-name" style={{ color: selected === i ? 'var(--vivid-crimson)' : '' }}>{proj.title}</div>
          </div>
        ))}
        
        <div className="flower-item inert">
          <div className="flower-slot-wrapper inert-bud">
             <SpiderLily id="project-future" isOpen={false} />
          </div>
          <div className="flower-name">More to Bloom...</div>
        </div>
      </div>
      <button className="view-all-btn" onClick={() => window.open('https://github.com/Shivansh07-stack?tab=repositories', '_blank')}>View All Projects</button>
    </div>
  );
};

const ChurnPrediction = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Data', 'EDA', 'Modeling', 'Results', 'Impact', 'Learnings'];

  return (
    <div className="glass-card card-churn" id="featured">
      <div className="card-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="icon">❀</span> Bank Customer Churn Prediction
        </div>
        <button className="close-btn">×</button>
      </div>
      
      <div className="project-tag">ML PROJECT</div>
      
      <div className="churn-content">
        <h3 className="section-heading">Problem</h3>
        <p className="churn-problem">Banks lose millions when customers churn. Can we predict who is likely to leave?</p>
        
        <div className="churn-tabs">
          {tabs.map(tab => (
            <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
        
        <div className="tab-content" style={{ marginTop: '1rem', minHeight: '50px' }}>
          {activeTab === 'Overview' && <p>End-to-end machine learning pipeline identifying key churn drivers to allow targeted retention campaigns.</p>}
          {activeTab === 'Data' && <p>1.2M rows of historical banking records. Features: Credit Score, Geography, Gender, Age, Tenure, Balance.</p>}
          {activeTab === 'EDA' && <p>Analyzed distribution of balance vs churn rate. Found strong correlation with older demographics.</p>}
          {activeTab === 'Modeling' && <p>XGBoost & Random Forest Ensembles. Accuracy: 86.4%, F1-Score: 0.79.</p>}
          {activeTab === 'Results' && <p>Identified top churn drivers: Age & Account Balance.</p>}
          {activeTab === 'Impact' && <p>Potential retention savings: $2.4M/year through targeted interventions.</p>}
          {activeTab === 'Learnings' && <p>SMOTE significantly improved minority class detection without introducing severe bias.</p>}
        </div>

        <h3 className="section-heading" style={{ marginTop: '2rem' }}>Architecture</h3>
        <div className="architecture-flow">
          <div className="arch-row">
            <div className="arch-box">Raw Data</div>
            <div className="arch-arrow">→</div>
            <div className="arch-box">Preprocessing</div>
            <div className="arch-arrow">→</div>
            <div className="arch-box">Feature Engineering</div>
            <div className="arch-arrow">→</div>
            <div className="arch-box">Model Training</div>
          </div>
          <div className="arch-row">
            <div className="arch-box">Model Evaluation</div>
            <div className="arch-arrow">→</div>
            <div className="arch-box">Prediction API</div>
            <div className="arch-arrow">→</div>
            <div className="arch-box">Dashboard (Streamlit)</div>
          </div>
        </div>

        <div className="project-footer">
          <div className="tech-stack-row">
            <div className="tech-icon">🐍</div>
            <div className="tech-icon">🐼</div>
            <div className="tech-icon">🌲</div>
          </div>
          <div className="project-actions">
            <button className="outlined-btn" onClick={() => window.open('https://github.com/Shivansh07-stack/Bank_Data_Churn', '_blank')}>
              <span className="icon">GH</span> View on GitHub
            </button>
            <button className="filled-btn">Live Demo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsConstellation = ({ isActive }: { isActive?: boolean }) => {
  return (
    <div className={`glass-card card-skills ${isActive ? 'glow-active' : ''}`} id="skills">
      <div className="card-title"><span className="icon">❀</span> SKILLS CONSTELLATION</div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Explore my universe of skills</p>
      <div className="constellation-graph">
        <svg width="100%" height="200" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
          <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="var(--warm-gray)" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="var(--warm-gray)" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="var(--warm-gray)" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="var(--warm-gray)" strokeWidth="1" strokeOpacity="0.3" />
          
          <line x1="80%" y1="20%" x2="90%" y2="50%" stroke="var(--warm-gray)" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="20%" y1="20%" x2="10%" y2="50%" stroke="var(--warm-gray)" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="20%" y1="80%" x2="50%" y2="90%" stroke="var(--warm-gray)" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="80%" y1="80%" x2="50%" y2="90%" stroke="var(--warm-gray)" strokeWidth="1" strokeOpacity="0.3" />
        </svg>
        
        <div className="skill-node hub" style={{ top: '50%', left: '50%' }}>Machine Learning</div>
        
        <div className="skill-node" style={{ top: '20%', left: '20%' }}>Python</div>
        <div className="skill-node" style={{ top: '20%', left: '80%' }}>SQL</div>
        <div className="skill-node" style={{ top: '80%', left: '20%' }}>PySpark</div>
        <div className="skill-node" style={{ top: '80%', left: '80%' }}>Pandas</div>
        
        <div className="skill-node" style={{ top: '10%', left: '50%' }}>Scikit-learn</div>
        <div className="skill-node" style={{ top: '50%', left: '90%' }}>TensorFlow</div>
        <div className="skill-node" style={{ top: '50%', left: '10%' }}>NLP</div>
        <div className="skill-node" style={{ top: '90%', left: '50%' }}>FastAPI</div>
      </div>
    </div>
  );
};

const LiveFeed = ({ isActive }: { isActive?: boolean }) => {
  return (
    <div className={`glass-card card-live ${isActive ? 'glow-active' : ''}`} id="live">
      <div className="card-title"><span className="icon">⚡</span> LIVE FEED</div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Real-time activity from my digital garden</p>
      
      <div className="live-feed-content">
        <div className="feed-list">
          <div className="feed-item">
            <div className="feed-icon">⚬</div>
            <div className="feed-text">Latest Commit</div>
            <div className="feed-time">2 hours ago</div>
          </div>
          <div className="feed-item">
            <div className="feed-icon" style={{ color: 'var(--vivid-crimson)' }}>△</div>
            <div className="feed-text">Pushed to AI Job Analyzer</div>
            <div className="feed-time">5 hours ago</div>
          </div>
          <div className="feed-item">
            <div className="feed-icon" style={{ color: 'var(--vivid-crimson)' }}>*</div>
            <div className="feed-text">Solved 2 LeetCode Problems</div>
            <div className="feed-time">Yesterday</div>
          </div>
          <div className="feed-item">
            <div className="feed-icon">☐</div>
            <div className="feed-text">New Notebook Added: Bank Churn EDA</div>
            <div className="feed-time">2 days ago</div>
          </div>
          <div className="feed-item">
            <div className="feed-icon">✎</div>
            <div className="feed-text">Blog Published: Building RAG Chatbots</div>
            <div className="feed-time">3 days ago</div>
          </div>
        </div>
        
        <div className="github-widget">
          <div className="github-ring">
            <div className="github-grid">
              {Array.from({length: 25}).map((_, i) => (
                <div key={i} className="gh-square" style={{ opacity: Math.random() * 0.8 + 0.2 }}></div>
              ))}
            </div>
          </div>
          <div className="github-stats">
            <div className="gh-label">This Week</div>
            <div className="gh-count">87</div>
            <div className="gh-label">Contributions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('journey');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />
      <main className="main-content">
        <div className="portfolio-grid">
          <HeroSection />
          
          <JourneyTimeline isActive={activeSection === 'journey'} />
          <ProjectGarden isActive={activeSection === 'projects'} />
          <ChurnPrediction />
          
          <div className="col-4-stack" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SkillsConstellation isActive={activeSection === 'skills'} />
            <LiveFeed isActive={activeSection === 'live'} />
          </div>
          
          <div className={`glass-card card-about ${activeSection === 'about' ? 'glow-active' : ''}`} id="about">
            <div className="card-title"><span className="icon">👤</span> ABOUT ME</div>
            <p className="about-text">
              I am Shivansh Sharma, a Data Science and AI enthusiast who loves building intelligent systems that solve real world problems.
            </p>
            <button className="text-link-btn" onClick={() => window.open('/Shivansh_Sharma_Resume.pdf', '_blank')}>
              Know More About Me <span className="arrow-icon">→</span>
            </button>
            <div className="watermark watermark-about"></div>
          </div>
          
          <div className="glass-card card-stats interactive-card">
            <div className="stat-box"><div className="stat-icon">🎁</div><span className="stat-num">10+</span><span className="stat-label">Projects</span></div>
            <div className="stat-box"><div className="stat-icon">👤</div><span className="stat-num">3</span><span className="stat-label">Major Domains</span></div>
            <div className="stat-box"><div className="stat-icon">💼</div><span className="stat-num">2</span><span className="stat-label">Internships</span></div>
            <div className="stat-box"><div className="stat-icon">❀</div><span className="stat-num">15+</span><span className="stat-label">Technologies</span></div>
            <div className="stat-box"><div className="stat-icon">∞</div><span className="stat-num">∞</span><span className="stat-label">Curiosity</span></div>
          </div>
          
          <div className="glass-card card-connect interactive-card">
            <div className="card-title">LET'S CONNECT</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>I'm always excited to collaborate and build amazing things together.</p>
            <div className="social-links" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href="https://github.com/Shivansh07-stack" target="_blank" className="social-btn">GH</a>
              <a href="https://www.linkedin.com/in/shivansh-sharma-6a9788229/" target="_blank" className="social-btn">IN</a>
              <a href="mailto:shivansh22421@gmail.com" className="social-btn">EM</a>
              <a href="#" className="social-btn">X</a>
            </div>
            <div className="watermark watermark-torii"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
"""

with open("src/App.tsx", "w") as f:
    f.write(app_tsx_code)

