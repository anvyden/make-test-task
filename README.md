# Тестовое задание от компании "Make".

[**Страница тестового задания**](https://anvyden.github.io/make-test-task/main-page.html)

## Stack

- Был применен компонентный подход, который заключается в разделении элементов на независимые блоки, а именно методология [БЭМ](https://ru.bem.info/methodology/quick-start/)
- В качестве препроцессора для `HTML` был использован [Pug(Jade)](https://gist.github.com/neretin-trike/53aff5afb76153f050c958b82abd9228).
- В качестве препроцессора для `CSS` был использован [SCSS](https://sass-scss.ru)
- Для сборки проекта был использован [Webpack](https://webpack.js.org).
- Для преобразования кода ES6 в более старую версию JavaScript был использован [Babel](https://babeljs.io), а для соблюдения кроссбраузерности и компактности CSS был использован [PostCSS](https://postcss.org)
- Для соблюдения единобразия и чистоты кода был использован [стайлгайд от AirBnB](https://github.com/airbnb/javascript), который проверялся линтером [eslint](https://eslint.org/) и [stylelint](https://stylelint.io)
- Разработка велась под последние версии Chrome и Firefox (last 3 version)

## Особенности

У `Pug` есть особенность - в режиме работы `devServer` (команда _npm start_), чтобы он подгружал картинки на страницу нужно делать сохранение (ctrl + s) в любом файле с расширением _.pug_

Я использовал сборку `Webpack` из другого своего проекта. Взял готовую сборку для того, чтобы сэкономить время при настройке проекта.

## Развертывание проекта

**Clone repository:**

```bash
  git clone https://github.com/anvyden/make-test-task.git
```

`npm install` - **installing dependencies**

**Development server:**

`npm start` - **start of the project on the server localhost:8081**

**Development and production project:**

`npm run dev` - **start of the project in development mode**

`npm run build` - **start of the project in production mode**

**Linting code:**

`npm run lint` - **linting javascript code**

`npm run lint:fix` - **fix javascript syntax errors**

`npm run stylelint` - **linting scss code**

`npm run stylelint:fix` - **fix scss syntax errors**

**Deploying project:**

`npm run deploy` - **deploying the project to gh-pages**
