# LatinEcom - Plataforma de Dropshipping

## ¿Qué es LatinEcom?

LatinEcom (anteriormente Ecomdrop) es una plataforma integral de gestión de dropshipping diseñada para conectar dropshippers con proveedores de productos en Latinoamérica. El sistema automatiza el proceso completo desde la venta hasta la entrega, gestionando inventarios, pedidos, logística y pagos en un solo lugar.

---

## ¿Para quién está diseñada?

**Dropshippers** que operan tiendas en Shopify y desean:
- Vender productos sin mantener inventario propio
- Automatizar la gestión de pedidos
- Controlar su flujo de caja y comisiones
- Tener trazabilidad completa de sus operaciones

---

## Funcionalidades principales

### 1. **Catálogo de productos**
- Acceso a un inventario centralizado de productos disponibles para dropshipping
- Información detallada: precios de costo, precios sugeridos, stock, dimensiones, proveedores
- Búsqueda y filtrado avanzado por categorías, proveedores, disponibilidad
- Integración directa con tiendas Shopify

### 2. **Integración con tiendas (Conexiones)**
- Conexión automática con tiendas Shopify mediante aplicación
- Sincronización en tiempo real de pedidos
- Soporte para múltiples tiendas desde una sola cuenta
- Gestión centralizada de todas las ventas

### 3. **Gestión de pedidos**
El sistema maneja un flujo completo de estados:
- **Pendiente**: pedido ingresado, requiere confirmación
- **Confirmar**: validación de saldo y descuento de costos
- **Registrar pago**: estado transitorio cuando falta saldo
- **Confirmado**: pedido listo para procesamiento
- **Preparado**: producto armado para despacho
- **Despachado**: entregado al courier con tracking
- **Entregado**: completado exitosamente
- **En revisión**: pedidos con incidencias
- **Cancelado**: pedidos anulados

### 4. **Sistema de billetera (Wallet)**

#### Movimientos
Registro detallado de todos los ingresos y egresos:
- Top-ups de saldo (recargas)
- Débitos por confirmación de pedidos
- Acreditaciones por ventas entregadas
- Comisiones y costos de envío
- Trazabilidad completa con fecha, motivo y monto

#### Solicitudes
Gestión de operaciones financieras:
- **Ingresar dinero**: recarga de saldo mediante transferencia USDT (TRC20)
- **Retirar dinero**: extracción de ganancias acumuladas
- Estados: Pendiente, Aprobada, Rechazada
- Plazo de procesamiento: 24 horas para USDT

---

## Modelo de costos y comisiones

### Al confirmar un pedido:
- **Pago con tarjeta (TC)**: se descuenta envío + comisión 7% + costo de producto
- **Contra reembolso (COD)**: se descuenta solo el costo de envío

### Al entregar un pedido COD:
- Se acredita el monto de la venta menos:
  - Costo del producto
  - Comisión de plataforma (7%)
  - Comisión contra reembolso (5%)
  - El neto queda disponible en la billetera

### Validación de saldo:
- Si no hay saldo suficiente, el pedido queda en estado "Registrar pago"
- No se puede despachar hasta completar el pago

---

## Dashboard (Home)

Panel de control con métricas clave:
- Tasa de pedidos entregados
- Estados de pedidos (A pagar, Con incidencias, Confirmado, etc.)
- Productos más vendidos del período
- Estado de facturación completo:
  - Gastos en envíos
  - Costos de productos
  - Comisiones
  - Ganancia neta
  - Facturación total

Filtros por rango de fechas para análisis personalizado.

---

## Flujo operativo típico

1. **Conexión**: El dropshipper conecta su tienda Shopify con LatinEcom
2. **Selección de productos**: Elige productos del catálogo para vender
3. **Venta**: Cliente compra en la tienda Shopify
4. **Ingreso automático**: El pedido se ingesta automáticamente en LatinEcom
5. **Confirmación**: Dropshipper confirma el pedido (se valida saldo y se descuentan costos)
6. **Procesamiento**: El equipo de LatinEcom prepara y despacha el pedido
7. **Entrega**: Cliente recibe el producto
8. **Acreditación**: Si es COD, el saldo neto se acredita en la billetera del dropshipper
9. **Retiro**: El dropshipper puede retirar sus ganancias acumuladas

---

## Ventajas del sistema

✅ **Automatización completa**: Desde la venta hasta la entrega  
✅ **Sin inventario**: No requiere capital inmovilizado en stock  
✅ **Transparencia financiera**: Visibilidad total de costos y ganancias  
✅ **Múltiples tiendas**: Gestión centralizada  
✅ **Pagos en crypto**: Recargas mediante USDT (red TRC20)  
✅ **Trazabilidad**: Seguimiento detallado de cada operación  
✅ **Dashboard analítico**: Métricas y reportes en tiempo real  

---

## Tecnología de pagos

- **Recargas**: USDT vía red TRC20 (Tron blockchain)
- **Validación**: Mediante hash de Tronscan
- **Tiempo de acreditación**: Máximo 24 horas
- **Retiros**: A cuenta bancaria o wallet configurada

---

## Interfaz y experiencia

- Estructura consistente: sidebar + header + panel central
- Responsive y adaptable
- Navegación fluida sin recargas completas
- Filtros avanzados en todas las secciones
- Exportación de datos (CSV/Excel)
- Búsquedas potentes y ordenamiento dinámico


---

## En resumen

LatinEcom es una solución completa que permite a emprendedores latinoamericanos operar negocios de dropshipping de manera profesional, con todas las herramientas necesarias para escalar: catálogo de productos, automatización de pedidos, gestión financiera, logística integrada y análisis de rendimiento, todo en una sola plataforma.
