({
    baseUrl: '.',
    name: 'libs/almond.js',
    include: ['main'],
    insertRequire: ['main'],
    out: 'dist/main-built.js',
    paths: {
        'main': 'src/main',
        'a': 'src/a',
        'b': 'src/b'
      },
    wrap: true
})
