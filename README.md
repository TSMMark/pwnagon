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

##Better Errors on Vagrant

If your better_errors aren't working it's likely a [VM issue](https://github.com/charliesome/better_errors).

To resolve you must:

1. Put a `raise` somewhere in your code to get a regular error screen.
2. Click `Toggle env dump` and expand like this picture:
https://s3-us-west-2.amazonaws.com/pwnagon-readme/better_errors.png
![alt text](https://s3-us-west-2.amazonaws.com/pwnagon-readme/better_errors.png "better_errors image")
3. Copy the IP under `REMOTE_ADDR`
4. Under `development:` in your `application.yml` add this environment variable:
```ruby
TRUSTED_IP: "<< the remote_addr you just copied >>""
```


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
