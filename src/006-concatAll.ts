import { Observable, Subscriber, concatAll } from 'rxjs';

const getLettersAsync$: Observable<string> = new Observable((subscriber: Subscriber<string>) => {
  const letters: string[] = ['a', 'b', 'c', 'd']
  const interval: NodeJS.Timeout = setInterval(() => {
    const letter: string | undefined = letters.shift()
    subscriber.next(letter)
    if (!letters.length) {
      subscriber.complete()
      clearInterval(interval)
    }
  }, 1000)
})

const getNumbersAsync$: Observable<number> = new Observable((subscriber: Subscriber<number>) => {
  const numbers: number[] = [1, 2, 3, 4]
  const interval: NodeJS.Timeout = setInterval(() => {
    const number: number | undefined = numbers.shift()
    subscriber.next(number)
    if (!numbers.length) {
      subscriber.complete()
      clearInterval(interval)
    }
  }, 500)
})

// --a--b--c--d|
// -1-2-3-4|

const getLettersAndNumbersAsync$: Observable<Observable<string | number>> = new Observable((subscriber: Subscriber<Observable<string | number>>) => {
  subscriber.next(getLettersAsync$)
  subscriber.next(getNumbersAsync$)
  subscriber.complete()
})

getLettersAndNumbersAsync$.pipe(
  concatAll()
).subscribe((value: string | number) => console.log(value))

// --a--b--c--d-1-2-3-4|
