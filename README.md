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
bundle install
```

```shell
rake db:migrate
```

```shell
rake db:seed
```

```shell
foreman s
```

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
