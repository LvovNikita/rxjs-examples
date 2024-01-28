import { Observable, Subscriber, of } from 'rxjs'

export const jsonPlaceholderUrl: string = 'https://jsonplaceholder.typicode.com'

export type Photo = {
  id: number,
  albumId: number,
  title: string,
  url: string,
  thumbnailUrl: string,
}

export const getRandomPhoto$: Observable<Photo> = new Observable((subscriber: Subscriber<Photo>): void => {
  const to: number = 5000
  const from: number = 1
  const { floor, random } = Math
  const id: number = floor(random() * (to - from) + from)
  new Promise((resolve, reject): void => {
    fetch(`${jsonPlaceholderUrl}/photos/${id}`)
      .then((res: Response) => res.json())
      .then((json: Photo) => {
        subscriber.next(json)
        subscriber.complete()
      })
      .catch((err: Error) => {
        subscriber.error(err)
      })
  })
})

export const getLetters$: Observable<string> = of('a', 'b', 'c')
export const getNumbers$: Observable<number> = of(1, 2, 3, 4)

export const getLettersAndNumbers$: Observable<Observable<string | number>> = new Observable((subscriber: Subscriber<Observable<string | number>>) => {
  subscriber.next(getLetters$)
  subscriber.next(getNumbers$)
  subscriber.complete()
})

export const getLettersAsync$: Observable<string> = new Observable((subscriber: Subscriber<string>) => {
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

export const getNumbersAsync$: Observable<number> = new Observable((subscriber: Subscriber<number>) => {
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

export const getLettersAndNumbersAsync$: Observable<Observable<string | number>> = new Observable((subscriber: Subscriber<Observable<string | number>>) => {
  subscriber.next(getLettersAsync$)
  subscriber.next(getNumbersAsync$)
  subscriber.complete()
})
