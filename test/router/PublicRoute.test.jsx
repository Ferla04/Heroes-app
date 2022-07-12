import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { AuthContext } from "../../src/auth/context/AuthContext"
import { PublicRoute } from "../../src/router/PublicRoute"

describe('Pruebas en <PublicRoute />', () => {

  test('Debe mostrar el children si no está autenticado', () => {

    const contextValue = {
      logged: false
    }

    render( 
      <AuthContext.Provider value={ contextValue }>
        <PublicRoute>
          <h1>Ruta pública</h1>
          <h3>Inicia sesion</h3>
        </PublicRoute> 
      </AuthContext.Provider>
    )

    expect( screen.getByText('Ruta pública') ).toBeTruthy()

  })


  test('Debe navegar si está autenticado', () => {

    const contextValue = {
      logged: true,
      user: { name: 'Ferananda', id: '123' }
    }

    render( 
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/login']} > {/* <--- este componente provee las cosas del RouterDom  */}
          
          {/* Al usar solo una ruta puede causar un ciclo infinito */}
          <Routes>
            <Route path='login' element={ 
              <PublicRoute>
                <h1>Ruta pública</h1>
                <h3>Inicia sesion</h3>
              </PublicRoute> 
             }/>

            <Route path='marvel' element={ <h1>Ruta Privada</h1> }/>
          </Routes>

        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect( screen.getByText('Ruta Privada') ).toBeTruthy()

  })

})