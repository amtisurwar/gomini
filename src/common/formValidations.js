export const required = value => value ? undefined : 'Required';

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined;

  export const phoneFormatter = (number) => {
    if (!number) return '';
    // NNN-NNN-NNNN
    const splitter = /.{1,3}/g;
    number = number.substring(0, 10);
    return number.substring(0, 7).match(splitter).join('-') + number.substring(7);
  };
  
 export const phoneParser = (number) => number ? number.replace(/-/g, '') : '';