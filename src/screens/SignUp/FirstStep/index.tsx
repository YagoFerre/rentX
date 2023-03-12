import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'

import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title,
} from './styles'

export function FirstStep() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [driverLicense, setDriverLicense] = useState('')

  const navigation = useNavigation<any>()

  function handleBack() {
    navigation.goBack()
  }

  async function handleSecondStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória.'),
        email: Yup.string()
          .email('E-mail inválido.')
          .required('E-mail é obrigatório.'),
        name: Yup.string().required('Nome é obrigatório.'),
      })

      const data = { name, email, driverLicense }
      await schema.validate(data)

      navigation.navigate('SecondStep', { user: data })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message)
      } else {
        Alert.alert(
          'Erro no cadastro.',
          'Ocorreu um erro ao cadastrar, verifique as credenciais.',
        )
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </Subtitle>

          <Form>
            <FormTitle>01. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              value={name}
              onChangeText={(value) => setName(value)}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={(value) => setDriverLicense(value)}
            />
          </Form>

          <Button title="Próximo" disabled={false} onPress={handleSecondStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
