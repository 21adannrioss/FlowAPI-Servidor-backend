# **FlowAPI – Servidor Backend REST**

FlowAPI es un servidor HTTP REST desarrollado exclusivamente con Node.js, sin usar Express ni ningún framework externo.  
Permite gestionar un catálogo de productos tecnológicos mediante ficheros JSON como base de datos persistente, demostrando conceptos clave de backend: rutas, parsing de peticiones HTTP, lectura/escritura de ficheros y respuestas JSON.

---

## Requisitos

Antes de ejecutar FlowAPI, asegúrate de tener instalado:

- Node.js v18 o superior  
- Un terminal (VSCode, Git Bash, Powershell, etc...)

No se requieren dependencias externas: todo el proyecto usa **módulos nativos de Node.js**.

---

## Instalación y ejecución

1. Clona el repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
cd FlowAPI-Servidor-backend
```

2. Instala dependencias (creará `package-lock.json`):
```bash
npm install
```

3. Ejecuta el servidor:
```bash
# Modo producción
node src/server.js

# Modo desarrollo con recarga automática
npm run dev
```

El servidor escuchará en http://localhost:3000

---

## Ejemplo de petición y respuesta

**GET** `/productos?categoria=Periféricos`
```json
{
  "total": 2,
  "productos": [
    {
      "id": 1,
      "nombre": "Teclado mecánico RGB",
      "precio": 89.99,
      "categoria": "Periféricos",
      "stock": 23,
      "creado_en": "2025-01-10T09:00:00.000Z"
    },
    {
      "id": 3,
      "nombre": "Ratón inalámbrico",
      "precio": 45.50,
      "categoria": "Periféricos",
      "stock": 41,
      "creado_en": "2025-01-11T10:00:00.000Z"
    }
  ]
}
```

**POST** `/productos`
```json
{
  "nombre": "Webcam HD",
  "precio": 67.00,
  "categoria": "Periféricos",
  "stock": 10
}
```

Respuesta:
```json
{
  "id": 7,
  "nombre": "Webcam HD",
  "precio": 67.00,
  "categoria": "Periféricos",
  "stock": 10,
  "creado_en": "2026-04-01T12:00:00.000Z"
}
```

---

## 💡 Tips para pruebas rápidas

Puedes probar los endpoints desde terminal usando `curl`:
```bash
# Obtener todos los productos
curl http://localhost:3000/productos

# Obtener un producto por ID
curl http://localhost:3000/productos/1

# Crear un nuevo producto
curl -X POST http://localhost:3000/productos -H "Content-Type: application/json" -d '{"nombre":"Auriculares","precio":59.99,"categoria":"Periféricos","stock":12}'
```

O con `fetch` desde el navegador:
```js
fetch("http://localhost:3000/productos")
  .then(res => res.json())
  .then(data => console.log(data));
```