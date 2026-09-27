# MecanicaMaster

Sistema web de gestão para oficinas mecânicas: cadastro de clientes, veículos e ordens de serviço.

> 🚧 **Em desenvolvimento.** Projeto de estudo e portfólio, construído passo a passo para aprender desenvolvimento web com .NET. É a evolução de uma versão desktop (C# + SQL Server) que fiz antes.

## Sobre o projeto

Oficinas pequenas costumam controlar clientes, carros e serviços em cadernos ou planilhas. O MecanicaMaster centraliza isso em um sistema web:

- **Clientes**: cadastro com nome, telefone e email
- **Veículos**: carros de cada cliente (placa, modelo, ano)
- **Ordens de serviço**: serviços e peças de cada atendimento, com status e valor total

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | C# · ASP.NET Core Web API (.NET 10) |
| Acesso a dados | Entity Framework Core (Code First + Migrations) |
| Banco de dados | SQL Server |
| Frontend | HTML, CSS e JavaScript puro (Fetch API) |
| Versionamento | Git + GitHub |

## Arquitetura

O backend é dividido em camadas, cada uma com uma responsabilidade:

```
Frontend (HTML/JS)
      │  requisições HTTP (JSON)
      ▼
Controllers   → recebem a requisição e devolvem a resposta HTTP
      ▼
Services      → regras de negócio e validações
      ▼
Repositories  → acesso ao banco via Entity Framework Core
      ▼
SQL Server
```

- **Models**: entidades que viram tabelas no banco
- **DTOs**: objetos de entrada e saída da API, para não expor as entidades diretamente
- **Injeção de dependência**: Services e Repositories são registrados no `Program.cs` e injetados via interface

## Estrutura de pastas

```
MecanicaMaster/
├── MecanicaMaster.Api/       # API REST em ASP.NET Core
│   ├── Controllers/
│   ├── DTOs/
│   ├── Data/                 # AppDbContext
│   ├── Migrations/           # histórico de alterações do banco
│   ├── Models/
│   ├── Repositories/
│   ├── Services/
│   └── Program.cs
└── MecanicaMaster.Web/       # Frontend
    ├── css/
    ├── js/
    │   └── api/              # funções que chamam a API
    ├── pages/
    └── index.html
```

## Roadmap

- [x] Estrutura inicial da API e do frontend
- [ ] CRUD de Clientes (API + tela)
- [ ] CRUD de Veículos, com relacionamento Cliente → Veículos
- [ ] Ordens de Serviço
- [ ] Validações e tratamento de erros
- [ ] Autenticação com JWT
- [ ] Testes automatizados (xUnit)
- [ ] Frontend em React
- [ ] Docker

## Como rodar localmente

### Pré-requisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- SQL Server (Express ou Developer)
- Ferramenta do EF Core: `dotnet tool install --global dotnet-ef`
- VS Code com a extensão **Live Server**

### Backend

1. Ajuste a connection string em `MecanicaMaster.Api/appsettings.Development.json` para a sua instância do SQL Server.
2. Crie o banco a partir das migrations:
   ```
   cd MecanicaMaster.Api
   dotnet ef database update
   ```
3. Rode a API:
   ```
   dotnet run --launch-profile https
   ```
   A API sobe em `https://localhost:7186`.

### Frontend

Abra `MecanicaMaster.Web/index.html` com o Live Server (ele roda em `http://127.0.0.1:5500`). Não abra o arquivo direto no navegador (`file://`), porque as requisições para a API vão ser bloqueadas.

## Autor

João Quadros · [GitHub](https://github.com/JoaoQuadros16)
