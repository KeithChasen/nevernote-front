import React from 'react';
import styled from "@emotion/styled";
import { GENERICS } from "./GlobalStyle";
import { useListNotesQuery } from "../generated/graphql";

export function ListNotes() {
    const { data, error } = useListNotesQuery();
    return (
        <ListNotesStyle>
            <h2>All Notes</h2>
            <div>
                <span>
                    {data?.listNotes.length}
                </span>
            </div>
            <div>
                <pre>{JSON.stringify(data?.listNotes, null, 2)}</pre>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
        </ListNotesStyle>
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
`;