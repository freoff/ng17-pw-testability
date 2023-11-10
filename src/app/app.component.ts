import { Component, NgZone, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { formStatus$ } from './form-state-stream'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  result!: string
  title = 'zoness'
  visible = false
  sub!: Subscription
  status: string = 'VALID'
  onButtonClick() {
    const z = this.ngZone
    console.log('z', z.hasPendingMacrotasks)
    this.sub.unsubscribe()
    setTimeout(() => {
      this.result = 'button clicked'
    }, 3000)
    console.log('z', z.hasPendingMacrotasks)
    const isStable = this.ngZone.isStable
  }

  constructor(private ngZone: NgZone) {
    window.z = ngZone
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = true
    }, 2000)

    this.sub = formStatus$(null, this.ngZone).subscribe((status) => {
      console.log('status', status)
      this.status = status
    })
  }
}
