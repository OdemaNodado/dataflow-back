FROM node:17-slim as builder

WORKDIR /tmp 

RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install -y alien libaio1 && apt-get install libssl-dev
RUN apt-get install wget
RUN wget https://yum.oracle.com/repo/OracleLinux/OL7/oracle/instantclient/x86_64/getPackage/oracle-instantclient19.3-basiclite-19.3.0.0.0-1.x86_64.rpm
RUN alien -i --scripts oracle-instantclient*.rpm
RUN rm -f oracle-instantclient19.3*.rpm && apt-get -y autoremove && apt-get -y clean 

WORKDIR /home/node/app

# COPY openssl.cnf /etc/ssl/openssl.cnf

EXPOSE 8095

CMD [ "node", "src/server.js" ]