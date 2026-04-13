[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/object-diff/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/object-diff/actions)
[![License](https://img.shields.io/github/license/Tox1469/object-diff?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/object-diff?style=flat-square)](https://github.com/Tox1469/object-diff/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/object-diff?style=flat-square)](https://github.com/Tox1469/object-diff/stargazers)

---

# object-diff

Calcula diff entre dois objetos, produzindo entradas add/remove/change por path.

## Instalação

```bash
npm install object-diff
```

## Uso

```ts
import { diff, applyDiff } from "object-diff";

const a = { name: "Tox", age: 30, tags: ["a"] };
const b = { name: "Tox", age: 31, city: "SP" };

const changes = diff(a, b);
// [
//   { path: "age", op: "change", oldValue: 30, newValue: 31 },
//   { path: "tags", op: "remove", oldValue: ["a"] },
//   { path: "city", op: "add", newValue: "SP" },
// ]

const patched = applyDiff(a, changes);
```

## API

- `diff(a, b)` — retorna `DiffEntry[]`
- `applyDiff(obj, entries)` — aplica o patch e retorna novo objeto
- `DiffEntry { path, op: "add" | "remove" | "change", oldValue?, newValue? }`

## Licença

MIT