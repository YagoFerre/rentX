import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 109px;
  height: 92px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_primary};

  min-width: 26%;
  flex: 1;

  margin-right: 8px;
  margin-bottom: 8px;
`

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;

  color: ${({ theme }) => theme.colors.text_detail};
`
