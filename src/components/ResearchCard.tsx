interface ResearchCardProps {
  title: string
  description: string
  /** Notation that characterises the area, e.g. "∂V/∂t". Decorative. */
  notation: string
}

export default function ResearchCard({ title, description, notation }: ResearchCardProps) {
  return (
    <article className="card research-card">
      <p className="research-card__notation" aria-hidden="true">
        {notation}
      </p>
      <h3 className="research-card__title">{title}</h3>
      <p className="research-card__body">{description}</p>
    </article>
  )
}
