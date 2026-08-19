# 📦 Node: NPM y el package.json

Así como Python tiene su gestor `pip` (y los archivos `requirements.txt`), el mundo de Node.js se sostiene sobre la plataforma más grande de paquetes de software de código abierto en la historia: **NPM** (Node Package Manager).

Cuando instalas Node en tu computadora, `npm` se instala automáticamente.

---

## 📄 El Corazón: `package.json`

Cualquier proyecto web moderno (incluyendo el de esta plataforma) nace inicializando un proyecto Node. Si corres `npm init -y` en una carpeta vacía, se creará un archivo vital: el `package.json`.

Este archivo es el **documento de identidad** de tu proyecto. Guarda metadatos, versiones, y lo más importante: las dependencias de código externo que tu app necesita para funcionar.

```json
{
  "name": "mi-app-react",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

---

## 🔗 Dependencies vs devDependencies

* **`dependencies`:** Paquetes obligatorios para que tu aplicación corra en producción (ej. React, React Router, Supabase).
* **`devDependencies`:** Paquetes que solo necesitas tú como desarrollador en tu máquina local (ej. TypeScript, ESLint, Prettier). Cuando la app se suba al servidor final, estos paquetes se descartarán para ahorrar espacio.

---

## 🛠️ Ejercicio In-line

**Pregunta:** Trabajas en equipo y clonas un repositorio de GitHub que hizo tu colega. Al abrirlo, notas que no existe la carpeta `node_modules`. Intentas ejecutar `npm run dev` y todo falla por "librerías no encontradas". ¿Cuál es el paso crítico que te faltó realizar antes de correr el servidor?

**Respuesta y Justificación:**
Te faltó ejecutar el comando `npm install` (o `npm i`).
La carpeta `node_modules` es donde realmente se descargan físicamente los cientos de miles de archivos de las librerías. Como es tan gigantesca (puede pesar gigabytes), **NUNCA** se sube a GitHub (se incluye en el `.gitignore`). Al clonar, debes correr `npm install` para que NPM lea el `package.json` y descargue mágicamente todas las carpetas a tu computadora.

---

## 🏃‍♂️ Los Scripts

Si te fijas en el bloque `"scripts"` del archivo JSON, verás comandos personalizados.

```json
"scripts": {
  "iniciar": "node index.js",
  "limpiar": "rm -rf build/"
}
```

En lugar de tener que recordar largos y tediosos comandos de terminal, NPM te permite crear atajos. Si ejecutas `npm run iniciar`, NPM buscará la clave "iniciar" y ejecutará lo que haya dentro. Es el equivalente a los *Makefiles* del mundo C/C++, pero universal en JavaScript.
