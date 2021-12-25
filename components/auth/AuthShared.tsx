import styled from "styled-components/native";

interface TextInputFormInterface {
  lastOne?: boolean;
}

export const TextInputForm = styled.TextInput<TextInputFormInterface>`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  margin-bottom: ${(props) => (props.lastOne ? 15 : 8)}px;
  border-radius: 4px;
  color: white;
  width: 100%;
`;
