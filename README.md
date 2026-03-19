# undici-401-request-body
Reproduction of request body issue

```bash
pnpm i
pnpm test
```

```
 FAIL  src/worker.test.ts
  example
    ✓ GET 200 is fine (205 ms)
    ✓ GET 401 is fine (14 ms)
    ✓ PUT 200 is fine (11 ms)
    ✕ PUT 401 is fine (string) (50 ms)
    ✕ PUT 401 is fine (json string) (9 ms)
    ✕ PUT 401 is fine (form data) (7 ms)
```
