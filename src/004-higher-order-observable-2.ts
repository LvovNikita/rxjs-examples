
import { Observable, Subscriber, of } from 'rxjs'

const getLetters$: Observable<string> = of('a', 'b', 'c')
const getNumbers$: Observable<number> = of(1, 2, 3, 4)

// Higher-order observable

const getLettersAndNumbers$: Observable<Observable<string | number>> = new Observable((subscriber: Subscriber<Observable<string | number>>) => {
  subscriber.next(getLetters$)
  subscriber.next(getNumbers$)
  subscriber.complete()
})

// Subscribing to observable of observables

getLettersAndNumbers$.subscribe((innerObservable: Observable<string | number>) => innerObservable
  .subscribe((value: string | number) => console.log(value))
)
