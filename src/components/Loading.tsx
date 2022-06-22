import {Layout} from "./Layout";
import {Wrapper} from "./Wrapper";
import {FaSpinner} from "react-icons/fa";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import {GENERICS} from "./GlobalStyle";

export default function Loading() {
    return (
        <Layout>
            <Wrapper center>
                <SpinnerContainer>
                    <FaSpinner />
                </SpinnerContainer>
            </Wrapper>
        </Layout>
    )
}

const Spinning = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.span`
    font-size: 3em;
    color: ${GENERICS.primaryColor};
    animation: ${Spinning} 2s linear infinite;
`;
