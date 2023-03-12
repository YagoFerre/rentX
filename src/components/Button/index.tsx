import React from 'react'
import { ActivityIndicator, TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components'
import { Container, Title } from './styles'

interface Props extends TouchableOpacityProps {
  title: string
  color?: string
  loading?: boolean
  light?: boolean
}

export function Button({
  title,
  color,
  loading = false,
  disabled = true,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme()
  return (
    <Container
      color={color || theme.colors.main}
      disabled={disabled}
      style={{ opacity: disabled === true || loading === true ? 0.5 : 1 }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  )
}
