import { afterAll, describe, expect, test } from 'bun:test';
import app from '../src';
import { createTestDB, type SqliteDB } from '../src/db/createDb';
import { todoItemsTable } from '../src/db/schema';



describe('todoAPI', async () => {
  const db = createTestDB()
  const createTodo = async (title: string, db: SqliteDB) => {
    await db.insert(todoItemsTable).values({title: title})
  }

  afterAll(async () => {
    await db.delete(todoItemsTable)
  })

  describe('GET /todo', () => {
    test.todo('全てのtodoが取得できる')
  })
  describe('GET /todo/:id', () => {
    test('todoを取得できる',async () => {
      const title = '掃除する'
      await createTodo(title, db)

      const res = await app.request(`/todo/1`)

      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({
        todo: {
          id: 1,
          title: title,
          isComplete: false
        }
      })
    })
  })
  describe('PUT /todo/:id',() => {
    test.todo('タイトルを変更できる')
    test.todo('状態を[完了]にできる')
    test.todo('状態を[未完了]にできる')
  })
  describe('DELETE /todo/:id', () => {
    test.todo('DBから削除できる')
  })
})
