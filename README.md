# ProductApp - Mobile Application
Aplicación móvil con React Native como prueba técnica, implementando gestión de estado con Redux, navegación fluida y persistencia local.

## Tabla de Contenidos

- Lista de productos desde API (DummyJSON)
- Detalle de producto con galería de imágenes
- Sistema de favoritos con persistencia local
- Búsqueda en tiempo real
- Navegación con React Navigationles


## Tecnologías

- React Native 0.74.5
- TypeScript
- Redux Toolkit
- React Navigation
- Axios
- AsyncStorage


## Requisitos Previos
Antes de comenzar, verifica que tengas instalado:

### Software Requerido:
- **Node.js**: v20 
- **JDK**: versión 17
- **Android Studio con SDK API 34**

## Instalación y Ejecución

### 1. Clonar e instalar

```bash

   git clone https://github.com/renatomartinezdev/product-app-rn
   cd ProductApp
   npm install

```

### 2. Ejecutar

```bash
npx react-native run-android
# o
npm run android
```

## 💡 Decisiones Técnicas

### 1. Axios como Cliente HTTP
Elegido sobre Fetch API por sus interceptores para logging automático, manejo centralizado de errores y sintaxis más limpia. Permite ver todas las peticiones en consola y configurar timeouts globales.

### 2. Arquitectura por Features
Organización del código por dominio (products, navigation, store) en lugar de por tipo de archivo, mejorando la escalabilidad y mantenibilidad del proyecto.