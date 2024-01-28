import { switchAll } from 'rxjs';

import { getLettersAndNumbersAsync$ } from './000-exports';

// Inner observables:
// --a--b--c--d|
// -1-2-3-4|

getLettersAndNumbersAsync$.pipe(
  switchAll()
).subscribe((value: string | number) => console.log(value))

// -1-2-3-4

// Other example:
// Inner observables:
// --a--b--c--d|
// ------------1---2---3---4|
// Result:
// --a--b--c--d1---2---3---4|
