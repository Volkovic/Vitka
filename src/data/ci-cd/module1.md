# Módulo 1: Conceptos de CI/CD y YAML

## El Dolor de los Despliegues Manuales

Antes de entender qué es CI/CD y cómo GitHub Actions lo soluciona, debemos entender cómo era el mundo del desarrollo web antes de su existencia. 

Imagina el flujo de trabajo clásico de una agencia web hace unos años:
1. Un desarrollador termina una nueva funcionalidad (ej. un carrito de compras) y lo prueba en su computadora local. Todo funciona.
2. Sube el código a la rama principal (master/main) del repositorio.
3. Para publicar la aplicación, el desarrollador tiene que abrir un programa de transferencia de archivos (como FileZilla FTP).
4. Se conecta al servidor de producción y **arrastra manualmente** los nuevos archivos, sobrescribiendo los viejos.
5. Inicia sesión en el servidor vía SSH y reinicia la base de datos o el servidor web manualmente.

**¿Qué problemas tiene esto?**
- **Error Humano:** ¿Qué pasa si el desarrollador olvidó subir un archivo crucial? La página de producción se cae.
- **Lentitud:** El proceso toma 15-30 minutos cada vez que se quiere hacer un cambio pequeño.
- **Falta de Pruebas:** Nadie garantizó que el código nuevo no rompiera funciones viejas antes de subirlo.
- **Dependencia:** Si el desarrollador que tiene las contraseñas del servidor se va de vacaciones, nadie más puede actualizar la página.

La filosofía **CI/CD** nace para eliminar la intervención humana de todo este proceso, haciéndolo automático, predecible y seguro.

---

## ¿Qué es Integración Continua (CI)?

**CI (Continuous Integration)** es la primera mitad del concepto. 
Se refiere a la práctica de mezclar (integrar) todo el código de los desarrolladores en una rama compartida principal **varias veces al día**, y validar automáticamente que ese código esté sano.

En un flujo CI moderno, cuando un programador hace un `git push` o crea un Pull Request (PR), ocurre lo siguiente de forma automática en la nube:
1. **Linting:** Un bot revisa que el código siga las reglas de estilo de la empresa (sin variables sin usar, con buena indentación, etc.).
2. **Construcción (Build):** El servidor intenta compilar el proyecto (ej. empaquetar React con Vite). Si hay un error de sintaxis, falla aquí.
3. **Pruebas (Testing):** El servidor ejecuta todos los Tests Unitarios y E2E (Jest, Cypress). 

Si cualquiera de estos pasos falla, el sistema bloquea el Pull Request y muestra una enorme "X" roja, impidiendo que ese código defectuoso llegue a la rama principal. 
El objetivo de CI es atrapar los bugs **antes** de que siquiera tengan la oportunidad de ser evaluados para producción.

---

## ¿Qué es Despliegue Continuo (CD)?

**CD (Continuous Deployment / Delivery)** es la segunda mitad. Si el CI se encarga de probar el código, el CD se encarga de **entregarlo a los usuarios**.

Una vez que el código pasó exitosamente todas las pruebas (CI) y fue fusionado con éxito en la rama `main`, el proceso CD entra en acción:
1. Toma el código ya validado.
2. Inicia sesión automáticamente de forma segura en los servidores de producción (AWS, Vercel, un VPS privado, etc.).
3. Sube los archivos, actualiza los contenedores de Docker (como vimos en el curso anterior) y reinicia los servicios necesarios.
4. Avisa al equipo (por Slack o Discord) que la nueva versión ya está en vivo.

El objetivo del CD es que **cualquier commit en la rama `main` termine instantáneamente en manos de los usuarios**, de manera segura y sin intervención humana. Con CI/CD, las empresas tecnológicas (como Netflix o Amazon) pueden actualizar su código cientos de veces al día sin que sus páginas se caigan.

---

## Introducción a GitHub Actions

Para hacer CI/CD, necesitas un servidor externo (un robot) que esté vigilando tu repositorio 24/7 esperando a que alguien haga un push para ejecutar comandos. Históricamente, las empresas tenían que alquilar y mantener servidores dedicados costosos con software como *Jenkins*.

**GitHub Actions** democratizó esto. Es el motor de CI/CD integrado directamente dentro de GitHub. No necesitas comprar servidores ni configurar integraciones externas complejas. 
GitHub Actions te presta computadoras virtuales bajo demanda, de forma gratuita (hasta ciertos minutos al mes). 

A estas computadoras prestadas se les conoce como **Runners**.
Cuando haces un push, GitHub enciende un Runner (usualmente una máquina virtual limpia con Ubuntu Linux o Windows), le dice que descargue tu código, y ejecuta las instrucciones que tú le hayas programado. Cuando termina, GitHub destruye esa computadora virtual.

Toda esta programación se hace mediante archivos **YAML** que debes guardar dentro de una carpeta muy específica en tu proyecto: `.github/workflows/`.

---

## Repaso de Sintaxis YAML

Antes de escribir nuestro primer *Workflow* de GitHub Actions, debemos entender el lenguaje con el que nos comunicamos con él: YAML.
Si hiciste el curso de Docker Compose, esto te será muy familiar. YAML es un lenguaje de configuración basado estrictamente en el nivel de indentación (los espacios a la izquierda) y no usa llaves como JSON.

**1. Pares Clave-Valor:**
Se definen separando la llave y el valor con dos puntos y un espacio.
```yaml
nombre: Juan
edad: 28
```

**2. Listas (Arrays):**
Se representan usando un guion `-` seguido de un espacio.
```yaml
frutas:
  - Manzana
  - Pera
  - Naranja
```

**3. Objetos Anidados:**
La jerarquía se establece presionando `Espacio` (¡NUNCA uses la tecla Tab, solo espacios espaciadores, preferiblemente 2 por nivel!).
```yaml
servidor:
  puerto: 8080
  base_datos:
    usuario: admin
    password: 123
```

El principal causante de errores en CI/CD es una mala indentación. Un espacio extra donde no va, romperá todo tu pipeline.

---

## Anatomía de un Workflow

Un **Workflow** (Flujo de trabajo) en GitHub Actions es el archivo maestro que dicta qué debe hacer el robot. Crea un archivo llamado `main.yml` (el nombre no importa) dentro de la ruta `.github/workflows/` de tu proyecto.

La estructura obligatoria de este archivo se compone de cuatro bloques principales:

### 1. `name`
Es el nombre de tu Workflow. Es simplemente estético para que puedas identificarlo fácilmente en la pestaña "Actions" de GitHub.
`name: Mi Primer Pipeline CI`

### 2. `on` (Eventos)
Define **cuándo** se va a disparar este robot. ¿Quieres que corra cuando alguien hace push? ¿Cuándo se crea un Pull Request? ¿O quieres que corra todos los días a las 3:00 AM (usando sintaxis cron)?
```yaml
on:
  push:
    branches:
      - main
```
*En este ejemplo, el workflow solo se ejecutará si el push va dirigido específicamente a la rama 'main'.*

### 3. `jobs` (Trabajos)
Un workflow está compuesto de uno o más Jobs (Trabajos). Cada Job se ejecutará en **un Runner diferente** (una computadora separada). Por defecto, los jobs se ejecutan en paralelo al mismo tiempo, a menos que le digas que uno depende del otro.
Debes ponerle un identificador a tu job (ej. `mi_trabajo_de_pruebas`), decirle qué sistema operativo debe usar (`runs-on`) y listar sus pasos.
```yaml
jobs:
  mi_trabajo_de_pruebas:
    runs-on: ubuntu-latest
    steps:
      ...
```

### 4. `steps` (Pasos)
Dentro de un Job, los steps son las instrucciones secuenciales, ordenadas paso a paso, que la computadora virtual (Runner) debe ejecutar de arriba a abajo.
Un step puede ser correr un simple comando de terminal (usando la palabra clave `run`), o usar una **Action** prefabricada por la comunidad (usando la palabra clave `uses`).

En el próximo módulo, juntaremos todos estos bloques para construir nuestro primer pipeline completo de Integración Continua para una aplicación web real.
