# Základní vytvoření LB3 aplikace a vytvoření modelu pomocí discovery modulu

## Předpoklady
* Globálně instalovaná verze LB3 (npm install -g loopback-cli)
* Běžící kontejner DB2 konfigurovaný podle předchozích standardních instrukcí

## Omezení
* Projekt není připraven pro běh v OC kontejneru

# Postup
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
    * Příklad: discover-models-start.js (node discover-models-start.js)

* Ověření funkcionality a spojení k databázi
	* node .
    * http://localhost:3000