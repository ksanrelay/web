import TechnicalLabel from './TechnicalLabel.tsx'

interface ResearchCardProps {
  index: string
  title: string
  description: string
  notation: string
}

export default function ResearchCard({ index, title, description, notation }: ResearchCardProps) {
  return (
    <article className="card research-card">
      <div className="research-card__meta">
        <TechnicalLabel>{index}</TechnicalLabel>
        <span className="research-card__notation" aria-hidden="true">
          {notation}
        </span>
      </div>
      <h3 className="research-card__title">{title}</h3>
      <p className="research-card__body">{description}</p>
    </article>
  )
}
