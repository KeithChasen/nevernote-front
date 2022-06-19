import React from 'react';
import styled from "@emotion/styled";
import {GENERICS, MIXINS} from "./GlobalStyle";
import { FaChevronDown, FaSignOutAlt } from 'react-icons/fa';

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
        </NavigationStyled>
    );
}

const NavigationStyled = styled.div`
  width: 100%;
  height: 100%;
  max-width: 300px;
  background: ${GENERICS.colorBlackCalm};
  color: #f3f3f3;
  
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
`;
