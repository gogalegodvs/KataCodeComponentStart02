# Kata - Criar Code Component 02

[Tutorial Microsoft](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/implementing-controls-using-typescript)

[Ka Table]([https://learn.microsoft.com/en-us/power-apps/developer/component-framework/implementing-controls-using-typescript](https://ka-table.com/))


# Lista de Comandos

**Criar Componente**

pac pcf init --namespace GalegoComponentInput --name GalegoComponentInput --template field --run-npm-install

**Gerar/Atualizar ficheiro ManifestDesignTypes.d.ts**

npm run refreshTypes

**Build Componente**

npm run build

**Debug solução**

npm start

**Criar pasta da solução**

mkdir GalegoSolution

cd GalegoSolution

**Criar solução**

pac solution init --publisher-name GoGalego --publisher-prefix GoGalego

**Criar referência do componente**

pac solution add-reference --path C:\Users\goncalo.galego\Desktop\CodeComponents

**Gerar Zip da solução**

msbuild /t:restore

**Build solução**

msbuild

