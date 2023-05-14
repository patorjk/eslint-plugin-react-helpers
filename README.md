# eslint-plugin-react-helpers

A set of react eslint rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-react-helpers`:

```sh
npm install eslint-plugin-react-helpers --save-dev
```

## Usage

Add `react-helpers` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "react-helpers"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-helpers/prefer-use-state-lazy-initialization": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                                                       | Description                                                                        |
| :----------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| [no-named-useeffect-functions](docs/rules/no-named-useeffect-functions.md)                 | Disallows named function in useEffect hooks                                        |
| [prefer-use-state-lazy-initialization](docs/rules/prefer-use-state-lazy-initialization.md) | Detects function calls in useState and suggests using lazy initialization instead. |

<!-- end auto-generated rules list -->


