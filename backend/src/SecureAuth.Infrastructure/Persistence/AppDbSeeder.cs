using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SecureAuth.Application.Common.Security;
using SecureAuth.Domain.Entities;

namespace SecureAuth.Infrastructure.Persistence;

public static class AppDbSeeder
{
    public static void Seed(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var ctx    = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var hasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();

        // Asegura que la BD está migrada
        ctx.Database.Migrate();

        // Usuario demo idempotente
        const string email = "demo@example.com";
        if (!ctx.Users.Any(u => u.Email == email))
        {
            var user = new User
            {
                Email = email,
                Name = "Demo",
                PasswordHash = hasher.Hash("Secret123!") 
            };

            ctx.Users.Add(user);
            ctx.SaveChanges();
        }
    }
}
