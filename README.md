# wikilogos

This module attempts to get the entities and institutions logo urls from wikipedia content if they are available on their pages, caching the results for an hour. For example:

```js
> const fetchLogos = require('wikilogos')
> fetchLogos('github').then(x => console.log(x))
> { entity: 'GitHub',
  logoUrls:
   [ 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/24/GitHub_logo_2013_padded.svg/128px-GitHub_logo_2013_padded.svg.png',
     'http://upload.wikimedia.org/wikipedia/commons/thumb/2/24/GitHub_logo_2013_padded.svg/192px-GitHub_logo_2013_padded.svg.png',
     'http://upload.wikimedia.org/wikipedia/commons/thumb/2/24/GitHub_logo_2013_padded.svg/256px-GitHub_logo_2013_padded.svg.png' ] }
```

The entity is the page found searching wikipedia and the logoUrls are the logos images found inside the article content

## Install

You can install with [npm]:

```sh
$ npm install --save wikilogos
```

### License

Copyright © 2020, [Juan Convers](https://juanconvers.com/).
Released under the [MIT License](LICENSE).
