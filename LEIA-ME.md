# MecanicaMaster — Estrutura inicial

## O que foi feito

### Backend (`MecanicaMaster.Api/`)
- Corrigido o `RootNamespace` no `.csproj` (estava `MecanicaMaster_`, agora é `MecanicaMaster`)
- Adicionados os pacotes:
  - `Microsoft.EntityFrameworkCore.Design`
  - `Pomelo.EntityFrameworkCore.MySql` (EF Core pro MySQL)
- Criada a estrutura de pastas: `Models`, `DTOs`, `Data`, `Repositories`, `Services`, `Controllers`
- Implementado o fluxo completo **Controller → Service → Repository → DbContext**
  usando `Cliente` como entidade de exemplo (CRUD completo: GET, POST, PUT, DELETE)
- Configurado CORS pra liberar o front-end (rodando em outra porta) a chamar a API
- Connection string do MySQL em `appsettings.Development.json` (você precisa colocar sua senha)

### Frontend (`MecanicaMaster.Web/`)
- Projeto HTML/CSS/JS puro, separado do backend
- Tela de exemplo `pages/clientes.html` que lista, cria e exclui clientes
- `js/api/clientesApi.js` centraliza as chamadas `fetch` pra API

## Próximos passos (na sua máquina)

1. **Abra `MecanicaMaster.Api` no Visual Studio** (ou `cd` até a pasta e rode `dotnet restore`)
   para baixar os pacotes do EF Core e Pomelo.

2. **Ajuste a connection string** em `appsettings.Development.json`:
   ```
   Server=localhost;Port=3306;Database=mecanica_master;User=root;Password=SUA_SENHA_AQUI;
   ```

3. **Crie o banco e a tabela via Migration** (isso já vai criar o banco `mecanica_master` se ele
   não existir, com base no Model `Cliente`):
   ```
   dotnet ef migrations add InicialCliente
   dotnet ef database update
   ```
   (Se o comando `dotnet ef` não existir, instale a ferramenta global uma vez com
   `dotnet tool install --global dotnet-ef`)

4. **Rode a API**: `dotnet run` (ou F5 no Visual Studio). Anote a porta HTTPS que aparece
   no console (ex: `https://localhost:7123`) e atualize essa URL em
   `MecanicaMaster.Web/js/api/clientesApi.js` (constante `API_BASE_URL`).

5. **Rode o front-end**: abra `MecanicaMaster.Web/index.html` com a extensão
   "Live Server" do VS Code (ou qualquer servidor HTTP simples). Não abra o arquivo
   direto no navegador (`file://`) — sem servidor o CORS vai bloquear as requisições.

6. Teste criando um cliente pela tela — se aparecer na lista, o fluxo completo
   (Front → API → EF Core → MySQL) está funcionando.

## Daqui pra frente

Pra cada nova entidade (Veiculo, OrdemServico, etc.), o padrão é sempre o mesmo:
`Model` → `DTOs` → `DbSet` no `AppDbContext` → `Repository`/`IRepository` →
`Service`/`IService` → `Controller` → registrar Repository e Service no `Program.cs`.
