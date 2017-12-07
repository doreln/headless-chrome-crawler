const HCCrawler = require('../');

HCCrawler.launch({
  jQuery: false, // jQuery script tag won't be added
  retryCount: 3, // Retry the same request up to 3 times
  retryDelay: 1000, // Wait 1000msecs before each retry
  evaluatePage: (() => ({
    // $ is undefined so that causes an error
    title: $('title').text(),
    h1: $('h1').text(),
    p: $('p').text(),
  })),
  onSuccess: (result => {
    console.log('onSuccess', result);
  }),
  onError: (err => {
    console.error('onError', err);
  }),
})
  .then(crawler => {
    crawler.queue('https://example.com');
    crawler.onIdle()
      .then(() => crawler.close());
  });
