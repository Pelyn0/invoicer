import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'invoicer';
  accessGranted = false;
  accessKey = '';

  async ngOnInit() {
    const savedKey = this.getCookie('access_key');
    if (savedKey && await this.isKeyValid(savedKey)) {
      this.accessGranted = true;
    }
  }

  async onSubmit() {
    if (await this.isKeyValid(this.accessKey)) {
      this.setCookie('access_key', this.accessKey, 7);
      this.accessGranted = true;
    } else {
      alert('Помилка!');
    }
  }

  async isKeyValid(key: string): Promise<boolean> {
    return environment.demoKey === await hmacSha512Base64(key);
  }

  setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }

  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (const c of ca) {
      const trimmed = c.trim();
      if (trimmed.indexOf(nameEQ) === 0) {
        return trimmed.substring(nameEQ.length);
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
  const bytes = new Uint8Array(signature);
  const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
}