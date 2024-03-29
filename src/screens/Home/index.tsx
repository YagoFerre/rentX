import React, { useEffect, useState } from 'react'

import { StatusBar } from 'react-native'
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles'

import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import { Car } from '../../components/Car'
import { useNavigation } from '@react-navigation/native'

import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'
import { Load } from '../../components/Load'

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation<any>()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    let isMounted = true

    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        if (isMounted) {
          setCars(response.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCars()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>
            {loading ? '' : `Total de ${cars.length} carros`}
          </TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  )
}
