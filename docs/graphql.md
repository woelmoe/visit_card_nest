# GraphQL API — тестирование

#### (подготовлено нейронкой, доку писать долго ручками)

## Эндпоинт

```
http://localhost:3000/graphql
```

## Тест 1. `Query profile` — полный запрос

```graphql
query GetProfile {
  profile {
    name
    description
    location
    links {
      email
      telegram
      git
      hh
    }
    skills {
      name
      level
    }
    experience {
      id
      startDate
      endDate
      employment {
        company
        position
      }
      project {
        name
        url
      }
      skills {
        name
        level
      }
    }
    hobbies {
      id
      name
    }
  }
}
```

---

## Тест 2. `createExperience` — работа в компании

```graphql
mutation CreateWork($input: CreateExperienceInput!) {
  createExperience(input: $input) {
    id
    startDate
    endDate
    employment {
      company
      position
    }
    project {
      name
      url
    }
    skills {
      name
      level
    }
  }
}
```

**Variables:**

```json
{
  "input": {
    "employment": {
      "company": "Стилсофт",
      "position": "Fullstack-разработчик"
    },
    "startDate": "2021-07-20",
    "endDate": "2026-06-15",
    "project": {
      "name": "Муром",
      "description": "B2G/B2B-система",
      "url": "https://stilsoft.ru/products/murom1"
    },
    "skills": [
      { "name": "TypeScript", "level": 5 },
      { "name": "Node.js", "level": 5 }
    ]
  }
}
```

---

## Тест 3. `createExperience` — пет-проект без компании

```graphql
mutation CreatePet($input: CreateExperienceInput!) {
  createExperience(input: $input) {
    id
    employment {
      company
      position
    }
    project {
      name
    }
    skills {
      name
    }
  }
}
```

**Variables:**

```json
{
  "input": {
    "startDate": "2024-01-01",
    "project": { "name": "Visit Card", "url": "https://github.com/..." },
    "skills": [{ "name": "NestJS", "level": 4 }]
  }
}
```

**Ожидаемо:** `employment: null` — компания не передавалась.

---

## Тест 4. `createHobby` — успех

```graphql
mutation CreateHobby($input: CreateHobbyInput!) {
  createHobby(input: $input) {
    id
    name
  }
}
```

**Variables:**

```json
{ "input": { "name": "Гитара" } }
```

**Ожидаемо:** хобби создано.

---

## Тест 5. `createHobby` — дубликат

Тот же запрос и variables, что в **Тесте 4**. Запусти второй раз.

**Ожидаемо:** ошибка `HOBBY_ALREADY_EXISTS`, `status: 409`.

---

## Тест 6. Валидация — `level: 10`

```graphql
mutation CreateInvalid($input: CreateExperienceInput!) {
  createExperience(input: $input) {
    id
  }
}
```

**Variables:**

```json
{
  "input": {
    "startDate": "2024-01-01",
    "project": { "name": "Test" },
    "skills": [{ "name": "Test", "level": 10 }]
  }
}
```

**Ожидаемо:** `BAD_REQUEST`, `skills.0.level must not be greater than 5`.

---

## Тест 7. Получить `id` хобби и опыта

```graphql
query GetIds {
  profile {
    experience {
      id
      employment {
        company
      }
    }
    hobbies {
      id
      name
    }
  }
}
```

**Действие:** скопируй любой `id` хобби и `id` опыта — они пригодятся в **Тестах 8–10**.

---

## Тест 8. `deleteHobby` — существующий

```graphql
mutation DeleteHobby($id: ID!) {
  deleteHobby(id: $id)
}
```

**Variables:**

```json
{ "id": "<id из Теста 7>" }
```

**Ожидаемо:** `true`.

---

## Тест 9. `deleteHobby` — несуществующий

```graphql
mutation DeleteHobby($id: ID!) {
  deleteHobby(id: $id)
}
```

**Variables:**

```json
{ "id": "nonexistent-hobby-id" }
```

**Ожидаемо:** `NOT_FOUND`, `status: 404`.

---

## Тест 10. `deleteExperience` — существующий

```graphql
mutation DeleteExperience($id: ID!) {
  deleteExperience(id: $id)
}
```

**Variables:**

```json
{ "id": "<id из Теста 7>" }
```

**Ожидаемо:** `true`.

---

## Тест 11. `deleteExperience` — несуществующий

```graphql
mutation DeleteExperience($id: ID!) {
  deleteExperience(id: $id)
}
```

**Variables:**

```json
{ "id": "nonexistent-experience-id" }
```

**Ожидаемо:** `NOT_FOUND`, `status: 404`.

---

## Сводная таблица валидации

| Что проверяется                           | Ожидаемый результат                                                |
| ----------------------------------------- | ------------------------------------------------------------------ |
| `level: 10`                               | `BAD_REQUEST`, `skills.0.level must not be greater than 5`         |
| `name: ""` в `createHobby`                | `BAD_REQUEST`, `name must be longer than or equal to 1 characters` |
| Отсутствие `project` в `createExperience` | `BAD_REQUEST`                                                      |
| Опечатка в поле (`compnay`)               | `BAD_REQUEST`, `property compnay should not exist`                 |

---

## Порядок запуска в Sandbox

1. **Тест 1** — убедиться, что `profile` возвращает данные.
2. **Тесты 2, 3** — создать два опыта.
3. **Тесты 4, 5** — создать хобби и проверить дубликат.
4. **Тест 6** — проверить валидацию `level`.
5. **Тест 7** — получить `id` хобби и опыта.
6. **Тесты 8, 10** — удалить созданное.
7. **Тесты 9, 11** — проверить ошибки на несуществующих `id`.
8. **Тест 1** — финальный `profile` — убедиться, что данные исчезли.
