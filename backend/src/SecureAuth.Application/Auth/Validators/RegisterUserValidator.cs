using FluentValidation;
using SecureAuth.Application.Auth.Commands;

namespace SecureAuth.Application.Auth.Validators;

public sealed class RegisterUserValidator : AbstractValidator<RegisterUser>
{
    public RegisterUserValidator()
    {
        RuleFor(x => x.Request.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Request.Password).NotEmpty().MinimumLength(8);
        RuleFor(x => x.Request.Name).NotEmpty().MinimumLength(2);
    }
}
