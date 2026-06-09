<template>
  <main>
    <section class="dept-section">
      <div class="container">
        <div class="dept-header">
          <p class="college-name">SRM INSTITUTE OF SCIENCE AND TECHNOLOGY</p>
          <h1 class="section-title">B.Tech Computer Science Engineering (AIML)</h1>
          <p class="program-subtitle">Artificial Intelligence & Machine Learning Specialization</p>
          <div class="divider"></div>
        </div>

        <div class="tabs-container">
          <button 
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab-btn', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="tab-content">
          <!-- About Department Tab -->
          <div v-show="activeTab === 'about'" class="content-panel">
            <h2 class="panel-title">About the Department</h2>
            <div class="overview-grid">
              <div class="overview-card">
                <div class="card-icon">📅</div>
                <div class="card-content">
                  <h3>Program Focus</h3>
                  <p>AIML Specialization</p>
                </div>
              </div>
              <div class="overview-card">
                <div class="card-icon">📚</div>
                <div class="card-content">
                  <h3>Total Credits</h3>
                  <p>160 Credits</p>
                </div>
              </div>
              <div class="overview-card">
                <div class="card-icon">⏱️</div>
                <div class="card-content">
                  <h3>Duration</h3>
                  <p>8 Semesters</p>
                </div>
              </div>
              <div class="overview-card">
                <div class="card-icon">🎓</div>
                <div class="card-content">
                  <h3>Degree</h3>
                  <p>B.Tech CSE (AIML)</p>
                </div>
              </div>
            </div>

            <div class="dept-info">
              <p>
                The Department of Computer Science Engineering offers a B.Tech program with specialization in Artificial Intelligence and Machine Learning. This modern curriculum is designed to prepare graduates for industry and research roles in computational intelligence, with a focus on practical application of AI/ML technologies to real-world challenges.
              </p>
            </div>
          </div>

          <!-- Mission & Vision Tab -->
          <div v-show="activeTab === 'mission'" class="content-panel">
            <h2 class="panel-title">Mission & Vision</h2>
            
            <div class="vision-section">
              <h3 class="section-heading">Department Vision</h3>
              <div class="vision-box">
                <p>To develop skilled Computer Science Engineering professionals for sustainable and resilient infrastructure, societal development and nation building through excellence in Artificial Intelligence and Machine Learning education.</p>
              </div>
            </div>

            <div class="mission-section">
              <h3 class="section-heading">Mission Statements</h3>
              <div class="mission-list">
                <div class="mission-card">
                  <span class="mission-number">M1</span>
                  <p>To impart quality Computer Science Engineering education for developing competent professionals capable of addressing infrastructure and environmental challenges.</p>
                </div>
                <div class="mission-card">
                  <span class="mission-number">M2</span>
                  <p>To instill leadership qualities, ethical values, and social responsibility for sustainable professional practice.</p>
                </div>
                <div class="mission-card">
                  <span class="mission-number">M3</span>
                  <p>To strengthen industry interaction and experiential learning for enhancing technical competency, employability, and global relevance.</p>
                </div>
                <div class="mission-card">
                  <span class="mission-number">M4</span>
                  <p>To promote research, innovation, and multidisciplinary collaboration in core areas of Computer Science Engineering for sustainable and resilient infrastructure development.</p>
                </div>
                <div class="mission-card">
                  <span class="mission-number">M5</span>
                  <p>To foster a robust academic and research ecosystem in Computational Intelligence by promoting innovative and interdisciplinary learning.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- PEOs Tab -->
          <div v-show="activeTab === 'peo'" class="content-panel">
            <h2 class="panel-title">Program Educational Objectives (PEOs)</h2>
            <p class="panel-description">Graduates will achieve the following academic milestones:</p>
            
            <div class="objectives-grid">
              <div class="objective-card" v-for="(peo, index) in peos" :key="index">
                <div class="objective-number">{{ peo.code }}</div>
                <div class="objective-content">
                  <p>{{ peo.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- PSOs Tab -->
          <div v-show="activeTab === 'pso'" class="content-panel">
            <h2 class="panel-title">Program Specific Outcomes (PSOs)</h2>
            <p class="panel-description">Graduates will develop localized professional competency to:</p>
            
            <div class="outcomes-list">
              <div class="outcome-item" v-for="(pso, index) in psos" :key="index">
                <div class="outcome-badge">{{ pso.code }}</div>
                <div class="outcome-text">
                  <p>{{ pso.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Curriculum Tab -->
          <div v-show="activeTab === 'curriculum'" class="content-panel">
            <h2 class="panel-title">Curriculum Highlights</h2>
            
            <div class="curriculum-overview">
              <div class="curriculum-section">
                <h3>Core Specializations</h3>
                <div class="course-tags">
                  <span class="tag">Machine Learning</span>
                  <span class="tag">Deep Learning</span>
                  <span class="tag">Natural Language Processing</span>
                  <span class="tag">Computer Vision</span>
                  <span class="tag">Reinforcement Learning</span>
                  <span class="tag">Generative AI</span>
                </div>
              </div>

              <div class="curriculum-section">
                <h3>Professional Electives</h3>
                <div class="course-tags">
                  <span class="tag">Large Language Models</span>
                  <span class="tag">Edge AI</span>
                  <span class="tag">AI Ops</span>
                  <span class="tag">Explainable AI</span>
                  <span class="tag">High-Performance Computing</span>
                  <span class="tag">Digital Twins</span>
                </div>
              </div>

              <div class="curriculum-stats">
                <div class="stat">
                  <span class="stat-label">Core Courses</span>
                  <span class="stat-value">13+</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Electives</span>
                  <span class="stat-value">20+</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Skill Courses</span>
                  <span class="stat-value">10+</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Internship Hours</span>
                  <span class="stat-value">16+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('about')

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'mission', label: 'Mission & Vision' },
  { id: 'peo', label: 'PEOs' },
  { id: 'pso', label: 'PSOs' },
  { id: 'curriculum', label: 'Curriculum' }
]

const peos = [
  {
    code: 'PEO-1',
    description: 'Demonstrate professional competence by applying strong foundations in Mathematics, computing principles, algorithms, and modern technologies to analyze and solve complex engineering problems.'
  },
  {
    code: 'PEO-2',
    description: 'Progress in professional careers by adapting to emerging technologies and evolving practices in industry, research, higher education, and entrepreneurship.'
  },
  {
    code: 'PEO-3',
    description: 'Work effectively as individuals and team members or leaders, demonstrating professional ethics, effective communication skills, leadership qualities and respect for diversity.'
  },
  {
    code: 'PEO-4',
    description: 'Engage in lifelong learning to remain current with technological advancements and contribute responsibly to society through sustainable and human-centric computing solutions.'
  },
  {
    code: 'PEO-5',
    description: 'Design and deliver innovative, cutting-edge solutions that address evolving industrial and research challenges in Artificial Intelligence and Machine Learning.'
  }
]

const psos = [
  {
    code: 'PSO-1',
    description: 'Design and deploy AIML solutions using modern tools and frameworks for real-world applications in computational intelligence.'
  },
  {
    code: 'PSO-2',
    description: 'Perform advanced data analysis and build predictive and generative models using AIML techniques for complex problem-solving.'
  },
  {
    code: 'PSO-3',
    description: 'Develop ethical and responsible intelligent systems ensuring fairness, transparency, and positive societal impact.'
  }
]
</script>

<style scoped>
main {
  flex: 1;
}

.dept-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, var(--background) 0%, var(--surface-alt) 100%);
}

.dept-header {
  text-align: center;
  margin-bottom: 56px;
}

.college-name {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 12px;
}

.section-title {
  color: var(--primary);
  margin: 0 0 8px 0;
  font-size: 42px;
  font-weight: 800;
}

.program-subtitle {
  color: var(--text-secondary);
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.5px;
}

.divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  margin: 24px auto;
  border-radius: 2px;
}

.tabs-container {
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
  overflow-x: auto;
  padding: 4px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.tabs-container::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  padding: 12px 20px;
  background-color: var(--surface);
  border: 2px solid transparent;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.tab-btn:hover {
  background-color: var(--surface);
  color: var(--primary);
  border-color: var(--accent);
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  border-color: var(--primary);
  box-shadow: 0 8px 24px rgba(26, 95, 71, 0.2);
}

.tab-content {
  background-color: var(--surface);
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
}

.content-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--primary);
  margin: 0 0 12px 0;
  position: relative;
  padding-bottom: 16px;
}

.panel-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), transparent);
  border-radius: 2px;
}

.panel-description {
  color: var(--text-secondary);
  font-size: 15px;
  margin: 0 0 28px 0;
  line-height: 1.6;
}

/* About Department Styles */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.overview-card {
  background: linear-gradient(135deg, rgba(26, 95, 71, 0.05), rgba(0, 212, 170, 0.05));
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.3s ease;
}

.overview-card:hover {
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(0, 212, 170, 0.1);
}

.card-icon {
  font-size: 28px;
  min-width: 28px;
}

.card-content h3 {
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 4px 0;
}

.card-content p {
  color: var(--text-secondary);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.dept-info {
  background-color: var(--surface-alt);
  border-left: 4px solid var(--accent);
  border-radius: 8px;
  padding: 28px;
  line-height: 1.8;
  color: var(--text-secondary);
}

/* Mission & Vision Styles */
.vision-section,
.mission-section {
  margin-bottom: 40px;
}

.section-heading {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 20px 0;
}

.vision-box {
  background: linear-gradient(135deg, rgba(26, 95, 71, 0.08), rgba(0, 212, 170, 0.08));
  border: 1px solid var(--accent);
  border-radius: 12px;
  padding: 28px;
  line-height: 1.8;
  color: var(--text-secondary);
  font-size: 15px;
}

.mission-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.mission-card {
  background-color: var(--surface-alt);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.mission-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.mission-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.mission-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 13px;
}

/* PEOs & PSOs Styles */
.objectives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.objective-card {
  background: linear-gradient(135deg, var(--surface-alt), rgba(0, 212, 170, 0.05));
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.objective-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}

.objective-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(26, 95, 71, 0.15);
}

.objective-number {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 12px;
}

.objective-content p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: 14px;
}

.outcomes-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.outcome-item {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 20px;
  padding: 24px;
  background-color: var(--surface-alt);
  border-radius: 12px;
  align-items: flex-start;
  border-left: 4px solid var(--accent);
  transition: all 0.3s ease;
}

.outcome-item:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.outcome-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  border-radius: 10px;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  flex-shrink: 0;
}

.outcome-text p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: 14px;
}

/* Curriculum Styles */
.curriculum-overview {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.curriculum-section h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 16px 0;
}

.course-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.tag {
  background-color: var(--surface-alt);
  color: var(--primary);
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  cursor: default;
}

.tag:hover {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  border-color: var(--accent);
}

.curriculum-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  padding: 32px;
  background: linear-gradient(135deg, rgba(26, 95, 71, 0.08), rgba(0, 212, 170, 0.08));
  border-radius: 12px;
  border: 1px solid var(--border);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  color: var(--primary);
}

@media (max-width: 1024px) {
  .tab-content {
    padding: 36px;
  }

  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .objectives-grid {
    grid-template-columns: 1fr;
  }

  .mission-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dept-section {
    padding: 48px 16px;
  }

  .section-title {
    font-size: 28px;
  }

  .tab-content {
    padding: 24px;
  }

  .tabs-container {
    gap: 6px;
  }

  .tab-btn {
    padding: 10px 14px;
    font-size: 12px;
  }

  .panel-title {
    font-size: 22px;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .overview-card {
    flex-direction: row;
  }

  .course-tags {
    gap: 8px;
  }

  .tag {
    padding: 8px 12px;
    font-size: 12px;
  }

  .curriculum-stats {
    grid-template-columns: repeat(2, 1fr);
    padding: 20px;
  }

  .mission-list {
    grid-template-columns: 1fr;
  }

  .outcome-item {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .outcome-badge {
    width: 100%;
    height: auto;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .dept-section {
    padding: 32px 12px;
  }

  .section-title {
    font-size: 22px;
  }

  .tab-content {
    padding: 16px;
  }

  .panel-title {
    font-size: 18px;
  }

  .curriculum-stats {
    grid-template-columns: 1fr;
  }

  .card-content h3 {
    font-size: 11px;
  }

  .card-content p {
    font-size: 14px;
  }
}
</style>
