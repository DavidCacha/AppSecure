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

## Dispositivo fisico

Se de correr los siguientes comandos para configurar un puerto en especifico.

    adb reverse --remove-all
    adb reverse tcp:5087 tcp:5087   
    adb reverse tcp:8081 tcp:8081 

Validacion: 

![WhatsApp Image 2025-09-16 at 1 49 43 AM](https://github.com/user-attachments/assets/893bae4c-a0a6-4610-a25c-60289e88c2c4)

Emulador:

<img width="395" height="695" alt="Captura de pantalla 2025-09-15 155438" src="https://github.com/user-attachments/assets/6ec2cbc9-6566-4cf9-b27d-5df1fd2631a6" />



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


# Backend (.NET 8) – Prueba Técnica
API de autenticación segura (registro, login, /auth/me) con Clean Architecture + CQRS (MediatR), EF Core (SQLite), JWT, BCrypt y Swagger. Incluye seeding de usuario demo en Development, rate limiting para /auth/login, ProblemDetails, CORS por política y HealthChecks.

________________________________________

## 1) Requisitos
•	.NET SDK 8 (8.0.x)

•	(Opcional) dotnet-ef tools

    o	Global: dotnet tool install --global dotnet-ef --version 8.*
    o	Local (alternativa):
    o	dotnet new tool-manifest
    o	dotnet tool install dotnet-ef --version 8.*

•	SQLite (no necesitas instalar servidor; el archivo app.db se crea solo).

•	(HTTPS local) Confiar certificado dev: dotnet dev-certs https --trust.
________________________________________
2) Clonar el proyecto
# Clona tu repo
git clone https://github.com/<tu-usuario>/<tu-repo>.git
cd <tu-repo>

# Estructura esperada (resumen)
    .
    ├─ frontend/
    └─ backend/
       └─ src/
          ├─ SecureAuth.Domain/
          ├─ SecureAuth.Application/
          ├─ SecureAuth.Infrastructure/
          └─ SecureAuth.Presentation/

## 3) Configuración (appsettings.json)
    Archivo: backend/src/SecureAuth.Presentation/appsettings.json
    {
      "ConnectionStrings": { "Default": "Data Source=app.db" },
      "Auth": {
        "JwtKey": "CHANGE_THIS_DEVELOPMENT_KEY_32+CHARS",
        "Issuer": "secureauth",
        "Audience": "secureauth.mobile"
      },
      "Logging": { "LogLevel": { "Default": "Information", "Microsoft.AspNetCore": "Warning" } },
      "AllowedHosts": "*"
    }
    
También puedes usar variables de entorno (sobrescriben appsettings):

•	Auth__JwtKey, Auth__Issuer, Auth__Audience

•	ConnectionStrings__Default
________________________________________
## 4) Restaurar dependencias

Desde la carpeta backend:

                      cd backend
                      dotnet restore
________________________________________
## 5) Base de datos (EF Core + SQLite)

Opción A – CLI (recomendada para primera vez)

# Crear migración inicial (si aún no existe)
    dotnet ef migrations add InitialCreate \
      --project ./src/SecureAuth.Infrastructure \
      --startup-project ./src/SecureAuth.Presentation

# Aplicar migraciones (crea app.db)
    dotnet ef database update \
      --project ./src/SecureAuth.Infrastructure \
      --startup-project ./src/SecureAuth.Presentation
________________________________________
## 6) Ejecutar la API
# Puertos dinámicos (los verás en consola)
    dotnet run --project ./src/SecureAuth.Presentation
    
    dotnet run --project ./src/SecureAuth.Presentation 
Abre Swagger: http://localhost:5087/swagger 

________________________________________
7) Probar (Swagger / Postman / cURL)
Swagger
1.	POST /auth/register para crear usuario (o usa el demo).
   
3.	POST /auth/login → copia accessToken.

4.	Authorize → pega Bearer <token> → GET /auth/me.

<img width="1800" height="276" alt="Captura de pantalla 2025-09-15 160218" src="https://github.com/user-attachments/assets/43f54ba1-b96c-4664-9c46-9877d3c203ec" />

<img width="538" height="581" alt="Captura de pantalla 2025-09-15 160239" src="https://github.com/user-attachments/assets/faac888b-9b29-450a-a035-b1e9e5b589ce" />

<img width="763" height="397" alt="Captura de pantalla 2025-09-15 160459" src="https://github.com/user-attachments/assets/1ca3a6ca-90a5-46ca-971b-3f108248484d" />

<img width="805" height="380" alt="Captura de pantalla 2025-09-15 160529" src="https://github.com/user-attachments/assets/a536bf01-4776-46d8-a215-f298cfd6c113" />

Postman
•	Base URL: http://localhost:5087 (o https://localhost:7087).

•	Register (POST /auth/register):

•	{ "email": "alguien@example.com", "password": "Secret123!", "name": "Nombre" }

•	Login (POST /auth/login):

•	{ "email": "alguien@example.com", "password": "Secret123!" }
<img width="1171" height="611" alt="Captura de pantalla 2025-09-15 155956" src="https://github.com/user-attachments/assets/bc330872-bc9b-4b00-bf53-e403b462e6f9" />

•	Me (GET /auth/me): Header Authorization: Bearer <accessToken>.

<img width="1057" height="432" alt="Captura de pantalla 2025-09-15 160035" src="https://github.com/user-attachments/assets/c5acef99-a7ff-4204-91c2-59428f3d73bb" />

________________________________________
## 8) Arquitectura (Clean Architecture)

•	Domain: entidades y interfaces (IUserRepository).

•	Application: CQRS (MediatR: Commands/Handlers), DTOs, FluentValidation, y interfaces de seguridad (IPasswordHasher, IJwtTokenFactory).

•	Infrastructure: EF Core (DbContext, Migraciones), Repositorios, BCrypt y JWT (implementaciones), AddInfrastructure (DI).

•	Presentation: API (Controllers), JWT Bearer, Swagger, CORS, Rate Limiting, ProblemDetails, HealthChecks.


## 9) Endpoints

•	POST /auth/register → crea usuario.

•	POST /auth/login → devuelve { accessToken, expiresAt, user }.

•	GET /auth/me (JWT) → devuelve { id, email, name }.

Body de registro
{ "email": "alguien@example.com", "password": "Secret123!", "name": "Nombre" }
________________________________________
## 10) Seguridad aplicada

•	BCrypt para contraseñas (nunca texto plano).

•	JWT HMAC-SHA256, ClockSkew = 0.

•	Issuer/Audience configurables:

          o	En Program.cs puedes activar validación estricta:
          o	ValidateIssuer = true;  ValidIssuer = builder.Configuration["Auth:Issuer"];
          o	ValidateAudience = true; ValidAudience = builder.Configuration["Auth:Audience"];
          o	Y emitir issuer/audience en JwtTokenFactory.
•	CORS con política (origins de la app).

•	Rate limiting: política login (5 intentos/min por IP) aplicada a POST /auth/login.

•	ProblemDetails: respuestas consistentes para errores no controlados


