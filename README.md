# draw-lines-for-japanese-pitch-patterns
Draws lines for Japanese pitch patterns.

The script draws pitch pattern lines on a given HTML element which contains an
Japanese transliteration written in kana.

Supports the notion with the `¬` character witch marks the place when a pitch
drop occurs.

For example:

お¬おい is turned into <span style="border-top: 1px solid red;">お</span><span style="border-bottom: 1px solid red; border-left: 1px solid red;">おい</span>.

## Installation
1. Build the script with `npm run build` command.
2. Copy a generated JavaScript file from the `dist` directory to the Anki's
    `collection.media` directory.
3. Add the following code to your card's back template:
    ```JavaScript
    <script>
      var script = document.createElement('script')
      script.src = '_pitchlines.7ed947a7616e485f6477.js'
      document.getElementsByTagName('head')[0].appendChild(script)
    </script>
    ```
    Where `script.src` contains the generated script`s file name.
