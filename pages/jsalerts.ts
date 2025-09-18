// Utilizo el patron POM (Page Object Model) para estructurar el codigo y hacerlo mas mantenible
// Cada pagina tiene su propia clase con sus selectores y metodos
// Los tests interactuan con estas clases en lugar de directamente con Playwright

import { expect, type Locator, type Page } from '@playwright/test';

export class JsAlertsPage {
  readonly page: Page;
  readonly pageH3: Locator
  readonly jsAlertButton: Locator
  readonly jsConfirmButton: Locator
  readonly jsPromptButton: Locator
  readonly resultText: Locator

  // Idealmente los strings como la URL de la pagina deberian estar en un archivo de configuracion
  // o en variables de entorno para facilitar cambios futuros y evitar hardcoding
  // pero para este ejercicio los dejo aqui directamente por simplicidad
  constructor(page: Page) {
    this.page = page;
    this.pageH3 = this.page.locator('h3', { hasText: 'JavaScript Alerts' });
    this.jsAlertButton = this.page.locator('button', { hasText: 'Click for JS Alert' });
    this.jsConfirmButton = this.page.locator('button', { hasText: 'Click for JS Confirm' });
    this.jsPromptButton = this.page.locator('button', { hasText: 'Click for JS Prompt' });
    this.resultText = this.page.locator('#result');
  }

  async visitPage() {
    await this.page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await expect(this.page).toHaveTitle(/The Internet/);
    await expect(this.pageH3).toBeVisible();
  }

  // Las funciones de click retornan this para permitir encadenar llamadas si es necesario
  // Por ejemplo si mas adelante tuvieramos un metodo que hiciera click en otro botón que se añadiera
  // a la pagina, podriamos hacer algo como jsAlertsPage.clickAlertButton().clickNewButton();
  async clickAlertButton() {
    await this.jsAlertButton.click();
    return this;
  }

  async clickConfirmButton() {
    await this.jsConfirmButton.click();
    return this;
  }

  async clickPromptButton() {
    await this.jsPromptButton.click();
    return this;
  }

  async asertResultText(expectedText: string) {
    await expect(this.resultText).toContainText(expectedText);
  }

}
