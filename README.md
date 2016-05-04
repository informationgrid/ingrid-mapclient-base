# Mapclient Base

## Dokumentation
**[Build-Prozess](#build-prozess)**
**[Source-Code](#source-code)**

### Build-Prozess

Der Build-Prozess des Projektes **ingrid-mapclient-base** wird anhand eines **Makefile** erstellt. In dieser Datei sind alle Voraussetzungen und Einstellungen für den Mapclient definiert. Zudem ermöglicht es die Definition von verschiedenen Profilen eines Mapclient, z.B. DEV-, PROD-Version.
Ausgeführt wird das **Makefile** mit dem Unix-Befehl **make**, welches ein Build-Management-Tool ist. In Abhängigkeiten von Bedingungen können mit diesem Befehl verschiedene Build-Prozess aus dem **Makefile** durchgeführt werden, so z.B. ein bestimmtes Profil eines Mapclient bauen, Openlayers aktualisieren, etc.

#### Systemanforderung

Da der Build-Prozess mit dem Unix-Befehl **make** ausgeführt wird, wird auch ein Unix-ähnliches Betriebssystem benötigt. Für Windows kann die Linux-like Umgebung **Cygwin** eine Abhilfe sein. Dieses Tool ermöglicht Unix-Befehle unter Windows auszuführen.
Zusätzlich müssen die Build-Tools 'Node' (https://nodejs.org/en/) und 'npm' (https://www.npmjs.com/) auf dem System installiert sein. Diese Tools werden aus dem Makefile gerufen.

#### Änderungen an den Sourcen

Der Mapclient **ingrid-mapclient-base** basiert auf dem Schweizer-Mapclient **mf-geoadmin3** (https://github.com/geoadmin/mf-geoadmin3). Hierfür wird ein Submodul mit einem gewissen Stand des Projektes **mf-geoadmin3** integriert und dient als Grundlage.

Da dieser nicht 1:1 übernommen werden kann, weil der Schweizer-Mapclient auf Schweizer-Bedürfnisse abgestimmt ist und/oder Erweiterungen benötigen werden, werden Änderungen an dem Schweizer-Mapclient außerhalb des Submoduls hinterlegt. Dabei werden die Sourcen kopiert, auf eigene Bedürfnisse bearbeitet und beim Build-Prozess im Submodul überschrieben.

#### Übernahme original Sourcen

Beim Build-Prozess des Projektes muss eine Überführung der Originalen Sourcen aus dem **mf-geoadmin3** gewährleistet sein. Die Sourcen, die für die eigenen Anforderungen angepasst werden müssen, werden in dem Submodul überschrieben. Die unbearbeiteten Dateien bleiben somit erhalten und werden somit übernommen.

##### Anpassungsmöglichkeiten Build-Prozess

Über die Datei **Makefile** ist eine flexible Ausführung des Build-Prozesses möglich. Hier können Variablen definiert werden, die zum Bauen des Mapclients relevant sind, d.h. Definition von JavaScript-Dateien, OpenLayers3-Version, initiale Einstellung für die Karten-Darstellung, usw.. Weitere Möglichkeiten des Build-Prozesses bestehen darin Optionen für den Befehl *make* zu erstellen. So ist es beim *mf-geoadmin* möglich, verschiedene Build-Prozesse anzustoßen, z.B.

* Erstellung einer PROD-Version, wobei Dateien kompiliert werden. (make prod)
* Erstellung einer DEV-Version, wobei Dateien nicht kompiliert werden. (make dev)
* OL3 inkl. Cesium aktualisiern. (make ol3cesium)

###### Konfigurationen beim Build-Prozess

Hier einige Beispiele von definierten Variablen, die bei dem Build-Prozess eine Rolle spielen:

**SRC_JS_FILES** beinhaltet alle JavaScript-Dateien, die für den Mapclient benötigt werden.

    SRC_JS_FILES := $(shell find src/components src/js -type f -name '*.js')

**OL3_VERSION** ist eine Variable, die die benötigten OpenLayers3-Sourcen auf einen bestimmt Stand aktualisieren kann.

    OL3_VERSION ?= 627abaf1a71d48627163eb00ea6a0b6fb8dede14

**DEFAULT_TOPIC_ID** bestimmt die initiale ausgewählte Kategorie des MapClients.

    DEFAULT_TOPIC_ID ?= ech

**LANGUAGES** listet alle vorhanden Sprachen zur Lokalisierung des Clients auf.

    LANGUAGES ?= '[\"de\", \"en\", \"fr\", \"it\", \"rm\"]'

**DEFAULT_EXTENT** definiert den initialen Kartenausschnitt.

    DEFAULT_EXTENT ?= '[420000, 30000, 900000, 350000]'

**DEFAULT_EPSG** bestimmt die initiale Projekten der Kartendarstellung.

    DEFAULT_EPSG ?= EPSG:21781

###### Integration eigener Komponenten

Um eigene Komponenten in den MapClient zu integrieren, benötigt es den Wert der Variable **SRC_JS_FILES** (siehe unter [Konfigurationen beim Build-Prozess](#konfigurationen-beim-build-prozess)) in der Datei **Makefile** so anzupassen, damit die JavaScript-Dateien in den Build-Prozess integriert sind.
Ein Blick auf den Wert der genannten Variable, stellt fest, dass alle Dateien mit der Endung *.js* in den Verzeichnissen *src/components* und *src/js* im Build-Prozess des MapClients integriert werden. Dieser Wert muss so angepasst bzw. erweitert werden, damit auch die eigene Komponenten integriert werden.

###### Ausschluss von Komponenten

Analog zur Integration eigener Komponenten ist der Ausschluss von Komponenten von der Variable **SRC_JS_FILES** abhängig. Ein Ausschluss von Komponenten ist aber etwas komplizierter, da ggfs. Abhängigkeiten zu anderen Komponenten existieren und referenzierte Komponenten aus der Datei **index.html** entfernt werden müssen.

###### Aktualsierung von MF-GEOADMIN3

Bei einer Aktualisierung des Submoduls *mf-geoadmin3* muss geprüft werden, ob überschriebene Sourcen (siehe unter [Änderungen an den Sourcen](#Änderungen-an-den-sourcen)) sich im Submodul geändert haben. Wurden Sourcen aktualisiert, so muss ein Merge-Prozess stattfinden und die Änderungen in den überschriebenen Sourcen nachgezogen werden. 


##### Getting Started

Checkout:

    $ git clone https://github.com/informationgrid/ingrid-mapclient-base.git

Run Maven:

    $ mvn compile -P<Profile>

Deploy:

    In dem Verzeichnis mf-geoadmin3/src steht die Entwicklungsversion und in dem Verzeichnis mf-geoadmin3/prd steht der produktive Viewer für die Auslieferung auf dem WebServer der eigenen Domain bereit.

[Beschreibung der einzelnen Punkte des BUILD-Laufs] (BUILD.md)

[Skizze des BUILD-Laufs als PDF] (Build-BasisClient.pdf)

### Source-Code
#### Anpassung am Source-Code

In der [Skizze des BUILD-Laufs] (Build-BasisClient.pdf) werden für das GitHub-Repository **ingrid-mapclient-base** die Verzeichnisse BaseClient_COMMON, BaseClient_UMWELTKARTEN und BaseClient_NUMIS sowie das Submodul **mf-geoadmin3** dargestellt.

Für den BasisClient ohne die original SDI (Spatial Data Infrastructure) sind basierend auf dem Submodule mit dem Stand **1014736 des mf-geoadmin3** einige Anpassungen vorzunehmen. Diese sind in den folgenden Listen dokumentiert.

##### Identische Anpassungen für beide Varianten

Die identischen Anpassungen für beide Varianten des BasisClienten sind im Verzeichnis BaseClient_COMMON zu finden. Es sind im Einzelnen:

* components/
    * catalogtree/example/index.html
        * Anpassen der Projektionsvorschrift für das BasisKoordinatensystem

    * featuretree/example/index.html
        * Anpassen der Projektionsvorschrift für das BasisKoordinatensystem

    * importkml/example/index.html
        * Anpassen der Projektionsvorschrift für das BasisKoordinatensystem

    * importwms/example/index.html
        * Anpassen der Projektionsvorschrift für das BasisKoordinatensystem

    * map/example/index.html
        * Anpassen der Projektionsvorschrift für das BasisKoordinatensystem

    * profile/example/index.html
        * Anpassen der Projektionsvorschrift für das BasisKoordinatensystem

* lib/EPSG25832.js
    * Projektionsvorschrift für das BasisKoordinatensystem

##### Anpassungen für den BasisClienten Umweltkarten

Die Anpassungen für den BasisClienten Umweltkarten sind im Verzeichnis BaseClient_UMWELTKARTEN zu finden. Es sind im Einzelnen:

* Basisdaten/CatalogServer.sjon
    * Liste der Layer, die zu dem Thema Basisdaten verfügbar sind

* components/
    * backgroundselector/
        * style/
            * backgroundselector.less
                * Aufnahme der Thumbnails für die jeweiligen Hintergrundkarten
            * PNG-Dateien
                * Thumbnails für die jeweilige Hintergrundkarte

    * importwms/
        * ImportWmsDirektive.js
            * WMSVersion

    * map/
        * MapService.js
            * Ursprung für die Map
            * defaultResolutions
            * SpatialReference der WMS-Layer

* Hydrologie/CatalogServer.sjon
    * Liste der Layer, die zu dem Thema Basisdaten verfügbar sind

* img/
    * favicon.png
        * Grafik, die im Browertab und/oder der URL-Zeile angezeigt wird

    * muHeader.png
        * Grafik im Kopfbereich der Anwendung

* js/CatalogtreeController.js
    * Anpassen des Zugriffs auf den CatalogServer zur Auslieferung der Konfiguration zu einem Thema

* js/ImportWmsController.js
    * Liste mit den gewünschten externen WMS-Diensten

* lib/ol3cesium-debug.js
    * DEFAULT_WMS_VERSION

* lib/ol3cesium.js
	* Ersetzen von 1.3.0 durch 1.1.1, zum Abruf der WMS-Hintergrundkarten in Version 1.1.1

* locales/de.json
    * Anpassung der deutschsprachigen Schriftzüge im Viewer

* style/app.less
    * Anpassen des Links auf die im Kopfbereich angezeigte Grafik

* index.mako.html
    * Anpassung Seitentitel, Applikationsname, TitleImage, Verknüpfung zum Favicon
    * Zugriffe auf Google-, Bing- und Yandex-Webmaster-Tools auskommentiert
    * Projektionsvorschriften für schweizer Koordinatensysteme entfernt
    * Projektionsvorschrift für ETRS89 / UTM zone 32N aufgenommen
    * Entwicklungsstand 3D deaktiviert
    * Default-Einstellungen auskommentiert
    * Zugriffe auf layersConfig.json und services.json konfiguriert

* layersConfig.json
    * Aufstellung aller im Viewer genutzten Layer mit ihren Eigenschaften

* Makefile
    * Konfiguration auf die Domain des jeweiligen Profils

* services.json
    * Zuordung der Hintergrundkarten zu den Themen

##### Anpassungen für den BasisClienten NUMIS


#### Integration in den Build-Prozess

Die für den BasisClient notwendigen Änderungen sind in den Verzeichnissen BaseClient_NUMIS und BaseClient_UMWELTKARTEN gespeichert. Vor dem Build-Lauf werden die Dateien des jeweiligen BasisClienten im Verzeichnis BaseClient_COMMON mit den dort vorhanden allgemeinen Änderungen zusammengeführt.
Diese gesamten Änderungen werden in den ausgecheckten original Sourcen des Submoduls ersetzt. Dies erfolgt mittels des Maven-Scripts unter Angabe des entsprechenden Profils Umweltkarten oder Numis.