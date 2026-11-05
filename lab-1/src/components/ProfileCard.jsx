import { useState } from 'react'
import './ProfileCard.css'

function ProfileCard({ name, group, technologies }) {
  const [likes, setLikes] = useState(0)

  return (
    <article className="profile-card">
      <p className="profile-card__eyebrow">Знайомство</p>
      <h1>Про мене</h1>
      <p className="profile-card__name">{name}</p>
      <p className="profile-card__group">Група: {group}</p>

      <h2>Технології, які хочу опанувати</h2>
      <ul className="profile-card__technologies">
        {technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>

      <button
        className="profile-card__like"
        type="button"
        aria-label={`Подобається, натиснуто ${likes} разів`}
        onClick={() => setLikes((count) => count + 1)}
      >
        Подобається <span aria-hidden="true">{likes}</span>
      </button>
    </article>
  )
}

export default ProfileCard
