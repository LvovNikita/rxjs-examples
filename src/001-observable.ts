import { Observable, Observer, Subscriber, Subscription } from 'rxjs';

const url: string = 'https://jsonplaceholder.typicode.com'

type Photo = {
  id: number,
  albumId: number,
  title: string,
  url: string,
  thumbnailUrl: string,
}

// 1. Create observable ("new Observable" or creation operator)
const getRandomPhoto$: Observable<Photo> = new Observable((subscriber: Subscriber<Photo>): void => {
  const to: number = 5000
  const from: number = 1
  const { floor, random } = Math
  const id: number = floor(random() * (to - from) + from)
  new Promise((resolve, reject): void => {
    fetch(`${url}/photos/${id}`)
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

// 2.Create observer
const getRandomPhotoObserver: Observer<Photo> = {
  next: (randomPhoto: Photo) => {
    console.log(__filename)
    console.log(randomPhoto)
  },
  error: (err: Error) => {
    console.log(err.message)
  },
  complete: () => {}
}

// 3. Subscribe to observable (analogous to calling a function)
const getRandomPhotoSubscription: Subscription = getRandomPhoto$.subscribe(getRandomPhotoObserver)

// 4. Unsubscribe
setTimeout(() => {
  getRandomPhotoSubscription.unsubscribe()
}, 1000)
