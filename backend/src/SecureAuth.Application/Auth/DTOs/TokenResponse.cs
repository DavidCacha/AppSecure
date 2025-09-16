namespace SecureAuth.Application.Auth.DTOs;

public record UserDto(Guid Id, string Email, string Name);
public record TokenResponse(string AccessToken, DateTime ExpiresAt, UserDto User);
