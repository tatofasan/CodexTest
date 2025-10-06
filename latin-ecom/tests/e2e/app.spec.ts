import { test, expect } from '@playwright/test';
import {
  dashboardResponse,
  products,
  orders,
  movements,
  walletRequests,
  connections,
  billingBreakdown
} from '../../src/test/fixtures';

test.beforeEach(async ({ page }) => {
  const consoleErrors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  page.on('pageerror', (error) => {
    consoleErrors.push(error.message);
  });

  await page.route('**/api/dashboard**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: dashboardResponse })
    });
  });

  await page.route('**/api/products**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: products })
    });
  });

  await page.route('**/api/orders**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: orders })
    });
  });

  await page.route('**/api/movements**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: movements })
    });
  });

  await page.route('**/api/wallet-requests**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: walletRequests })
    });
  });

  await page.route('**/api/connections**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: connections })
    });
  });

  await page.route('**/api/billing**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: billingBreakdown })
    });
  });

  await page.goto('/');
  await expect(page.getByText('Pedidos entregados')).toBeVisible();

  expect(consoleErrors).toEqual([]);
});

test('recorrido principal verifica navegación y botones críticos', async ({ page }) => {
  const sections = [
    {
      label: 'Dashboard',
      assertion: async () => {
        await expect(page.getByText('Pedidos con incidencias')).toBeVisible();
      }
    },
    {
      label: 'Productos',
      assertion: async () => {
        await page.getByRole('link', { name: 'Productos' }).click();
        await expect(page.getByText('Catálogo de productos')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Exportar CSV' })).toBeEnabled();
        await expect(page.getByRole('button', { name: 'Agregar a mi tienda' }).first()).toBeEnabled();
      }
    },
    {
      label: 'Pedidos',
      assertion: async () => {
        await page.getByRole('link', { name: 'Pedidos' }).click();
        await expect(page.getByText('Gestión de pedidos')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Exportar reporte' })).toBeEnabled();
        await page.getByText('ORD-1002').click();
        await expect(page.getByText('Detalle del pedido')).toBeVisible();
      }
    },
    {
      label: 'Conexiones',
      assertion: async () => {
        await page.getByRole('link', { name: 'Conexiones' }).click();
        await expect(page.getByText('Tiendas conectadas')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Conectar nueva tienda' })).toBeEnabled();
        await page.getByRole('button', { name: 'Sincronizar ahora' }).first().click();
      }
    },
    {
      label: 'Movimientos',
      assertion: async () => {
        await page.getByRole('link', { name: 'Movimientos' }).click();
        await expect(page.getByText('Movimientos de billetera')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Exportar CSV' })).toBeEnabled();
      }
    },
    {
      label: 'Solicitudes',
      assertion: async () => {
        await page.getByRole('link', { name: 'Solicitudes' }).click();
        await expect(page.getByText('Solicitudes financieras')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Ingresar dinero' })).toBeEnabled();
        await expect(page.getByRole('button', { name: 'Retirar dinero' })).toBeEnabled();
      }
    },
    {
      label: 'Mi cuenta',
      assertion: async () => {
        await page.getByRole('link', { name: 'Mi cuenta' }).click();
        await expect(page.getByText('Configuración de facturación')).toBeVisible();
        const toggles = page.getByRole('checkbox');
        await expect(toggles.first()).toBeChecked();
      }
    },
    {
      label: 'Mi perfil',
      assertion: async () => {
        await page.getByRole('link', { name: 'Mi perfil' }).click();
        await expect(page.getByText('Información personal')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Guardar cambios' })).toBeEnabled();
      }
    }
  ];

  for (const section of sections) {
    await section.assertion();
  }
});

test('captura de pantalla del dashboard sin errores de consola', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 5000 });
  const screenshot = await page.screenshot({ fullPage: true });
  await test.info().attach('dashboard', { body: screenshot, contentType: 'image/png' });
});
