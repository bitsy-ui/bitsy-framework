# Local Package Registry

Use this for testing published versions

## Getting Started
- set correct permissions for storage `sudo chown -R 10001:65533 storage`
- start local registry `docker-compose up -d`
- create new user `npm adduser --registry http://localhost:4873`
- login `npm login --registry http://localhost:4873 --scope=@bitsy-ui`
- access registry via browser `http://localhost:4873`

## Publishing to local registry
- Go to package directory
- `npm publish --registry http://localhost:4873`

## Unpublish Package
- `npm unpublish --force --registry http://localhost:4873 @bitsy-ui/{package}`

## Installing
- run `NPM_CONFIG_REGISTRY=http://localhost:4873`
- `yarn add {package}` or `npm install {package}`
