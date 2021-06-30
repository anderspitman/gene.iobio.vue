# gene.iobio

## Prerequisites

* nodejs 12+


## Get the code

```
git clone https://github.com/iobio/gene.iobio.vue

cd gene.iobio.vue

npm install

```


## Prep

Modify the `.env` file to use the proper backend address, assuming you don't
want to use the publicly available iobio servers.


## Building

```
./build.sh prod
```


## Running

Simply start a static web server in `gene.iobio.vue/deploy/`


# gru backend

## Prerequisites

* singularity 3.5+

* A copy of the gru release directory


## Running

Assuming you have a copy of the gru directory located at `gru/`, you would run
it with the following command:

```
singularity exec --bind gru/data/:/data gru/gru.sif node /iobio-gru-backend/src/index.js --data-dir=/data --port=9001
```

That will start a gru container with the data directory bound to /data inside
the container, then start the node process on the specified port (9001 by
default).
