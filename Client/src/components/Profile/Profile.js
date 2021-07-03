import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import ArrowBack from '@material-ui/icons/ArrowBack'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Avatar from '@material-ui/core/Avatar'

const Profile = (props) => {
    const [userAvatarHover, setUserAvatarHover] = useState(false)
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
