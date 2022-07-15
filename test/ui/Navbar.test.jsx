import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../src/auth/context/AuthContext'
import { Navbar } from '../../src/ui/components/Navbar'

const mockedUseNavigate = jest.fn()

/*Mock de una libreria */
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
  }
})

describe('Pruebas en el <Navbar />', () => {

  const contextValue = { 
    logged: true,
    user: { id: '123', name: 'Fernanda' },
    logout: jest.fn() 
  }

  beforeEach( () => jest.clearAllMocks() )

  test('Debe mostrar el nombre del usurio logeado', () => {

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue } >
          <Navbar /> 
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect( screen.getByText( contextValue.user.name ) ).toBeTruthy()

  })

  test('Debe llamar el logout y navegate cuando se hace click en el botón', () => {

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue } >
          <Navbar /> 
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const logoutButton = screen.getByRole('button')
    fireEvent.click( logoutButton )

    expect( contextValue.logout ).toHaveBeenCalled()
    expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', { replace: true })

  })
})