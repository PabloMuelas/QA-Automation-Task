// Clase base para todas las paginas, contiene metodos comunes para interactuar con las paginas
// Esto evita duplicacion de codigo y facilita el mantenimiento
import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {

  readonly page: Page;
  readonly baseUrl: string

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'https://the-internet.herokuapp.com/javascript_alerts';
  }

  async visitPage(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async expectText(locator: Locator, expectedText: string) {
    await expect(locator).toContainText(expectedText);
  }

  async expectTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }
}
