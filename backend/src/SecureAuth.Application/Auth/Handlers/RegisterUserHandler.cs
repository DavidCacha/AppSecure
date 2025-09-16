using MediatR;
using SecureAuth.Application.Auth.Commands;
using SecureAuth.Application.Auth.DTOs;
using SecureAuth.Application.Common;
using SecureAuth.Application.Common.Security;
using SecureAuth.Domain.Entities;
using SecureAuth.Domain.Interfaces;

namespace SecureAuth.Application.Auth.Handlers;

public sealed class RegisterUserHandler : IRequestHandler<RegisterUser, Result<UserDto>>
{
    private readonly IUserRepository _users;
    private readonly IPasswordHasher _hasher;

    public RegisterUserHandler(IUserRepository users, IPasswordHasher hasher)
        => (_users, _hasher) = (users, hasher);

    public async Task<Result<UserDto>> Handle(RegisterUser cmd, CancellationToken ct)
    {
        var exists = await _users.FindByEmailAsync(cmd.Request.Email.Trim().ToLowerInvariant(), ct);
        if (exists is not null) return Result<UserDto>.Fail("Email already registered");

        var user = new User
        {
            Email = cmd.Request.Email.Trim().ToLowerInvariant(),
            PasswordHash = _hasher.Hash(cmd.Request.Password),
            Name = cmd.Request.Name.Trim()
        };

        await _users.AddAsync(user, ct);
        return Result<UserDto>.Ok(new UserDto(user.Id, user.Email, user.Name));
    }
}
