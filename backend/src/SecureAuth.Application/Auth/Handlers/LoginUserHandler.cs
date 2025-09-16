using MediatR;
using SecureAuth.Application.Auth.Commands;
using SecureAuth.Application.Auth.DTOs;
using SecureAuth.Application.Common;
using SecureAuth.Application.Common.Security;
using SecureAuth.Domain.Interfaces;

namespace SecureAuth.Application.Auth.Handlers;

public sealed class LoginUserHandler : IRequestHandler<LoginUser, Result<TokenResponse>>
{
    private readonly IUserRepository _users;
    private readonly IPasswordHasher _hasher;
    private readonly IJwtTokenFactory _jwt;

    public LoginUserHandler(IUserRepository users, IPasswordHasher hasher, IJwtTokenFactory jwt)
        => (_users, _hasher, _jwt) = (users, hasher, jwt);

    public async Task<Result<TokenResponse>> Handle(LoginUser cmd, CancellationToken ct)
    {
        var user = await _users.FindByEmailAsync(cmd.Request.Email.Trim().ToLowerInvariant(), ct);
        if (user is null) return Result<TokenResponse>.Fail("Invalid credentials");

        if (!_hasher.Verify(cmd.Request.Password, user.PasswordHash))
            return Result<TokenResponse>.Fail("Invalid credentials");

        var token = _jwt.Create(user.Id, user.Email, user.Name);
        var dto = new UserDto(user.Id, user.Email, user.Name);
        return Result<TokenResponse>.Ok(new TokenResponse(token.AccessToken, token.ExpiresAt, dto));
    }
}
