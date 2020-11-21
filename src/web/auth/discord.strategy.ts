import { PassportStrategy } from '@nestjs/passport'
import {
  HttpService,
  Injectable,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Strategy } from 'passport-oauth2'
import { stringify } from 'querystring'

const clientID = '541362524814311464'
const clientSecret = 'ava3OhpZc-lXt0Yo5QjibL1hkD6wmcu7'
const callbackURL = 'http://localhost:3000/auth/discord'
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
