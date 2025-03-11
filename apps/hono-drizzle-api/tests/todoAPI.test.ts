import { describe, test } from 'bun:test';

describe('todoAPI', () => {
  describe('GET /todo', () => {
    test.todo('全てのtodoが取得できる')
  })
  describe('POST /todo/:id', () => {
    test.todo('todoを取得できる')
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
