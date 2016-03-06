# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure('2') do |config|
  config.vm.box      = 'ubuntu/trusty64'
  config.vm.hostname = 'pwnagon'
  config.vm.synced_folder ".", "/home/vagrant/pwnagon",
    owner: "vagrant",
    group: "www-data",
    mount_options: ["dmode=775,fmode=664"]

  config.vm.network :forwarded_port, guest: 3000, host: 3000

  config.vm.provision :shell, path: './provisioning/bootstrap.sh', keep_color: true

  config.vm.provider 'virtualbox' do |v|
    v.cpus = 3
    v.memory = 4096
  end

end
