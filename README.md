# Instalace a uprava projektu pri migraci z LB V3 na V4

## Predpoklady
* Globalne instalovana verze LB4 (npm i -g @loopback/cli)

## Omezeni
* LB4 neumi generovat vice repositories na stejnym datasource -> Kafka repository s transakcni podporou je vytvorena rucne

## Zmeny proti projektu LB3
* Model databaze (tabulka MATERIAL) se vytvori pomoci prikazu **lb4 discover**. Nevytvari se rucne.


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

* Overit zakladni funkcionalitu
	*	Pomoci prikazu: npm run localDev -> http://localhost:3000
	* Zkusit hot reload: napr. pridat radek v souboru **src/application.ts**


# Discovery existujici databaze DB2
* Vytvorit MODEL pomoci prikazu lb4 discover
	* Vybrat model **MATERIAL**
	* Bohuzel automaticke generovani vykazuje drobne chyby, ktere je nutno rucne opravit v souboru **/src/models/material.model.ts**. Jedna se opravu spatne urcenych datovych typu, a ne-povinneho atributu **id** (required: true -> required: false)
* Vytvorit repository (MaterialRepository) pro danny model pomoci prikazu **lb4 repository**
* Vyvorit standardni controller **lb4 controller** (MaterialStandard -> REST Controller with CRUD functions -> Material -> MaterialRepository -> id -> number -> y -> /materials) pro danny model umoznujici zakladni CRUD operace nad tabulkou MATERIAL
* Otestovat novy controller pomoci web exploreru

# Rucni vytvoreni "controlleru" pro integraci s Kafka
Pro vytvoreni transakcni funkcionality analogicke s V3 (v ramci existujici db transacke ulozit data do kafky a nasledne realizovat rizeny commit/rollback) jsou nutne tyto kroky:

* Vytvorit prazdny controller **lb4 controller** (MaterialPostWithKafkaSubmit -> Empty Controller)
* Vytvorit novou repository s podporou transakci
	* Kopirovat /src/repositories/material.repository.ts do **material.with.tx.repository.ts**
	* Prislusne upravit soubory **material.with.tx.repository.ts** a **index.ts**
*


