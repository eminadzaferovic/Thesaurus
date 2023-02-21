using Core.Interfaces;
using Infrastructure;


ThesaurusRepository t = new ThesaurusRepository();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


// var provider = builder.Services.BuildServiceProvider();
// var config = provider.GetRequiredService<IConfiguration>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opt => {
                    opt.AddPolicy("CorsPolicy", policy => {
                        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
                    });
                });

builder.Services.AddScoped<IThesaurusRepository, ThesaurusRepository>();

// builder.Services.AddSingleton<IConnectionMultiplexer>(c => {
//                     var configuration = ConfigurationOptions.Parse(config.GetConnectionString("Redis"), true);
//                     return ConnectionMultiplexer.Connect(configuration);
//                 });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("CorsPolicy");

app.Run();
