import { authReducer } from '../../../src/auth/context/authReducer'
import { types } from '../../../src/auth/types/types'

describe('Prueba en <authReducer />', () => {

  const user = {
    id: 123,
    name: 'Fernanda'
  }

  const initialState = { logged: false }

  test('Debe retornar el estado por defecto', () => {

    const state = authReducer( initialState )
    expect( state ).toBe( initialState )

  })


  test('Debe llamar el login autenticar y establecer el user', () => {

    const action = {
      type: types.login,
      payload: user 
    }

    const state = authReducer( initialState, action )
    // console.log( state )
    expect( state.user ).toBe( user )
    expect( state.logged ).toBeTruthy()

  })

  
  test('Debe llamar el logout, borrar el name del user y logged en false', () => {

    const state = {
      user,
      logged: true
    }

    const newState = authReducer( state, { type: types.logout } )
    expect( newState ).not.toContain( user )
    expect( newState.logged ).toBeFalsy()

  })

})