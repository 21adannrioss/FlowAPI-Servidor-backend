# FlowAPI – Servidor Backend REST

FlowAPI es un servidor HTTP REST desarrollado **exclusivamente con módulos nativos de Node.js** (sin Express ni ningún framework externo). Gestiona un catálogo de productos tecnológicos mediante ficheros JSON como base de datos persistente.

El proyecto demuestra el funcionamiento interno de un servidor web: gestión de rutas, parsing de peticiones HTTP, lectura/escritura de ficheros y respuesta en formato JSON.

---

## Cómo ejecutarlo

```bash
# Modo normal
node server.js
```

El servidor queda escuchando en **http://localhost:3000**

---

## Ejemplo de respuesta JSON

```json
{
  "total": 6,
  "productos": [
    {
      "id": 1,
      "nombre": "Teclado mecánico RGB",
      "precio": 89.99,
      "categoria": "Periféricos",
      "stock": 23,
      "creado_en": "2025-01-10T09:00:00.000Z"
    }
  ]
}
```

