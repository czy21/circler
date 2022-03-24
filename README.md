# yarn workspace dev

```json
{
  "private": true,
  "workspaces": [
    "web",
    "share/react"
  ],
  "scripts": {
    "start:web": "yarn workspace circler-web start",
    "watch:share": "yarn workspace share-react watch",
    "deploy:share": "yarn workspace share-react deploy"
  }
}
```