<h1 align="center">Github User Search</h1>

<div align="center">

<img src='https://github.githubassets.com/images/modules/logos_page/Octocat.png' height='60' alt='Redux Logo' aria-label='redux.js.org' />

![DEMO:](github-user-search-89oo89.netlify.app)

</div>

To see the app in action, clone it down and install the dependencies:

git clone https://github.com/nosnastya/github-user-search.git
`cd github-user-search`
`yarn`

Then, run the app
`yarn start`

Then, in your browser, open http://localhost:3000/ to view it! 🎉 🎉

This is a sample project created with:
- React
- Typescript
- Redux
- redux-thunk
- redux-persist
- lodash

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Fow css I used node-sass package in order to create scss modules to encapsulate styles for a specific component. I also used global css classes with atomic approach for more generic styles.

It was my first experience working with this tech stack and I enjoyed it a lot, although for small project like next time that I would rather usr ReactHooks instead of Redux.

I used react persist and local storage to save your search queue and results, so if you reload the page you won't lose teh state.


Next steps I would do to make his project better:
- Add pagination;

- Customize <Select> component to be more generic (for this small project it’s fine, but in a big project it should accept generic type arguments as a value, not only string);

- Add UI component library and create generic components for button, input, typography components;

- Add tests;

- Add Webpack - for adding images and other assets;
