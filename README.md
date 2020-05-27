In order to run  the app in the development mode please use

### `yarn install`
### `yarn start`


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
- Add pagination
- Customize <Select> component to be more generic (for this small project it’s fine, but in a big project it should accept generic type arguments as a value, not only string)
- Add UI component library and create generic components for button, input, typography components
- Add tests
- Add Webpack - for adding images and other assets
