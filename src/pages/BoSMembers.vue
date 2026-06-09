<template>
  <main>
    <section class="members-section">
      <div class="container">
        <h1 class="section-title text-center">Department Advisory Committee</h1>
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

.members-section {
  padding: 64px 20px;
  background-color: var(--surface-alt);
}

.section-title {
  color: var(--primary);
  margin-bottom: 8px;
}

.divider {
  margin: 24px auto;
}



.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 48px;
}

.member-card {
  background-color: var(--surface);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  border-top: 4px solid var(--primary);
}

.member-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.member-image {
  width: 100%;
  aspect-ratio: 1;
  background-color: var(--surface-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background-color: #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-weight: 600;
}

.member-info {
  padding: 24px;
  text-align: center;
}

.member-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px 0;
}

.member-role {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.member-details {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 8px 0;
  line-height: 1.4;
}

.member-details.small {
  font-size: 12px;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .members-section {
    padding: 48px 16px;
  }

  .members-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }

  .member-card {
    border-top: 3px solid var(--primary);
  }

  .members-tabs {
    flex-direction: column;
    gap: 12px;
  }

  .tab-btn {
    width: 100%;
  }
}
</style>
