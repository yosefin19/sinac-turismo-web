# Proyecto SINAC Turismo: Web

La presente página web fue realizada por Brandon Ledezma Fernández, Walter Morales Vásquez y Yosefin Solano Marín con la finalidad de que sea de utilidad para la organización SINAC en Costa Rica, la cual es encargada de la administración de las áreas protegidas e integra las competencias en materia forestal, vida silvestre  y la protección y conservación del uso de cuencas hidrográficas y sistemas hídricos con el fin de dictar políticas, planificar y ejecutar procesos dirigidos a lograr la sostenibilidad en el manejo de los recursos naturales del país.

<p align="center">
  <img src="https://user-images.githubusercontent.com/56206208/145647973-8189768b-47f2-4b38-9cc8-15b9d685865c.png"/>
<p align="center">

## Aplicaciones relacionadas
- SINAC Turismo: Móvil (Aplicación móvil para brindar información sobre áreas de conservación y destinos turísticos) 
https://github.com/yosefin19/sinac-turismo-mobile

- SINAC Turismo: Web (Página web para la administración \[visualización, inserción, modificación y eliminación\] de la información)
https://github.com/yosefin19/sinac-turismo-web

- SINAC Turismo: API (API donde se obtiene y registra la información relacionada con las aplicaciones) 
https://github.com/yosefin19/sinac-turismo-api

## Objetivo

Con el desarrollo de esta página web se plantea brindar a los administradores de la aplicación móvil una manera fácil de visualizar, insertar, modificar y eliminar. La finalidad de esto concluye en resolver el problema de que los turistas costarricenses o internacionales que visitan la página del SINAC requieren de un fácil acceso a la información de sitios turísticos registrados por dicha organización, asimismo, existe la necesidad de poder mejorar el proceso de compra y reserva para visitar estos lugares. Esta aplicación plantea permitir a los turistas realizar dichas acciones de una forma centralizada y rápida, así como también poder compartir sus experiencias en los destinos registrados con las demás personas.

## Requerimientos generales

### 1 Administración de áreas de conservación
Un usuario administrador puede realizar funciones de creación, lectura, actualización y eliminación de las áreas de conservación en la aplicación. En esta podrá aplicar lo anterior a un listado de imágenes de la zona, el nombre del área y la ubicación sobre el mapa del mismo.
### 2 Administración de destinos turísticos.
Deberá existir un conjunto de opciones para crear, mostrar, modificar y eliminar destinos turísticos para usuarios administradores. Cada destino turístico tendrá nombre, descripción, fotografías, horario, tarifas, recomendaciones, dificultad y ubicación exacta en el mapa.
### 3 Administración de usuarios.
Un administrador es capaz de realizar funciones de creación, lectura, actualización y eliminación de los usuarios en la aplicación. Presenta campos para nombre de usuario, correo electrónico, contraseña y teléfono. La contraseña del usuario deberá encontrarse cifrada.
### 4 Administración de perfiles.
Deberá existir un conjunto de opciones para crear, actualizar, mostrar y eliminar perfiles de usuarios para usuarios administradores. Cada perfil contiene el nombre, correo electrónico, número telefónico y contraseña de un usuario.

## Ejecución de programa

- Es necesario contar con NodeJS y npm, de igual forma es necesario contar con React Native.

- Es necesario descargar el contenido desde su respectivo repositorio sinac-turismo-web.

- Posteriormente es necesario descargar y instalar la dependencias necesarias por lo que se hace uso de npm:

```console
npm install
```

- Es necesario contar con un servidor HTTP, puede ser nginx, Apache Server u otro según las necesidades y realizar las configuraciones necesarias.

- En este momento es posible poner a correr la página web utilizando el comando:

```console
npm start
```

- Para compilar la aplicación es necesario ejecutar el siguiente comando el cual creará una carpeta build con el resultado:

```console
npm run build
``` 

- La carpeta creada es la que se debe establecer en el servidor HTTP utilizado como recurso, para que pueda ser accedido al sitio de administración.

## Estado

La aplicación funciona completamente, implementando todas las funcionalidades que fueron solicitadas. Se realizaron las pruebas de funcionalidad correspondientes a cada uno de los componentes.

## Realizado por:

* Brandon Ledezma Fernández
* Walter Morales Vásquez
* Yosefin Solano Marín 
