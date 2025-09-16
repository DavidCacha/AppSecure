# SecureAuthMobile — Frontend (React Native)

App móvil (React Native 0.81 + TypeScript) para login/registro contra el backend .NET.
Incluye estado global con Zustand (persistido y cifrado), TanStack Query, Formik + Yup, interceptores de Axios y pantalla Home protegida.

## 🚀 Requisitos

Node 18+ (recomendado 18 LTS o 20)

Android Studio + SDK (Java 17)

(Opcional iOS) Xcode 15+ en macOS

Backend corriendo en http://localhost:5087

No necesitas cambiar IP en el código para dispositivo físico: usamos adb reverse.

## 📥 Clonar e instalar

git clone https://github.com/DavidCacha/MLG.git

cd MLG/frontend/SecureAuthMobile

npm install

# iOS (solo macOS)

cd ios && pod install && cd ..

## ▶️ Ejecución

npm run android || npm run ios

El emulador Android resuelve localhost como 10.0.2.2 (ya contemplado en el código). No hace falta adb reverse para emulador.

## 🌍 Configuración de red

La URL base se calcula automáticamente en src/config/env.ts:

Emulador Android → http://10.0.2.2:5087

Simulador iOS → http://localhost:5087

Dispositivo físico (Android/iOS) → http://localhost:5087 usando adb reverse

Ya no hay que cambiar IP al usar dispositivo físico por USB; con npm run dev:android es suficiente.

## 🔐 Seguridad y estado

Token guardado con Zustand + react-native-encrypted-storage

iOS → Keychain

Android → EncryptedSharedPreferences

Axios interceptors añaden Authorization: Bearer <token>

AuthProvider valida sesión (GET /auth/me) al iniciar; si expira → logout

Formik + Yup para validación de formularios

React Query para estados de loading, error y caché de peticiones

## 🧱 Estructura

SecureAuthMobile/

  src/

    api/client.ts                # axios + interceptores (token)
    
    config/env.ts                # BASE_URL automática (localhost/10.0.2.2/adb reverse)
    
    providers/QueryProvider.tsx  # TanStack Query client
    
    providers/AuthProvider.tsx   # Sincroniza sesión /auth/me
    
    store/auth.ts                # Zustand + persist (EncryptedStorage)
    
    screens/
    
      LoginScreen.tsx
      
      RegisterScreen.tsx
      
      HomeScreen.tsx
    
    components/
    
      TextField.tsx
      
      SocialAuthRow.tsx
  
  App.tsx


  
