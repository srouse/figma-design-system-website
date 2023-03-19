import copy from 'recursive-copy';

/*
try {
  const results = await copy(
    './node_modules/@srouse/readme-sites-design-system',
    './dist/readme-sites-design-system',
    {overwrite: true},
  );
  console.info('Copied ' + results.length + ' files');
} catch (error) {
	console.error('Copy Error: ' + error);
}
*/

try {
  const results = await copy(
    './assets',
    './dist/assets',
    {overwrite: true},
  );
  console.info('Copied ' + results.length + ' files');
} catch (error) {
	console.error('Copy Error: ' + error);
}