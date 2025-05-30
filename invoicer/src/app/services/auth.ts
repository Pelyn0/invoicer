import { environment } from "src/environment";
import { Rights } from "../models/rights";

export async function Auth() : Promise<Rights> {
    const savedKey = getCookie('access_key');
    
    if(savedKey){
        let index = await GetValidKeyIndex(savedKey);
        if (index > 0) {
            return index;
        } else {
            alert('Помилка авторизації!');
            return Rights.unknown;
        }
    }
    
    alert('Помилка авторизації!');

    return Rights.unknown
}

async function GetValidKeyIndex(key: string): Promise<number> {
    return environment.demoKey.split(';').indexOf(await hmacSha512Base64(key)) + 1;
}

async function isKeyValid(key: string): Promise<boolean> {
    return environment.demoKey.split(';').includes(await hmacSha512Base64(key));
}

function getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (const c of ca) {
        const trimmed = c.trim();
        if (trimmed.indexOf(nameEQ) === 0) {
            return atob(trimmed.substring(nameEQ.length));
        }
    }
    return null;
}

async function hmacSha512Base64(message: string): Promise<string> {
  const enc = new TextEncoder();
  const keyData = enc.encode('invoicer');
  const messageData = enc.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);

  // Convert ArrayBuffer to Base64
  return toBase64(signature);
}

function toBase64(text: ArrayBuffer): string {
  const bytes = new Uint8Array(text);
  const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
}