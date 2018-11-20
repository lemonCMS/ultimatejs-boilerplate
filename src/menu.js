module.exports = [
  {
    desc: 'Home',
    to: '/',
  },
  {
    desc: 'Forms',
    to: '/forms',
    children: [
      {
        desc: 'Login',
        to: '/forms/login'
      },
      {
        desc: 'Register',
        to: '/forms/register'
      }
    ]
  },
  {
    desc: 'Persistent storage',
    to: '/counters',
    children: [
      {
        desc: 'Cookies',
        to: '/counters/cookie'
      },
      {
        desc: 'Localstorage',
        to: '/counters/local'
      }
    ]
  },
  {
    desc: 'Cookiebar',
    to: '/cookiebar',
    children: [
      {
        desc: 'Fullscreen',
        to: '/cookiebar/fullscreen'
      }
    ]
  },
  {
    desc: 'Data fetcher',
    to: '/data',
    children: [
      {
        desc: 'Fetch (waits 5 seconds)',
        to: '/data/fetch'
      },
      {
        desc: 'Defer',
        to: '/data/defer'
      },
      {
        desc: 'Authorize',
        to: '/data/authorize',
        children: [
          {
            desc: 'Needs Token',
            to: '/data/authorize/needstoken',
          }
        ]
      }
    ]
  },
  {
    desc: 'Laravel helpers',
    to: '/laravel',
    children: [
      {
        desc: 'Form connector',
        to: '/laravel/new'
      }
    ]
  },
  {
    desc: 'Sticky component',
    to: '/sticky',
    children: [
      {
        to: '/sticky/stack',
        desc: 'Stacked'
      }
    ]
  }
];
