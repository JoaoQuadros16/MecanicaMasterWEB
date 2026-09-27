using Microsoft.EntityFrameworkCore;
using MecanicaMaster.Data;
using MecanicaMaster.Repositories;
using MecanicaMaster.Services;

var builder = WebApplication.CreateBuilder(args);

// ---------- Serviços ----------

builder.Services.AddOpenApi();
builder.Services.AddControllers();

// Conexão com o SQL Server via EF Core
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// Injeção de dependência: Controller pede IClienteService,
// o .NET entrega uma instância de ClienteService (e assim por diante)
builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IClienteService, ClienteService>();

// CORS: como o front-end (HTML/CSS/JS) vai rodar em outra porta/origem,
// precisamos liberar explicitamente quem pode chamar essa API.
const string corsPolicyName = "FrontendPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy.WithOrigins(
                "https://localhost:7186",   // Live Server (VS Code) - ajuste conforme sua porta
                "http://127.0.0.1:5500"
              )
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ---------- Pipeline HTTP ----------

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors(corsPolicyName);

app.UseAuthorization();

app.MapControllers();

app.Run();
