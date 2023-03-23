// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props

  const {
    name,
    id,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryData

  return (
    <li className="card">
      <img src={avatarUrl} className="img" alt={name} />
      <h1 className="name">{name}</h1>
      <div className="count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logo"
        />
        <p className="p1">{starsCount} stars</p>
      </div>
      <div className="count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="logo"
        />
        <p className="p1">{forksCount} forks</p>
      </div>
      <div className="count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="logo"
        />
        <p className="p1">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
