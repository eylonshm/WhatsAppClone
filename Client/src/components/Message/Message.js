import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Message = (props) => {
    const [isMessageOwner, setMessageOwner] = useState()
    const [timeStamp, setTimeStamp] = useState()
    useEffect(() => {
        // let fds
        if (props.currentUserID === props.messageOwnerID) {
            setMessageOwner(true)
            // fds = 'true'
        } else {
            setMessageOwner(false)
            // fds = 'false'
        }
        // console.log(`Am i the owner: ${fds}`)
    }, [])

    useEffect(() => {
        var date = new Date(parseInt(props.messageTimestamp))
        setTimeStamp(
            date.toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute: '2-digit',
            })
        )
    }, [])

    return (
        <MessageWrapper isMessageOwner={isMessageOwner}>
            <MessageContent>{props.messageContent}</MessageContent>
            <TimeStamp>{timeStamp}</TimeStamp>
        </MessageWrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUserID: state.auth.user.uid,
    }
}

export default connect(mapStateToProps)(Message)

const MessageWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    width: fit-content;
    min-width: 100px;
    max-width: 550px;
    min-height: fit-content;
    min-height: 30px;
    padding: 1px;
    border-radius: 8px;
    word-wrap: break-word;
    box-shadow: 0px 1px 3px -2.5px black;
    background-color: ${(props) => (props.isMessageOwner ? '#DCF8C6' : 'white')};
    align-self: ${(props) => (props.isMessageOwner ? 'flex-end' : 'flex-start')};
`
const MessageContent = styled.span`
    align-self: center;
    margin-left: 8px;
    maegin-right: 12px;
    padding: 5px;
`
const TimeStamp = styled.span`
    align-self: flex-end;
    padding: 0px 6px 2px 20px;
    font-size: 11px;
    color: #8c8c8c;
`
