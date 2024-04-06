## # 0. 준비
___
1. 사전 준비<br/><br/>

    `Nest.JS`를 사용하기 위해서는 먼저 전역으로 `@nestjs/cli`를 설치해줘야 한다.<br/>
    백엔드 애플리케이션 개발인 경우 되도록 `yarn` 보다 `npm` 사용을 권장한다.<br/>

    ```shell
    npm i -g @nestjs/cli
    ```
    설치가 완료됐다면, 아래 명령 시 nest 관련 명령어를 보여주게 된다.
    ```shell
    nest
    ```
    결과
    ```shell
    Usage: nest <command> [options]
    
    Options:
    -v, --version                                   Output the current version.
    -h, --help                                      Output usage information.
    
    Commands:
    new|n [options] [name]                          Generate Nest application.
    build [options] [app]                           Build Nest application.
    start [options] [app]                           Run Nest application.
    info|i                                          Display Nest project details.
    add [options] <library>                         Adds support for an external library to your project.
    generate|g [options] <schematic> [name] [path]  Generate a Nest element.
    Schematics available on @nestjs/schematics collection:
    ┌───────────────┬─────────────┬──────────────────────────────────────────────┐
    │ name          │ alias       │ description                                  │
    │ application   │ application │ Generate a new application workspace         │
    │ class         │ cl          │ Generate a new class                         │
    │ configuration │ config      │ Generate a CLI configuration file            │
    │ controller    │ co          │ Generate a controller declaration            │
    │ decorator     │ d           │ Generate a custom decorator                  │
    │ filter        │ f           │ Generate a filter declaration                │
    │ gateway       │ ga          │ Generate a gateway declaration               │
    │ guard         │ gu          │ Generate a guard declaration                 │
    │ interceptor   │ itc         │ Generate an interceptor declaration          │
    │ interface     │ itf         │ Generate an interface                        │
    │ library       │ lib         │ Generate a new library within a monorepo     │
    │ middleware    │ mi          │ Generate a middleware declaration            │
    │ module        │ mo          │ Generate a module declaration                │
    │ pipe          │ pi          │ Generate a pipe declaration                  │
    │ provider      │ pr          │ Generate a provider declaration              │
    │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
    │ resource      │ res         │ Generate a new CRUD resource                 │
    │ service       │ s           │ Generate a service declaration               │
    │ sub-app       │ app         │ Generate a new application within a monorepo │
    └───────────────┴─────────────┴──────────────────────────────────────────────┘

    ```
    위 nest 명령어들은 Nest.JS 백엔드 앱 개발에 필수로 사용된다.<br/><br/>

2. 프로젝트 생성<br/><br/>

    본격적으로 Nest.JS 앱을 개발하려면 아래 명령으로 프로젝트를 생성한다.<br/>

    ```shell
    nest new
    ```
    이후 프로젝트명을 입력하라고 뜨는데, 생각해둔 이름을 지어주고 엔터를 누른다.<br/>
    그 다음엔 프로젝트에 `yarn`과 `npm`중 뭘 쓸 건지 골라야 하는데, `npm`을 추천한다.<br/><br/>