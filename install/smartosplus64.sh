#!/bin/bash

#install node.js, couchdb
echo Install packages...
pkgin -y in nodejs-0.8.2
pkgin -y in couchdb-1.1.1

echo Update couchdb config: /opt/local/etc/couchdb/default.ini...
export ip=`echo 'var os = require("os");console.log(os.networkInterfaces().net0[0].address)' | node`
echo Your ip is $ip....
cp /opt/local/etc/couchdb/default.ini /opt/local/etc/couchdb/default.ini.bk
sed 's/127.0.0.1/'$ip'/g' /opt/local/etc/couchdb/default.ini.bk > /opt/local/etc/couchdb/default.ini
echo Restarting couchdb...
svcadm enable svc:/network/epmd:default
svcadm disable couchdb
svcadm enable couchdb

echo Update mysql config: /etc/my.cnf
cp /etc/my.cnf /etc/my.cnf.bk
sed 's/127.0.0.1/'$ip'/g' /etc/my.cnf.bk > /etc/my.cnf
svcadm disable mysql
svcadm enable mysql

echo Stop apache service
svcadm disable apache

#install npm packages
echo Installing npm packages
npm install express -g

#download projects
echo Download projects...
#wget http://211.78.245.115:3000/projects.tgz
#tar -xzf projects.tgz
git clone git://github.com/peihsinsu/nko2012.git project
cd project
git pull
