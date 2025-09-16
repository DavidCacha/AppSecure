using SecureAuth.Application.Common.Security;

namespace SecureAuth.Infrastructure.Security;

public class PasswordHasher : IPasswordHasher
{
    public string Hash(string plain) => BCrypt.Net.BCrypt.HashPassword(plain);
    public bool Verify(string plain, string hash) => BCrypt.Net.BCrypt.Verify(plain, hash);
}
