namespace SecureAuth.Application.Common.Security;

public interface IJwtTokenFactory
{
    (string AccessToken, DateTime ExpiresAt) Create(Guid userId, string email, string name);
}
