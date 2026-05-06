import { test, expect } from 'vitest'

test('example test', () => {
  expect(1 + 1).toBe(2)
})

test('string operations', () => {
  const str = 'Hello World'
  expect(str.includes('World')).toBe(true)
  expect(str.split(' ')).toHaveLength(2)
})
