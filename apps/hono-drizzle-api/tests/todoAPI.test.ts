import { afterEach, describe, expect, test } from 'bun:test';
import app from '../src';
import { createTestDB, type SqliteDB } from '../src/db/createDb';
import { todoItemsTable } from '../src/db/schema';



describe('todoAPI', async () => {
  const db = createTestDB()
  const createTodo = async (title: string, db: SqliteDB) => {
    return await db.insert(todoItemsTable).values({title: title}).returning().get()
  }

  afterEach(async () => {
    await db.delete(todoItemsTable)
  })

  describe('GET /todo', () => {
    test('全てのtodoが取得できる',async () => {
      const todo1 = await createTodo('掃除', db)
      const todo2 = await createTodo('洗濯', db)
      const todo3 = await createTodo('料理', db)

      const res = await app.request('/todo')

      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({
        todos: [todo1,todo2,todo3]
      })
    })
  })
  describe('GET /todo/:id', () => {
    test('todoを取得できる',async () => {
      const todo =  await createTodo('掃除する', db)

      const res = await app.request(`/todo/${todo.id}`)

      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({
        todo: todo
      })
    })
    test.todo('存在しないidを入力すると404')
  })
  describe('PATCH /todo/:id',() => {
    test.todo('タイトルを変更できる')
    test('状態を[完了]にできる', async () => {
      const createdTodo = await createTodo('掃除する', db)

      const res = await app.request(`/todo/${createdTodo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            isComplete: true
         })
      })

      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({
        todo: {
          id: createdTodo.id,
          title: createdTodo.title,
          isComplete: true,
        }}
      );
    })
    test.todo('状態を[未完了]にできる')
    test.todo('idは変更できない')
    test.todo('存在しないidは404エラー')
  })
  describe('DELETE /todo/:id', () => {
    test.todo('DBから削除できる')
  })
})
