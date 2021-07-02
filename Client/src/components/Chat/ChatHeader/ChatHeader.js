import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import picSrc from '../../Functions/picSrcGenerator'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import Search from '@material-ui/icons/Search'
import MoreVert from '@material-ui/icons/MoreVert'
import { connect } from 'react-redux'
import { db } from '../../../firebase'

const ChatHeader = (props) => {
    const [chat, setChat] = useState(null)

    useEffect(() => {
        console.log('ChatHeader is re-renderd')
        const unsucscribe = db
            .collection('chats')
            .doc(props.chatID)
            .onSnapshot((snapshot) => {
                console.log(`Chat is:`)
                console.log(snapshot.data())
                setChat(snapshot.data())
            })
        return () => {
            unsucscribe()
        }
    }, [props.chatID])

    return (
        <ChatHeaderWrapper>
            <Avatar src={picSrc()} />
            <ChatHeaderInfo>
                <h3>{chat ? chat.name : 'Chat name'}</h3>
                <p>Last seen at..</p>
            </ChatHeaderInfo>
            <CharHeaderRight>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
                <IconButton>
                    <SearchIcon></SearchIcon>
                </IconButton>
            </CharHeaderRight>
        </ChatHeaderWrapper>
    )
}
const mapStateToProps = (state) => {
    return {
        chatID: state.chats.currentChatID,
    }
}

export default connect(mapStateToProps)(ChatHeader)

const ChatHeaderWrapper = styled.div`
    display: flex;
    padding: 20px;
    align-items: center;
    border-bottom: 1px solid lightgray;
`
const ChatHeaderInfo = styled.div`
    flex: 1;
    padding-left: 20px;

    & > h3 {
        margin-bottom: 3px;
        font-weight: 500;
    }
    & > p {
        color: gray;
    }
`
const CharHeaderRight = styled.div`
    display: flex;
    justify-content: space-between;
    min-width: 100px;
`
const SearchIcon = styled(Search)``
const MoreVertIcon = styled(MoreVert)``
