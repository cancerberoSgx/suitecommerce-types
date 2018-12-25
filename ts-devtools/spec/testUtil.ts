export function expectCodeEquals(a: string, b: string) {
  console.log(a, b);
  expect(a.replace(/\s+/gm, ' ').trim()).toEqual(b.replace(/\s+/gm, ' ').trim())
}

export function expectCodeToContain(a: string, b: string) {
  console.log(a, b);
  expect(a.replace(/\s+/gm, ' ').trim()).toContain(b.replace(/\s+/gm, ' ').trim())
}

export function expectCodeNotToContain(a: string, b: string) {
  console.log(a, b);
  expect(a.replace(/\s+/gm, ' ').trim()).not.toContain(b.replace(/\s+/gm, ' ').trim())
}

