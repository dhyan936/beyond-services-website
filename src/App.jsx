import { MotionConfig } from 'motion/react'
import { usePath } from './router/router'
import { LINKS, ROUTES } from './content/site'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import QuotePage from './pages/QuotePage'
import IndustriesPage from './pages/IndustriesPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import VendorRegistrationPage from './pages/VendorRegistrationPage'
import TeamPage from './pages/TeamPage'
import LegalPage from './pages/LegalPage'
import ProjectComingSoonPage from './pages/ProjectComingSoonPage'
import SitePage from './pages/SitePage'
import { SERVICE_DETAILS } from './content/services'
import { PRIVACY_PAGE, PROJECTS, TERMS_PAGE } from './content/site'

// Routes that have a real page. Everything else in ROUTES resolves to the
// branded placeholder, so a nav link is never a dead end while the remaining
// pages are built.
const PAGES = {
  [LINKS.home]: Home,
  [LINKS.about]: AboutPage,
  [LINKS.services]: ServicesPage,
  [LINKS.quote]: QuotePage,
  [LINKS.industries]: IndustriesPage,
  [LINKS.projects]: ProjectsPage,
  [LINKS.contact]: ContactPage,
  [LINKS.vendorRegistration]: VendorRegistrationPage,
  [LINKS.team]: TeamPage,
  // Privacy and terms share one shell; only their content differs.
  [LINKS.privacy]: () => <LegalPage page={PRIVACY_PAGE} />,
  [LINKS.terms]: () => <LegalPage page={TERMS_PAGE} />,
}

// The nine service detail routes share one template, so they are resolved by
// record rather than given nine entries in PAGES.
const SERVICE_ROUTES = Object.fromEntries(SERVICE_DETAILS.map((s) => [s.href, s]))

// The four project routes share the "coming soon" view, resolved the same way.
const PROJECT_ROUTES = Object.fromEntries(PROJECTS.items.map((p) => [p.href, p]))

export default function App() {
  const path = usePath()
  const Page = PAGES[path]
  const service = SERVICE_ROUTES[path]
  const project = PROJECT_ROUTES[path]
  const route = ROUTES.find((r) => r.path === path)

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {Page ? (
        <Page />
      ) : service ? (
        <ServiceDetailPage key={service.slug} service={service} />
      ) : project ? (
        <ProjectComingSoonPage key={project.slug} project={project} />
      ) : (
        <SitePage title={route ? route.label : 'Page not found'} known={Boolean(route)} />
      )}
    </MotionConfig>
  )
}
