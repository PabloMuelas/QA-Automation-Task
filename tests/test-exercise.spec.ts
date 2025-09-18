import { test, expect } from '@playwright/test';
import { JsAlertsPage } from '../pages/jsalerts';

test.describe('JavaScript Alerts', () => {

  let jsAlertsPage: JsAlertsPage;

  // Antes de cada test, inicializo la pagina y navego a ella
  // Esto asegura que cada test empieza en el mismo estado y no depende de otros tests
  // Lo cual mejora la independencia y fiabilidad de los tests
  test.beforeEach(async ({ page }) => {

    jsAlertsPage = new JsAlertsPage(page);
    await jsAlertsPage.visitPage();
  });

  // Idealmente los strings que comparamos podrian estar en un archivo a parte para facilitar cambios futuros y mantenibilidad
  // pero igual que en el archivo de la pagina, para este ejercicio los dejo aqui directamente por simplicidad
  test('The result text is correct after dismissing the JS alert', async ({ page }) => {

    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    await jsAlertsPage.clickAlertButton();
    await jsAlertsPage.asertResultText('You successfully clicked an alert');
  });

  test('The result text is correct after cancelling the JS confirm', async ({ page }) => {

    page.on('dialog', async dialog => {
      if (dialog.type() === 'confirm') {
        await dialog.dismiss();
      }
    });
    
    await jsAlertsPage.jsConfirmButton.click();
    await jsAlertsPage.asertResultText('You clicked: Cancel');
  });

  test('The result text is correct after introducing text in the JS prompt', async ({ page }) => {

    page.on('dialog', async dialog => {
      if (dialog.type() === 'prompt') {
        await dialog.accept('{{string}}');
      }
    });
    
    await jsAlertsPage.jsPromptButton.click();
    await jsAlertsPage.asertResultText('You entered: {{string}}');
  });
  
});
