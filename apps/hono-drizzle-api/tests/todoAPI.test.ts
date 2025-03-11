import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import app from '../src';
import { createTestDB } from '../src/db/createDb';
import { todoItemsTable } from '../src/db/schema';

describe('todoAPI', async () => {
  const db = createTestDB()
  beforeAll(async () => {
    const cleanTodo: typeof todoItemsTable.$inferInsert = {
      title: '掃除する',
    };
    await db.insert(todoItemsTable).values(cleanTodo)
  })
  afterAll(async () => {
    await db.delete(todoItemsTable)
  })

  describe('GET /todo', () => {
    test.todo('全てのtodoが取得できる')
  })
  describe('GET /todo/:id', () => {
    test('todoを取得できる',async () => {
      const id = 1
      const res = await app.request(`/todo/${id}`)

      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({
        todo: {
          id: 1,
          title: '掃除する',
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
