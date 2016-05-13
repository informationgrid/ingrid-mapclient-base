# Mapclient Base

## Dokumentation

### Vorwort

Das Projekt **ingrid-mapclient-base** basiert auf den Schweizer-Mapclient **MF-GEOADMIN3** (https://github.com/geoadmin/mf-geoadmin3). Dieser Mapclient dient als Grundlage und ist in diesem Projekt in einem bestimmten Zustand als Submodul enthalten. 
Der Basis-Mapclient soll, im Gegensatz zu mf-geoadmin3, eine flexible Kartengestaltung ermöglichen, d.h. Projektionen, Karten-Extent, Laden von externen Diensten, usw. sollen nicht nur auf die Schweiz beschränkt sein, sondern auch außerhalb der Schweiz (z.B. Deutschland, Europa, Weltweit) funktionieren. 
Viele Aspekte im MF-GEOADMIN3 sind auf die Schweiz abgestimmt und "hard coded". Es sind daher einige Änderungen am Source-Code notwendig um den Bezug auf die Schweiz aufzubrechen. Um den SourceCode des **ingrid-mapclient-base** zu stabilisieren, bezieht sich der Client auf einen bestimmten Zustand des MF-GEOADMIN3. Auf Basis dieses Zustandes werden die notwendigen Änderungen durchgeführt.   

### Build-Prozess

Der Build-Prozess des Projektes **ingrid-mapclient-base** wird anhand des Build-Tools **Maven** durchgeführt. Über Maven wird definiert, welche Befehle ausgeführt werden sollen, d.h Kopieren von benötigten/geänderten Sourcen, Bauen des Mapclient selbst über das Submodul usw.. Für das Bauen des Mapclients löst Maven ein Unix-Befehl **make** aus und ruft die Datei **Makefile** im Submodul auf. In dieser Datei sind alle Voraussetzungen und Einstellungen für den Mapclient definiert. Es ermöglicht auch die Definition von verschiedenen Profilen eines Mapclient, z.B. DEBUG-, LIVE-Version.
In Abhängigkeiten von Bedingungen können mit diesem Befehl verschiedene Build-Prozess aus dem **Makefile** durchgeführt werden, so z.B. ein bestimmtes Profil eines Mapclient bauen, Openlayers aktualisieren, etc.

#### Systemanforderung

Für den Build-Prozess muss Maven auf dem System installiert sein. Durch die Ausführung von verschiedenen Unix-Befehle über Maven wird ein Unix-ähnliches Betriebssystem benötigt. Für Windows kann die Linux-like Umgebung **Cygwin** eine Abhilfe sein. Dieses Tool ermöglicht Unix-Befehle unter Windows auszuführen.
Neben Maven benötigt die Systemumgebung auch den UNIX-Befehl **make**, zusätzlich zu den Build-Tools 'Node' (https://nodejs.org/en/) und 'npm' (https://www.npmjs.com/). Diese Tools werden aus dem Makefile aufgerufen.

#### Änderungen an den Sourcen

Da der MF-GEOADMIN3 nicht 1:1 übernommen werden kann, weil dieser sehr auf Schweizer-Bedürfnisse abgestimmt ist und/oder Erweiterungen benötigen werden, müssen Änderungen an den Source-Code durchgeführt werden. Werden Änderungen an einer Datei benötigt, so wird die Datei außerhalb des Submoduls kopiert, nach eigenen Bedürfnissen bearbeitet und beim Build-Prozess über Maven in das Submodul wieder hinein kopiert bzw. überschrieben.

#### Übernahme original Sourcen

Da beim Build-Prozess über Maven alle zu ändernden Sourceb in das Submodul hineinkopiert werden und das Submodul selbst auch den eigentlichen MapClient erstellt, ist die Übernahme der originalen Sourcen gewährleistet. Die Sourcen, die für die eigenen Anforderungen angepasst werden müssen, werden in dem Submodul überschrieben und die restliche Sourcen bleiben im originalen Zustand.

##### Anpassungsmöglichkeiten Build-Prozess

Über die Datei **Makefile** ist eine flexible Ausführung des Build-Prozesses möglich. Hier können Variablen definiert werden, die zum Bauen des Mapclients relevant sind, d.h. Definition von JavaScript-Dateien, OpenLayers3-Version, initiale Einstellung für die Karten-Darstellung, usw.. Weitere Möglichkeiten des Build-Prozesses bestehen darin, Optionen für den Befehl *make* zu erstellen. So ist es beim *mf-geoadmin* möglich, verschiedene Build-Prozesse anzustoßen, z.B.

* Erstellung einer PROD-Version, wobei Dateien kompiliert werden. (make prod)
* Erstellung einer DEV-Version, wobei Dateien nicht kompiliert werden. (make dev)
* OL3 inkl. Cesium aktualisiern. (make ol3cesium)

Zudem ist es auch möglich über das Setzen von Umgebungsvariablen in der Systemumgebung (durch 'export ...') auf Variablen im Makefile Einfluss zu nehmen und dies auf eigene Anfordungen zu ändern.

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

Um eigene Komponenten in den MapClient zu integrieren, müssen diese in den maven Buildprozess integriert werden. 
Ein Blick auf den Wert der Variable **SRC_JS_FILES** (siehe unter [Konfigurationen beim Build-Prozess](#konfigurationen-beim-build-prozess)) in der Datei **Makefile**, zeigt, dass alle Dateien mit der Endung *.js* in den Verzeichnissen *src/components* und *src/js* im Build-Prozess des Submoduls integriert werden. Dieser Wert muss so angepasst bzw. erweitert werden, dass auch die eigene Komponenten integriert werden. Alternativ kann über Maven dafür gesorgt werden, dass die eigenen Komponenten in die definierten Verzeichnisse unter **SRC_JS_FILES** kopiert werden.

###### Ausschluss von Komponenten

Analog zur Integration eigener Komponenten ist der Ausschluss von Komponenten von der Variable **SRC_JS_FILES** abhängig. Beim Ausschluss von Komponenten muss darauf geachtet werden, dass diese ggfs. an anderer Stelle referenziert werden (z.B. in der Datei **index.html**), bzw. andere Komponenten diese voraussetzen.

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

In der [Skizze des BUILD-Laufs] (Build-BasisClient.pdf) werden für das GitHub-Repository **ingrid-mapclient-base** die Verzeichnisse BaseClient_COMMON, BaseClient_UMWELTKARTEN und BaseClient_NUMIS sowie das Submodul MF-GEOADMIN3 dargestellt.

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

## OpenSource Aspekte

Der Source Code des MF-GEOADMIN3 steht unter einer BSD Lizenz. 

Der BaseClient verwendet ebenfalls die BSD Lizenz. Dadurch ist die Verwendung der Komponente in quasi allen Projekten (kommerziell, OpenSource) möglich.
