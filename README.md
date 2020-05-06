Lib -> Runox-Game-Engine typescript
Backend -> Node
API -> express
Frontends -> javascript / Angular / React / Vue / Svelte
DB -> Firebase / Postgresql / Redis



# Como agregar un nuevo proyecto
- crear el proyecto en packages
- ejecutar `lerna boostrap`
- ejecutamos `lerna add ${nombre_folder}`
- SOMOS FELICES! 

# Como ejecutar los comandos del package.json
`lerna run ng:start --stream` esto ejecuta todos los comandos 
`npm run ng:start` que se encuentren
en los package.json que estan dentro de la carpeta packages.