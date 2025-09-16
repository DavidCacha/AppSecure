using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SecureAuth.Infrastructure.Persistence;
using SecureAuth.Infrastructure.Repositories;
using SecureAuth.Infrastructure.Security;

using SecureAuth.Domain.Interfaces;

namespace SecureAuth.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration cfg)
    {
        services.AddDbContext<AppDbContext>(o =>
            o.UseSqlite(cfg.GetConnectionString("Default")!));

        services.AddScoped<SecureAuth.Domain.Interfaces.IUserRepository,
                           SecureAuth.Infrastructure.Repositories.UserRepository>();

        services.AddSingleton<SecureAuth.Application.Common.Security.IPasswordHasher,
                              SecureAuth.Infrastructure.Security.PasswordHasher>();

        services.AddSingleton<SecureAuth.Application.Common.Security.IJwtTokenFactory,
                              SecureAuth.Infrastructure.Security.JwtTokenFactory>();

        return services;
    }
}
