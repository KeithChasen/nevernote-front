import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import { GENERICS, MIXINS } from "./GlobalStyle";
import {
    FaSearch,
    FaSignOutAlt,
    FaPlus,
    FaBook
} from 'react-icons/fa';
import {
    ListNotesDocument,
    useAddNoteMutation,
    useListNotesQuery,
    useLogoutMutation,
    useMeQuery
} from "../generated/graphql";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../helper/auth";
import { debounce } from "../helper/debounce";

export function Navigation() {
    const [submitLogout, { client }] = useLogoutMutation();
    const { data } = useMeQuery();
    const [submitAddNote] = useAddNoteMutation();
    const [searchText, setSearchText] = useState('');
    const { refetch } = useListNotesQuery();

    const navigate = useNavigate();

    const onLogoutHandler = async () => {
        try {
            await submitLogout();
            await client.resetStore();
            clearToken();
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    }

    const onAddNoteHandler = async () => {
        try {
            const note = await submitAddNote({
                variables: {
                    content: 'Content',
                    title: 'Title'
                }
            });
            const { listNotes } = client.readQuery({ query: ListNotesDocument});
            client.writeQuery({
                query: ListNotesDocument,
                data: {
                    listNotes: [note.data?.addNote, ...listNotes]
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const onSearchHandler = debounce( async () => {
        await refetch({
            search: searchText
        })
            .then(({ data: { listNotes }}) => {
                client.writeQuery({
                    query: ListNotesDocument,
                    data: {
                        listNotes
                    }
                })
            })
    }, 1000);

    useEffect(() => {
        onSearchHandler();
    }, [searchText]);

    return (
        <NavigationStyled>
            <div className='user-profile'>
                <div>{data?.me?.username.substr(0,1).toUpperCase()}</div>
                <span>{data?.me?.username}</span>
                <span onClick={onLogoutHandler}>
                  <FaSignOutAlt />
                </span>
            </div>
            <div className="search-container">
                <FaSearch />
                <input
                    placeholder="Search"
                    value={searchText}
                    onChange={({ target }) => setSearchText(target.value)}
                />
            </div>
            <div className="newnote-button" onClick={onAddNoteHandler}>
                <FaPlus />
                <span>New Note</span>
            </div>
            <ul className="navs-menu">
                <li>
                    <FaBook />
                    <span>All Notes</span>
                </li>
            </ul>
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
    
    > span:nth-of-type(1) {
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
      padding: 10px;
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
  
  .active {
    background: #444;
  }
  
  .navs-menu {
    margin-top: 30px;
    
    > li {
      padding: 10px 55px;
      width: 100%;
      gap: 10px;
      ${MIXINS.va('left')}
      cursor: pointer;
      
      &:hover {
        background: #333;
      }
    }
  }
`;
