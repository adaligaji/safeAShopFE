# SafeAShop Frontend

Frontend del proyecto académico SafeAShop, construido con React, TypeScript y Vite.

## Funcionalidades

- Login mediante `POST /api/login`
- JWT enviado como `Bearer token`
- Catálogo mediante `GET /api/products`
- Creación de pedidos mediante `POST /api/orders`
- Consulta individual mediante `GET /api/orders/:id`
- Creación de productos mediante `POST /api/products`
- Modificación de productos mediante `PUT /api/products/:id`
- Navegación visual por rol `CUSTOMER` / `ADMIN`

> Importante: el control de rol del frontend es solamente visual. El backend debe volver a validar JWT, RBAC y BOLA.

## Contrato esperado del backend

### POST /api/login

Request:
```json
{
  "username": "cliente1",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt",
  "user": {
    "id": 2,
    "username": "cliente1",
    "role": "CUSTOMER"
  }
}
```

### GET /api/products

Response:
```json
[
  { "id": 1, "name": "Laptop", "price": 5000 }
]
```

### POST /api/orders

Request:
```json
{
  "productId": 1,
  "quantity": 1
}
```

### GET /api/orders/:id

Response:
```json
{
  "id": 10,
  "userId": 2,
  "productId": 1,
  "quantity": 1
}
```

### POST /api/products

Request:
```json
{
  "name": "Laptop",
  "price": 5000
}
```

### PUT /api/products/:id

Request:
```json
{
  "name": "Laptop Pro",
  "price": 6500
}
```

## Configuración

Copiar:

```bash
cp .env.example .env
```

Por defecto:

```env
VITE_API_URL=http://localhost:3000/api
```

## Ejecutar

```bash
npm install
npm run dev
```

Abrir:

```text
http://localhost:5173
```

## Compilar

```bash
npm run build
```
