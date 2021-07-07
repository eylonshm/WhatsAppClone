import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ArrowDown from '@material-ui/icons/KeyboardArrowDown'
// import { adminAuth } from '../../firebase'

const Message = (props) => {
  const [isMessageOwner, setMessageOwner] = useState()
  const [timeStamp, setTimeStamp] = useState()
  const [authorDisplayName, setAuthorDisplayName] = useState('Unknown')
  useEffect(() => {
    async function authorDisplayFetch() {
      if (props.user.uid === props.messageOwnerID) {
        setMessageOwner(true)
      } else {
        setMessageOwner(false)
        // const authorDoc = await adminAuth.getUser(props.messageOwnerID)
        // console.log(authorDoc.displayName)
        //   setAuthorDisplayName(messageOwner.displayName)
      }
    }
    authorDisplayFetch()
  }, [])

  useEffect(() => {
    var date = new Date(parseInt(props.messageTimestamp))
    setTimeStamp(
      date.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      }),
    )
  }, [])

  return (
    <MessageWrapper isMessageOwner={isMessageOwner}>
      {/* <MessageHeader isMessageOwner={isMessageOwner}> */}
      {!isMessageOwner && <MessageAuthor>{authorDisplayName}</MessageAuthor>}
      <ArrowBackground isMessageOwner={isMessageOwner}>
        <ArrowDownIcon />
      </ArrowBackground>
      {/* </MessageHeader> */}
      <MessageBody>
        <MessageContent>{props.messageContent}</MessageContent>
        <TimeStamp isMessageOwner={isMessageOwner}>{timeStamp}</TimeStamp>
      </MessageBody>
    </MessageWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Message)

const MessageWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 4px;
  min-width: 100px;
  max-width: 550px;
  max-height: 500px;
  height: fit-content;
  padding: ${(props) => (props.isMessageOwner ? '3px' : '1px')};
  border-radius: 8px;
  box-shadow: 0px 1px 3px -2.5px black;
  background-color: ${(props) => (props.isMessageOwner ? '#DCF8C6' : 'white')};
  align-self: ${(props) => (props.isMessageOwner ? 'flex-end' : 'flex-start')};
`

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  z-index: 1;
  width: auto;
  overflow: hidden;
  max-height: ${(props) => (props.isMessageOwner ? '0' : '20')};
`

const MessageBody = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  z-index: 1;
  width: auto;
  height: auto;
  overflow: hidden;
  margin-bottom: 4px;
`
const MessageContent = styled.span`
  align-self: center;
  margin-left: 8px;
  font-size: 14px;
  height: auto;
  max-width: 550px;
  display: inline-block;
  word-break: break-word;
  overflow: hidden;
  cursor: context-menu;
`
const TimeStamp = styled.span`
  align-self: flex-end;
  padding: 0px 6px 0 20px;
  font-size: 10px;
  z-index: 1;
  color: #8c8c8c;
  margin-bottom: ${(props) => (props.isMessageOwner ? '-2px' : '0')};
  cursor: context-menu;
`
const MessageAuthor = styled.span`
  font-size: 11px;
  margin-left: 8px;
  margin-top: 3px;
  padding: 0;
  color: blue;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`

const ArrowBackground = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 4px;
  right: 2px;
  z-index: -1;
  opacity: 0;
  width: 40px;
  height: 20px;
  border-radius: 8px;
  -webkit-transition: opacity 0.2s ease-in-out;
  -moz-transition: opacity 0.2s ease-in-out;
  -ms-transition: opacity 0.2s ease-in-out;
  -o-transition: opacity 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out;

  background-color: ${(props) => (props.isMessageOwner ? '#DCF8C6' : 'white')};
  ${MessageWrapper}:hover & {
    z-index: 2;
    opacity: 1;
  }
`
const ArrowDownIcon = styled(ArrowDown)`
  z-index: -1;
  transition: all 0.2s;
  color: #a9a9a9;
  opacity: 0;
  justify-self: end;
  cursor: pointer;
  //css animation
  transform: translateX(20%);
  transition: 0.3s ease-out;
  ${MessageWrapper}:hover & {
    z-index: 3;
    opacity: 0.8;
    transform: translateX(0);
    transition: 0.4s ease-out;
  }
`
