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
