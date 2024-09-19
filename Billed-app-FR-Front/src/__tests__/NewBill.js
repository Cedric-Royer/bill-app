/**
 * @jest-environment jsdom
 */

import { screen, fireEvent, waitFor } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { ROUTES_PATH } from "../constants/routes.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import router from "../app/Router.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    
    // Teste si le formulaire de nouvelle note de frais s'affiche correctement
    test("Then the new bill form should be displayed", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const form = screen.getByTestId('form-new-bill')
      expect(form).toBeTruthy()
    })

    // Teste si le fichier choisi avec un format invalide est rejeté
    test("Then I should be alerted when uploading an invalid file format", () => {
      const html = NewBillUI()
      document.body.innerHTML = html

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))

      const onNavigate = jest.fn()
      const newBill = new NewBill({ document, onNavigate, store: null, localStorage: window.localStorage })

      const inputFile = screen.getByTestId('file')
      const handleChangeFile = jest.fn((e) => newBill.handleChangeFile(e))
      inputFile.addEventListener("change", handleChangeFile)

      const file = new File(['doc'], 'document.pdf', { type: 'application/pdf' })
      fireEvent.change(inputFile, { target: { files: [file] } })

      expect(handleChangeFile).toHaveBeenCalled()
      expect(inputFile.value).toBe('') // Fichier rejeté, input file réinitialisé
    })

    // Teste si le formulaire est soumis avec les bonnes données
    test("Then I can submit the form with valid data", async () => {
      const html = NewBillUI()
      document.body.innerHTML = html

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({ type: 'Employee', email: "test@test.com" }))

      const onNavigate = jest.fn()
      const newBill = new NewBill({ document, onNavigate, store: null, localStorage: window.localStorage })

      const handleSubmit = jest.fn((e) => newBill.handleSubmit(e))
      const form = screen.getByTestId('form-new-bill')
      form.addEventListener("submit", handleSubmit)

      fireEvent.input(screen.getByTestId('expense-name'), { target: { value: 'Test expense' } })
      fireEvent.input(screen.getByTestId('datepicker'), { target: { value: '2024-09-19' } })
      fireEvent.input(screen.getByTestId('amount'), { target: { value: '100' } })
      fireEvent.input(screen.getByTestId('vat'), { target: { value: '20' } })
      fireEvent.input(screen.getByTestId('pct'), { target: { value: '20' } })
      fireEvent.change(screen.getByTestId('expense-type'), { target: { value: 'Transports' } })
      fireEvent.input(screen.getByTestId('commentary'), { target: { value: 'Test commentary' } })

      fireEvent.submit(form)
      expect(handleSubmit).toHaveBeenCalled()

      await waitFor(() => expect(onNavigate).toHaveBeenCalledWith(ROUTES_PATH['Bills']))
    })
  })
})
