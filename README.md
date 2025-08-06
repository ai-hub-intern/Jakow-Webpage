# Persönliche Website

Eine moderne, responsive persönliche Website erstellt mit HTML, CSS und JavaScript.

## 🚀 Features

- **Modernes Design**: Sauberes, professionelles Layout mit Gradient-Hintergründen
- **Vollständig Responsiv**: Optimiert für Desktop, Tablet und Mobile
- **Interaktive Elemente**: Smooth Scrolling, Hover-Effekte, Animationen
- **Kontaktformular**: Funktionierendes Formular mit Validierung
- **Mobile Navigation**: Hamburger-Menü für mobile Geräte
- **Loading Screen**: Eleganter Ladebildschirm beim ersten Besuch
- **Back-to-Top Button**: Schnelle Navigation zurück zum Anfang
- **Typing Animation**: Animierte Überschrift im Hero-Bereich

## 📁 Dateistruktur

```
├── index.html          # Haupt-HTML-Datei
├── style.css          # CSS-Styling und Responsive Design
├── script.js          # JavaScript für Interaktivität
└── README.md          # Diese Datei
```

## 🎨 Sektionen

### 1. **Navigation**
- Fixierte Navigation mit transparentem Hintergrund
- Smooth Scrolling zu den verschiedenen Sektionen
- Mobile-freundliches Hamburger-Menü

### 2. **Hero-Bereich**
- Eindrucksvoller Gradient-Hintergrund
- Typing-Animation für den Namen
- Call-to-Action Buttons
- Platzhalter für Profilbild

### 3. **Über mich**
- Persönliche Beschreibung
- Skill-Grid mit Icons
- Hover-Effekte auf Skill-Items

### 4. **Portfolio**
- Grid-Layout für Projekte
- Projekt-Karten mit Hover-Effekten
- Technologie-Tags
- Platzhalter für Projekt-Bilder

### 5. **Kontakt**
- Funktionierendes Kontaktformular
- Kontaktinformationen
- Social Media Links
- Form-Validierung mit Notifications

## 🛠️ Anpassung

### Persönliche Informationen ändern

1. **Name und Titel**: In `index.html` nach "Ihr Name" und "Web Developer & Designer" suchen
2. **Beschreibung**: About-Sektion in `index.html` anpassen
3. **Kontaktdaten**: E-Mail, Telefon und Adresse in der Kontakt-Sektion aktualisieren
4. **Social Media**: Links in der Kontakt-Sektion anpassen

### Farben anpassen

Die Hauptfarben in `style.css` ändern:
- **Primärfarbe**: `#2563eb` (Blau)
- **Akzentfarbe**: `#fbbf24` (Gelb/Orange)
- **Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### Neue Portfolio-Projekte hinzufügen

In `index.html` im Portfolio-Bereich neue `.portfolio-item` divs hinzufügen:

```html
<div class="portfolio-item">
    <div class="portfolio-image">
        <div class="image-placeholder">
            <i class="fas fa-[ICON]"></i>
        </div>
    </div>
    <div class="portfolio-content">
        <h3>Projekt Name</h3>
        <p>Projekt Beschreibung</p>
        <div class="portfolio-tech">
            <span class="tech-tag">Technologie 1</span>
            <span class="tech-tag">Technologie 2</span>
        </div>
        <a href="#" class="portfolio-link">Projekt ansehen</a>
    </div>
</div>
```

## 🖼️ Bilder hinzufügen

Derzeit verwendet die Website Icon-Platzhalter. Um echte Bilder hinzuzufügen:

1. Erstellen Sie einen `images/` Ordner
2. Ersetzen Sie die `.image-placeholder` divs mit `<img>` Tags
3. Aktualisieren Sie das CSS entsprechend

Beispiel:
```html
<!-- Ersetzen Sie: -->
<div class="image-placeholder">
    <i class="fas fa-user-circle"></i>
</div>

<!-- Mit: -->
<img src="images/profilbild.jpg" alt="Profilbild">
```

## 📱 Browser-Kompatibilität

- ✅ Chrome (60+)
- ✅ Firefox (60+)
- ✅ Safari (12+)
- ✅ Edge (79+)

## 🚀 Website starten

1. Alle Dateien in einen Ordner speichern
2. `index.html` in einem Webbrowser öffnen
3. Oder einen lokalen Server starten:
   ```bash
   # Mit Python
   python -m http.server 8000
   
   # Mit Node.js (live-server)
   npx live-server
   ```

## ⚡ Performance-Optimierungen

- CSS und JavaScript sind optimiert für schnelle Ladezeiten
- Font Awesome und Google Fonts werden von CDN geladen
- Bilder sollten vor dem Upload komprimiert werden
- Lazy Loading kann für Bilder implementiert werden

## 🔧 Weitere Verbesserungen

Mögliche Erweiterungen:
- Blog-Sektion hinzufügen
- Dunkler Modus implementieren
- Mehrsprachigkeit (i18n)
- CMS-Integration
- SEO-Optimierungen
- Analytics-Integration

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Sie können es frei verwenden und anpassen.

---

**Viel Erfolg mit Ihrer neuen Website!** 🎉