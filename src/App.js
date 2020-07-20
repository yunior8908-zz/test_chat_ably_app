import React, { Suspense } from 'react';
import RoutersCommponent from './RoutersComponent';

function App() {
  return (
    <Suspense fallback={<div>...</div>}>
      <RoutersCommponent />
    </Suspense>
  );
}

export default App;
