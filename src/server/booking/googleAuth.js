import { google } from 'googleapis'

export function createGoogleOAuthClient(env) {
  const authClient = new google.auth.OAuth2(
    env.googleClientId,
    env.googleClientSecret
  )

  authClient.setCredentials({
    refresh_token: env.googleRefreshToken,
  })

  return authClient
}

export function createGoogleCalendarClient(env, authClient = createGoogleOAuthClient(env)) {
  return google.calendar({
    version: 'v3',
    auth: authClient,
  })
}

export async function verifyGoogleAccess(authClient) {
  const token = await authClient.getAccessToken()

  if (typeof token === 'string') {
    return Boolean(token)
  }

  return Boolean(token?.token)
}
