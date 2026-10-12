import { motion } from 'motion/react'
import SectionIntro from '../../components/ui/SectionIntro'
import PendingPanel from '../../components/ui/PendingPanel'
import ProjectFigure from '../../components/ui/ProjectFigure'
import { Link } from '../../router/router'
import { reveal } from '../../lib/motion'
import { PROJECTS } from '../../content/site'
import './ProjectsSection.css'

/**
 * Projects / Case Studies — the four portfolio entries the company publishes.
 *
 * Each tile carries only what the source states: title, service category and
 * region. No client, date, value or outcome is added, because the source
 * publishes none. No photograph is used either — none has been supplied, and
 * stock imagery here would read as a claim about work actually delivered. Each
 * tile instead carries a line figure abstracting its discipline.
 *
 * Every tile opens its own route, where a composed "coming soon" view says
 * plainly that the detailed case study is not ready. That is the honest
 * destination; a fabricated case study is not an option.
 */
export default function ProjectsSection() {
  const { items } = PROJECTS

  return (
    <section className="section projects tone-dark" aria-labelledby="projects-heading">
      <div className="container">
        <SectionIntro
          id="projects-heading"
          label={PROJECTS.label}
          lines={PROJECTS.headingLines}
          supporting={PROJECTS.supporting}
          align="split"
        />

        {items.length > 0 ? (
          <div className="projects__grid">
            {items.map((project, i) => (
              <motion.div
                key={project.slug}
                className="projects__cell"
                data-shape={project.shape}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal.up}
                transition={{ delay: (i % 2) * 0.08 }}
              >
                <Link to={project.href} className="project-tile">
                  <span className="project-tile__figure" aria-hidden="true">
                    <ProjectFigure variant={project.figure} />
                  </span>

                  <span className="project-tile__body">
                    <span className="project-tile__num t-label">{project.num}</span>
                    <span className="project-tile__title">{project.title}</span>
                    <span className="project-tile__meta t-caption">
                      <span>{project.category}</span>
                      {project.scope && (
                        <>
                          <span className="project-tile__sep" aria-hidden="true" />
                          <span>{project.scope}</span>
                        </>
                      )}
                      <span className="project-tile__sep" aria-hidden="true" />
                      <span>{project.region}</span>
                    </span>
                    <span className="project-tile__cue" aria-hidden="true">
                      <span className="project-tile__cue-line" />
                      <svg viewBox="0 0 16 16" width="14" height="14">
                        <path
                          d="M3 8h9M8.5 4l4 4-4 4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <PendingPanel
            title="Project case studies will be published once approved."
            note="Beyond Service's completed work, photographs and outcomes are not included here yet. Nothing stands in for them, so that no stock image is ever mistaken for a Beyond Service project."
          />
        )}
      </div>
    </section>
  )
}
