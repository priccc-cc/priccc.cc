# Technology Blog

Blog website: [priccc.cc](priccc.cc)

> Nodejs version >= 18.14.0

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# yarn
yarn build
```

Locally preview production build:

```bash
# yarn
yarn preview
```

Or after `yarn build`:

```bash
node .output/server/index.mjs
```

## How to add your blog(.markdown)?

The blog dir is `content/*`.
 * `conten/*` is menu tab.
 * `content/*/*` is sub menu tab or articles.

You can add numeric prefix to dir name or file name. Likly `0.xxx.md` or `0.xxx`. These prefixes can control the order in which articles are displayed.

And the `_dir.yml` file is  used to configure directory attributes. Example displayed title、displayed icon or it has a sub dir.



