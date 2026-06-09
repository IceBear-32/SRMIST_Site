<template>
  <main>
    <section class="curriculum-section">
      <div class="container">
        <!-- Header -->
        <div class="curriculum-header">
          <h1 class="page-title">Proposed Curriculum</h1>
          <p class="page-subtitle">B.Tech Computer Science Engineering (AIML) - Regulation 2026</p>
        </div>

        <!-- Tab Navigation -->
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

        <!-- Course Pathway View -->
        <div v-show="activeTab === 'pathway'" class="tab-content pathway-view">
          <div class="pathway-header">
            <div class="pathway-info">
              <h2>Course Dependency Pathway</h2>
              <p class="info-text">Click any course to lock and view dependencies. Hover to preview.</p>
            </div>
            <div class="pathway-legend">
              <div class="legend-item">
                <span class="legend-dot pre">■</span>
                <span>Prerequisites</span>
              </div>
              <div class="legend-item">
                <span class="legend-dot dep">■</span>
                <span>Dependents</span>
              </div>
              <div class="legend-item">
                <span class="legend-dot locked">■</span>
                <span>Selected</span>
              </div>
            </div>
          </div>

          <div class="pathway-container">
            <svg class="pathway-svg" ref="pathwaySvg"></svg>
            
            <div class="semesters-container" ref="semestersContainer">
              <div v-for="(semester, index) in coursesBySemester" :key="index" class="semester-column">
                <div class="semester-header">
                  <h3>Semester {{ index + 1 }}</h3>
                  <span class="credits-badge">{{ getTotalCredits(semester) }} Credits</span>
                </div>
                <div class="courses-list">
                  <div 
                    v-for="course in semester"
                    :key="course.code"
                    :class="['course-card', {
                      'has-prereq': hasPrerequisites(course.code),
                      'has-dependent': hasDependents(course.code),
                      'locked': lockedCourse?.code === course.code,
                      'faded': lockedCourse && lockedCourse.code !== course.code && !isInPath(course.code),
                      'highlighted': lockedCourse && (isPrerequisite(course.code) || isDependent(course.code) || lockedCourse.code === course.code)
                    }]"
                    @click="selectCourse(course)"
                    @mouseenter="hoverCourse(course)"
                    @mouseleave="clearHover"
                  >
                    <div class="course-header">
                      <h4 class="course-code">{{ course.code }}</h4>
                      <span class="course-type" :data-type="getCourseType(course.code)">{{ getCourseType(course.code) }}</span>
                    </div>
                    <p class="course-title">{{ course.title }}</p>
                    <div class="course-footer">
                      <span class="credits">{{ course.credits }}C</span>
                      <span class="hours">{{ course.hours }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dependencies Panel -->
          <div v-if="lockedCourse" class="dependencies-panel">
            <div class="panel-header">
              <h3>{{ lockedCourse.code }} - {{ lockedCourse.title }}</h3>
              <button @click="clearSelection" class="close-btn">✕</button>
            </div>
            <div class="panel-content">
              <div class="dependencies-section">
                <h4>Prerequisites</h4>
                <div v-if="getPrerequisites(lockedCourse.code).length > 0" class="dependencies-list">
                  <div v-for="dep in getPrerequisites(lockedCourse.code)" :key="dep" class="dependency-item">
                    <span class="dep-badge pre">PRE</span>
                    <span>{{ dep }}</span>
                  </div>
                </div>
                <p v-else class="no-deps">No prerequisites</p>
              </div>
              <div class="dependencies-section">
                <h4>Dependents</h4>
                <div v-if="getDependents(lockedCourse.code).length > 0" class="dependencies-list">
                  <div v-for="dep in getDependents(lockedCourse.code)" :key="dep" class="dependency-item">
                    <span class="dep-badge dep">DEP</span>
                    <span>{{ dep }}</span>
                  </div>
                </div>
                <p v-else class="no-deps">No dependent courses</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Career Mapping View -->
        <div v-show="activeTab === 'career'" class="tab-content career-view">
          <div class="career-header">
            <h2>Career Mapping Matrix</h2>
            <div class="filters">
              <select v-model="courseTypeFilter" class="filter-select">
                <option value="">All Course Types</option>
                <option value="T">Theory (T)</option>
                <option value="L">Laboratory (L)</option>
                <option value="J">Lab + Theory (J)</option>
              </select>
            </div>
          </div>

          <div class="career-matrix">
            <div v-for="(semester, index) in coursesBySemester" :key="index" class="career-column">
              <div class="column-header">
                <h3>Semester {{ index + 1 }}</h3>
              </div>
              <div class="career-courses">
                <div 
                  v-for="course in filterCourses(semester)"
                  :key="course.code"
                  class="career-course"
                  :data-type="getCourseType(course.code)"
                >
                  <div class="career-course-code">{{ course.code }}</div>
                  <div class="career-course-title">{{ course.title }}</div>
                  <div class="career-course-type">{{ getCourseType(course.code) }}</div>
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
import { ref, computed, onMounted, nextTick } from 'vue'

interface Course {
  code: string
  title: string
  credits: number
  hours: string
  semester: number
  prerequisites?: string[]
  dependents?: string[]
}

const activeTab = ref<'pathway' | 'career'>('pathway')
const lockedCourse = ref<Course | null>(null)
const hoveredCourse = ref<Course | null>(null)
const pathwaySvg = ref<SVGElement | null>(null)
const semestersContainer = ref<HTMLElement | null>(null)
const courseTypeFilter = ref('')

const tabs = [
  { id: 'pathway', label: 'Course Pathway' },
  { id: 'career', label: 'Career Mapping' }
]

const allCourses: Course[] = [
  // Semester 1
  { code: '26L10MT101', title: 'Mathematics I', credits: 3, hours: '3-1-0', semester: 1 },
  { code: '26L10PH102', title: 'Physics for Computer Science Engineers', credits: 3, hours: '3-2-0', semester: 1 },
  { code: '26L10EN101', title: 'Technical English', credits: 3, hours: '3-0-2', semester: 1 },
  { code: '26L10CS102', title: 'Problem Solving Using C', credits: 4, hours: '3-0-2', semester: 1 },
  { code: '26L10EN101', title: 'Introduction to Engineering I', credits: 1, hours: '0-0-2', semester: 1 },
  { code: '26L10DM101', title: 'Induction Program', credits: 0, hours: '0-0-0', semester: 1 },
  { code: '26L10CS101', title: 'Career Skill Development I', credits: 1, hours: '0-0-2', semester: 1 },
  // Language Courses Semester 1 - All variants
  { code: '26L10A1041', title: 'Chinese', credits: 2, hours: '2-0-1', semester: 1 },
  { code: '26L10A1042', title: 'German', credits: 2, hours: '2-0-1', semester: 1 },
  { code: '26L10A1043', title: 'Spanish', credits: 2, hours: '2-0-1', semester: 1 },
  { code: '26L10A1044', title: 'French', credits: 2, hours: '2-0-1', semester: 1 },
  { code: '26L10A1045', title: 'Korean', credits: 2, hours: '2-0-1', semester: 1 },
  { code: '26L10A1046', title: 'Japanese', credits: 2, hours: '2-0-1', semester: 1 },

  // Semester 2
  { code: '26L10MT201', title: 'Professional English for Engineers', credits: 2, hours: '2-0-2', semester: 2 },
  { code: '26L10PH211', title: 'Physics for Computational Intelligence', credits: 3, hours: '3-0-2', semester: 2 },
  { code: '26L10AM201', title: 'Discrete Mathematics', credits: 3, hours: '3-1-0', semester: 2 },
  { code: '26L10PH203', title: 'Chemistry for Civil Engineering', credits: 3, hours: '2-1-2', semester: 2 },
  { code: '26L10CS202', title: 'Engineering Graphics', credits: 3, hours: '2-0-2', semester: 2 },
  { code: '26L10CS203', title: 'Programming in C and Data Structures', credits: 4, hours: '3-1-0', semester: 2 },
  { code: '26L10EN201', title: 'Environmental Studies', credits: 2, hours: '2-0-0', semester: 2 },
  { code: '26L10EN1011', title: 'Introduction to Engineering II', credits: 1, hours: '0-0-2', semester: 2 },
  { code: '26L10CS201', title: 'Career Skill Development II', credits: 1, hours: '0-0-2', semester: 2 },

  // Semester 3
  { code: '26L10AM3047', title: 'Probability, Statistics and Numerical Methods', credits: 4, hours: '3-1-0', semester: 3 },
  { code: '26L10CS3002', title: 'Data Structures', credits: 4, hours: '3-1-0', semester: 3 },
  { code: '26L10CS3003', title: 'Structural Analysis I', credits: 3, hours: '3-0-0', semester: 3 },
  { code: '26L10CS3002', title: 'Transportation Engineering', credits: 4, hours: '3-1-0', semester: 3 },
  { code: '26L10CS3002', title: 'Geotechnical Engineering', credits: 4, hours: '3-1-0', semester: 3 },
  { code: '26L10CS3003', title: 'Fluid Mechanics & Hydraulics', credits: 3, hours: '3-1-0', semester: 3 },
  { code: '26L10CS3001', title: 'Concrete Technology', credits: 3, hours: '3-0-0', semester: 3 },
  { code: '26L10CS3001', title: 'Career Skill Development III', credits: 1, hours: '0-0-2', semester: 3 },

  // Semester 4
  { code: '26L10CS4701', title: 'Irrigation Eng & Hydrology', credits: 3, hours: '3-0-0', semester: 4 },
  { code: '26L10CS4702', title: 'Structural Analysis II', credits: 4, hours: '3-1-0', semester: 4 },
  { code: '26L10CS4701', title: 'Building Planning & CAD', credits: 3, hours: '3-0-0', semester: 4 },
  { code: '26L10CS4701', title: 'AI & ML for Civil Engineers', credits: 3, hours: '3-0-2', semester: 4 },
  { code: '26L10EN4001', title: 'Environmental Science', credits: 3, hours: '3-0-0', semester: 4 },
  { code: '26L10EN4001', title: 'Professional Ethics and Values', credits: 2, hours: '0-2-0', semester: 4 },
  { code: '26L10EN1011', title: 'Behavioural Psychology', credits: 1, hours: '0-1-0', semester: 4 },

  // Semester 5
  { code: '26L10CS5001', title: 'Computer Networks', credits: 3, hours: '3-0-2', semester: 5 },
  { code: '26L10CS5012', title: 'Database Management Systems', credits: 3, hours: '3-0-2', semester: 5 },
  { code: '26L10CS5003', title: 'Theory of Computation', credits: 3, hours: '3-0-0', semester: 5 },
  { code: '26L10CS5002', title: 'Design Learning', credits: 1, hours: '0-1-0', semester: 5 },
  { code: '26L10CS5002', title: 'Multidisciplinary Skill Course - 2', credits: 3, hours: '2-1-0', semester: 5 },
  { code: '26L10EN1011', title: 'Skill Enhancement Course - 3', credits: 3, hours: '2-1-0', semester: 5 },
  { code: '26L10EN1011', title: 'Environmental Science with AI', credits: 2, hours: '2-0-0', semester: 5 },
  { code: '26L10EN1011', title: 'Community Connect', credits: 0, hours: '0-0-2', semester: 5 },

  // Semester 6
  { code: '26L10CS6171', title: 'Natural Language Processing', credits: 3, hours: '3-0-0', semester: 6 },
  { code: '26L10CS6201', title: 'Computer Design', credits: 4, hours: '3-0-2', semester: 6 },
  { code: '26L10EN6011', title: 'Discipline Elective Course -2', credits: 4, hours: '4-0-0', semester: 6 },
  { code: '26L10EN6011', title: 'Discipline Elective Course -3', credits: 4, hours: '4-0-0', semester: 6 },
  { code: '26L10EN6011', title: 'Skill Enhancement Course - 4', credits: 3, hours: '2-1-0', semester: 6 },
  { code: '26L10EN1011', title: 'Disaster Mitigation and Management', credits: 2, hours: '2-0-0', semester: 6 },

  // Semester 7
  { code: '26L10CS7011', title: 'Intelligent Transportation Systems', credits: 3, hours: '3-0-2', semester: 7 },
  { code: '26L10CS7012', title: 'Estimation & Quantity Surveying', credits: 3, hours: '3-0-2', semester: 7 },
  { code: '26L10CS7011', title: 'Open Elective V', credits: 3, hours: '3-0-0', semester: 7 },
  { code: '26L10CS7101', title: 'Project Work (Phase I)', credits: 3, hours: '0-0-6', semester: 7 },

  // Semester 8
  { code: '26L10DM2', title: 'Major Project', credits: 12, hours: '0-0-24', semester: 8 },
  { code: '26L10DM3', title: 'Professional Internship', credits: 3, hours: '0-0-6', semester: 8 }
]

const coursesBySemester = computed(() => {
  const semesters: Course[][] = Array.from({ length: 8 }, () => [])
  allCourses.forEach(course => {
    semesters[course.semester - 1].push(course)
  })
  return semesters
})

function selectCourse(course: Course) {
  lockedCourse.value = lockedCourse.value?.code === course.code ? null : course
  if (lockedCourse.value) {
    nextTick(() => redrawConnections())
  }
}

function hoverCourse(course: Course) {
  if (!lockedCourse.value) {
    hoveredCourse.value = course
    nextTick(() => redrawConnections())
  }
}

function clearHover() {
  hoveredCourse.value = null
  redrawConnections()
}

function clearSelection() {
  lockedCourse.value = null
  redrawConnections()
}

function getPrerequisites(code: string): string[] {
  const course = allCourses.find(c => c.code === code)
  return course?.prerequisites || []
}

function getDependents(code: string): string[] {
  const course = allCourses.find(c => c.code === code)
  return course?.dependents || []
}

function hasPrerequisites(code: string): boolean {
  return getPrerequisites(code).length > 0
}

function hasDependents(code: string): boolean {
  return getDependents(code).length > 0
}

function isPrerequisite(code: string): boolean {
  const current = lockedCourse.value || hoveredCourse.value
  if (!current) return false
  return getPrerequisites(current.code).includes(code)
}

function isDependent(code: string): boolean {
  const current = lockedCourse.value || hoveredCourse.value
  if (!current) return false
  return getDependents(current.code).includes(code)
}

function isInPath(code: string): boolean {
  const current = lockedCourse.value || hoveredCourse.value
  if (!current) return false
  return isPrerequisite(code) || isDependent(code) || current.code === code
}

function getTotalCredits(semester: Course[]): number {
  return semester.reduce((total, course) => total + course.credits, 0)
}

function getCourseType(code: string): string {
  if (code.endsWith('L')) return 'L'
  if (code.endsWith('T')) return 'T'
  if (code.endsWith('J')) return 'J'
  return 'T'
}

function filterCourses(semester: Course[]): Course[] {
  if (!courseTypeFilter.value) return semester
  return semester.filter(course => getCourseType(course.code) === courseTypeFilter.value)
}

function redrawConnections() {
  if (!pathwaySvg.value || !semestersContainer.value) return

  const svg = pathwaySvg.value
  svg.innerHTML = ''

  const current = lockedCourse.value || hoveredCourse.value
  if (!current) return

  const prerequisites = getPrerequisites(current.code)
  const dependents = getDependents(current.code)

  const courseCards = semestersContainer.value.querySelectorAll('.course-card')
  const positions = new Map<string, { x: number; y: number }>()

  courseCards.forEach((card: Element) => {
    const codeEl = card.querySelector('.course-code')
    if (codeEl?.textContent) {
      const rect = card.getBoundingClientRect()
      const svgRect = svg.getBoundingClientRect()
      positions.set(codeEl.textContent.trim(), {
        x: rect.left - svgRect.left + rect.width / 2,
        y: rect.top - svgRect.top + rect.height / 2
      })
    }
  })

  const currentPos = positions.get(current.code)
  if (!currentPos) return

  // Draw prerequisite connections (red)
  prerequisites.forEach(prereq => {
    const prereqPos = positions.get(prereq)
    if (prereqPos) {
      drawConnection(svg, prereqPos, currentPos, '#dc2626')
    }
  })

  // Draw dependent connections (green)
  dependents.forEach(dependent => {
    const depPos = positions.get(dependent)
    if (depPos) {
      drawConnection(svg, currentPos, depPos, '#16a34a')
    }
  })
}

function drawConnection(svg: SVGElement, from: { x: number; y: number }, to: { x: number; y: number }, color: string) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  
  const dx = to.x - from.x
  const dy = to.y - from.y
  const controlX = from.x + dx / 2
  const controlY = from.y + dy / 2 + (Math.abs(dx) > 100 ? 40 : 0)

  const d = `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`
  
  path.setAttribute('d', d)
  path.setAttribute('stroke', color)
  path.setAttribute('stroke-width', '2.5')
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke-linecap', 'round')
  
  svg.appendChild(path)
}

onMounted(() => {
  nextTick(() => {
    redrawConnections()
  })
})
</script>

<style scoped>
main {
  flex: 1;
}

.curriculum-section {
  padding: 40px 20px;
  background: var(--background);
  min-height: 100vh;
}

.container {
  max-width: 1800px;
  margin: 0 auto;
}

.curriculum-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--primary);
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  letter-spacing: 0.5px;
}

.tabs-container {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  border-bottom: 2px solid var(--border);
  padding-bottom: 0;
}

.tab-btn {
  padding: 12px 24px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-weight: 600;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  font-size: 14px;
}

.tab-btn:hover {
  color: var(--primary);
}

.tab-btn.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.tab-content {
  background: var(--surface);
  border-radius: 12px;
  padding: 24px;
}

/* Pathway View */
.pathway-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pathway-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.pathway-info h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 8px 0;
}

.info-text {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
}

.pathway-legend {
  display: flex;
  gap: 24px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
}

.legend-dot {
  font-size: 14px;
}

.legend-dot.pre {
  color: #dc2626;
}

.legend-dot.dep {
  color: #16a34a;
}

.legend-dot.locked {
  color: var(--primary);
}

.pathway-container {
  position: relative;
  overflow-x: auto;
  min-height: 500px;
}

.pathway-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.semesters-container {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 12px;
  position: relative;
  z-index: 20;
}

.semester-column {
  flex: 0 0 140px;
  min-width: 140px;
}

.semester-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--primary);
}

.semester-header h3 {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.credits-badge {
  font-size: 11px;
  background: var(--surface-alt);
  color: var(--text-secondary);
  padding: 2px 6px;
  border-radius: 4px;
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.course-card {
  background: var(--surface-alt);
  border: 2px solid var(--border);
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.course-card:hover:not(.faded) {
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(0, 212, 170, 0.15);
}

.course-card.faded {
  opacity: 0.1;
  pointer-events: none;
}

.course-card.highlighted {
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(26, 95, 71, 0.2);
  background: rgba(26, 95, 71, 0.05);
}

.course-card.locked {
  border: 2px solid var(--primary);
  background: rgba(26, 95, 71, 0.1);
  box-shadow: 0 6px 16px rgba(26, 95, 71, 0.25);
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4px;
  margin-bottom: 4px;
}

.course-code {
  font-size: 10px;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
  flex: 1;
}

.course-type {
  font-size: 9px;
  font-weight: 700;
  padding: 2px 4px;
  border-radius: 3px;
  white-space: nowrap;
  text-transform: uppercase;
}

.course-type[data-type="T"] {
  background: #dbeafe;
  color: #1e40af;
}

.course-type[data-type="L"] {
  background: #fecaca;
  color: #991b1b;
}

.course-type[data-type="J"] {
  background: #d1d5db;
  color: #374151;
}

.course-title {
  font-size: 11px;
  color: var(--text-primary);
  margin: 0 0 4px 0;
  line-height: 1.3;
  flex: 1;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-secondary);
}

.credits {
  font-weight: 600;
}

.hours {
  font-size: 9px;
}

/* Dependencies Panel */
.dependencies-panel {
  position: fixed;
  right: 20px;
  top: 100px;
  width: 300px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 100;
  max-height: 500px;
  overflow-y: auto;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--surface);
}

.panel-header h3 {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
  flex: 1;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--primary);
}

.panel-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dependencies-section h4 {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dependencies-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dependency-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  padding: 6px 8px;
  background: var(--surface-alt);
  border-radius: 6px;
}

.dep-badge {
  font-size: 9px;
  font-weight: 700;
  padding: 2px 4px;
  border-radius: 3px;
  white-space: nowrap;
}

.dep-badge.pre {
  background: #fee2e2;
  color: #991b1b;
}

.dep-badge.dep {
  background: #dcfce7;
  color: #166534;
}

.no-deps {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0;
  font-style: italic;
}

/* Career View */
.career-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.career-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.career-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.filters {
  display: flex;
  gap: 12px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--text-primary);
  font-size: 13px;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary);
}

.career-matrix {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 12px;
}

.career-column {
  flex: 0 0 150px;
  min-width: 150px;
}

.column-header {
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--primary);
}

.column-header h3 {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.career-courses {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.career-course {
  background: var(--surface-alt);
  border-left: 3px solid var(--text-secondary);
  border-radius: 6px;
  padding: 8px;
  font-size: 11px;
}

.career-course[data-type="T"] {
  border-left-color: #1e40af;
  background: #dbeafe;
}

.career-course[data-type="L"] {
  border-left-color: #991b1b;
  background: #fecaca;
}

.career-course[data-type="J"] {
  border-left-color: #374151;
  background: #d1d5db;
}

.career-course-code {
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 2px;
}

.career-course-title {
  color: var(--text-primary);
  line-height: 1.3;
  margin-bottom: 4px;
  font-size: 10px;
}

.career-course-type {
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .dependencies-panel {
    position: relative;
    width: 100%;
    max-height: none;
    margin-top: 20px;
  }

  .pathway-legend {
    flex-direction: column;
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .curriculum-section {
    padding: 24px 12px;
  }

  .semester-column {
    flex: 0 0 120px;
    min-width: 120px;
  }

  .course-card {
    min-height: 80px;
  }

  .page-title {
    font-size: 24px;
  }

  .pathway-header {
    flex-direction: column;
    gap: 16px;
  }

  .pathway-legend {
    width: 100%;
  }
}
</style>
