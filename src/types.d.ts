import type { NgZone } from '@angular/core'

export {}

declare global {
  interface Window {
    z: NgZone
  }
}
