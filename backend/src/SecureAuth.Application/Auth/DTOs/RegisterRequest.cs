namespace SecureAuth.Application.Auth.DTOs;

public record RegisterRequest(string Email, string Password, string Name);
