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

Almacenamiento seguro: iOS vs Android

      OS: usa Keychain, con opciones de acceso (por ejemplo, solo después de desbloquear) y puede aprovechar el Secure Enclave para cifrado por hardware.
      Android: usa Android Keystore, que a partir de ciertas versiones también puede apoyarse en hardware. Suele complementarse con EncryptedSharedPreferences o EncryptedFile para datos estructurados.


## 2) ¿Cómo aplicarías el patrón **Adapter** al integrar *EncryptedStorage*?

    El patrón Adapter sirve para que la lógica de negocio no dependa directamente de una librería.
    La idea es definir una interfaz genérica, por ejemplo SecureStore, con métodos getItem, setItem y removeItem. Luego se crea una clase que implemente esa interfaz y por dentro use EncryptedStorage.
    
    export class EncryptedStorageAdapter implements SecureStore {
      async getItem(key) { /* llama a EncryptedStorage.getItem */ }
      async setItem(key, value) { /* llama a EncryptedStorage.setItem */ }
      async removeItem(key) { /* llama a EncryptedStorage.removeItem */ }
    }

Ventaja: si cambio la librería (p. ej., a Keychain/Keystore nativos), sólo implemento otro **Adapter** sin tocar casos de uso ni UI.

---

## 3) ¿Qué ventaja ofrece **react‑query** sobre **Redux** para datos asincrónicos?
    - react‑query resuelve *server state*: **caché** por clave, **deduplicación**, **reintentos**, **refetch en background**, invalidaciones selectivas.  
    - Con Redux, el *async* requiere middlewares (thunk/saga/RTK Query), manejo manual de loading/error y estrategia de caché/invalidación.

**Patrón para aislar reglas de negocio del UI**
 - Para esto aplicaría Clean Architecture con Casos de Uso (Use Cases) y Repositorios en una capa de dominio (o MVVM: *View → ViewModel → UseCases/Repo*).  
      - *UI*: componentes y estados de presentación.  
      - *Dominio*: UseCases con reglas de negocio puras.  
      - *Datos*: implementaciones (API, storage) detrás de interfaces.  
    Esto permite testear reglas sin renderizar UI y cambiar fuentes de datos sin afectar la capa de presentación.
