import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment';
import { Auth } from './services/auth';
import { Rights } from './models/rights';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'invoicer';
  accessGranted = false;
  accessKey = '';
  tool = 'invoicer';

  async ngOnInit() {
    let rights = await Auth();

    if (rights != Rights.unknown) {
      this.accessGranted = true;
    
      if (rights == Rights.demoPlanner){
        this.tool = 'planner';
      }
    }
  }

  async onSubmit() {
    if (await this.isKeyValid(this.accessKey)) {
      this.setCookie('access_key', this.accessKey, 7);
      this.accessGranted = true;

      let rights = await Auth();
      if (rights == Rights.demoPlanner){
        this.tool = 'planner';
      }
    } else {
      alert('Помилка!');
    }
  }

  async isKeyValid(key: string): Promise<boolean> {
    return environment.demoKey.split(';').includes(await hmacSha512Base64(key));
  }

  setCookie(name: string, value: string, days: number) {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(value);

    let key = toBase64(buffer);
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${key};expires=${d.toUTCString()};path=/`;
  }

  getCookie(name: string): string | null {
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