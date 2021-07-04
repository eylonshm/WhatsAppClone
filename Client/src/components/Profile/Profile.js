import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import ArrowBack from '@material-ui/icons/ArrowBack'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Avatar from '@material-ui/core/Avatar'
import Create from '@material-ui/icons/Create'
import Done from '@material-ui/icons/Done'

const Profile = (props) => {
  const [userAvatarHover, setUserAvatarHover] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [userName, setUserName] = useState(props.user?.displayName)
  const inputElement = useRef(null)

  const updateUserNameOnDb = async () => {
    try {
      await props.user.updateProfile({
        displayName: userName,
      })
      console.log(props.user.displayName)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ProfileWrapper>
      <ProfileHeader>
        <ArrowBackIcon style={{ fontSize: 28 }} />
        <OptionNameHeader>Profile</OptionNameHeader>
      </ProfileHeader>
      <ProfileSection>
        <ImageWrapper>
          <UserAvatar
            style={{ height: '180px', width: '180px' }}
            src={props.user?.photoURL}
            // onMouseEnter={() => {
            //     setUserAvatarHover(true)
            //     console.log(userAvatarHover)
            // }}
            // onmouseleave={() => {
            //     setUserAvatarHover(false)
            //     console.log(userAvatarHover)
            // }}
          ></UserAvatar>
          <ChangeProfilePictureWrapper>
            <PhotoCameraIcon />
            <span style={{ display: 'block' }}>{`${props.user?.photoURL ? 'Change' : 'Add'} Profile`}</span>
            <span style={{ display: 'block' }}>picture</span>
          </ChangeProfilePictureWrapper>
        </ImageWrapper>
        <ChangeNameWrapper>
          <h4>Your name</h4>
          {editingName ? (
            <DoneIcon
              onClick={() => {
                setEditingName(!editingName)
                updateUserNameOnDb()
              }}
            />
          ) : (
            <CreateIcon
              onClick={() => {
                setEditingName(!editingName)
                inputElement.current.focus()
              }}
            />
          )}
          <UserNameInput
            ref={inputElement}
            maxLength='25'
            type='text'
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            readOnly={!editingName}
          />
          {editingName && <InputLine />}
        </ChangeNameWrapper>
      </ProfileSection>
    </ProfileWrapper>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.25;
  overflow: hidden;
`
const ProfileHeader = styled.div`
  display: flex;
  height: 135px;
  border-right: 1px solid lightgray;
  background-color: #00bfa5;
  align-items: flex-end;
  justify-content: flex-start;
`

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`

const ArrowBackIcon = styled(ArrowBack)`
  color: white;
  margin: 20px;
  fontsize: 20;
  cursor: pointer;
`
const OptionNameHeader = styled.p`
  color: white;
  margin: 20px 0;
  font-size: 20px;
  font-weight: bold;
`

const ImageWrapper = styled.div`
  height: 180px;
  width: 180px;
  position: relative;
  margin-top: 50px;
`
const ChangeProfilePictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  z-index: -1;
  top: 70px;
  left: 60px;
  ${ImageWrapper}:hover & {
    z-index: 1;
  }
  > span {
    font-size: 12px;
    color: #f5f5f5;
    display: inline-block;
  }
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  ${ImageWrapper}:hover & {
    filter: brightness(70%);
  }
`
const PhotoCameraIcon = styled(PhotoCamera)`
  color: white;
  margin-bottom: 5px;
`
const ChangeNameWrapper = styled.div`
  background-color: white;
  margin-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 100%;
  height: 80px;

  > h4 {
    margin: 12px;
    color: #009688;
    font-weight: 200;
    font-size: 14px;
  }
`
const CreateIcon = styled(Create)`
  cursor: pointer;
  color: #919191;
  margin-left: 10px;
  margin-bottom: -3px;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
`
const DoneIcon = styled(Done)`
  cursor: pointer;
  color: #919191;
  margin-left: 10px;
  margin-bottom: -4px;
`
const UserNameInput = styled.input`
  border: none;
  :focus {
    outline: none;
  }
`
const InputLine = styled.div`
  background-color: #00bfa5;
  width: 93.5%;
  height: 0.1em;
  margin-left: 10px;
`
