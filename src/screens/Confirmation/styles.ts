import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};

  padding-top: 92px;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding-bottom: 80px;
`

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.background_secondary};

  margin-top: 40px;
`

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text_detail};

  text-align: center;

  margin-top: 16px;
`

export const Footer = styled.View`
  width: 100%;
  align-items: center;

  margin: 80px 0;
`

export const WrapperLogo = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
