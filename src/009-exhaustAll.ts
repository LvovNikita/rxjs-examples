import { exhaustAll, switchAll } from 'rxjs';

import { getLettersAndNumbersAsync$ } from './000-exports';

// Inner observables:
// --a--b--c--d|
// -1-2-3-4|

getLettersAndNumbersAsync$.pipe(
  exhaustAll()
).subscribe((value: string | number) => console.log(value))

// -a-b-c-d
