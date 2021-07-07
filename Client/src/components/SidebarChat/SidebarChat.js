import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import picSrc from '../Functions/picSrcGenerator'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import { db } from '../../firebase'

const SidebarChat = ({ id, chatName, addNewChat, onSetCurrentChat }) => {
  const [lastMessage, setLastMessage] = useState()
  const createNewChat = () => {}
  const chatLogo = useMemo(() => {
    return picSrc()
  }, [])

  useEffect(() => {
    console.log(`This is the chat id ===> ${id}`)
    const unsubscribe = db
      .collection('chats')
      .doc(`${id}`)
      .collection('messages')
      .orderBy('timeStamp', 'desc')
      .limit(1)
      .onSnapshot((snapshot) => {
        setLastMessage(
          snapshot.docs.map((msg) => ({
            authorID: msg.data().authorID,
            messageContent: msg.data().messageContent,
            timeStamp: new Date(parseInt(msg.data().timeStamp)).toLocaleTimeString(navigator.language, {
              hour: '2-digit',
              minute: '2-digit',
            }),
          })),
        )
      })
    return () => {
      unsubscribe()
    }
  }, [])

  return !addNewChat ? (
    <SideBarChatWrapper onClick={() => onSetCurrentChat(id)}>
      <Avatar src={chatLogo} />
      <SideBarLeft>
        <h2>{chatName}</h2>
        <p>{lastMessage ? `${lastMessage[0].messageContent}` : ''}</p>
      </SideBarLeft>
      <SideBarRight>
        <p>{lastMessage ? `${lastMessage[0].timeStamp}` : ''}</p>
      </SideBarRight>
    </SideBarChatWrapper>
  ) : (
    <SideBarChatWrapper onClick={createNewChat}>
      <h2>Add New Chat</h2>
    </SideBarChatWrapper>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSetCurrentChat: (chatID) => dispatch(actions.setCurrentChat(chatID)),
  }
}

export default connect(null, mapDispatchToProps)(SidebarChat)

const SideBarChatWrapper = styled.div`
  display: flex;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid #f6f6f6;
  max-width: 300px;
  max-height: 55px;
  overflow: hidden;

  &:hover {
    background-color: #ebebeb;
  }
`
const SideBarLeft = styled.div`
  margin-left: 15px;
  & > h2 {
    font-size: 16px;
    margin-bottom: 8px;
  }
  & > p {
    color: rgba(0, 0, 0, 0.6);
  }
`
const SideBarRight = styled.div`
  padding: 0 5px;
  margin-left: auto;
  color: rgb(160, 160, 160);
  font-size: 13.5px;
`
