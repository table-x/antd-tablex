import esDev from '../es/index.dev';
import esProd from '../es/index.prod';

let esExport;
if (process.env.NODE_ENV === 'production') {
  esExport = esProd;
} else {
  esExport = esDev;
}

export default esExport;
