/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from "@testing-library/dom";
import Bills  from "../containers/Bills.js"
import BillsUI from "../views/BillsUI.js";
import { bills } from "../fixtures/bills.js";
import { ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";

import router from "../app/Router.js";

describe("Given I am connected as an employee", () => {
  
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }));
      const root = document.createElement("div");
      root.setAttribute("id", "root");
      document.body.append(root);
      router();
      window.onNavigate(ROUTES_PATH.Bills);
      await waitFor(() => screen.getByTestId('icon-window'));
      const windowIcon = screen.getByTestId('icon-window');
      expect(windowIcon.classList).toContain('active-icon');
    });
 /*    
    test("Then bills should be ordered from latest to earliest", async () => {
      const billsPage = new Bills({ document, onNavigate: jest.fn(), store: { bills: jest.fn(() => ({ list: jest.fn().mockResolvedValue(bills) })) }, localStorage: window.localStorage });
      const sortedBills = await billsPage.getBills();
      const dates = sortedBills.map(bill => bill.date);
      const antiChrono = (a, b) => ((a < b) ? 1 : -1);
      const datesSorted = [...dates].sort(antiChrono);
      console.log(dates);
      console.log(datesSorted);
      expect(dates).toEqual(datesSorted);
    });

  */  
  
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills });
      const dateElements = document.querySelectorAll('td[data-date-value]'); // Assurez-vous que les éléments ont un testid pour les sélectionner plus facilement
      
      // Récupérer les valeurs brutes des dates depuis l'attribut data-date-value
      const dates = Array.from(dateElements).map(el => el.getAttribute('data-date-value'));

      // Fonction de tri anti-chronologique (du plus récent au plus ancien)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1);

      // Trier les dates attendues
      const datesSorted = [...dates].sort(antiChrono);

      // Vérifier que les dates récupérées sont bien triées
      expect(dates).toEqual(datesSorted);

      // Afficher pour vérifier dans la console si nécessaire
      console.log(dates);
      console.log(datesSorted);
    });


 /*  
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
      console.log(dates)
      console.log(datesSorted)
    })
 */ 
  });
});