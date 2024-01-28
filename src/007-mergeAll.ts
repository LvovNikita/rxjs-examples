import { mergeAll } from 'rxjs';

import { getLettersAndNumbersAsync$ } from './000-exports';

// Inner observables:
// --a--b--c--d|
// -1-2-3-4|

getLettersAndNumbersAsync$.pipe(
  mergeAll()
).subscribe((value: string | number) => console.log(value))

// -1a2-(3,b)-4c--d|
