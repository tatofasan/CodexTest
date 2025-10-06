-- Schema and seed data for Latin Ecom demo database
-- This script targets PostgreSQL and can be executed with psql or any PostgreSQL GUI.
-- It creates the database structure required by the application and inserts
-- representative seed data so every view has content to display.

-- Drop existing tables to allow re-running the script safely in a development environment.
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS movements CASCADE;
DROP TABLE IF EXISTS wallet_requests CASCADE;
DROP TABLE IF EXISTS connections CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Reference tables
CREATE TABLE products (
  id              VARCHAR(20) PRIMARY KEY,
  name            VARCHAR(120) NOT NULL,
  category        VARCHAR(60) NOT NULL,
  provider        VARCHAR(80) NOT NULL,
  cost            NUMERIC(10, 2) NOT NULL CHECK (cost > 0),
  suggested_price NUMERIC(10, 2) NOT NULL CHECK (suggested_price > 0),
  stock           INTEGER NOT NULL CHECK (stock >= 0),
  shipping_time   VARCHAR(20) NOT NULL,
  updated_at      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  rating          NUMERIC(3, 1) NOT NULL CHECK (rating BETWEEN 0 AND 5)
);

-- Core business tables
CREATE TABLE orders (
  id             VARCHAR(20) PRIMARY KEY,
  store          VARCHAR(80) NOT NULL,
  product_id     VARCHAR(20) NOT NULL REFERENCES products(id) ON UPDATE CASCADE,
  customer       VARCHAR(80) NOT NULL,
  created_at     TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  status         VARCHAR(20) NOT NULL CHECK (status IN (
                    'Pendiente', 'Registrar pago', 'Confirmado', 'Preparado',
                    'Despachado', 'Entregado', 'En revisión', 'Cancelado'
                  )),
  payment_method VARCHAR(3) NOT NULL CHECK (payment_method IN ('TC', 'COD')),
  cost           NUMERIC(10, 2) NOT NULL CHECK (cost > 0),
  shipping_cost  NUMERIC(10, 2) NOT NULL CHECK (shipping_cost >= 0),
  sale_price     NUMERIC(10, 2) NOT NULL CHECK (sale_price > 0),
  tracking_code  VARCHAR(40)
);

CREATE TABLE movements (
  id          VARCHAR(20) PRIMARY KEY,
  type        VARCHAR(10) NOT NULL CHECK (type IN ('Ingreso', 'Egreso')),
  category    VARCHAR(30) NOT NULL CHECK (category IN (
                  'Recarga', 'Confirmación pedido', 'Acreditación', 'Comisión', 'Envío'
                )),
  description VARCHAR(120) NOT NULL,
  amount      NUMERIC(12, 2) NOT NULL,
  date        TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE wallet_requests (
  id           VARCHAR(20) PRIMARY KEY,
  type         VARCHAR(10) NOT NULL CHECK (type IN ('Ingreso', 'Retiro')),
  status       VARCHAR(10) NOT NULL CHECK (status IN ('Pendiente', 'Aprobada', 'Rechazada')),
  amount       NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  created_at   TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  processed_at TIMESTAMP WITHOUT TIME ZONE,
  reference    VARCHAR(40) NOT NULL
);

CREATE TABLE connections (
  id           VARCHAR(20) PRIMARY KEY,
  store_name   VARCHAR(80) NOT NULL,
  platform     VARCHAR(20) NOT NULL CHECK (platform = 'Shopify'),
  status       VARCHAR(20) NOT NULL CHECK (status IN ('Activa', 'Sincronizando', 'Error')),
  connected_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  last_sync    TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

-- Seed data mirrors the objects defined in src/data.ts so the frontend screens
-- show consistent information when connected to a live database.
INSERT INTO products (id, name, category, provider, cost, suggested_price, stock, shipping_time, updated_at, rating) VALUES
  ('PRD-101', 'Faja Reductora Post Parto', 'Salud y Belleza', 'FitLine Bogotá', 18.00, 39.99, 230, '24h', NOW() - INTERVAL '1 day', 4.7),
  ('PRD-205', 'Set de brochas profesionales 12p', 'Belleza', 'GlamSupply Lima', 9.50, 24.99, 560, '48h', NOW() - INTERVAL '2 days', 4.8),
  ('PRD-314', 'Zapatillas Urbanas StreetFlow', 'Calzado', 'StreetKicks Santiago', 22.00, 49.99, 140, '72h', NOW() - INTERVAL '4 days', 4.5),
  ('PRD-407', 'Licuadora Portátil SmoothGo', 'Electrodomésticos', 'HomeTech Medellín', 16.00, 34.99, 320, '48h', NOW() - INTERVAL '1 day', 4.6);

INSERT INTO orders (id, store, product_id, customer, created_at, status, payment_method, cost, shipping_cost, sale_price, tracking_code) VALUES
  ('ORD-9001', 'SofiFit Store', 'PRD-101', 'Laura Reyes', NOW() - INTERVAL '1 day', 'Pendiente', 'TC', 18.00, 5.50, 39.99, NULL),
  ('ORD-9002', 'GlowUp Boutique', 'PRD-205', 'Camila Vargas', NOW() - INTERVAL '3 days', 'Confirmado', 'TC', 9.50, 4.00, 24.99, 'CHL123456789'),
  ('ORD-9003', 'UrbanStep', 'PRD-314', 'Jorge Pérez', NOW() - INTERVAL '5 days', 'Despachado', 'COD', 22.00, 6.50, 49.99, 'PER987654321'),
  ('ORD-9004', 'DetoxLife', 'PRD-407', 'Mariana Torres', NOW() - INTERVAL '6 days', 'Entregado', 'COD', 16.00, 5.00, 34.99, 'COL456123789'),
  ('ORD-9005', 'SofiFit Store', 'PRD-101', 'Dayana Castro', NOW() - INTERVAL '2 days', 'Registrar pago', 'TC', 18.00, 5.50, 39.99, NULL);

INSERT INTO movements (id, type, category, description, amount, date) VALUES
  ('MOV-1001', 'Ingreso', 'Recarga', 'Recarga USDT - Binance', 1500.00, NOW() - INTERVAL '2 days'),
  ('MOV-1002', 'Egreso', 'Confirmación pedido', 'ORD-9002 - Confirmación costo + envío', -13.50, NOW() - INTERVAL '2 days'),
  ('MOV-1003', 'Ingreso', 'Acreditación', 'ORD-9004 - Pedido COD entregado', 27.49, NOW() - INTERVAL '1 day'),
  ('MOV-1004', 'Egreso', 'Envío', 'Pago courier semana 32', -78.90, NOW() - INTERVAL '4 days'),
  ('MOV-1005', 'Egreso', 'Comisión', 'Comisión plataforma - Agosto', -125.35, NOW() - INTERVAL '7 days');

INSERT INTO wallet_requests (id, type, status, amount, created_at, processed_at, reference) VALUES
  ('REQ-501', 'Ingreso', 'Pendiente', 1200.00, NOW() - INTERVAL '1 day', NULL, 'TRX-9932ABCD'),
  ('REQ-502', 'Retiro', 'Aprobada', 650.00, NOW() - INTERVAL '4 days', NOW() - INTERVAL '3 days', 'RET-5567XYZ'),
  ('REQ-503', 'Ingreso', 'Rechazada', 300.00, NOW() - INTERVAL '6 days', NOW() - INTERVAL '5 days', 'TRX-1099LMN');

INSERT INTO connections (id, store_name, platform, status, connected_at, last_sync) VALUES
  ('CON-101', 'SofiFit Store', 'Shopify', 'Activa', NOW() - INTERVAL '90 days', NOW() - INTERVAL '4 hours'),
  ('CON-102', 'GlowUp Boutique', 'Shopify', 'Sincronizando', NOW() - INTERVAL '45 days', NOW() - INTERVAL '1 day'),
  ('CON-103', 'UrbanStep', 'Shopify', 'Error', NOW() - INTERVAL '30 days', NOW() - INTERVAL '3 days');
