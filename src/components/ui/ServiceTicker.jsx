import { SERVICE_CARDS } from '../../content/site'
import './ServiceTicker.css'

/**
 * A slow band of the nine service lines in display caps, between the hero and
 * the first section. Purely typographic: it repeats what the services section
 * lists, so the whole band is hidden from assistive tech and the real list
 * stays the one source a screen reader hears.
 *
 * Two identical tracks slide together, as in LogoMarquee, so the loop has no seam.
 */
export default function ServiceTicker() {
  const items = SERVICE_CARDS.map((card) => card.name)
  const track = (
    <ul className="ticker__track">
      {items.map((name, i) => (
        <li key={name} className={`ticker__item${i % 2 ? ' ticker__item--outline' : ''}`}>
          {name}
          <span className="ticker__mark" />
        </li>
      ))}
    </ul>
  )

  return (
    <div className="ticker tone-dark" aria-hidden="true">
      {track}
      {track}
    </div>
  )
}
