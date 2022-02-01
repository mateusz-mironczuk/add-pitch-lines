# draw-lines-for-japanese-pitch-patterns
Draws lines for Japanese pitch patterns.

The script draws pitch pattern lines on a given HTML element which contains an
Japanese transliteration written in kana.

Supports the notion with the `¬` character witch marks the place when a pitch
drop occurs.

For example:

お¬おい is turned into:

![お¬おい](/doc/お¬おい_decorated.png)

## Installation
1. Build the script with `npm run build` command.
2. Copy a generated JavaScript file from the `dist` directory to the Anki's
    `collection.media` directory.
3. In your card's back template:
    1. Wrap the place which contains the transliteration with:
        ```HTML
        <span id="transliteration" class="pitch-lines">{{Transliteration}}</span>
        ```
        Where `{{Transliteration}}` is a placeholder for a word transliteration.
    2. Add the following code:
        ```JavaScript
        <script>
        var script = document.createElement('script')
        script.src = '_pitchlines.7ed947a7616e485f6477.js'
        document.getElementsByTagName('head')[0].appendChild(script)
        </script>
        ```
        Where `script.src` contains the generated script`s file name.

## Configuration
You can specify a different transliteration wrapper element ID by adding:
`script.setAttribute('data-id', 'otherID')`.

Where `otherID` is your desired ID.

For example:
 ```JavaScript
<script>
  var script = document.createElement('script')
  script.src = '_pitchlines.7ed947a7616e485f6477.js'
  script.setAttribute('data-id', 'otherID')
  document.getElementsByTagName('head')[0].appendChild(script)
</script>
```
