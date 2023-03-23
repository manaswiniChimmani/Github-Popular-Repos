import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class GithubPopularRepos extends Component {
  state = {
    repositoriesList: [],
    languageActiveId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {languageActiveId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${languageActiveId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        name: eachRepository.name,
        avatarUrl: eachRepository.avatar_url,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
      }))
      this.setState({
        repositoriesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {repositoriesList} = this.state

    return (
      <ul className="repos-container">
        {repositoriesList.map(each => (
          <RepositoryItem key={each.id} repositoryData={each} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  activeLanguageFilterItemId = id => {
    this.setState({languageActiveId: id}, this.getRepositories)
  }

  renderLanguageFiltersList = () => {
    const {languageActiveId} = this.state

    return (
      <ul className="language-list">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            isActive={each.id === languageActiveId}
            languageItem={each}
            activeLanguageFilterItemId={this.activeLanguageFilterItemId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="container">
        <h1 className="h1">Popular</h1>
        {this.renderLanguageFiltersList()}
        {this.renderRepositories()}
      </div>
    )
  }

  //   state = {
  //     activId: languageFiltersData[0].id,
  //     reposList: [],
  //     isLoading: false,
  //     isfailer: false,
  //   }

  //   componentDidMount() {
  //     this.getRepos()
  //   }

  //   getRepos = async () => {
  //     const {activeId} = this.state
  //     this.setState({
  //       isLoading: true,
  //     })
  //     // const jwtToken = Cookies.get('jwt_token')
  //     const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
  //     // const options = {
  //     //   headers: {
  //     //     Authorization: `Bearer ${jwtToken}`,
  //     //   },
  //     //   method: 'GET',
  //     // }
  //     const response = await fetch(apiUrl)
  //     // console.log(response)
  //     if (response.ok) {
  //       const fetchedData = await response.json()
  //       const updatedData = fetchedData.popular_repos.map(each => ({
  //         name: each.name,
  //         id: each.id,
  //         issuesCount: each.issues_count,
  //         forksCount: each.forks_count,
  //         starsCount: each.stars_count,
  //         avatarUrl: each.avatar_url,
  //       }))
  //       this.setState({
  //         reposList: updatedData,
  //         isLoading: false,
  //       })
  //     } else {
  //       this.setState({
  //         isFailure: true,
  //         isLoading: false,
  //       })
  //     }
  //   }

  //   repoItem = id => {
  //     this.setState({activeId: id}, this.getRepos)
  //   }

  //   renderLoader = () => (
  //     <div data-testid="loader" className="loader-container">
  //       <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
  //     </div>
  //   )

  //   renderRepos = () => {
  //     const {isFailure, reposList} = this.state
  //     return (
  //       <div>
  //         {isFailure ? (
  //           <div>
  //             <img
  //               src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
  //               alt="failure view"
  //             />
  //             <p>Something went wrong</p>
  //           </div>
  //         ) : (
  //           <ul className="repos-container">
  //             {reposList.map(each => (
  //               <RepositoryItem repos={each} key={each.id} />
  //             ))}
  //           </ul>
  //         )}
  //       </div>
  //     )
  //   }

  //   renderReposList = () => {
  //     const {reposList, activeId, isLoading, isFailure} = this.state
  //     return (
  //       <div className="container">
  //         <h1 className="h1">Popular</h1>
  //         <ul className="language-list">
  //           {languageFiltersData.map(each => (
  //             <LanguageFilterItem
  //               data={each}
  //               key={each.id}
  //               repoItem={this.repoItem}
  //               isActive={each.id === activeId}
  //             />
  //           ))}
  //         </ul>
  //         {isLoading ? this.renderLoader() : this.renderRepos()}
  //         {/* {isLoading ? (
  //           this.renderLoader()
  //         ) : (  */}
  //         {/* {isLoading && this.renderLoader()}
  //         {isFailure && (
  //           <div>
  //             <p>asdf</p>
  //           </div>
  //         )}
  //         {!isFailure && (
  //           <ul className="repos-container">
  //             {reposList.map(each => (
  //               <RepositoryItem repos={each} key={each.id} />
  //             ))}
  //           </ul>
  //         )} */}
  //       </div>
  //     )
  //   }

  //   //   renderLoader = () => (
  //   //     <div data-testid="loader" className="loader-container">
  //   //       <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
  //   //     </div>
  //   //   )

  //   render() {
  //     const {isLoading} = this.state
  //     // return isLoading ? this.renderLoader() : this.renderReposList()
  //     return this.renderReposList()
  //   }
}
export default GithubPopularRepos
