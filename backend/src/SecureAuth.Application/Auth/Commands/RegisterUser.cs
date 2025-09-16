using MediatR;
using SecureAuth.Application.Auth.DTOs;
using SecureAuth.Application.Common;

namespace SecureAuth.Application.Auth.Commands;

public sealed record RegisterUser(RegisterRequest Request) : IRequest<Result<UserDto>>;
