using Core.Interfaces;
using Infrastructure;


ThesaurusRepository t = new ThesaurusRepository();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opt => {
                    opt.AddPolicy("CorsPolicy", policy => {
                        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
                    });
                });

builder.Services.AddScoped<IThesaurusRepository, ThesaurusRepository>();

var app = builder.Build();

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
