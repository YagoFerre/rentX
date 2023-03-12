import React, { useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'

import { api } from '../../../services/api'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Button } from '../../../components/Button'
import { PasswordInput } from '../../../components/PasswordInput'

import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title,
} from './styles'

interface Params {
  user: {
    name: string
    email: string
    driverLicense: string
  }
}

export function SecondStep() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const navigation = useNavigation<any>()
  const route = useRoute()
  const theme = useTheme()

  const { user } = route.params as Params

  function handleBack() {
    navigation.goBack()
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação.')
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais.')
    }

    await api
      .post(`/users`, {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          nextScreenRoute: 'SignIn',
          title: 'Conta Criada!',
          message: `Agora é so fazer login\n e aproveitar.`,
        })
      })
      .catch(() => {
        Alert.alert('Opa', 'Não foi possível cadastrar.')
      })
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </Subtitle>

          <Form>
            <FormTitle>02. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              value={passwordConfirm}
              onChangeText={(value) => setPasswordConfirm(value)}
            />
          </Form>

          <Button
            title="Cadastrar"
            disabled={false}
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
