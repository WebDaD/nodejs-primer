# node.js Primer

Ein simpler Primer für einen node.js-REST-Server über einer MySQL-Datenbank.
Kann einfach erweitert werden.


## Dokumentation Code

[jsDOC](jsdoc/)

## Testergebnisse

Hier die Links:

* [UnitTests](mochawesome-report/mochawesome.html)
* [CodeCoverage](coverage/lcov-report/)


## Developer

Hier finden sich Informationen für den geneigten Weiterentwickler.

### Neue Tabelle einbauen / Tabelle bearbeiten

Für eine neue Tabelle muss folgendes passieren. Falls Felder geändert werden sollen, kann die Liste als Vorlage genutzt werden.

(Am einfachsten den Ordner lib/item kopieren)

1. Unter lib einen Ordner anlegen
2. In diesem Ordner eine object.ts anlegen (Entspricht der Tabelle)
3. controller.ts anlegen (Zugriffe auf die Datenbank)
4. routes.ts erstellen (HTTP-Routen)
5. Unter Test einen Ordnert anlegen
6. object.ts (testet das object)
7. controller.ts (testet den controller)
8. routes.ts (testet die routes)
9. server.ts (testet den server (gegen eine lokale mysql-db!))
10. test.database.sql erweitern
11. app.ts erweitern (controller, routes)
