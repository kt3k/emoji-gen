# emoji-gen v0.1.0

> Create your own set of `emoji`s from your images.

# Install

    npm install -g emoji-gen

This installs `emoji-gen` command globally. You can check the installation by hitting the command:

    emoji-gen --help

# Usage

`emoji-gen` command creates css file from the glob pattern of image files.

Suppose you have following dir structure and image files:

    site/
    └── img/
        ├── bar.svg
        ├── baz.svg
        └── foo.svg

Then do this:

    emoji-gen "site/img/**/*.svg" -o site/css/emoji.css

Then you have:

    site/
    ├── css/
    │   └── emoji.css
    └── img/
        ├── bar.svg
        ├── baz.svg
        └── foo.svg

The above command creates `site/css/emoji.css` and you can use the following markups in html with it:

```html
<link rel="stylesheet" href="path/to/emoji.css" />
...
Hello, this is my emoji <i class="emoji emoji-foo"></i> !
```

In the above `<i></i>` part is rendered like *emoji*!

See the [demo](https://kt3k.github.io/emoji-gen/demo/)

The following classes are included in the generated css:

- `.emoji`
  - This defines the basic dimension of emoji character.
- `.emoji-20`
- `.emoji-22`
- `.emoji-25`
- `.emoji-30`
  - These define the basic dimension of emoji character with the specific sizes.
- `.emoji-foo`
- `.emoji-bar`
- `.emoji-baz`
  - These define each emoji character.

# Command options

You can specify the following options in the command:

- `--class` You can specify class name for each css class. Default is `emoji`.
- `--output` You can specify output file path. This is required.
- `--size` The sizes of emoji classes. If you set `--size 20,30,40`, then you have `emoji-20` `emoji-30` and `emoji-40` classes. Default is `20,22,25,30`.
- `--default-size` The default size of emoji. Default is `22`.

# Note

- This module supports node v4.x and above.
- This module doesn't create an emoji sprite.
- This module doesn't inline emoji images in the generated css.

# License

MIT