import { useState, useRef, useEffect } from 'react';
import SpiderLily from './SpiderLily';
import './index.css';

const Sidebar = ({ activeSection, scrollToSection }: { activeSection: string, scrollToSection: (id: string) => void }) => {
  const navItems = [
    { id: 'journey', icon: '❀', label: 'Journey' },
    { id: 'projects', icon: '⌨', label: 'Projects' },
    { id: 'skills', icon: '✧', label: 'Skills' },
    { id: 'live', icon: '⚡', label: 'Live' },
    { id: 'about', icon: '📖', label: 'About' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
        <div className="sidebar-logo-inner"></div>
      </div>
      <nav className="nav-menu">
        {navItems.map(item => (
          <a
            key={item.id}
            onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};

const MoonProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activePhase = Math.floor((scrollProgress / 100) * 7);

  return (
    <div className="glass-card" style={{ padding: '1rem 1.5rem' }}>
      <div className="card-title">Moon Progress</div>
      <div className="moon-phases">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={`moon-phase ${i === activePhase ? 'active red' : ''} ${i < activePhase ? 'active' : ''}`}></div>
        ))}
      </div>
      <div className="progress-bar-container">
        <div className="progress-label"><span>Journey Completion</span><span>{Math.round(scrollProgress)}%</span></div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${scrollProgress}%` }}></div></div>
      </div>
    </div>
  );
};

const Ambience = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="glass-card" style={{ padding: '1rem 1.5rem' }}>
      <div className="card-title" style={{ marginBottom: '0.5rem', fontSize: '0.65rem' }}>Ambience</div>
      <div className="ambience-content">
        <div className="song-info">
          <h3>Moonlight Sonata</h3>
          <p>Beethoven</p>
        </div>
        <div className={`play-btn ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
          {isPlaying ? <div className="pause-icon">||</div> : ''}
        </div>
        <audio ref={audioRef} loop src="https://upload.wikimedia.org/wikipedia/commons/2/23/Beethoven_Moonlight_1st_movement.ogg" />
      </div>
    </div>
  );
};

const HeroSection = () => (
  <section className="hero-section" id="hero">
    <div className="hero-background"></div>
    
    <div className="top-header">
      <h1>SHIVANSH SHARMA</h1>
    </div>

    <div className="hero-content">
      <h2 className="hero-quote">
        Every <span>bloom</span> is a lesson.<br/>
        Every lesson shaped<br/>
        how I solve problems.
      </h2>
      <button className="hero-btn" onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}>
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
    { year: '2020', title: 'The Beginning', desc: 'Curious mind with a love for puzzles', icon: '❀' },
    { year: '2021', title: 'Started Coding', desc: 'First "Hello World" changed everything', icon: '❀' },
    { year: '2022', title: 'Discovered Data', desc: 'Fell in love with the stories hidden in data', icon: '❀' },
    { year: '2023', title: 'Machine Learning', desc: 'Turning data into intelligence', icon: '❀' },
    { year: '2024', title: 'AI & LLMs', desc: 'Exploring the future of intelligent systems', icon: '❀' },
    { year: '2025', title: 'And Beyond', desc: 'Building solutions that create real impact', icon: '❀' }
  ];

  return (
    <div className={`glass-card card-journey ${isActive ? 'glow-active' : ''}`} id="journey">
      <div className="card-title"><span className="icon">❀</span> Journey Timeline</div>
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
    </div>
  );
};

const ProjectGarden = ({ isActive }: { isActive?: boolean }) => {
  const projects = [
    { title: 'Bank Churn Prediction', problem: 'Banks lose millions when customers churn. Can we predict who is likely to leave?', architecture: 'XGBoost, Random Forest Ensembles, SMOTE for class imbalance', businessImpact: 'Identified key churn drivers, allowing targeted retention campaigns that could save $2.4M annually.', metrics: [{label: 'Accuracy', value: '86%'}], links: {github: 'https://github.com/Shivansh07-stack/Bank_Data_Churn'} },
    { title: 'Credit Card Fraud Detection', problem: 'Fraudulent transactions cause heavy losses.', architecture: 'Isolation Forest, Autoencoders', businessImpact: 'Reduced false positives by 30%.', metrics: [{label: 'F1 Score', value: '0.92'}], links: {github: 'https://github.com/Shivansh07-stack/Credit_Card_Fraud_Detection'} },
    { title: 'AI Job Analyzer', problem: 'Scanning resumes takes too much time.', architecture: 'NLP, BERT embeddings', businessImpact: 'Automated 80% of initial screening.', metrics: [{label: 'Speedup', value: '5x'}], links: {github: 'https://github.com/Shivansh07-stack/AI_Job_Analyzer'} },
    { title: 'RAG Chatbot', problem: 'Information retrieval across docs is slow.', architecture: 'LangChain, Pinecone, GPT-4', businessImpact: 'Instant knowledge access.', metrics: [{label: 'Latency', value: '800ms'}], links: {github: 'https://github.com/Shivansh07-stack/Multi-Document_RAG_Chatbot'} },
    { title: 'AI Business Analyst', problem: 'Generating business insights is manual.', architecture: 'Pandas, GPT-4 Data Analysis', businessImpact: 'Automated daily reporting.', metrics: [{label: 'Reports', value: '100+'}], links: {github: 'https://github.com/Shivansh07-stack/AI_Business_Analyst'} },
    { title: 'Twitter Sentiment', problem: 'Brand perception is hard to track.', architecture: 'HuggingFace Sentiment Pipeline', businessImpact: 'Real-time PR monitoring.', metrics: [{label: 'Accuracy', value: '89%'}], links: {github: 'https://github.com/Shivansh07-stack/Twitter-Recent-Tweets-Sentiment-Analysis'} },
    { title: 'Wildlife Spread Prediction', problem: 'Tracking wildlife spread is difficult across large terrains.', architecture: 'Geospatial Data, Machine Learning', businessImpact: 'Aids conservation and resource planning.', metrics: [{label: 'Regions', value: '50+'}], links: {github: 'https://github.com/Shivansh07-stack/Wildlife_Spread_Prediction'} },
    { title: 'Object Detection', problem: 'Distance estimation for robotics navigation.', architecture: 'YOLOv8, Depth Estimation', businessImpact: 'Enabled autonomous navigation.', metrics: [{label: 'mAP', value: '0.74'}], links: {github: 'https://github.com/Shivansh07-stack/Object-Detection-Distance-Estimation-for-Robotics-Navigation'} },
    { title: 'PoisonScope', problem: 'Detecting data poisoning attacks in ML training sets.', architecture: 'Python, Security Analysis', businessImpact: 'Ensures model integrity and security.', metrics: [{label: 'Defense', value: 'Active'}], links: {github: 'https://github.com/Shivansh07-stack/PoisonScope'} }
  ];
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className={`glass-card card-garden ${isActive ? 'glow-active' : ''}`} id="projects">
      <div className="card-title"><span className="icon">❀</span> Project Garden</div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Each flower represents a project.<br/>Click to explore.</p>
      <div className="garden-grid">
        {projects.map((proj, i) => (
          <div className={`flower-item`} key={i} onClick={() => setSelected(selected === i ? null : i)}>
            <div className="flower-name" style={{ color: selected === i ? 'var(--accent-red)' : '' }}>{proj.title}</div>
            <SpiderLily id={`project-${i}`} isOpen={selected === i} onClose={() => setSelected(null)} projectData={proj} />
          </div>
        ))}
      </div>
      <button className="view-all-btn" onClick={() => window.open('https://github.com/Shivansh07-stack?tab=repositories', '_blank')}>View All Projects</button>
    </div>
  );
};

const ChurnPrediction = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Data':
        return <div className="tab-content"><p>1.2M rows of historical banking records.</p><p>Features: Credit Score, Geography, Gender, Age, Tenure, Balance.</p></div>;
      case 'EDA':
        return <div className="tab-content"><p>Analyzed distribution of balance vs churn rate.</p><p>Found strong correlation with older demographics.</p></div>;
      case 'Modeling':
        return <div className="tab-content"><p>XGBoost & Random Forest Ensembles.</p><p>Accuracy: 86.4%, F1-Score: 0.79.</p></div>;
      case 'Results':
        return <div className="tab-content"><p>Identified top churn drivers: Age & Account Balance.</p><p>Potential retention savings: $2.4M/year.</p></div>;
      default:
        return (
          <>
            <h3 style={{ fontSize: '0.8rem', marginBottom: '1rem', fontWeight: 500 }}>Architecture</h3>
            <div className="architecture-diagram">
              <div className="arch-box interactive">Raw Data</div>
              <div className="arch-box interactive">Preprocessing</div>
              <div className="arch-box interactive">Feature Engineering</div>
              <div className="arch-box interactive">Model Training</div>
              <div className="arch-box interactive">Model Evaluation</div>
              <div className="arch-box interactive">Prediction API</div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="glass-card card-churn" id="featured">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem' }}>Bank Customer<br/>Churn Prediction</h2>
          <div className="subtitle" style={{ color: 'var(--accent-red)', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem', textTransform: 'uppercase' }}>★ Featured Project</div>
        </div>
      </div>
      
      <div className="churn-problem">
        <strong style={{ color: '#fff', fontSize: '0.8rem' }}>Problem</strong><br/>
        Banks lose millions when customers churn. Can we predict who is likely to leave?
      </div>

      <div className="tabs">
        {['Overview', 'Data', 'EDA', 'Modeling', 'Results'].map(t => (
          <div key={t} className={`tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            <div style={{ textAlign: 'center', marginBottom: '4px', fontSize: '1rem' }}>{activeTab === t ? '❀' : '○'}</div>
            {t}
          </div>
        ))}
      </div>

      <div className="tab-container" style={{ minHeight: '120px' }}>
        {renderContent()}
      </div>

      <div className="tech-stack-row">
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Tech Stack</div>
          <div className="stack-icons">
            <div className="stack-icon py">Py</div>
            <div className="stack-icon pd">Pd</div>
            <div className="stack-icon xg">XG</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textAlign: 'right' }}>View on GitHub</div>
          <div className="action-buttons">
            <button className="btn-icon" onClick={() => window.open('https://github.com', '_blank')}>GH</button>
            <button className="btn-primary" onClick={() => alert('Launching Demo...')}>Live Demo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsConstellation = ({ isActive }: { isActive?: boolean }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const skills = [
    { name: 'SQL', top: '20%', left: '20%', red: false },
    { name: 'Python', top: '10%', left: '50%', red: false },
    { name: 'PySpark', top: '30%', left: '80%', red: false },
    { name: 'Pandas', top: '60%', left: '10%', red: true },
    { name: 'Scikit-learn', top: '50%', left: '40%', red: true },
    { name: 'TensorFlow', top: '60%', left: '60%', red: true },
    { name: 'NLP', top: '50%', left: '90%', red: true },
    { name: 'FastAPI', top: '90%', left: '25%', red: false },
    { name: 'Django', top: '80%', left: '50%', red: false },
    { name: 'Docker', top: '90%', left: '75%', red: false },
  ];

  return (
    <div className={`glass-card card-skills ${isActive ? 'glow-active' : ''}`} id="skills">
      <div className="card-title"><span className="icon">❀</span> Skills Constellation</div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Explore my universe of skills</p>
      <div className="constellation">
        {skills.map((skill) => (
          <div 
            key={skill.name}
            className={`skill-node ${hoveredNode === skill.name ? 'pulse' : ''}`} 
            style={{ top: skill.top, left: skill.left, zIndex: hoveredNode === skill.name ? 10 : 1 }}
            onMouseEnter={() => setHoveredNode(skill.name)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`skill-dot ${skill.red || hoveredNode === skill.name ? 'red' : ''}`}></div>
            <span className="skill-name" style={{ color: hoveredNode === skill.name ? '#fff' : '' }}>{skill.name}</span>
          </div>
        ))}
        
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.3, stroke: 'var(--accent-red-glow)', strokeWidth: 1, pointerEvents: 'none' }}>
          <line x1="20%" y1="20%" x2="50%" y2="10%" />
          <line x1="50%" y1="10%" x2="80%" y2="30%" />
          <line x1="20%" y1="20%" x2="10%" y2="60%" />
          <line x1="10%" y1="60%" x2="40%" y2="50%" />
          <line x1="40%" y1="50%" x2="60%" y2="60%" />
          <line x1="60%" y1="60%" x2="90%" y2="50%" />
          <line x1="10%" y1="60%" x2="25%" y2="90%" />
          <line x1="40%" y1="50%" x2="50%" y2="80%" />
          <line x1="60%" y1="60%" x2="75%" y2="90%" />
        </svg>
      </div>
    </div>
  );
};

const LiveFeed = ({ isActive }: { isActive?: boolean }) => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  return (
    <div className={`glass-card card-live ${isActive ? 'glow-active' : ''}`} id="live">
      <div className="card-title">Live Feed</div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Real-time activity from my digital garden</p>
      <div className="feed-list">
        {[
          { title: 'Latest Commit', time: '2 hours ago', icon: '○' },
          { title: 'Pushed to AI Job Analyzer', time: '5 hours ago', icon: '◬' },
          { title: 'Solved 2 LeetCode Problems', time: 'Yesterday', icon: '❀' },
          { title: 'New Notebook Added\nBank Churn EDA', time: '2 days ago', icon: '◻' }
        ].map((item, i) => (
          <div className="feed-item interactive" key={i}>
            <div className="feed-icon">{item.icon}</div>
            <div className="feed-text">
              <div className="feed-title" style={{ whiteSpace: 'pre-line' }}>{item.title}</div>
              <div className="feed-time">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>GitHub Activity</div>
          <div className="github-heatmap">
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                className={`heatmap-cell level-${Math.floor(Math.random() * 4)} ${hoveredCell === i ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCell(i)}
                onMouseLeave={() => setHoveredCell(null)}
              >
                {hoveredCell === i && <div className="tooltip">Commits: {Math.floor(Math.random()*5)}</div>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>This Week</div>
          <div style={{ fontSize: '1.5rem', color: 'var(--accent-red)' }}>87</div>
          <div style={{ fontSize: '0.65rem' }}>Contributions</div>
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
        <HeroSection />
        
        <div className="portfolio-grid">
          <JourneyTimeline isActive={activeSection === 'journey'} />
          <ProjectGarden isActive={activeSection === 'projects'} />
          <ChurnPrediction />
          <SkillsConstellation isActive={activeSection === 'skills'} />
          <LiveFeed isActive={activeSection === 'live'} />
          
          <div className={`glass-card card-about ${activeSection === 'about' ? 'glow-active' : ''}`} id="about" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
              <div className="card-title">About Me</div>
              <p className="about-text">
                I am Shivansh Sharma, a Data Science and AI enthusiast who loves building intelligent systems that solve real world problems.
              </p>
              <button className="hero-btn" style={{ fontSize: '0.8rem' }} onClick={() => window.open('/Shivansh_Sharma_Resume.pdf', '_blank')}>Know More About Me <div className="hero-btn-arrow" style={{ width: '20px', height: '20px' }}>→</div></button>
            </div>
          </div>
          
          <div className="glass-card card-stats interactive-card">
            <div className="stat-box">
              <span className="stat-num counter">10+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-box">
              <span className="stat-num counter">3</span>
              <span className="stat-label">Major Domains</span>
            </div>
            <div className="stat-box">
              <span className="stat-num counter">2</span>
              <span className="stat-label">Internships</span>
            </div>
          </div>
          
          <div className="glass-card card-connect">
            <div className="card-title">Let's Connect</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>I'm always excited to collaborate and build amazing things together.</p>
            <div className="action-buttons">
              <button className="btn-icon interactive" onClick={() => window.open('https://github.com', '_blank')}>GH</button>
              <button className="btn-icon interactive" onClick={() => window.open('https://linkedin.com', '_blank')}>IN</button>
              <button className="btn-icon interactive" onClick={() => window.location.href = 'mailto:hello@example.com'}>EM</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
