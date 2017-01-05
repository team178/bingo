# bingo
A fun FRC bingo!

## How to contribute
We welcome all contributors to help us build FRC Kickoff Bingo! Feel free to submit pull requests or fork and make your own spin-off.

After cloning this repository, you should be able to view a local version of the site by opening index.html in your preferred browser. Check out our Issues if you want to find a place to start.

If you want to submit tile values to add to the randomized board possibilities, edit [this file](https://github.com/team178/bingo/blob/gh-pages/values.js). 

Make sure that 
- Each value is on its own line
- surround each value by quotation marks ("")
- if your value has quotation marks inside of it, make sure you escape them (ex. "Someone says \"FIRST is awesome\"")
- Make sure that there is a comma at the end of each line, after the final quotation mark
- The final value does not need a comma

### How to run as a part of the team site
This assumes you already have Jekyll set up; if you don't, head [here](https://github.com/team178/team178.github.io#running-locally).

1. Make sure you have a local version of the main website:
<br>`git clone https://github.com/team178/team178.github.io.git`

2. Navigate into the repository:
<br>`cd team178.github.io`

3. Clone this reposititory into the main website:
<br>`git clone https://github.com/team178/bingo.git`
<br>The .gitignore in the main website has `/bingo` in it. So this repo won't be tracked by git while in the main website's folder. But if you cd into `/bingo`, you can still commit changes.

4. Run `jekyll serve` to see the website on `http://localhost:4000`.

5. If you get any errors or warnings, try running `bundle exec jekyll serve` instead.
