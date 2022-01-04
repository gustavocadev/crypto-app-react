import styled from "@emotion/styled";

const Text = styled.section`
  background-color: #b24b;
  color: white;
  padding: 12px;
  font-size: 18px;
  border-radius: 8px;
`;

const Error = ({ children }: { children: string }) => {
  return <Text>{children}</Text>;
};

export default Error;
