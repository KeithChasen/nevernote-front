import React, {ChangeEvent, Fragment, useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {GENERICS, MIXINS} from "./GlobalStyle";
import {Note, useListNotesQuery} from "../generated/graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaSort } from 'react-icons/fa'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

dayjs.extend(relativeTime);

interface EditorProps {
    disabled: boolean
}

export function ListNotes() {
    const { data, error } = useListNotesQuery();
    const [noteForm, setNoteForm] = useState({
        title: '',
        content: ''
    });
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const onChangeEditorHandler = (value: string) =>
        setNoteForm(prevNote => ({...prevNote, content: value}));

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setNoteForm({...noteForm, title: e.target.value});

    useEffect(() => {
        console.log(noteForm)
    }, [noteForm]);

    const onSelect = (note: Note) => () => {
        setSelectedNote(note);
        setNoteForm({
            title: note.title,
            content: note.content
        });
    }

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
                    {data?.listNotes.map(note => (
                        <div
                            key={note.id}
                            className={`note${selectedNote?.id == note.id ? ' active' : ''}`}
                            onClick={onSelect(note as any)}
                        >
                            <div className='note-title'>{note.title}</div>
                            <div>{note.content}</div>
                            <small>{dayjs(note.created_at).fromNow()}</small>
                        </div>
                    ))}
                </div>
            </ListNotesStyle>
            <EditorContainer disabled={!selectedNote}>
                <input
                    value={noteForm.title}
                    placeholder='title'
                    disabled={!selectedNote}
                    onChange={onChangeTitleHandler}
                />
                <ReactQuill
                    value={noteForm.content}
                    readOnly={!selectedNote}
                    theme='snow'
                    placeholder="Start writing here..."
                    onChange={onChangeEditorHandler}
                />
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

const EditorContainer = styled.div<EditorProps>`
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
      
      &:disabled {
        background: transparent;
        cursor: not-allowed;
      }
    }
    
    .ql-toolbar, .ql-container {
      border: none !important;
    }
    
    .quill, .ql-container {
      font-size: 1em;
      height: 100%;
      cursor: ${(props: any) => (props.disabled ? 'not-allowed;' : 'unset;')}
    }
    
    .ql-toolbar,
    .ql-editor {
      cursor: ${(props: any) => (props.disabled ? 'not-allowed;' : 'unset;')}
    }
`;