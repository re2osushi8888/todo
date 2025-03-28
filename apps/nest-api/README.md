# nest-api
todoアプリをNestJSとPostgresで実装する

## DB操作
DB接続コマンド：
```
 $ psql -h postgres -U nestjsuser -d fleamarket
```

DBマイグレーション
```
$ npx prisma migrate dev --name init
```

prismaのGUI操作画面
```
$ npx prisma studio
```
