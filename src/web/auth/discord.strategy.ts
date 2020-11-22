import { PassportStrategy } from '@nestjs/passport'
import {
  HttpService,
  Injectable,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Strategy } from 'passport-oauth2'
import { stringify } from 'querystring'

const clientID = process.env.DISCORD_CLIENTID
const clientSecret = process.env.DISCORD_CLIENT_SECRET
const callbackURL = process.env.DISCORD_CALLBACKURL
const scope = 'identify'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    private authService: AuthService,
    private http: HttpService,
  ) {
    super({
      authorizationURL: `https://discordapp.com/api/oauth2/authorize?${stringify({
        client_id: clientID,
        redirect_uri: callbackURL,
        response_type: 'code',
        scope,
      })}`,
      tokenURL: 'https://discordapp.com/api/oauth2/token',
      scope,
      clientID,
      clientSecret,
      callbackURL,
    })
  }

  async validate(accessToken: string) {
    const { data } = await this.http.get('https://discordapp.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .toPromise()

    return this.authService.findUserFromDiscordId(data.id)
  }
}
