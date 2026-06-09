<template>
  <main>
    <section class="institution-section">
      <div class="container">
        <h1 class="section-title text-center">About the Institution</h1>
        <div class="divider"></div>

        <div class="institution-header">
          <div class="badges">
            <span class="badge badge-green">ANNA UNIVERSITY AFFILIATED</span>
            <span class="badge badge-yellow">AICTE APPROVED</span>
            <span class="badge badge-dark">AUTONOMOUS INSTITUTION</span>
          </div>
          <h2 class="institution-name">SRM IST Engineering College</h2>
          <p class="institution-location">Tiruchirappalli, Tamil Nadu</p>
        </div>

        <div class="institution-content">
          <div class="content-left">
            <p class="intro-text">
              SRM IST is a premier technical institution committed to providing high-quality engineering education and fostering innovation. With state-of-the-art facilities and a dedicated faculty, we prepare students to become industry-ready professionals and leaders.
            </p>

            <div class="highlights-grid">
              <div class="highlight-card">
                <span class="highlight-title">Centre of Research</span>
                <ul class="highlight-list">
                  <li>Centre for Civil Design</li>
                  <li>Centre for Sustainable Technologies</li>
                  <li>Digital Construction Studio</li>
                  <li>Centre for System Design</li>
                  <li>Centre for Artificial Intelligence</li>
                </ul>
              </div>

              <div class="highlight-card">
                <span class="highlight-title">Accreditations</span>
                <div class="accreditations">
                  <div class="accred-item">NBA</div>
                  <div class="accred-item">NAAC</div>
                </div>
              </div>

              <div class="highlight-card">
                <span class="highlight-title">Awards & Recognition</span>
                <div class="awards">
                  <div class="award-item">Excellence Award</div>
                  <div class="award-item">Innovation Medal</div>
                  <div class="award-item">Student Choice Award</div>
                </div>
              </div>

              <div class="highlight-card">
                <span class="highlight-title">International Collaborations</span>
                <div class="collaborations">
                  <div class="collab-item">Global Partners</div>
                  <div class="collab-item">Research Exchange</div>
                  <div class="collab-item">Joint Programs</div>
                </div>
              </div>
            </div>
          </div>

          <div class="content-right">
            <div class="institution-image-container">
              <div class="institution-image">
                <span>Campus Image</span>
              </div>
              <p class="image-caption">Green Campus - SRM IST Tiruchirappalli</p>
            </div>
          </div>
        </div>

        <div class="mission-section">
          <h2 class="subsection-title">Our Commitment</h2>
          <p class="mission-text">
            At SRM IST, we are dedicated to fostering an environment where innovation thrives, research flourishes, and students develop the skills needed to excel in the rapidly evolving technology landscape. Our comprehensive curriculum integrates theoretical knowledge with practical experience, ensuring our graduates are well-prepared for successful careers and positive contributions to society.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
main {
  flex: 1;
}

.institution-section {
  padding: 64px 20px;
  background-color: var(--background);
}

.section-title {
  color: var(--primary);
  margin-bottom: 8px;
}

.divider {
  margin: 24px auto;
}

.institution-header {
  text-align: center;
  margin-bottom: 48px;
}

.badges {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
  text-transform: uppercase;
}

.badge-green {
  background-color: #d4edda;
  color: #155724;
}

.badge-yellow {
  background-color: #fff3cd;
  color: #856404;
}

.badge-dark {
  background-color: #2d3748;
  color: white;
}

.institution-name {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 8px 0;
}

.institution-location {
  font-size: 14px;
  color: var(--text-secondary);
  font-style: italic;
  margin: 0;
}

.institution-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 48px;
}

.intro-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.highlight-card {
  background-color: var(--surface);
  padding: 20px;
  border-radius: 12px;
  border-top: 4px solid var(--primary);
  box-shadow: var(--shadow-sm);
}

.highlight-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 12px;
}

.highlight-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.8;
}

.highlight-list li {
  margin-bottom: 4px;
}

.highlight-list li::before {
  content: '•';
  color: var(--accent);
  font-weight: bold;
  margin-right: 8px;
}

.accreditations,
.awards,
.collaborations {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.accred-item,
.award-item,
.collab-item {
  font-size: 13px;
  color: var(--text-secondary);
  padding: 6px 0;
}

.accred-item::before,
.award-item::before,
.collab-item::before {
  content: '✓';
  color: var(--accent);
  font-weight: bold;
  margin-right: 8px;
}

.content-right {
  display: flex;
  justify-content: center;
}

.institution-image-container {
  width: 100%;
}

.institution-image {
  width: 100%;
  aspect-ratio: 0.85;
  background-color: var(--surface);
  border-radius: 16px;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-weight: 600;
  overflow: hidden;
  margin-bottom: 12px;
}

.image-caption {
  text-align: center;
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  padding: 8px;
  background-color: var(--surface-alt);
  border-radius: 8px;
  font-weight: 600;
}

.mission-section {
  background-color: var(--surface);
  padding: 40px;
  border-radius: 12px;
  border-left: 4px solid var(--accent);
  text-align: center;
}

.subsection-title {
  font-size: 24px;
  color: var(--primary);
  margin-bottom: 16px;
  margin-top: 0;
}

.mission-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 1024px) {
  .institution-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .highlights-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .institution-section {
    padding: 48px 16px;
  }

  .institution-name {
    font-size: 24px;
  }

  .badges {
    gap: 8px;
  }

  .badge {
    font-size: 10px;
  }

  .institution-content {
    gap: 24px;
  }

  .highlights-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .highlight-card {
    padding: 16px;
  }

  .mission-section {
    padding: 24px;
  }

  .subsection-title {
    font-size: 20px;
  }

  .intro-text {
    font-size: 14px;
  }
}
</style>
