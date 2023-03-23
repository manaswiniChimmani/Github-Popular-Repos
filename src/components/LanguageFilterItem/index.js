// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, isActive, activeLanguageFilterItemId} = props
  const {id, language} = languageItem

  const languageName = isActive ? 'active' : 'btn'

  const getRepo = () => {
    activeLanguageFilterItemId(id)
  }

  return (
    <li>
      <button type="button" onClick={getRepo} className={languageName}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
