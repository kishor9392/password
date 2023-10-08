import {Component} from 'react'

import {v4} from 'uuid'

import PasswordManager from '../PasswordManager'

import './index.css'

class PasswordAdd extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    list: [],
    showPassword: false,
  }

  submit = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const newList = {
      id: v4(),
      username,
      website,
      password,
    }

    this.setState(prevState => ({
      list: [...prevState.list, newList],
      username: '',
      password: '',
      website: '',
      search: '',
    }))
  }

  onWebsite = event => {
    this.setState({website: event.target.value})
  }

  onName = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSearch = event => {
    this.setState({search: event.target.value})
  }

  onShow = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onDelete = id => {
    this.setState(prevState => ({
      list: prevState.list.filter(each => each.id !== id),
    }))
  }

  render() {
    const {username, website, password, list, search, showPassword} = this.state

    const searchResults = list.filter(eachDestination =>
      eachDestination.website.toLowerCase().includes(search.toLowerCase()),
    )

    const len = searchResults.length
    return (
      <div>
        <div className="bg1">
          <div className="bg2">
            <h1 className="h1">Add New Password</h1>
            <form onSubmit={this.submit}>
              <div className="bg3">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="img2"
                />
                <hr className="line" />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  onChange={this.onWebsite}
                  value={website}
                />
              </div>

              <div className="bg3">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="img2"
                />
                <hr className="line" />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.onName}
                  value={username}
                />
              </div>

              <div className="bg3">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="img2"
                />
                <hr className="line" />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  onChange={this.onPassword}
                  value={password}
                />
              </div>

              <div className="bg8">
                <button type="submit" className="btn">
                  Add
                </button>
              </div>
            </form>
          </div>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
            alt="password manager"
            className="img3"
          />
        </div>

        <div className="bg7">
          <div className="b">
            <div className="bg4">
              <h1 className="h2">Your Passwords</h1>

              <div className="bg5">
                <p className="p2">{len}</p>
              </div>
            </div>

            <div className="bg6">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="img2"
              />

              <hr className="line" />

              <input
                type="search"
                className="input"
                placeholder="search"
                onChange={this.onSearch}
                value={search}
              />
            </div>
          </div>

          <hr className="line2" />

          <form className="bg8">
            <input
              type="checkbox"
              id="checkbox"
              className="input2"
              onChange={this.onShow}
            />
            <label htmlFor="checkbox" className="p3">
              Show Passwords
            </label>
          </form>

          <ul className="back">
            {len === 0 ? (
              <div className="b2">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  className="i2"
                  alt="no passwords"
                />

                <p className="p">No Passwords</p>
              </div>
            ) : (
              searchResults.map(each => (
                <PasswordManager
                  key={each.id}
                  item={each}
                  showPassword={showPassword}
                  onDelete={this.onDelete}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordAdd
