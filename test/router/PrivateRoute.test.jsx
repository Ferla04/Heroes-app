import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/auth/context/AuthContext'
import { PrivateRoute } from '../../src/router/PrivateRoute'

describe('Pruebas en <PrivateRoute />', () => {

  test('Debe mostrar el children si está autenticado', () => {

    Storage.prototype.setItem = jest.fn()

    const contextValue = {
      logged: true,
      user: { id: '123', name: 'Fernanda' }
    }

    render( 
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/marvel']}>

          <PrivateRoute>
            <h1>Ruta privada</h1>
          </PrivateRoute>

        </MemoryRouter>
      </AuthContext.Provider>
    )

    screen.debug()
    expect( screen.getByText('Ruta privada') ).toBeTruthy()
    expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', '/marvel' )

  })


})