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

## Scripts adicionales

```bash
# Backend: compilar a JavaScript
npm run build

# Frontend: ejecutar linter
npm run lint

# Frontend: ejecutar pruebas (vitest)
npm test
```

## Estructura

- `latin-ecom/`: Aplicación React.
- `latin-ecom-backend/`: API REST en Express.
- `Analisis funcional Ecomdrop/`: Documentación de producto.
