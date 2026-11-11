# Flüssigkeiten mischen – 2D und 3D

Interaktive Flüssigkeits-Simulation für den Browser. Farbige Flüssigkeiten strömen, verwirbeln und
mischen sich wie Tinte (Blau + Gelb ergibt Grün) – steuerbar mit Maus, Ton und Kamera.

## ▶ [Simulation direkt starten](https://ki42-dhbw.github.io/fluessigkeiten-mische/)

Es muss nichts installiert werden. Oben rechts lässt sich zwischen **2D** und **3D** umschalten.

| Version | Link |
|---|---|
| 2D und 3D umschaltbar | <https://ki42-dhbw.github.io/fluessigkeiten-mische/> |
| nur 2D | <https://ki42-dhbw.github.io/fluessigkeiten-mische/fluessigkeiten-mischen.html> |
| nur 3D | <https://ki42-dhbw.github.io/fluessigkeiten-mische/fluessigkeiten-3d.html> |

## Was man damit machen kann

- **Maus / Touch:** Flüssigkeit einfüllen oder nur rühren. Drei frei wählbare Farben und klares
  Wasser zum Verdünnen.
- **Automatik:** ein unsichtbarer Rührstab rührt von selbst.
- **Audio:** Die Flüssigkeit reagiert auf Ton. Die Quelle ist wählbar: Mikrofon bzw. Eingang,
  System- oder Tab-Ton, oder eine Audiodatei. Acht Düsen schießen im Takt – Bässe und Höhen getrennt.
- **Kamera – Bewegung:** Bewegungen vor der Kamera schieben die Flüssigkeit mit, auf Wunsch mit
  eingespritzter Farbe (gewählte Farbe oder Zufallsfarben).
- **Kamera – Umrisse (nur 2D):** Die Umrisse des Kamerabilds werden grob gezeichnet und verwischen
  (Stile: Tusche, Leuchten, Einfärben).
- **3D:** Tinte in einem drehbaren Glasbecken, mit einstellbarer Schwerkraft (Tinte sinkt, schwebt
  oder steigt) und vier Qualitätsstufen.

Alle Modi lassen sich einzeln ein- und ausschalten.

## Hinweise

- Empfohlen: aktueller Chrome, Edge oder Firefox. Die 3D-Version braucht WebGL 2 und eine
  einigermaßen aktuelle Grafikkarte; bei zu niedriger Bildrate schaltet sie die Qualität selbst herunter.
- Kamera und Mikrofon werden erst nach Erlaubnis im Browser verwendet. Bild und Ton werden nur
  lokal im Browser ausgewertet und nirgendwohin übertragen.
- System-Ton lässt sich nicht in jedem Browser aufnehmen (in Safari gar nicht, auf dem Mac meist
  nur der Ton eines Tabs).

## Lokal verwenden

Die HTML-Dateien sind eigenständig und laufen ohne Server: herunterladen und per Doppelklick öffnen.

| Datei | Inhalt |
|---|---|
| `fluessigkeiten-2d-3d.html` | 2D und 3D in einer Datei, umschaltbar (wird erzeugt) |
| `fluessigkeiten-mischen.html` | 2D-Version |
| `fluessigkeiten-3d.html` | 3D-Version |
| `kombi-erstellen.js` | erzeugt die Kombi-Datei aus den beiden Einzeldateien: `node kombi-erstellen.js` |
| `index.html` | Startseite, leitet zur Kombi-Datei weiter |

## Technik

Reines HTML, CSS und JavaScript mit WebGL, ohne externe Bibliotheken. Die Strömung wird auf der
Grafikkarte berechnet (Stable-Fluids-Verfahren); in 3D liegt das Raster als Kachel-Atlas in einer
Textur und wird per Raymarching dargestellt. Die Farben werden als Lichtabsorption gespeichert,
dadurch mischen sie sich subtraktiv wie echte Tinte.
