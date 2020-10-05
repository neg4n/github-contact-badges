<div align="center">
Make your markdown 'contact' section beautiful with badges generated on the fly.
</div>

#

### Available badges list

#### Discord
Route: `/discord`  
Parameters:
 - `manual=false` (**boolean**) (false by default)
 - `tag=Negan%236030` (**String**) (required if manual == true)
 - `id=YOUR_DISCORD_ID` (**Snowflake**) (required if manual == false)
 - `padding=8` (**number**) (optional) (8 by default)
 - `cache=3600` (**number**) (optional) (3600 by default)
  
Example badge:

<img src="https://badges.krynn.dev/discord?id=683285092336271364&padding=8">

#### Matrix.org
Route: `/matrix`  
Parameters:
 - `id=%23hello:wvffle.net` (**String**) (required)
 - `padding=8` (**number**) (optional) (8 by default)
 - `cache=3600` (**number**) (optional) (3600 by default)

Example badge:

<img src="https://badges.krynn.dev/matrix?id=%23hello:wvffle.net&padding=8">

#### E-mail

Route: `/email`  
Parameters:
 - `address=negan@ctemplar.com` (**String**) (required)
 - `padding=8` (**number**) (optional) (8 by default)
 - `cache=3600` (**number**) (optional) (3600 by default)

Example badge:

<img src="https://badges.krynn.dev/email?address=negan@ctemplar.com&padding=8">

### Special thanks

Special thanks to:
- [Oskarr1239](https://github.com/Oskarr1239) for hosting this on https://badges.krynn.dev/
- [wvffle](https://github.com/wvffle) for matrix.org badge

### Disclaimer
Logos in `assets/` are not made by me and original authors will be linked here.
- `discord-logo-color.svg` by [Discord](https://discord.com/branding)
- `email.svg` by [Icomonstr](https://iconmonstr.com/email-2-svg/)
