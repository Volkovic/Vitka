# Módulo 3: Despliegue Continuo y Secretos

## Entregando Valor: El Despliegue Continuo (CD)

En el módulo anterior construimos un pipeline que aprueba o rechaza el código (CI). Pero una vez que el código es inmaculado y ha sido fusionado a la rama `main`, ese código todavía sigue "atrapado" en GitHub. Los usuarios de nuestra aplicación web siguen viendo la versión antigua. 

Para completar el ciclo, debemos enviarle este nuevo código a los servidores de producción de manera automatizada. A esto se le conoce como **Continuous Deployment (Despliegue Continuo)** o **Continuous Delivery**.

¿Cuándo se debe ejecutar un despliegue? La regla de oro en DevOps es que **nunca se despliega a producción desde ramas de desarrollo** (como `feature/carrito`). Únicamente se despliega cuando un cambio impacta directamente en la rama principal (`main` o `master`), porque esa rama representa la verdad oficial de lo que debería estar viendo el mundo real en vivo.

---

## Aislando el Trabajo: Dependencias de Jobs

Podríamos agregar el comando de despliegue al final del archivo `ci.yml` que creamos en el módulo 2. Pero esto es peligroso. Queremos que nuestro pipeline de Integración Continua (pruebas) corra en *cualquier* rama para atrapar errores rápido, pero queremos que el Despliegue ocurra *solo* si estamos en `main` Y además, *solo* si las pruebas pasaron.

Para lograr esta lógica arquitectónica, en lugar de poner todos los `steps` en un solo saco enorme, los dividimos en dos **Jobs (Trabajos)** independientes.

Recuerda que, por defecto, GitHub Actions intenta correr todos los Jobs al mismo tiempo en paralelo (en computadoras separadas) para ahorrar tiempo. Debemos decirle que el Trabajo 2 (Despliegue) **debe esperar obligatoriamente** a que el Trabajo 1 (Pruebas) termine exitosamente.

Usamos la palabra clave **`needs`** para crear esta dependencia:

```yaml
jobs:
  # Trabajo 1: Pruebas (Igual al modulo anterior)
  pruebas_y_estilos:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # ... (setup-node, npm ci, test)

  # Trabajo 2: Despliegue
  desplegar_a_produccion:
    needs: pruebas_y_estilos # ESTA LINEA ES VITAL
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' # Solo si la rama es 'main'
    steps:
      - name: Iniciando el despliegue...
        run: echo "Desplegando en los servidores..."
```

Con `needs: pruebas_y_estilos`, GitHub mantendrá el Job 2 en pausa hasta que el Job 1 termine y arroje un chequeo verde. El condicional `if:` asegura que el despliegue no ocurra si el PR era hacia una rama llamada `develop`.

---

## El Peligro de las Credenciales Estáticas

Tenemos el Job de despliegue, ahora necesitamos decirle al Runner que se conecte a nuestro servidor real (ej. un VPS en AWS o una plataforma como Vercel) y mueva los archivos. 

Para conectarse a cualquier servidor, el Runner necesitará autenticarse. Necesita contraseñas, *Access Tokens*, o llaves criptográficas SSH.
El impulso natural (y mortal) de un desarrollador inexperto es escribir la contraseña directamente dentro del archivo YAML:

```yaml
# ¡NUNCA HAGAS ESTO!
    steps:
      - name: Desplegar por FTP
        run: ftp -u "admin" -p "MiPasswordSuperSecreta123" my-server.com
```

¡Esto es un desastre de seguridad cibernética masivo! El archivo `.github/workflows/main.yml` es un archivo de texto plano que **vive dentro de tu repositorio**. Cualquiera en tu empresa (o cualquier persona del internet si tu repo es público) puede leer esa contraseña, robarla, entrar a tu servidor y borrar toda tu base de datos de producción. 

Las credenciales jamás deben existir escritas directamente (hardcoded) en ningún archivo del código fuente.

---

## Bóveda Segura: GitHub Secrets

Para resolver el problema de las credenciales, GitHub ofrece un sistema de bóveda criptográfica de grado bancario llamado **GitHub Secrets**.

En la interfaz gráfica web de tu repositorio de GitHub, puedes navegar a *Settings -> Secrets and variables -> Actions*.
Allí, puedes crear un nuevo "Secreto". Tú eliges un nombre (ejemplo: `SERVER_PASSWORD`) y pegas el valor real. Una vez guardado, **ni siquiera tú podrás volver a ver ese valor jamás**. Solo podrás sobreescribirlo o borrarlo. GitHub lo encripta en un solo sentido.

¿Cómo usamos este secreto guardado en la bóveda dentro de nuestro archivo YAML público?
Usando la sintaxis de inyección de variables de GitHub Actions: `${{ secrets.NOMBRE_DEL_SECRETO }}`.

```yaml
    steps:
      - name: Imprimir secreto (Seguro)
        run: echo "Iniciando sesion con clave secreta"
        env:
          MI_TOKEN: ${{ secrets.SERVER_PASSWORD }}
```
*Dato curioso:* Si por algún error intentas hacer que el Runner imprima el secreto en la consola (ej. `echo ${{ secrets.PASSWORD }}`), GitHub es tan inteligente que detectará la fuga en vivo y censurará la contraseña en los logs de la interfaz, reemplazándola por asteriscos `***`.

---

## Un Ejemplo del Mundo Real (Deploy)

Existen miles de formas de desplegar una aplicación (FTP, contenedores Docker remotos, SCP, Serverless, PaaS). Afortunadamente, no tienes que saber escribir scripts de bash ultracomplejos para conectarte por SSH a Amazon AWS. ¡La comunidad ya lo hizo por ti creando Actions prefabricadas!

Veamos un ejemplo real usando Vercel (una popular plataforma de despliegue para Node.js, Next.js y React). La comunidad ha creado la Action `amondnet/vercel-action`.

```yaml
  desplegar_a_produccion:
    needs: pruebas_y_estilos
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      # 1. Descargamos el código ya testeado en este nuevo Runner
      - uses: actions/checkout@v4 
      
      # 2. Usamos la Action de la comunidad para comunicarnos con Vercel
      - name: Desplegar a Vercel Producción
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

¡Eso es todo! En menos de 20 líneas de YAML, has configurado un sistema por el que hace apenas una década las empresas pagaban millones de dólares en consultoría.
Cuando alguien apruebe un Pull Request hacia la rama `main`, este script inyectará silenciosamente tus secretos altamente cifrados en el comando de Vercel, el cual tomará tu código y lo publicará mágicamente en la URL de producción para que todo el planeta lo vea.

---

## Mejores Prácticas y Conclusiones del Curso

Para cerrar este curso, recordemos las tres reglas de oro para mantener Pipelines sanos y mantenibles a largo plazo, consolidando tu estándar como profesional del código:

1. **Mantén los Workflows simples y rápidos:**
   El CI/CD debe ser tu red de seguridad invisible, no un lastre de plomo. Si tu pipeline toma 30 minutos en correr, los desarrolladores se frustrarán y dejarán de subir código frecuentemente. Utiliza cachés agresivos para acelerar las instalaciones.
2. **Separa responsabilidades (Jobs):**
   No mezcles Linting, Testing y Deployment en un solo Job gigante. Si lo divides usando la regla `needs:`, cuando ocurra un error, sabrás inmediatamente por la interfaz gráfica en qué fase exacta se rompió la cadena, facilitando enormemente el diagnóstico.
3. **El Secreto Absoluto:**
   Jamás introduzcas una API Key, Token o Password directamente en el archivo YAML, por insignificante que parezca. Trata a tus secretos con paranoia y alójalo todo en los *GitHub Secrets*.

Felicidades. Ahora no solo sabes cómo escribir código, sino cómo construir las vías del tren automatizadas que transportan ese código desde tu editor de texto local, a través de rigurosas pruebas automáticas, hasta los servidores reales en producción.
Has dado el primer gran paso hacia la cultura **DevOps**.
