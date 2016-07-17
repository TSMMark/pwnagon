# The output of all these installation steps is noisy. With this utility
# the progress report is nice and concise.
function install {
  echo installing $1
  shift
  apt-get -y install "$@" >/dev/null 2>&1
}

export VAGRANT_HOME=/home/vagrant

echo updating package information
apt-add-repository -y ppa:brightbox/ruby-ng >/dev/null 2>&1
apt-get -y update >/dev/null 2>&1

install 'development tools' build-essential
install Git git
install 'Ruby requirements' libssl-dev libreadline-dev zlib1g-dev

export RBENV_ROOT=$VAGRANT_HOME/.rbenv
echo "Installing rbenv into $RBENV_ROOT"
git clone https://github.com/rbenv/rbenv.git $RBENV_ROOT
# sudo chown -R vagrant:vagrant $RBENV_ROOT
# echo "Makeing rbenv"
# cd $RBENV_ROOT && sudo -u vagrant src/configure && sudo -u vagrant make -C src

export PATH="$RBENV_ROOT/shims:$RBENV_ROOT/bin:$PATH"

echo "pre init"
rbenv init -
rbenv rehash
echo "post init"
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> $VAGRANT_HOME/.bash_profile
echo 'eval "$(rbenv init -)"' >> $VAGRANT_HOME/.bash_profile

echo 'Installing ruby-build as a rbenv plugin'
git clone https://github.com/rbenv/ruby-build.git $RBENV_ROOT/plugins/ruby-build
# sudo -u vagrant $RBENV_ROOT/plugins/ruby-build/install.sh
# sudo chown -R vagrant:vagrant /usr/local/share/ruby-build

rbenv rehash

echo 'Installing ruby version 2.2.4'
rbenv install 2.2.4 -v
rbenv global 2.2.4

# sudo chown -R vagrant:vagrant $RBENV_ROOT

echo 'installing Bundler'
rbenv exec gem install bundler # -N >/dev/null 2>&1

echo 'alias be="rbenv exec bundle exec"' >> $VAGRANT_HOME/.bash_profile

echo 'installing Foreman'
rbenv exec gem install foreman

# exit # TODO REMOVE

# install SQLite sqlite3 libsqlite3-dev
install memcached memcached
install Redis redis-server
install RabbitMQ rabbitmq-server
install imagemagick imagemagick

install 'PhantomJS requirements' chrpath libxft-dev libfreetype6 libfreetype6-dev libfontconfig1 libfontconfig1-dev

cd $VAGRANT_HOME
export PHANTOM_JS="phantomjs-1.9.8-linux-x86_64"
wget https://bitbucket.org/ariya/phantomjs/downloads/$PHANTOM_JS.tar.bz2
sudo tar xvjf $PHANTOM_JS.tar.bz2

sudo chown -R vagrant:vagrant $PHANTOM_JS
sudo rm -rf /usr/local/share/$PHANTOM_JS
sudo mv $PHANTOM_JS /usr/local/share
sudo ln -sf /usr/local/share/$PHANTOM_JS/bin/phantomjs /usr/local/bin

install PostgreSQL postgresql postgresql-contrib libpq-dev
sudo -u postgres createuser --superuser vagrant
sudo -u postgres createdb -O vagrant activerecord_unittest
sudo -u postgres createdb -O vagrant activerecord_unittest2
sudo su postgres <<EOF
psql;
CREATE USER coderelf WITH CREATEDB PASSWORD 'password';
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO coderelf;
EOF

install 'Nokogiri dependencies' libxml2 libxml2-dev libxslt1-dev

curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
install 'Node.js' nodejs build-essential

echo 'Installing NPM'
curl -L https://www.npmjs.com/install.sh | sh

# Needed for docs generation.
update-locale LANG=en_US.UTF-8 LANGUAGE=en_US.UTF-8 LC_ALL=en_US.UTF-8

echo installing Rails
rbenv exec gem install rails

echo installing gems with bundler
cd $VAGRANT_HOME/pwnagon
rbenv exec bundle install

sudo chown -R vagrant:vagrant $RBENV_ROOT
# sudo chown -R vagrant:vagrant /usr/lib/node_modules/
sudo npm install webpack -g

echo removing unnecessary packages
yes | apt-get autoremove

echo 'all set, rock on!'
