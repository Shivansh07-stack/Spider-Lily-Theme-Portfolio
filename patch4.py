import sys

with open('src/App.tsx', 'r') as f:
    app = f.read()

custom_icons = """
// --- Custom SVG Icons ---
const ProjectsIcon = ({ size = 28, color = "var(--accent-red)", strokeWidth = 1.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}>
    <path d="M 9 3 H 5 A 2 2 0 0 0 3 5 V 9" />
    <path d="M 15 3 H 19 A 2 2 0 0 1 21 5 V 9" />
    <path d="M 21 15 V 19 A 2 2 0 0 1 19 21 H 15" />
    <path d="M 9 21 H 5 A 2 2 0 0 1 3 19 V 15" />
    <line x1="12" y1="3" x2="12" y2="8" />
    <line x1="12" y1="16" x2="12" y2="21" />
    <line x1="3" y1="12" x2="8" y2="12" />
    <line x1="16" y1="12" x2="21" y2="12" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="8" x2="12" y2="9.5" />
    <line x1="12" y1="14.5" x2="12" y2="16" />
    <line x1="8" y1="12" x2="9.5" y2="12" />
    <line x1="14.5" y1="12" x2="16" y2="12" />
    <circle cx="12" cy="12" r="0.5" fill={color} />
  </svg>
);

const DomainsIcon = ({ size = 28, color = "var(--accent-red)", strokeWidth = 1.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}>
    <path d="M 5 14 C 2 12, 4 6, 8 7 C 9 3, 15 3, 16 7 C 20 6, 22 12, 19 14" />
    <path d="M 5 14 C 3 17, 7 21, 10 21 C 12 21, 12 18, 12 18 C 12 18, 12 21, 14 21 C 17 21, 21 17, 19 14" />
    <circle cx="8.5" cy="18" r="0.5" fill={color} />
    <circle cx="15.5" cy="18" r="0.5" fill={color} />
    <path d="M 12 7 C 13 9, 14 11, 14 12 C 14 13, 13 14, 12 14 C 11 14, 10 13, 10 12 C 10 11, 11 9, 12 7 Z" />
  </svg>
);

const InternshipsIcon = ({ size = 28, color = "var(--accent-red)", strokeWidth = 1.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}>
    <path d="M 9 15 H 7 A 2 2 0 0 0 5 17 V 18 A 2 2 0 0 0 7 20 H 17 A 2 2 0 0 0 19 18 V 17 A 2 2 0 0 0 17 15 H 15" />
    <line x1="11" y1="18" x2="13" y2="18" />
    <path d="M 9 6 C 9 3.5, 15 3.5, 15 6 C 15 8.5, 9 8.5, 9 6 Z" />
    <circle cx="12" cy="6" r="1.5" />
    <path d="M 10 9 L 12 13 L 14 9" />
    <path d="M 8 11 C 9 14, 11 15, 12 15 C 13 15, 15 14, 16 11" />
  </svg>
);

const TechIcon = ({ size = 28, color = "var(--accent-red)", strokeWidth = 1.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}>
    <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="0.5" fill={color} />
    <circle cx="12" cy="8" r="0.5" fill={color} />
    <circle cx="9" cy="14" r="0.5" fill={color} />
    <circle cx="15" cy="14" r="0.5" fill={color} />
  </svg>
);

const CuriosityIcon = ({ size = 28, color = "var(--accent-red)", strokeWidth = 1.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}>
    <circle cx="12" cy="12" r="9" />
    <path d="M 12 8 L 13.5 12 L 12 16 L 10.5 12 Z" />
    <path d="M 11.5 9 L 8 8 L 7 11" />
    <path d="M 12.5 9 L 16 8 L 17 11" />
    <path d="M 11.5 15 L 8 16 L 7 13" />
    <path d="M 12.5 15 L 16 16 L 17 13" />
    <circle cx="9" cy="10" r="0.5" fill={color} />
    <circle cx="15" cy="14" r="0.5" fill={color} />
  </svg>
);
// --------------------------
"""

# Insert custom icons before function App()
app = app.replace("function App() {", custom_icons + "\nfunction App() {")

# Replace old icon usage with new custom icons
old_stats_block = """          <div className="glass-card card-stats interactive-card">
            <div className="stat-box">
              <Package size={28} color="var(--accent-red)" strokeWidth={1.2} style={{ marginBottom: '0.5rem' }} />
              <span className="stat-num counter">10+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-box">
              <Brain size={28} color="var(--accent-red)" strokeWidth={1.2} style={{ marginBottom: '0.5rem' }} />
              <span className="stat-num counter">3</span>
              <span className="stat-label">Major Domains</span>
            </div>
            <div className="stat-box">
              <GraduationCap size={28} color="var(--accent-red)" strokeWidth={1.2} style={{ marginBottom: '0.5rem' }} />
              <span className="stat-num counter">2</span>
              <span className="stat-label">Internships</span>
            </div>
            <div className="stat-box">
              <Cpu size={28} color="var(--accent-red)" strokeWidth={1.2} style={{ marginBottom: '0.5rem' }} />
              <span className="stat-num counter">15+</span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat-box">
              <Compass size={28} color="var(--accent-red)" strokeWidth={1.2} style={{ marginBottom: '0.5rem' }} />
              <span className="stat-num counter" style={{ fontSize: '1.5rem', marginTop: '-0.2rem' }}>∞</span>
              <span className="stat-label">Curiosity</span>
            </div>
          </div>"""

new_stats_block = """          <div className="glass-card card-stats interactive-card">
            <div className="stat-box">
              <ProjectsIcon />
              <span className="stat-num counter">10+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-box">
              <DomainsIcon />
              <span className="stat-num counter">3</span>
              <span className="stat-label">Major Domains</span>
            </div>
            <div className="stat-box">
              <InternshipsIcon />
              <span className="stat-num counter">2</span>
              <span className="stat-label">Internships</span>
            </div>
            <div className="stat-box">
              <TechIcon />
              <span className="stat-num counter">15+</span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat-box">
              <CuriosityIcon />
              <span className="stat-num counter" style={{ fontSize: '1.5rem', marginTop: '-0.2rem' }}>∞</span>
              <span className="stat-label">Curiosity</span>
            </div>
          </div>"""

app = app.replace(old_stats_block, new_stats_block)

with open('src/App.tsx', 'w') as f:
    f.write(app)
