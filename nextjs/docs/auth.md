### env var

- NEXTAUTH_URL is invalid in vercel prod , next auth doesnot work properly

### todo debug

- request loop after profile setup success

```ts
useEffect(() => {
  if (state.ok) {
    update({ isProfileSetupDone: true });
  }
  // note : dont add `update` here , causing multiple request trigger
}, [state.ok]);
```
