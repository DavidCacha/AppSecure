# Sección 5: Teoría y preguntas abiertas (20 pts) — answers.md

## 1) 3 amenazas comunes en apps móviles bancarias y mitigaciones + diferencias de almacenamiento seguro iOS vs Android

**Amenazas y mitigaciones**

    a. Interceptación de datos (ataques tipo MITM)
        El riesgo es que alguien intercepte la comunicación entre la app y el servidor.
        
        Mitigación: usar HTTPS/TLS actualizado, certificate pinning y deshabilitar conexiones inseguras. También conviene validar el certificado en la app y no aceptar proxies desconocidos.

    b. Ingeniería inversa o modificación del código
        El paquete de la app puede ser decompilado o alterado.
        Mitigación: ofuscar y minificar el código, verificar la integridad del binario en tiempo de ejecución, e implementar detección de dispositivos con root o jailbreak.

    c. Almacenamiento inseguro de credenciales
      Tokens o contraseñas pueden quedar en texto plano.
      Mitigación: guardar solo en mecanismos seguros: Keychain en iOS y Android Keystore o EncryptedSharedPreferences en Android. Evitar logs sensibles y aplicar expiración de tokens.

## 2) Almacenamiento seguro: iOS vs Android

      OS: usa Keychain, con opciones de acceso (por ejemplo, solo después de desbloquear) y puede aprovechar el Secure Enclave para cifrado por hardware.
      Android: usa Android Keystore, que a partir de ciertas versiones también puede apoyarse en hardware. Suele complementarse con EncryptedSharedPreferences o EncryptedFile para datos estructurados.


## 3) ¿Cómo aplicarías el patrón **Adapter** al integrar *EncryptedStorage*?

    El patrón Adapter sirve para que la lógica de negocio no dependa directamente de una librería.
    La idea es definir una interfaz genérica, por ejemplo SecureStore, con métodos getItem, setItem y removeItem. Luego se crea una clase que implemente esa interfaz y por dentro use EncryptedStorage.
    
    export class EncryptedStorageAdapter implements SecureStore {
      async getItem(key) { /* llama a EncryptedStorage.getItem */ }
      async setItem(key, value) { /* llama a EncryptedStorage.setItem */ }
      async removeItem(key) { /* llama a EncryptedStorage.removeItem */ }
    }

Ventaja: si cambio la librería (p. ej., a Keychain/Keystore nativos), sólo implemento otro **Adapter** sin tocar casos de uso ni UI.

---

## 4) ¿Qué ventaja ofrece **react‑query** sobre **Redux** para datos asincrónicos?
    - react‑query resuelve *server state*: **caché** por clave, **deduplicación**, **reintentos**, **refetch en background**, invalidaciones selectivas.  
    - Con Redux, el *async* requiere middlewares (thunk/saga/RTK Query), manejo manual de loading/error y estrategia de caché/invalidación.

## 5) Patrón para aislar reglas de negocio del UI
 - Para esto aplicaría Clean Architecture con Casos de Uso (Use Cases) y Repositorios en una capa de dominio (o MVVM: *View → ViewModel → UseCases/Repo*).  
      - *UI*: componentes y estados de presentación.  
      - *Dominio*: UseCases con reglas de negocio puras.  
      - *Datos*: implementaciones (API, storage) detrás de interfaces.  
    Esto permite testear reglas sin renderizar UI y cambiar fuentes de datos sin afectar la capa de presentación.

# Sección 6: Refactor de código inseguro (Bonus 10 puntos) Corrige el siguiente fragmento:

<img width="726" height="125" alt="imagen" src="https://github.com/user-attachments/assets/f41db0e5-98ab-4129-91ab-8f98558dbf26" />

Es una version mejorada referente los puntos clave solicitados:


    import axios from 'axios';
    import EncryptedStorage from 'react-native-encrypted-storage'; // mejor que AsyncStorage
    
    const login = async (email: string, password: string) => {
      try {
        // 1. Siempre HTTPS
        const response = await axios.post(
          'https://api.banco.com/login',       // ← importante: https
          { email, password },
          {
            timeout: 10000,                    // ← evita cuelgues
            validateStatus: status => status < 500 // deja pasar 4xx para manejarlo
          }
        );
    
        // 2. Mecanismo defensivo ante respuestas inesperadas
        if (!response.data || !response.data.token) {
          throw new Error('Respuesta inválida del servidor');
        }
    
        // 3. Almacenamiento seguro
        await EncryptedStorage.setItem(
          'auth_token',
          response.data.token
        );
    
        // 4. Protección en segundo plano:
        //    se puede limpiar token temporal en appState o usar biometric unlock
        //    (ejemplo simple: invalidar token si app queda en background mucho tiempo)
        //    AppState y timers se configuran en otro módulo.
    
        navigation.navigate('Home');
    
      } catch (err) {
        // Mecanismo defensivo ante errores de red, timeouts, etc.
        console.error('Error en login:', err);
        Alert.alert(
          'Error de conexión',
          'No se pudo iniciar sesión. Verifica tu conexión e inténtalo de nuevo.'
        );
      }
    };

## Puntos clave explicados

HTTPS obligatorio: la URL ahora es https://api.banco.com/login. Asegúrate de que el backend tenga un certificado TLS válido.

Almacenamiento seguro: EncryptedStorage cifra en reposo y usa Keychain (iOS) o Android Keystore, a diferencia de AsyncStorage que solo guarda en texto plano.

Mecanismo defensivo contra errores:

timeout y validateStatus previenen bloqueos y manejan correctamente códigos de error del servidor.

throw new Error si no viene un token válido.

try/catch con mensajes al usuario.

Protección en segundo plano:

Se puede implementar una política para limpiar o revalidar el token cuando la app entra en background (AppState de React Native) o exigir desbloqueo biométrico al reingresar.

Otra opción es que el token tenga expiración corta y se renueve de manera segura.
