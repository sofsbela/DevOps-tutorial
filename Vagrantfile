# See: https://manski.net/2016/09/vagrant-multi-machine-tutorial/
# for information about machine names on private network
Vagrant.configure("2") do |config|
    config.vm.box = "bento/ubuntu-22.04"
  
    config.vm.provision "shell", inline: <<-SHELL
      sudo apt-get update -y
      sudo apt-get install iputils-ping -y
      sudo apt-get install python3 --yes
    SHELL
   
    config.vm.define "control" do |control|
      control.vm.box = "bento/ubuntu-22.04"
      control.vm.hostname = "control"
      control.vm.network "private_network", ip: "192.168.56.10"
  
      # For running ansible "inside" jenkins
      control.vm.synced_folder ".", "/vagrant", mount_options: ["dmode=775,fmode=600"]
  
      # For acessing jenkins in 8081
      control.vm.network "forwarded_port", guest: 8080, host: 8081
  
      # For accessing the Angular app in http://localhost:4200/
      control.vm.network "forwarded_port", guest: 4200, host: 4200

      control.vm.provision "shell", inline: <<-SHELL
        sudo apt update
	      # Git
        sudo apt install -y git
	      # Node.js
 	      sudo apt install -y nodejs
        sudo apt install -y npm
        # JDK
        sudo apt-get install openjdk-11-jdk-headless --yes
        # Jenkins
        sudo wget http://mirrors.jenkins.io/war-stable/latest/jenkins.war
      SHELL

      control.vm.provision "shell", run: "always", inline: <<-SHELL
        # Start Jenkins
        sudo java -jar jenkins.war &
        # sudo cp /root/.jenkins/secrets/initialAdminPassword /vagrant
      SHELL

    end
  end
  
