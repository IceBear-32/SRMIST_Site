<template>
  <main>
    <!-- Department Advisory Committee Section -->
    <section class="advisory-section">
      <div class="container">
        <h2 class="section-title text-center">Department Advisory Committee</h2>
        <p class="section-subtitle text-center">
          Esteemed professionals guiding our department's vision, strategy, and academic excellence.
        </p>
        <div class="divider"></div>

        <div class="members-grid">
          <div class="member-card" v-for="(member, index) in advisoryMembers" :key="index">
            <div class="member-image">
              <div class="placeholder-image">Photo</div>
            </div>
            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <span class="member-role" :style="{ backgroundColor: member.roleColor }">
                {{ member.role }}
              </span>
              <p class="member-details">{{ member.organization }}</p>
              <p class="member-details small">{{ member.expertise }}</p>
              <p class="member-details small">{{ member.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface AdvisoryMember {
  name: string
  role: string
  roleColor: string
  organization: string
  expertise: string
  location: string
}

const advisoryMembers = ref<AdvisoryMember[]>([
  {
    name: 'Mr. Mohit Ved',
    role: 'Associate Director',
    roleColor: '#d4edda',
    organization: 'CDAC Bangalore',
    expertise: 'Big Data Analytics, HPC, Grid Computing',
    location: 'Bengaluru, India'
  },
  {
    name: 'Dr. Saranya T. Jaikumar',
    role: 'Consultant Educational Psychologist',
    roleColor: '#d4edda',
    organization: 'Government of India',
    expertise: 'Educational Psychology, Higher Education, Training Development',
    location: 'Chennai, Tamil Nadu'
  },
  {
    name: 'Mr. Chendur Raja D',
    role: 'General Manager - AI Projects',
    roleColor: '#cfe2ff',
    organization: 'Ramco Systems',
    expertise: 'AI/ML, Smart Manufacturing, Process Control Systems',
    location: 'Chennai, Tamil Nadu'
  },
  {
    name: 'Mr. Jigar Halani',
    role: 'Senior Director - Solutions Architecture',
    roleColor: '#cfe2ff',
    organization: 'NVIDIA',
    expertise: 'AI Infrastructure, HPC, GenAI, GPU Computing',
    location: 'Bengaluru, Karnataka'
  },
  {
    name: 'Prof. Chandra Sekhar C',
    role: 'Professor',
    roleColor: '#d4edda',
    organization: 'IIT Madras',
    expertise: 'Machine Learning, Deep Learning, Pattern Recognition, Neural Networks',
    location: 'Chennai, Tamil Nadu'
  }
])
</script>

<style scoped>
main {
  flex: 1;
}

.advisory-section {
  padding: 80px 20px;
  background-color: var(--background);
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.member-card {
  background-color: var(--surface);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.member-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.member-image {
  width: 100%;
  height: 200px;
  background-color: var(--surface-alt);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background-color: var(--surface-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--text-secondary);
  border: none;
}

.member-info {
  padding: 24px;
}

.member-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.member-role {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.member-details {
  font-size: 14px;
  color: var(--text-primary);
  margin: 8px 0;
}

.member-details.small {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 6px 0;
}

@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 40px 20px;
  }

  .hero-title {
    font-size: 36px;
  }

  .detail-card {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .detail-divider {
    display: none;
  }
}

@media (max-width: 768px) {
  .advisory-section {
    padding: 48px 16px;
  }

  .members-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .member-card {
    display: flex;
    gap: 16px;
  }

  .member-image {
    width: 120px;
    height: 120px;
    flex-shrink: 0;
    border-radius: 8px;
  }

  .member-info {
    padding: 12px 0;
  }

  .member-name {
    font-size: 16px;
    margin-bottom: 8px;
  }
}
</style>
