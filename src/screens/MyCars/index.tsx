import { useNavigation } from '@react-navigation/native'
import { StatusBar, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { BackButton } from '../../components/BackButton'
import { CarDTO } from '../../dtos/CarDTO'

import {
  Appointments,
  AppointmentsQuantity,
  AppointmentsTitle,
  CarFooter,
  CarFooterDate,
  CarFooterPeriod,
  CarFooterTitle,
  CarWrapper,
  Container,
  Content,
  Header,
  SubTitle,
  Title,
} from './styles'
import { api } from '../../services/api'
import { Car } from '../../components/Car'
import { AntDesign } from '@expo/vector-icons'
import { Load } from '../../components/Load'

interface CarProps {
  id: string
  user_id: string
  car: CarDTO
  startDate: string
  endDate: string
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
  const navigation = useNavigation<any>()

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/schedules_byuser?user_id=1`)
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handleBack}
          color={theme.colors.background_secondary}
        />

        <Title>
          Seus agendamentos,{'\n'}
          estão aqui.
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.text_detail}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  )
}
