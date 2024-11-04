export const codeExamples = {
  python: `import requests

def generate_roasts(content):
    url = "https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/"
    
    payload = {
        "content": content
    }
    
    response = requests.post(url, json=payload)
    return response.json()

# Example usage
result = generate_roasts("Your text here")
print(result)`,

  javascript: `async function generateRoasts(content) {
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
  .catch(error => console.error(error));`,

  typescript: `interface RoastResponse {
  roasts: string[];
}

async function generateRoasts(content: string): Promise<RoastResponse> {
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
  
  return response.json();
}

// Example usage
try {
  const result = await generateRoasts('Your text here');
  console.log(result.roasts);
} catch (error) {
  console.error('Error:', error);
}`,

  go: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

type RoastRequest struct {
    Content string \`json:"content"\`
}

type RoastResponse struct {
    Roasts []string \`json:"roasts"\`
}

func generateRoasts(content string) (*RoastResponse, error) {
    requestBody, err := json.Marshal(RoastRequest{Content: content})
    if err != nil {
        return nil, err
    }

    resp, err := http.Post(
        "https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/",
        "application/json",
        bytes.NewBuffer(requestBody),
    )
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }

    var response RoastResponse
    err = json.Unmarshal(body, &response)
    return &response, err
}

func main() {
    response, err := generateRoasts("Your text here")
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }
    fmt.Printf("Roasts: %v\\n", response.Roasts)
}`,

  rust: `use serde::{Deserialize, Serialize};
use reqwest::Client;
use anyhow::Result;

#[derive(Serialize)]
struct RoastRequest {
    content: String,
}

#[derive(Deserialize)]
struct RoastResponse {
    roasts: Vec<String>,
}

async fn generate_roasts(content: &str) -> Result<RoastResponse> {
    let client = Client::new();
    let request = RoastRequest {
        content: content.to_string(),
    };

    let response = client
        .post("https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/")
        .json(&request)
        .send()
        .await?
        .json::<RoastResponse>()
        .await?;

    Ok(response)
}

#[tokio::main]
async fn main() -> Result<()> {
    let response = generate_roasts("Your text here").await?;
    println!("Roasts: {:?}", response.roasts);
    Ok(())
}`,

  php: `<?php

function generateRoasts($content) {
    $url = 'https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/';
    
    $data = array(
        'content' => $content
    );
    
    $options = array(
        'http' => array(
            'method'  => 'POST',
            'header'  => 'Content-Type: application/json',
            'content' => json_encode($data)
        )
    );
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    return json_decode($result, true);
}

// Example usage
try {
    $result = generateRoasts('Your text here');
    print_r($result);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}`,

  ruby: `require 'net/http'
require 'uri'
require 'json'

def generate_roasts(content)
  uri = URI('https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/')
  
  request = Net::HTTP::Post.new(uri)
  request['Content-Type'] = 'application/json'
  request.body = { content: content }.to_json
  
  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
    http.request(request)
  end
  
  JSON.parse(response.body)
end

# Example usage
begin
  result = generate_roasts('Your text here')
  puts result
rescue => e
  puts "Error: #{e.message}"
end`,

  curl: `curl -X 'POST' \\
  'https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "content": "Your text here"
  }'`,

  wget: `wget --no-check-certificate \\
  --method POST \\
  --timeout=0 \\
  --header 'Content-Type: application/json' \\
  --body-data '{
    "content": "Your text here"
  }' \\
  'https://ai4free-vortex-3b-roast-api.hf.space/generate-roasts/'`
};