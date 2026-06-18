# Bookstore Microservices

Application e-commerce basée sur une architecture microservices avec API Gateway, services LoopBack 4 et MongoDB.  
Le frontend communique uniquement avec l'API Gateway, qui redirige vers les différents microservices.

## Architecture

```
bookstore-web-app (8082)
        │
   api-gateway (9001)
    ┌───┼───────────────┐
    │   │               │
inventory order   payment
(3000) (3001)    (3002)
    └───┴───────────────┘
              │
          MongoDB (27017)
```

## Services

| Service            | Port | Description                    |
|--------------------|------|--------------------------------|
| bookstore-web-app  | 8082 | Frontend EJS                   |
| api-gateway        | 9001 | Point d'entrée unique          |
| inventory-service  | 3000 | Gestion des livres (LoopBack 4)|
| order-service      | 3001 | Gestion des commandes          |
| payment-service    | 3002 | Gestion des paiements          |
| MongoDB            | 27017| Base de données                |

## Lancement

```bash
docker compose up --build -d
```

## Accès

- **Frontend** : http://localhost:8082
- **API Gateway** : http://localhost:9001
- **Swagger Inventory** : http://localhost:3000/explorer
- **Swagger Orders** : http://localhost:3001/explorer
- **Swagger Payments** : http://localhost:3002/explorer

## Routes API Gateway

| Route              | Destination                        |
|--------------------|------------------------------------|
| GET/POST /inventory | inventory-service:3000/books      |
| PUT/DELETE /inventory/:id | idem                       |
| GET/POST /orders   | order-service:3001/orders          |
| PUT/DELETE /orders/:id | idem                           |
| GET/POST /payments | payment-service:3002/payments      |
| PUT/DELETE /payments/:id | idem                         |

## Variables d'environnement

Les variables sont définies dans le fichier `.env` à la racine du projet.  
Copier `.env` et ajuster si nécessaire avant de lancer `docker compose up`.

## Arrêt et nettoyage

```bash
# Arrêter les conteneurs
docker compose down

# Supprimer aussi les volumes (réinitialise MongoDB)
docker compose down -v
```
