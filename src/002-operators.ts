import { map, tap } from 'rxjs';

import { Photo, getRandomPhoto$ } from './000-exports';

// Operators

getRandomPhoto$.pipe(
  tap((photo: Photo) => {
    console.log(__filename)
    console.log(photo)
  }),
  map((photo: Photo) => photo.albumId)
).subscribe((albumId: number) => { // TODO: move to observer
  console.log(`Album id: ${albumId}`)
})
