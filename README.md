#Bienvenidos al curso de Angular!

##Que es Angular?
+ Front-End framework
+ Orientado a componentes
+ Separado en modulos
+ Comunicación asíncrona
+ Diseño para trabajo colaborativo
+ Expandible

##Por qué Angular?
+ Aplicación web interactiva
+ Comunicación con un API RESTful
+ Comunidad extensa / Gran cantidad de plug-ins.
+ Ordenado y estructurado
+ Curva de aprendizaje corta

##MVC _(Model/View/Controller)_
Data que provee el servidor (Modelo)
```json
{
    "email": "etoro@4geeks.com.ve",
    "name": "Eloy Toro"
}
```
Vista de Front
```html
<p>
    Conectado como <strong>{{ user.name }}</strong> / <i>{{ user.email }}</i>
</p>
```
Controlador
```javascript
.controller(function ($scope) {
    $scope.user = data;
});
```
Resultado
> Conectado como **Eloy Toro** / _etoro@4geeks.com.ve_

#Primera aplicación de angular

```javascript
angular.module('app', []) // Definición de módulo de angular

.controller('MyController', function ($scope) {
    // Modelo a utilizar
    $scope.user = {
        name: "Eloy Toro",
        email: "etoro@4geeks.com.ve"
    };
});
```
```html
<!-- El modulo principal de nuestra aplicación se llama 'app' -->
<body ng-app="app">
    <!-- El controlador 'MyController' opera dentro del div en el que es definido -->
    <div class="container" ng-controller="MyController">
        <p>
            Conectado como <strong>{{ user.name }}</strong> / <i>{{ user.email }}</i>
        </p>
    </div>
</body>
```

#Scopes

Angular separa el scope de los distintos controladores tanto a nivel de lógica como a nivel de DOM.
```javascript
angular.module('app', []) // Definición de módulo de angular

.controller('MyController', function ($scope) {
    $scope.user = {
        name: "Eloy Toro",
        email: "etoro@4geeks.com.ve"
    };
})

.controller('OtherController', function ($scope) {
    $scope.user = {
        name: "Rigoberto",
        email: "rigoberto@4geeks.com.ve"
    };
});
```
```html
<!-- El modulo principal de nuestra aplicación se llama 'app' -->
<body ng-app="app">
    <!-- El controlador 'MyController' opera dentro del div en el que es definido -->
    <div class="container">
        <div class="row" ng-controller="MyController">
            <!-- scope del controlador 'MyController' -->
            <p>
                Conectado como <strong>{{ user.name }}</strong> / <i>{{ user.email }}</i>
            </p>
        </div>
        <div class="row" ng-controller="OtherController">
            <!-- scope del controlador 'OtherController' -->
            <p>
                Conectado como <strong>{{ user.name }}</strong> / <i>{{ user.email }}</i>
            </p>
        </div>
    </div>
</body>
```
Angular usa _block scope_ para diferenciar los diferentes scopes en tu aplicación, muy parecido a como lo hace javascript en su estructura de código.

#Servicios

Angular provee una serie de herramientas que aportan a la lógica de una aplicación

###Usando un servicio
En nuestro controlador
```javascript
.controller('MyController', ['$scope', '$http', function ($scope, $http) {
    $http({
        url: 'api/users/',
        method: 'get',
    }).success(function (data) {
        console.log(data);
    });
}]);
```

###Servicios Comunes
* $http
* $q
* $location
* $element
_*[Documentación de Servicios](https://docs.angularjs.org/api/ng/service)_

###Declarando tus servicios
Normalmente los servicios se usan para crear lógica que muchos componentes de la aplicación necesitan y comparten
```javascript
.service('Errors', function () {
    this.spanish = function (msg) {
        switch (msg) {
            case 'InvalidCredentials': return 'Usuario o contraseña incorrecta';
            case 'InvalidAction': return 'Acción no Válida';
        }
    };

    this.english = function (msg) {
        switch (msg) {
            case 'InvalidCredentials': return 'Invalid username or password';
            case 'InvalidAction': return 'Invalid Action';
        }
    };
});
```
Uso en el controlador
```javascript
.controller('MyController', function ($scope, $http, Errors) {
    $http({
        url: 'api/users/',
        method: 'get',
    })
    .success(function (data) { /*...*/ })
    .error(function (data) {
        console.log(Errors.spanish(data.msg));
    });
});
```

#Directives

Las directivas son una de las herramientas mas útiles y poderosas que Angular ofrece.
+ Altamente reutilizables
+ Ordenan el DOM
+ Separan la aplicación por componentes
```javascript
angular.module('app', [])

.directive('myButton', function () {
    return {
        restrict: 'E', // especifica que esta directiva es un Elemento de HTML
        template: '<button class="btn">Click Me</button>'
        // or
        templateUrl: 'path/to/directive.html'
    };
});
```
```html
<div class="container">
    <!--  El nombre de la directiva cambia de myButton a my-button -->
    <my-button></my-button>
</div>
```
El resultado seria
```html
<div class="container">
    <my-button>
        <button class="btn">Click Me</button>
    </my-button>
</div>
```

##Otras opciones
+ `restrict`: `'E'` para elementos como mostrado en el ejemplo, `'A'` para atributos (asi como lo es `href` o `class`) o `'EA'` para ambas.
+ `replace`: `true` en caso que se desee que se borre el nombre de la directiva una vez compilado el DOM (es `false` por defecto)
+ `transclude`: `true` permite que dentro de los delimitadores de la directiva exista contenido (`false` por defecto)
+ `template`: Describe el html de la directiva inline
+ `templateUrl`: El html de la directiva como archivo en tu aplicación (Recomendado)
