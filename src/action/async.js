'use strict';

import AscStorage from '../lib/ascStorage';

const req = (type, data) => {
  return {
    ...data,
    type: type,
  }
}

export default req;
