import React from 'react'
import styled from 'styled-components'

const DateTag = () => {
    return (
        <DateTagWrapper>
            <DateTagContent>Today</DateTagContent>
        </DateTagWrapper>
    )
}

export default DateTag

const DateTagWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    width: fit-content;
    min-width: 40px;
    max-width: 300px;
    min-height: fit-content;
    padding: 1px;
    border-radius: 8px;
    word-wrap: break-word;
    box-shadow: 0px 1px 3px -2.5px black;
    background-color: #e0f3fa;
    align-self: center;
`
const DateTagContent = styled.span`
    align-self: center;
    margin-left: 4px;
    margin-right: 4px;
    padding: 5px;
`
