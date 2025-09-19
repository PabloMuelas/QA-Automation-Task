import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class JsAlertsPage extends BasePage {
  readonly pageH3: Locator;
  readonly jsAlertButton: Locator;
  readonly jsConfirmButton: Locator;
  readonly jsPromptButton: Locator;
  readonly resultText: Locator;

  // Idealmente los strings como el title de la pagina deberian estar en un archivo de configuracion
  // o en variables de entorno para facilitar cambios futuros y evitar hardcoding
  // pero para este ejercicio lo dejo aqui directamente por simplicidad
  constructor(page: Page) {
    super(page);
    this.pageH3 = this.page.locator('h3', { hasText: 'JavaScript Alerts' });
    this.jsAlertButton = this.page.locator('button', { hasText: 'Click for JS Alert' });
    this.jsConfirmButton = this.page.locator('button', { hasText: 'Click for JS Confirm' });
    this.jsPromptButton = this.page.locator('button', { hasText: 'Click for JS Prompt' });
    this.resultText = this.page.locator('#result');
  }

  // Las funciones de click retornan this para permitir encadenar llamadas si es necesario
  // Por ejemplo si mas adelante tuvieramos un metodo que hiciera click en otro botón que se añadiera
  // a la pagina, podriamos hacer algo como jsAlertsPage.clickAlertButton().clickNewButton();
  async visitAndAssertPage() {
    await this.visitPage(this.baseUrl);
    await this.expectTitle('The Internet');
    await this.expectVisible(this.pageH3);
  }

  async clickAlertButton() {
    await this.click(this.jsAlertButton);
    return this;
  }

  async clickConfirmButton() {
    await this.click(this.jsConfirmButton);
    return this;
  }

  async clickPromptButton() {
    await this.click(this.jsPromptButton);
    return this;
  }

  async assertResultText(expectedText: string) {
    await this.expectText(this.resultText, expectedText);
  }
}
