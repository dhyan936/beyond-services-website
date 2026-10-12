import SectionIntro from '../../components/ui/SectionIntro'
import ServiceGrid from '../../components/ui/ServiceGrid'
import ScrollReveal from '../../components/motion/ScrollReveal'
import CTAButton from '../../components/CTAButton/CTAButton'
import { LINKS, SERVICE_CARDS, SERVICES_SECTION } from '../../content/site'
import './ServicesSection.css'

/**
 * Our Services — the nine verticals as three groups of three.
 *
 * The section previously ran the asymmetric editorial composition with its
 * heading block placed inside the first grid row. Two problems with that
 * here: the heading was constrained to a fixed row track and its supporting
 * line was clipped, and the uneven card widths read as a selection rather
 * than as the complete set of nine. The heading now sits above the grid where
 * it has room, and the nine verticals run as three even rows, numbered
 * straight through and separated by a hairline per group.
 *
 * The card and the grid are still shared with the /services overview, which
 * keeps its own asymmetric composition, so both levels remain one system.
 */
export default function ServicesSection() {
  return (
    <section id="services" className="section services tone-dark" aria-labelledby="services-title">
      <div className="container">
        <SectionIntro
          id="services-title"
          label={SERVICES_SECTION.label}
          lines={SERVICES_SECTION.headingLines}
          supporting={SERVICES_SECTION.supporting}
          align="split"
        />

        <ServiceGrid cards={SERVICE_CARDS} layout="rows" />

        <ScrollReveal className="services__footer" variant="up" amount={0.4}>
          <CTAButton href={LINKS.services} variant="secondary" arrow>
            View all services
          </CTAButton>
        </ScrollReveal>
      </div>
    </section>
  )
}
