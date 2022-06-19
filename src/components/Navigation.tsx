import React from 'react';
import styled from "@emotion/styled";
import {GENERICS, MIXINS} from "./GlobalStyle";
import { FaSearch, FaSignOutAlt, FaPlus } from 'react-icons/fa';

export function Navigation() {
    return (
        <NavigationStyled>
            <div className='user-profile'>
                <div>N</div>
                <span>Name</span>
                <span>
                  <FaSignOutAlt />
                </span>
            </div>
            <div className="search-container">
                <FaSearch />
                <input placeholder="Search"/>
            </div>
            <div className="newnote-button">
                <FaPlus />
                <span>New Note</span>
            </div>
        </NavigationStyled>
    );
}

const NavigationStyled = styled.div`
  width: 100%;
  height: 100%;
  max-width: 300px;
  background: ${GENERICS.colorBlack};
  color: #ccc;
  
  .user-profile {
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    align-items: center;
    padding: 20px;
    gap: 10px;
    
    > div:first-child {
      width: 30px;
      height: 30px;
      background: ${GENERICS.primaryColor};
      color: white;
      border-radius: 50%;
      ${MIXINS.va()}
    }
    
    > span:nth-child(2) {
      white-space: nowrap;
    } 
    
    > span:last-child {
      justify-self: flex-end;
      cursor: pointer;
      transition: 1s;
      padding: 5px;
      
      &:hover {
        color: red;
      }
    }
  }
  
  .search-container {
      ${MIXINS.va()}
      background: ${GENERICS.colorBlackCalm};
      border-radius: 30px;
      padding: 10px 5px;
      margin: 0 20px;
      margin-bottom: 10px;
      
      > input {
        color: #ccc;
        background: transparent;
        border: none;
        outline: none;
        margin-left: 10px;
        font-size: 16px;
      }
  }
  
  .newnote-button {
    ${MIXINS.va('left')}
    gap: 10px;
    color: white;
    background: ${GENERICS.primaryColor};
    border-radius: 30px;
    padding: 10px 35px;
    margin: 0 20px;
    cursor: pointer;
    
    &:hover {
      background: ${GENERICS.primaryColorDark}
    }
  }
`;
