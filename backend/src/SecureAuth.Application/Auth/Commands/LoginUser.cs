using MediatR;
using SecureAuth.Application.Auth.DTOs;
using SecureAuth.Application.Common;

namespace SecureAuth.Application.Auth.Commands;

public sealed record LoginUser(LoginRequest Request) : IRequest<Result<TokenResponse>>;
