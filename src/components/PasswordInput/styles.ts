import { TextInput, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

interface Props {
  isFocused: boolean
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`

export const IconContainer = styled.View<Props>`
  padding: 19px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-right: 2px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`

export const InputText = styled(TextInput)<Props>`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`

export const ChangePasswordVisibilityButton = styled(TouchableOpacity).attrs({
  activeOpacity: 10,
})`
  justify-content: center;
  align-items: center;

  padding: 0 23px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`
