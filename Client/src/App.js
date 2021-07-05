import React, { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar/Sidebar'
import Profile from './components/Profile/Profile'
import Chat from './components/Chat/Chat'
import Login from './components/Login/Login'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

function App(props) {
  const [currentSideComponent, setCurrentSideComponent] = useState('SideBar')

  const SideBarComponent = (sideComponentName) => {
    switch (sideComponentName) {
      case 'Profile':
        return <Profile changeSideComponent={(componentName) => setCurrentSideComponent(componentName)} />
      default:
        return <SideBar changeSideComponent={(componentName) => setCurrentSideComponent(componentName)} />
    }
  }
  return (
    //Add ! before props.user to allow Login Auth
    <div className='app'>
      {!props.user ? (
        <Login />
      ) : (
        <div className='app__body'>
          {SideBarComponent(currentSideComponent)}
          <Chat />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(App)
