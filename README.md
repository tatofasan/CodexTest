# Latin Ecom Platform

Este repositorio contiene el frontend (Vite + React) y el backend (Express + TypeScript) necesarios para la demo de LatinEcom.

## Requisitos previos

- Node.js 18+
- npm 9+

## Instalación

```bash
# Instalar dependencias del frontend
cd latin-ecom
npm install

# Instalar dependencias del backend
cd ../latin-ecom-backend
npm install
```

## Ejecución en desarrollo

En una terminal inicia el backend:

```bash
cd latin-ecom-backend
npm run dev
```

Por defecto se expone en `http://localhost:4000`.

En otra terminal inicia el frontend:

```bash
cd latin-ecom
cp .env.example .env # Ajusta VITE_API_URL si es necesario
npm run dev
```

El frontend consumirá el backend para obtener los datos del panel.

## Base de datos de prueba

El backend incluye datos en memoria para la demo, pero si deseas probar la
aplicación completa con una base de datos relacional puedes usar el script
`latin-ecom-backend/database/schema.sql`. El archivo crea todas las tablas y
registros de prueba que cubren los módulos de productos, pedidos, movimientos,
solicitudes de billetera y conexiones.

```bash
# Crear la base de datos en PostgreSQL (ejemplo)
createdb latin_ecom_demo
psql latin_ecom_demo -f latin-ecom-backend/database/schema.sql
```

Después de ejecutar el script, ajusta la configuración del backend para que use
tu instancia de PostgreSQL si lo deseas o consulta la información directamente
desde la base de datos para validar escenarios de prueba end-to-end.

## Scripts adicionales

```bash
# Backend: compilar a JavaScript
npm run build

# Frontend: ejecutar linter
npm run lint

# Frontend: ejecutar pruebas unitarias con cobertura
npm run test:unit

# Frontend: ejecutar pruebas end-to-end con Playwright
npm run test:e2e

# Frontend: ejecutar todo el set de pruebas
npm run test:all
```

## Estructura

- `latin-ecom/`: Aplicación React.
- `latin-ecom-backend/`: API REST en Express.
- `Analisis funcional Ecomdrop/`: Documentación de producto.
