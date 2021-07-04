import React, { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar/Sidebar'
import Profile from './components/Profile/Profile'
import Chat from './components/Chat/Chat'
import Login from './components/Login/Login'
import { connect } from 'react-redux'

function App(props) {
  const [currentSideComponent, setCurrentSideComponent] = useState('SideBar')
  return (
    //Add ! before props.user to allow Login Auth
    <div className='app'>
      {!props.user ? (
        <Login />
      ) : (
        <div className='app__body'>
          {currentSideComponent === 'SideBar' ? (
            <SideBar changeSideComponent={(componentName) => setCurrentSideComponent(componentName)} />
          ) : (
            <Profile changeSideComponent={(componentName) => setCurrentSideComponent(componentName)} />
          )}
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
