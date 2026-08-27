# Test SOP - Password Reset

This standard operating procedure describes how a service desk analyst handles a routine user password-reset request. It is a complete training example: replace the example system names, support hours, and approval rules with the organization's approved values before operational use.

## Purpose and scope

Use this procedure when a user cannot sign in because they have forgotten their password or their account is locked. Do not use it to bypass multifactor authentication, investigate a suspected compromise, or reset a privileged or shared account without the additional approval required by the account owner.

## Before you begin

- Confirm that the request is recorded in the approved ticketing system.
- Check that the account is active and belongs to the requester.
- Confirm the user's identity using two approved verification methods, such as a verified callback number and the organization's identity-verification questions. Never use information supplied only in an unverified email.
- Check for security alerts, a recent termination notice, or an open compromise investigation. Stop and escalate when any of these are present.

## Procedure

1. Open the user's ticket and record the affected username, time of request, symptoms, and verification methods used. Do not record passwords, authentication codes, or unnecessary personal data.
2. Confirm whether the issue is a forgotten password, a locked account, or a failed second factor. Follow the separate security-incident process for suspicious activity or a failed second factor.
3. In the approved identity platform, select the user account and use the supported reset or unlock workflow. Do not change security methods or disable multifactor authentication as a workaround.
4. Issue a temporary password or reset link using the approved secure channel. Temporary credentials must expire or require a change at the next sign-in.
5. Ask the user to sign in and confirm that they can access the required service. Do not ask the user to disclose the new password.
6. Record the action taken, the identity platform, the completion time, and the user's confirmation in the ticket. Keep the ticket free of secret values.
7. Close the ticket with the correct resolution code, or leave it open with a clear owner and next action if the problem remains.

## Escalate immediately when

- Identity verification fails or the requester pressures the analyst to skip it.
- The account is privileged, shared, service-owned, or associated with a leaver.
- There are unexpected MFA prompts, unfamiliar sign-in locations, malware indicators, or other signs of account compromise.
- The identity platform reports a synchronization, licensing, or policy error.

## Quality and security checks

Password resets should be auditable, least-privilege, and reversible where possible. Follow the organization's password, identity, privacy, and security-incident policies. Microsoft guidance recommends secure self-service reset and strong authentication controls; the service desk must follow the locally approved implementation rather than improvising a workaround.

## References

- [Microsoft Entra self-service password reset](https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr)
- [Microsoft password guidance](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad)
