# DollyShare

![DollyShare Logo](./src/assets/img/logo.png)

> DollyShare es una aplicación que busca ofrecer una solución sencilla y eficiente para compartir archivos y texto de forma rápida.

## Integrantes del grupo

- Meng Fei Dai
- Félix Miguel Velásquez
- Daniel Gutiérrez Recio

## Índice

- [Descripcion](#descripcion)
- [Requisitos de usuario](#requisitos-de-usuario)
- [Registro de tareas](#registro-de-tareas)
- [Diseños mockup de vistas y componentes](#diseños-mockup-de-vistas-y-componentes)
- [Vistas implementadas](#vistas-implementadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Probar el proyecto](#probar-el-proyecto)
- [Capturas de la web](#capturas-de-la-web)

## Descripcion

La aplicación permite crear enlaces que al acceder, contienen datos
compartidos por otros usuarios para poder descargar. También permite a los
usuarios crear cuentas, gestionar sus enlaces activos y controlar quién
accede a ellos.

DollyShare pretende facilitar la colaboración y el intercambio seguro entre
personas con un diseño sencillo y facil de usar. Es ideal para quienes
necesitan enviar contenido sin complicaciones, con opciones de privacidad
incluidas.

## Requisitos de usuario

Los requisitos de usuario los puede encontrar en el documento `.pdf` haciendo [click aqui](./documents/DollyShare%20Requisitos%20de%20Usuario.pdf).

## Registro de tareas

Todas las tareas las puede seguir con detenimiento en nuestro [Trello](https://trello.com/b/ipuLGPtS/dollyshare)

## Diseños mockup de vistas y componentes

Todos los diseños los puede encontrar en el enlace a [Figma haciendo click aqui](https://www.figma.com/design/uBDR50u0AMh0upnVUBthlj/pwm-mockups-sprint-2?node-id=167-1774&p=f).

## Vistas implementadas

- Home: [codigo de la pagina Home](./src/app/views/home/)
- Compartir texto: [codigo de la pagina Share Text](./src/app/views/share-text/)
- Compartir archivos: [codigo de la pagina Share Files](./src/app/views/share-file/)
- Enlace generado: [codigo de la pagina Finish Creation](./src/app/views/finish-creation/)
- Descarga de archivo: [codigo de la pagina de Download Files](./src/app/views/download-file/)
- Descarga de texto: [codigo de la pagina de Download Text](./src/app/views/download-text/)
- Login: [codigo de la página Login](./src/app/views/login/)
- Registro: [codigo de la página Register](./src/app/views/register)
- Registro exitoso: [codigo de la página Register Successful](./src/app/views/register-successful)
- Todas las vistas del panel de usuario: [codigo de la pagina My Account, Change Password y Active Links con Link manager](./src/app/views/user/)

## Estructura del proyecto

El proyecto esta basado en el framework de Angular 18 (LTS), y sigue la siguiente estructura:

- Todos los componentes reutilizables se alojan en la carpeta [de componentes](./src/app/components/)
- Cada componente y vista usan su propio HTML, CSS y TypeScript, y en ciertos casos, se comparten hojas de estilos para mantener uniformidad y coherencia en los estilos a lo largo de la web.
- Se disponen de rutas para cada vista, ademas de enrutamiento dinamico de Angular para cada enlace disponible en el manejo de links: [vea las rutas disponibles aqui](./src/app/app.routes.ts)
- El componente [navbar](./src/app/components/navbar/) y [footer](./src/app/components/footer/) aparecen como template en todas las paginas de la web gracias al template de la [app](./src/app/app.component.html)
- El componente `navbar` tambien implementa variantes dinamicas dependiendo de la pagina visitada, podiendose modificar en `app.routes.ts`.
- Campos de contraseña con habilitacion de previsualizacion de contraseña funcional

## Probar el proyecto

Para probar el proyecto localmente:

1. Instale git
2. Instale NodeJS
3. Clone este repositorio
4. Dentro de la carpeta clonada, ejecute `npm install`
6. Para abrir la web en el navegador, use `npm start`

Todo el backend esta almacenado en la base de datos de Firebase Firestore a tiempo real.

## Capturas de la web

Todas las capturas han sido sacadas desde un navegador, siendo esta la version funcional del proyecto de Angular.

![home view](./documents/screenshots/home%20view.png)
![share files view](./documents/screenshots/share%20files%20view.png)
![share text view](./documents/screenshots/share%20text%20view.png)
![finish creation view](./documents/screenshots/finish%20creation%20view.png)
![download files view](./documents/screenshots/download%20files.png)
![download text view](./documents/screenshots/download%20text.png)
![register view](./documents/screenshots/register%20view.png)
![register successful view](./documents/screenshots/register%20successful.png)
![login view](./documents/screenshots/login%20view.png)
![my account view](./documents/screenshots/my%20account%20view.png)
![change password view](./documents/screenshots/change%20password%20view.png)
![active links view](./documents/screenshots/active%20links%20view.png)
![link manager view](./documents/screenshots/link%20manager%20view.png)

