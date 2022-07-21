import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { SearchPage } from '../../src/heroes/pages/SearchPage'

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
  }
})

describe('Pruebas en <SearchPage />', () => {

  beforeEach(() => jest.clearAllMocks())

  test('Debe mostrarse correctamente con valores por defecto', () => {

    const { container } = render( 
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )

    expect( container ).toMatchSnapshot()

  })

  test('Debe mostrar a Batman y el input con el valor del queryString', () => {

    render( 
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    expect( input.value ).toBe('batman')

    const img = screen.getByRole('img')
    expect( img.src ).toContain('batman')

    const alertError = screen.getByLabelText('alert-danger')
    expect( alertError.style.display ).toBe('none')

  })

  test('Debe mostrar un Error si no se encuentra el hero (batman123)', () => {

    render( 
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )

    const alertError = screen.getByLabelText('alert-danger')
    expect( alertError.textContent ).toBe('No hero with batman123')
    expect( alertError.style.display ).toBeFalsy()

  })


  test('Debe llamar el navigate a la pantalla nueva', () => {

    const inputValue = 'superman'

    render( 
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    fireEvent.change( input, { target: { name: 'searchText', value: inputValue } } )

    fireEvent.submit( screen.getByLabelText('form') )

    expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`)

  })

})