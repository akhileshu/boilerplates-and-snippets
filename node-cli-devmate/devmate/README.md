## run this cli tool
- simplest setup is `npm run setup`
- ❯ which devmate /home/akhilesh/.nvm/versions/node/v22.14.0/bin/devmate

### manual setup
- `npm link` already does  `    "install:bin": "cp ./bin/devmate.js \"$HOME/bin/devmate\" && chmod +x \"$HOME/bin/devmate\""`
- build
- install
- use `devmate` in terminal
- made changes in devmate's/CLI tool's code ? `build` and use `devmate`

## scripts
- `devmate/scripts/init-devmate.sh` - cli app boilerpalte initializer , or you can just copy dir `/home/akhilesh/software-projects/code/devmate`

## config file support
Priority:
CLI args > config file > defaults
- will support `~/.devmaterc.json`

### UX flow
``` sh
devmate config
# guided setup once

devmate init
# no questions, smart defaults

```