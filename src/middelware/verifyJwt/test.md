// TODO: turn these into real test after I learn Jest.
// Since it's just a note, the format of markdown doesn't matter.

============ About verifyAccessToken. ============

'If accessToken, verify pass, and accounts are match, it should next().'
Checked.

'If no accessToken, it should return noAccessTokenError.'
Checked.

'If accounts aren't match, it should return accountNotMatchError.'
Checked.

'If token expire, it should verifyRefreshToken.'
Checked.

'If others kinds of verify fail, it should return verifyFailError.'
Checked.

============ About verifyRefreshToken. ============

'If no refreshToken, it should return noRefreshTokenError.'
Checked.

'If verify fail, it should return verifyFailError.'
Checked.

'If verify pass, but find no loggedin-user, it should return verifyFailError with description message.'
Checked.
