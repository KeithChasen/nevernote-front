import React from 'react';
import { Wrapper } from "../components/Wrapper";
import { Navigation } from "../components/Navigation";
import { ListNotes } from "../components/ListNotes";
import styled from "@emotion/styled";

export function Home() {
    return (
        <HomeStyled>
            <Navigation />
            <ListNotes />
        </HomeStyled>
    );
}

const HomeStyled = styled(Wrapper)`
  display: flex;
`;
