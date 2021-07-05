import React, { useEffect, useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import DonutLarge from '@material-ui/icons/DonutLarge'
import Chat from '@material-ui/icons/Chat'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import MoreVert from '@material-ui/icons/MoreVert'
import Search from '@material-ui/icons/Search'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import SideBarChat from '../SidebarChat/SidebarChat'
import { db, auth, getFileURL } from '../../firebase'
import * as actions from '../../store/actions/index'

const Sidebar = (props) => {
  const [chats, setChats] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchIcon, setSearchIcon] = useState(true)
  const [optionsMenuIsOpen, setOptionsMenuIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  useEffect(() => {
    async function fetchData() {
      console.log('SideBar RENDER')
      const chatIds = await (await fetch('http://localhost:8080/getchats/hygHI6aSkL9zteRlWW9c')).json()
      const chatIdsArray = chatIds.userChats
      db.collection('chats').onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => {
            if (chatIdsArray.includes(doc.id.toString())) {
              return {
                id: doc.id,
                data: doc.data(),
              }
            }
          }),
        ),
      )
    }
    fetchData()
  }, [])

  useEffect(() => {
    fetchAndSetUserImageUrl()
  }, [])

  const fetchAndSetUserImageUrl = async () => {
    const imageUrl = await getFileURL(`ProfileImages/${props.user.uid}`)
    setImageSrc(imageUrl)
  }

  const logout = async () => {
    try {
      await auth.signOut()
      console.log('Sign-out successful')
      props.onSetUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  const searchHandler = (event) => {
    setSearchInput(event.target.value)
  }

  const inputClickHandler = () => {
    console.log('Search Icon:' + searchIcon)
    setSearchIcon(!searchIcon)
  }

  const optionsClickHandler = (event) => {
    if (event) setAnchorEl(anchorEl ? null : event.currentTarget)
    setOptionsMenuIsOpen(!optionsMenuIsOpen)
  }
  return props.user ? (
    <SideBarWrapper>
      <SideBarHeader>
        <Zoom in={imageSrc || props.user?.photoURL} style={{ transitionDelay: imageSrc || props.user?.photoURL ? '300ms' : '0ms' }}>
          <Avatar src={imageSrc || props.user.photoURL} onClick={() => props.changeSideComponent('Profile')} style={{ cursor: 'pointer' }} />
        </Zoom>
        <SideBarHeaderRight>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton
            onClick={(event) => {
              optionsClickHandler(event)
            }}
            aria-controls={optionsMenuIsOpen ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
          >
            <MoreVertIcon />
          </IconButton>
          <Popper open={optionsMenuIsOpen} placement='bottom-end' transition disablePortal anchorEl={anchorEl}>
            {({ TransitionProps }) => (
              // There's no error when removing Grow Element --> Find Problem with Grow Element and AnchorSet to null
              <Grow {...TransitionProps} style={{ transformOrigin: 'center bottom' }}>
                <Paper>
                  <ClickAwayListener onClickAway={optionsClickHandler}>
                    <MenuList autoFocusItem={optionsMenuIsOpen} id='menu-list-grow'>
                      <MenuItem onClick={(optionsClickHandler, () => props.changeSideComponent('Profile'))}>Profile</MenuItem>
                      <MenuItem onClick={optionsClickHandler}>My account</MenuItem>
                      <MenuItem onClick={(optionsClickHandler, logout)}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </SideBarHeaderRight>
      </SideBarHeader>
      <SideBarSearch>
        <SideBarSearchContainer>
          {searchIcon ? <SearchIcon /> : <ArrowBackIcon />}
          <SideBarSearchInput
            placeholder='Search or start new chat'
            value={searchInput}
            onChange={(event) => searchHandler(event)}
            onBlur={inputClickHandler}
            onFocus={inputClickHandler}
          />
        </SideBarSearchContainer>
      </SideBarSearch>
      <SideBarChats>
        {chats.map((chat) => {
          if (chat) {
            if (chat.data.name.toLowerCase().includes(searchInput.toLowerCase())) {
              return <SideBarChat key={chat.id} id={chat.id} chatName={chat.data.name} />
            }
          }
        })}
      </SideBarChats>
    </SideBarWrapper>
  ) : null
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSetUser: (user) => dispatch(actions.setUser(user)),
    onSetCurrentChat: (chatID) => dispatch(actions.setCurrentChat(chatID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.25;
`
const SideBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-right: 1px solid lightgray;
`
const SideBarHeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 10vw;
`
const SideBarSearch = styled.div`
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  height: 39px;
  padding: 10px;
`
const SideBarSearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 35px;
  border-radius: 20px;
`
const SideBarChats = styled.div`
  background-color: white;
  flex: 1;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
    opacity: 0.2;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    opacity: 0.2;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgb(245, 245, 245);
    opacity: 0.4;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    opacity: 0.2;
  }

  // Scroll without ScrollBar
  // overflow: scroll;
  // ::-webkit-scrollbar {
  //     display: none;
`
const DonutLargeIcon = styled(DonutLarge)`
  // margin-right: 1.5vw;
  // font-size: 24px !importent;
`
const ChatIcon = styled(Chat)`
  // margin-right: 1.5vw;
  // font-size: 24px !importent;
`
const MoreVertIcon = styled(MoreVert)`
  // margin-right: 1.5vw;
  // font-size: 24px !importent;
`
const SearchIcon = styled(Search)`
  color: gray;
  padding: 10px;
`
const ArrowBackIcon = styled(ArrowBack)`
    color: #3fbaf4;
    padding: 10px;
    &::-webkit-transition: -webkit-transform 1s;
    &::-webkit-transform: rotate(40deg);
  
`
const SideBarSearchInput = styled.input`
  border: none;
  margin-left: 10px;
  border: none;
  outline: none;
`
