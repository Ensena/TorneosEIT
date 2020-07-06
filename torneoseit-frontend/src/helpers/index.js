import React from 'react';
import { Spinner } from 'reactstrap';

export function LoadingFallback() {
  return (
    <div className="center-loading-div">
      <Spinner size="lg" />
    </div>
  );
}

export const url = 'http://localhost:5000/';
