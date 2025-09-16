using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SecureAuth.Application.Common.Security;

namespace SecureAuth.Infrastructure.Security;

public class JwtTokenFactory : IJwtTokenFactory
{
    private readonly IConfiguration _cfg;
    public JwtTokenFactory(IConfiguration cfg) => _cfg = cfg;

    public (string AccessToken, DateTime ExpiresAt) Create(Guid userId, string email, string name)
    {
        var key = _cfg["Auth:JwtKey"] ?? throw new InvalidOperationException("Missing Auth:JwtKey");
        var expires = DateTime.UtcNow.AddMinutes(30);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, email),
            new Claim("name", name)
        };

        var creds = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(claims: claims, expires: expires, signingCredentials: creds);
        return (new JwtSecurityTokenHandler().WriteToken(token), expires);
    }
}
