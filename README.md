# pwnagon

Git clone this repo and `cd` to the directory.

```shell
vagrant up
```

```shell
vagrant ssh
```

```shell
cd pwnagon
```

```shell
be bundle install && be npm install
```

```shell
be rake db:create db:migrate db:seed
```

```shell
be foreman s -f Procfile.dev
```

*`be` is an alias for `rbenv exec bundle exec`*

Visit `localhost:3000` in your favorite browser.


## Deploying

### First time setup

`vagrant ssh` into your vagrant box and `cd pwnagon`.

Install heroku toolbelt following instructions for Debian/Ubuntu here: https://toolbelt.heroku.com/debian

Generate ssh key in your vagrant and add it to your GitHub account following instructions here: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

```shell
$ heroku keys:add
```

```shell
$ git remote add qa git@heroku.com:pwnagon-qa.git
```

```shell
$ git remote add production git@heroku.com:pwnagon.git
```

If you're setting up a new heroku app be sure to add the phantomjs buildpack (for web crawler).

```shell
heroku buildpacks:add https://github.com/stomita/heroku-buildpack-phantomjs
```
