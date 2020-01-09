# Instalace a uprava projektu pri migraci z LB V3 na V4

## Predpoklady
* Globalne instalovana verze LB4 (npm i -g @loopback/cli)


## Kroky pro aktivaci hot reload pri vyvoji:
* npm install nodemon --save-dev
* Novy script do sekce scripts v package.json: “localDev”: “nodemon .”,

## Spusteni v rezimu hot reload:
Osobne to delam v ramci integrovaneho terminalu Visual code, ktery si rozdelim na vice oken
* Prvni okno: npm run build:watch
* Druhe okno: npm run localDev
* Treti okno: pro prikazy LB4 xx

# Zakladni priprava projektu
* Vytvorit aplikaci (skeleton): lb4 app
	* Potvrdit predvolene hodnoty
	* Bohuzel projekt se vytvori v pod-adresari (nutno rucne prekopirovat zpet do root adresare projektu)
* Vytvorit DB2 datasource: lb4 datasource
	* Pojmenovat db2
	* Zadat zname hodnoty pro db testdb

# Discovery existujici databaze DB2

# Rucni vytvoreni "controlleru" pro integraci s Kafka
Tento krok volne vychazi z tutorialu na [adrese](https://loopback.io/doc/en/lb4/todo-list-tutorial-controller.html)

* Vy

