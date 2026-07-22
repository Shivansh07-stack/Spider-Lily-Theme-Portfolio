import sys

with open('src/index.css', 'r') as f:
    css = f.read()

css = css.replace('.card-about {\n  grid-column: span 1;', '.card-about {\n  grid-column: span 1;\n  grid-row: span 2;')
css = css.replace('.card-connect {\n  grid-column: span 1;', '.card-connect {\n  grid-column: span 2;')

# Add .card-experience if not exists
if '.card-experience' not in css:
    css += "\n.card-experience {\n  grid-column: span 1;\n  grid-row: span 2;\n}\n"

with open('src/index.css', 'w') as f:
    f.write(css)

with open('src/App.tsx', 'r') as f:
    app = f.read()

old_grid = """        <div className="portfolio-grid">
          <JourneyTimeline />
          <ExperienceSection />
          <WildlifePrediction />
          <ProjectGarden />
          <SkillsConstellation />
          <LiveFeed />

          <div className="glass-card card-about" id="about" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>"""

new_grid = """        <div className="portfolio-grid">
          <JourneyTimeline />
          <ExperienceSection />
          <WildlifePrediction />
          <ProjectGarden />
          <SkillsConstellation />

          <div className="glass-card card-about" id="about" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>"""
app = app.replace(old_grid, new_grid)

old_end = """          <div className="glass-card card-connect">
            <div className="card-title" style={{ textTransform: 'uppercase', marginBottom: '1rem' }}>Let's Connect</div>
            <p style={{ fontSize: '0.75rem', color: '#e2e8f0', marginBottom: '1.5rem', maxWidth: '300px', lineHeight: '1.5' }}>
              I'm always excited to collaborate<br />and build amazing things together.
            </p>
            <div className="action-buttons" style={{ display: 'flex', gap: '0.8rem' }}>
              <button className="btn-icon interactive" onClick={() => window.open('https://github.com/Shivansh07-stack', '_blank')} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </button>
              <button className="btn-icon interactive" onClick={() => window.open('https://www.linkedin.com/in/shivanshsharma355/', '_blank')} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </button>
              <button className="btn-icon interactive" onClick={() => window.location.href = 'mailto:shivaansh07@gmail.com'} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>"""

new_end = """          <LiveFeed />

          <div className="glass-card card-connect">
            <div className="card-title" style={{ textTransform: 'uppercase', marginBottom: '1rem' }}>Let's Connect</div>
            <p style={{ fontSize: '0.75rem', color: '#e2e8f0', marginBottom: '1.5rem', maxWidth: '300px', lineHeight: '1.5' }}>
              I'm always excited to collaborate<br />and build amazing things together.
            </p>
            <div className="action-buttons" style={{ display: 'flex', gap: '0.8rem' }}>
              <button className="btn-icon interactive" onClick={() => window.open('https://github.com/Shivansh07-stack', '_blank')} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </button>
              <button className="btn-icon interactive" onClick={() => window.open('https://www.linkedin.com/in/shivanshsharma355/', '_blank')} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </button>
              <button className="btn-icon interactive" onClick={() => window.location.href = 'mailto:shivaansh07@gmail.com'} style={{ borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>"""
app = app.replace(old_end, new_end)

with open('src/App.tsx', 'w') as f:
    f.write(app)
