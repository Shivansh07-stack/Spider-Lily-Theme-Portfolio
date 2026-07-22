import sys

with open('src/App.tsx', 'r') as f:
    app = f.read()

# Add new imports
if 'Package' not in app:
    app = app.replace("import { Flower2", "import { Package, Brain, GraduationCap, Cpu, Compass, Flower2")

old_stats = """          <div className="glass-card card-stats interactive-card">
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
          </div>"""

new_stats = """          <div className="glass-card card-stats interactive-card">
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

app = app.replace(old_stats, new_stats)

with open('src/App.tsx', 'w') as f:
    f.write(app)
