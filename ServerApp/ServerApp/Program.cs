using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<EmployeeContext>(options =>
options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

//Load URL from configuration
var kestrelConfig = builder.Configuration.GetSection("Kestrel:Endpoints:Http:Url").Value;
if (!string.IsNullOrEmpty(kestrelConfig))
{
    builder.WebHost.UseUrls(kestrelConfig);
}

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();

