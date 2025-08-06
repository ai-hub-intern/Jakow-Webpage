# 🤖 Chatbot n8n Integration Setup

Diese Anleitung erklärt, wie Sie den Chatbot Ihrer Website mit einem n8n Backend verbinden.

## 📋 Voraussetzungen

- n8n Installation (lokal oder cloud)
- Grundkenntnisse in n8n Workflows
- Anthropic Claude API-Schlüssel (optional für AI-Antworten)

## 🔧 n8n Workflow Setup

### 1. Neuen Workflow erstellen

1. Öffnen Sie n8n
2. Erstellen Sie einen neuen Workflow
3. Fügen Sie die folgenden Nodes hinzu:

### 2. Webhook Node (Trigger)

```json
{
  "httpMethod": "POST",
  "path": "chatbot-webhook",
  "responseMode": "responseNode",
  "options": {}
}
```

**Einstellungen:**
- HTTP Method: `POST`
- Path: `chatbot-webhook` (oder Ihr gewünschter Pfad)
- Response Mode: `Using 'Respond to Webhook' Node`

### 3. Function Node - Message Processing

```javascript
// Extrahiere Nachricht und Benutzerinfo
const message = $input.first().json.message;
const timestamp = $input.first().json.timestamp;
const userInfo = $input.first().json.user_info;

// Bereite Daten für AI-Verarbeitung vor
return {
  json: {
    userMessage: message,
    timestamp: timestamp,
    context: {
      page: userInfo.page,
      referrer: userInfo.referrer,
      // Jakow Smirin Kontext
      name: "Jakow Smirin",
      title: "CEO von STARTPLATZ AI HUB",
      expertise: ["n8n", "Anthropic Claude", "LangChain", "AI Strategy"],
      company: "STARTPLATZ AI HUB",
      location: "Düsseldorf, Deutschland",
      email: "wbk2020@gmail.com",
      languages: ["Deutsch", "Englisch", "Russisch", "Japanisch"]
    }
  }
};
```

### 4. AI Node - Anthropic Claude (Optional)

**Wenn Sie Claude API verwenden möchten:**

```json
{
  "model": "claude-3-sonnet-20240229",
  "maxTokens": 300,
  "temperature": 0.7,
  "systemPrompt": "Du bist ein AI-Assistent für Jakow Smirin, CEO von STARTPLATZ AI HUB. Du hilfst Besuchern seiner Website bei Fragen zu seinem Hintergrund, seinen Services und AI-Expertise. Antworte freundlich, professionell und auf Deutsch."
}
```

### 5. Function Node - Response Formatting

```javascript
// Formatiere die Antwort
const aiResponse = $input.first().json.response || $input.first().json.message;

// Fallback-Antworten wenn keine AI verfügbar
const fallbackResponses = {
  ai: "Jakow ist Experte für KI-Integration und führt STARTPLATZ AI HUB. Er arbeitet mit n8n, Claude und LangChain.",
  erfahrung: "Jakow ist CEO von STARTPLATZ AI HUB und hat umfangreiche Erfahrung in AI-Consulting.",
  kontakt: "Sie können Jakow unter wbk2020@gmail.com erreichen oder über LinkedIn kontaktieren.",
  default: "Vielen Dank für Ihre Nachricht! Jakow wird sich bald bei Ihnen melden."
};

let response = aiResponse;

// Wenn keine AI-Antwort, verwende Fallback
if (!response) {
  const userMessage = $('Function').first().json.userMessage.toLowerCase();
  
  if (userMessage.includes('ai') || userMessage.includes('künstliche intelligenz')) {
    response = fallbackResponses.ai;
  } else if (userMessage.includes('erfahrung') || userMessage.includes('background')) {
    response = fallbackResponses.erfahrung;
  } else if (userMessage.includes('kontakt') || userMessage.includes('email')) {
    response = fallbackResponses.kontakt;
  } else {
    response = fallbackResponses.default;
  }
}

return {
  json: {
    response: response,
    timestamp: new Date().toISOString(),
    status: "success"
  }
};
```

### 6. Respond to Webhook Node

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  }
}
```

## 🌐 Website-Integration

### 1. Webhook URL aktualisieren

In der `script.js` Datei, ersetzen Sie:

```javascript
this.n8nWebhookUrl = 'YOUR_N8N_WEBHOOK_URL_HERE';
```

Mit Ihrer tatsächlichen n8n Webhook URL:

```javascript
this.n8nWebhookUrl = 'https://your-n8n-instance.com/webhook/chatbot-webhook';
```

### 2. CORS-Einstellungen

Stellen Sie sicher, dass Ihr n8n Server CORS korrekt konfiguriert hat:

```javascript
// In n8n Webhook Response
"Access-Control-Allow-Origin": "*"
"Access-Control-Allow-Methods": "POST, OPTIONS"
"Access-Control-Allow-Headers": "Content-Type"
```

## 🚀 Erweiterte Features

### 1. Conversation Memory

Fügen Sie einen **Set Node** hinzu, um Unterhaltungen zu speichern:

```javascript
// Speichere Conversation History
const conversationId = $input.first().json.user_info.sessionId || 'default';
const message = $input.first().json.message;

// Hier können Sie die Conversation in einer Datenbank speichern
return {
  json: {
    conversationId: conversationId,
    messages: [
      { role: 'user', content: message, timestamp: new Date() }
    ]
  }
};
```

### 2. Lead Capture

Erweitern Sie den Workflow um Lead-Erfassung:

```javascript
// Erkenne Kontaktanfragen
const message = $input.first().json.message.toLowerCase();

if (message.includes('termin') || message.includes('meeting') || message.includes('beratung')) {
  return {
    json: {
      type: 'lead',
      action: 'schedule_meeting',
      response: 'Gerne! Bitte senden Sie mir eine E-Mail an wbk2020@gmail.com mit Ihrem Terminwunsch.'
    }
  };
}
```

### 3. Analytics Integration

Fügen Sie Analytics hinzu:

```javascript
// Sende Chat-Daten an Analytics
const analytics = {
  timestamp: new Date(),
  message_length: $input.first().json.message.length,
  user_page: $input.first().json.user_info.page,
  response_type: 'chatbot'
};

// Hier können Sie Daten an Google Analytics oder andere Services senden
```

## 🔐 Sicherheit

### 1. Rate Limiting

Implementieren Sie Rate Limiting in n8n:

```javascript
// Einfaches Rate Limiting
const userIP = $input.first().json.headers['x-forwarded-for'] || 'unknown';
const currentHour = new Date().getHours();
const key = `${userIP}_${currentHour}`;

// Hier implementieren Sie Ihre Rate-Limiting-Logik
```

### 2. Input Validation

```javascript
// Validiere Eingaben
const message = $input.first().json.message;

if (!message || message.length > 500) {
  return {
    json: {
      error: "Ungültige Nachricht",
      response: "Bitte senden Sie eine gültige Nachricht (max. 500 Zeichen)."
    }
  };
}
```

## 🧪 Testing

### 1. Lokales Testing

1. Starten Sie Ihren n8n Workflow
2. Kopieren Sie die Webhook URL
3. Testen Sie mit curl:

```bash
curl -X POST https://your-n8n-instance.com/webhook/chatbot-webhook \
  -H "Content-Type: application/json" \
  -d '{"message": "Hallo, wie kann ich Jakow kontaktieren?"}'
```

### 2. Browser Testing

Öffnen Sie Ihre Website und testen Sie den Chatbot mit verschiedenen Nachrichten.

## 📊 Monitoring

### 1. Workflow Monitoring

- Überwachen Sie n8n Workflow-Ausführungen
- Setzen Sie Error-Handling ein
- Implementieren Sie Logging

### 2. Performance Tracking

```javascript
// Performance Tracking
const startTime = Date.now();

// ... Ihr Workflow Code ...

const endTime = Date.now();
const duration = endTime - startTime;

console.log(`Workflow duration: ${duration}ms`);
```

## 🆘 Troubleshooting

### Häufige Probleme:

1. **CORS Fehler**: Überprüfen Sie CORS-Headers in der Webhook Response
2. **404 Fehler**: Kontrollieren Sie die Webhook URL
3. **Timeout**: Reduzieren Sie die Response-Zeit in n8n
4. **Rate Limiting**: Implementieren Sie exponential backoff

### Debug-Modus:

```javascript
// In script.js für Debugging
console.log('Sending to n8n:', {
  message: message,
  timestamp: new Date().toISOString()
});
```

## 🎯 Nächste Schritte

1. Implementieren Sie erweiterte AI-Features
2. Fügen Sie Multimedia-Support hinzu
3. Integrieren Sie CRM-Systeme
4. Implementieren Sie Multi-Language Support

---

**Viel Erfolg mit Ihrem n8n Chatbot! 🚀**