import sys
with open('src/App.tsx', 'r') as f:
    content = f.read()

# Chunk 1: Navigation
content = content.replace("""  const navItems = [
    { id: 'journey', icon: <Flower2 size={18} strokeWidth={1.5} />, label: 'Journey' },
    { id: 'skills', icon: <Sparkles size={18} strokeWidth={1.5} />, label: 'Skills' },
    { id: 'projects', icon: <Code size={18} strokeWidth={1.5} />, label: 'Projects' },
    { id: 'experience', icon: <Briefcase size={18} strokeWidth={1.5} />, label: 'Experience' },
    { id: 'research', icon: <Book size={18} strokeWidth={1.5} />, label: 'Research' },
    { id: 'live', icon: <Activity size={18} strokeWidth={1.5} />, label: 'Live' }
  ];""", """  const navItems = [
    { id: 'journey', icon: <Flower2 size={18} strokeWidth={1.5} />, label: 'Journey' },
    { id: 'experience', icon: <Briefcase size={18} strokeWidth={1.5} />, label: 'Experience' },
    { id: 'projects', icon: <Code size={18} strokeWidth={1.5} />, label: 'Projects' },
    { id: 'skills', icon: <Sparkles size={18} strokeWidth={1.5} />, label: 'Skills' },
    { id: 'live', icon: <Activity size={18} strokeWidth={1.5} />, label: 'Live' }
  ];""")

# Chunk 2a: Imports
content = content.replace("import moonlightAudio from './assets/moonlight.mp3';\n", "")

# Chunk 2b: Audio
content = content.replace("<audio ref={audioRef} loop src={moonlightAudio} />", '<audio ref={audioRef} loop src="/moonlight.mp3" />')

# Chunk 3: JourneyTimeline
content = content.replace("""    <div className="timeline-container">
      {[
        { year: '2003', title: 'The Beginning', desc: 'Curious mind with a love for puzzles' },
        { year: '2021', title: 'Started Coding', desc: 'First "Hello World" changed everything' },""", """    <div className="timeline-container">
      {[
        { year: '2021', title: 'Started Coding', desc: 'First "Hello World" changed everything' },""")

# Chunk 4: ProjectGarden
old_projects = """const ProjectGarden = () => {
  const projects = [
    { title: 'Bank Churn\\nPrediction', problem: 'Banks lose millions when customers churn. Can we predict who is likely to leave?', architecture: 'XGBoost, Random Forest Ensembles, SMOTE for class imbalance', businessImpact: 'Identified key churn drivers, allowing targeted retention campaigns that could save $2.4M annually.', metrics: [{ label: 'Accuracy', value: '86%' }], links: { github: 'https://github.com/Shivansh07-stack/Bank_Data_Churn' }, isBud: false },
    { title: 'Credit Card\\nFraud Detection', problem: 'Fraudulent transactions cause heavy losses.', architecture: 'Isolation Forest, Autoencoders', businessImpact: 'Reduced false positives by 30%.', metrics: [{ label: 'F1 Score', value: '0.92' }], links: { github: 'https://github.com/Shivansh07-stack/Credit_Card_Fraud_Detection' }, isBud: false },
    { title: 'AI Job\\nAnalyzer', problem: 'Scanning resumes takes too much time.', architecture: 'NLP, BERT embeddings', businessImpact: 'Automated 80% of initial screening.', metrics: [{ label: 'Speedup', value: '5x' }], links: { github: 'https://github.com/Shivansh07-stack/AI_Job_Analyzer' }, isBud: false },
    { title: 'RAG Chatbot\\n(Multi-Document)', problem: 'Information retrieval across docs is slow.', architecture: 'LangChain, Pinecone, GPT-4', businessImpact: 'Instant knowledge access.', metrics: [{ label: 'Latency', value: '800ms' }], links: { github: 'https://github.com/Shivansh07-stack/Multi-Document_RAG_Chatbot' }, isBud: false },
    { title: 'AI Business\\nAnalyst', problem: 'Generating business insights is manual.', architecture: 'Pandas, GPT-4 Data Analysis', businessImpact: 'Automated daily reporting.', metrics: [{ label: 'Reports', value: '100+' }], links: { github: 'https://github.com/Shivansh07-stack/AI_Business_Analyst' }, isBud: false },
    { title: 'Twitter Sentiment\\nAnalysis', problem: 'Brand perception is hard to track.', architecture: 'HuggingFace Sentiment Pipeline', businessImpact: 'Real-time PR monitoring.', metrics: [{ label: 'Accuracy', value: '89%' }], links: { github: 'https://github.com/Shivansh07-stack/Twitter-Recent-Tweets-Sentiment-Analysis' }, isBud: false },
    { title: 'University\\nCurriculum Analyzer', problem: 'Analyzing curriculum text across universities.', architecture: 'NLP, TF-IDF, K-Means', businessImpact: 'Improved course structuring.', metrics: [{ label: 'Speed', value: '10x' }], links: { github: 'https://github.com/Shivansh07-stack' }, isBud: false },
    { title: 'Object\\nDetection', problem: 'Distance estimation for robotics navigation.', architecture: 'YOLOv8, Depth Estimation', businessImpact: 'Enabled autonomous navigation.', metrics: [{ label: 'mAP', value: '0.74' }], links: { github: 'https://github.com/Shivansh07-stack/Object-Detection-Distance-Estimation-for-Robotics-Navigation' }, isBud: false },
    { title: 'More to\\nBloom...', problem: '', architecture: '', businessImpact: '', metrics: [], links: {}, isBud: true }
  ];"""

new_projects = """const ProjectGarden = () => {
  const projects = [
    { title: 'Bank Churn\\nPrediction', problem: 'Banks lose millions when customers churn. Can we predict who is likely to leave?', architecture: 'XGBoost, Random Forest Ensembles, SMOTE for class imbalance', businessImpact: 'Identified key churn drivers, modeling potential savings of $2.4M under optimal retention assumptions.', metrics: [{ label: 'Accuracy', value: '86%' }], links: { github: 'https://github.com/Shivansh07-stack/Bank_Data_Churn' }, isBud: false },
    { title: 'Credit Card\\nFraud Detection', problem: 'Fraudulent transactions cause heavy losses.', architecture: 'Gradient Boosting, SMOTE', businessImpact: 'Achieved a 30% lower false positive rate compared to baseline.', metrics: [{ label: 'F1 Score', value: '0.92' }], links: { github: 'https://github.com/Shivansh07-stack/Credit_Card_Fraud_Detection' }, isBud: false },
    { title: 'AI Job Market\\nAnalyzer', problem: 'Predicting technology demand trends.', architecture: 'Linear Regression, Pandas, Streamlit', businessImpact: 'Projected technology demand through 2030 via an interactive dashboard.', metrics: [{ label: 'Data points', value: '49k+' }], links: { github: 'https://github.com/Shivansh07-stack/AI_Job_Analyzer' }, isBud: false },
    { title: 'Cabin Price\\nPrediction', problem: 'Inconsistent manual real estate valuation.', architecture: 'Python, TensorFlow, Regression', businessImpact: 'Replaced manual valuation with data-driven pricing models.', metrics: [{ label: 'Model', value: 'Neural Net' }], links: { github: 'https://github.com/Shivansh07-stack' }, isBud: false },
    { title: 'RAG Chatbot\\n(Multi-Document)', problem: 'Information retrieval across docs is slow.', architecture: 'LangChain, Pinecone, GPT-4', businessImpact: 'Instant knowledge access.', metrics: [{ label: 'Latency', value: '800ms' }], links: { github: 'https://github.com/Shivansh07-stack/Multi-Document_RAG_Chatbot' }, isBud: false },
    { title: 'AI Business\\nAnalyst', problem: 'Generating business insights is manual.', architecture: 'Pandas, GPT-4 Data Analysis', businessImpact: 'Automated daily reporting.', metrics: [{ label: 'Reports', value: '100+' }], links: { github: 'https://github.com/Shivansh07-stack/AI_Business_Analyst' }, isBud: false },
    { title: 'Twitter Sentiment\\nAnalysis', problem: 'Brand perception is hard to track.', architecture: 'HuggingFace Sentiment Pipeline', businessImpact: 'Real-time PR monitoring.', metrics: [{ label: 'Accuracy', value: '89%' }], links: { github: 'https://github.com/Shivansh07-stack/Twitter-Recent-Tweets-Sentiment-Analysis' }, isBud: false },
    { title: 'Object\\nDetection', problem: 'Distance estimation for robotics navigation.', architecture: 'YOLOv8, Depth Estimation', businessImpact: 'Enabled autonomous navigation.', metrics: [{ label: 'mAP', value: '0.74' }], links: { github: 'https://github.com/Shivansh07-stack/Object-Detection-Distance-Estimation-for-Robotics-Navigation' }, isBud: false },
    { title: 'More to\\nBloom...', problem: '', architecture: '', businessImpact: '', metrics: [], links: {}, isBud: true }
  ];"""
content = content.replace(old_projects, new_projects)

# Chunk 5a: LiveFeed fallback
old_catch = """          setEvents(parsed);
        }
      })
      .catch(console.error);"""

new_catch = """          setEvents(parsed);
        }
      })
      .catch((err) => {
        console.error(err);
        setEvents([{ title: 'Live feed unavailable\\nat the moment', time: '', icon: <Circle size={14} color="var(--accent-red)" strokeWidth={1.5} /> }]);
      });"""
content = content.replace(old_catch, new_catch)

# Chunk 5b: LiveFeed heatmap
old_heatmap = """      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem' }}>
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
      </div>"""

new_heatmap = """      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>This Week</div>
          <div style={{ fontSize: '1.5rem', color: 'var(--accent-red)' }}>{weeklyCommits}</div>
          <div style={{ fontSize: '0.65rem' }}>Contributions</div>
        </div>
      </div>"""
content = content.replace(old_heatmap, new_heatmap)

# Chunk 6: Resume button
old_resume = """              <button className="hero-btn" style={{ fontSize: '0.8rem' }} onClick={() => window.open('/Shivansh_Sharma_Resume.pdf', '_blank')}>Know More About Me <div className="hero-btn-arrow" style={{ width: '20px', height: '20px' }}>→</div></button>"""
new_resume = """              <button className="hero-btn" style={{ fontSize: '0.8rem' }} onClick={() => window.open('/Shivansh_Sharma_Resume.pdf', '_blank')}>
                Resume / Download CV 
                <div className="hero-btn-arrow" style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </div>
              </button>"""
content = content.replace(old_resume, new_resume)

# Chunk 7: Experience section and reordering
old_app = """function App() {
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
          <LiveFeed />"""

new_app = """const ExperienceSection = () => (
  <div className="glass-card card-experience" id="experience">
    <div className="card-title"><span className="icon"><Briefcase size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /></span> Experience</div>
    
    <div className="experience-item" style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#fff', margin: 0 }}>Data Science Intern</h3>
          <div style={{ color: 'var(--accent-red)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Vinove Software and Services</div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'right' }}>Jun 2025 - Aug 2025</div>
      </div>
      <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem', lineHeight: '1.6', margin: 0 }}>
        <li style={{ marginBottom: '0.4rem' }}>Developed 2 ML models (Weather Forecasting and Market Prediction APIs via REST/FastAPI) using Python and Scikit-learn with time series and probability-based methods, reducing manual effort by ~40%.</li>
        <li>Deployed an Ollama-based local LLM into a Django/FastAPI backend for offline AI inference; delivered 3 data-driven modules across 4 agile sprints.</li>
      </ul>
    </div>

    <div className="experience-item">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#fff', margin: 0 }}>Big Data Trainee</h3>
          <div style={{ color: 'var(--accent-red)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Samsung Innovation Campus</div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'right' }}>Dec 2025 - Feb 2026</div>
      </div>
      <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem', lineHeight: '1.6', margin: 0 }}>
        <li style={{ marginBottom: '0.4rem' }}>Selected for Samsung's competitive Big Data program; applied SQL and Hadoop to query, clean, and preprocess large-scale datasets.</li>
        <li>Conducted hypothesis-driven data analysis and structured data transformation on 3 real-world datasets, visualizing trends for stakeholders.</li>
      </ul>
    </div>
  </div>
);

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
          <ExperienceSection />
          <WildlifePrediction />
          <ProjectGarden />
          <SkillsConstellation />
          <LiveFeed />"""
content = content.replace(old_app, new_app)

# Chunk 8: GitHub link fix
old_github = """<button className="btn-icon interactive" onClick={() => window.open('https://github.com', '_blank')} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>"""
new_github = """<button className="btn-icon interactive" onClick={() => window.open('https://github.com/Shivansh07-stack', '_blank')} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>"""
content = content.replace(old_github, new_github)

with open('src/App.tsx', 'w') as f:
    f.write(content)
