# Roast Generator API Documentation

Welcome to the Roast Generator API, powered by HelpingAI's Vortex 3B model. This API provides a simple interface for generating creative and witty roasts using state-of-the-art AI technology.

## Features

- 🚀 Fast and reliable API responses
- 🎯 Precise and creative roast generation
- 💻 Simple integration with multiple programming languages
- 🔒 Secure and scalable infrastructure
- 📚 Comprehensive documentation and examples

## Quick Start

### API Endpoint

```bash
POST https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/
```

### Request Format

```json
{
  "content": "string"  // Required: Text to generate roasts for
}
```

### Response Format

```json
{
  "roasts": [
    "Roast message 1",
    "Roast message 2",
    ...
  ]
}
```

## Integration Examples

### Python

```python
import requests

def generate_roasts(content):
    url = "https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/"
    payload = {"content": content}
    response = requests.post(url, json=payload)
    return response.json()

# Example usage
result = generate_roasts("Your text here")
print(result)
```

### JavaScript

```javascript
async function generateRoasts(content) {
  const response = await fetch(
    'https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    }
  );
  
  return await response.json();
}

// Example usage
generateRoasts('Your text here')
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

## About

The Roast Generator API is built on HelpingAI's Vortex 3B model, a specialized language model trained for generating creative and engaging roasts. Our API provides developers with easy access to this powerful model through a simple REST interface.

## License

© 2024 HelpingAI. All rights reserved.