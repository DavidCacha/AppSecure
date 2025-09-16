using FluentValidation;
using SecureAuth.Application.Auth.Commands;

namespace SecureAuth.Application.Auth.Validators;

public sealed class LoginUserValidator : AbstractValidator<LoginUser>
{
    public LoginUserValidator()
    {
        RuleFor(x => x.Request.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Request.Password).NotEmpty();
    }
}
