<template>
  <main>
    <section class="agenda-section">
      <div class="container">
        <h1 class="section-title text-center">Meeting Agenda</h1>
        <p class="section-subtitle text-center">Computer Science Engineering - First Board of Studies</p>
        <div class="divider"></div>

        <div class="agenda-items">
          <div class="agenda-item" v-for="(item, index) in agendaPoints" :key="index">
            <div class="agenda-number">{{ item.number }}</div>
            <div class="agenda-content">
              <h3 class="agenda-title">{{ item.title }}</h3>
              <p class="agenda-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface AgendaItem {
  number: string
  title: string
  description: string
}

const agendaPoints = reactive<AgendaItem[]>([
  {
    number: 'I',
    title: 'Welcome Address & Introductions',
    description: 'Welcome Address by the Chairman, Board of Studies, and Introduction of the Board of Studies Members. Overview of the agenda and objectives for the meeting.'
  },
  {
    number: 'II',
    title: 'Vision, Mission & PEO Alignment',
    description: 'Presentation and Approval of the Revised Department Vision, Mission and Programme Educational Objectives (PEOs) effective from the Academic Year 2024-2025.'
  },
  {
    number: 'III',
    title: 'Regulations & Curriculum Structure',
    description: 'Appraisal and Approval of B.E./B.Tech. Regulations 2024 – Version 1.0 and the Proposed Four-Year Curriculum Structure aligned with contemporary industry requirements.'
  },
  {
    number: 'IV',
    title: 'Course Design & Assessment',
    description: 'Review of course design methodologies and assessment strategies to ensure alignment with industry standards and emerging technologies in Computer Science.'
  },
  {
    number: 'V',
    title: 'Industry Collaboration & Partnerships',
    description: 'Discussion on strengthening industry partnerships, internship programs, and research collaborations to enhance student learning outcomes and employability.'
  }
])
</script>

<style scoped>
main {
  flex: 1;
}

.agenda-section {
  padding: 64px 20px;
  background: linear-gradient(135deg, var(--surface-alt) 0%, var(--background) 100%);
}

.section-title {
  color: var(--primary);
  margin-bottom: 8px;
}

.divider {
  margin: 24px auto;
}

.agenda-items {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 48px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.agenda-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  align-items: flex-start;
}

.agenda-number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--surface);
  border: 2px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
}

.agenda-content {
  background-color: var(--surface);
  padding: 24px;
  border-radius: 12px;
  border-left: 4px solid var(--accent);
  box-shadow: var(--shadow-sm);
}

.agenda-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  margin-top: 0;
}

.agenda-description {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .agenda-section {
    padding: 48px 16px;
  }

  .agenda-item {
    gap: 16px;
  }

  .agenda-number {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  .agenda-content {
    padding: 16px;
  }

  .agenda-title {
    font-size: 18px;
  }

  .agenda-description {
    font-size: 14px;
  }
}
</style>
