# Bookstore Microservices

## Description
Projet de microservices basé sur une architecture avec API Gateway, services LoopBack et MongoDB.  
Le frontend communique uniquement avec le gateway, qui redirige vers les différents services (inventory, orders, payments).  
Tous les services utilisent une base MongoDB unique avec plusieurs collections.

## Lancement du projet

```bash
docker compose up --build -d
```