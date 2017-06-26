var fs = require("fs");
var zlib = require('zlib');

const OPTS = {
    best: {
        level: zlib.Z_BEST_COMPRESSION,
        memLevel: zlib.Z_BEST_COMPRESSION
    },
    fast: {
        level: zlib.Z_BEST_SPEED,
        memLevel: zlib.Z_BEST_SPEED
    }
};

const finalGZBExtension = '.gzb64';

function encode(data) {
    return new Buffer(data, 'binary').toString('base64');
}

function decode(data) {
    return new Buffer(data, 'base64');
}

function main() {
    try {
        switch (process.argv[2]) {
            case "encode":
                console.log("Encoding " + process.argv[3] + " to gzb64.");
                fs.readFile(process.argv[3], function(err, data) {
                    zlib.gzip(data, OPTS['best'], (err, gzData) => {
                        //console.log(gzData);
                        if (err) {
                            throw err
                        } else {
                            fs.writeFile(process.argv[3] + finalGZBExtension, encode(gzData), function(err) {
                                if (err) {
                                    throw err;
                                } else {
                                    return;
                                }
                            });
                        }
                    })
                });
                console.log("Done! Encoded file into: " + process.argv[3] + finalGZBExtension);
                break;
            case "decode":
                console.log("Decoding " + process.argv[3] + " to binary.");
                var retFile = process.argv[3] + ".bin";
                if (process.argv.length === 5) {
                    retFile = process.argv[4];
                }
                fs.readFile(process.argv[3], function(err, gzData) {
                    if (err) {
                        throw err
                    } else {
                        var decoded = decode(gzData.toString("utf-8"));
                        //console.log(decoded);
                        zlib.gunzip(decoded, (err, data) => {
                            if (err) {
                                throw err;
                            } else {
                                fs.writeFile(retFile, data, function(err) {
                                    if (err) {
                                        throw err;
                                    } else {
                                        return;
                                    }
                                });
                            }
                        });
                    }
                });
                console.log("Done! Decoded file into: " + retFile);
                break;
            default:
                console.log("Usage");
                console.log("node gzb64.js encode/decode some/path/to.file");
                break;
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = main;