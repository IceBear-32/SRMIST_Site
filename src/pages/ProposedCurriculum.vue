<template>
  <main>
    <section class="curriculum-section">
      <div class="container">
        <div class="curriculum-header">
          <h1 class="page-title">Proposed Curriculum</h1>
          <p class="page-subtitle">B.Tech Computer Science Engineering (AIML) — Regulation 2026</p>
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

        <!-- Course Pathway View -->
        <div v-show="activeTab === 'pathway'" class="tab-content pathway-view">
          <div class="pathway-header">
            <div class="pathway-info">
              <h2>Course Dependency Pathway</h2>
              <p class="info-text">Hover a course to preview links. Click to lock the selection.</p>
            </div>
            <div class="pathway-legend">
              <div class="legend-item">
                <span class="legend-dot active-dot">■</span>
                <span>Selected / Hovered</span>
              </div>
              <div class="legend-item">
                <span class="legend-dot pre">■</span>
                <span>Prerequisite</span>
              </div>
              <div class="legend-item">
                <span class="legend-dot dep">■</span>
                <span>Dependent</span>
              </div>
            </div>
          </div>

          <div class="pathway-container" ref="pathwayContainer">
            <svg class="pathway-svg" ref="pathwaySvg"></svg>

            <div class="semesters-container" ref="semestersContainer">
              <div v-for="(semester, index) in coursesBySemester" :key="index" class="semester-column">
                <div class="semester-header">
                  <h3>Semester {{ index + 1 }}</h3>
                  <span class="credits-badge">{{ getTotalCredits(semester) }} Cr</span>
                </div>
                <div class="courses-list">
                  <div
                    v-for="course in semester"
                    :key="course.code + course.title"
                    :data-key="course.code + '_' + course.title.slice(0,10)"
                    :class="[
                      'course-card',
                      getCourseType(course) === 'J' ? 'type-j' : getCourseType(course) === 'L' ? 'type-l' : 'type-t',
                      {
                        'locked':          isLocked(course),
                        'highlighted-active': isActive(course),
                        'faded':           activeCourse && !isInPath(course) && !course.nonGraded,
                        'faded-ng':        activeCourse && !isInPath(course) && course.nonGraded,
                        'highlighted-pre': activeCourse && isPrerequisite(course),
                        'highlighted-dep': activeCourse && isDependent(course),
                        'non-graded':      course.nonGraded,
                      }
                    ]"
                    @click.stop="selectCourse(course)"
                    @mouseenter="onCardEnter(course)"
                    @mouseleave="onCardLeave"
                  >
                    <div class="course-header">
                      <span class="course-code">{{ course.code }}</span>
                      <span class="course-type-badge">{{ getCourseType(course) }}</span>
                    </div>
                    <p class="course-title">{{ course.title }}</p>
                    <div class="course-footer">
                      <span class="credits">{{ course.credits }}C</span>
                      <span class="hours">{{ course.L }}-{{ course.T }}-{{ course.P }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dependencies Panel -->
          <transition name="slide-panel">
            <div v-if="lockedCourse" class="dependencies-panel">
              <div class="panel-header">
                <div>
                  <div class="panel-code">{{ lockedCourse.code }}</div>
                  <div class="panel-title">{{ lockedCourse.title }}</div>
                </div>
                <button @click="clearSelection" class="close-btn">✕</button>
              </div>
              <div class="panel-content">
                <div class="dependencies-section">
                  <h4>Prerequisites</h4>
                  <div v-if="getPrerequisites(lockedCourse).length > 0" class="dependencies-list">
                    <div v-for="dep in getPrerequisites(lockedCourse)" :key="dep.code + dep.title" class="dependency-item">
                      <span class="dep-badge pre">PRE</span>
                      <span>{{ dep.code }} – {{ dep.title }}</span>
                    </div>
                  </div>
                  <p v-else class="no-deps">No prerequisites</p>
                </div>
                <div class="dependencies-section">
                  <h4>Dependents</h4>
                  <div v-if="getDependents(lockedCourse).length > 0" class="dependencies-list">
                    <div v-for="dep in getDependents(lockedCourse)" :key="dep.code + dep.title" class="dependency-item">
                      <span class="dep-badge dep">DEP</span>
                      <span>{{ dep.code }} – {{ dep.title }}</span>
                    </div>
                  </div>
                  <p v-else class="no-deps">No dependent courses</p>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Career Mapping View -->
        <div v-show="activeTab === 'career'" class="tab-content career-view">
          <div class="career-header">
            <h2>Career Mapping Matrix</h2>
            <div class="filters">
              <select v-model="courseTypeFilter" class="filter-select">
                <option value="">All Types</option>
                <option value="T">Theory (T)</option>
                <option value="L">Laboratory (L)</option>
                <option value="J">Lab + Theory (J)</option>
              </select>
            </div>
          </div>

          <div class="career-matrix">
            <div v-for="(semester, index) in coursesBySemester" :key="index" class="career-column">
              <div class="column-header">
                <h3>Sem {{ index + 1 }}</h3>
                <span class="credits-badge">{{ getTotalCredits(semester) }} Cr</span>
              </div>
              <div class="career-courses">
                <div
                  v-for="course in filterCourses(semester)"
                  :key="course.code + course.title"
                  class="career-course"
                  :data-type="getCourseType(course)"
                >
                  <div class="career-course-code">{{ course.code }}</div>
                  <div class="career-course-title">{{ course.title }}</div>
                  <div class="career-course-meta">
                    <span class="career-type-badge">{{ getCourseType(course) }}</span>
                    <span class="career-credits">{{ course.credits }}C</span>
                  </div>
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
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

interface Course {
  code: string
  title: string
  credits: number
  L: number
  T: number
  P: number
  semester: number
  nonGraded?: boolean
  prerequisiteCodes?: string[]
}

const activeTab = ref<'pathway' | 'career'>('pathway')
const lockedCourse = ref<Course | null>(null)
const hoveredCourse = ref<Course | null>(null)
const pathwaySvg = ref<SVGSVGElement | null>(null)
const semestersContainer = ref<HTMLElement | null>(null)
const pathwayContainer = ref<HTMLElement | null>(null)
const courseTypeFilter = ref('')

// rAF handle so we never queue more than one redraw per frame
let rafHandle: number | null = null

const tabs = [
  { id: 'pathway', label: 'Course Pathway' },
  { id: 'career', label: 'Career Mapping' },
]

// ── Course data ────────────────────────────────────────────────────────────
const allCourses: Course[] = [
  // ── Semester 1 ──────────────────────────────────────────────────────────
  { code: '26LCA1002J', title: 'Chinese',                                      credits: 2, L:2, T:0, P:2, semester:1 },
  { code: '26LCA1003J', title: 'French',                                       credits: 2, L:2, T:0, P:2, semester:1 },
  { code: '26LCA1004J', title: 'German',                                       credits: 2, L:2, T:0, P:2, semester:1 },
  { code: '26LCA1005J', title: 'Japanese',                                     credits: 2, L:2, T:0, P:2, semester:1 },
  { code: '26LCA1006J', title: 'Korean',                                       credits: 2, L:2, T:0, P:2, semester:1 },
  { code: '26LCA1007J', title: 'Spanish',                                      credits: 2, L:2, T:0, P:2, semester:1 },
  { code: '26LCA1008J', title: 'Russian',                                      credits: 2, L:2, T:0, P:2, semester:1 },
  { code: '26CYB1002J', title: 'Chemistry for Computer Science',               credits: 4, L:2, T:1, P:2, semester:1, prerequisiteCodes: [] },
  { code: '26BTB1001T', title: 'Introduction to Computational Biology',        credits: 2, L:2, T:0, P:0, semester:1 },
  { code: '26MAB1001T', title: 'Calculus and Linear Algebra',                  credits: 4, L:3, T:1, P:0, semester:1 },
  { code: '26CSE1002T', title: 'Programming for Problem Solving',              credits: 2, L:2, T:0, P:2, semester:1 },
  { code: '26MEE1001T', title: 'Workshop Practice',                            credits: 2, L:0, T:0, P:4, semester:1 },
  { code: '26GNN1004T', title: 'National Service Scheme',                      credits: 2, L:0, T:0, P:0, semester:1, nonGraded:true },
  { code: '26GNN1005L', title: 'National Cadet Corps',                         credits: 2, L:0, T:1, P:0, semester:1, nonGraded:true },
  { code: '26GNN1006L', title: 'National Sports Organization',                 credits: 2, L:0, T:0, P:4, semester:1, nonGraded:true },
  { code: '26GNN1007J', title: 'Physical and Mental Health using Yoga',        credits: 2, L:0, T:0, P:2, semester:1, nonGraded:true },

  // ── Semester 2 ──────────────────────────────────────────────────────────
  { code: '26LCA1001J', title: 'Professional English for Engineers',           credits: 3, L:2, T:0, P:2, semester:2 },
  { code: '26PYB1001J', title: 'Physics for Computational Intelligence',       credits: 4, L:2, T:1, P:2, semester:2 },
  { code: '26CSE1001T', title: 'Data Science and Artificial Intelligence',     credits: 3, L:2, T:1, P:0, semester:2 },
  { code: '26MAB1003T', title: 'Discrete Mathematics',                         credits: 4, L:3, T:1, P:0, semester:2 },
  { code: '26EEE1001T', title: 'Electrical and Electronics Engineering',       credits: 3, L:3, T:0, P:0, semester:2 },
  { code: '26MEE1002L', title: 'Engineering Graphics',                         credits: 2, L:0, T:0, P:4, semester:2 },
  { code: '26OOP1001J', title: 'Object Oriented Design and Programming',       credits: 4, L:3, T:0, P:2, semester:2, prerequisiteCodes: ['26CSE1002T'] },
  { code: '26GNN1001T', title: 'Universal Human Values – Understanding Harmony and Ethical Human Conduct', credits: 3, L:2, T:1, P:0, semester:2, nonGraded:true },

  // ── Semester 3 ──────────────────────────────────────────────────────────
  { code: '26MAB2004T', title: 'Probability and Stochastic Process',           credits: 4, L:3, T:1, P:0, semester:3, prerequisiteCodes: ['26MAB1003T'] },
  { code: '26CSE2003J', title: 'Digital Logic and Circuit Design',             credits: 3, L:3, T:0, P:0, semester:3 },
  { code: '26CSC2002J', title: 'Data Structures and Algorithms',               credits: 4, L:3, T:0, P:2, semester:3, prerequisiteCodes: ['26OOP1001J'] },
  { code: '26CSC2003J', title: 'Software Engineering and Project Management',  credits: 4, L:3, T:0, P:2, semester:3 },
  { code: '26CSC2005J', title: 'Advanced Object Oriented Programming',         credits: 4, L:3, T:0, P:2, semester:3, prerequisiteCodes: ['26OOP1001J'] },
  { code: '26DCE1001T', title: 'Design Thinking and Methodology',              credits: 2, L:2, T:0, P:0, semester:3 },
  { code: 'SEC-1',      title: 'Skill Enhancement Course - 1',                credits: 2, L:0, T:0, P:0, semester:3 },
  { code: '26LCN1001T', title: 'Indian Art, Culture and Constitution',         credits: 2, L:2, T:0, P:0, semester:3, nonGraded:true },
  { code: '26LCN1002T', title: 'Indian Traditional Knowledge',                 credits: 2, L:2, T:0, P:0, semester:3, nonGraded:true },

  // ── Semester 4 ──────────────────────────────────────────────────────────
  { code: '26MAB2006J', title: 'Statistical Methods',                          credits: 4, L:3, T:0, P:2, semester:4, prerequisiteCodes: ['26MAB2004T'] },
  { code: '26CSC2004J', title: 'Design and Analysis of Algorithms',            credits: 4, L:3, T:0, P:2, semester:4, prerequisiteCodes: ['26CSC2002J'] },
  { code: '26CSC2011J', title: 'Operating Systems',                            credits: 4, L:3, T:0, P:2, semester:4 },
  { code: '26CSC2008T', title: 'Computer Organization and Architecture',       credits: 3, L:3, T:0, P:0, semester:4 },
  { code: '26CSC2014J', title: 'Machine Learning',                             credits: 4, L:3, T:0, P:2, semester:4, prerequisiteCodes: ['26CSE1001T', '26MAB2004T'] },
  { code: 'MDC-1',      title: 'Multidisciplinary Skill Course - 1',           credits: 3, L:0, T:0, P:0, semester:4 },
  { code: 'SEC-2',      title: 'Skill Enhancement Course - 2',                credits: 2, L:0, T:0, P:0, semester:4 },
  { code: '26LCN1003T', title: 'Professional Ethics and Values',               credits: 2, L:2, T:0, P:0, semester:4, nonGraded:true },
  { code: '26GNN1003J', title: 'Behavioural Psychology',                       credits: 2, L:1, T:0, P:2, semester:4, nonGraded:true },

  // ── Semester 5 ──────────────────────────────────────────────────────────
  { code: '26CSC2007J', title: 'Computer Networks',                            credits: 4, L:3, T:0, P:2, semester:5 },
  { code: '26CSC3001J', title: 'Database Management Systems',                  credits: 4, L:3, T:0, P:2, semester:5 },
  { code: '26CSC3039T', title: 'Theory of Computation',                        credits: 3, L:3, T:0, P:0, semester:5 },
  { code: '26CSC3026J', title: 'Deep Learning',                                credits: 4, L:3, T:0, P:2, semester:5, prerequisiteCodes: ['26CSC2014J'] },
  { code: 'DEC-1',      title: 'Discipline Elective Course - 1',              credits: 4, L:0, T:0, P:0, semester:5 },
  { code: 'MDC-2',      title: 'Multidisciplinary Skill Course - 2',           credits: 3, L:0, T:0, P:0, semester:5 },
  { code: 'SEC-3',      title: 'Skill Enhancement Course - 3',                credits: 2, L:0, T:0, P:0, semester:5 },
  { code: '26CYN1001J', title: 'Environmental Science with AI',                credits: 2, L:1, T:0, P:2, semester:5, nonGraded:true },
  { code: '26CYN1002L', title: 'Community Connect',                            credits: 2, L:0, T:0, P:4, semester:5, nonGraded:true },

  // ── Semester 6 ──────────────────────────────────────────────────────────
  { code: '26CSC3037J', title: 'Natural Language Processing',                  credits: 4, L:3, T:0, P:2, semester:6, prerequisiteCodes: ['26CSC3026J'] },
  { code: '26CSC3003J', title: 'Compiler Design',                              credits: 4, L:3, T:0, P:2, semester:6, prerequisiteCodes: ['26CSC3039T'] },
  { code: 'DEC-2',      title: 'Discipline Elective Course - 2',              credits: 4, L:0, T:0, P:0, semester:6 },
  { code: 'DEC-3',      title: 'Discipline Elective Course - 3',              credits: 4, L:0, T:0, P:0, semester:6 },
  { code: 'MDC-3',      title: 'Multidisciplinary Skill Course - 3',           credits: 3, L:0, T:0, P:0, semester:6 },
  { code: 'SEC-4',      title: 'Skill Enhancement Course - 4',                credits: 2, L:0, T:0, P:0, semester:6 },
  { code: '26CSN1001J', title: 'Cyber Hygiene',                               credits: 2, L:1, T:0, P:2, semester:6, nonGraded:true },
  { code: '26CEN1001T', title: 'Disaster Mitigation and Management',           credits: 2, L:2, T:0, P:0, semester:6, nonGraded:true },

  // ── Semester 7 ──────────────────────────────────────────────────────────
  { code: 'DEC-4',      title: 'Discipline Elective Course - 4',              credits: 4, L:0, T:0, P:0, semester:7 },
  { code: 'DEC-5',      title: 'Discipline Elective Course - 5',              credits: 4, L:0, T:0, P:0, semester:7 },
  { code: 'DEC-6',      title: 'Discipline Elective Course - 6',              credits: 4, L:0, T:0, P:0, semester:7 },
  { code: '26CSP3001L', title: 'Summer Internship',                           credits: 4, L:0, T:0, P:8, semester:7 },

  // ── Semester 8 ──────────────────────────────────────────────────────────
  { code: '26CSP4001L', title: 'Major Project',                               credits: 12, L:0, T:0, P:24, semester:8 },
  { code: '26CSP4002L', title: 'Major Project (Alt)',                          credits: 8, L:0, T:0, P:16, semester:8 },
  { code: '26CSP4003L', title: 'Professional Internship',                     credits: 8, L:0, T:0, P:8, semester:8 },
]

// ── Helpers ────────────────────────────────────────────────────────────────
function courseKey(c: Course) {
  return c.code + '|' + c.title
}

function getPrerequisites(course: Course): Course[] {
  if (!course.prerequisiteCodes?.length) return []
  return allCourses.filter(c => course.prerequisiteCodes!.includes(c.code))
}

function getDependents(course: Course): Course[] {
  return allCourses.filter(c => c.prerequisiteCodes?.includes(course.code))
}

function isPrerequisite(c: Course): boolean {
  const active = activeCourse.value
  if (!active) return false
  return getPrerequisites(active).some(p => courseKey(p) === courseKey(c))
}

function isDependent(c: Course): boolean {
  const active = activeCourse.value
  if (!active) return false
  return getDependents(active).some(d => courseKey(d) === courseKey(c))
}

function isLocked(c: Course): boolean {
  return !!lockedCourse.value && courseKey(lockedCourse.value) === courseKey(c)
}

/** The card IS the active course (hovered or locked) */
function isActive(c: Course): boolean {
  const active = activeCourse.value
  if (!active) return false
  return courseKey(active) === courseKey(c)
}

function isInPath(c: Course): boolean {
  return isActive(c) || isPrerequisite(c) || isDependent(c)
}

// activeCourse: hover takes priority over lock while hovering, lock persists when not hovering
const activeCourse = computed(() => hoveredCourse.value ?? lockedCourse.value)

const coursesBySemester = computed(() => {
  const sems: Course[][] = Array.from({ length: 8 }, () => [])
  allCourses.forEach(c => { if (c.semester >= 1 && c.semester <= 8) sems[c.semester - 1].push(c) })
  return sems
})

// ── Hover handling — NO timers, direct assignment ─────────────────────────
// The jitter was caused by a 50 ms setTimeout in scheduleHoverClear.
// When moving the mouse directly from card A to card B the sequence was:
//   mouseleave(A) → timer starts → mouseenter(B) — but if the enter fires
//   AFTER the 50 ms the timer already cleared hoveredCourse, producing a
//   blank frame and a full redraw.  Direct assignment is instant and atomic.

function onCardEnter(course: Course) {
  // While a course is locked we still show the hover highlight on top
  hoveredCourse.value = course
  scheduleRedraw()
}

function onCardLeave() {
  // Clear hover immediately — no timer needed.
  // The next mouseenter (if the pointer moves to another card) fires
  // synchronously before the browser paints, so there's no visible blank frame.
  hoveredCourse.value = null
  scheduleRedraw()
}

function selectCourse(course: Course) {
  if (lockedCourse.value && courseKey(lockedCourse.value) === courseKey(course)) {
    // Toggle off if clicking the already-locked course
    lockedCourse.value = null
  } else {
    lockedCourse.value = course
  }
  // Hover state is separate — keep whatever the pointer is over right now
  scheduleRedraw()
}

function clearSelection() {
  lockedCourse.value = null
  scheduleRedraw()
}

function getTotalCredits(semester: Course[]): number {
  return semester.reduce((s, c) => s + c.credits, 0)
}

function getCourseType(course: Course): string {
  if (course.code.endsWith('J')) return 'J'
  if (course.code.endsWith('L')) return 'L'
  if (course.code.endsWith('T')) return 'T'
  if (course.code.startsWith('DEC') || course.code.startsWith('SEC') || course.code.startsWith('MDC')) return 'T'
  return 'T'
}

function filterCourses(semester: Course[]): Course[] {
  if (!courseTypeFilter.value) return semester
  return semester.filter(c => getCourseType(c) === courseTypeFilter.value)
}

// ── SVG connection drawing ─────────────────────────────────────────────────

function sizeSvg() {
  const svg = pathwaySvg.value
  const container = semestersContainer.value
  if (!svg || !container) return
  svg.setAttribute('viewBox', `0 0 ${container.scrollWidth} ${container.scrollHeight}`)
  svg.style.width = container.scrollWidth + 'px'
  svg.style.height = container.scrollHeight + 'px'
}

function scheduleRedraw() {
  if (rafHandle !== null) cancelAnimationFrame(rafHandle)
  rafHandle = requestAnimationFrame(() => {
    rafHandle = null
    redrawConnections()
  })
}

function redrawConnections() {
  const svg = pathwaySvg.value
  const container = semestersContainer.value
  if (!svg || !container) return

  svg.innerHTML = ''

  const active = activeCourse.value
  if (!active) return

  const containerRect = container.getBoundingClientRect()
  const scrollLeft = container.scrollLeft
  const scrollTop = container.scrollTop

  const cards = container.querySelectorAll<HTMLElement>('.course-card')
  const posMap = new Map<string, DOMRect>()
  cards.forEach(card => {
    const key = card.dataset.key
    if (key) posMap.set(key, card.getBoundingClientRect())
  })

  const activeKey = active.code + '_' + active.title.slice(0, 10)
  const activeRect = posMap.get(activeKey)
  if (!activeRect) return

  function rectCenter(r: DOMRect) {
    return {
      x: r.left - containerRect.left + scrollLeft + r.width / 2,
      y: r.top - containerRect.top + scrollTop + r.height / 2,
    }
  }

  const activePos = rectCenter(activeRect)

  function getOrCreateMarker(color: string) {
    const markerId = 'arrow-' + color.replace('#', '')
    if (svg!.querySelector(`#${markerId}`)) return markerId
    let defs = svg!.querySelector('defs')
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      svg!.prepend(defs)
    }
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker')
    marker.setAttribute('id', markerId)
    marker.setAttribute('markerWidth', '8')
    marker.setAttribute('markerHeight', '8')
    marker.setAttribute('refX', '6')
    marker.setAttribute('refY', '3')
    marker.setAttribute('orient', 'auto')
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    poly.setAttribute('points', '0 0, 8 3, 0 6')
    poly.setAttribute('fill', color)
    marker.appendChild(poly)
    defs.appendChild(marker)
    return markerId
  }

  const drawLine = (from: {x:number,y:number}, to: {x:number,y:number}, color: string) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const mx = (from.x + to.x) / 2
    const d = `M ${from.x} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x} ${to.y}`
    path.setAttribute('d', d)
    path.setAttribute('stroke', color)
    path.setAttribute('stroke-width', '2.5')
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke-linecap', 'round')
    path.setAttribute('marker-end', `url(#${getOrCreateMarker(color)})`)
    svg!.appendChild(path)
  }

  getPrerequisites(active).forEach(pre => {
    const key = pre.code + '_' + pre.title.slice(0, 10)
    const r = posMap.get(key)
    if (r) drawLine(rectCenter(r), activePos, '#dc2626')
  })

  getDependents(active).forEach(dep => {
    const key = dep.code + '_' + dep.title.slice(0, 10)
    const r = posMap.get(key)
    if (r) drawLine(activePos, rectCenter(r), '#16a34a')
  })
}

watch(activeTab, () => nextTick(() => { sizeSvg(); scheduleRedraw() }))

onMounted(() => {
  nextTick(() => { sizeSvg(); scheduleRedraw() })
  semestersContainer.value?.addEventListener('scroll', scheduleRedraw)
  window.addEventListener('resize', () => { sizeSvg(); scheduleRedraw() })
})

onBeforeUnmount(() => {
  if (rafHandle !== null) cancelAnimationFrame(rafHandle)
  window.removeEventListener('resize', scheduleRedraw)
})
</script>

<style scoped>
:root {
  --primary: #1a5f47;
  --accent: #00d4aa;
  --surface: #ffffff;
  --surface-alt: #f8fafb;
  --border: #e2e8f0;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --background: #f1f5f9;
}

main { flex: 1; }

.curriculum-section {
  padding: 40px 20px;
  background: var(--background, #f1f5f9);
  min-height: 100vh;
}

.container { max-width: 1900px; margin: 0 auto; }

.curriculum-header { text-align: center; margin-bottom: 32px; }
.page-title {
  font-size: 32px; font-weight: 800; color: var(--primary, #1a5f47);
  margin: 0 0 6px;
}
.page-subtitle { font-size: 13px; color: var(--text-secondary, #64748b); margin: 0; letter-spacing: .4px; }

/* Tabs */
.tabs-container {
  display: flex; gap: 6px; margin-bottom: 28px;
  border-bottom: 2px solid var(--border, #e2e8f0);
}
.tab-btn {
  padding: 10px 22px; background: transparent; border: none;
  color: var(--text-secondary, #64748b); font-weight: 600; cursor: pointer;
  border-bottom: 3px solid transparent; transition: all .25s; font-size: 14px;
  margin-bottom: -2px;
}
.tab-btn:hover { color: var(--primary, #1a5f47); }
.tab-btn.active { color: var(--primary, #1a5f47); border-bottom-color: var(--primary, #1a5f47); }

.tab-content {
  background: var(--surface, #fff);
  border-radius: 12px; padding: 24px;
  box-shadow: 0 1px 6px rgba(0,0,0,.06);
}

/* ── Pathway ── */
.pathway-view { display: flex; flex-direction: column; gap: 16px; }
.pathway-header { display: flex; justify-content: space-between; align-items: flex-start; }
.pathway-info h2 { font-size: 20px; font-weight: 700; color: var(--primary,#1a5f47); margin: 0 0 4px; }
.info-text { font-size: 12px; color: var(--text-secondary,#64748b); margin: 0; }
.pathway-legend { display: flex; gap: 20px; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-secondary,#64748b); }
.legend-dot.active-dot { color: var(--primary,#1a5f47); }
.legend-dot.pre  { color: #dc2626; }
.legend-dot.dep  { color: #16a34a; }

.pathway-container {
  position: relative;
  overflow: auto;
  min-height: 480px;
  border: 1px solid var(--border,#e2e8f0);
  border-radius: 10px;
}
.pathway-svg {
  position: absolute; top: 0; left: 0;
  pointer-events: none; z-index: 10;
}
.semesters-container {
  display: flex; gap: 14px;
  padding: 16px;
  position: relative; z-index: 20;
  min-width: max-content;
}

.semester-column { flex: 0 0 148px; min-width: 148px; }
.semester-header {
  display: flex; flex-direction: column; align-items: center;
  gap: 4px; margin-bottom: 10px; padding-bottom: 8px;
  border-bottom: 2px solid var(--primary,#1a5f47);
}
.semester-header h3 { font-size: 12px; font-weight: 700; color: var(--primary,#1a5f47); margin: 0; }
.credits-badge {
  font-size: 10px; background: #e8f5f0; color: var(--primary,#1a5f47);
  padding: 2px 6px; border-radius: 4px; font-weight: 600;
}
.courses-list { display: flex; flex-direction: column; gap: 7px; }

.course-card {
  border: 2px solid var(--border,#e2e8f0);
  border-radius: 8px; padding: 9px;
  cursor: pointer;
  will-change: opacity, transform;
  transition: opacity .15s ease, border-color .15s ease, box-shadow .15s ease, background .15s ease;
  min-height: 88px; display: flex; flex-direction: column;
  justify-content: space-between;
  background: var(--surface-alt,#f8fafb);
  position: relative;
}

/* Faded: fully inactive cards while a course is active */
.course-card.faded {
  opacity: .08;
  pointer-events: none;
}
/* Non-graded inactive cards fade a bit less so they stay legible */
.course-card.faded-ng {
  opacity: .12;
  pointer-events: none;
}

/* The active course itself (hovered or locked) */
.course-card.highlighted-active {
  border-color: var(--primary,#1a5f47);
  background: #ecfdf8;
  box-shadow: 0 4px 16px rgba(26,95,71,.28);
  outline: 2px solid rgba(26,95,71,.18);
  outline-offset: 2px;
}

/* Prerequisite highlight */
.course-card.highlighted-pre {
  border-color: #dc2626;
  background: #fff5f5;
  box-shadow: 0 3px 12px rgba(220,38,38,.18);
}

/* Dependent highlight */
.course-card.highlighted-dep {
  border-color: #16a34a;
  background: #f0fdf4;
  box-shadow: 0 3px 12px rgba(22,163,74,.18);
}

/* Locked adds a ring on top of highlighted-active */
.course-card.locked {
  border-color: var(--primary,#1a5f47);
  background: #ecfdf8;
  box-shadow: 0 4px 20px rgba(26,95,71,.32);
  outline: 2px solid var(--primary,#1a5f47);
  outline-offset: 2px;
}

.course-card.non-graded { opacity: .75; font-style: italic; }
.course-card.non-graded.faded,
.course-card.non-graded.faded-ng { opacity: .12; }

/* type color strip on left border */
.course-card.type-t { border-left: 4px solid #3b82f6; }
.course-card.type-l { border-left: 4px solid #ef4444; }
.course-card.type-j { border-left: 4px solid #8b5cf6; }

.course-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 4px; margin-bottom: 4px; }
.course-code { font-size: 9px; font-weight: 700; color: var(--primary,#1a5f47); flex: 1; line-height: 1.2; }
.course-type-badge {
  font-size: 8px; font-weight: 700; padding: 1px 4px; border-radius: 3px; white-space: nowrap;
}
.type-t .course-type-badge { background: #dbeafe; color: #1e40af; }
.type-l .course-type-badge { background: #fee2e2; color: #991b1b; }
.type-j .course-type-badge { background: #ede9fe; color: #5b21b6; }

.course-title { font-size: 10px; color: var(--text-primary,#1e293b); margin: 0 0 4px; line-height: 1.3; flex: 1; }
.course-footer { display: flex; justify-content: space-between; font-size: 9px; color: var(--text-secondary,#64748b); }
.credits { font-weight: 700; }

/* Dependencies panel */
.dependencies-panel {
  background: var(--surface,#fff);
  border: 1px solid var(--border,#e2e8f0);
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0,0,0,.1);
  overflow: hidden;
  margin-top: 8px;
}
.panel-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 14px 16px; border-bottom: 1px solid var(--border,#e2e8f0);
  background: #f8fafb;
}
.panel-code { font-size: 11px; font-weight: 700; color: var(--primary,#1a5f47); margin-bottom: 2px; }
.panel-title { font-size: 13px; font-weight: 600; color: var(--text-primary,#1e293b); }
.close-btn {
  background: none; border: none; font-size: 16px;
  color: var(--text-secondary,#64748b); cursor: pointer; padding: 0;
  width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
  border-radius: 4px; transition: all .15s;
}
.close-btn:hover { background: #f1f5f9; color: var(--primary,#1a5f47); }
.panel-content { padding: 14px 16px; display: flex; gap: 24px; }
.dependencies-section { flex: 1; }
.dependencies-section h4 {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .6px; color: var(--text-secondary,#64748b); margin: 0 0 8px;
}
.dependencies-list { display: flex; flex-direction: column; gap: 6px; }
.dependency-item {
  display: flex; align-items: flex-start; gap: 7px;
  font-size: 11px; padding: 5px 8px;
  background: var(--surface-alt,#f8fafb); border-radius: 6px;
}
.dep-badge {
  font-size: 8px; font-weight: 700; padding: 2px 4px; border-radius: 3px; white-space: nowrap; margin-top: 1px;
}
.dep-badge.pre { background: #fee2e2; color: #991b1b; }
.dep-badge.dep { background: #dcfce7; color: #166534; }
.no-deps { font-size: 11px; color: var(--text-secondary,#64748b); margin: 0; font-style: italic; }

/* Slide transition */
.slide-panel-enter-active, .slide-panel-leave-active { transition: all .25s ease; }
.slide-panel-enter-from, .slide-panel-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Career ── */
.career-view { display: flex; flex-direction: column; gap: 20px; }
.career-header { display: flex; justify-content: space-between; align-items: center; }
.career-header h2 { font-size: 20px; font-weight: 700; color: var(--primary,#1a5f47); margin: 0; }
.filters { display: flex; gap: 10px; }
.filter-select {
  padding: 7px 12px; border: 1px solid var(--border,#e2e8f0); border-radius: 6px;
  background: var(--surface,#fff); color: var(--text-primary,#1e293b); font-size: 13px; cursor: pointer;
}
.filter-select:focus { outline: none; border-color: var(--primary,#1a5f47); }
.career-matrix { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 12px; }
.career-column { flex: 0 0 160px; min-width: 160px; }
.column-header { margin-bottom: 10px; padding-bottom: 6px; border-bottom: 2px solid var(--primary,#1a5f47); }
.column-header h3 { font-size: 12px; font-weight: 700; color: var(--primary,#1a5f47); margin: 0 0 2px; }
.career-courses { display: flex; flex-direction: column; gap: 7px; }
.career-course {
  border-radius: 6px; padding: 8px;
  font-size: 10px; border-left: 3px solid transparent;
}
.career-course[data-type="T"] { background: #dbeafe; border-left-color: #1e40af; }
.career-course[data-type="L"] { background: #fee2e2; border-left-color: #991b1b; }
.career-course[data-type="J"] { background: #ede9fe; border-left-color: #5b21b6; }
.career-course-code { font-weight: 700; color: var(--primary,#1a5f47); margin-bottom: 2px; font-size: 9px; }
.career-course-title { color: var(--text-primary,#1e293b); line-height: 1.3; margin-bottom: 4px; }
.career-course-meta { display: flex; justify-content: space-between; align-items: center; }
.career-type-badge { font-size: 8px; font-weight: 700; text-transform: uppercase; color: var(--text-secondary,#64748b); }
.career-credits { font-size: 9px; font-weight: 700; color: var(--primary,#1a5f47); }

@media (max-width: 768px) {
  .curriculum-section { padding: 20px 12px; }
  .pathway-header { flex-direction: column; gap: 12px; }
  .pathway-legend { flex-wrap: wrap; gap: 10px; }
  .panel-content { flex-direction: column; gap: 12px; }
  .page-title { font-size: 22px; }
}
</style>