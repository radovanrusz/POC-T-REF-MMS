# Základní vytvoření LB3 aplikace a vytvoření modelu pomocí discovery modulu

## Předpoklady
* Globálně instalovaná verze LB3 (npm install -g loopback-cli)
* Běžící kontejner DB2 konfigurovaný podle předchozích standardních instrukcí

## Postup
* Vytvoření aplikačního boilerplate: lb app
	* Potvrdit hodnoty:
        * (name)
        * 3.x
        * empty-server

* Vytvoření DB2 datasource: lb datasource
	* Pojmenovat db
    * Connector: IBM DB2
	* Zadat známé hodnoty pro databázi testdb
    * Potvrdit instalaci loopback-connector-db2

* Discovery existujicí databáze DB2 a uložení definice modelů
    * Užití dataSource.discoverSchema() API a vytvoření příslušných souborů pomocí one-time skriptu
    * Doc: https://loopback.io/doc/en/lb3/Discovering-models-from-relational-databases.html
    * Funkční příklad pro novou aplikaci: discover-models.js (node discover-models.js)

* Ověření funkcionality a spojení k databázi
	* node .
    * http://localhost:3000

# Ostatní

## Vytvoření DB schématu dle LB modelu = auto-migration
* Varianty
    * Auto-migrate - vytvoření tabulek dle modelů (drop existujících tabulek => ztráta dat)
    * Auto-update - změna tabulek dle modelů
* Doc: https://loopback.io/doc/en/lb3/Creating-a-database-schema-from-models.html
* Příklad: automigrate.js (nutno přemístit do src/server/boot pro spuštění při startu aplikace)