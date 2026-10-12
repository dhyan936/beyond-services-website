import Logo from '../Logo'
import { SocialIcon } from '../Icons'
import { Link } from '../../router/router'
import { BRAND_NAME, CONTACT_INFO, FOOTER, telHref } from '../../content/site'
import './Footer.css'

/**
 * Global footer. Navigation, the nine service routes, the approved contact
 * details and the real social profiles. No newsletter: none was approved, and a
 * subscribe field that goes nowhere would be fake functionality.
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo-link" aria-label={`${BRAND_NAME}, home`}>
            <Logo className="site-footer__logo" alt={BRAND_NAME} />
          </Link>
          <p className="site-footer__tagline t-caption">
            Project management, repair &amp; maintenance and integrated facility services for corporate and
            industrial clients across India.
          </p>
          <ul className="site-footer__socials">
            {CONTACT_INFO.socials.map((social) => (
              <li key={social.label}>
                <a
                  className="site-footer__social"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${BRAND_NAME} on ${social.label}`}
                >
                  <SocialIcon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="site-footer__col" aria-label="Footer">
          <h2 className="site-footer__title t-label">Company</h2>
          <ul className="site-footer__links">
            {FOOTER.nav.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="site-footer__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer__col" aria-label="Services">
          <h2 className="site-footer__title t-label">Services</h2>
          <ul className="site-footer__links">
            {FOOTER.services.map((service) => (
              <li key={service.href}>
                <Link to={service.href} className="site-footer__link">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__col">
          <h2 className="site-footer__title t-label">Contact</h2>
          <ul className="site-footer__links site-footer__links--contact">
            <li>
              <a className="site-footer__link" href={`mailto:${CONTACT_INFO.email}`}>
                {CONTACT_INFO.email}
              </a>
            </li>
            {CONTACT_INFO.phones.map((phone) => (
              <li key={phone}>
                <a className="site-footer__link" href={telHref(phone)}>
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <address className="site-footer__address">
                {CONTACT_INFO.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </li>
            <li className="site-footer__hours t-caption">
              {CONTACT_INFO.hoursDays}, {CONTACT_INFO.hours}
            </li>
          </ul>
        </div>
      </div>

      {/* The name set full-bleed in outline caps: a sign-off, not content. */}
      <div className="container site-footer__mark" aria-hidden="true">
        Beyond Service
      </div>

      <div className="container site-footer__base">
        <p className="site-footer__legal t-caption">{FOOTER.legal}</p>

        <nav className="site-footer__legal-nav" aria-label="Legal">
          <ul className="site-footer__legal-links">
            {FOOTER.legalLinks.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="site-footer__legal-link t-caption">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a className="site-footer__site t-caption" href={CONTACT_INFO.website} target="_blank" rel="noopener noreferrer">
          {CONTACT_INFO.websiteLabel}
        </a>
      </div>
    </footer>
  )
}
