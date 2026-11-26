# Small and Simple Things

Hi, I'm Tom DeForest. This is the repo for [smallandsimplethings.org](https://www.smallandsimplethings.org).

This site is built with Jekyll and hosted via GitHub Pages. The theme is by 
[Artem Sheludko](https://jekyllthemes.io/developers/artem-sheludko).
## Local development

`docker compose up --build`, then open http://localhost:4000. The image runs the
`github-pages` gem, so it builds with the same Jekyll version and plugins as
GitHub Pages. Without Docker: `bundle install && LANG=C.UTF-8 bundle exec jekyll serve`.
