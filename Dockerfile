# Local dev image that mirrors the GitHub Pages build.
FROM ruby:3.3-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends build-essential git \
 && rm -rf /var/lib/apt/lists/*

# Primer SCSS in the github-pages gem fails to compile under an ASCII locale.
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    JEKYLL_ENV=development

WORKDIR /srv/jekyll
COPY Gemfile Gemfile.lock ./
RUN bundle install

EXPOSE 4000 35729
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--force_polling"]
