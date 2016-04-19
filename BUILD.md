# BUILD-Lauf BaseClient

Die folgenden Befehle werden für den Buildlauf ausgeführt:
    
    $ git clone https://github.com/informationgrid/ingrid-mapclient-base.git
    $ mvn initialize compile -P<Variante>

Der Buildllauf im Einzelnen:

1) Auschecken GitHub-Repository informationgrid/ingrid-mapclient-base

2) Initialisieren des Submoduls

3) Laden der Sourcen des Submoduls in das Verzeichnis mf-geoadmin3

4) Zusammenführen der variantenspezifischen mit den allgemeinen Änderungen in das Verzeichnis BaseClient_COMMON

5) Kopieren der Änderungen in das Verzeichnis mf-geoadmin3/src

6) Kopieren der json-Konfigurationsdateien in das Verzeichnis mf-geodamin3/prd

7) Kopieren des Variantenspezifischen Makefiles in das Verzeichnis mf-geoadmin3

8) Ausführen des make-Befehls mit der gewünschten Version des BasisClienten


Die Punkte 2 - 8 werden in dem Maven-Script abgearbeitet.