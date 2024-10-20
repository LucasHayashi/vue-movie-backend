# Vue Movie Backend

Backend para o aplicativo [Vue Movie](https://github.com/LucasHayashi/vue-movie-frontend), que utiliza a API v3 do The Movie Database (TMDB).

## 📋 Pré-requisitos

- Conta no [TMDB](https://www.themoviedb.org/)
- Access Token da API do TMDB (Gerar em: [Authentication](https://developer.themoviedb.org/reference/intro/authentication))

## ⚙️ Variáveis de Ambiente

```env
API_URL=                https://api.themoviedb.org/3
API_ACCESS_TOKEN=       # Access Token do TMDB
AUTH_CALLBACK=          # URL de callback para autenticação
```

## 🛣️ Endpoints

### Tendências

Obtenha as tendências filtradas por período (`/day` ou `/week`).

| Método | Endpoint           | Descrição           |
| ------ | ------------------ | ------------------- |
| GET    | `/trending/all`    | Todas as tendências |
| GET    | `/trending/movie`  | Filmes em tendência |
| GET    | `/trending/tv`     | Séries em tendência |
| GET    | `/trending/person` | Atores em tendência |

### Detalhes

Busque informações detalhadas por ID.

| Método | Endpoint      | Descrição         |
| ------ | ------------- | ----------------- |
| GET    | `/movie/:id`  | Detalhes do filme |
| GET    | `/tv/:id`     | Detalhes da série |
| GET    | `/person/:id` | Detalhes do ator  |

### Busca

Pesquise por palavras-chave.

| Método | Endpoint                   | Descrição                 |
| ------ | -------------------------- | ------------------------- |
| GET    | `/search/all?q={busca}`    | Busca em todas categorias |
| GET    | `/search/movie?q={busca}`  | Busca apenas filmes       |
| GET    | `/search/tv?q={busca}`     | Busca apenas séries       |
| GET    | `/search/people?q={busca}` | Busca apenas atores       |

### Autenticação

| Método | Endpoint                                | Descrição                            |
| ------ | --------------------------------------- | ------------------------------------ |
| GET    | `/auth/start`                           | Gera link de autenticação TMDB       |
| GET    | `/auth/session?request_token={token}`   | Retorna session_id após autenticação |
| DELETE | `/auth/session?session_id={session_id}` | Exclui a sessão do usuário           |

### Usuário

| Método | Endpoint                                  | Descrição                       |
| ------ | ----------------------------------------- | ------------------------------- |
| GET    | `/user?session_id={session_id}`           | Informações do usuário          |
| GET    | `/user/watchlist?session_id={session_id}` | Lista para assistir             |
| GET    | `/user/favorite?session_id={session_id}`  | Lista de favoritos              |
| POST   | `/user/add_to?session_id={session_id}`    | Adiciona/remove item das listas |

#### Exemplo de Requisição para Adicionar/Remover Filme

```json
{
  "media_type": "movie",
  "media_id": 157336,
  "type": "favorite", // ou "watchlist"
  "favorite": true // ou "watchlist": true // false para remover
}
```

#### Exemplo de Requisição para Adicionar/Remover Série

```json
{
  "media_type": "tv",
  "media_id": 1100,
  "type": "favorite", // ou "watchlist"
  "favorite": true // ou "watchlist": true // false para remover
}
```

## 📝 Notas Importantes

- O servidor está configurado para rodar na porta `3000`
- Por padrão todos os resultados estão em pt-BR, é possível alterar modificando os query params: `language=pt-BR`
- O `session_id` é necessário para todas as operações que requerem autenticação
- O `request_token` é obtido após a confirmação de autenticação via callback
- As rotas de usuário requerem autenticação válida

## 🔗 Links Úteis

- [Documentação TMDB API v3](https://developer.themoviedb.org/reference/intro/getting-started)
- [Frontend Vue Movie](https://github.com/LucasHayashi/vue-movie-frontend)
