import { Observable, Subscriber } from 'rxjs'

import { Photo, getRandomPhoto$ } from './000-exports'

// Higher-order observable

const getPhoto$: Observable<Observable<Photo>> = new Observable((subscriber: Subscriber<Observable<Photo>>) => {
  subscriber.next(getRandomPhoto$)
  subscriber.complete()
})

// Subscribing to observable of observables

getPhoto$
  .subscribe((innerObservable: Observable<Photo>) => innerObservable
    .subscribe((photo: Photo) => console.log(photo))
  )
