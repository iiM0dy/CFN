DELETE FROM "ServiceOptionValue" WHERE "optionId" IN (SELECT id FROM "ServiceOption" WHERE "serviceId" IN (SELECT id FROM "Service" WHERE name = 'Rank Boosting' AND "gameId" IN (SELECT id FROM "GameService" WHERE slug = 'arc-raiders')));
DELETE FROM "ServiceOption" WHERE "serviceId" IN (SELECT id FROM "Service" WHERE name = 'Rank Boosting' AND "gameId" IN (SELECT id FROM "GameService" WHERE slug = 'arc-raiders'));
DELETE FROM "Service" WHERE name = 'Rank Boosting' AND "gameId" IN (SELECT id FROM "GameService" WHERE slug = 'arc-raiders');
