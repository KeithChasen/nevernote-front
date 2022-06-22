import React, {Fragment, useState} from 'react';
import styled from "@emotion/styled";
import {GENERICS, MIXINS} from "./GlobalStyle";
import { useListNotesQuery } from "../generated/graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaSort } from 'react-icons/fa'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

dayjs.extend(relativeTime);

export function ListNotes() {
    const { data, error } = useListNotesQuery();
    const [value, setValue] = useState("");
    return (
        <Fragment>
            <ListNotesStyle>
                <h2>All Notes</h2>
                <div className='note-filter'>
                    <span>{data?.listNotes.length} Notes</span>
                    <div className='filters'>
                        <span><FaSort /></span>
                    </div>
                </div>
                <div className="list-notes">
                    {data?.listNotes.map((note, i) => (
                        <div className={`note${i == 1 ? ' active' : ''}`}>
                            <div className='note-title'>{note.title}</div>
                            <div>{note.content}</div>
                            <small>{dayjs(note.created_at).fromNow()}</small>
                        </div>
                    ))}
                </div>
            </ListNotesStyle>
            <EditorContainer>
                <input placeholder='title' />
                <ReactQuill readOnly={true} theme='snow' placeholder="Start writing here..." />
            </EditorContainer>
        </Fragment>
    )
}

const ListNotesStyle = styled.div`
  height: 100%;
  width: 100%;
  max-width: 350px;
  color: ${GENERICS.colorBlackCalm};
  background: ${GENERICS.bgColor};
  
  > h2 {
    font-weight: normal;
    padding: 20px;
  }
  
  .note-filter {
    ${MIXINS.va('space-between')}
    padding: 15px 20px;
    border-bottom 1px solid #ccc;
    
    .list-notes {
      .active {
        background: #fff;
      }
      .note {
        padding: 20px;
        border-bottom: ${GENERICS.border};
        color: ${GENERICS.colorGrey};
        cursor: pointer;
        
        &:hover {
          background: #eee;
        }
        
        > div {
          margin-bottom: 5px;
        }
        
        .note-title {
          color: ${GENERICS.colorBlackCalm};
          font-weight: bold;
        }
      }
    }
  }
`;

const EditorContainer = styled.div`
    width: 100%;
    
    .quill > .ql-toolbar:first-child {
        display: none !important;
    }
    
    > input {
      border: none;
      outline: none;
      padding: 15px;
      font-size: 2em;
      width: 100%;
    }
    
    .ql-toolbar, .ql-container {
      border: none !important;
    }
    
    .quill, .ql-container {
      font-size: 1em;
      height: 100%;
    }
`;