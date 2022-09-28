import styled from 'styled-components';

export const LabelName = styled.p`
  margin-bottom: ${p => p.theme.space[2]}px;
`;

export const AddButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  padding: ${p => p.theme.space[3]}px;
  margin-top: ${p => p.theme.space[4]}px;
  border-radius: ${p => p.theme.radii.sm};
  cursor: pointer;

  &:active {
    background-color: ${p => p.theme.colors.accent};
  }
`;
