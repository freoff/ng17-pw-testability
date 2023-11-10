import { NgZone } from '@angular/core'
import { FormControlStatus, FormGroup } from '@angular/forms'
import { EMPTY, Observable, Subscription, interval, map, merge, tap } from 'rxjs'

export const formStatus$: (form: FormGroup | null, zone: NgZone) => Observable<FormControlStatus> = (form, zone) => {
  return new Observable((observer) => {
    let subscription: Subscription
    const formStatusChanges$ = form?.statusChanges ?? EMPTY

    const changes$ = merge(formStatusChanges$, interval(100)).pipe(
      tap((v) => console.log('form.status', v)),
      map((v) => form?.status ?? v),
    )

    zone.runOutsideAngular(() => {
      subscription = changes$.subscribe((status) => {
        zone.run(() => {
          observer.next(status as FormControlStatus)
        })
      })
    })

    return () => {
      subscription.unsubscribe()
    }
  })
}
