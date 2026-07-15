import { useState, useRef, useEffect } from 'react';
import { Flower2, Sparkles, Code, Briefcase, Book, Activity, Database, LineChart, Network, Sliders, Shield, Lightbulb, Circle, Triangle, Hexagon, Square } from 'lucide-react';
import SpiderLily from './SpiderLily';
import moonlightAudio from './assets/moonlight.mp3';
import './index.css';

const Sidebar = ({ activeSection, scrollToSection }: { activeSection: string, scrollToSection: (id: string) => void }) => {
  const navItems = [
    { id: 'journey', icon: <Flower2 size={18} strokeWidth={1.5} />, label: 'Journey' },
    { id: 'skills', icon: <Sparkles size={18} strokeWidth={1.5} />, label: 'Skills' },
    { id: 'projects', icon: <Code size={18} strokeWidth={1.5} />, label: 'Projects' },
    { id: 'experience', icon: <Briefcase size={18} strokeWidth={1.5} />, label: 'Experience' },
    { id: 'research', icon: <Book size={18} strokeWidth={1.5} />, label: 'Research' },
    { id: 'live', icon: <Activity size={18} strokeWidth={1.5} />, label: 'Live' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <div className="sidebar-logo">
          <Flower2 size={16} strokeWidth={1.5} color="var(--accent-red)" />
        </div>
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

// p: 0=new moon, 0.5=full moon, 1=new moon
// Shadow circle offset: starts at 0 (covers disc = dark), moves off-screen at full moon
function getLunarGeometry(p: number, R: number) {
  const angle = 2 * Math.PI * p;
  const cosA = Math.cos(angle);
  const isWaxing = p <= 0.5;

  let shadowCx: number;
  if (isWaxing) {
    // Shadow moves LEFT from center (new=dark) to off-screen-left (full=bright)
    // p=0 → shadowCx=0 (covers disc), p=0.5 → shadowCx=-2R (off screen)
    shadowCx = R * (cosA - 1); // 0 at p=0, -2R at p=0.5
  } else {
    // Shadow comes from off-screen-right (full=bright) back to center (new=dark)
    // p=0.5 → shadowCx=2R (off screen), p=1 → shadowCx=0 (covers disc)
    shadowCx = R * (1 - cosA); // 2R at p=0.5, 0 at p=1
  }

  return { shadowCx, isWaxing };
}


const PHASE_NAMES = [
  'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
  'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent',
];

const MoonProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const p = scrollProgress / 100;
  const phaseIndex = Math.min(Math.floor(p * 8), 7);
  const phaseName = PHASE_NAMES[phaseIndex];
  const R = 36;
  const { shadowCx, isWaxing } = getLunarGeometry(p, R);
  const isNewMoon = p <= 0.005 || p >= 0.995;
  const isFull = p >= 0.49 && p <= 0.51;


  // clipPath strategy:
  // 1. Show lit circle (full disc in ivory)
  // 2. Clip it to a "lit half" using clipPath (left or right half-plane depending on phase)
  // 3. Overlay a shadow ellipse that hides the unlit terminator region
  //
  // Shadow circle cx = offsetX (waxing: positive→shadow on left side, waning: negative→right)
  // At new moon: shadow fully covers disc. At full: shadow is off-screen.

  return (
    <div className="glass-card" style={{ padding: '1rem 1.5rem' }}>
      <div className="card-title">Moon Progress</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1rem' }}>
        <svg width="80" height="80" viewBox="-40 -40 80 80" style={{ flexShrink: 0, overflow: 'visible' }}>
          <defs>
            {/* Clip to moon circle boundary */}
            <clipPath id="moon-clip">
              <circle cx="0" cy="0" r={R} />
            </clipPath>
            {/* Clip to lit half-plane: waxing=right half, waning=left half */}
            <clipPath id="lit-half-clip">
              <rect
                x={isWaxing ? 0 : -R}
                y={-R}
                width={R}
                height={R * 2}
              />
            </clipPath>
            <filter id="moon-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Dark base disc */}
          <circle cx="0" cy="0" r={R} fill="#0a0f1a" stroke="rgba(225,29,72,0.4)" strokeWidth="1.2" />

          {/* Lit portion — clipped to moon boundary */}
          {!isNewMoon && (
            <g clipPath="url(#moon-clip)">
              {/* Full ivory disc (lit colour) */}
              <circle cx="0" cy="0" r={R} fill={isFull ? '#f0e8d0' : '#cdc4b0'} />
              {/* Shadow overlay: dark circle offset to create terminator */}
              <circle
                cx={shadowCx}
                cy="0"
                r={R}
                fill="#0a0f1a"
              />
            </g>
          )}

          {/* Full moon glow ring */}
          {isFull && (
            <circle cx="0" cy="0" r={R} fill="none"
              stroke="rgba(240,232,208,0.5)" strokeWidth="4"
              filter="url(#moon-glow)" />
          )}

          {/* Crater texture marks */}
          <g clipPath="url(#moon-clip)" opacity="0.12">
            <circle cx="10" cy="-8" r="4" fill="none" stroke="#fff" strokeWidth="1" />
            <circle cx="-12" cy="10" r="5.5" fill="none" stroke="#fff" strokeWidth="1" />
            <circle cx="4" cy="16" r="3" fill="none" stroke="#fff" strokeWidth="1" />
            <circle cx="-5" cy="-18" r="2.5" fill="none" stroke="#fff" strokeWidth="0.8" />
          </g>
        </svg>

        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Phase</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem', lineHeight: 1.2 }}>{phaseName}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--accent-red)' }}>{Math.round(scrollProgress)}% explored</div>
        </div>
      </div>

      {/* Progress bar */}
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
          {/* Update the title and artist here */}
          <h3>Moonlight Sonata</h3>
          <p>Beethoven</p>
        </div>
        <div className={`play-btn ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
          {isPlaying ? <div className="pause-icon">||</div> : ''}
        </div>

        {/* Change the src to your local file path */}
        <audio ref={audioRef} loop src={moonlightAudio} />
      </div>
    </div>
  );
};

const HeroSection = () => (
  <section className="hero-section" id="hero">
    <div className="top-header">
      <h1>SHIVANSH SHARMA</h1>
    </div>

    <div className="hero-content">
      <h2 className="hero-quote">
        Every <span>bloom</span> is a lesson.<br />
        Every lesson shaped<br />
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

const JourneyTimeline = () => (
  <div className="glass-card card-timeline" id="journey">
    <div className="card-title"><span className="icon">❀</span> Journey Timeline</div>
    <div className="timeline-container">
      {[
        { year: '2003', title: 'The Beginning', desc: 'Curious mind with a love for puzzles' },
        { year: '2021', title: 'Started Coding', desc: 'First "Hello World" changed everything' },
        { year: '2022', title: 'Discovered Data', desc: 'Fell in love with the stories hidden in data' },
        { year: '2023', title: 'Machine Learning', desc: 'Turning data into intelligence' },
        { year: '2024', title: 'AI & LLMs', desc: 'Exploring the future of intelligent systems' },
        { year: '2025', title: 'And Beyond', desc: 'Building solutions that create real impact' }
      ].map((item, i) => (
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

const ProjectGarden = () => {
  const projects = [
    { title: 'Bank Churn\nPrediction', problem: 'Banks lose millions when customers churn. Can we predict who is likely to leave?', architecture: 'XGBoost, Random Forest Ensembles, SMOTE for class imbalance', businessImpact: 'Identified key churn drivers, allowing targeted retention campaigns that could save $2.4M annually.', metrics: [{ label: 'Accuracy', value: '86%' }], links: { github: 'https://github.com/Shivansh07-stack/Bank_Data_Churn' }, isBud: false },
    { title: 'Credit Card\nFraud Detection', problem: 'Fraudulent transactions cause heavy losses.', architecture: 'Isolation Forest, Autoencoders', businessImpact: 'Reduced false positives by 30%.', metrics: [{ label: 'F1 Score', value: '0.92' }], links: { github: 'https://github.com/Shivansh07-stack/Credit_Card_Fraud_Detection' }, isBud: false },
    { title: 'AI Job\nAnalyzer', problem: 'Scanning resumes takes too much time.', architecture: 'NLP, BERT embeddings', businessImpact: 'Automated 80% of initial screening.', metrics: [{ label: 'Speedup', value: '5x' }], links: { github: 'https://github.com/Shivansh07-stack/AI_Job_Analyzer' }, isBud: false },
    { title: 'RAG Chatbot\n(Multi-Document)', problem: 'Information retrieval across docs is slow.', architecture: 'LangChain, Pinecone, GPT-4', businessImpact: 'Instant knowledge access.', metrics: [{ label: 'Latency', value: '800ms' }], links: { github: 'https://github.com/Shivansh07-stack/Multi-Document_RAG_Chatbot' }, isBud: false },
    { title: 'AI Business\nAnalyst', problem: 'Generating business insights is manual.', architecture: 'Pandas, GPT-4 Data Analysis', businessImpact: 'Automated daily reporting.', metrics: [{ label: 'Reports', value: '100+' }], links: { github: 'https://github.com/Shivansh07-stack/AI_Business_Analyst' }, isBud: false },
    { title: 'Twitter Sentiment\nAnalysis', problem: 'Brand perception is hard to track.', architecture: 'HuggingFace Sentiment Pipeline', businessImpact: 'Real-time PR monitoring.', metrics: [{ label: 'Accuracy', value: '89%' }], links: { github: 'https://github.com/Shivansh07-stack/Twitter-Recent-Tweets-Sentiment-Analysis' }, isBud: false },
    { title: 'University\nCurriculum Analyzer', problem: 'Analyzing curriculum text across universities.', architecture: 'NLP, TF-IDF, K-Means', businessImpact: 'Improved course structuring.', metrics: [{ label: 'Speed', value: '10x' }], links: { github: 'https://github.com/Shivansh07-stack' }, isBud: false },
    { title: 'Object\nDetection', problem: 'Distance estimation for robotics navigation.', architecture: 'YOLOv8, Depth Estimation', businessImpact: 'Enabled autonomous navigation.', metrics: [{ label: 'mAP', value: '0.74' }], links: { github: 'https://github.com/Shivansh07-stack/Object-Detection-Distance-Estimation-for-Robotics-Navigation' }, isBud: false },
    { title: 'More to\nBloom...', problem: '', architecture: '', businessImpact: '', metrics: [], links: {}, isBud: true }
  ];
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="glass-card card-garden" id="projects">
      <div className="card-title"><span className="icon">❀</span> Project Garden</div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Each flower represents a project.<br />Click to explore.</p>
      <div className="garden-grid">
        {projects.map((proj, i) => (
          <div className={`flower-item`} key={i} onClick={() => setSelected(selected === i ? null : i)}>
            <SpiderLily id={`project-${i}`} isOpen={!proj.isBud} onClose={() => setSelected(null)} projectData={selected === i ? proj : undefined} />
            <div className="flower-name" style={{ color: selected === i ? 'var(--accent-red)' : '' }}>
              {proj.title.split('\n').map((line, j) => <div key={j}>{line}</div>)}
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-btn" onClick={() => window.open('https://github.com/Shivansh07-stack?tab=repositories', '_blank')}>View All Projects</button>
    </div>
  );
};

const WildlifePrediction = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Data':
        return (
          <div className="tab-content">
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Dataset:</strong> 9,000 synthetic NASA FIRMS-like fire detection records.</p>
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Base Features:</strong> Temperature, humidity, wind speed/direction, NDVI, elevation, slope, PDSI drought index, and FRP.</p>
          </div>
        );
      case 'Features':
        return (
          <div className="tab-content">
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Pipeline:</strong> 40+ engineered features via custom WildfireFeatureEngineer transformer.</p>
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Key Engineering:</strong> Wind vectors (u/v), FWI, Vapour Pressure Deficit (VPD), Haines Index, and terrain risk.</p>
          </div>
        );
      case 'Modeling':
        return (
          <div className="tab-content">
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Algorithms:</strong> Hard-voting ensemble of Random Forest, XGBoost & LightGBM.</p>
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Validation:</strong> 5-Fold Stratified Cross-Validation using AUC-ROC to handle severe class imbalance.</p>
          </div>
        );
      case 'Results':
        return (
          <div className="tab-content">
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Feature Importance:</strong> Identified wind speed, Fire Weather Index (FWI), NDVI, and terrain slope as the primary drivers of fire spread.</p>
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Live Prediction:</strong> Built a Streamlit dashboard allowing users to tweak weather and terrain sliders to see real-time spread probability.</p>
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Risk Heatmap:</strong> Generates dynamic geographic heatmaps highlighting high-risk spread zones based on current meteorological inputs.</p>
          </div>
        );
      case 'Impact':
        return (
          <div className="tab-content">
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Emergency Response:</strong> Gives field teams a real-time probability map of where fire will spread next, enabling faster evacuation & resource deployment.</p>
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Geographic Risk Map:</strong> Heatmap of predicted spread probability across terrain, helping prioritise containment efforts.</p>
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Future Road Map:</strong> ConvLSTM for spatial-temporal prediction, Google Earth Engine integration for live satellite feeds, SHAP explanations for each prediction, and a FastAPI endpoint for real-time risk queries.</p>
          </div>
        );
      case 'Learnings':
        return (
          <div className="tab-content">
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Feature Engineering matters most:</strong> 40+ engineered features (FWI, VPD, Haines Index, terrain risk) had more impact than model choice alone.</p>
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Class imbalance is critical:</strong> AUC-ROC + stratified CV were essential — accuracy alone was misleading on imbalanced fire/no-fire labels.</p>
            <p><span style={{ color: 'var(--accent-red)', marginRight: '6px' }}>✦</span> <strong style={{ color: '#fff' }}>Geospatial context is key:</strong> Elevation, slope, aspect and land cover dramatically changed spread predictions — purely tabular models miss this.</p>
          </div>
        );
      default:

        return (
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '0.8rem', marginBottom: '1.2rem', fontWeight: 500 }}>ML Pipeline Architecture</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr)', alignItems: 'center', justifyItems: 'center', rowGap: '0.8rem', columnGap: '0.2rem', width: '100%' }}>
              <div className="arch-box interactive" style={{ width: '100%', boxSizing: 'border-box', padding: '0.4rem 0.2rem', fontSize: '0.6rem', wordWrap: 'break-word' }}>NASA FIRMS<br />Data</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>→</div>
              <div className="arch-box interactive" style={{ width: '100%', boxSizing: 'border-box', padding: '0.4rem 0.2rem', fontSize: '0.6rem', wordWrap: 'break-word' }}>Feature<br />Engineering</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>→</div>
              <div className="arch-box interactive" style={{ width: '100%', boxSizing: 'border-box', padding: '0.4rem 0.2rem', fontSize: '0.6rem', wordWrap: 'break-word' }}>Ensemble<br />Models</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>→</div>
              <div className="arch-box interactive" style={{ width: '100%', boxSizing: 'border-box', padding: '0.4rem 0.2rem', fontSize: '0.6rem', wordWrap: 'break-word' }}>Streamlit<br />Dashboard</div>

              <div /><div />
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>↓</div>
              <div /><div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>↓</div>
              <div /><div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>↓</div>

              <div /><div />
              <div className="arch-box interactive" style={{ width: '100%', boxSizing: 'border-box', padding: '0.4rem 0.2rem', fontSize: '0.6rem', wordWrap: 'break-word' }}>40+<br />Features</div>
              <div />
              <div className="arch-box interactive" style={{ width: '100%', boxSizing: 'border-box', padding: '0.4rem 0.2rem', fontSize: '0.6rem', wordWrap: 'break-word' }}>AUC-ROC<br />Evaluation</div>
              <div />
              <div className="arch-box interactive" style={{ width: '100%', boxSizing: 'border-box', padding: '0.4rem 0.2rem', fontSize: '0.6rem', wordWrap: 'break-word' }}>Risk<br />Heat Map</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="glass-card card-churn" id="featured">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem' }}>Wildlife Spread<br />Prediction</h2>
          <div className="subtitle" style={{ color: 'var(--accent-red)', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem', textTransform: 'uppercase' }}>★ Featured Project</div>
        </div>
      </div>

      <div className="churn-problem">
        <strong style={{ color: '#fff', fontSize: '0.8rem' }}>Problem</strong><br />
        Emergency teams lack real-time tools to predict wildfire spread direction & intensity. Can ML save lives by forecasting where fire moves next?
      </div>

      <div className="tabs" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {[
          { id: 'Overview', icon: <Flower2 size={18} /> },
          { id: 'Data', icon: <Database size={18} /> },
          { id: 'Features', icon: <LineChart size={18} /> },
          { id: 'Modeling', icon: <Network size={18} /> },
          { id: 'Results', icon: <Sliders size={18} /> },
          { id: 'Impact', icon: <Shield size={18} /> },
          { id: 'Learnings', icon: <Lightbulb size={18} /> }
        ].map(t => (
          <div key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.8rem', cursor: 'pointer', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', flex: 1, minWidth: '60px' }}>
            <div style={{ marginBottom: '8px', color: activeTab === t.id ? 'var(--accent-red)' : 'var(--text-secondary)' }}>{t.icon}</div>
            <div style={{ fontSize: '0.7rem', color: activeTab === t.id ? '#fff' : 'var(--text-secondary)', textAlign: 'center' }}>{t.id}</div>
          </div>
        ))}
      </div>

      <div className="tab-container" style={{ height: '280px', overflowY: 'auto', overflowX: 'hidden' }}>
        {renderContent()}
      </div>

      <div className="tech-stack-row" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Tech Stack</div>
          <div className="stack-icons" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" style={{ height: '20px', width: 'auto' }} title="Python" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" alt="Pandas" style={{ height: '20px', width: 'auto' }} title="Pandas" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" alt="Scikit-Learn" style={{ height: '20px', width: 'auto' }} title="Scikit-Learn" />
            <img src="https://streamlit.io/images/brand/streamlit-mark-color.svg" alt="Streamlit" style={{ height: '20px', width: 'auto' }} title="Streamlit" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/XGBoost_logo.png" alt="XGBoost" style={{ height: '16px', width: 'auto', objectFit: 'contain' }} title="XGBoost" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/plotly/plotly-original.svg" alt="Plotly" style={{ height: '20px', width: 'auto' }} title="Plotly" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>View on GitHub</div>
          <div className="action-buttons" style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-icon" onClick={() => window.open('https://github.com/Shivansh07-stack/Wildlife_Spread_Prediction', '_blank')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 19 19" width="18" height="18"><path fill="#fff" fillRule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clipRule="evenodd" /></svg>
            </button>
            <button className="btn-primary interactive" onClick={() => window.open('https://github.com/Shivansh07-stack/Wildlife_Spread_Prediction', '_blank')}>View Project</button>
          </div>
        </div>
      </div>
    </div>
  );
};


const SkillsConstellation = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const skills = [
    { name: 'Python', top: '15%', left: '50%', red: false },
    { name: 'SQL', top: '40%', left: '20%', red: true },
    { name: 'Machine Learning', top: '40%', left: '50%', red: true },
    { name: 'PySpark', top: '40%', left: '80%', red: true },
    { name: 'Pandas', top: '65%', left: '15%', red: false },
    { name: 'Scikit-learn', top: '65%', left: '35%', red: false },
    { name: 'TensorFlow', top: '65%', left: '65%', red: true },
    { name: 'NLP', top: '65%', left: '85%', red: false },
    { name: 'FastAPI', top: '85%', left: '20%', red: true },
    { name: 'Django', top: '85%', left: '40%', red: false },
    { name: 'Git & GitHub', top: '85%', left: '60%', red: true },
    { name: 'Docker', top: '85%', left: '80%', red: true },
  ];

  return (
    <div className="glass-card card-skills" id="skills">
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

        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.25, stroke: '#fff', strokeWidth: 0.5, pointerEvents: 'none' }}>
          {/* Row 2 Horizontal */}
          <line x1="20%" y1="40%" x2="50%" y2="40%" />
          <line x1="50%" y1="40%" x2="80%" y2="40%" />

          {/* Row 3 Horizontal */}
          <line x1="15%" y1="65%" x2="35%" y2="65%" />
          <line x1="35%" y1="65%" x2="65%" y2="65%" />
          <line x1="65%" y1="65%" x2="85%" y2="65%" />

          {/* Row 4 Horizontal */}
          <line x1="20%" y1="85%" x2="40%" y2="85%" />
          <line x1="40%" y1="85%" x2="60%" y2="85%" />
          <line x1="60%" y1="85%" x2="80%" y2="85%" />

          {/* Diagonals from Python */}
          <line x1="50%" y1="15%" x2="20%" y2="40%" />
          <line x1="50%" y1="15%" x2="80%" y2="40%" />

          {/* Diagonals from SQL */}
          <line x1="20%" y1="40%" x2="15%" y2="65%" />
          <line x1="20%" y1="40%" x2="35%" y2="65%" />

          {/* Diagonals from ML */}
          <line x1="50%" y1="40%" x2="35%" y2="65%" />
          <line x1="50%" y1="40%" x2="65%" y2="65%" />

          {/* Diagonals from PySpark */}
          <line x1="80%" y1="40%" x2="65%" y2="65%" />
          <line x1="80%" y1="40%" x2="85%" y2="65%" />

          {/* Diagonals from Row 3 to Row 4 */}
          <line x1="15%" y1="65%" x2="20%" y2="85%" />
          <line x1="35%" y1="65%" x2="20%" y2="85%" />
          <line x1="35%" y1="65%" x2="40%" y2="85%" />
          <line x1="65%" y1="65%" x2="40%" y2="85%" />
          <line x1="65%" y1="65%" x2="60%" y2="85%" />
          <line x1="65%" y1="65%" x2="80%" y2="85%" />
          <line x1="85%" y1="65%" x2="80%" y2="85%" />
        </svg>
      </div>
    </div>
  );
};

const LiveFeed = () => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [weeklyCommits, setWeeklyCommits] = useState(87);

  useEffect(() => {
    fetch('https://api.github.com/users/Shivansh07-stack/events/public')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Calculate commits from the recent events
          const commits = data.filter(e => e.type === 'PushEvent')
            .reduce((acc, curr) => acc + (curr.payload?.commits?.length || 0), 0);
          setWeeklyCommits(commits > 0 ? commits : 12); // Fallback to a number if 0 to look nice

          const parsed = data.slice(0, 4).map((item) => {
            let title = '';
            let IconCmp = Circle;

            if (item.type === 'PushEvent') {
              title = `Pushed to ${item.repo.name.split('/')[1]}`;
              IconCmp = Triangle;
            } else if (item.type === 'CreateEvent') {
              title = `Created ${item.payload.ref_type || 'repository'}\n${item.repo.name.split('/')[1]}`;
              IconCmp = Hexagon;
            } else if (item.type === 'WatchEvent') {
              title = `Starred repository\n${item.repo.name.split('/')[1]}`;
              IconCmp = Square;
            } else if (item.type === 'IssuesEvent') {
              title = `${item.payload.action} issue in\n${item.repo.name.split('/')[1]}`;
              IconCmp = Circle;
            } else if (item.type === 'PullRequestEvent') {
              title = `${item.payload.action} PR in\n${item.repo.name.split('/')[1]}`;
              IconCmp = Hexagon;
            } else {
              title = `${item.type.replace('Event', '')} on\n${item.repo.name.split('/')[1]}`;
              IconCmp = Square;
            }

            const date = new Date(item.created_at);
            const now = new Date();
            const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
            const timeStr = diffHours === 0 ? 'Just now' : diffHours < 24 ? `${diffHours} hours ago` : `${Math.floor(diffHours / 24)} days ago`;

            return { title, time: timeStr, icon: <IconCmp size={14} color="var(--accent-red)" strokeWidth={1.5} /> };
          });
          setEvents(parsed);
        }
      })
      .catch(console.error);
  }, []);

  const displayEvents = events.length > 0 ? events : [
    { title: 'Loading...', time: '', icon: <Circle size={14} color="var(--accent-red)" strokeWidth={1.5} /> }
  ];

  return (
    <div className="glass-card card-live" id="live">
      <div className="card-title">Live Feed</div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Real-time activity from my digital garden</p>
      <div className="feed-list" style={{ marginTop: '1.5rem' }}>
        {displayEvents.map((item, i) => (
          <div className="feed-item interactive" key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className="feed-icon" style={{ marginTop: '2px' }}>{item.icon}</div>
            <div className="feed-text">
              <div className="feed-title" style={{ whiteSpace: 'pre-line', fontSize: '0.8rem', lineHeight: '1.4' }}>{item.title}</div>
              <div className="feed-time" style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{item.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem' }}>
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
                {hoveredCell === i && <div className="tooltip">Commits: {Math.floor(Math.random() * 5)}</div>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>This Week</div>
          <div style={{ fontSize: '1.5rem', color: 'var(--accent-red)' }}>{weeklyCommits}</div>
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
          <JourneyTimeline />
          <ProjectGarden />
          <WildlifePrediction />
          <SkillsConstellation />
          <LiveFeed />

          <div className="glass-card card-about" id="about" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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
            <div className="stat-box">
              <span className="stat-num counter">15+</span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat-box">
              <span className="stat-num counter" style={{ fontSize: '1.5rem', marginTop: '-0.2rem' }}>∞</span>
              <span className="stat-label">Curiosity</span>
            </div>
          </div>

          <div className="glass-card card-connect">
            <div className="card-title" style={{ textTransform: 'uppercase', marginBottom: '1rem' }}>Let's Connect</div>
            <p style={{ fontSize: '0.75rem', color: '#e2e8f0', marginBottom: '1.5rem', maxWidth: '300px', lineHeight: '1.5' }}>
              I'm always excited to collaborate<br />and build amazing things together.
            </p>
            <div className="action-buttons" style={{ display: 'flex', gap: '0.8rem' }}>
              <button className="btn-icon interactive" onClick={() => window.open('https://github.com', '_blank')} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </button>
              <button className="btn-icon interactive" onClick={() => window.open('https://linkedin.com', '_blank')} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </button>
              <button className="btn-icon interactive" onClick={() => window.location.href = 'mailto:hello@example.com'} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </button>
              <button className="btn-icon interactive" onClick={() => window.open('https://twitter.com', '_blank')} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
