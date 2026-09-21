# Módulo 3: Interacción con el Hardware

## El Poder Nivel-Sistema y el SDK de Expo

Una de las razones por las que aprendemos React Native en lugar de simplemente programar páginas web responsivas es para tener acceso profundo e irrestricto al hardware físico del dispositivo. Una página web no puede encender el giroscopio para detectar sacudidas, no puede correr código invisible en segundo plano si la cierras, y su acceso a los archivos locales es minúsculo.

Como mencionamos en el módulo 1, antes de Expo, acceder a la cámara requería abrir Android Studio, escribir puentes en Java, abrir XCode, escribir puentes en Swift, y compilar a mano. 
Expo nos soluciona esto a través de su masivo y excelente ecosistema de librerías nativas conocido como el **Expo SDK**. 

Prácticamente cualquier pieza de hardware (Cámara, GPS, Lector de Huella, Acelerómetro, Base de datos SQLite del teléfono, Almacenamiento seguro, Micrófono, Notificaciones, etc.) tiene un paquete oficial de Expo que tú instalas mediante NPM y manejas usando Hooks de React estándar.

---

## La Barrera de Seguridad: Permisos

Antes de sumergirnos en el código de las cámaras o el GPS, debes comprender el concepto más sagrado de las aplicaciones móviles: **El Consentimiento del Usuario**.

En los años oscuros de la web (y las primeras versiones de Android), si una app quería leer tus fotos, simplemente las leía. Hoy en día, tanto Apple como Google (iOS y Android) son extremadamente estrictos con la privacidad. 

**Ninguna API de hardware crítico funcionará si el usuario no presiona "Aceptar"** en un pop-up nativo del sistema operativo (esos cuadros de diálogo que dicen *"¿Deseas permitir que esta app use tu ubicación?"*).

Si intentas invocar la cámara sin haber solicitado permiso antes, la aplicación hará crash inmediatamente de forma violenta. Todo flujo que interactúe con el hardware debe comenzar por revisar el estado de los permisos, solicitar el permiso si no se ha otorgado, y saber reaccionar con gracia si el usuario pulsa "Denegar" (ej. mostrándole un mensaje explicativo).

---

## La Cámara y la Galería

Para acceder a la cámara o escanear códigos de barras, Expo provee el paquete `expo-camera`. Para acceder al carrete de fotos del usuario, existe `expo-image-picker`.

El patrón de uso de ambos es idéntico: usar el hook de permisos, y luego renderizar el componente o disparar la acción asíncrona.

```jsx
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function LectorCamara() {
  // Hook especial de Expo que maneja todo el estado del pop-up de permisos
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Aún cargando el estado desde el SO
    return <View />;
  }

  if (!permission.granted) {
    // El usuario aún no acepta, o nos denegó el acceso explícitamente.
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }}>Necesitamos tu permiso para usar la cámara</Text>
        <Button onPress={requestPermission} title="Otorgar Permiso" />
      </View>
    );
  }

  // ¡Tenemos permiso! Renderizamos el componente visual de la cámara nativa
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={CameraType.back}>
        {/* Aquí puedes dibujar botones flotantes por encima de la cámara */}
      </Camera>
    </View>
  );
}
```

---

## Geolocalización (GPS)

Conocer las coordenadas del teléfono abre la puerta a un universo de aplicaciones (Delivery, Citas, Mapas, Trackers deportivos). El paquete es `expo-location`.

Nuevamente, requiere permisos, pero la ubicación es un permiso "Especial" (Doble). El sistema operativo preguntará al usuario si desea darte permiso "Solo mientras se usa la app" (Foreground) o "Todo el tiempo, incluso en el bolsillo" (Background). Apple es notoriamente estricto si pides permiso Background sin una buena justificación, y puede rechazar la publicación de tu app en la App Store.

**Uso básico (Foreground):**
```jsx
import * as Location from 'expo-location';

async function obtenerPosicion() {
  // 1. Pedir permiso
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permiso de ubicación denegado');
    return;
  }

  // 2. Pedir al chip GPS del celular las coordenadas actuales
  let localizacion = await Location.getCurrentPositionAsync({});
  console.log('Latitud:', localizacion.coords.latitude);
  console.log('Longitud:', localizacion.coords.longitude);
}
```
*Tip de rendimiento:* `getCurrentPositionAsync` puede tardar varios segundos si el usuario está dentro de un edificio de concreto sin señal GPS. Si necesitas rapidez extrema para cosas que no requieran precisión militar, puedes usar `Location.getLastKnownPositionAsync()`.

---

## Almacenamiento Seguro (Secure Store)

Si tu aplicación requiere que el usuario inicie sesión (Autenticación), recibirás de tu backend un JWT (JSON Web Token) o un Token de Sesión. Necesitas guardar este token para que el usuario no tenga que volver a meter su contraseña la próxima vez que abra la app.

En la web usas `localStorage`. React Native tiene algo similar llamado `AsyncStorage`, pero **jamás, bajo ninguna circunstancia, debes guardar un token de autenticación en AsyncStorage**. Es un almacenamiento plano de texto sin encriptar, y si el teléfono del usuario es hackeado o *rooteado*, el atacante podrá extraer el archivo de texto y robar su cuenta.

Para guardar secretos de alto riesgo (Contraseñas, Tokens Bancarios, Llaves de cifrado), debes utilizar **Expo SecureStore** (`expo-secure-store`).
¿Qué hace la magia aquí? Este paquete no guarda las cosas en archivos normales. Utiliza los chips criptográficos integrados en el hardware del teléfono (El *Keychain* en iOS y el *Keystore* en Android). Esto significa que la información está encriptada por hardware y es matemáticamente imposible de extraer desde afuera.

```jsx
import * as SecureStore from 'expo-secure-store';

async function iniciarSesion(tokenDeApi) {
  // El token se encripta por hardware bajo la llave 'userToken'
  await SecureStore.setItemAsync('userToken', tokenDeApi);
}

async function cargarSesionAlIniciarApp() {
  const token = await SecureStore.getItemAsync('userToken');
  if (token) {
    // Navegar directamente al Home (Logueado)
  }
}
```

---

## Notificaciones Locales

Existen dos tipos de notificaciones en los móviles: **Push Notifications** (que vienen de un servidor de internet lejano y despiertan tu teléfono apagado) y **Notificaciones Locales** (que el propio código dentro de tu app programa para dispararse internamente, como una alarma o un recordatorio del calendario).

El paquete `expo-notifications` maneja ambas con elegancia.
Programar una notificación local es excelente para mantener el *engagement* (compromiso) del usuario (Ej. la app de Duolingo programando un recordatorio interno para que estudies en 24 horas si nota que cerraste la app).

```jsx
import * as Notifications from 'expo-notifications';

// Le decimos al sistema operativo cómo debe comportarse si la alerta llega
// mientras estamos con la app abierta mirando la pantalla.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Queremos que salga el cartelito por arriba
    shouldPlaySound: true, // Queremos el "Ding!"
    shouldSetBadge: false, // La bolita roja del ícono de la app
  }),
});

async function programarRecordatorio() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "¡Es hora de estudiar! 🦉",
      body: "Completa tu lección del día en 5 minutos.",
    },
    trigger: { 
      seconds: 86400, // Disparar dentro de exactamente 24 horas (86,400 segs)
      repeats: false 
    },
  });
}
```
Con este arsenal de paquetes, tu app ha dejado de ser una simple "pantalla interactiva" y se ha convertido en una extensión completa del dispositivo del usuario. En el próximo y último módulo, aprenderemos cómo tomar todo este código y prepararlo para subirlo a las tiendas de Google y Apple.
