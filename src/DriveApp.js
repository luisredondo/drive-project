import React from 'react';

import { FilesTable } from './components/Table/FilesTable';
import { UploadButton } from './components/UploadButton/UploadButton';

export const DriveApp = () => {

  return (
    <div>
      <UploadButton />
      <br/>
      <br/>
      <FilesTable />
    </div>
  )
}
