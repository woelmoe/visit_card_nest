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

**Ожидаемо:** `CANNOT_DELETE_HOBBY_ERROR`.

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

## Тест 12. `updateExperience` — обновление компании

```graphql
mutation UpdateWork($id: ID!, $input: UpdateExperienceInput!) {
  updateExperience(id: $id, input: $input) {
    id
    employment {
      company
      position
    }
  }
}
```

**Variables:**

```json
{
  "id": "<id опыта>",
  "input": {
    "employment": {
      "company": "Обновлённая компания",
      "position": "Senior Fullstack-разработчик"
    }
  }
}
```

**Ожидаемо:** `employment.company` = `"Обновлённая компания"`.

---

## Тест 13. `updateExperience` — замена набора навыков (`set`)

```graphql
mutation UpdateSkills($id: ID!, $input: UpdateExperienceInput!) {
  updateExperience(id: $id, input: $input) {
    id
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
  "id": "<id опыта>",
  "input": {
    "skills": [
      { "name": "Go", "level": 3 },
      { "name": "Rust", "level": 2 }
    ]
  }
}
```

**Ожидаемо:** в `skills` **только** `Go` и `Rust`. Старые навыки **заменены** (не добавлены).

---

## Тест 14. `updateExperience` — очистка `endDate`

```graphql
mutation ClearEndDate($id: ID!, $input: UpdateExperienceInput!) {
  updateExperience(id: $id, input: $input) {
    id
    endDate
  }
}
```

**Variables:**

```json
{
  "id": "<id опыта>",
  "input": { "endDate": null }
}
```

**Ожидаемо:** `endDate: null`.

---

## Тест 15. `updateExperience` — несуществующий опыт

```graphql
mutation UpdateWork($id: ID!, $input: UpdateExperienceInput!) {
  updateExperience(id: $id, input: $input) {
    id
  }
}
```

**Variables:**

```json
{
  "id": "nonexistent-experience-id",
  "input": { "endDate": "2024-12-31" }
}
```

**Ожидаемо:** `NOT_FOUND`, `status: 404`.

---

## Тест 16. `updateExperience` — без `project`

```graphql
mutation UpdateWork($id: ID!, $input: UpdateExperienceInput!) {
  updateExperience(id: $id, input: $input) {
    id
    project {
      name
    }
  }
}
```

**Variables:**

```json
{
  "id": "<id опыта>",
  "input": { "endDate": "2024-12-31" }
}
```

**Ожидаемо:** `project.name` **не изменился**. Только `endDate` обновился.

---

## Сводная таблица валидации

| Что проверяется                           | Ожидаемый результат                                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `level: 10`                               | `BAD_REQUEST`, `skills.0.level must not be greater than 5`                                            |
| `name: ""` в `createHobby`                | `BAD_REQUEST`, `name must be longer than or equal to 1 characters`                                    |
| Отсутствие `project` в `createExperience` | `BAD_USER_INPUT`, `Field "project" of required type "ProjectInput!" was not provided`                 |
| Опечатка в поле (`compnay`)               | `BAD_USER_INPUT`, `Field "compnay" is not defined by type "EmploymentInput". Did you mean "company"?` |
| Опечатка `Git` → `Giit` в `skills`        | `BAD_USER_INPUT`                                                                                      |

---

## Сводная таблица исключений

| Ситуация                            | Исключение                                | `extensions.code`                                                   | `status` |
| ----------------------------------- | ----------------------------------------- | ------------------------------------------------------------------- | -------- |
| Опыт не найден (`update`, `delete`) | `NotFoundException`                       | `INTERNAL_SERVER_ERROR` (в `code`), `NOT_FOUND` (в `originalError`) | 404      |
| Хобби уже существует                | `HobbyExistsException` (`GraphQLError`)   | `HOBBY_ALREADY_EXISTS`                                              | 409      |
| Хобби не найдено (`delete`)         | `PhilosophicalException` (`GraphQLError`) | `CANNOT_DELETE_HOBBY_ERROR`                                         | —        |
| Невалидные входные данные           | `BadRequestException` (`ValidationPipe`)  | `BAD_REQUEST`                                                       | 400      |
| GraphQL-валидация (опечатка, тип)   | `GraphQLError`                            | `BAD_USER_INPUT`                                                    | —        |

> **Замечание:** `NotFoundException` в GraphQL-ответе возвращает `code: INTERNAL_SERVER_ERROR`, но `originalError.statusCode: 404`. Это особенность NestJS + Apollo — для чистого `NOT_FOUND` нужен кастомный `formatError` в `GraphQLModule`.

---

## Порядок запуска в Sandbox

1. **Тест 1** — убедиться, что `profile` возвращает данные.
2. **Тесты 2, 3** — создать два опыта (работа и пет-проект).
3. **Тесты 4, 5** — создать хобби и проверить дубликат.
4. **Тест 6** — проверить валидацию `level`.
5. **Тест 7** — получить `id` хобби и опыта.
6. **Тесты 12, 13, 14** — обновить опыт (компания, навыки, `endDate`).
7. **Тесты 15, 16** — проверить `update` с несуществующим `id` и без `project`.
8. **Тесты 8, 10** — удалить созданное.
9. **Тесты 9, 11** — проверить ошибки на несуществующих `id`.
10. **Тест 1** — финальный `profile` — убедиться, что данные исчезли.

---
