## Description

The main idea - to interact with UI elements using a special
value type. It allows to replace these components without affecting
the main logic.

The package contains most common utils for working with these
objects.

> They are not mutating the incoming data

## Installing

For `npm`

```bash
npm install value-type
```

For `pnpm`

```bash
pnpm add value-type
```

## API

Set all a value to a specific field

> Recursively for `options`

```bash
const result = vuSetForAll(arr, 'value', 'test')
```
