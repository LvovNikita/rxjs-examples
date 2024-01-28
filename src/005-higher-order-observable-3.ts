
import { concatAll } from 'rxjs';
import { getLettersAndNumbers$ } from './000-exports';

// Subscribing to observable of observables
// Flattening operators (convert a higher-order Observable into an ordinary Observable):
// concatAll, mergeAll, switchAll, exhaustAll

getLettersAndNumbers$.pipe(
  concatAll()
).subscribe((value: string | number) => console.log(value))
